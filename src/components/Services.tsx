"use client";

import type { ReactNode } from "react";
import ScrollReveal from "./ScrollReveal";
import { useLanguage } from "@/lib/i18n/language-provider";
import type { ServiceCardCopy } from "@/lib/i18n/translations";

function ServiceIcon({ type }: { type: string }) {
  const paths: Record<string, ReactNode> = {
    globe: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A8.966 8.966 0 013 12c0-1.264.26-2.467.732-3.553"
      />
    ),
    cart: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a.75.75 0 100-1.5.75.75 0 000 1.5zm7.5 0a.75.75 0 100-1.5.75.75 0 000 1.5zM5.106 5.272H19.5l-1.125 5.25H7.617"
      />
    ),
    monitor: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
      />
    ),
    mobile: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
      />
    ),
  };

  const icons = ["globe", "cart", "monitor", "mobile"];
  const icon = icons.includes(type) ? type : "globe";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5"
    >
      {paths[icon]}
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-4 h-4 shrink-0 text-accent"
      aria-hidden
    >
      <path d="M10 1.5a.75.75 0 01.673.418l1.882 3.815 4.213.612a.75.75 0 01.416 1.279l-3.048 2.97.719 4.192a.75.75 0 01-1.088.791L10 13.347l-3.767 1.98a.75.75 0 01-1.088-.79l.72-4.194-3.048-2.968a.75.75 0 01.416-1.28l4.213-.611L9.327 1.918A.75.75 0 0110 1.5z" />
    </svg>
  );
}

const serviceIcons = ["globe", "cart", "monitor", "mobile"] as const;

function ServiceCard({
  service,
  icon,
  delay,
  resultLabel,
  ctaHref,
}: {
  service: ServiceCardCopy;
  icon: string;
  delay: number;
  resultLabel: string;
  ctaHref?: string;
}) {
  return (
    <ScrollReveal delay={delay} className="h-full">
      <article className="group flex flex-col h-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm p-7 md:p-8 transition-all duration-300 hover:border-accent/40 hover:shadow-[0_20px_50px_-20px_rgba(8,145,178,0.18)] dark:hover:shadow-[0_20px_50px_-20px_rgba(8,145,178,0.25)]">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex items-center justify-center w-11 h-11 rounded-xl border border-accent/20 bg-accent-soft dark:bg-cyan-950/40 text-accent">
            <ServiceIcon type={icon} />
          </div>
          <span className="font-mono text-[10px] tracking-wider text-neutral-400 pt-1">
            {service.code}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-[10px] font-medium tracking-[0.15em] uppercase px-2.5 py-1 rounded-full bg-accent-soft dark:bg-cyan-950/40 text-accent border border-accent/15">
            {service.tier}
          </span>
          {service.badge && (
            <span className="text-[10px] font-medium tracking-wide uppercase px-2.5 py-1 rounded-full bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900">
              {service.badge}
            </span>
          )}
        </div>

        <h3 className="text-xl md:text-2xl font-medium text-neutral-900 dark:text-neutral-100 mb-3 tracking-tight leading-snug">
          {service.title}
        </h3>
        <p className="text-sm md:text-[15px] text-neutral-500 dark:text-neutral-400 leading-relaxed mb-6">
          {service.description}
        </p>

        <ul className="space-y-2.5 mb-7 flex-1">
          {service.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2.5 text-sm text-neutral-600 dark:text-neutral-300"
            >
              <span className="mt-0.5 text-accent font-medium shrink-0">✓</span>
              {feature}
            </li>
          ))}
        </ul>

        <div className="flex items-start gap-2.5 rounded-xl bg-accent-soft/60 dark:bg-cyan-950/30 border border-accent/10 px-4 py-3.5 mb-6">
          <SparkleIcon />
          <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
            <span className="font-medium text-neutral-900 dark:text-neutral-100">{resultLabel} </span>
            {service.result}
          </p>
        </div>

        <a
          href={ctaHref ?? "#cotizar"}
          className="inline-flex items-center text-sm font-medium text-accent hover:text-accent-hover transition-colors duration-200"
        >
          {service.cta}
        </a>
      </article>
    </ScrollReveal>
  );
}

export default function Services() {
  const { copy } = useLanguage();
  const s = copy.services;

  return (
    <section id="servicios" className="pt-16 md:pt-24 pb-10 md:pb-12">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <ScrollReveal>
          <div className="mb-8 md:mb-10">
            <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-accent mb-4">
              {s.main.label}
            </p>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-neutral-900 dark:text-neutral-100 mb-3 text-balance">
              {s.main.title}
            </h2>
            <p className="text-neutral-500 dark:text-neutral-400 text-base md:text-lg leading-relaxed max-w-2xl">
              {s.main.description}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6 mb-16 md:mb-20">
          {s.main.cards.map((service, i) => (
            <ServiceCard
              key={service.code}
              service={service}
              icon={serviceIcons[i] ?? "globe"}
              delay={i * 100}
              resultLabel={s.resultLabel}
              ctaHref="#planes"
            />
          ))}
        </div>

        <ScrollReveal delay={80}>
          <p className="text-center text-[11px] font-medium tracking-[0.22em] uppercase text-neutral-400 dark:text-neutral-500 mb-10 md:mb-12">
            {s.divider}
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mb-8 md:mb-10">
            <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-accent mb-4">
              {s.custom.label}
            </p>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-neutral-900 dark:text-neutral-100 mb-3 text-balance">
              {s.custom.title}
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6">
          {s.custom.cards.map((service, i) => (
            <ServiceCard
              key={service.code}
              service={service}
              icon={serviceIcons[i + 2] ?? "monitor"}
              delay={200 + i * 100}
              resultLabel={s.resultLabel}
              ctaHref={service.code === "SVC-04" ? "#planes" : "#cotizar"}
            />
          ))}
        </div>

        <ScrollReveal delay={500} className="flex justify-center mt-4">
          <a
            href="#portafolio"
            className="flex items-center justify-center w-10 h-10 rounded-full border border-neutral-200 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/80 text-neutral-400 hover:border-accent hover:bg-accent-soft dark:hover:bg-cyan-950/40 hover:text-accent transition-all duration-200 hover:scale-110"
            aria-label={s.portfolioScroll}
          >
            ↓
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
