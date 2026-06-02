"use client";

import { useState } from "react";
import SectionHeader from "./SectionHeader";
import ScrollReveal from "./ScrollReveal";
import {
  defaultProvince,
  provinces,
  type ProvinceInfo,
} from "@/lib/costa-rica-provinces";

export default function CoverageMap() {
  const [active, setActive] = useState<ProvinceInfo>(defaultProvince);
  const [hovered, setHovered] = useState<ProvinceInfo | null>(null);

  const display = hovered ?? active;

  return (
    <section id="cobertura" className="bg-white py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <ScrollReveal>
          <SectionHeader
            label="Cobertura"
            title="Trabajamos en todo Costa Rica"
            description="Seleccioná una provincia en el mapa para conocer más sobre la cobertura y servicios disponibles en cada zona."
          />
        </ScrollReveal>

        <ScrollReveal delay={120}>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 lg:gap-12 items-start">
            <div className="rounded-2xl border border-neutral-200 bg-neutral-50/50 p-4 sm:p-6 md:p-8">
              <svg
                viewBox="0 0 1000 1000"
                className="w-full h-auto max-h-[520px]"
                role="img"
                aria-label="Mapa interactivo de Costa Rica por provincias"
              >
                {provinces.map((province) => {
                  const isActive = active.id === province.id;
                  const isHovered = hovered?.id === province.id;

                  return (
                    <path
                      key={province.id}
                      d={province.path}
                      onClick={() => setActive(province)}
                      onMouseEnter={() => setHovered(province)}
                      onMouseLeave={() => setHovered(null)}
                      onFocus={() => setHovered(province)}
                      onBlur={() => setHovered(null)}
                      tabIndex={0}
                      role="button"
                      aria-label={`Provincia de ${province.name}`}
                      aria-pressed={isActive}
                      className={`cursor-pointer outline-none transition-all duration-300 ease-out stroke-white stroke-[2] focus-visible:fill-accent focus-visible:stroke-accent ${
                        isActive || isHovered
                          ? "fill-accent stroke-accent-hover"
                          : "fill-neutral-200 hover:fill-accent-muted/60"
                      }`}
                      style={{
                        filter:
                          isActive || isHovered
                            ? "drop-shadow(0 4px 12px rgb(8 145 178 / 0.25))"
                            : "none",
                      }}
                    />
                  );
                })}
              </svg>
              <p className="text-xs text-neutral-400 mt-4 text-center lg:text-left">
                Tocá o pasá el cursor sobre una provincia
              </p>
            </div>

            <div
              className={`rounded-2xl border p-6 md:p-7 transition-all duration-300 ${
                hovered
                  ? "border-accent bg-accent-soft shadow-lg shadow-accent/10"
                  : "border-neutral-200 bg-white"
              }`}
            >
              <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-accent mb-3">
                Provincia
              </p>
              <h3 className="text-2xl font-medium text-neutral-900 mb-1 tracking-tight">
                {display.name}
              </h3>
              <p className="text-sm text-neutral-500 mb-6">
                Capital: {display.capital}
              </p>

              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="text-neutral-400 mb-1">Negocios sin digitalización.</dt>
                  <dd className="text-neutral-800 font-medium">
                    {display.population} pymes.
                  </dd>
                </div>
                <div>
                  <dt className="text-neutral-400 mb-1">Zona</dt>
                  <dd className="text-neutral-700 leading-relaxed">
                    {display.highlight}
                  </dd>
                </div>
                <div>
                  <dt className="text-neutral-400 mb-1">Servicios frecuentes</dt>
                  <dd className="text-neutral-700 leading-relaxed">
                    {display.services}
                  </dd>
                </div>
              </dl>

              <a
                href="#cotizar"
                className="inline-flex mt-8 text-sm font-medium text-accent hover:text-accent-hover transition-colors"
              >
                Consultar disponibilidad →
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
