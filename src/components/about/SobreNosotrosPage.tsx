"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { aboutPage } from "@/lib/about";
import { companyTools } from "@/components/company/CompanyTools";
import ScrollReveal, { ScrollItem, ScrollStagger } from "@/components/ScrollReveal";
import "./SobreNosotrosPage.css";

const FluidBackdrop = dynamic(() => import("./FluidBackdrop"), {
  ssr: false,
  loading: () => <div className="about-fluid about-fluid--fallback" aria-hidden />,
});

const EASE = [0.22, 1, 0.36, 1] as const;

const TOOL_COUNT = companyTools.length;

function ManifestoHero() {
  const reduce = useReducedMotion();
  const accents = aboutPage.hero.accents;
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % accents.length);
    }, 3200);
    return () => window.clearInterval(id);
  }, [accents.length, reduce]);

  const plainText = aboutPage.hero.lines
    .map((line) => line.parts.map((p) => p.text).join(""))
    .join(" ");

  return (
    <section className="about-manifesto">
      {!reduce ? <FluidBackdrop /> : <div className="about-fluid about-fluid--fallback" aria-hidden />}
      <div className="about-manifesto-veil" aria-hidden />

      <div className="about-manifesto-inner">
        <motion.div
          className="about-manifesto-label"
          initial={reduce ? false : { opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <span>{aboutPage.hero.label}</span>
          <span className="about-manifesto-rule" />
        </motion.div>

        <motion.div
          className="about-manifesto-tabs"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.55, ease: EASE }}
          role="tablist"
          aria-label="Pilares"
        >
          {accents.map((accent, index) => (
            <button
              key={accent}
              type="button"
              role="tab"
              aria-selected={active === index}
              className={`about-manifesto-tab${active === index ? " is-active" : ""}`}
              onClick={() => setActive(index)}
            >
              {active === index ? "— " : null}
              {accent}
            </button>
          ))}
        </motion.div>

        <h1 className="about-manifesto-title" aria-label={plainText}>
          {aboutPage.hero.lines.map((line, li) => (
            <span key={li} className="about-manifesto-line">
              {line.parts.map((part, pi) => (
                <motion.span
                  key={`${li}-${pi}`}
                  className={
                    part.style === "solid"
                      ? "about-manifesto-solid"
                      : "about-manifesto-outline"
                  }
                  initial={reduce ? false : { y: 18 }}
                  animate={{ y: 0 }}
                  transition={{
                    delay: 0.08 + li * 0.08 + pi * 0.04,
                    duration: 0.55,
                    ease: EASE,
                  }}
                >
                  {part.text}
                </motion.span>
              ))}
            </span>
          ))}
        </h1>

        <motion.p
          className="about-manifesto-lead"
          initial={reduce ? false : { y: 12 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.35, duration: 0.5, ease: EASE }}
        >
          {aboutPage.hero.lead}
        </motion.p>

        <motion.div
          className="about-hero-cta about-manifesto-cta"
          initial={reduce ? false : { y: 10 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.45, duration: 0.5, ease: EASE }}
        >
          <a href="#objetivo" className="about-btn about-btn--ghost">
            Seguir leyendo
          </a>
          <a href={aboutPage.cta.primary.href} className="about-btn about-btn--solid">
            {aboutPage.cta.primary.label} →
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function PricesSection() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const meter = useTransform(scrollYProgress, [0.15, 0.55], [8, 92]);
  const meterPct = useTransform(meter, (v) => `${v}%`);

  return (
    <section ref={ref} className="about-section about-prices" id="precios">
      <div className="about-section-inner about-prices-inner">
        <ScrollReveal variant="fade">
          <p className="about-kicker">{aboutPage.prices.kicker}</p>
        </ScrollReveal>

        <ScrollReveal variant="up" delay={0.06}>
          <h2 className="about-prices-title">
            <span className="about-prices-title-main">
              {aboutPage.prices.title}
            </span>{" "}
            <span className="about-prices-title-em">
              {aboutPage.prices.emphasis}
            </span>
          </h2>
        </ScrollReveal>

        <div className="about-prices-stage">
          <div className="about-prices-cols">
            <div className="about-prices-col about-prices-col--market">
              <p className="about-prices-col-label">Mercado</p>
              <ScrollStagger className="about-prices-stack" stagger={0.08}>
                {aboutPage.prices.market.map((item) => (
                  <ScrollItem key={item.label}>
                    <div className="about-price-chip about-price-chip--market">
                      <span className="about-price-chip-label">{item.label}</span>
                      <span className="about-price-chip-value">{item.value}</span>
                      <span className="about-price-chip-slash" />
                    </div>
                  </ScrollItem>
                ))}
              </ScrollStagger>
            </div>

            <div className="about-prices-col about-prices-col--ours">
              <p className="about-prices-col-label">Onvision</p>
              <ScrollStagger className="about-prices-stack" stagger={0.1}>
                {aboutPage.prices.ours.map((item) => (
                  <ScrollItem key={item.label}>
                    <div className="about-price-chip about-price-chip--ours">
                      <span className="about-price-chip-label">{item.label}</span>
                      <span className="about-price-chip-value">{item.value}</span>
                    </div>
                  </ScrollItem>
                ))}
              </ScrollStagger>
            </div>
          </div>

          <div className="about-prices-meter">
            <div className="about-prices-meter-track">
              <motion.span
                className="about-prices-meter-fill"
                style={reduce ? { width: "92%" } : { width: meterPct }}
              />
              <motion.span
                className="about-prices-meter-knob"
                style={reduce ? { left: "92%" } : { left: meterPct }}
              />
            </div>
            <div className="about-prices-meter-labels">
              <span>Inalcanzable</span>
              <span>Accesible</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MissionSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const lineScale = useTransform(scrollYProgress, [0.15, 0.55], [0, 1]);
  const reduce = useReducedMotion();

  return (
    <section ref={ref} className="about-section about-mission">
      <div className="about-section-inner">
        <ScrollReveal variant="fade">
          <p className="about-kicker">{aboutPage.mission.kicker}</p>
        </ScrollReveal>
        <ScrollReveal variant="up" delay={0.08}>
          <h2 className="about-title">{aboutPage.mission.title}</h2>
        </ScrollReveal>
        <ScrollReveal variant="up" delay={0.14}>
          <p className="about-body about-body--wide">{aboutPage.mission.body}</p>
        </ScrollReveal>

        <div className="about-mission-layout">
          <div className="about-mission-line" aria-hidden>
            <motion.span
              className="about-mission-line-fill"
              style={{ scaleY: reduce ? 1 : lineScale }}
            />
          </div>
          <ScrollStagger className="about-pillars" stagger={0.12}>
            {aboutPage.mission.pillars.map((pillar) => (
              <ScrollItem key={pillar.label}>
                <article className="about-pillar">
                  <span className="about-pillar-dot" aria-hidden />
                  <h3>{pillar.label}</h3>
                  <p>{pillar.text}</p>
                </article>
              </ScrollItem>
            ))}
          </ScrollStagger>
        </div>
      </div>
    </section>
  );
}

function ToolsField() {
  const reduce = useReducedMotion();
  const constellationRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const el = constellationRef.current;
    if (!el) return;

    let offscreen = true;
    const apply = () => {
      setPaused(document.hidden || offscreen);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        offscreen = !(entry.isIntersecting && entry.intersectionRatio > 0.08);
        apply();
      },
      { threshold: [0, 0.08, 0.2] },
    );
    io.observe(el);
    document.addEventListener("visibilitychange", apply);
    apply();

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", apply);
    };
  }, [reduce]);

  return (
    <section className="about-section about-tools" id="stack">
      <div className="about-section-inner">
        <ScrollReveal variant="fade">
          <p className="about-kicker">{aboutPage.tools.kicker}</p>
        </ScrollReveal>
        <ScrollReveal variant="up" delay={0.08}>
          <h2 className="about-title">{aboutPage.tools.title}</h2>
        </ScrollReveal>
        <ScrollReveal variant="up" delay={0.14}>
          <p className="about-body">{aboutPage.tools.body}</p>
        </ScrollReveal>

        <div className="about-tools-field">
          <div
            ref={constellationRef}
            className={`about-tools-constellation${reduce ? " is-static" : ""}${paused ? " is-paused" : ""}`}
            style={{ "--tool-count": TOOL_COUNT } as CSSProperties}
          >
            <span className="about-tools-orbit" aria-hidden />
            <div className="about-tools-core" aria-hidden>
              <span className="about-tools-core-ring" />
              <span className="about-tools-core-ring about-tools-core-ring--slow" />
              <span className="about-tools-core-label">STACK</span>
            </div>

            <div className="about-tools-spinner">
              {companyTools.map((tool, index) => {
                const Mark = tool.mark;
                return (
                  <div
                    key={tool.name}
                    className="about-tool-spoke"
                    style={{ "--tool-i": index } as CSSProperties}
                  >
                    <div className="about-tool-node">
                      <span className="about-tool-node-mark">
                        <Mark />
                      </span>
                      <span className="about-tool-node-name">{tool.name}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillMark({ mark }: { mark: "code" | "product" | "market" }) {
  if (mark === "code") {
    return (
      <svg className="about-skill-mark" viewBox="0 0 64 40" fill="none" aria-hidden>
        <path d="M18 8 6 20l12 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M46 8l12 12-12 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M36 6 28 34" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }
  if (mark === "product") {
    return (
      <svg className="about-skill-mark" viewBox="0 0 64 40" fill="none" aria-hidden>
        <rect x="8" y="8" width="22" height="24" rx="3" stroke="currentColor" strokeWidth="1.6" />
        <path d="M36 12h20M36 20h14M36 28h17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="19" cy="20" r="3.5" fill="currentColor" opacity="0.55" />
      </svg>
    );
  }
  return (
    <svg className="about-skill-mark" viewBox="0 0 64 40" fill="none" aria-hidden>
      <path d="M8 30c6-14 12-20 18-20s10 10 16 10 8-8 14-14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="52" cy="8" r="3.2" fill="currentColor" opacity="0.7" />
      <path d="M8 34h48" stroke="currentColor" strokeWidth="1.2" opacity="0.35" />
    </svg>
  );
}

function SkillsSection() {
  return (
    <section className="about-section about-skills" id="habilidades">
      <div className="about-section-inner">
        <ScrollReveal variant="up">
          <h2 className="about-skills-title">{aboutPage.skills.title}</h2>
        </ScrollReveal>

        <ScrollStagger className="about-skills-rail" stagger={0.1}>
          {aboutPage.skills.items.map((skill) => (
            <ScrollItem key={skill.code}>
              <article className={`about-skill-card about-skill-card--${skill.mark}`}>
                <span className="about-skill-index" aria-hidden>
                  {skill.code}
                </span>
                <div className="about-skill-body">
                  <h3 className="about-skill-label">{skill.label}</h3>
                  <p className="about-skill-hint">{skill.hint}</p>
                </div>
                <div className="about-skill-side" aria-hidden>
                  <SkillMark mark={skill.mark} />
                  <span className="about-skill-signal">
                    <i />
                    <i />
                    <i />
                    <i />
                  </span>
                </div>
                <span className="about-skill-sheen" aria-hidden />
              </article>
            </ScrollItem>
          ))}
        </ScrollStagger>
      </div>
    </section>
  );
}

function MarqueeStrip() {
  const words = [
    "SITIOS",
    "TIENDAS",
    "SOFTWARE",
    "IA ONVI",
    "MENSUALIDAD",
    "SOPORTE",
    "COSTA RICA",
  ];
  const loop = [...words, ...words];

  return (
    <div className="about-marquee" aria-hidden>
      <div className="about-marquee-track">
        {loop.map((word, i) => (
          <span key={`${word}-${i}`}>
            {word}
            <span className="about-marquee-dot" />
          </span>
        ))}
      </div>
    </div>
  );
}

export default function SobreNosotrosPage() {
  return (
    <div className="about-page">
      <ManifestoHero />
      <PricesSection />

      <MarqueeStrip />

      <div id="objetivo">
        <MissionSection />
      </div>

      <ToolsField />
      <SkillsSection />

      <section className="about-section about-cta">
        <ScrollReveal variant="scale" className="about-cta-inner">
          <div className="about-cta-ring" aria-hidden />
          <h2 className="about-title about-title--center">{aboutPage.cta.title}</h2>
          <div className="about-hero-cta about-hero-cta--center">
            <a href={aboutPage.cta.primary.href} className="about-btn about-btn--solid">
              {aboutPage.cta.primary.label} →
            </a>
            <a
              href={aboutPage.cta.secondary.href}
              target="_blank"
              rel="noopener noreferrer"
              className="about-btn about-btn--ghost"
            >
              {aboutPage.cta.secondary.label} →
            </a>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
