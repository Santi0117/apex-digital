"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Logo from "./Logo";
import HeroBlueprint from "./HeroBlueprint";
import LanguageToggle from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";
import { useLanguage } from "@/lib/i18n/language-provider";

export default function Hero() {
  const { copy } = useLanguage();
  const [ready, setReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: copy.nav.services, href: "#servicios" },
    { label: copy.nav.portfolio, href: "#portafolio" },
    { label: copy.nav.plans, href: "#planes" },
    { label: copy.nav.schedule, href: "#agendar" },
    { label: copy.nav.process, href: "#proceso" },
    { label: copy.nav.contact, href: "#cotizar" },
  ];

  useEffect(() => {
    const t = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(t);
  }, []);

  return (
    <section className="relative overflow-hidden min-h-screen min-h-[640px] flex flex-col">
      <Image
        src="/herr-bg.jpg"
        alt={copy.hero.bgAlt}
        fill
        priority
        className="object-cover object-center"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/65" />

      <nav className="relative z-10 flex items-center justify-between gap-3 px-4 sm:px-6 md:px-10 lg:px-14 py-4 sm:py-5 shrink-0">
        <a href="#" className="hover:opacity-90 transition-opacity shrink-0">
          <span className="md:hidden">
            <Logo variant="light" size="sm" showName={false} />
          </span>
          <span className="hidden md:inline-flex">
            <Logo variant="light" size="lg" />
          </span>
        </a>

        <div className="hidden md:flex gap-8 flex-1 justify-center">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-white/65 hover:text-accent-muted text-sm transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <ThemeToggle variant="dark" />
          <LanguageToggle variant="dark" />
          <a
            href="#cotizar"
            className="hidden sm:inline-flex appearance-none text-sm font-medium px-5 py-2 rounded-full border border-white/25 bg-white/10 text-white hover:bg-accent hover:border-accent hover:text-white transition-all duration-200"
          >
            {copy.nav.letsTalk}
          </a>
          <button
            type="button"
            className="flex flex-col justify-center gap-1.5 md:hidden p-1 -mr-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? copy.hero.menuClose : copy.hero.menuOpen}
            aria-expanded={menuOpen}
          >
            <span className={`block h-0.5 w-6 bg-white transition-transform ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-6 bg-white transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-6 bg-white transition-transform ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="relative z-20 border-t border-white/10 bg-black/80 backdrop-blur-xl px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-white/85"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="relative z-10 flex-1 flex items-center px-6 sm:px-10 lg:px-14 pb-20 pt-4">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_minmax(300px,440px)] gap-10 lg:gap-12 xl:gap-16 items-center">
          <div
            className={`max-w-3xl transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              ready ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="inline-flex items-center gap-2 text-xs px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-white/85 mb-6 sm:mb-8 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-muted animate-pulse" />
              {copy.hero.badge}
            </div>

            <h1 className="text-[2rem] leading-[1.12] sm:text-5xl sm:leading-[1.1] lg:text-[3.25rem] lg:leading-[1.08] font-medium text-white mb-5 sm:mb-6 tracking-tight text-balance">
              {copy.hero.title}{" "}
              <span className="block mt-1 sm:mt-2 text-white/55 font-normal">
                {copy.hero.titleAccent}
              </span>
            </h1>

            <p className="text-white/70 text-[15px] sm:text-base lg:text-lg leading-relaxed mb-8 sm:mb-10 max-w-lg text-pretty">
              {copy.hero.description}
            </p>

            <div className="flex flex-wrap gap-x-3 gap-y-3 max-w-xl mb-10 sm:mb-12">
              {copy.hero.pills.map((s) => (
                <span
                  key={s}
                  className="text-xs sm:text-sm px-4 sm:px-5 py-2 rounded-full bg-white/8 border border-white/15 text-white/75 cursor-default hover:bg-accent/20 hover:border-accent/40 hover:text-white transition-all duration-200"
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 pt-8 sm:pt-10 border-t border-white/10 max-w-md sm:max-w-none">
              <a
                href="#cotizar"
                className="appearance-none text-center text-sm font-medium px-8 py-3.5 rounded-full bg-white text-neutral-900 hover:bg-accent-soft hover:text-accent-hover transition-colors duration-200"
              >
                {copy.hero.contactUs}
              </a>
              <a
                href="#agendar"
                className="appearance-none text-center text-sm px-8 py-3.5 rounded-full border border-white/30 text-white hover:bg-white/10 hover:border-accent-muted/50 transition-all duration-200"
              >
                {copy.hero.scheduleCta}
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
