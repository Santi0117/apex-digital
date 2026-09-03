"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import HeroBlueprint from "./HeroBlueprint";
import LanguageToggle from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";
import LineWaves from "./ui/LineWaves";
import { useLanguage } from "@/lib/i18n/language-provider";
import { site } from "@/lib/site";

export default function Hero() {
  const { copy } = useLanguage();
  const [ready, setReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { label: copy.nav.services, href: "#servicios" },
    { label: copy.nav.portfolio, href: "#galeria-stack" },
    { label: copy.nav.companies, href: "/empresas" },
    { label: copy.nav.plans, href: "#planes" },
    { label: copy.nav.schedule, href: "#agendar" },
    { label: copy.nav.contact, href: "#cotizar" },
  ];

  useEffect(() => {
    const t = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(t);
  }, []);

  useEffect(() => {
    const updateScrolled = () => setScrolled(window.scrollY > 8);

    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });
    return () => window.removeEventListener("scroll", updateScrolled);
  }, []);

  return (
    <section className="relative overflow-x-hidden min-h-screen flex flex-col bg-neutral-950">
      <div className="absolute inset-0 z-0" aria-hidden>
        <LineWaves
          speed={0.3}
          innerLineCount={32}
          outerLineCount={36}
          warpIntensity={1}
          rotation={-45}
          edgeFadeWidth={0}
          colorCycleSpeed={1}
          brightness={0.2}
          color1="#0a63f6"
          color2="#365587"
          color3="#5090a1"
          enableMouseInteraction={true}
          mouseInfluence={2}
        />
      </div>

      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/55 via-black/45 to-black/70 pointer-events-none" />

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color,backdrop-filter] duration-300 ${
          scrolled
            ? "border-b border-neutral-200/70 bg-page/90 shadow-sm backdrop-blur-md dark:border-neutral-800/80"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav className="relative z-10 flex items-center justify-between gap-3 px-4 sm:px-6 md:px-10 lg:px-14 py-4 sm:py-5 shrink-0">
          <Link href="/" className="hover:opacity-90 transition-opacity shrink-0">
            <span className="md:hidden">
              <Logo
                variant={scrolled ? "dark" : "light"}
                size="sm"
                showName={false}
              />
            </span>
            <span className="hidden md:inline-flex">
              <Logo variant={scrolled ? "dark" : "light"} size="lg" />
            </span>
          </Link>

          <div className="hidden md:flex gap-8 flex-1 justify-center">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`text-sm transition-colors duration-200 ${
                  scrolled
                    ? "text-neutral-600 hover:text-accent dark:text-neutral-300 dark:hover:text-accent"
                    : "text-white/65 hover:text-accent-muted"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-1 sm:gap-2 shrink-0 min-w-0">
            <ThemeToggle variant={scrolled ? "light" : "dark"} />
            <LanguageToggle variant={scrolled ? "light" : "dark"} />
          <a
            href={site.onvisionSystemUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={copy.hero.systemCta}
            className="group relative inline-flex appearance-none items-center gap-1.5 sm:gap-2 overflow-hidden text-[11px] sm:text-sm font-semibold px-2.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-accent text-white shadow-[0_0_0_1px_rgba(165,243,252,0.35),0_8px_28px_-6px_rgba(8,145,178,0.75)] hover:bg-accent-hover hover:shadow-[0_0_0_1px_rgba(165,243,252,0.5),0_12px_32px_-4px_rgba(8,145,178,0.9)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 whitespace-nowrap max-w-[min(100%,11.5rem)] sm:max-w-none"
          >
            <span
              className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent group-hover:translate-x-full transition-transform duration-700 ease-out"
              aria-hidden
            />
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-muted opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
            </span>
            <span className="relative truncate sm:hidden">{copy.hero.systemCtaShort}</span>
            <span className="relative hidden sm:inline">{copy.hero.systemCta}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="relative hidden sm:block h-3.5 w-3.5 opacity-90 transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden
            >
              <path
                fillRule="evenodd"
                d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
                clipRule="evenodd"
              />
            </svg>
          </a>
            <button
              type="button"
              className="flex flex-col justify-center gap-1.5 md:hidden p-1 -mr-1 shrink-0"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? copy.hero.menuClose : copy.hero.menuOpen}
              aria-expanded={menuOpen}
            >
              <span
                className={`block h-0.5 w-6 transition-transform ${
                  scrolled ? "bg-neutral-800 dark:bg-neutral-200" : "bg-white"
                } ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
              />
              <span
                className={`block h-0.5 w-6 transition-opacity ${
                  scrolled ? "bg-neutral-800 dark:bg-neutral-200" : "bg-white"
                } ${menuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-0.5 w-6 transition-transform ${
                  scrolled ? "bg-neutral-800 dark:bg-neutral-200" : "bg-white"
                } ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
              />
            </button>
          </div>
        </nav>

        {menuOpen && (
          <div
            className={`relative z-20 border-t px-6 py-4 backdrop-blur-xl md:hidden ${
              scrolled
                ? "border-neutral-200/80 bg-page/95 dark:border-neutral-800"
                : "border-white/10 bg-black/80"
            }`}
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`text-sm ${
                    scrolled
                      ? "text-neutral-700 dark:text-neutral-200"
                      : "text-white/85"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      <div className="h-[4.5rem] shrink-0 sm:h-20" aria-hidden />

      <div className="relative z-10 flex-1 flex items-start lg:items-center px-6 sm:px-10 lg:px-14 pb-12 pt-4 sm:pb-16">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_minmax(300px,440px)] gap-8 lg:gap-12 xl:gap-16 items-start lg:items-center">
          <div
            className={`max-w-3xl transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              ready ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="inline-flex items-center gap-2 text-xs px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-white/85 mb-4 sm:mb-6 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-muted animate-pulse" />
              {copy.hero.badge}
            </div>

            <h1 className="text-[2rem] leading-[1.12] sm:text-5xl sm:leading-[1.1] lg:text-[3.25rem] lg:leading-[1.08] font-medium text-white mb-4 sm:mb-5 tracking-tight text-balance">
              {copy.hero.title}{" "}
              <span className="block mt-1 sm:mt-2 text-accent-muted font-normal">
                {copy.hero.titleAccent}
              </span>
            </h1>

            <div className="mb-6 sm:mb-8 max-w-lg rounded-2xl border border-accent/40 bg-accent/15 backdrop-blur-sm px-4 py-3.5 sm:px-5 sm:py-4 shadow-lg shadow-accent/15">
              <ul className="space-y-2">
                {(copy.hero.pricePlans ?? []).map((plan) => (
                  <li
                    key={plan.label}
                    className="flex items-baseline justify-between gap-3 border-b border-white/10 pb-2 last:border-b-0 last:pb-0"
                  >
                    <span className="text-sm text-white/80">{plan.label}</span>
                    <span className="shrink-0 text-right tabular-nums">
                      <span className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                        {plan.amount}
                      </span>
                      <span className="ml-1 text-sm font-medium text-accent-muted">
                        {copy.hero.pricePeriod}
                      </span>
                      {"amountAlt" in plan && plan.amountAlt ? (
                        <span className="mt-0.5 block text-xs font-medium tabular-nums text-white/70">
                          {plan.amountAlt}
                        </span>
                      ) : null}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-2.5 text-xs sm:text-sm text-white/55 leading-relaxed">
                {copy.hero.priceNote}
              </p>
            </div>

            <p className="text-white/70 text-[15px] sm:text-base leading-relaxed mb-6 sm:mb-8 max-w-lg text-pretty">
              {copy.hero.description}
            </p>

            <div className="flex flex-wrap gap-x-3 gap-y-3 max-w-xl mb-8 sm:mb-10">
              {copy.hero.pills.map((s) => (
                <span
                  key={s}
                  className="text-xs sm:text-sm px-4 sm:px-5 py-2 rounded-full bg-white/8 border border-white/15 text-white/75 cursor-default hover:bg-accent/20 hover:border-accent/40 hover:text-white transition-all duration-200"
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="pt-6 sm:pt-8 border-t border-white/10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <a
                href="#agendar"
                className="appearance-none inline-flex text-center justify-center text-sm font-medium px-8 py-3.5 rounded-full bg-white text-neutral-900 hover:bg-accent-soft hover:text-accent-hover transition-colors duration-200"
              >
                {copy.hero.scheduleCta}
              </a>
              <a
                href="/empresas"
                className="appearance-none inline-flex text-center justify-center text-sm font-medium px-6 sm:px-8 py-3.5 rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-accent hover:border-accent transition-colors duration-200"
              >
                {copy.hero.trustedCta}
              </a>
            </div>
          </div>

          <div
            className={`w-full max-w-[440px] mx-auto lg:mx-0 lg:ml-auto transition-all duration-1000 delay-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              ready
                ? "opacity-100 translate-y-0 lg:translate-x-0"
                : "opacity-0 translate-y-8 lg:translate-y-0 lg:translate-x-10"
            }`}
          >
            <HeroBlueprint />
          </div>
        </div>
      </div>
    </section>
  );
}
