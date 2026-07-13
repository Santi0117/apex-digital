"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import SectionHeader from "./SectionHeader";
import ScrollReveal from "./ScrollReveal";
import { useLanguage } from "@/lib/i18n/language-provider";

const projectAssets = [
  {
    short: "ClinicOS",
    images: [
      "/projects/clinicos-dashboard.png",
      "/projects/clinicos-calendario.png",
      "/projects/clinicos-finanzas.png",
    ],
    stack: "Next.js · PostgreSQL · SaaS clínico",
  },
  {
    short: "Jopa",
    images: [
      "/projects/jopa-hero.png",
      "/projects/jopa-nosotros.png",
      "/projects/jopa-catalogo.png",
      "/projects/jopa-financiamiento.png",
    ],
    stack: "Next.js · Tailwind · i18n · Calculadoras",
  },
];

function ArrowIcon({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-4 h-4"
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

export default function Portfolio() {
  const { copy } = useLanguage();
  const p = copy.portfolio;
  const [activeProject, setActiveProject] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);

  const projects = p.projects.map((project, i) => ({
    ...project,
    ...projectAssets[i],
  }));

  const project = projects[activeProject];
  const totalImages = project.images.length;

  useEffect(() => {
    setImageIndex(0);
  }, [activeProject]);

  const goPrev = () =>
    setImageIndex((current) => (current - 1 + totalImages) % totalImages);
  const goNext = () =>
    setImageIndex((current) => (current + 1) % totalImages);

  return (
    <section id="portafolio" className="px-6 md:px-12 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <SectionHeader
            label={p.label}
            title={p.title}
            description={p.description}
          />
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <div
            role="tablist"
            aria-label={p.label}
            className="flex gap-2 overflow-x-auto pb-1 mb-6 md:mb-8 snap-x snap-mandatory scrollbar-none"
          >
            {projects.map((item, index) => {
              const selected = activeProject === index;
              return (
                <button
                  key={item.short}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveProject(index)}
                  className={`appearance-none snap-start shrink-0 rounded-2xl border px-4 py-3 text-left transition-all duration-200 min-w-[148px] sm:min-w-[180px] ${
                    selected
                      ? "border-accent bg-accent text-white shadow-sm shadow-accent/25"
                      : "border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:border-accent/40"
                  }`}
                >
                  <span
                    className={`block text-[10px] font-medium tracking-[0.18em] uppercase mb-1 ${
                      selected ? "text-white/70" : "text-neutral-400"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")} · {item.category}
                  </span>
                  <span className="block text-sm font-medium">{item.short}</span>
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={120}>
          <div className="rounded-[1.75rem] border border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-950/60 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_0.9fr]">
              <div className="relative p-3 sm:p-4 lg:p-5">
                <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800">
                  <div className="absolute top-0 inset-x-0 z-10 flex items-center gap-1.5 px-3 py-2.5 bg-gradient-to-b from-black/45 to-transparent pointer-events-none">
                    <span className="h-2 w-2 rounded-full bg-white/35" />
                    <span className="h-2 w-2 rounded-full bg-white/35" />
                    <span className="h-2 w-2 rounded-full bg-white/35" />
                    <span className="ml-2 text-[10px] text-white/70 truncate">
                      {project.title}
                    </span>
                  </div>

                  {project.images.map((src, i) => (
                    <Image
                      key={src}
                      src={src}
                      alt={`${p.screenshotAlt}${project.title} ${i + 1}`}
                      fill
                      className={`object-contain object-center p-1 sm:p-2 transition-opacity duration-400 ${
                        i === imageIndex ? "opacity-100" : "opacity-0"
                      }`}
                      sizes="(max-width: 1024px) 100vw, 720px"
                      priority={activeProject === 0 && i === 0}
                    />
                  ))}

                  {totalImages > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={goPrev}
                        aria-label={p.prevImage}
                        className="appearance-none absolute left-3 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm hover:bg-black/75 transition-colors"
                      >
                        <ArrowIcon direction="prev" />
                      </button>
                      <button
                        type="button"
                        onClick={goNext}
                        aria-label={p.nextImage}
                        className="appearance-none absolute right-3 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm hover:bg-black/75 transition-colors"
                      >
                        <ArrowIcon direction="next" />
                      </button>
                    </>
                  )}
                </div>

                {totalImages > 1 && (
                  <div className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                    {project.images.map((src, i) => {
                      const selected = imageIndex === i;
                      return (
                        <button
                          key={src}
                          type="button"
                          onClick={() => setImageIndex(i)}
                          aria-label={`${p.screenshotAlt}${i + 1}`}
                          className={`appearance-none relative shrink-0 h-14 w-[5.5rem] sm:h-16 sm:w-24 rounded-xl overflow-hidden border transition-all ${
                            selected
                              ? "border-accent ring-2 ring-accent/30"
                              : "border-neutral-200 dark:border-neutral-700 opacity-70 hover:opacity-100"
                          }`}
                        >
                          <Image
                            src={src}
                            alt=""
                            fill
                            className="object-contain object-center bg-neutral-100 dark:bg-neutral-800"
                            sizes="96px"
                          />
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="flex flex-col justify-center px-5 py-6 sm:px-7 sm:py-8 lg:pr-8 lg:pl-2 border-t lg:border-t-0 lg:border-l border-neutral-200 dark:border-neutral-800">
                <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent mb-2.5">
                  {project.category}
                </p>
                <h3 className="text-xl sm:text-2xl font-medium text-neutral-900 dark:text-neutral-100 tracking-tight mb-6 text-balance">
                  {project.title}
                </h3>

                <div className="space-y-4">
                  <div className="rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-4">
                    <p className="text-[11px] font-medium tracking-[0.12em] uppercase text-neutral-400 mb-1.5">
                      {p.problemLabel}
                    </p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                      {project.problem}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-accent-soft/70 dark:bg-cyan-950/30 border border-accent/15 p-4">
                    <p className="text-[11px] font-medium tracking-[0.12em] uppercase text-accent mb-1.5">
                      {p.solutionLabel}
                    </p>
                    <p className="text-sm text-neutral-700 dark:text-neutral-200 leading-relaxed">
                      {project.solution}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs text-neutral-400 dark:text-neutral-500">
                    {project.stack}
                  </p>
                  <p className="text-xs text-neutral-400">
                    {imageIndex + 1}/{totalImages}
                  </p>
                </div>

                <a
                  href="#agendar"
                  className="appearance-none mt-6 inline-flex w-full sm:w-auto justify-center text-sm font-medium px-6 py-3 rounded-full bg-accent text-white hover:bg-accent-hover transition-colors"
                >
                  {p.cta}
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
