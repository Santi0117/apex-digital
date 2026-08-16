import { redirect } from "next/navigation";
import { urlDeActivacion } from "@/lib/activacion";
import { getStripe } from "@/lib/stripe";

type Props = {
  searchParams: Promise<{ session_id?: string; vertical?: string }>;
};

/**
 * Tras pagar en Stripe: verificamos la sesión y mandamos al registro
 * de la app del vertical con billing=activa.
 *
 * `redirect()` lanza: no va dentro de try/catch genérico.
 */
export default async function ActivarExitoPage({ searchParams }: Props) {
  const params = await searchParams;
  const sessionId = params.session_id;
  const verticalId = params.vertical;

  if (!sessionId || !verticalId) {
    redirect("/activar?pago=error");
  }

  let destino: string | null = null;
  let fallo: "pendiente" | "error" | null = null;

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    const pagado =
      session.payment_status === "paid" ||
      session.status === "complete" ||
      session.payment_status === "no_payment_required";

    const verticalOk =
      !session.metadata?.verticalId ||
      session.metadata.verticalId === verticalId;

    if (!pagado || !verticalOk) {
      fallo = "pendiente";
    } else {
      destino = urlDeActivacion(verticalId, "unico", {
        billing: "activa",
        sessionId,
      });
      if (!destino) fallo = "error";
    }
  } catch {
    fallo = "error";
  }

  if (fallo) {
    redirect(
      `/activar?vertical=${encodeURIComponent(verticalId)}&pago=${fallo}`,
    );
  }

  redirect(destino!);
}
