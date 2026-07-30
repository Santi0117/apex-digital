/**
 * Conexión entre la landing y las apps de cada vertical (monorepo onvision).
 *
 * Mapa canónico:
 *   restaurantes  → sector-01 (Onvision-Resta) · puerto 3005
 *   bienes-raices → sector-03 (Onvision Inmo) · puerto 3003
 *   constructoras → sector-04 (Onvision Obras) · puerto 3004
 *   ganaderia     → sector-05 (Onvision Ganadero) · puerto 3006
 *   clinicas      → sector-02 (Onvision Salud) · puerto 3007
 *   retail        → sector-06 (Onvision Retail) · puerto 3008
 *   agricultura   → sector-07 (Onvision Agrícola) · puerto 3009
 *
 * En producción serán subdominios vía NEXT_PUBLIC_*.
 */

export type PlanId = "base" | "vertical" | "pro";

/** URL de la app de cada vertical. `null` = todavía no está disponible (va a waitlist). */
const APP_URLS: Record<string, string | null> = {
  restaurantes:
    process.env.NEXT_PUBLIC_APP_RESTAURANTES_URL ?? "http://localhost:3005",
  "bienes-raices":
    process.env.NEXT_PUBLIC_APP_BIENES_RAICES_URL ?? "http://localhost:3003",
  // Ganadería = sector-05 (Onvision Ganadero) · puerto 3006
  ganaderia: process.env.NEXT_PUBLIC_APP_GANADERIA_URL ?? "http://localhost:3006",
  constructoras:
    process.env.NEXT_PUBLIC_APP_CONSTRUCTORAS_URL ?? "http://localhost:3004",
  clinicas: process.env.NEXT_PUBLIC_APP_CLINICAS_URL ?? "http://localhost:3007",
  // Retail = sector-06 (Onvision Retail) · puerto 3008
  retail: process.env.NEXT_PUBLIC_APP_RETAIL_URL ?? "http://localhost:3008",
  // Agricultura = sector-07 (Onvision Agrícola) · puerto 3009
  agricultura: process.env.NEXT_PUBLIC_APP_AGRICULTURA_URL ?? "http://localhost:3009",
  // Talleres = sector-08 (Onvision Taller) · puerto 3011
  talleres: process.env.NEXT_PUBLIC_APP_TALLERES_URL ?? "http://localhost:3011",
};

/** Ruta de entrada de cada app. Por defecto /registro (flujo de activación). */
const RUTAS_REGISTRO: Record<string, string> = {};

export function appUrlDeVertical(verticalId: string): string | null {
  return APP_URLS[verticalId] ?? null;
}

/** URL de registro en la app del vertical, con el plan elegido en la landing. */
export function urlDeActivacion(verticalId: string, planId: PlanId): string | null {
  const base = appUrlDeVertical(verticalId);
  if (!base) return null;
  const ruta = RUTAS_REGISTRO[verticalId] ?? "/registro";
  const params = new URLSearchParams({ vertical: verticalId, plan: planId });
  return `${base}${ruta}?${params.toString()}`;
}
