"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { companySistema } from "@/lib/company";
import ScrollReveal from "../ScrollReveal";
import CompanyPoints from "./CompanyPoints";
import {
  sistemaVerticals,
  type SistemaId,
  type SistemaVertical,
} from "@/lib/sistema-demo";
import "./CompanyWalkthrough.css";
import "./CompanySistema.css";

type Scene = {
  hold: number;
  active: SistemaId;
  hit: SistemaId | null;
  click?: boolean;
};

const SCENES: Scene[] = sistemaVerticals.flatMap((vertical, i) => {
  const next = sistemaVerticals[(i + 1) % sistemaVerticals.length]!;
  return [
    { hold: 2200, active: vertical.id, hit: null },
    { hold: 700, active: vertical.id, hit: next.id },
    { hold: 420, active: vertical.id, hit: next.id, click: true },
  ];
});

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

function RealPanel({ vertical }: { vertical: SistemaVertical }) {
  return (
    <div
      className="ov-sis-frame relative w-full overflow-hidden"
      style={{ background: vertical.bg }}
    >
      <img
        key={vertical.id}
        src={vertical.image}
        alt={vertical.alt}
        className="ov-sis-shot h-full w-full object-contain object-top"
      />
    </div>
  );
}

export default function CompanySistema() {
  const [index, setIndex] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [hoverId, setHoverId] = useState<SistemaId | null>(null);
  const tapeRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState({ x: 36, y: 90 });

  const scene = SCENES[index] ?? SCENES[0]!;
  const activeId = hovering && hoverId ? hoverId : scene.active;
  const vertical =
    sistemaVerticals.find((item) => item.id === activeId) ?? sistemaVerticals[0]!;

  useEffect(() => {
    if (hovering) return;
    const timer = window.setTimeout(() => {
      setIndex((current) => (current + 1) % SCENES.length);
    }, scene.hold);
    return () => window.clearTimeout(timer);
  }, [index, scene.hold, hovering]);

  useLayoutEffect(() => {
    const tape = tapeRef.current;
    if (!tape) return;

    const place = () => {
      const hit = hovering ? hoverId : scene.hit;
      if (!hit) {
        const box = tape.getBoundingClientRect();
        setCursor({ x: box.width * 0.55, y: box.height * 0.48 });
        return;
      }
      const el = tape.querySelector<HTMLElement>(`[data-hit="${hit}"]`);
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
  }, [scene.hit, scene.active, hovering, hoverId]);

  const pick = (id: SistemaId) => {
    setHovering(true);
    setHoverId(id);
  };

  return (
    <section id="sistema" className="scroll-mt-24 w-full px-4 py-12 md:px-6 md:py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:grid lg:grid-cols-[minmax(240px,0.7fr)_minmax(0,1.35fr)] lg:items-center lg:gap-14">
        <ScrollReveal className="max-w-sm lg:pr-2" variant="left" delay={0.06}>
          <h2 className="text-[1.45rem] leading-[1.15] font-medium tracking-[-0.04em] text-white sm:text-[1.9rem]">
            {companySistema.title}
          </h2>
          <CompanyPoints points={companySistema.points} />
          <a
            href={companySistema.cta.href}
            className="mt-5 inline-flex text-[14px] text-[#ff5a1f] transition hover:text-[#ff7a4d]"
          >
            {companySistema.cta.label} →
          </a>
        </ScrollReveal>

        <ScrollReveal variant="right" delay={0.14}>
        <div
          ref={tapeRef}
          className="ov-walk-window ov-sis-panel relative overflow-hidden rounded-2xl"
          onMouseLeave={() => {
            setHovering(false);
            setHoverId(null);
          }}
        >
          <div className="flex items-center gap-2 border-b border-white/8 px-3 py-2 sm:gap-3 sm:py-2.5">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate rounded-md bg-white/5 px-2 py-1 text-center font-mono text-[10px] text-white/40 sm:text-[11px]">
                {vertical.product}
              </div>
            </div>
          </div>

          <div className="ov-sis-body">
            <aside className="ov-sis-nav">
              <p className="hidden px-2 pb-1 text-[10px] font-medium tracking-[0.16em] text-white/30 uppercase sm:block">
                Verticales
              </p>
              <ul className="ov-sis-nav-list">
                {sistemaVerticals.map((item) => {
                  const on = item.id === activeId;
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        data-hit={item.id}
                        onMouseEnter={() => pick(item.id)}
                        onFocus={() => pick(item.id)}
                        onClick={() => pick(item.id)}
                        className={`ov-sis-row whitespace-nowrap rounded-lg px-2.5 py-1.5 text-left text-[12px] sm:w-full ${
                          on ? "is-on text-white" : "text-white/45"
                        }`}
                      >
                        {item.name}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </aside>
            <RealPanel vertical={vertical} />
          </div>

          {hovering ? null : (
            <div
              className={`ov-walk-cursor ov-sis-cursor ${scene.click ? "is-click" : ""}`}
              style={{ left: cursor.x, top: cursor.y }}
            >
              <Pointer />
              {scene.click ? (
                <span key={index} className="ov-walk-ripple" />
              ) : null}
            </div>
          )}
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
