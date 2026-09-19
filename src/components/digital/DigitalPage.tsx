"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import ScrollReveal from "@/components/ScrollReveal";
import Carousel, { type CarouselItem } from "@/components/digital/Carousel";
import DigitalPricing from "@/components/digital/DigitalPricing";
import DigitalImpact from "@/components/digital/DigitalImpact";
import DigitalMeeting from "@/components/digital/DigitalMeeting";
import {
  digitalFaq,
  digitalHero,
  digitalIncludes,
  digitalShowreel,
} from "@/lib/digital";
import "./DigitalPage.css";

const MARQUEE_ITEMS = [
  "Apps web",
  "Apps móviles",
  "Software",
  "Páginas web",
  "Facturación electrónica",
  "SaaS por industria",
  "E-commerce",
  "Onvi",
] as const;
const MARQUEE = `${MARQUEE_ITEMS.join(" · ")} · `.repeat(4);

const EASE = [0.22, 1, 0.36, 1] as const;

function CharHeadline({
  text,
  className,
  as: Tag = "h1",
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2";
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={`${className ?? ""} od-char-headline`} aria-label={text}>
      {words.map((word, wi) => (
        <span key={`${word}-${wi}`} className="od-word">
          {word.split("").map((ch, ci) => (
            <motion.span
              key={`${wi}-${ci}`}
              className="od-char"
              initial={{ y: "115%", opacity: 0, rotateX: 40 }}
              animate={{ y: "0%", opacity: 1, rotateX: 0 }}
              transition={{
                duration: 0.75,
                delay: 0.28 + wi * 0.055 + ci * 0.016,
                ease: EASE,
              }}
            >
              {ch}
            </motion.span>
          ))}
          {wi < words.length - 1 ? <span className="od-space"> </span> : null}
        </span>
      ))}
    </Tag>
  );
}

function RevealTitle({
  children,
  id,
  className = "od-section-title",
}: {
  children: string;
  id?: string;
  className?: string;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <h2 id={id} className={className}>
        {children}
      </h2>
    );
  }

  return (
    <h2 id={id} className={`${className} od-mask-title`}>
      <motion.span
        initial={{ y: "110%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.85, ease: EASE }}
      >
        {children}
      </motion.span>
    </h2>
  );
}

function MagneticButton({
  href,
  children,
  className,
  external,
}: {
  href: string;
  children: ReactNode;
  className: string;
  external?: boolean;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 280, damping: 22 });
  const sy = useSpring(y, { stiffness: 280, damping: 22 });

  return (
    <motion.a
      ref={ref}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`${className} od-btn-shine`}
      style={reduce ? undefined : { x: sx, y: sy }}
      onMouseMove={(e) => {
        if (reduce || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.28);
        y.set((e.clientY - r.top - r.height / 2) * 0.28);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileHover={reduce ? undefined : { scale: 1.03 }}
      whileTap={reduce ? undefined : { scale: 0.98 }}
    >
      <span className="od-btn-inner">{children}</span>
    </motion.a>
  );
}

function MacVideo({
  video,
  poster,
  label,
}: {
  video: string;
  poster: string;
  label: string;
}) {
  return (
    <div className="od-mac">
      <div className="od-mac-chrome" aria-hidden>
        <span className="od-mac-dot od-mac-dot--close" />
        <span className="od-mac-dot od-mac-dot--min" />
        <span className="od-mac-dot od-mac-dot--max" />
      </div>
      <div className="od-mac-screen">
        <video
          className="od-mac-video"
          src={video}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={label}
        />
      </div>
    </div>
  );
}

function ServiceIcon({ kind }: { kind: number }) {
  const common = {
    className: "carousel-icon",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (kind) {
    case 1: // Página web
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="14" rx="2" />
          <path d="M8 21h8M12 18v3" />
        </svg>
      );
    case 2: // E-commerce
      return (
        <svg {...common}>
          <circle cx="9" cy="20" r="1.4" />
          <circle cx="18" cy="20" r="1.4" />
          <path d="M3 4h2l2.4 11h10.2l2-7H7.2" />
        </svg>
      );
    case 3: // Software a medida
      return (
        <svg {...common}>
          <path d="M4 6h16v12H4z" />
          <path d="M8 10h3v3H8zM13 10h3M13 13h3M8 16h8" />
        </svg>
      );
    case 4: // App móvil
      return (
        <svg {...common}>
          <rect x="7" y="2" width="10" height="20" rx="2" />
          <path d="M11 18h2" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
          <path d="M12 12l8-4.5M12 12v9M12 12L4 7.5" />
        </svg>
      );
  }
}

function ServiceIncludes() {
  const reduce = useReducedMotion();
  const shellRef = useRef<HTMLDivElement>(null);
  const [baseWidth, setBaseWidth] = useState(340);

  useEffect(() => {
    const el = shellRef.current;
    if (!el) return;

    const update = () => {
      const w = el.clientWidth;
      // Circle: keep a large but phone-friendly diameter
      setBaseWidth(Math.max(300, Math.min(w, 480)));
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const items: CarouselItem[] = digitalIncludes.items.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    price: item.price,
    icon: <ServiceIcon kind={item.id} />,
  }));

  return (
    <div className="od-includes">
      <ScrollReveal>
        <p className="od-kicker">01 — Qué incluye</p>
        <h2 id="od-includes-title" className="od-section-title">
          {digitalIncludes.title}
        </h2>
        <p className="od-section-lead">{digitalIncludes.lead}</p>
      </ScrollReveal>

      <div className="od-includes-stage" ref={shellRef}>
        <Carousel
          items={items}
          baseWidth={baseWidth}
          autoplay={!reduce}
          autoplayDelay={3500}
          pauseOnHover
          loop
          round
        />
      </div>
    </div>
  );
}

function VideoShowreel() {
  const rows = digitalShowreel.items.slice(0, 3);

  return (
    <div className="od-showreel-stack">
      <header className="od-showreel-intro">
        <h2 id="od-work-title" className="od-showreel-heading">
          {digitalShowreel.title}
        </h2>
        <p className="od-showreel-intro-lead">{digitalShowreel.lead}</p>
      </header>

      {rows.map((item, index) => {
        const flip = index % 2 === 1;
        return (
          <article
            key={item.id}
            className={`od-showreel${flip ? " od-showreel--flip" : ""}`}
          >
            <div className="od-showreel-media">
              <MacVideo
                video={item.video}
                poster={item.poster}
                label={item.label}
              />
            </div>
            <div className="od-showreel-copy">
              <p className="od-showreel-index" aria-hidden>
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="od-showreel-title">{item.label}</h3>
              <p className="od-showreel-lead">{item.body}</p>
              <a
                href={digitalShowreel.cta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="od-gm-btn"
              >
                <span className="od-gm-btn-icon" aria-hidden>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M3 11L11 3M11 3H5M11 3v6"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="od-gm-btn-text">{digitalShowreel.cta.label}</span>
              </a>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default function DigitalPage() {
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <div className="od-page">
      <div className="od-ambient" aria-hidden>
        <motion.span
          className="od-orb od-orb-a"
          animate={
            reduce
              ? undefined
              : { x: [0, 40, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.08, 0.96, 1] }
          }
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.span
          className="od-orb od-orb-b"
          animate={
            reduce
              ? undefined
              : { x: [0, -50, 30, 0], y: [0, 40, -25, 0], scale: [1, 0.92, 1.1, 1] }
          }
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <section className="od-hero">
        <motion.p
          className="od-eyebrow"
          initial={reduce ? false : { opacity: 0, letterSpacing: "0.42em" }}
          animate={{ opacity: 1, letterSpacing: "0.22em" }}
          transition={{ duration: 1.1, ease: EASE }}
        >
          {digitalHero.eyebrow}
        </motion.p>

        <CharHeadline text={digitalHero.headline} className="od-hero-title" />

        <motion.p
          className="od-hero-lead"
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 0.7, ease: EASE }}
        >
          {digitalHero.lead}
        </motion.p>

        <motion.div
          className="od-hero-ctas"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.35, duration: 0.65, ease: EASE }}
        >
          <MagneticButton
            href={digitalHero.primaryCta.href}
            className="od-btn od-btn-primary"
          >
            {digitalHero.primaryCta.label} →
          </MagneticButton>
        </motion.div>
      </section>

      <div className="od-marquee" aria-hidden>
        <motion.div
          className="od-marquee-track"
          animate={reduce ? undefined : { x: ["0%", "-50%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        >
          <span>{MARQUEE}</span>
          <span>{MARQUEE}</span>
        </motion.div>
      </div>

      <section className="od-section od-section--showreel" id="trabajo" aria-labelledby="od-work-title">
        <VideoShowreel />
      </section>

      <section
        className="od-section od-section--includes"
        id="incluye"
        aria-labelledby="od-includes-title"
      >
        <ServiceIncludes />
      </section>

      <DigitalPricing />

      <DigitalImpact />

      <DigitalMeeting />

      <section className="od-section od-faq-section" id="faq" aria-labelledby="od-faq-title">
        <ScrollReveal>
          <p className="od-kicker">{digitalFaq.label}</p>
          <RevealTitle id="od-faq-title">{digitalFaq.title}</RevealTitle>
          <p className="od-section-lead">{digitalFaq.description}</p>
        </ScrollReveal>

        <div className="od-faq">
          {digitalFaq.items.map((item, i) => {
            const isOpen = faqOpen === i;
            const index = `${digitalFaq.itemPrefix}${String(i + 1).padStart(2, "0")}`;
            return (
              <motion.div
                key={item.q}
                className="od-faq-item"
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.5 }}
              >
                <button
                  type="button"
                  className={`od-faq-q${isOpen ? " is-open" : ""}`}
                  aria-expanded={isOpen}
                  onClick={() => setFaqOpen(isOpen ? null : i)}
                >
                  <span className="od-faq-n" aria-hidden>
                    {index}
                  </span>
                  <span className="od-faq-q-text">{item.q}</span>
                  <motion.span
                    className="od-faq-icon"
                    aria-hidden
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      className="od-faq-a"
                      key="a"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                    >
                      <p>{item.a}</p>
                      {"groups" in item && item.groups
                        ? item.groups.map((group) => (
                            <div key={group.title} className="od-faq-group">
                              <p className="od-faq-group-title">{group.title}</p>
                              <ul>
                                {group.points.map((point) => (
                                  <li key={point}>{point}</li>
                                ))}
                              </ul>
                            </div>
                          ))
                        : null}
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <p className="od-faq-footer">
          {digitalFaq.footerText}
          <a
            href={digitalFaq.footerHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            {digitalFaq.footerCta}
          </a>
        </p>
      </section>
    </div>
  );
}
