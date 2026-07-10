"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import ServiceImageCarousel from "./ServiceImageCarousel";

type ServiceShowcaseMediaProps = {
  videoSrc?: string;
  poster: string;
  images: string[];
  alt: string;
  isActive: boolean;
  prevLabel: string;
  nextLabel: string;
  carouselHint: string;
  videoHint: string;
};

export default function ServiceShowcaseMedia({
  videoSrc,
  poster,
  images,
  alt,
  isActive,
  prevLabel,
  nextLabel,
  carouselHint,
  videoHint,
}: ServiceShowcaseMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  const useVideo = Boolean(videoSrc) && !videoFailed;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !useVideo) return;

    if (isActive) {
      video.play().catch(() => {});
      return;
    }

    video.pause();
    video.currentTime = 0;
  }, [isActive, useVideo]);

  useEffect(() => {
    if (!expanded) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpanded(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [expanded]);

  if (useVideo && videoSrc) {
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
                className="relative mx-auto w-[min(96vw,960px)] h-[min(88vh,720px)] sm:h-[min(75vh,600px)]"
                onClick={(e) => e.stopPropagation()}
              >
                <video
                  src={videoSrc}
                  poster={poster}
                  muted
                  loop
                  playsInline
                  autoPlay
                  className="w-full h-full object-contain"
                />
              </div>
            </div>,
            document.body,
          )
        : null;

    return (
      <>
        <div>
          <div className="relative w-full h-[min(62vw,340px)] sm:h-auto sm:min-h-0 sm:aspect-video rounded-none sm:rounded-xl overflow-hidden bg-black border-y sm:border border-neutral-800">
            <button
              type="button"
              className="absolute inset-0 w-full h-full cursor-zoom-in"
              onClick={() => setExpanded(true)}
              aria-label={videoHint}
            >
              <video
                ref={videoRef}
                poster={poster}
                muted
                loop
                playsInline
                preload={isActive ? "metadata" : "none"}
                src={isActive ? videoSrc : undefined}
                onError={() => setVideoFailed(true)}
                className="w-full h-full object-contain object-center sm:p-1 pointer-events-none"
              />
            </button>
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-xl pointer-events-none" />
          </div>
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="w-full px-4 py-3.5 sm:py-2.5 text-center text-sm sm:text-xs font-medium text-accent hover:text-accent-hover transition-colors"
          >
            {videoHint}
          </button>
        </div>
        {lightbox}
      </>
    );
  }

  return (
    <ServiceImageCarousel
      images={images}
      alt={alt}
      prevLabel={prevLabel}
      nextLabel={nextLabel}
      hint={carouselHint}
    />
  );
}
