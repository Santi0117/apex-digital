import { NextResponse } from "next/server";
import { appUrlDeVertical } from "@/lib/activacion";
import { verticals } from "@/lib/content";
import { getStripe, PRECIO_MENSUAL_CRC, siteOrigin } from "@/lib/stripe";

export const runtime = "nodejs";

/**
 * Crea una Checkout Session de suscripción mensual en CRC.
 * Body: { verticalId: string }
 */
export async function POST(request: Request) {
  let body: { verticalId?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const verticalId = body.verticalId?.trim();
  if (!verticalId) {
    return NextResponse.json({ error: "Falta verticalId" }, { status: 400 });
  }

  const vertical = verticals.find((v) => v.id === verticalId);
  if (!vertical) {
    return NextResponse.json({ error: "Industria no válida" }, { status: 400 });
  }

  if (!appUrlDeVertical(verticalId)) {
    return NextResponse.json(
      { error: "Esa industria todavía no está disponible para activar" },
      { status: 400 },
    );
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      {
        error:
          "Stripe no está configurado. Agregá STRIPE_SECRET_KEY en .env.local.",
      },
      { status: 503 },
    );
  }

  const origin = siteOrigin();
  const stripe = getStripe();

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    locale: "es",
    billing_address_collection: "auto",
    allow_promotion_codes: true,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "crc",
          unit_amount: PRECIO_MENSUAL_CRC,
          recurring: { interval: "month" },
          product_data: {
            name: `Onvision · ${vertical.name}`,
            description: `Suscripción mensual — ${vertical.subtitle}`,
          },
        },
      },
    ],
    metadata: {
      verticalId,
      planId: "unico",
      producto: "onvision",
    },
    subscription_data: {
      metadata: {
        verticalId,
        planId: "unico",
      },
    },
    success_url: `${origin}/activar/exito?session_id={CHECKOUT_SESSION_ID}&vertical=${encodeURIComponent(verticalId)}`,
    cancel_url: `${origin}/activar?vertical=${encodeURIComponent(verticalId)}&pago=cancelado`,
  });

  if (!session.url) {
    return NextResponse.json(
      { error: "Stripe no devolvió URL de Checkout" },
      { status: 502 },
    );
  }

  return NextResponse.json({ url: session.url, sessionId: session.id });
}
