"use client";

import { useLanguage } from "@/lib/i18n/language-provider";
import type { Locale } from "@/lib/i18n/translations";

type LanguageToggleProps = {
  variant?: "dark" | "light";
};

export default function LanguageToggle({ variant = "dark" }: LanguageToggleProps) {
  const { locale, setLocale, copy } = useLanguage();

  const isDark = variant === "dark";

  const base =
    "appearance-none text-[11px] font-medium tracking-wide px-2.5 py-1 rounded-full transition-all duration-200";
  const active = isDark
    ? "bg-white text-neutral-900"
    : "bg-accent text-white";
  const inactive = isDark
    ? "text-white/60 hover:text-white"
    : "text-neutral-500 hover:text-accent";

  const item = (lang: Locale) => (
    <button
      key={lang}
      type="button"
      onClick={() => setLocale(lang)}
      aria-pressed={locale === lang}
      aria-label={lang === "es" ? copy.lang.es : copy.lang.en}
      className={`${base} ${locale === lang ? active : inactive}`}
    >
      {lang.toUpperCase()}
    </button>
  );

  return (
    <div
      className={`inline-flex items-center gap-0.5 rounded-full p-0.5 ${
        isDark
          ? "border border-white/20 bg-white/10 backdrop-blur-sm"
          : "border border-neutral-200 bg-white/80"
      }`}
      role="group"
      aria-label="Language"
    >
      {item("es")}
      <span className={`text-[10px] ${isDark ? "text-white/25" : "text-neutral-300"}`}>
        |
      </span>
      {item("en")}
    </div>
  );
}
