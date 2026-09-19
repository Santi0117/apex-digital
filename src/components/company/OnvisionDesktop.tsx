"use client";

import { useEffect, useState } from "react";
import { desktopSteps, type DesktopStepId } from "@/lib/desktop-demo";
import "./OnvisionDesktop.css";

const STEP_IDS = desktopSteps.map((step) => step.id);

function PreviewSite({
  active,
  visible,
  compact = false,
}: {
  active: DesktopStepId;
  visible: Set<DesktopStepId>;
  compact?: boolean;
}) {
  const on = (id: DesktopStepId) =>
    `ov-desk-preview-block${visible.has(id) ? " is-on" : ""}${
      active === id ? " is-hot" : ""
    }`;

  return (
    <div
      className={`h-full overflow-hidden bg-[#0a0f14] text-left text-white ${
        compact ? "pt-8" : ""
      }`}
    >
      <div
        className={`flex items-center justify-between border-b border-white/8 ${
          compact ? "px-4 py-2.5" : "px-5 py-3"
        }`}
      >
        <div className="flex items-center gap-2">
          <img
            src="/logo-eye.png"
            alt=""
            width={72}
            height={38}
            className="h-5 w-auto"
          />
          <span className="text-[13px] font-medium tracking-[-0.02em]">
            Onvision Digital
          </span>
        </div>
        {!compact ? (
          <div className="hidden items-center gap-4 text-[11px] text-white/40 sm:flex">
            <span>Servicios</span>
            <span>Empresas</span>
            <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-medium text-black">
              Activar
            </span>
          </div>
        ) : (
          <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-medium text-black">
            Activar
          </span>
        )}
      </div>

      <div className={compact ? "space-y-3 px-4 py-4" : "space-y-5 px-5 py-6 sm:px-8"}>
        <div className={on("landing")}>
          <p className="text-[10px] tracking-[0.18em] text-cyan-300/70 uppercase">
            Estudio digital
          </p>
          <h3
            className={`mt-2 max-w-[16ch] leading-[1.1] font-medium tracking-[-0.04em] ${
              compact ? "text-[1.35rem]" : "text-[1.65rem] sm:text-[2rem]"
            }`}
          >
            Construimos lo que tu empresa necesita
            <span className="ov-desk-caret" aria-hidden />
          </h3>
          <p className="mt-3 max-w-md text-[13px] leading-relaxed text-white/55">
            Sitios, software y un sistema listo para operar en Costa Rica.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-white px-3 py-1.5 text-[11px] font-medium text-black">
              Ver proyectos
            </span>
            <span className="rounded-full border border-white/15 px-3 py-1.5 text-[11px] text-white/70">
              Hablar con nosotros
            </span>
          </div>
        </div>

        <div className={`${on("software")} rounded-xl border border-white/8 bg-white/[0.03] p-4`}>
          <p className="text-[11px] font-medium text-cyan-200/80">
            Software a medida
          </p>
          <p className="mt-1 text-[12px] leading-relaxed text-white/50">
            Apps y paneles con tu flujo: reservas, inventario, clientes y
            pagos.
          </p>
        </div>

        <div className={`grid gap-3 ${compact ? "grid-cols-1" : "sm:grid-cols-2"}`}>
          <div className={`${on("webs")} rounded-xl border border-white/8 bg-white/[0.03] p-4`}>
            <p className="text-[11px] font-medium text-cyan-200/80">
              Páginas web
            </p>
            <p className="mt-1 text-[12px] leading-relaxed text-white/50">
              Landing, corporativo o tienda. Diseño a tu marca y listo para
              publicar.
            </p>
          </div>
          <div className={`${on("sistema")} rounded-xl border border-white/8 bg-white/[0.03] p-4`}>
            <p className="text-[11px] font-medium text-cyan-200/80">
              Sistema para tu empresa
            </p>
            <p className="mt-1 text-[12px] leading-relaxed text-white/50">
              Onvision: facturación 4.4, SINPE e industria en un solo lugar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TaskList({
  active,
  onPick,
}: {
  active: DesktopStepId;
  onPick: (id: DesktopStepId) => void;
}) {
  return (
    <ul className="space-y-1">
      {desktopSteps.map((step) => {
        const isOn = active === step.id;
        return (
          <li key={step.id}>
            <button
              type="button"
              onMouseEnter={() => onPick(step.id)}
              onFocus={() => onPick(step.id)}
              onClick={() => onPick(step.id)}
              className={`ov-desk-task flex w-full gap-2.5 rounded-lg px-2 py-2.5 text-left ${
                isOn ? "is-on" : ""
              }`}
            >
              <span
                className={`mt-1 h-2 w-2 shrink-0 rounded-full ${
                  isOn ? "ov-desk-dot bg-cyan-300" : "border border-white/25"
                }`}
              />
              <span className="min-w-0">
                <span className="flex items-center justify-between gap-2">
                  <span className="text-[13px] font-medium text-white/90">
                    {step.title}
                  </span>
                  {isOn ? (
                    <span className="text-[10px] text-cyan-300/80">now</span>
                  ) : null}
                </span>
                <span className="mt-0.5 block text-[11px] leading-snug text-white/40">
                  {step.detail}
                </span>
                {isOn && step.file ? (
                  <span className="mt-2 inline-flex rounded-md border border-white/10 px-2 py-1 font-mono text-[10px] text-white/45">
                    {step.file}
                  </span>
                ) : null}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default function OnvisionDesktop() {
  const [active, setActive] = useState<DesktopStepId>("landing");
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState<Set<DesktopStepId>>(
    () => new Set(["landing"]),
  );

  useEffect(() => {
    const revealed = new Set<DesktopStepId>();
    const index = STEP_IDS.indexOf(active);
    STEP_IDS.forEach((id, i) => {
      if (i <= index) revealed.add(id);
    });
    setVisible(revealed);
  }, [active]);

  useEffect(() => {
    if (hovering) return;
    const timer = window.setInterval(() => {
      setActive((current) => {
        const i = STEP_IDS.indexOf(current);
        return STEP_IDS[(i + 1) % STEP_IDS.length]!;
      });
    }, 2600);
    return () => window.clearInterval(timer);
  }, [hovering]);

  const pick = (id: DesktopStepId) => {
    setHovering(true);
    setActive(id);
  };

  return (
    <div onMouseLeave={() => setHovering(false)}>
      <div className="lg:hidden">
        <p className="mb-2 px-1 text-[10px] font-medium tracking-[0.16em] text-white/35 uppercase">
          Ready for review {desktopSteps.length}
        </p>
        <TaskList active={active} onPick={pick} />
        <div className="ov-phone mt-4">
          <div className="ov-phone-island" aria-hidden />
          <div className="ov-phone-screen">
            <PreviewSite active={active} visible={visible} compact />
            <div className="ov-phone-home" aria-hidden />
          </div>
        </div>
      </div>

      <div className="ov-desk hidden overflow-hidden rounded-2xl lg:block">
        <div className="flex items-center justify-between border-b border-white/8 px-4 py-2.5">
          <div className="flex w-24 items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>
          <p className="text-[13px] font-medium tracking-[-0.02em] text-white/90">
            Onvision
          </p>
          <span className="w-24 text-right text-[11px] text-white/35">
            Get Onvision
          </span>
        </div>

        <div className="grid min-h-[520px] lg:grid-cols-[minmax(240px,300px)_1fr]">
          <aside className="border-r border-white/8 px-3 py-4">
            <p className="px-2 text-[10px] font-medium tracking-[0.16em] text-white/35 uppercase">
              Ready for review {desktopSteps.length}
            </p>
            <div className="mt-3">
              <TaskList active={active} onPick={pick} />
            </div>
          </aside>

          <div className="flex min-h-[420px] flex-col">
            <div className="flex items-center gap-2 border-b border-white/8 px-3 py-2">
              <span className="text-white/25">←</span>
              <span className="text-white/25">→</span>
              <div className="flex-1 rounded-md bg-white/5 px-3 py-1 text-center font-mono text-[11px] text-white/40">
                http://localhost:3000
              </div>
            </div>
            <div className="min-h-0 flex-1">
              <PreviewSite active={active} visible={visible} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
