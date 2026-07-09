"use client";

import { useState } from "react";
import SectionHeader from "./SectionHeader";
import ScrollReveal from "./ScrollReveal";
import { useLanguage } from "@/lib/i18n/language-provider";

const groupKeys = ["web", "software", "shop", "mobile", "maintenance"] as const;
type GroupKey = (typeof groupKeys)[number];

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-4 h-4 shrink-0 text-accent mt-0.5"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M16.704 5.29a1 1 0 010 1.42l-7.25 7.25a1 1 0 01-1.42 0l-3.25-3.25a1 1 0 111.42-1.42l2.54 2.54 6.54-6.54a1 1 0 011.42 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function Plans() {
  const { copy } = useLanguage();
  const p = copy.plans;
  const [activeGroup, setActiveGroup] = useState<GroupKey>("web");

  const group = p.groups[activeGroup];
  const singleColumn =
    activeGroup === "software" || activeGroup === "mobile" || activeGroup === "maintenance";

  return (
    <section id="planes" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <ScrollReveal>
          <SectionHeader
            label={p.label}
            title={p.title}
            description={p.description}
          />
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <div className="flex flex-wrap gap-2 mb-8 md:mb-10">
            {groupKeys.map((key) => {
              const isActive = key === activeGroup;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveGroup(key)}
                  aria-pressed={isActive}
                  className={`appearance-none text-sm font-medium px-5 py-2.5 rounded-full border transition-all duration-200 ${
                    isActive
                      ? "bg-accent text-white border-accent shadow-sm shadow-accent/25"
                      : "bg-white/80 dark:bg-neutral-900/80 text-neutral-600 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700 hover:border-accent/40 hover:text-accent-hover"
                  }`}
                >
                  {p.tabs[key]}
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-8 md:mb-10 max-w-2xl">
            {group.description}
          </p>
        </ScrollReveal>

        <div
          className={`grid gap-5 md:gap-6 items-stretch ${
            singleColumn
              ? "grid-cols-1 max-w-lg mx-auto"
              : "grid-cols-1 md:grid-cols-3"
          }`}
        >
          {group.plans.map((plan, i) => (
            <ScrollReveal key={`${activeGroup}-${plan.name}`} delay={120 + i * 80} className="h-full">
              <article
                className={`relative flex flex-col h-full rounded-2xl border bg-white/85 dark:bg-neutral-900/85 backdrop-blur-sm p-7 md:p-8 transition-all duration-300 ${
                  plan.highlighted
                    ? "border-accent/50 shadow-[0_24px_60px_-24px_rgba(8,145,178,0.35)] md:-translate-y-1"
                    : "border-neutral-200 dark:border-neutral-800 hover:border-accent/30 hover:shadow-[0_20px_50px_-24px_rgba(8,145,178,0.15)] dark:hover:shadow-[0_20px_50px_-24px_rgba(8,145,178,0.2)]"
                }`}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-medium tracking-[0.12em] uppercase px-3 py-1 rounded-full bg-accent text-white whitespace-nowrap">
                    {p.mostChosen}
                  </span>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-medium text-neutral-900 dark:text-neutral-100 mb-2 tracking-tight">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed min-h-[40px]">
                    {plan.tagline}
                  </p>
                </div>

                <div className="mb-7 pb-7 border-b border-neutral-100 dark:border-neutral-800">
                  <p className="text-4xl font-medium tracking-tight text-neutral-900 dark:text-neutral-100">
                    {plan.price}
                  </p>
                  {plan.priceAlt && (
                    <>
                      <p className="text-sm text-neutral-400 dark:text-neutral-500 mt-2">
                        {plan.priceOr ?? "o"}
                      </p>
                      <p className="text-4xl font-medium tracking-tight text-neutral-900 dark:text-neutral-100 mt-1">
                        {plan.priceAlt}
                      </p>
                      {plan.unitAlt && (
                        <p className="text-2xl md:text-3xl font-medium tracking-tight text-neutral-700 dark:text-neutral-200 mt-1">
                          {plan.unitAlt}
                        </p>
                      )}
                    </>
                  )}
                  {plan.unit && !plan.unitAlt && (
                    <p className="text-xs text-neutral-400 mt-1">{plan.unit}</p>
                  )}
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed"
                    >
                      <CheckIcon />
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href="#cotizar"
                  className={`appearance-none inline-flex items-center justify-center w-full rounded-xl px-6 py-3.5 text-sm font-medium transition-all duration-200 ${
                    plan.highlighted
                      ? "bg-accent text-white hover:bg-accent-hover shadow-sm shadow-accent/20"
                      : "border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 hover:border-accent hover:text-accent-hover bg-white dark:bg-neutral-900"
                  }`}
                >
                  {activeGroup === "software" ? p.quoteCta : p.requestPlan}
                </a>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={400}>
          <p className="mt-10 md:mt-12 text-center text-sm text-neutral-500 dark:text-neutral-400">
            {p.customQuotePrefix}{" "}
            <a
              href="#cotizar"
              className="text-accent font-medium hover:text-accent-hover transition-colors"
            >
              {p.customQuoteLink}
            </a>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
