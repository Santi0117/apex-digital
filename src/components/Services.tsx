"use client";

import { useState } from "react";
import ScrollReveal from "./ScrollReveal";
import ServiceShowcaseMedia from "./ServiceShowcaseMedia";
import { useLanguage } from "@/lib/i18n/language-provider";

const showcaseImages = [
  [
    "/projects/sistemagan-control.jpg",
    "/projects/sistemagan-inventario-leche.jpg",
    "/projects/sistemagan-inventario-quesos.jpg",
    "/projects/sistemagan-rutas-v2.jpg",
  ],
  [
    "/projects/firstdown-catalogo.jpg",
    "/projects/firstdown.jpg",
    "/projects/firstdown-outfit.jpg",
    "/projects/firstdown-stock.jpg",
  ],
  [
    "/projects/web-dafesa.jpg",
    "/projects/web-tappy-mapa.jpg",
    "/projects/web-tappy-chatbot.jpg",
    "/projects/web-crestview.jpg",
  ],
  [
    "/projects/mobile-cuenta.jpg",
    "/projects/mobile-mascotas.jpg",
    "/projects/mobile-hidratacion.jpg",
  ],
] as const;

/** Pon tus .mp4 en public/projects/videos/ — solo carga el video de la pestaña activa. */
const showcaseVideos: (string | null)[] = [
  "/projects/videos/software.mp4",
  "/projects/videos/ecommerce.mp4",
  "/projects/videos/web.mp4",
  "/projects/videos/mobile.mp4",
];

const showcaseCodes = ["EX-01", "EX-02", "EX-03", "EX-04"] as const;

function ExternalLinkIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-4 h-4"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M4.25 5.5a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5H6.56l8.69 8.69a.75.75 0 1 1-1.06 1.06L5.5 7.31v4.19a.75.75 0 0 1-1.5 0v-6Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function Services() {
  const { copy } = useLanguage();
  const s = copy.services.main;
  const [activeIndex, setActiveIndex] = useState(0);

  const activeCard = s.cards[activeIndex] ?? s.cards[0];
  const activeImages = showcaseImages[activeIndex] ?? showcaseImages[0];
  const activeVideo = showcaseVideos[activeIndex] ?? null;
  const activePoster = activeImages[0] ?? "/projects/sistemagan-control.jpg";

  return (
    <section id="servicios" className="pt-16 md:pt-24 pb-10 md:pb-12">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <ScrollReveal>
          <div className="mb-8 md:mb-10">
            <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-accent mb-4">
              {s.label}
            </p>
            <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-neutral-900 dark:text-neutral-100 text-balance mb-4">
              {s.title}
            </h2>
            <p className="text-base md:text-lg text-neutral-500 dark:text-neutral-400">
              {s.examplesLabel}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <div className="bg-stars rounded-3xl border border-neutral-200/80 dark:border-neutral-800 p-3 md:p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
              <nav
                className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-1 lg:pb-0 lg:w-[240px] shrink-0 snap-x snap-mandatory lg:snap-none"
                aria-label={s.examplesLabel}
              >
                {s.cards.map((card, i) => {
                  const isActive = i === activeIndex;
                  return (
                    <button
                      key={card.tabLabel}
                      type="button"
                      onClick={() => setActiveIndex(i)}
                      aria-pressed={isActive}
                      className={`group flex-shrink-0 snap-start text-left rounded-xl border px-4 py-3.5 transition-all duration-300 ${
                        isActive
                          ? "border-accent/50 bg-accent-soft/80 dark:bg-cyan-950/50 shadow-sm shadow-accent/10"
                          : "border-transparent bg-white/60 dark:bg-neutral-900/50 hover:border-neutral-200 dark:hover:border-neutral-700 hover:bg-white dark:hover:bg-neutral-900"
                      }`}
                    >
                      <span
                        className={`font-mono text-[10px] tracking-wider block mb-1.5 ${
                          isActive ? "text-accent" : "text-neutral-400"
                        }`}
                      >
                        {showcaseCodes[i]}
                      </span>
                      <span
                        className={`text-sm font-medium leading-snug ${
                          isActive
                            ? "text-neutral-900 dark:text-neutral-100"
                            : "text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-200"
                        }`}
                      >
                        {card.tabLabel}
                      </span>
                    </button>
                  );
                })}
              </nav>

              <article className="flex-1 min-w-0 rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white/85 dark:bg-neutral-900/85 backdrop-blur-sm overflow-hidden flex flex-col">
                <div className="order-2 lg:order-1 p-4 md:p-6 lg:p-7 lg:border-b border-neutral-100 dark:border-neutral-800">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <span className="font-mono text-[10px] tracking-wider text-accent">
                      {showcaseCodes[activeIndex]}
                    </span>
                    {activeCard.exampleUrl && (
                      <a
                        href={activeCard.exampleUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-accent hover:text-accent-hover transition-colors"
                      >
                        {s.viewExample}
                        <ExternalLinkIcon />
                      </a>
                    )}
                  </div>
                  <h3 className="text-xl md:text-2xl font-medium text-neutral-900 dark:text-neutral-100 mb-2.5 tracking-tight leading-snug">
                    {activeCard.title}
                  </h3>
                  <p className="text-sm md:text-[15px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    {activeCard.description}
                  </p>
                </div>

                <div className="order-1 lg:order-2 px-0 py-0 border-b border-neutral-100 dark:border-neutral-800 lg:border-b-0 md:px-6 md:py-6 lg:px-7 lg:py-7">
                  <ServiceShowcaseMedia
                    key={activeIndex}
                    videoSrc={activeVideo ?? undefined}
                    poster={activePoster}
                    images={[...activeImages]}
                    alt={activeCard.title}
                    isActive
                    prevLabel={s.carouselPrev}
                    nextLabel={s.carouselNext}
                    carouselHint={s.carouselHint}
                    videoHint={s.videoHint}
                  />
                </div>
              </article>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={400} className="flex justify-center mt-8">
          <a
            href="#planes"
            className="flex items-center justify-center w-10 h-10 rounded-full border border-neutral-200 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/80 text-neutral-400 hover:border-accent hover:bg-accent-soft dark:hover:bg-cyan-950/40 hover:text-accent transition-all duration-200 hover:scale-110"
            aria-label={copy.services.portfolioScroll}
          >
            ↓
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
