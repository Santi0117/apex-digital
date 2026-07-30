"use client";

import { useState } from "react";
import { pricingTiers } from "@/lib/content";
import ScrollReveal from "./ScrollReveal";

function formatCRC(amount: number) {
  return `₡${amount.toLocaleString("es-CR")}`;
}

export default function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="precios" className="bg-ov-surface py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <ScrollReveal className="mx-auto mb-10 max-w-2xl text-center">
          <p className="section-eyebrow mb-4 justify-center">Precios</p>
          <h2 className="section-title mb-4">
            Sin límites de facturas. Sin cobros ocultos.
          </h2>
          <p className="section-lead">Anual incluye 2 meses gratis (−17%).</p>
        </ScrollReveal>

        <ScrollReveal className="mb-12 flex justify-center">
          <div
            className="inline-flex items-center rounded-full border border-ov-line bg-white p-1.5 shadow-sm"
            role="group"
            aria-label="Periodo de facturación"
          >
            <button
              type="button"
              onClick={() => setAnnual(false)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                !annual
                  ? "bg-ov-deep text-white shadow-sm"
                  : "text-ov-muted hover:text-ov-ink"
              }`}
            >
              Mensual
            </button>
            <button
              type="button"
              onClick={() => setAnnual(true)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                annual
                  ? "bg-ov-deep text-white shadow-sm"
                  : "text-ov-muted hover:text-ov-ink"
              }`}
            >
              Anual{" "}
              <span className={annual ? "text-ov-teal-hot" : "text-ov-teal"}>
                −17%
              </span>
            </button>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-3">
          {pricingTiers.map((tier, i) => {
            const monthlyDisplay = annual
              ? Math.round((tier.monthly * 10) / 12)
              : tier.monthly;

            return (
              <ScrollReveal key={tier.id} delay={i * 0.06}>
                <article
                  className={`relative flex h-full flex-col rounded-[1.75rem] border p-8 transition ${
                    tier.highlighted
                      ? "border-ov-teal bg-ov-deep text-white shadow-[0_28px_60px_-28px_rgb(15_159_110_/_0.55)] lg:-translate-y-3 lg:scale-[1.02]"
                      : "border-ov-line bg-white shadow-sm"
                  }`}
                >
                  {tier.badge && (
                    <span className="absolute -top-3 left-8 rounded-full bg-ov-teal px-3 py-1 text-[11px] font-bold text-white shadow-sm">
                      {tier.badge}
                    </span>
                  )}
                  <p
                    className={`mb-2 text-[11px] font-bold tracking-[0.16em] uppercase ${
                      tier.highlighted ? "text-ov-teal-hot" : "text-ov-teal"
                    }`}
                  >
                    {tier.name}
                  </p>
                  <p
                    className={`mb-6 text-sm ${
                      tier.highlighted ? "text-white/60" : "text-ov-muted"
                    }`}
                  >
                    {tier.subtitle}
                  </p>
                  <p
                    className={`font-display mb-2 text-4xl font-bold ${
                      tier.highlighted ? "text-white" : "text-ov-deep"
                    }`}
                  >
                    {formatCRC(monthlyDisplay)}
                    <span
                      className={`text-base font-medium ${
                        tier.highlighted ? "text-white/50" : "text-ov-muted"
                      }`}
                    >
                      /mes
                    </span>
                  </p>
                  {annual && (
                    <p
                      className={`mb-8 text-xs ${
                        tier.highlighted ? "text-white/45" : "text-ov-muted"
                      }`}
                    >
                      Facturado {formatCRC(tier.monthly * 10)} al año
                    </p>
                  )}
                  {!annual && <div className="mb-8" />}
                  <ul className="mb-10 flex-1 space-y-3">
                    {tier.features.map((f) => (
                      <li
                        key={f}
                        className={`flex items-start gap-2.5 text-sm ${
                          tier.highlighted ? "text-white/75" : "text-ov-muted"
                        }`}
                      >
                        <span
                          className={
                            tier.highlighted
                              ? "text-ov-teal-hot"
                              : "text-ov-teal"
                          }
                        >
                          ✓
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={`/activar?plan=${tier.id}`}
                    className={
                      tier.highlighted
                        ? "btn-teal w-full"
                        : "btn-secondary-light w-full"
                    }
                  >
                    Empieza gratis 15 días
                  </a>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
