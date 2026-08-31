import { getSiteUrl } from "./site-url";

const ONVO_API = "https://api.onvopay.com/v1";

export function getOnvoSecretKey(): string {
  const key = process.env.ONVO_SECRET_KEY;
  if (!key) {
    throw new Error(
      "Falta ONVO_SECRET_KEY. Agregala en .env.local (onvo_test_… o onvo_live_…).",
    );
  }
  return key;
}

export function onvoConfigured(): boolean {
  return Boolean(process.env.ONVO_SECRET_KEY);
}

export type CreateOnvoOneTimeLinkInput = {
  unitAmount: number;
  currency: "CRC" | "USD";
  description: string;
  metadata?: Record<string, string>;
  customerEmail?: string;
  /** Origen del sitio (success/cancel). Si falta, usa getSiteUrl(). */
  origin?: string;
};

export type OnvoOneTimeLinkResult = {
  url: string;
  id?: string;
};

/**
 * Crea un link de Checkout de un solo uso.
 * Docs: https://docs.onvopay.com/checkout/one-time-links
 */
export async function createOnvoOneTimeLink(
  input: CreateOnvoOneTimeLinkInput,
): Promise<OnvoOneTimeLinkResult> {
  const origin = (input.origin ?? getSiteUrl()).replace(/\/$/, "");
  const secret = getOnvoSecretKey();

  const body: Record<string, unknown> = {
    lineItems: [
      {
        quantity: 1,
        unitAmount: input.unitAmount,
        currency: input.currency,
        description: input.description,
      },
    ],
    redirectUrl: `${origin}/pago/exito`,
    cancelUrl: `${origin}/pago/cancelado`,
  };

  if (input.customerEmail) {
    body.customerEmail = input.customerEmail;
  }
  if (input.metadata) {
    body.metadata = input.metadata;
  }

  const res = await fetch(`${ONVO_API}/checkout/sessions/one-time-link`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secret}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = (await res.json().catch(() => ({}))) as {
    url?: string;
    id?: string;
    message?: string;
    error?: string | { message?: string };
  };

  if (!res.ok) {
    const msg =
      (typeof data.error === "object" ? data.error?.message : data.error) ||
      data.message ||
      `Onvo respondió ${res.status}`;
    throw new Error(msg);
  }

  if (!data.url) {
    throw new Error("Onvo no devolvió URL de checkout");
  }

  return { url: data.url, id: data.id };
}
