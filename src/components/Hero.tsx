"use client";

import { hero } from "@/lib/content";
import BlurText from "./BlurText";
import DepthText from "./DepthText";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-12 md:pt-40 md:pb-16">
      <div className="mx-auto max-w-4xl px-5 text-center md:px-8">
        <div className="mb-6 flex justify-center">
          <DepthText
            text={hero.brand}
            layers={34}
            depth={2.4}
            faceColor="#0891B2"
            depthColor="#0E7490"
            tilt={7.5}
            pointerTracking
            smoothing={0.14}
            perspective={900}
            autoOrbit
            orbitSpeed={0.35}
            fontSize="clamp(2.75rem, 12vw, 7rem)"
            fontWeight={800}
            shadow
          />
        </div>

        <BlurText
          text={`${hero.line1} ${hero.highlight}`}
          delay={110}
          animateBy="words"
          direction="top"
          stepDuration={0.32}
          className="font-display mx-auto mb-0 max-w-3xl justify-center text-[1.55rem] leading-[1.2] font-bold tracking-tight text-white text-balance sm:text-3xl md:text-[2.4rem] md:leading-[1.18]"
        />

        <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-white/70 md:mt-6 md:text-lg">
          {hero.line2}
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href="/activar" className="btn-teal w-full sm:w-auto">
            {hero.ctaPrimary}
          </a>
          <a
            href={hero.ctaSecondaryHref}
            className="btn-ghost-cyan w-full sm:w-auto"
          >
            {hero.ctaSecondary}
            <span aria-hidden>→</span>
          </a>
        </div>

        <p className="mt-6 text-sm font-medium tracking-wide text-white/50">
          {hero.priceNote}
        </p>
      </div>
    </section>
  );
}
