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
  {
    short: "UniLearn",
    images: [
      "/projects/unilearn2-estudiante.png",
      "/projects/unilearn2-calendario.png",
      "/projects/unilearn2-admin-v2.png",
      "/projects/unilearn2-usuarios.png",
      "/projects/unilearn2-curso.png",
      "/projects/unilearn2-docente.png",
    ],
    stack: "Next.js · Roles · Analytics · Calendario académico",
  },
  {
    short: "FirstDown",
    images: [
      "/projects/firstdown2-catalogo.png",
      "/projects/firstdown2-equipo.png",
      "/projects/firstdown2-look.png",
      "/projects/firstdown2-carrito.png",
    ],
    stack: "Next.js · E-commerce · Catálogo · Outfit builder",
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
  const tabCols =
    projects.length >= 4
      ? "grid-cols-2 lg:grid-cols-4"
      : projects.length === 3
        ? "grid-cols-3"
        : "grid-cols-2";

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
            className={`grid ${tabCols} gap-2 mb-6 md:mb-8`}
          >
            {projects.map((item, index) => {
              const selected = activeProject === index;
              const number = String(index + 1).padStart(2, "0");

              return (
                <button
                  key={item.short}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveProject(index)}
                  className={`appearance-none rounded-2xl border px-3 py-3 sm:px-4 text-left transition-all duration-200 ${
                    selected
                      ? "border-accent bg-accent text-white shadow-sm shadow-accent/25"
                      : "border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:border-accent/40"
                  }`}
                >
                  <span
                    className={`block text-[10px] font-medium tracking-[0.16em] uppercase ${
                      selected ? "text-white/70" : "text-neutral-400"
                    }`}
                  >
                    <span className="sm:hidden">{number}</span>
                    <span className="hidden sm:inline">
                      {number} · {item.category}
                    </span>
                  </span>
                  <span className="mt-1 block text-sm font-medium truncate">
                    {item.short}
                  </span>
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={120}>
          <div className="rounded-[1.75rem] border border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-950/60">
            <div
              key={project.short}
              className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.95fr] animate-[fadeIn_0.35s_ease-out]"
            >
              {/* Galería */}
              <div className="p-4 sm:p-5 space-y-3">
                <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800">
                  {project.images.map((src, i) => (
                    <Image
                      key={src}
                      src={src}
                      alt={`${p.screenshotAlt}${project.title} ${i + 1}`}
                      fill
                      className={`object-contain object-center p-2 sm:p-3 transition-opacity duration-300 ${
                        i === imageIndex ? "opacity-100" : "opacity-0"
                      }`}
                      sizes="(max-width: 1024px) 100vw, 640px"
                      priority={activeProject === 0 && i === 0}
                    />
                  ))}
                </div>

                {totalImages > 1 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={goPrev}
                        aria-label={p.prevImage}
                        className="appearance-none flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-200 hover:border-accent hover:text-accent transition-colors"
                      >
                        <ArrowIcon direction="prev" />
                      </button>

                      <div className="flex items-center justify-center gap-2 min-w-0 flex-1 overflow-x-auto py-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        {project.images.map((src, i) => {
                          const selected = imageIndex === i;
                          return (
                            <button
                              key={src}
                              type="button"
                              onClick={() => setImageIndex(i)}
                              aria-label={`${p.screenshotAlt}${i + 1}`}
                              aria-current={selected}
                              className={`appearance-none relative shrink-0 h-12 w-[4.5rem] sm:h-14 sm:w-24 rounded-lg overflow-hidden border-2 transition-all ${
                                selected
                                  ? "border-accent ring-2 ring-accent/25 opacity-100"
                                  : "border-transparent opacity-60 hover:opacity-100"
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

                      <button
                        type="button"
                        onClick={goNext}
                        aria-label={p.nextImage}
                        className="appearance-none flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-200 hover:border-accent hover:text-accent transition-colors"
                      >
                        <ArrowIcon direction="next" />
                      </button>
                    </div>

                    <p className="text-center text-xs text-neutral-400 tabular-nums">
                      {imageIndex + 1} / {totalImages}
                    </p>
                  </div>
                )}
              </div>

              {/* Texto */}
              <div className="flex flex-col justify-between gap-6 px-5 py-6 sm:px-7 sm:py-8 lg:pr-8 lg:pl-4 border-t lg:border-t-0 lg:border-l border-neutral-200 dark:border-neutral-800">
                <div>
                  <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent mb-2.5">
                    {project.category}
                  </p>
                  <h3 className="text-xl sm:text-2xl font-medium text-neutral-900 dark:text-neutral-100 tracking-tight mb-5 text-balance">
                    {project.title}
                  </h3>

                  <div className="space-y-3">
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

                  <p className="mt-5 text-xs text-neutral-400 dark:text-neutral-500">
                    {project.stack}
                  </p>
                </div>

                <a
                  href="#agendar"
                  className="appearance-none inline-flex w-full justify-center text-sm font-medium px-6 py-3.5 rounded-full bg-accent text-white hover:bg-accent-hover transition-colors"
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
