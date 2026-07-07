"use client";

import ScrollReveal from "./ScrollReveal";
import ServiceImageCarousel from "./ServiceImageCarousel";
import { useLanguage } from "@/lib/i18n/language-provider";
import type { ShowcaseCardCopy } from "@/lib/i18n/translations";

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

function ShowcaseCard({
  card,
  images,
  delay,
  carouselPrev,
  carouselNext,
  carouselHint,
}: {
  card: ShowcaseCardCopy;
  images: readonly string[];
  delay: number;
  carouselPrev: string;
  carouselNext: string;
  carouselHint: string;
}) {
  return (
    <ScrollReveal delay={delay} className="h-full">
      <article className="group flex flex-col h-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-accent/40 hover:shadow-[0_20px_50px_-20px_rgba(8,145,178,0.18)] dark:hover:shadow-[0_20px_50px_-20px_rgba(8,145,178,0.25)]">
        <div className="p-5 md:p-6 pb-4">
          <h3 className="text-xl md:text-2xl font-medium text-neutral-900 dark:text-neutral-100 mb-2.5 tracking-tight leading-snug">
            {card.title}
          </h3>
          <p className="text-sm md:text-[15px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
            {card.description}
          </p>
        </div>

        <div className="px-5 md:px-6 pb-5 md:pb-6 mt-auto">
          <ServiceImageCarousel
            images={[...images]}
            alt={card.title}
            prevLabel={carouselPrev}
            nextLabel={carouselNext}
            hint={carouselHint}
          />
        </div>
      </article>
    </ScrollReveal>
  );
}

export default function Services() {
  const { copy } = useLanguage();
  const s = copy.services.main;

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6 mb-10">
          {s.cards.map((card, i) => (
            <ShowcaseCard
              key={card.title}
              card={card}
              images={showcaseImages[i] ?? showcaseImages[0]}
              delay={i * 80}
              carouselPrev={s.carouselPrev}
              carouselNext={s.carouselNext}
              carouselHint={s.carouselHint}
            />
          ))}
        </div>

        <ScrollReveal delay={400} className="flex justify-center">
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
