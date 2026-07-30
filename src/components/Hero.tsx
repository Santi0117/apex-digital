"use client";

import { hero } from "@/lib/content";
import BlurText from "./BlurText";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-12 md:pt-40 md:pb-16">
      <div className="mx-auto max-w-4xl px-5 text-center md:px-8">
        <p className="font-display mb-6 text-[2.75rem] leading-none font-bold tracking-[-0.04em] text-ov-deep sm:text-6xl md:text-7xl">
          {hero.brand}
        </p>

        <BlurText
          text={`${hero.line1} ${hero.highlight}`}
          delay={110}
          animateBy="words"
          direction="top"
          stepDuration={0.32}
          className="font-display mx-auto mb-0 max-w-3xl justify-center text-[1.55rem] leading-[1.2] font-bold tracking-tight text-ov-deep text-balance sm:text-3xl md:text-[2.4rem] md:leading-[1.18]"
        />

        <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed font-medium text-ov-ink/75 md:text-lg">
          {hero.line2}
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href="/activar" className="btn-primary w-full sm:w-auto">
            {hero.ctaPrimary}
          </a>
          <a
            href="#industrias-grid"
            className="btn-secondary-light w-full sm:w-auto"
          >
            {hero.ctaSecondary}
          </a>
        </div>

        <p className="mt-6 text-sm font-semibold tracking-wide text-ov-deep/65">
          {hero.priceNote}
        </p>
      </div>
    </section>
  );
}
