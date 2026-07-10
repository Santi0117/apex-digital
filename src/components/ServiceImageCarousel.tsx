"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

type ServiceImageCarouselProps = {
  images: string[];
  alt: string;
  prevLabel: string;
  nextLabel: string;
  hint: string;
};

function NavButton({
  direction,
  label,
  onClick,
  size = "sm",
}: {
  direction: "prev" | "next";
  label: string;
  onClick: () => void;
  size?: "sm" | "lg";
}) {
  const isLarge = size === "lg";

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`absolute top-1/2 -translate-y-1/2 z-10 flex items-center justify-center rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-sm transition-colors ${
        isLarge ? "w-11 h-11" : "w-7 h-7"
      } ${direction === "prev" ? (isLarge ? "left-4" : "left-1.5") : isLarge ? "right-4" : "right-1.5"}`}
      aria-label={label}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className={isLarge ? "w-5 h-5" : "w-3.5 h-3.5"}
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
    </button>
  );
}

function Dots({ count, index }: { count: number; index: number }) {
  return (
    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 pointer-events-none">
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className={`block rounded-full transition-colors ${
            i === index ? "w-1.5 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/40"
          }`}
        />
      ))}
    </div>
  );
}

export default function ServiceImageCarousel({
  images,
  alt,
  prevLabel,
  nextLabel,
  hint,
}: ServiceImageCarouselProps) {
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const hasMultiple = images.length > 1;

  const goTo = useCallback(
    (direction: -1 | 1) => {
      setIndex((current) => (current + direction + images.length) % images.length);
    },
    [images.length],
  );

  useEffect(() => {
    if (!expanded) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpanded(false);
      if (e.key === "ArrowLeft" && hasMultiple) goTo(-1);
      if (e.key === "ArrowRight" && hasMultiple) goTo(1);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [expanded, goTo, hasMultiple]);

  const lightbox =
    expanded && typeof document !== "undefined"
      ? createPortal(
          <div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black"
            role="dialog"
            aria-modal="true"
            aria-label={alt}
            onClick={() => setExpanded(false)}
          >
            <button
              type="button"
              onClick={() => setExpanded(false)}
              className="absolute top-4 right-4 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Cerrar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 1 0-1.06-1.06L10 8.94 6.28 5.22Z" />
              </svg>
            </button>

            <div
              className="relative mx-auto w-[min(88vw,880px)] h-[min(68vh,560px)]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[index]}
                alt={`${alt} ${index + 1}`}
                fill
                className="object-contain object-center"
                sizes="880px"
                quality={95}
                unoptimized
                priority
              />

              {hasMultiple && (
                <>
                  <NavButton direction="prev" label={prevLabel} onClick={() => goTo(-1)} size="lg" />
                  <NavButton direction="next" label={nextLabel} onClick={() => goTo(1)} size="lg" />
                  <Dots count={images.length} index={index} />
                </>
              )}
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <div className="relative w-full h-[min(62vw,340px)] sm:h-auto sm:min-h-0 sm:aspect-video rounded-none sm:rounded-xl overflow-hidden bg-black border-y sm:border border-neutral-800 group/carousel transition-shadow duration-300 hover:ring-1 hover:ring-accent/25">
        <button
          type="button"
          className="absolute inset-0 w-full h-full cursor-zoom-in"
          onClick={() => setExpanded(true)}
          aria-label={hint}
        >
          <Image
            src={images[index]}
            alt={`${alt} ${index + 1}`}
            fill
            className="object-contain object-center sm:p-2 pointer-events-none"
            sizes="(max-width: 768px) 100vw, 480px"
            quality={90}
          />
        </button>

        <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-xl pointer-events-none" />

        {hasMultiple && (
          <>
            <NavButton direction="prev" label={prevLabel} onClick={() => goTo(-1)} />
            <NavButton direction="next" label={nextLabel} onClick={() => goTo(1)} />
            <Dots count={images.length} index={index} />
          </>
        )}

        {!expanded && (
          <div className="absolute inset-x-0 bottom-0 px-3 py-2 bg-gradient-to-t from-black/60 to-transparent pointer-events-none">
            <p className="text-[11px] text-white/90 text-center">{hint}</p>
          </div>
        )}
      </div>

      {lightbox}
    </>
  );
}
