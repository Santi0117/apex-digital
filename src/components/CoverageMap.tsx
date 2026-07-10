"use client";

import { useState } from "react";
import SectionHeader from "./SectionHeader";
import ScrollReveal from "./ScrollReveal";
import {
  americasCountries,
  defaultCountry,
  type CountryInfo,
} from "@/lib/americas-countries";
import { useLanguage } from "@/lib/i18n/language-provider";

export default function CoverageMap() {
  const { copy } = useLanguage();
  const c = copy.coverage;
  const [active, setActive] = useState<CountryInfo>(defaultCountry);
  const [hovered, setHovered] = useState<CountryInfo | null>(null);

  const display = hovered ?? active;
  const countryCopy = c.countries[display.id];

  return (
    <section id="cobertura" className="py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <ScrollReveal>
          <SectionHeader
            label={c.label}
            title={c.title}
            description={c.description}
          />
        </ScrollReveal>

        <ScrollReveal delay={120}>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 lg:gap-12 items-start">
            <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 p-4 sm:p-6 md:p-8">
              <svg
                viewBox="0 0 520 720"
                className="w-full h-auto max-h-[560px] mx-auto"
                role="img"
                aria-label={c.mapAria}
              >
                {americasCountries.map((country) => {
                  const isActive = active.id === country.id;
                  const isHovered = hovered?.id === country.id;

                  return (
                    <path
                      key={country.id}
                      d={country.path}
                      onClick={() => setActive(country)}
                      onMouseEnter={() => setHovered(country)}
                      onMouseLeave={() => setHovered(null)}
                      onFocus={() => setHovered(country)}
                      onBlur={() => setHovered(null)}
                      tabIndex={0}
                      role="button"
                      aria-label={`${c.countryAriaPrefix}${countryCopy?.name ?? country.name}`}
                      aria-pressed={isActive}
                      className={`cursor-pointer outline-none transition-all duration-300 ease-out stroke-white dark:stroke-neutral-900 stroke-[1.5] focus-visible:fill-accent focus-visible:stroke-accent ${
                        isActive || isHovered
                          ? "fill-accent stroke-accent-hover"
                          : "fill-neutral-200 dark:fill-neutral-700 hover:fill-accent-muted/60"
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
                {c.mapHint}
              </p>
            </div>

            <div
              className={`rounded-2xl border p-6 md:p-7 transition-all duration-300 ${
                hovered
                  ? "border-accent bg-accent-soft dark:bg-cyan-950/40 shadow-lg shadow-accent/10"
                  : "border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900"
              }`}
            >
              <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-accent mb-3">
                {c.countryLabel}
              </p>
              <h3 className="text-2xl font-medium text-neutral-900 dark:text-neutral-100 mb-1 tracking-tight">
                {countryCopy?.name ?? display.name}
              </h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">
                {c.capitalPrefix}
                {countryCopy?.capital ?? display.capital}
              </p>

              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="text-neutral-400 mb-1">{c.stats.businessesLabel}</dt>
                  <dd className="text-neutral-800 dark:text-neutral-200 font-medium">
                    {display.population} {c.stats.pymesSuffix}
                  </dd>
                </div>
                <div>
                  <dt className="text-neutral-400 mb-1">{c.stats.zoneLabel}</dt>
                  <dd className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    {countryCopy.highlight}
                  </dd>
                </div>
                <div>
                  <dt className="text-neutral-400 mb-1">{c.stats.servicesLabel}</dt>
                  <dd className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    {countryCopy.services}
                  </dd>
                </div>
              </dl>

              <a
                href="#cotizar"
                className="inline-flex mt-8 text-sm font-medium text-accent hover:text-accent-hover transition-colors"
              >
                {c.consultCta}
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
