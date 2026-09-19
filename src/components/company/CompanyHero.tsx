"use client";

import { companyHero } from "@/lib/company";
import ScrollReveal from "../ScrollReveal";
import SplitFlapText from "../SplitFlapText";
import OnvisionDesktop from "./OnvisionDesktop";

export default function CompanyHero() {
  return (
    <section className="relative overflow-hidden bg-transparent">
      <div className="relative mx-auto max-w-6xl px-5 pt-28 pb-10 text-center md:px-8 md:pt-32">
        <ScrollReveal variant="fade" delay={0.05}>
          <p className="mb-5 text-[11px] font-medium tracking-[0.22em] text-white/45 uppercase">
            Onvision Digital
          </p>
        </ScrollReveal>
        <ScrollReveal variant="up" delay={0.12}>
          <h1 className="flex justify-center">
            <SplitFlapText
              words={[...companyHero.flapWords]}
              flipDuration={0.12}
              stagger={0.05}
              cycleDelay={2600}
              charset="alpha"
              flipsPerChar={8}
              tileColor="#141414"
              textColor="#f8fafc"
              tileRadius={8}
              gap={6}
              fontSize={48}
              loop
              padTo={16}
              className="ov-hero-flap"
            />
          </h1>
        </ScrollReveal>
        <ScrollReveal variant="up" delay={0.22}>
          <p className="mx-auto mt-5 max-w-[34ch] text-[15px] leading-relaxed text-white/50 sm:text-base">
            {companyHero.headline}
          </p>
        </ScrollReveal>
        <ScrollReveal variant="up" delay={0.3}>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={companyHero.primaryCta.href}
              className="inline-flex items-center rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-white/90"
            >
              {companyHero.primaryCta.label} →
            </a>
            <a
              href={companyHero.secondaryCta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition hover:border-white/40"
            >
              {companyHero.secondaryCta.label} →
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal className="mt-14 text-left" variant="scale" delay={0.18}>
          <OnvisionDesktop />
        </ScrollReveal>
      </div>
    </section>
  );
}
