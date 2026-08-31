"use client";

import { useState } from "react";
import SectionHeader from "./SectionHeader";
import ScrollReveal from "./ScrollReveal";
import PayMonthlySheet, {
  type PayMonthlySelection,
} from "./PayMonthlySheet";
import {
  CHECKOUT_IDS_BY_GROUP,
  type CheckoutGroupKey,
} from "@/lib/plans-checkout";
import { useLanguage } from "@/lib/i18n/language-provider";

const groupKeys = ["web", "shop", "software", "mobile"] as const;
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
  const [paySelection, setPaySelection] = useState<PayMonthlySelection | null>(
    null,
  );

  const group = p.groups[activeGroup];
  const planCount = group.plans.length;

  const openPaySheet = (
    plan: {
      name: string;
      price: string;
      priceAlt?: string;
    },
    planIndex: number,
  ) => {
    const ids = CHECKOUT_IDS_BY_GROUP[activeGroup as CheckoutGroupKey];
    const planId = ids?.[planIndex];
    if (!planId) return;

    setPaySelection({
      planId,
      planName: plan.name,
      categoryLabel: p.tabs[activeGroup],
      price: plan.price,
      priceAlt: plan.priceAlt,
      period: p.period,
    });
  };

  return (
    <section id="planes" className="py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <ScrollReveal>
          <SectionHeader
            label={p.label}
            title={p.title}
            description={p.description}
          />
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 mb-5 md:mb-6">
            {groupKeys.map((key) => {
              const isActive = key === activeGroup;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveGroup(key)}
                  aria-pressed={isActive}
                  className={`appearance-none text-sm font-medium px-4 sm:px-5 py-2.5 rounded-full border transition-all duration-200 text-center w-full sm:w-auto ${
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
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-5 md:mb-6 max-w-2xl">
            {group.description}
          </p>
        </ScrollReveal>

        <div
          className={`grid gap-4 md:gap-5 items-stretch ${
            planCount === 1
              ? "grid-cols-1 max-w-md mx-auto"
              : planCount === 2
                ? "grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto"
                : "grid-cols-1 md:grid-cols-3"
          }`}
        >
          {group.plans.map((plan, i) => (
            <ScrollReveal
              key={`${activeGroup}-${plan.name}`}
              delay={120 + i * 60}
              className="h-full"
            >
              <article
                className={`relative flex flex-col h-full rounded-2xl border bg-white/85 dark:bg-neutral-900/85 backdrop-blur-sm p-5 md:p-6 transition-all duration-300 ${
                  plan.highlighted
                    ? "border-accent/50 shadow-[0_24px_60px_-24px_rgba(8,145,178,0.35)]"
                    : "border-neutral-200 dark:border-neutral-800 hover:border-accent/30 hover:shadow-[0_20px_50px_-24px_rgba(8,145,178,0.15)] dark:hover:shadow-[0_20px_50px_-24px_rgba(8,145,178,0.2)]"
                }`}
              >
                {plan.highlighted && (
                  <span className="absolute -top-2.5 left-4 text-[10px] font-medium tracking-[0.12em] uppercase px-2.5 py-0.5 rounded-full bg-accent text-white whitespace-nowrap">
                    {p.mostChosen}
                  </span>
                )}

                <div className="mb-4">
                  <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 tracking-tight">
                    {plan.name}
                  </h3>
                  <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    {plan.tagline}
                  </p>
                </div>

                <div className="mb-5 pb-5 border-b border-neutral-100 dark:border-neutral-800">
                  {plan.priceFull ? (
                    <div className="space-y-3">
                      <div>
                        <p className="flex items-baseline gap-1">
                          <span className="text-3xl font-medium tracking-tight text-neutral-900 dark:text-neutral-100">
                            {plan.price}
                          </span>
                          <span className="text-sm font-medium text-accent">
                            {p.period}
                          </span>
                        </p>
                        {plan.priceAlt ? (
                          <p className="mt-0.5 text-sm font-medium tabular-nums text-neutral-500 dark:text-neutral-400">
                            {plan.priceAlt}
                          </p>
                        ) : null}
                      </div>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">
                        <span className="tabular-nums font-medium text-neutral-600 dark:text-neutral-300">
                          {plan.priceFull}
                        </span>{" "}
                        <span className="text-neutral-400 dark:text-neutral-500">
                          {p.onceLabel}
                        </span>
                        {" · "}
                        {p.onceAskPrefix}{" "}
                        <a
                          href="#cotizar"
                          className="font-medium text-accent hover:text-accent-hover transition-colors"
                        >
                          {p.onceAskLink}
                        </a>
                      </p>
                    </div>
                  ) : (
                    <>
                      <p className="text-3xl font-medium tracking-tight text-neutral-900 dark:text-neutral-100">
                        {plan.price}
                      </p>
                      {plan.unit ? (
                        <p className="text-xs text-neutral-400 mt-1">
                          {plan.unit}
                        </p>
                      ) : null}
                    </>
                  )}
                </div>

                <ul className="space-y-2.5 mb-6 flex-1">
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

                <div className="mt-auto space-y-2">
                  <button
                    type="button"
                    onClick={() => openPaySheet(plan, i)}
                    className={`appearance-none inline-flex items-center justify-center w-full rounded-xl px-5 py-3 text-sm font-medium transition-all duration-200 ${
                      plan.highlighted
                        ? "bg-accent text-white hover:bg-accent-hover shadow-sm shadow-accent/20"
                        : "border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 hover:border-accent hover:text-accent-hover bg-white dark:bg-neutral-900"
                    }`}
                  >
                    {p.payMonthlyCta}
                  </button>
                  <a
                    href="#cotizar"
                    className="appearance-none inline-flex items-center justify-center w-full rounded-xl px-5 py-2.5 text-sm font-medium text-neutral-500 dark:text-neutral-400 hover:text-accent transition-colors"
                  >
                    {p.quoteCta}
                  </a>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={280}>
          <p className="mt-8 md:mt-10 text-center text-sm text-neutral-500 dark:text-neutral-400">
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

      <PayMonthlySheet
        open={paySelection !== null}
        selection={paySelection}
        copy={p.paySheet}
        onClose={() => setPaySelection(null)}
      />
    </section>
  );
}
