import { NextResponse } from "next/server";
import { anularPago, registrarPago } from "@/lib/activaciones";

/**
 * Notificación de pago de TiloPay.
 *
 * Es la fuente de verdad de las activaciones. El redirect que ve el cliente
 * después de pagar es solo una comodidad: puede cerrar la pestaña, quedarse sin
 * señal o registrarse al día siguiente. Esta notificación llega por su lado y
 * no depende de que su navegador haga nada.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * PENDIENTE DE AJUSTAR CONTRA LA DOCUMENTACIÓN REAL DE TILOPAY
 *
 * `interpretarTilopay` traduce el cuerpo de la notificación a lo que necesita
 * la base. Los nombres de campo de abajo son una conjetura razonable a partir
 * de cómo suele documentarse TiloPay, PERO NO ESTÁN VERIFICADOS: su
 * documentación vive en un Postman que no se pudo leer automáticamente.
 *
 * Antes de cobrarle a un cliente real hay que confirmar, con la cuenta de
 * TiloPay a la vista:
 *
 *   1. Cómo se llama el identificador único del pago (¿`tilopay-transaction`?
 *      ¿`orderNumber`? ¿`order`?). Es la llave de idempotencia: si se elige el
 *      campo equivocado, un cliente podría activar dos cuentas con un pago.
 *   2. Qué valor exacto indica aprobado (¿`code === "1"`? ¿`"00"`?).
 *   3. Cómo se verifica la autenticidad: si TiloPay firma con HMAC o manda un
 *      hash, hay que validarlo en `esAutentica` y NO depender solo del secreto
 *      de la URL.
 *   4. Cómo viaja el vertical comprado. Acá se asume que se mandó como
 *      referencia al crear el cobro y vuelve en un campo propio.
 *
 * Mientras eso no esté confirmado, este endpoint **rechaza todo lo que no pueda
 * verificar**. Es la falla correcta: un pago que no entra se resuelve a mano;
 * una activación falsa es alguien usando el sistema gratis.
 * ─────────────────────────────────────────────────────────────────────────
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PROVEEDOR = "tilopay";

/** Ids de vertical válidos. Los mismos de `activacion.ts`. */
const VERTICALES = new Set([
  "restaurantes", "clinicas", "bienes-raices", "constructoras", "ganaderia",
  "retail", "agricultura", "talleres", "abogados", "personal",
]);

interface Interpretada {
  referencia: string;
  verticalId: string;
  aprobada: boolean;
  reversada: boolean;
  correo: string | null;
  monto: string | null;
  moneda: string | null;
}

function texto(v: unknown): string | null {
  if (typeof v === "string" && v.trim()) return v.trim();
  if (typeof v === "number") return String(v);
  return null;
}

/**
 * Traduce la notificación de TiloPay. **Verificar los nombres de campo.**
 *
 * Devuelve `null` si no logra identificar el pago: sin referencia o sin
 * vertical no hay nada que registrar, y adivinar sería peor que rechazar.
 */
function interpretarTilopay(p: Record<string, unknown>): Interpretada | null {
  const referencia =
    texto(p["tilopay-transaction"]) ?? texto(p.transaction) ?? texto(p.orderNumber) ?? texto(p.order);
  if (!referencia) return null;

  const verticalId = texto(p.vertical) ?? texto(p.verticalId) ?? texto(p.reference);
  if (!verticalId || !VERTICALES.has(verticalId)) return null;

  const code = texto(p.code) ?? texto(p.status);
  // Solo estos dos se consideran aprobados. Cualquier otro valor —incluido uno
  // desconocido— cae en "no aprobada", que es la falla segura.
  const aprobada = code === "1" || code?.toLowerCase() === "approved";
  const reversada =
    code?.toLowerCase() === "reversed" ||
    code?.toLowerCase() === "refunded" ||
    texto(p.event)?.toLowerCase().includes("refund") === true;

  return {
    referencia,
    verticalId,
    aprobada,
    reversada,
    correo: texto(p.email) ?? texto(p.billToEmail),
    monto: texto(p.amount),
    moneda: texto(p.currency),
  };
}

/**
 * Comprobación de autenticidad.
 *
 * Hoy es un secreto compartido en la cabecera o el query: cualquiera que no lo
 * traiga se rechaza. Es el mínimo, no lo ideal — **si TiloPay firma con HMAC,
 * hay que validar esa firma acá** y dejar el secreto como segunda barrera.
 */
function esAutentica(req: Request): boolean {
  const esperado = process.env.TILOPAY_WEBHOOK_SECRET;
  if (!esperado) return false; // Sin secreto configurado no se acepta nada.
  const url = new URL(req.url);
  const recibido = req.headers.get("x-tilopay-secret") ?? url.searchParams.get("secret");
  return recibido === esperado;
}

export async function POST(req: Request) {
  if (!esAutentica(req)) {
    // Sin detalle en la respuesta: a quien no está autorizado no se le explica
    // qué le faltó.
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  let cuerpo: Record<string, unknown>;
  try {
    const crudo = await req.text();
    cuerpo = crudo.trim().startsWith("{")
      ? JSON.parse(crudo)
      : Object.fromEntries(new URLSearchParams(crudo));
  } catch {
    return NextResponse.json({ error: "Cuerpo inválido" }, { status: 400 });
  }

  const datos = interpretarTilopay(cuerpo);
  if (!datos) {
    // Se responde 200 igual: si fuera 4xx, TiloPay reintentaría para siempre
    // una notificación que nunca vamos a poder procesar. Queda en el log.
    console.error("[tilopay] notificación no interpretable", JSON.stringify(cuerpo));
    return NextResponse.json({ recibido: true, procesado: false });
  }

  try {
    if (datos.reversada) {
      await anularPago(PROVEEDOR, datos.referencia);
      return NextResponse.json({ recibido: true, accion: "anulada" });
    }

    if (!datos.aprobada) {
      // Un pago rechazado o pendiente no se registra: solo entra lo confirmado.
      return NextResponse.json({ recibido: true, accion: "ignorada" });
    }

    const { nueva } = await registrarPago({
      proveedor: PROVEEDOR,
      referencia: datos.referencia,
      verticalId: datos.verticalId,
      correo: datos.correo,
      monto: datos.monto,
      moneda: datos.moneda,
      payload: cuerpo,
    });

    return NextResponse.json({ recibido: true, accion: nueva ? "registrada" : "repetida" });
  } catch (e) {
    // Un 5xx hace que TiloPay reintente, que es lo que se quiere si la base
    // estaba caída: el pago no se pierde.
    console.error("[tilopay] falló al registrar", e);
    return NextResponse.json({ error: "Error al procesar" }, { status: 500 });
  }
}
