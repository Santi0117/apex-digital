"use client";

import { useState } from "react";
import SectionHeader from "./SectionHeader";
import ScrollReveal from "./ScrollReveal";
import { useLanguage } from "@/lib/i18n/language-provider";

export default function Faq() {
  const { copy } = useLanguage();
  const f = copy.faq;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <ScrollReveal>
          <SectionHeader
            label={f.label}
            title={f.title}
            description={f.description}
          />
        </ScrollReveal>

        <div className="mt-4 border-t border-neutral-200/80 dark:border-neutral-800">
          {f.items.map((item, i) => {
            const isOpen = open === i;
            const index = `${f.itemPrefix}${String(i + 1).padStart(2, "0")}`;

            return (
              <ScrollReveal key={item.question} delay={100 + i * 70}>
                <div className="border-b border-neutral-200/80 dark:border-neutral-800">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      id={`faq-trigger-${i}`}
                      className="group flex w-full items-start gap-4 py-5 md:py-6 text-left cursor-pointer"
                    >
                      <span className="mt-1 w-12 shrink-0 text-[10px] font-medium tracking-[0.2em] uppercase tabular-nums text-accent/80">
                        {index}
                      </span>

                      <span
                        className={`flex-1 text-base md:text-lg font-medium tracking-tight transition-colors duration-300 ${
                          isOpen
                            ? "text-neutral-900 dark:text-neutral-100"
                            : "text-neutral-700 group-hover:text-neutral-900 dark:text-neutral-300 dark:group-hover:text-neutral-100"
                        }`}
                      >
                        {item.question}
                      </span>

                      <span
                        aria-hidden
                        className={`mt-1 shrink-0 text-neutral-400 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                          isOpen ? "rotate-45" : "group-hover:text-neutral-600 dark:group-hover:text-neutral-300"
                        }`}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        >
                          <path d="M8 3v10M3 8h10" />
                        </svg>
                      </span>
                    </button>
                  </h3>

                  <div
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-trigger-${i}`}
                    className={`grid transition-[grid-template-rows,opacity] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="pb-6 pl-16 pr-8 text-sm md:text-base leading-relaxed text-neutral-500 dark:text-neutral-400">
                        <p>{item.answer}</p>

                        {item.groups?.map((group) => (
                          <div key={group.title} className="mt-5">
                            <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-accent/70 mb-2">
                              {group.title}
                            </p>
                            <ul className="space-y-1.5">
                              {group.points.map((point) => (
                                <li key={point} className="flex gap-2.5">
                                  <span
                                    aria-hidden
                                    className="mt-[0.7em] h-px w-2.5 shrink-0 bg-neutral-300 dark:bg-neutral-600"
                                  />
                                  <span>{point}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal delay={500}>
          <p className="mt-10 text-center text-sm text-neutral-400 dark:text-neutral-500">
            {f.footerText}
            <a
              href="#cotizar"
              className="text-neutral-900 dark:text-neutral-100 underline underline-offset-4 decoration-neutral-300 dark:decoration-neutral-600 hover:decoration-neutral-900 dark:hover:decoration-neutral-100 transition-colors"
            >
              {f.footerCta}
            </a>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
