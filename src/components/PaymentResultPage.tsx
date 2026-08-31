"use client";

import Link from "next/link";
import LanguageToggle from "@/components/LanguageToggle";
import ThemeToggle from "@/components/ThemeToggle";
import { useLanguage } from "@/lib/i18n/language-provider";

type PaymentResultPageProps = {
  variant: "success" | "cancelled";
};

export default function PaymentResultPage({ variant }: PaymentResultPageProps) {
  const { copy } = useLanguage();
  const p = copy.payment[variant];

  return (
    <main className="relative min-h-screen bg-page flex items-center justify-center px-6 py-16">
      <div className="absolute right-4 top-4 flex items-center gap-2 sm:right-6 sm:top-6">
        <ThemeToggle variant="light" />
        <LanguageToggle variant="light" />
      </div>

      <div className="max-w-md w-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-8 text-center shadow-sm">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-accent">
          {p.label}
        </p>
        <h1 className="mt-2 text-2xl font-medium tracking-tight text-neutral-900 dark:text-neutral-100">
          {p.title}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          {p.body}
        </p>
        <div className="mt-8 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
          <Link
            href="/#planes"
            className="inline-flex items-center justify-center rounded-xl bg-accent px-5 py-3 text-sm font-medium text-white hover:bg-accent-hover transition-colors"
          >
            {p.backPlans}
          </Link>
          <Link
            href="/#cotizar"
            className="inline-flex items-center justify-center rounded-xl border border-neutral-200 dark:border-neutral-700 px-5 py-3 text-sm font-medium text-neutral-800 dark:text-neutral-100 hover:border-accent transition-colors"
          >
            {variant === "cancelled"
              ? copy.payment.cancelled.quote
              : copy.payment.success.contact}
          </Link>
        </div>
      </div>
    </main>
  );
}
