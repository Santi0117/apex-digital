import Link from "next/link";

type Props = {
  variant: "success" | "cancelled";
};

const copy = {
  success: {
    label: "Pago",
    title: "Listo. Recibimos tu mensualidad.",
    body: "Si acabás de completar el checkout de Onvo, tu plan quedó registrado. Te contactamos pronto para activar o continuar el proyecto.",
    primary: "Volver a planes",
    secondary: "Agendar reunión",
  },
  cancelled: {
    label: "Pago",
    title: "Pago cancelado",
    body: "No se cobró nada. Podés volver a los planes cuando quieras o escribirnos si necesitás ayuda.",
    primary: "Volver a planes",
    secondary: "Hablar por WhatsApp",
  },
} as const;

export default function PaymentResultPage({ variant }: Props) {
  const p = copy[variant];

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-black px-6 py-16 text-white">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0c0c0c] p-8 text-center shadow-2xl">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/50">
          {p.label}
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">{p.title}</h1>
        <p className="mt-3 text-sm leading-relaxed text-white/60">{p.body}</p>
        <div className="mt-8 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
          <Link
            href="/digital#planes"
            className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-neutral-200"
          >
            {p.primary}
          </Link>
          <Link
            href={variant === "success" ? "/digital#agendar" : "/digital#planes"}
            className="inline-flex items-center justify-center rounded-xl border border-white/15 px-5 py-3 text-sm font-medium text-white/85 transition hover:border-white/30"
          >
            {p.secondary}
          </Link>
        </div>
      </div>
    </main>
  );
}
