"use client";

import SectionHeader from "./SectionHeader";
import ScrollReveal from "./ScrollReveal";
import { useLanguage } from "@/lib/i18n/language-provider";

export default function Process() {
  const { copy } = useLanguage();
  const p = copy.process;

  return (
    <section id="proceso" className="py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <ScrollReveal>
          <SectionHeader
            label={p.label}
            title={p.title}
            description={p.description}
          />
        </ScrollReveal>

        <div className="relative mt-4">
          <div
            className="absolute left-[19px] md:left-[23px] top-6 bottom-6 w-px bg-gradient-to-b from-neutral-200 via-neutral-300 to-transparent dark:from-neutral-700 dark:via-neutral-600"
            aria-hidden
          />

          <div className="space-y-0">
            {p.steps.map((step, i) => (
              <ScrollReveal key={step.number} delay={100 + i * 90}>
                <div className="group relative flex gap-6 md:gap-8 py-8 md:py-10">
                  <div className="relative z-10 flex-shrink-0">
                    <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 shadow-sm group-hover:border-neutral-900 dark:group-hover:border-neutral-100 group-hover:shadow-md transition-all duration-300">
                      <span className="text-xs md:text-sm font-medium text-neutral-400 tabular-nums group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-colors duration-300">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 pt-1.5 md:pt-2 pb-2 border-b border-neutral-200/80 dark:border-neutral-800 last:border-0 group-hover:pl-1 transition-all duration-300">
                    <div className="inline-block mb-3">
                      <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-accent/80">
                        {p.stepPrefix}
                        {step.number}
                      </span>
                    </div>
                    <h3 className="text-lg md:text-xl font-medium text-neutral-900 dark:text-neutral-100 mb-2 tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-sm md:text-base text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-lg">
                      {step.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <ScrollReveal delay={500}>
          <p className="mt-10 text-center text-sm text-neutral-400 dark:text-neutral-500">
            {p.readyPrefix}
            <a
              href="#cotizar"
              className="text-neutral-900 dark:text-neutral-100 underline underline-offset-4 decoration-neutral-300 dark:decoration-neutral-600 hover:decoration-neutral-900 dark:hover:decoration-neutral-100 transition-colors"
            >
              {p.writeMe}
            </a>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
