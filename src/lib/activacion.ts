/**
 * Conexión entre la landing y las apps de cada vertical (monorepo onvision).
 *
 * Mapa canónico:
 *   restaurantes  → sector-01 (Onvision-Resta) · puerto 3005
 *   clinicas      → sector-02 (Onvision Salud) · puerto 3007
 *   bienes-raices → sector-03 (Onvision Inmo) · puerto 3003
 *   constructoras → sector-04 (Onvision Obras) · puerto 3004
 *   ganaderia     → sector-05 (Onvision Ganadero) · puerto 3006
 *   retail        → sector-06 (Onvision Retail) · puerto 3008
 *   agricultura   → sector-07 (Onvision Agrícola) · puerto 3009
 *   talleres      → sector-08 (Onvision Taller) · puerto 3011
 *   abogados      → sector-09 (Onvision Legal) · puerto 3012
 *   personal      → sector-10 (Onvision Personal) · puerto 3013
 *
 * Solo las URLs no-null aparecen como “disponible ahora” en /activar.
 * En local levantá solo esas apps (Turbopack ~1.5 GB c/u) — ver levantar-onvision.sh demo.
 *
 * En producción serán subdominios vía NEXT_PUBLIC_*.
 */

export type PlanId = "unico";

/**
 * 4 verticales activas en local (sin saturar Turbopack).
 * El resto queda en lista de espera hasta que las levantes / publiques.
 */
const ACTIVAS = {
  retail: process.env.NEXT_PUBLIC_APP_RETAIL_URL ?? "http://localhost:3008",
  constructoras:
    process.env.NEXT_PUBLIC_APP_CONSTRUCTORAS_URL ?? "http://localhost:3004",
  "bienes-raices":
    process.env.NEXT_PUBLIC_APP_BIENES_RAICES_URL ?? "http://localhost:3003",
  abogados: process.env.NEXT_PUBLIC_APP_ABOGADOS_URL ?? "http://localhost:3012",
} as const;

/** URL de la app de cada vertical. `null` = todavía no está disponible (va a waitlist). */
const APP_URLS: Record<string, string | null> = {
  retail: ACTIVAS.retail,
  constructoras: ACTIVAS.constructoras,
  "bienes-raices": ACTIVAS["bienes-raices"],
  abogados: ACTIVAS.abogados,
  restaurantes: process.env.NEXT_PUBLIC_APP_RESTAURANTES_URL ?? null,
  clinicas: process.env.NEXT_PUBLIC_APP_CLINICAS_URL ?? null,
  ganaderia: process.env.NEXT_PUBLIC_APP_GANADERIA_URL ?? null,
  agricultura: process.env.NEXT_PUBLIC_APP_AGRICULTURA_URL ?? null,
  talleres: process.env.NEXT_PUBLIC_APP_TALLERES_URL ?? null,
  personal: process.env.NEXT_PUBLIC_APP_PERSONAL_URL ?? null,
};

/** Ruta de entrada de cada app. Por defecto /registro (flujo de activación). */
const RUTAS_REGISTRO: Record<string, string> = {};

export function appUrlDeVertical(verticalId: string): string | null {
  return APP_URLS[verticalId] ?? null;
}

/** URL de registro en la app del vertical, con el plan elegido en la landing. */
export function urlDeActivacion(
  verticalId: string,
  planId: PlanId,
  extra?: { billing?: "activa" | "pendiente"; sessionId?: string },
): string | null {
  const base = appUrlDeVertical(verticalId);
  if (!base) return null;
  const ruta = RUTAS_REGISTRO[verticalId] ?? "/registro";
  const params = new URLSearchParams({ vertical: verticalId, plan: planId });
  if (extra?.billing) params.set("billing", extra.billing);
  if (extra?.sessionId) params.set("session_id", extra.sessionId);
  return `${base}${ruta}?${params.toString()}`;
}
