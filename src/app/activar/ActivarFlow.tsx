"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import VerticalIcon from "@/components/VerticalIcon";
import { appUrlDeVertical } from "@/lib/activacion";
import { pricingTiers, verticals } from "@/lib/content";

function formatCRC(amount: number) {
  return `₡${amount.toLocaleString("en-US")}`;
}

const plan = pricingTiers[0]!;

export default function ActivarFlow() {
  const params = useSearchParams();
  const verticalInicial = params.get("vertical");
  const pagoEstado = params.get("pago");

  const [verticalId, setVerticalId] = useState<string | null>(
    verticals.some((v) => v.id === verticalInicial) ? verticalInicial : null,
  );
  const [pagando, setPagando] = useState(false);
  const [errorPago, setErrorPago] = useState<string | null>(null);

  const vertical = verticals.find((v) => v.id === verticalId) ?? null;
  const disponible = verticalId ? appUrlDeVertical(verticalId) !== null : false;
  const verticalesOrdenadas = [...verticals].sort((a, b) => {
    const aOk = appUrlDeVertical(a.id) !== null ? 0 : 1;
    const bOk = appUrlDeVertical(b.id) !== null ? 0 : 1;
    return aOk - bOk;
  });

  async function pagarConTarjeta() {
    if (!verticalId || !disponible) return;
    setErrorPago(null);
    setPagando(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ verticalId }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? "No se pudo iniciar el pago");
      }
      window.location.href = data.url;
    } catch (err) {
      setErrorPago(err instanceof Error ? err.message : "Error al pagar");
      setPagando(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-5 md:px-8">
      <ScrollReveal className="mx-auto mb-12 max-w-2xl text-center">
        <p className="section-eyebrow mb-4 justify-center">Activación</p>
        <h1 className="section-title mb-4 text-white">Activá el software de tu industria</h1>
        <p className="section-lead text-white/70">
          Elegí tu industria, pagá{" "}
          <strong className="text-white">{formatCRC(plan.monthly)}/mes</strong>{" "}
          con tarjeta y creás tu cuenta. Todas las industrias están listas para
          activar.
        </p>
      </ScrollReveal>

      {pagoEstado === "cancelado" && (
        <div className="mx-auto mb-8 max-w-2xl rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-sm text-white/80">
          Cancelaste el pago. Podés elegir de nuevo la industria e intentarlo.
        </div>
      )}
      {pagoEstado === "error" || pagoEstado === "pendiente" ? (
        <div className="mx-auto mb-8 max-w-2xl rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-sm text-white/80">
          No pudimos confirmar el pago. Si te cobraron, escribinos a soporte con el
          correo que usaste en Onvo.
        </div>
      ) : null}

      <ScrollReveal className="mb-14">
        <p className="mb-2 text-[11px] font-bold tracking-[0.16em] text-white/50 uppercase">
          1 · Tu industria
        </p>
        <p className="mb-5 text-sm text-white/55">
          Todas las industrias están listas para activar.
        </p>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {verticalesOrdenadas.map((v) => {
            const activo = v.id === verticalId;
            const vive = appUrlDeVertical(v.id) !== null;
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => {
                  setVerticalId(v.id);
                  setErrorPago(null);
                }}
                className={`relative flex flex-col items-start gap-3 rounded-2xl border p-5 text-left transition ${
                  activo
                    ? "border-white/40 bg-white/10 shadow-[0_18px_40px_-24px_rgb(0_0_0_/_0.55)]"
                    : vive
                      ? "border-white/20 bg-white/[0.05] hover:border-white/35 hover:bg-white/[0.08]"
                      : "border-white/10 bg-white/[0.03] opacity-80 hover:border-white/20 hover:opacity-100"
                }`}
              >
                <span
                  className={`absolute top-3 right-3 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    vive
                      ? "bg-white text-black"
                      : "bg-white/10 text-white/50"
                  }`}
                >
                  {vive ? "Listo" : "Pronto"}
                </span>
                <VerticalIcon name={v.icon} className="h-8 w-8 text-white/80" />
                <span className="font-display text-sm font-bold text-white">
                  {v.name}
                </span>
                <span className="text-xs text-white/50">{v.subtitle}</span>
              </button>
            );
          })}
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.05] p-8">
          <p className="mb-2 text-[11px] font-bold tracking-[0.16em] text-white/50 uppercase">
            2 · Pago
          </p>
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-display text-xl font-bold text-white">
                {vertical ? vertical.name : "Elegí una industria"}
              </p>
              <p className="mt-1 text-sm text-white/55">
                {vertical ? (
                  <>
                    <strong className="text-white">
                      {formatCRC(plan.monthly)}/mes
                    </strong>{" "}
                    · suscripción con tarjeta · colones (CRC)
                  </>
                ) : (
                  <>El resumen aparece cuando elijas tu industria arriba.</>
                )}
              </p>
              {vertical && !disponible && (
                <p className="mt-2 text-sm font-semibold text-white/75">
                  {vertical.name} está casi listo — dejanos tu correo y te avisamos
                  primero.
                </p>
              )}
              {errorPago && (
                <p className="mt-2 text-sm font-medium text-white/70">{errorPago}</p>
              )}
            </div>

            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              {vertical && disponible && (
                <button
                  type="button"
                  onClick={pagarConTarjeta}
                  disabled={pagando}
                  className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-neutral-200 disabled:opacity-60"
                >
                  {pagando ? "Abriendo pago…" : "Pagar"}
                </button>
              )}
              {vertical && !disponible && (
                <a
                  href="/producto#registro"
                  className="inline-flex items-center justify-center rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/40"
                >
                  Unirme a la lista
                </a>
              )}
            </div>
          </div>
          {vertical && disponible && (
            <p className="mt-5 text-xs text-white/45">
              Al pagar te llevamos al checkout de Onvo (Visa, Mastercard, Amex y
              SINPE). Cuando el cobro quede confirmado, creás tu cuenta en{" "}
              {vertical.name} y entrás con la suscripción activa.
            </p>
          )}
        </div>
      </ScrollReveal>
    </div>
  );
}
