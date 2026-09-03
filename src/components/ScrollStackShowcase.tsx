"use client";

import { useRef, useState, type TouchEvent } from "react";
import ScrollStack, { ScrollStackItem } from "./ui/ScrollStack";
import SectionHeader from "./SectionHeader";
import { useLanguage } from "@/lib/i18n/language-provider";

/** Poné true cuando quieras mostrar de nuevo “Visitar sitio web” bajo cada ejemplo. */
const SHOW_VISIT_SITE_LINKS = false;

/** Imágenes de referencia — reemplazá paths cuando tengas las definitivas. */
const SCROLL_STACK_MEDIA: ReadonlyArray<{
  images: readonly string[];
  /** URL del sitio por captura (mismo orden que images). Vacío = pendiente. */
  urls: readonly (string | undefined)[];
  layout: "mockup" | "phone" | "devices";
}> = [
  {
    images: [
      "/projects/web-std-crestview-cut2.png",
      "/projects/web-std-alchemy-cut2.png",
      "/projects/web-std-ecois-cut2.png",
    ],
    urls: [undefined, undefined, undefined],
    layout: "mockup",
  },
  {
    images: [
      "/projects/web-pro-bafesa-cut2.png",
      "/projects/web-pro-eltejano-cut2.png",
      "/projects/web-pro-jopa-calculadora-cut2.png",
      "/projects/web-pro-jopa-autos-cut2.png",
    ],
    urls: [undefined, undefined, undefined, undefined],
    layout: "mockup",
  },
  {
    images: [
      "/projects/ecom-firstdown-tienda-cut2.png",
      "/projects/ecom-firstdown-probar-cut2.png",
      "/projects/ecom-guba-cut2.png",
      "/projects/ecom-aurelia-cut2.png",
    ],
    urls: [undefined, undefined, undefined, undefined],
    layout: "mockup",
  },
  {
    images: [
      "/projects/saas-sistemagan-cut2.png",
      "/projects/saas-clinicos-inventario-cut2.png",
      "/projects/saas-unilearn-cut2.png",
      "/projects/saas-clinicos-calendario-cut2.png",
    ],
    urls: [undefined, undefined, undefined, undefined],
    layout: "mockup",
  },
  {
    images: [
      "/projects/mobile-run-cut5.png",
      "/projects/mobile-hidratacion-cut5.png",
      "/projects/mobile-finanzas-cut5.png",
    ],
    urls: [undefined, undefined, undefined],
    layout: "mockup",
  },
] ;

type StackItem = (typeof SCROLL_STACK_MEDIA)[number] & {
  title: string;
  subtitle: string;
  phoneImage?: string;
};

function GlobeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-3.5 w-3.5 shrink-0"
      aria-hidden
    >
      <path d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm0 1.5c.9 0 1.72.7 2.36 1.82.5.87.87 2.07.99 3.43H6.65c.12-1.36.49-2.56.99-3.43C8.28 4.2 9.1 3.5 10 3.5Zm-3.76.76C5.3 5.36 4.6 7.3 4.52 9.25h2.07c.13-1.5.52-2.85 1.07-3.84a6.2 6.2 0 0 0-1.42-.15Zm7.52 0c-.4.03-.82.08-1.22.15.55.99.94 2.34 1.07 3.84h2.07c-.08-1.95-.78-3.89-1.92-4Zm1.92 6.24h-2.07c-.13 1.5-.52 2.85-1.07 3.84.4.07.82.12 1.22.15 1.14-1.11 1.84-3.05 1.92-5Zm-3.91 5.25C12.72 15.8 11.9 16.5 11 16.5c-.9 0-1.72-.7-2.36-1.82-.5-.87-.87-2.07-.99-3.43h6.7c-.12 1.36-.49 2.56-.99 3.43ZM5.84 14.49c.4-.03.82-.08 1.22-.15-.55-.99-.94-2.34-1.07-3.84H3.92c.08 1.95.78 3.89 1.92 5Z" />
    </svg>
  );
}

function VisitSiteLink({
  href,
  label,
  pending,
}: {
  href?: string;
  label: string;
  pending?: boolean;
}) {
  const className =
    "scroll-stack-card__visit inline-flex items-center gap-1.5 rounded-full border border-cyan-500/40 bg-neutral-950/85 px-3.5 py-1.5 text-[12px] font-medium text-cyan-300 shadow-md backdrop-blur-md transition-colors dark:border-cyan-400/35 dark:bg-neutral-950/90 dark:text-cyan-200";

  if (href && !pending) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${className} hover:border-cyan-400/60 hover:bg-cyan-950/70 hover:text-cyan-100`}
      >
        <GlobeIcon />
        <span>{label}</span>
      </a>
    );
  }

  return (
    <span className={className} aria-disabled="true">
      <GlobeIcon />
      <span>{label}</span>
    </span>
  );
}

function ArrowIcon({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-5 w-5"
    >
      {direction === "prev" ? (
        <path
          fillRule="evenodd"
          d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
          clipRule="evenodd"
        />
      ) : (
        <path
          fillRule="evenodd"
          d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
          clipRule="evenodd"
        />
      )}
    </svg>
  );
}

export default function ScrollStackShowcase() {
  const { copy } = useLanguage();
  const g = copy.scrollStack;
  const items: StackItem[] = SCROLL_STACK_MEDIA.map((media, index) => ({
    ...media,
    ...g.items[index],
  }));
  const [slides, setSlides] = useState(() => items.map(() => 0));
  const touchStartX = useRef<number | null>(null);

  const setSlide = (cardIndex: number, next: number) => {
    setSlides((current) =>
      current.map((value, i) => (i === cardIndex ? next : value)),
    );
  };

  const step = (cardIndex: number, delta: number) => {
    const total = items[cardIndex].images.length;
    if (total <= 1) return;
    setSlide(cardIndex, (slides[cardIndex] + delta + total) % total);
  };

  const onTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.changedTouches[0]?.clientX ?? null;
  };

  const onTouchEnd = (cardIndex: number, e: TouchEvent) => {
    if (touchStartX.current === null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = endX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 48) return;
    step(cardIndex, delta > 0 ? -1 : 1);
  };

  return (
    <section id="galeria-stack" aria-label={g.title} className="relative">
      <div className="mx-auto max-w-3xl px-5 pt-10 sm:px-8 sm:pt-12 md:px-12 md:pt-14">
        <SectionHeader
          label={g.label}
          title={g.title}
          description={g.description}
          hint={g.hint}
        />
      </div>

      <ScrollStack
        itemDistance={72}
        itemStackDistance={6}
        stackPosition="10vh"
      >
        {items.map((item, index) => {
          const layout = "layout" in item ? item.layout : "devices";
          const isFlat = layout === "phone" || layout === "mockup";
          const cardClass =
            layout === "phone"
              ? "scroll-stack-card--phone"
              : layout === "mockup"
                ? "scroll-stack-card--mockup"
                : "scroll-stack-card--laptop";
          const slideIndex = slides[index];
          const currentImage = item.images[slideIndex];
          const currentUrl = item.urls?.[slideIndex];
          const hasMultiple = item.images.length > 1;

          return (
            <ScrollStackItem key={index} itemClassName={cardClass}>
              <div
                className="absolute inset-0"
                onTouchStart={onTouchStart}
                onTouchEnd={(e) => onTouchEnd(index, e)}
              >
                {isFlat ? (
                  <img
                    src={currentImage}
                    alt={`${item.title} ${slideIndex + 1}`}
                    className="scroll-stack-card__media"
                    draggable={false}
                  />
                ) : (
                  <div className="scroll-stack-devices" aria-hidden>
                    <div className="scroll-stack-devices__laptop-screen">
                      <img src={currentImage} alt="" draggable={false} />
                    </div>
                    <div className="scroll-stack-devices__phone-screen">
                      {item.phoneImage ? (
                        <img
                          src={item.phoneImage}
                          alt=""
                          draggable={false}
                        />
                      ) : (
                        <div className="scroll-stack-devices__phone-placeholder" />
                      )}
                    </div>
                    <img
                      src="/projects/devices-mockup.png"
                      alt=""
                      className="scroll-stack-devices__frame"
                      draggable={false}
                    />
                  </div>
                )}
                <span className="scroll-stack-card__overlay" aria-hidden />
                {hasMultiple && (
                  <>
                    <button
                      type="button"
                      className="scroll-stack-card__nav scroll-stack-card__nav--prev"
                      onClick={() => step(index, -1)}
                      aria-label={g.prevLabel}
                    >
                      <ArrowIcon direction="prev" />
                    </button>
                    <button
                      type="button"
                      className="scroll-stack-card__nav scroll-stack-card__nav--next"
                      onClick={() => step(index, 1)}
                      aria-label={g.nextLabel}
                    >
                      <ArrowIcon direction="next" />
                    </button>
                    <span className="scroll-stack-card__count" aria-hidden>
                      {slideIndex + 1} / {item.images.length}
                    </span>
                  </>
                )}
                {SHOW_VISIT_SITE_LINKS ? (
                  <div className="scroll-stack-card__visit-wrap">
                    <VisitSiteLink
                      href={currentUrl}
                      label={g.visitSite}
                      pending={!currentUrl}
                    />
                  </div>
                ) : null}
                <div className="scroll-stack-card__caption">
                  <h2>{item.title}</h2>
                  <p>{item.subtitle}</p>
                </div>
              </div>
            </ScrollStackItem>
          );
        })}
      </ScrollStack>
    </section>
  );
}
