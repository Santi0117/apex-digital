import postgres from "postgres";

/**
 * Escritura de pagos confirmados en la base compartida de Onvision.
 *
 * La landing cobra, pero quien da acceso es la app del vertical. El puente es
 * la tabla `activaciones`: acá se escribe cuando el proveedor confirma el pago,
 * y allá se canjea cuando el cliente se registra.
 *
 * Va con SQL crudo y no con Drizzle porque la landing es un proyecto aparte del
 * monorepo: traerse `core-db` significaría arrastrar todo el esquema para usar
 * una tabla. Son dos sentencias; el costo de mantenerlas a mano es menor que el
 * de acoplar los dos proyectos.
 */

let sqlCache: ReturnType<typeof postgres> | null = null;

function db() {
  if (sqlCache) return sqlCache;
  const url = process.env.ONVISION_DATABASE_URL;
  if (!url) {
    throw new Error(
      "Falta ONVISION_DATABASE_URL. Es la base compartida de Onvision (auth + " +
        "tenants), la misma que usan las apps. Sin ella no se puede registrar un pago.",
    );
  }
  sqlCache = postgres(url, { max: 2, idle_timeout: 20, prepare: !url.includes("neon.tech") });
  return sqlCache;
}

export interface PagoConfirmado {
  proveedor: string;
  /** Id del pago según el proveedor. Es la llave de idempotencia. */
  referencia: string;
  /** Id del vertical en la landing: "retail", "abogados", … */
  verticalId: string;
  correo?: string | null;
  monto?: string | null;
  moneda?: string | null;
  /** La notificación tal cual llegó. Se guarda entera. */
  payload: unknown;
}

/**
 * Registra un pago confirmado.
 *
 * Idempotente a propósito: los proveedores reintentan la notificación hasta
 * recibir un 200, así que la misma llega varias veces. `ON CONFLICT DO NOTHING`
 * hace que la segunda no cree nada **ni pise el estado** — si el cliente ya
 * canjeó el pago, un reintento no debe devolverlo a "pagada" y dejar que se use
 * de nuevo.
 */
export async function registrarPago(p: PagoConfirmado): Promise<{ nueva: boolean }> {
  const filas = await db()`
    insert into activaciones (proveedor, referencia, vertical_id, correo, monto, moneda, payload)
    values (${p.proveedor}, ${p.referencia}, ${p.verticalId}, ${p.correo ?? null},
            ${p.monto ?? null}, ${p.moneda ?? null}, ${db().json(p.payload as never)})
    on conflict (proveedor, referencia) do nothing
    returning id`;
  return { nueva: filas.length > 0 };
}

/**
 * Marca un pago como reversado y le quita el acceso al tenant que lo usó.
 *
 * Suena duro, pero un contracargo es exactamente eso: el pago dejó de existir.
 */
export async function anularPago(proveedor: string, referencia: string): Promise<void> {
  const sql = db();
  // El cast a text es necesario: `tenants.id` es uuid y `activaciones.tenant_id`
  // es text, y Postgres no compara esos dos tipos por su cuenta.
  await sql`
    update tenants set suscripcion = 'vencida'
    where id::text in (
      select tenant_id from activaciones
      where proveedor = ${proveedor} and referencia = ${referencia} and tenant_id is not null
    )`;
  await sql`
    update activaciones set estado = 'anulada'
    where proveedor = ${proveedor} and referencia = ${referencia}`;
}
