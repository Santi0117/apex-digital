"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import VerticalIcon from "@/components/VerticalIcon";
import { type PlanId, appUrlDeVertical, urlDeActivacion } from "@/lib/activacion";
import { pricingTiers, verticals } from "@/lib/content";
import { site } from "@/lib/site";

function formatCRC(amount: number) {
  return `₡${amount.toLocaleString("es-CR")}`;
}

const PLAN_IDS: PlanId[] = ["base", "vertical", "pro"];

export default function ActivarFlow() {
  const params = useSearchParams();

  const planInicial = params.get("plan");
  const verticalInicial = params.get("vertical");

  const [verticalId, setVerticalId] = useState<string | null>(
    verticals.some((v) => v.id === verticalInicial) ? verticalInicial : null,
  );
  const [planId, setPlanId] = useState<PlanId>(
    PLAN_IDS.includes(planInicial as PlanId) ? (planInicial as PlanId) : "vertical",
  );

  const vertical = verticals.find((v) => v.id === verticalId) ?? null;
  const plan = pricingTiers.find((t) => t.id === planId)!;
  const urlRegistro = verticalId ? urlDeActivacion(verticalId, planId) : null;
  const disponible = verticalId ? appUrlDeVertical(verticalId) !== null : false;
  const disponibles = verticals.filter((v) => appUrlDeVertical(v.id) !== null).length;
  const verticalesOrdenadas = [...verticals].sort((a, b) => {
    const aOk = appUrlDeVertical(a.id) !== null ? 0 : 1;
    const bOk = appUrlDeVertical(b.id) !== null ? 0 : 1;
    return aOk - bOk;
  });

  return (
    <div className="mx-auto max-w-6xl px-5 md:px-8">
      <ScrollReveal className="mx-auto mb-12 max-w-2xl text-center">
        <p className="section-eyebrow mb-4 justify-center">Activación</p>
        <h1 className="section-title mb-4">Activá el software de tu industria</h1>
        <p className="section-lead">
          Dos pasos: elegí tu industria y tu plan. Hoy ya podés probar{" "}
          <strong className="text-ov-deep">{disponibles} industrias</strong> — {site.trialDays} días
          gratis, sin tarjeta.
        </p>
      </ScrollReveal>

      {/* Paso 1: industria */}
      <ScrollReveal className="mb-14">
        <p className="mb-2 text-[11px] font-bold tracking-[0.16em] text-ov-teal uppercase">
          Paso 1 · Tu industria
        </p>
        <p className="mb-5 text-sm text-ov-muted">
          Las marcadas en verde ya están listas para la prueba.
        </p>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {verticalesOrdenadas.map((v) => {
            const activo = v.id === verticalId;
            const vive = appUrlDeVertical(v.id) !== null;
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => setVerticalId(v.id)}
                className={`relative flex flex-col items-start gap-3 rounded-2xl border p-5 text-left transition ${
                  activo
                    ? "border-ov-teal bg-white shadow-[0_18px_40px_-24px_rgb(15_159_110_/_0.5)]"
                    : vive
                      ? "border-ov-teal/35 bg-ov-teal-soft/40 hover:border-ov-teal hover:bg-white"
                      : "border-ov-line bg-white/70 opacity-80 hover:border-ov-teal/40 hover:bg-white hover:opacity-100"
                }`}
              >
                <span
                  className={`absolute top-3 right-3 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    vive
                      ? "bg-ov-teal text-white"
                      : "bg-ov-surface text-ov-muted"
                  }`}
                >
                  {vive ? "Listo para probar" : "Próximamente"}
                </span>
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                    activo ? "bg-ov-teal text-white" : "bg-ov-teal-soft text-ov-teal"
                  }`}
                >
                  <VerticalIcon name={v.icon} />
                </span>
                <span>
                  <span className="block text-sm font-bold text-ov-deep">{v.name}</span>
                  <span className="mt-0.5 block text-xs text-ov-muted">{v.subtitle}</span>
                </span>
              </button>
            );
          })}
        </div>
      </ScrollReveal>

      {/* Paso 2: plan */}
      <ScrollReveal className="mb-14">
        <p className="mb-5 text-[11px] font-bold tracking-[0.16em] text-ov-teal uppercase">
          Paso 2 · Tu plan
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {pricingTiers.map((tier) => {
            const activo = tier.id === planId;
            return (
              <button
                key={tier.id}
                type="button"
                onClick={() => setPlanId(tier.id as PlanId)}
                className={`flex h-full flex-col rounded-2xl border p-6 text-left transition ${
                  activo
                    ? "border-ov-teal bg-ov-deep text-white shadow-[0_24px_50px_-28px_rgb(15_159_110_/_0.55)]"
                    : "border-ov-line bg-white hover:border-ov-teal/50"
                }`}
              >
                <span
                  className={`mb-1 text-[11px] font-bold tracking-[0.16em] uppercase ${
                    activo ? "text-ov-teal-hot" : "text-ov-teal"
                  }`}
                >
                  {tier.name}
                </span>
                <span className={`mb-4 text-xs ${activo ? "text-white/60" : "text-ov-muted"}`}>
                  {tier.subtitle}
                </span>
                <span
                  className={`font-display text-2xl font-bold ${
                    activo ? "text-white" : "text-ov-deep"
                  }`}
                >
                  {formatCRC(tier.monthly)}
                  <span
                    className={`text-sm font-medium ${activo ? "text-white/50" : "text-ov-muted"}`}
                  >
                    /mes
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </ScrollReveal>

      {/* Resumen + CTA */}
      <ScrollReveal>
        <div className="flex flex-col items-center justify-between gap-6 rounded-[1.75rem] border border-ov-line bg-white p-8 shadow-sm md:flex-row">
          <div>
            <p className="text-sm text-ov-muted">
              {vertical ? (
                <>
                  Vas a activar{" "}
                  <strong className="text-ov-deep">
                    {plan.name} · {vertical.name}
                  </strong>{" "}
                  — {formatCRC(plan.monthly)}/mes después de tus {site.trialDays} días gratis.
                </>
              ) : (
                <>Elegí tu industria arriba para continuar.</>
              )}
            </p>
            {vertical && !disponible && (
              <p className="mt-1 text-sm font-semibold text-ov-deep">
                {vertical.name} está casi listo — dejanos tu correo y te avisamos primero.
              </p>
            )}
          </div>

          {vertical && disponible && urlRegistro && (
            <a href={urlRegistro} className="btn-teal shrink-0">
              Crear cuenta y activar
            </a>
          )}
          {vertical && !disponible && (
            <a href="/#registro" className="btn-secondary-light shrink-0">
              Unirme a la lista
            </a>
          )}
        </div>
      </ScrollReveal>
    </div>
  );
}
