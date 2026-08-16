import Stripe from "stripe";
import { pricingTiers } from "@/lib/content";

/** CRC es moneda de cero decimales en Stripe: ₡10,500 → unit_amount 10500. */
export const PRECIO_MENSUAL_CRC = pricingTiers[0]!.monthly;

export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error(
      "Falta STRIPE_SECRET_KEY. Agregala en .env.local (sk_test_… o sk_live_…).",
    );
  }
  return new Stripe(key, {
    typescript: true,
  });
}

export function siteOrigin(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "http://127.0.0.1:3010"
  );
}
