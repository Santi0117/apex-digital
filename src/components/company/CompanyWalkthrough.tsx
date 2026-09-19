"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { companyWalkthrough } from "@/lib/company";
import ScrollReveal from "../ScrollReveal";
import CompanyPoints from "./CompanyPoints";
import "./CompanyWalkthrough.css";

type ViewId = "catalog" | "product" | "cart";
type HitId = "shop" | "jersey" | "talle" | "add" | "cart" | "pay";

type Scene = {
  hold: number;
  view: ViewId;
  hit: HitId | null;
  click?: boolean;
  talle?: "M" | "L";
  inCart?: boolean;
  toast?: string;
};

const WEEK = ["FirstDown Store", "La Pacífica", "Panel Onvision"];
const MONTH = ["Landing corporativa", "Checkout Onvo", "Inventario"];

const SCENES: Scene[] = [
  { hold: 700, view: "catalog", hit: null },
  { hold: 900, view: "catalog", hit: "jersey" },
  { hold: 520, view: "catalog", hit: "jersey", click: true },
  { hold: 1000, view: "product", hit: null },
  { hold: 850, view: "product", hit: "talle" },
  { hold: 500, view: "product", hit: "talle", click: true, talle: "L" },
  { hold: 850, view: "product", hit: "add", talle: "L" },
  {
    hold: 700,
    view: "product",
    hit: "add",
    click: true,
    talle: "L",
    inCart: true,
    toast: "Jersey en el carrito",
  },
  { hold: 850, view: "product", hit: "cart", talle: "L", inCart: true },
  {
    hold: 500,
    view: "product",
    hit: "cart",
    click: true,
    talle: "L",
    inCart: true,
  },
  { hold: 900, view: "cart", hit: null, talle: "L", inCart: true },
  { hold: 850, view: "cart", hit: "pay", talle: "L", inCart: true },
  {
    hold: 1500,
    view: "cart",
    hit: "pay",
    click: true,
    talle: "L",
    inCart: true,
    toast: "Onvo · pago listo",
  },
];

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

function JerseyMark({ tone }: { tone: "home" | "away" }) {
  const fill = tone === "home" ? "#e8e8e8" : "#1d4ed8";
  const stroke = tone === "home" ? "#111" : "#93c5fd";
  return (
    <svg viewBox="0 0 48 48" className="h-10 w-10 sm:h-11 sm:w-11" aria-hidden>
      <path
        fill={fill}
        stroke={stroke}
        strokeWidth="1.4"
        d="M16 10 8 16v6h6v16h20V22h6v-6l-8-6-4 3h-8l-4-3Z"
      />
    </svg>
  );
}

function hitClass(active: boolean, extra = "") {
  return `ov-walk-hit ${active ? "is-hot" : ""} ${extra}`.trim();
}

function StoreTape({ scene, index }: { scene: Scene; index: number }) {
  const tapeRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState({ x: 72, y: 88 });

  useLayoutEffect(() => {
    const tape = tapeRef.current;
    if (!tape) return;

    const place = () => {
      if (!scene.hit) {
        const box = tape.getBoundingClientRect();
        setCursor({ x: box.width * 0.58, y: box.height * 0.48 });
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
  }, [scene.hit, scene.view, scene.talle, scene.inCart]);

  return (
    <div
      ref={tapeRef}
      className="ov-walk-tape relative h-[232px] rounded-xl border border-white/10 sm:h-[248px]"
    >
      <div className="flex items-center gap-1.5 border-b border-white/8 px-2.5 py-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-[#ff5f57]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#febc2e]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#28c840]" />
        <span className="ml-1.5 truncate font-mono text-[10px] text-white/35">
          firstdown-store.com
        </span>
        <button
          type="button"
          tabIndex={-1}
          data-hit="cart"
          className={hitClass(
            scene.hit === "cart",
            "ml-auto rounded-md border border-white/10 px-1.5 py-0.5 text-[9px] text-white/70",
          )}
        >
          Carrito{scene.inCart ? " · 1" : ""}
        </button>
      </div>

      <div className="flex h-[calc(100%-28px)]">
        <aside className="hidden w-[68px] shrink-0 space-y-1 border-r border-white/8 p-2 sm:block">
          <div
            data-hit="shop"
            className={`rounded-md px-1.5 py-1 text-[9px] ${
              scene.view !== "cart" ? "bg-white/10 text-white" : "text-white/40"
            }`}
          >
            Tienda
          </div>
          <div className="rounded-md px-1.5 py-1 text-[9px] text-white/25">
            Equipos
          </div>
        </aside>

        <div className="relative min-w-0 flex-1 overflow-hidden p-2.5">
          {scene.view === "catalog" ? (
            <div className="grid h-full grid-cols-2 gap-2">
              <button
                type="button"
                tabIndex={-1}
                data-hit="jersey"
                className={hitClass(
                  scene.hit === "jersey",
                  "flex flex-col items-center justify-center rounded-lg border border-white/8 bg-white/[0.03] px-2",
                )}
              >
                <JerseyMark tone="home" />
                <p className="mt-1.5 text-[10px] font-medium text-white">
                  Jersey Local
                </p>
                <p className="text-[10px] text-white/45">₡32.000</p>
              </button>
              <div className="flex flex-col items-center justify-center rounded-lg border border-white/8 bg-white/[0.03] px-2">
                <JerseyMark tone="away" />
                <p className="mt-1.5 text-[10px] font-medium text-white">
                  Visitante
                </p>
                <p className="text-[10px] text-white/45">₡32.000</p>
              </div>
            </div>
          ) : null}

          {scene.view === "product" ? (
            <div className="flex h-full flex-col">
              <div className="flex items-center gap-3 rounded-lg border border-white/8 bg-white/[0.03] px-3 py-2.5">
                <JerseyMark tone="home" />
                <div>
                  <p className="text-[12px] font-medium text-white">
                    Jersey Local
                  </p>
                  <p className="text-[11px] text-white/45">₡32.000 · envío CR</p>
                </div>
              </div>
              <div className="mt-2.5 flex items-center gap-1.5">
                <span className="text-[10px] text-white/40">Talla</span>
                {(["M", "L"] as const).map((size) => (
                  <span
                    key={size}
                    data-hit={size === "L" ? "talle" : undefined}
                    className={`rounded-md border px-2 py-1 text-[10px] ${
                      scene.talle === size
                        ? "border-white bg-white text-black"
                        : scene.hit === "talle" && size === "L"
                          ? "ov-walk-hit is-hot border-white/15 text-white"
                          : "border-white/15 text-white/70"
                    }`}
                  >
                    {size}
                  </span>
                ))}
              </div>
              <button
                type="button"
                tabIndex={-1}
                data-hit="add"
                className={hitClass(
                  scene.hit === "add",
                  "mt-auto rounded-full bg-white px-3 py-1.5 text-[11px] font-medium text-black",
                )}
              >
                Agregar al carrito
              </button>
            </div>
          ) : null}

          {scene.view === "cart" ? (
            <div className="flex h-full flex-col">
              <p className="text-[11px] font-medium text-white/80">Carrito</p>
              <div className="mt-2 flex items-center justify-between rounded-lg border border-white/8 px-2.5 py-2">
                <div className="flex items-center gap-2">
                  <JerseyMark tone="home" />
                  <div>
                    <p className="text-[11px] text-white">Jersey Local</p>
                    <p className="text-[10px] text-white/40">
                      Talla {scene.talle ?? "L"}
                    </p>
                  </div>
                </div>
                <p className="text-[11px] text-white">₡32.000</p>
              </div>
              <button
                type="button"
                tabIndex={-1}
                data-hit="pay"
                className={hitClass(
                  scene.hit === "pay",
                  "mt-auto rounded-full bg-white px-3 py-1.5 text-[11px] font-medium text-black",
                )}
              >
                Pagar con Onvo
              </button>
            </div>
          ) : null}

          {scene.toast ? (
            <div className="ov-walk-toast pointer-events-none absolute top-2 right-2 z-5 rounded-md bg-white px-2 py-1 text-[9px] font-medium text-black">
              {scene.toast}
            </div>
          ) : null}
        </div>
      </div>

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

export default function CompanyWalkthrough() {
  const [index, setIndex] = useState(0);
  const scene = SCENES[index] ?? SCENES[0]!;

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIndex((current) => (current + 1) % SCENES.length);
    }, scene.hold);
    return () => window.clearTimeout(timer);
  }, [index, scene.hold]);

  return (
    <section className="w-full px-4 py-8 md:px-6 md:py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 lg:grid lg:grid-cols-[minmax(0,1.4fr)_minmax(220px,0.62fr)] lg:items-center lg:gap-12">
        <ScrollReveal
          className="order-2 lg:order-1"
          variant="left"
          delay={0.08}
        >
          <div className="ov-walk-window overflow-hidden rounded-2xl">
          <div className="flex items-center gap-2 border-b border-white/8 px-3 py-2 sm:gap-3 sm:py-2.5">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate rounded-md bg-white/5 px-2 py-1 text-center font-mono text-[10px] text-white/40 sm:text-[11px]">
                firstdown-store.com
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
              <p className="text-[13px] font-medium text-white/90">
                FirstDown Store
              </p>
              <div className="mt-2 rounded-full bg-white/6 px-3 py-2 text-[12px] leading-snug text-white/70 sm:mt-3">
                Armame la tienda de jerseys, con tallas y pago por Onvo.
              </div>
              <p className="mt-3 hidden text-[12px] leading-relaxed text-white/50 sm:block">
                Listo. Catálogo, variantes y checkout. Acá va el walkthrough de
                la tienda.
              </p>
              <p className="mt-1 hidden text-[11px] text-white/30 sm:block">
                Trabajé 16m · 3 pantallas
              </p>

              <div className="mt-3 sm:mt-4">
                <StoreTape scene={scene} index={index} />
              </div>

              <p className="mt-3 text-[12px] leading-relaxed text-white/45 sm:mt-4">
                <span className="font-medium text-white/80">Resumen. </span>
                Tienda con jerseys, talla L y pago Onvo. Publicada en staging.
              </p>

              <div className="mt-3 hidden items-center justify-between rounded-full bg-white/5 px-3 py-2 text-[12px] text-white/30 sm:flex">
                <span>Agregar un follow-up…</span>
                <span>↑</span>
              </div>
            </div>
          </div>
          </div>
        </ScrollReveal>

        <ScrollReveal
          className="order-1 ov-walk-copy lg:order-2"
          variant="right"
          delay={0.16}
        >
          <div className="ov-walk-copy-top">
            <h2 className="ov-walk-title">
              {companyWalkthrough.title}
            </h2>
            <CompanyPoints points={companyWalkthrough.points} />
            <a
              href={companyWalkthrough.cta.href}
              className="ov-walk-cta"
            >
              {companyWalkthrough.cta.label} →
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
