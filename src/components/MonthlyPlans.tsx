"use client";

import SectionHeader from "./SectionHeader";
import ScrollReveal from "./ScrollReveal";
import { site } from "@/lib/site";
import { useLanguage } from "@/lib/i18n/language-provider";

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="mt-0.5 h-4 w-4 shrink-0 text-accent"
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

type Plan = {
  id: string;
  name: string;
  tagline: string;
  price: string;
  priceAlt?: string;
  priceFull?: string;
  features: string[];
  highlighted?: boolean;
};

function PlanBlock({
  plan,
  period,
  onceLabel,
  payCta,
  mostChosen,
  payHref,
  nested = false,
}: {
  plan: Plan;
  period: string;
  onceLabel: string;
  payCta: string;
  mostChosen: string;
  payHref: string;
  nested?: boolean;
}) {
  return (
    <div
      className={`relative flex h-full min-h-0 flex-col ${
        nested
          ? `rounded-xl border p-5 ${
              plan.highlighted
                ? "border-accent/45 bg-accent/5 dark:bg-accent/10"
                : "border-neutral-200/90 bg-neutral-50/80 dark:border-neutral-700 dark:bg-neutral-950/50"
            }`
          : `rounded-2xl border p-5 md:p-6 ${
              plan.highlighted
                ? "border-accent/50 bg-white/90 shadow-[0_24px_60px_-24px_rgba(8,145,178,0.35)] dark:bg-neutral-900/90"
                : "border-neutral-200 bg-white/85 dark:border-neutral-800 dark:bg-neutral-900/85"
            }`
      }`}
    >
      {plan.highlighted && (
        <span className="absolute -top-2.5 left-4 z-10 whitespace-nowrap rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-white">
          {mostChosen}
        </span>
      )}

      <div className="mb-4">
        <h4 className="text-lg font-medium tracking-tight text-neutral-900 dark:text-neutral-100">
          {plan.name}
        </h4>
        <p className="mt-1 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
          {plan.tagline}
        </p>
        <div className="mt-3 flex items-start justify-between gap-4">
          <div>
            <p className="flex items-baseline gap-1">
              <span className="text-3xl font-medium tracking-tight text-neutral-900 dark:text-neutral-100">
                {plan.price}
              </span>
              <span className="text-sm font-medium text-accent">{period}</span>
            </p>
            {plan.priceAlt ? (
              <p className="mt-0.5 text-sm font-medium tabular-nums text-neutral-500 dark:text-neutral-400">
                {plan.priceAlt}
              </p>
            ) : null}
          </div>
          {plan.priceFull ? (
            <div className="text-right">
              <p className="text-3xl font-medium tracking-tight text-neutral-900 dark:text-neutral-100">
                {plan.priceFull}
              </p>
              <p className="mt-0.5 text-sm font-medium text-neutral-500 dark:text-neutral-400 sm:text-base">
                {onceLabel}
              </p>
            </div>
          ) : null}
        </div>
      </div>

      <ul className="mb-5 flex-1 space-y-2.5 border-t border-neutral-200/80 pt-4 dark:border-neutral-700/80">
        {plan.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-2.5 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300"
          >
            <CheckIcon />
            {feature}
          </li>
        ))}
      </ul>

      <a
        href={payHref}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-auto inline-flex w-full items-center justify-center rounded-xl px-5 py-3 text-sm font-medium transition-all duration-200 ${
          plan.highlighted
            ? "bg-accent text-white shadow-sm shadow-accent/20 hover:bg-accent-hover"
            : "border border-neutral-200 bg-white text-neutral-900 hover:border-accent hover:text-accent-hover dark:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-100"
        }`}
      >
        {payCta}
      </a>
    </div>
  );
}

export default function MonthlyPlans() {
  const { copy } = useLanguage();
  const p = copy.monthlyPlans;
  const planById = Object.fromEntries(p.plans.map((plan) => [plan.id, plan]));

  const payHref = (name: string, price: string) => {
    const text = p.payMessage
      .replace("{name}", name)
      .replace("{price}", price);
    return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
  };

  const pairGroups = p.groups.filter((g) => g.id !== "productos");
  const productGroup = p.groups.find((g) => g.id === "productos");

  return (
    <section id="planes" className="relative z-10 px-6 py-16 md:px-12 md:py-24">
      <div className="mx-auto max-w-4xl">
        <ScrollReveal>
          <SectionHeader
            label={p.label}
            title={p.title}
            description={p.description}
          />
        </ScrollReveal>

        <ScrollReveal delay={80}>
          {/*
            Subgrid alinea filas entre columnas:
            fila 1 = título, fila 2 = plan estándar, fila 3 = plan pro
          */}
          <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2 sm:grid-rows-[auto_1fr_1fr] sm:gap-x-5 sm:gap-y-4">
            {pairGroups.map((group) => {
              const plans = group.planIds
                .map((id) => planById[id])
                .filter((plan): plan is Plan => Boolean(plan));

              return (
                <div
                  key={group.id}
                  className="grid grid-cols-1 gap-4 rounded-2xl border border-neutral-200 bg-white/90 p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900/85 sm:row-span-3 sm:grid-rows-subgrid sm:gap-y-4 md:p-5"
                >
                  <h3 className="text-[11px] font-medium uppercase tracking-[0.2em] text-accent">
                    {group.title}
                  </h3>
                  {plans.map((plan) => (
                    <PlanBlock
                      key={plan.id}
                      plan={plan}
                      period={p.period}
                      onceLabel={p.onceLabel}
                      payCta={p.payCta}
                      mostChosen={p.mostChosen}
                      payHref={payHref(plan.name, plan.price)}
                      nested
                    />
                  ))}
                </div>
              );
            })}
          </div>
        </ScrollReveal>

        {productGroup && (
          <ScrollReveal delay={220}>
            <div className="mx-auto mt-10 max-w-3xl md:mt-12">
              <h3 className="mb-5 text-[11px] font-medium uppercase tracking-[0.2em] text-accent">
                {productGroup.title}
              </h3>
              <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 sm:gap-5 md:gap-6">
                {productGroup.planIds
                  .map((id) => planById[id])
                  .filter((plan): plan is Plan => Boolean(plan))
                  .map((plan) => (
                    <PlanBlock
                      key={plan.id}
                      plan={plan}
                      period={p.period}
                      onceLabel={p.onceLabel}
                      payCta={p.payCta}
                      mostChosen={p.mostChosen}
                      payHref={payHref(plan.name, plan.price)}
                    />
                  ))}
              </div>
            </div>
          </ScrollReveal>
        )}

        <ScrollReveal delay={360}>
          <p className="mt-10 text-center text-sm text-neutral-500 dark:text-neutral-400 md:mt-12">
            {p.note}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
