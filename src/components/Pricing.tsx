"use client";

import { useState } from "react";
import { pricingTiers } from "@/lib/content";
import ScrollReveal from "./ScrollReveal";

function formatCRC(amount: number) {
  return `₡${amount.toLocaleString("en-US")}`;
}

export default function Pricing() {
  const [annual, setAnnual] = useState(false);
  const plan = pricingTiers[0];
  const monthlyDisplay = annual
    ? Math.round((plan.monthly * 10) / 12)
    : plan.monthly;

  return (
    <section id="precios" className="relative py-20 md:py-28">
      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <ScrollReveal className="mx-auto mb-10 max-w-2xl text-center">
          <p className="section-eyebrow mb-4 justify-center">Precios</p>
          <h2 className="section-title mb-4 text-white">
            Un solo precio. Todas las industrias.
          </h2>
          <p className="section-lead text-white/70">
            ₡10,500 al mes para cualquier sector. Sin planes confusos ni cobros
            ocultos. Anual incluye 2 meses gratis (−17%).
          </p>
        </ScrollReveal>

        <ScrollReveal className="mb-12 flex justify-center">
          <div
            className="inline-flex items-center rounded-full border border-white/15 bg-white/5 p-1.5 backdrop-blur"
            role="group"
            aria-label="Periodo de facturación"
          >
            <button
              type="button"
              onClick={() => setAnnual(false)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                !annual
                  ? "bg-white text-ov-deep shadow-sm"
                  : "text-white/55 hover:text-white"
              }`}
            >
              Mensual
            </button>
            <button
              type="button"
              onClick={() => setAnnual(true)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                annual
                  ? "bg-white text-ov-deep shadow-sm"
                  : "text-white/55 hover:text-white"
              }`}
            >
              Anual{" "}
              <span className={annual ? "text-ov-teal" : "text-cyan-300"}>
                −17%
              </span>
            </button>
          </div>
        </ScrollReveal>

        <ScrollReveal className="mx-auto max-w-lg">
          <article className="relative flex flex-col rounded-[1.75rem] border border-cyan-300/30 bg-gradient-to-b from-white/[0.08] to-white/[0.03] p-8 text-white shadow-[0_28px_60px_-28px_rgb(8_145_178_/_0.45)] md:p-10">
            <span className="absolute -top-3 left-8 rounded-full bg-ov-teal px-3 py-1 text-[11px] font-bold text-white shadow-sm">
              {plan.badge}
            </span>
            <p className="mb-2 text-[11px] font-bold tracking-[0.16em] text-cyan-300 uppercase">
              {plan.name}
            </p>
            <p className="mb-6 text-sm text-white/60">{plan.subtitle}</p>
            <p className="font-display mb-2 text-5xl font-bold tracking-tight">
              {formatCRC(monthlyDisplay)}
              <span className="text-base font-medium text-white/50">/mes</span>
            </p>
            {annual ? (
              <p className="mb-8 text-xs text-white/45">
                Facturado {formatCRC(plan.monthly * 10)} al año
              </p>
            ) : (
              <p className="mb-8 text-xs text-white/45">
                Mismo precio en restaurantes, clínicas, retail, abogados, personal
                y el resto de verticales.
              </p>
            )}
            <ul className="mb-10 flex-1 space-y-3">
              {plan.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2.5 text-sm text-white/75"
                >
                  <span className="text-cyan-300">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <a href="/activar?plan=unico" className="btn-teal w-full">
              Activar Onvision
            </a>
          </article>
        </ScrollReveal>
      </div>
    </section>
  );
}
