"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import ScrollReveal from "@/components/ScrollReveal";
import {
  empresaProjects,
  empresasPage,
  type EmpresaFilter,
} from "@/lib/empresas";
import "./EmpresasPage.css";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function EmpresasPage() {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<EmpresaFilter>("all");

  const projects = useMemo(() => {
    if (filter === "all") return empresaProjects;
    return empresaProjects.filter((p) => p.kind === filter);
  }, [filter]);

  return (
    <div className="oe-page">
      <section className="oe-hero">
        <motion.p
          className="oe-eyebrow"
          initial={reduce ? false : { opacity: 0, letterSpacing: "0.4em" }}
          animate={{ opacity: 1, letterSpacing: "0.2em" }}
          transition={{ duration: 1, ease: EASE }}
        >
          {empresasPage.eyebrow}
        </motion.p>
        <motion.h1
          className="oe-title"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.12, ease: EASE }}
        >
          {empresasPage.title}
        </motion.h1>
        <motion.p
          className="oe-lead"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.28, ease: EASE }}
        >
          {empresasPage.lead}
        </motion.p>
      </section>

      <section className="oe-section" aria-label="Filtros de proyectos">
        <div className="oe-filters" role="tablist" aria-label="Tipo de proyecto">
          {empresasPage.filters.map((item) => {
            const on = filter === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={on}
                className={`oe-filter${on ? " is-on" : ""}`}
                onClick={() => setFilter(item.id)}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="popLayout">
          <motion.div layout className="oe-grid">
            {projects.map((project, i) => (
              <motion.article
                layout
                key={project.id}
                className="oe-card"
                initial={reduce ? false : { opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: 12 }}
                transition={{
                  duration: 0.5,
                  delay: reduce ? 0 : i * 0.05,
                  ease: EASE,
                }}
              >
                <div className="oe-card-media">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    sizes="(max-width: 900px) 100vw, 50vw"
                    className="oe-card-img"
                    unoptimized
                    quality={100}
                  />
                </div>
                <div className="oe-card-body">
                  <div className="oe-card-meta">
                    <span className="oe-card-kind">{project.kindLabel}</span>
                    <span className="oe-card-sector">{project.sector}</span>
                  </div>
                  <h2>{project.name}</h2>
                  <p>{project.body}</p>
                  {project.href ? (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="oe-card-link"
                    >
                      {project.linkLabel ?? "Visitar sitio"}
                      <span aria-hidden>→</span>
                    </a>
                  ) : null}
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      <section className="oe-cta" aria-labelledby="oe-cta-title">
        <ScrollReveal>
          <h2 id="oe-cta-title" className="oe-cta-title">
            {empresasPage.cta.title}
          </h2>
          <p className="oe-cta-lead">{empresasPage.cta.lead}</p>
          <a href={empresasPage.cta.href} className="oe-cta-btn">
            {empresasPage.cta.label}
          </a>
        </ScrollReveal>
      </section>
    </div>
  );
}
