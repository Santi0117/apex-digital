"use client";

import { useId, useMemo, useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import ScrollReveal from "@/components/ScrollReveal";
import { digitalImpact } from "@/lib/digital";
import "./DigitalImpact.css";

const EASE = [0.22, 1, 0.36, 1] as const;

type Pt = { x: number; y: number };

function toPoints(
  values: readonly number[],
  max: number,
  w: number,
  h: number,
  pad: { t: number; r: number; b: number; l: number },
) {
  const innerW = w - pad.l - pad.r;
  const innerH = h - pad.t - pad.b;
  const step = values.length > 1 ? innerW / (values.length - 1) : 0;
  return values.map((v, i) => ({
    x: pad.l + i * step,
    y: pad.t + innerH - (v / max) * innerH,
  }));
}

function smoothLine(points: Pt[]) {
  if (!points.length) return "";
  if (points.length === 1) return `M ${points[0]!.x} ${points[0]!.y}`;
  let d = `M ${points[0]!.x.toFixed(2)} ${points[0]!.y.toFixed(2)}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i === 0 ? 0 : i - 1]!;
    const p1 = points[i]!;
    const p2 = points[i + 1]!;
    const p3 = points[i + 2] ?? p2;
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
  }
  return d;
}

function smoothArea(points: Pt[], baseY: number) {
  if (!points.length) return "";
  const first = points[0]!;
  const last = points[points.length - 1]!;
  return `${smoothLine(points)} L ${last.x.toFixed(2)} ${baseY} L ${first.x.toFixed(2)} ${baseY} Z`;
}

function WebDualChart() {
  const { web } = digitalImpact;
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const active = !!reduce || inView;
  const uid = useId().replace(/:/g, "");

  const W = 440;
  const H = 236;
  const PAD = { t: 24, r: 18, b: 34, l: 14 };

  const max = useMemo(
    () => Math.max(...web.sales.values, ...web.comms.values) * 1.1,
    [web.sales.values, web.comms.values],
  );
  const salesPts = useMemo(
    () => toPoints(web.sales.values, max, W, H, PAD),
    [web.sales.values, max],
  );
  const commsPts = useMemo(
    () => toPoints(web.comms.values, max, W, H, PAD),
    [web.comms.values, max],
  );

  const salesLine = smoothLine(salesPts);
  const commsLine = smoothLine(commsPts);
  const salesArea = smoothArea(salesPts, H - PAD.b);
  const lastSales = salesPts[salesPts.length - 1]!;
  const lastComms = commsPts[commsPts.length - 1]!;

  return (
    <article ref={ref} className="od-impact-panel od-impact-panel--web">
      <header className="od-impact-chart-head">
        <div>
          <p className="od-impact-eyebrow">{web.eyebrow}</p>
          <h3>{web.title}</h3>
          <p className="od-impact-sub">{web.subtitle}</p>
        </div>
        <div className="od-impact-metrics">
          {web.metrics.map((m, i) => (
            <motion.div
              key={m.label}
              className="od-impact-metric-chip"
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={active ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.55, delay: 0.12 + i * 0.08, ease: EASE }}
            >
              <span>{m.value}</span>
              <small>{m.label}</small>
            </motion.div>
          ))}
        </div>
      </header>

      <div
        className="od-impact-plot"
        role="img"
        aria-label="Ventas y comunicación con páginas web a lo largo de 6 meses"
      >
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id={`sales-fill-${uid}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.16)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
            </linearGradient>
            <linearGradient id={`sales-stroke-${uid}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.45)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0.92)" />
            </linearGradient>
            <linearGradient id={`comms-stroke-${uid}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.2)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0.48)" />
            </linearGradient>
            <filter id={`glow-${uid}`} x="-20%" y="-40%" width="140%" height="180%">
              <feGaussianBlur stdDeviation="1.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <clipPath id={`reveal-${uid}`}>
              <motion.rect
                x="0"
                y="0"
                height={H}
                initial={reduce ? false : { width: 0 }}
                animate={active ? { width: W } : { width: 0 }}
                transition={{ duration: 1.4, delay: 0.12, ease: EASE }}
              />
            </clipPath>
          </defs>

          {[0.25, 0.5, 0.75].map((t) => {
            const y = PAD.t + (H - PAD.t - PAD.b) * (1 - t);
            return (
              <line
                key={t}
                x1={PAD.l}
                x2={W - PAD.r}
                y1={y}
                y2={y}
                className="od-impact-gridline"
              />
            );
          })}

          <g clipPath={`url(#reveal-${uid})`}>
            <path d={salesArea} fill={`url(#sales-fill-${uid})`} />
            <path
              d={commsLine}
              fill="none"
              stroke={`url(#comms-stroke-${uid})`}
              className="od-impact-line od-impact-line--comms"
            />
            <path
              d={salesLine}
              fill="none"
              stroke={`url(#sales-stroke-${uid})`}
              filter={`url(#glow-${uid})`}
              className="od-impact-line od-impact-line--sales"
            />
            <circle
              cx={lastComms.x}
              cy={lastComms.y}
              r={3}
              className="od-impact-dot od-impact-dot--comms"
            />
            <circle
              cx={lastSales.x}
              cy={lastSales.y}
              r={3.5}
              className="od-impact-dot od-impact-dot--live"
            />
          </g>

          {web.labels.map((label, i) => (
            <text
              key={label}
              x={salesPts[i]?.x ?? 0}
              y={H - 10}
              textAnchor="middle"
              className="od-impact-xlabel"
            >
              {label}
            </text>
          ))}
        </svg>
      </div>

      <ul className="od-impact-legend" aria-hidden>
        <li>
          <span className="od-impact-swatch od-impact-swatch--glow" />
          {web.sales.label}
        </li>
        <li>
          <span className="od-impact-swatch od-impact-swatch--comms" />
          {web.comms.label}
        </li>
      </ul>
    </article>
  );
}

function SoftwareProductivity() {
  const { software } = digitalImpact;
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const active = !!reduce || inView;

  const max = Math.max(...software.values, ...software.baseline);

  return (
    <article ref={ref} className="od-impact-panel od-impact-panel--software">
      <header className="od-impact-chart-head">
        <div>
          <p className="od-impact-eyebrow">{software.eyebrow}</p>
          <h3>{software.title}</h3>
          <p className="od-impact-sub">{software.subtitle}</p>
        </div>
        <div className="od-impact-metric">
          <motion.span
            initial={reduce ? false : { opacity: 0, y: 12, filter: "blur(6px)" }}
            animate={
              active ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined
            }
            transition={{ duration: 0.65, delay: 0.12, ease: EASE }}
          >
            {software.metric}
          </motion.span>
          <small>{software.metricLabel}</small>
        </div>
      </header>

      <div
        className="od-impact-bars"
        role="img"
        aria-label={`Productividad con software a medida: ${software.metric}`}
      >
        {software.labels.map((label, i) => {
          const withSoft = (software.values[i]! / max) * 100;
          const without = (software.baseline[i]! / max) * 100;
          const isLast = i === software.labels.length - 1;
          return (
            <div key={label} className="od-impact-bar-col">
              <div className="od-impact-bar-pair">
                <motion.span
                  className="od-impact-bar od-impact-bar--ghost"
                  style={{ height: `${without}%` }}
                  initial={reduce ? false : { scaleY: 0 }}
                  animate={active ? { scaleY: 1 } : { scaleY: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.15 + i * 0.07,
                    ease: EASE,
                  }}
                />
                <motion.span
                  className={`od-impact-bar od-impact-bar--soft${isLast ? " is-peak" : ""}`}
                  style={{ height: `${withSoft}%` }}
                  initial={reduce ? false : { scaleY: 0 }}
                  animate={active ? { scaleY: 1 } : { scaleY: 0 }}
                  transition={{
                    duration: 0.85,
                    delay: 0.28 + i * 0.08,
                    ease: EASE,
                  }}
                />
              </div>
              <span className="od-impact-bar-label">{label}</span>
            </div>
          );
        })}
      </div>

      <ul className="od-impact-legend" aria-hidden>
        <li>
          <span className="od-impact-swatch od-impact-swatch--soft" />
          {software.seriesLabel}
        </li>
        <li>
          <span className="od-impact-swatch od-impact-swatch--ghost" />
          {software.baselineLabel}
        </li>
      </ul>
    </article>
  );
}

export default function DigitalImpact() {
  return (
    <section
      className="od-section od-impact-section"
      id="impacto"
      aria-labelledby="od-impact-title"
    >
      <ScrollReveal>
        <p className="od-kicker">{digitalImpact.label}</p>
        <h2 id="od-impact-title" className="od-section-title">
          {digitalImpact.title}
        </h2>
        <p className="od-section-lead">{digitalImpact.lead}</p>
      </ScrollReveal>

      <div className="od-impact-grid">
        <WebDualChart />
        <SoftwareProductivity />
      </div>

      <p className="od-impact-note">{digitalImpact.note}</p>
    </section>
  );
}
