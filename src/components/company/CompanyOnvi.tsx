"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { companyOnvi } from "@/lib/company";
import ScrollReveal from "../ScrollReveal";
import CompanyPoints from "./CompanyPoints";
import "./CompanyWalkthrough.css";
import "./CompanyOnvi.css";

type HitId = "open" | "apply";
type LineId = "hero" | "cta" | "done";

type Scene = {
  hold: number;
  fab: boolean;
  open: boolean;
  hit: HitId | null;
  click?: boolean;
  line?: LineId;
  hero?: boolean;
  cta?: boolean;
};

const WEEK = ["Onvi · La Pacífica", "Onvi · FirstDown", "Onvi · Panel"];
const MONTH = ["Hero más claro", "CTA WhatsApp", "Textos de la tienda"];

const SCENES: Scene[] = [
  { hold: 700, fab: false, open: false, hit: null },
  { hold: 800, fab: true, open: false, hit: null },
  { hold: 850, fab: true, open: false, hit: "open" },
  { hold: 480, fab: true, open: false, hit: "open", click: true },
  { hold: 1300, fab: true, open: true, hit: null, line: "hero" },
  { hold: 800, fab: true, open: true, hit: "apply", line: "hero" },
  { hold: 480, fab: true, open: true, hit: "apply", line: "hero", click: true },
  { hold: 1100, fab: true, open: true, hit: null, line: "hero", hero: true },
  { hold: 1300, fab: true, open: true, hit: null, line: "cta", hero: true },
  { hold: 800, fab: true, open: true, hit: "apply", line: "cta", hero: true },
  {
    hold: 480,
    fab: true,
    open: true,
    hit: "apply",
    line: "cta",
    hero: true,
    click: true,
  },
  {
    hold: 1600,
    fab: true,
    open: true,
    hit: null,
    line: "done",
    hero: true,
    cta: true,
  },
];

const LINES: Record<LineId, string> = {
  hero: "El hero no vende. Lo dejo más claro.",
  cta: "Listo el texto. ¿Agrego WhatsApp al botón?",
  done: "Aplicado. Onvi queda en el sitio para el siguiente cambio.",
};

function Pointer() {
  return (
    <svg viewBox="0 0 18 24" className="h-full w-full" aria-hidden>
      <path
        fill="#fff"
        stroke="#111"
        strokeWidth="1.1"
        d="M1.2 1.1 1.4 17.2l4.2-3.8 3.2 7.4 2.7-1.2-3.3-7.2L14.6 12Z"
      />
    </svg>
  );
}

function OnviMark({ className }: { className?: string }) {
  return (
    <img
      src="/logo-eye.png"
      alt=""
      width={72}
      height={38}
      className={className}
    />
  );
}

function OnviPage({ scene, index }: { scene: Scene; index: number }) {
  const tapeRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState({ x: 70, y: 90 });

  useLayoutEffect(() => {
    const tape = tapeRef.current;
    if (!tape) return;

    const place = () => {
      if (!scene.hit) {
        const box = tape.getBoundingClientRect();
        setCursor({ x: box.width * 0.72, y: box.height * 0.62 });
        return;
      }
      const el = tape.querySelector<HTMLElement>(`[data-hit="${scene.hit}"]`);
      if (!el) return;
      const box = tape.getBoundingClientRect();
      const target = el.getBoundingClientRect();
      setCursor({
        x: target.left - box.left + target.width / 2,
        y: target.top - box.top + target.height / 2,
      });
    };

    const frame = window.requestAnimationFrame(place);
    const ro = new ResizeObserver(place);
    ro.observe(tape);
    window.addEventListener("resize", place);
    return () => {
      window.cancelAnimationFrame(frame);
      ro.disconnect();
      window.removeEventListener("resize", place);
    };
  }, [scene.hit, scene.open, scene.fab, scene.line]);

  return (
    <div
      ref={tapeRef}
      className="ov-onvi-page ov-walk-tape relative h-[250px] rounded-xl border border-white/10 sm:h-[268px]"
    >
      <div className="flex items-center justify-between border-b border-white/8 px-3 py-2">
        <div className="flex items-center gap-1.5">
          <OnviMark className="h-3.5 w-auto" />
          <span className="text-[10px] font-medium text-white/80">
            La Pacífica
          </span>
        </div>
        <span className="hidden text-[9px] text-white/30 sm:inline">
          Villas · Costa Rica
        </span>
      </div>

      <div className="px-4 py-4 sm:px-5 sm:py-5">
        <p className="text-[9px] tracking-[0.16em] text-white/35 uppercase">
          Guanacaste
        </p>
        <h3
          className={`ov-onvi-copy mt-1.5 max-w-[16ch] text-[1.15rem] leading-[1.15] font-medium tracking-[-0.04em] text-white sm:text-[1.35rem] ${
            scene.hero ? "is-fresh" : ""
          }`}
        >
          {scene.hero
            ? "Tu villa en la costa, lista para reservar"
            : "Hotel & Villas"}
        </h3>
        <p className="mt-2 max-w-[28ch] text-[11px] leading-relaxed text-white/45">
          {scene.hero
            ? "Playas, piscina y desayuno. Reservá directo, sin intermediarios."
            : "Bienvenidos. Conocé nuestras habitaciones y servicios."}
        </p>
        {scene.cta ? (
          <span className="ov-onvi-copy is-fresh mt-3 inline-flex rounded-full bg-white px-3 py-1.5 text-[10px] font-medium text-black">
            WhatsApp
          </span>
        ) : (
          <span className="mt-3 inline-flex rounded-full border border-white/15 px-3 py-1.5 text-[10px] text-white/50">
            Ver más
          </span>
        )}
      </div>

      {scene.fab && !scene.open ? (
        <button
          type="button"
          tabIndex={-1}
          data-hit="open"
          className="ov-onvi-fab flex h-10 w-10 items-center justify-center rounded-full bg-[#141414] ring-1 ring-white/15"
        >
          <OnviMark className="h-4 w-auto" />
        </button>
      ) : null}

      {scene.open ? (
        <div className="ov-onvi-popup rounded-xl border border-white/12 bg-[#141414] p-2.5 shadow-2xl">
          <div className="flex items-center gap-1.5">
            <OnviMark className="h-3.5 w-auto" />
            <p className="text-[11px] font-medium text-white">Onvi</p>
            <span className="ml-auto text-[8px] text-cyan-300/80">IA</span>
          </div>
          <p className="mt-2 text-[11px] leading-snug text-white/65">
            {scene.line ? LINES[scene.line] : ""}
          </p>
          {scene.line && scene.line !== "done" ? (
            <button
              type="button"
              tabIndex={-1}
              data-hit="apply"
              className={`mt-2 rounded-full px-2.5 py-1 text-[10px] font-medium ${
                scene.hit === "apply"
                  ? "bg-cyan-300 text-black"
                  : "bg-white text-black"
              }`}
            >
              Aplicar
            </button>
          ) : null}
        </div>
      ) : null}

      <div
        className={`ov-walk-cursor ${scene.click ? "is-click" : ""}`}
        style={{ left: cursor.x, top: cursor.y }}
      >
        <Pointer />
        {scene.click ? <span key={index} className="ov-walk-ripple" /> : null}
      </div>
    </div>
  );
}

export default function CompanyOnvi() {
  const [index, setIndex] = useState(0);
  const scene = SCENES[index] ?? SCENES[0]!;

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIndex((current) => (current + 1) % SCENES.length);
    }, scene.hold);
    return () => window.clearTimeout(timer);
  }, [index, scene.hold]);

  return (
    <section className="w-full px-4 py-12 md:px-6 md:py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:grid lg:grid-cols-[minmax(240px,0.7fr)_minmax(0,1.35fr)] lg:items-center lg:gap-14">
        <ScrollReveal className="max-w-sm lg:pr-2" variant="left" delay={0.06}>
          <h2 className="text-[1.45rem] leading-[1.15] font-medium tracking-[-0.04em] text-white sm:text-[1.9rem]">
            {companyOnvi.title}
          </h2>
          <CompanyPoints points={companyOnvi.points} />
          <a
            href={companyOnvi.cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex text-[14px] text-[#ff5a1f] transition hover:text-[#ff7a4d]"
          >
            {companyOnvi.cta.label} →
          </a>
        </ScrollReveal>

        <ScrollReveal variant="right" delay={0.14}>
        <div className="ov-walk-window overflow-hidden rounded-2xl">
          <div className="flex items-center gap-2 border-b border-white/8 px-3 py-2 sm:gap-3 sm:py-2.5">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate rounded-md bg-white/5 px-2 py-1 text-center font-mono text-[10px] text-white/40 sm:text-[11px]">
                la-pacifica.com
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-[158px_1fr]">
            <aside className="hidden border-r border-white/8 px-3 py-4 sm:block">
              <p className="px-1 text-[10px] font-medium tracking-[0.16em] text-white/30 uppercase">
                Esta semana
              </p>
              <ul className="mt-2 space-y-0.5">
                {WEEK.map((name, i) => (
                  <li
                    key={name}
                    className={`rounded-lg px-2 py-1.5 text-[12px] ${
                      i === 0 ? "bg-white/6 text-white" : "text-white/45"
                    }`}
                  >
                    {name}
                  </li>
                ))}
              </ul>
              <p className="mt-5 px-1 text-[10px] font-medium tracking-[0.16em] text-white/30 uppercase">
                Este mes
              </p>
              <ul className="mt-2 space-y-0.5">
                {MONTH.map((name) => (
                  <li
                    key={name}
                    className="rounded-lg px-2 py-1.5 text-[12px] text-white/45"
                  >
                    {name}
                  </li>
                ))}
              </ul>
            </aside>

            <div className="flex min-w-0 flex-col px-3 py-3 sm:px-5 sm:py-4">
              <p className="text-[13px] font-medium text-white/90">Onvi</p>
              <div className="mt-2 rounded-full bg-white/6 px-3 py-2 text-[12px] leading-snug text-white/70 sm:mt-3">
                Onvi, el sitio se ve bien pero el hero no vende.
              </div>
              <p className="mt-3 hidden text-[12px] leading-relaxed text-white/50 sm:block">
                Lo abro en la página y te dejo los cambios para aplicar.
              </p>
              <p className="mt-1 hidden text-[11px] text-white/30 sm:block">
                Incluida en cada proyecto
              </p>

              <div className="mt-3 sm:mt-4">
                <OnviPage scene={scene} index={index} />
              </div>

              <p className="mt-3 text-[12px] leading-relaxed text-white/45 sm:mt-4">
                <span className="font-medium text-white/80">Resumen. </span>
                Onvi reescribió el hero y dejó WhatsApp en el CTA.
              </p>

              <div className="mt-3 hidden items-center justify-between rounded-full bg-white/5 px-3 py-2 text-[12px] text-white/30 sm:flex">
                <span>Preguntarle a Onvi…</span>
                <span>↑</span>
              </div>
            </div>
          </div>
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
