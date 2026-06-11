"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type SVGProps,
} from "react";
import { useLanguage } from "@/lib/i18n/language-provider";

type LayerId = "ui" | "pay" | "admin" | "data";

type Layer = {
  id: LayerId;
  label: string;
  code: string;
  detail: string;
  metric: string;
  svgLabel: string;
};

type DrawPathProps = SVGProps<SVGPathElement> & {
  active: boolean;
  delay?: number;
  reducedMotion: boolean;
  resetKey: string;
};

function DrawPath({
  active,
  delay = 0,
  reducedMotion,
  resetKey,
  ...props
}: DrawPathProps) {
  const ref = useRef<SVGPathElement>(null);
  const [length, setLength] = useState(0);

  useEffect(() => {
    const path = ref.current;
    if (!path) return;
    const len = path.getTotalLength();
    const t = requestAnimationFrame(() => setLength(len));
    return () => cancelAnimationFrame(t);
  }, [props.d, resetKey]);

  const duration = reducedMotion ? 0 : 0.85;

  return (
    <path
      ref={ref}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={length || 1000}
      strokeDashoffset={active ? 0 : length || 1000}
      style={{
        transition:
          length > 0
            ? `stroke-dashoffset ${duration}s cubic-bezier(0.22,1,0.36,1) ${delay}ms, opacity 0.4s ease`
            : undefined,
      }}
      {...props}
    />
  );
}

type DrawRectProps = SVGProps<SVGRectElement> & {
  active: boolean;
  delay?: number;
  reducedMotion: boolean;
  resetKey: string;
};

function DrawRect({
  active,
  delay = 0,
  reducedMotion,
  resetKey,
  ...props
}: DrawRectProps) {
  const ref = useRef<SVGRectElement>(null);
  const [length, setLength] = useState(0);

  useEffect(() => {
    const rect = ref.current;
    if (!rect) return;
    const w = Number(rect.getAttribute("width") ?? 0);
    const h = Number(rect.getAttribute("height") ?? 0);
    const t = requestAnimationFrame(() => setLength((w + h) * 2));
    return () => cancelAnimationFrame(t);
  }, [props.x, props.y, props.width, props.height, resetKey]);

  const duration = reducedMotion ? 0 : 0.85;

  return (
    <rect
      ref={ref}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={length || 1000}
      strokeDashoffset={active ? 0 : length || 1000}
      style={{
        transition:
          length > 0
            ? `stroke-dashoffset ${duration}s cubic-bezier(0.22,1,0.36,1) ${delay}ms, opacity 0.4s ease`
            : undefined,
      }}
      {...props}
    />
  );
}

function BlueprintCanvas({
  layerId,
  reducedMotion,
  svgLabels,
}: {
  layerId: LayerId;
  reducedMotion: boolean;
  svgLabels: Record<LayerId, string>;
}) {
  const stroke = "rgba(165,243,252,0.85)";
  const strokeDim = "rgba(255,255,255,0.18)";
  const strokeMuted = "rgba(255,255,255,0.28)";

  const is = (id: LayerId) => layerId === id;
  const dim = (id: LayerId) => (layerId === id ? 1 : 0.22);

  return (
    <svg
      viewBox="0 0 360 260"
      className="w-full h-auto"
      aria-hidden
    >
      <defs>
        <pattern
          id="blueprint-grid"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 20 0 L 0 0 0 20"
            fill="none"
            stroke="rgba(165,243,252,0.07)"
            strokeWidth="0.5"
          />
        </pattern>
      </defs>

      <rect width="360" height="260" fill="url(#blueprint-grid)" />

      {/* Registro de esquinas */}
      {[
        [28, 24],
        [332, 24],
        [28, 236],
        [332, 236],
      ].map(([x, y], i) => (
        <g key={i} stroke={strokeMuted} strokeWidth="0.75">
          <path d={`M ${x} ${y - 8} V ${y + 8}`} />
          <path d={`M ${x - 8} ${y} H ${x + 8}`} />
        </g>
      ))}

      {/* Marco base — siempre visible */}
      <DrawRect
        resetKey={layerId}
        reducedMotion={reducedMotion}
        active
        x={48}
        y={36}
        width={264}
        height={188}
        rx={6}
        stroke={strokeMuted}
        strokeWidth={1}
        opacity={1}
      />
      <DrawRect
        resetKey={layerId}
        reducedMotion={reducedMotion}
        active
        x={48}
        y={36}
        width={264}
        height={32}
        rx={6}
        stroke={strokeMuted}
        strokeWidth={1}
        opacity={0.9}
      />
      <DrawRect
        resetKey={layerId}
        reducedMotion={reducedMotion}
        active
        delay={80}
        x={60}
        y={46}
        width={36}
        height={12}
        rx={2}
        stroke={strokeDim}
        strokeWidth={1}
      />
      <path
        d="M 250 42 H 296 M 250 50 H 280 M 250 58 H 288"
        stroke={strokeDim}
        strokeWidth={1}
        fill="none"
        strokeLinecap="round"
      />

      {/* LYR-01 Interfaz */}
      <g opacity={dim("ui")}>
        <DrawRect
          resetKey={layerId}
          reducedMotion={reducedMotion}
          active={is("ui")}
          delay={0}
          x={60}
          y={82}
          width={140}
          height={10}
          rx={2}
          stroke={stroke}
          strokeWidth={1.25}
        />
        <DrawRect
          resetKey={layerId}
          reducedMotion={reducedMotion}
          active={is("ui")}
          delay={120}
          x={60}
          y={100}
          width={110}
          height={8}
          rx={2}
          stroke={stroke}
          strokeWidth={1}
          opacity={0.7}
        />
        <DrawRect
          resetKey={layerId}
          reducedMotion={reducedMotion}
          active={is("ui")}
          delay={200}
          x={60}
          y={114}
          width={96}
          height={8}
          rx={2}
          stroke={stroke}
          strokeWidth={1}
          opacity={0.5}
        />
        <DrawRect
          resetKey={layerId}
          reducedMotion={reducedMotion}
          active={is("ui")}
          delay={280}
          x={60}
          y={136}
          width={72}
          height={22}
          rx={11}
          stroke={stroke}
          strokeWidth={1.25}
        />
        <DrawRect
          resetKey={layerId}
          reducedMotion={reducedMotion}
          active={is("ui")}
          delay={360}
          x={142}
          y={136}
          width={56}
          height={22}
          rx={11}
          stroke={stroke}
          strokeWidth={1}
          opacity={0.65}
        />
        <DrawRect
          resetKey={layerId}
          reducedMotion={reducedMotion}
          active={is("ui")}
          delay={440}
          x={210}
          y={78}
          width={86}
          height={108}
          rx={4}
          stroke={stroke}
          strokeWidth={1.25}
        />
        <path
          d="M 222 90 L 284 130 M 284 90 L 222 130"
          stroke={stroke}
          strokeWidth={0.75}
          opacity={is("ui") ? 0.35 : 0}
          style={{ transition: "opacity 0.5s ease 500ms" }}
        />
        <text
          x="60"
          y="178"
          fill="rgba(165,243,252,0.45)"
          fontSize="8"
          fontFamily="var(--font-geist-mono, monospace)"
          opacity={is("ui") ? 1 : 0}
          style={{ transition: "opacity 0.35s ease" }}
        >
          {svgLabels.ui}
        </text>
      </g>

      {/* LYR-02 Pagos */}
      <g opacity={dim("pay")}>
        {[
          [60, 82],
          [148, 82],
          [60, 138],
          [148, 138],
        ].map(([x, y], i) => (
          <DrawRect
            key={i}
            resetKey={layerId}
            reducedMotion={reducedMotion}
            active={is("pay")}
            delay={i * 100}
            x={x}
            y={y}
            width={76}
            height={48}
            rx={4}
            stroke={stroke}
            strokeWidth={1.15}
          />
        ))}
        <DrawPath
          resetKey={layerId}
          reducedMotion={reducedMotion}
          active={is("pay")}
          delay={450}
          d="M 236 82 H 296 V 186 H 236 Z"
          stroke={stroke}
          strokeWidth={1.25}
        />
        <DrawRect
          resetKey={layerId}
          reducedMotion={reducedMotion}
          active={is("pay")}
          delay={520}
          x={248}
          y={94}
          width={36}
          height="8"
          rx={2}
          stroke={stroke}
          strokeWidth={1}
          opacity={0.7}
        />
        <DrawRect
          resetKey={layerId}
          reducedMotion={reducedMotion}
          active={is("pay")}
          delay={580}
          x={248}
          y={110}
          width={28}
          height="8"
          rx={2}
          stroke={stroke}
          strokeWidth={1}
          opacity={0.5}
        />
        <DrawRect
          resetKey={layerId}
          reducedMotion={reducedMotion}
          active={is("pay")}
          delay={640}
          x={248}
          y={156}
          width={40}
          height={18}
          rx={9}
          stroke={stroke}
          strokeWidth={1.25}
        />
        <circle
          cx="278"
          cy="58"
          r="14"
          fill="none"
          stroke={stroke}
          strokeWidth={1}
          opacity={is("pay") ? 0.9 : 0}
          style={{ transition: "opacity 0.4s ease 700ms" }}
        />
        <text
          x="274"
          y="61"
          fill="rgba(165,243,252,0.7)"
          fontSize="9"
          fontFamily="var(--font-geist-mono, monospace)"
          opacity={is("pay") ? 1 : 0}
          style={{ transition: "opacity 0.4s ease 750ms" }}
        >
          2
        </text>
        <text
          x="60"
          y="200"
          fill="rgba(165,243,252,0.45)"
          fontSize="8"
          fontFamily="var(--font-geist-mono, monospace)"
          opacity={is("pay") ? 1 : 0}
          style={{ transition: "opacity 0.35s ease" }}
        >
          {svgLabels.pay}
        </text>
      </g>

      {/* LYR-03 Panel */}
      <g opacity={dim("admin")}>
        <DrawRect
          resetKey={layerId}
          reducedMotion={reducedMotion}
          active={is("admin")}
          delay={0}
          x={48}
          y={68}
          width={52}
          height={156}
          stroke={stroke}
          strokeWidth={1.25}
        />
        {[0, 1, 2, 3, 4].map((i) => (
          <DrawRect
            key={i}
            resetKey={layerId}
            reducedMotion={reducedMotion}
            active={is("admin")}
            delay={80 + i * 70}
            x={58}
            y={78 + i * 22}
            width={32}
            height={10}
            rx={2}
            stroke={stroke}
            strokeWidth={1}
            opacity={0.55 + i * 0.08}
          />
        ))}
        <DrawRect
          resetKey={layerId}
          reducedMotion={reducedMotion}
          active={is("admin")}
          delay={450}
          x={112}
          y={68}
          width={200}
          height={156}
          stroke={stroke}
          strokeWidth={1.25}
        />
        {[0, 1, 2, 3, 4].map((i) => (
          <DrawPath
            key={i}
            resetKey={layerId}
            reducedMotion={reducedMotion}
            active={is("admin")}
            delay={500 + i * 90}
            d={`M 124 ${86 + i * 24} H 300`}
            stroke={stroke}
            strokeWidth={1}
            opacity={0.45 + (4 - i) * 0.1}
          />
        ))}
        <DrawRect
          resetKey={layerId}
          reducedMotion={reducedMotion}
          active={is("admin")}
          delay={400}
          x={124}
          y={74}
          width={176}
          height={14}
          rx={2}
          stroke={stroke}
          strokeWidth={1.15}
        />
        <text
          x="112"
          y="200"
          fill="rgba(165,243,252,0.45)"
          fontSize="8"
          fontFamily="var(--font-geist-mono, monospace)"
          opacity={is("admin") ? 1 : 0}
          style={{ transition: "opacity 0.35s ease" }}
        >
          {svgLabels.admin}
        </text>
      </g>

      {/* LYR-04 Datos */}
      <g opacity={dim("data")}>
        <DrawPath
          resetKey={layerId}
          reducedMotion={reducedMotion}
          active={is("data")}
          delay={0}
          d="M 120 120 C 120 80, 180 80, 180 120 C 180 160, 120 160, 120 120 Z"
          stroke={stroke}
          strokeWidth={1.25}
        />
        <DrawPath
          resetKey={layerId}
          reducedMotion={reducedMotion}
          active={is("data")}
          delay={120}
          d="M 120 120 H 180"
          stroke={stroke}
          strokeWidth={1}
          opacity={0.6}
        />
        <ellipse
          cx="150"
          cy="120"
          rx="30"
          ry="8"
          fill="none"
          stroke={stroke}
          strokeWidth={1}
          opacity={is("data") ? 0.75 : 0}
          style={{ transition: "opacity 0.4s ease 200ms" }}
        />
        <DrawRect
          resetKey={layerId}
          reducedMotion={reducedMotion}
          active={is("data")}
          delay={280}
          x={220}
          y={88}
          width={56}
          height={28}
          rx={4}
          stroke={stroke}
          strokeWidth={1.15}
        />
        <text
          x="228"
          y="105"
          fill="rgba(165,243,252,0.55)"
          fontSize="7"
          fontFamily="var(--font-geist-mono, monospace)"
          opacity={is("data") ? 1 : 0}
          style={{ transition: "opacity 0.4s ease 400ms" }}
        >
          API
        </text>
        <DrawPath
          resetKey={layerId}
          reducedMotion={reducedMotion}
          active={is("data")}
          delay={360}
          d="M 180 120 C 210 120, 210 102, 220 102"
          stroke={stroke}
          strokeWidth={1.25}
        />
        <DrawPath
          resetKey={layerId}
          reducedMotion={reducedMotion}
          active={is("data")}
          delay={440}
          d="M 150 160 V 188"
          stroke={stroke}
          strokeWidth={1}
        />
        <DrawPath
          resetKey={layerId}
          reducedMotion={reducedMotion}
          active={is("data")}
          delay={500}
          d="M 248 116 V 188 C 248 210, 112 210, 112 188"
          stroke={stroke}
          strokeWidth={1.15}
        />
        {[72, 108, 144, 180, 216].map((x, i) => (
          <DrawPath
            key={x}
            resetKey={layerId}
            reducedMotion={reducedMotion}
            active={is("data")}
            delay={560 + i * 60}
            d={`M ${x} 188 V 200`}
            stroke={stroke}
            strokeWidth={1}
            opacity={0.5}
          />
        ))}
        <text
          x="60"
          y="218"
          fill="rgba(165,243,252,0.45)"
          fontSize="8"
          fontFamily="var(--font-geist-mono, monospace)"
          opacity={is("data") ? 1 : 0}
          style={{ transition: "opacity 0.35s ease" }}
        >
          {svgLabels.data}
        </text>
      </g>

      {/* Cotas */}
      <text
        x="48"
        y="28"
        fill="rgba(255,255,255,0.2)"
        fontSize="7"
        fontFamily="var(--font-geist-mono, monospace)"
      >
        ref: onvision/layout-v1
      </text>
      <text
        x="268"
        y="252"
        fill="rgba(255,255,255,0.2)"
        fontSize="7"
        fontFamily="var(--font-geist-mono, monospace)"
      >
        scale 1:1 · 360×260
      </text>
    </svg>
  );
}

export default function HeroBlueprint() {
  const { copy } = useLanguage();
  const bp = copy.blueprint;

  const layers = useMemo<Layer[]>(
    () => [
      { id: "ui", ...bp.layers.ui },
      { id: "pay", ...bp.layers.pay },
      { id: "admin", ...bp.layers.admin },
      { id: "data", ...bp.layers.data },
    ],
    [bp.layers]
  );

  const svgLabels = useMemo(
    () => ({
      ui: bp.layers.ui.svgLabel,
      pay: bp.layers.pay.svgLabel,
      admin: bp.layers.admin.svgLabel,
      data: bp.layers.data.svgLabel,
    }),
    [bp.layers]
  );

  const reducedMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<LayerId>("ui");
  const [hoverId, setHoverId] = useState<LayerId | null>(null);
  const [userPicked, setUserPicked] = useState(false);

  const highlightId = hoverId ?? activeId;
  const active = layers.find((l) => l.id === highlightId) ?? layers[0];

  const selectLayer = (id: LayerId) => {
    setActiveId(id);
    setUserPicked(true);
  };

  useEffect(() => {
    if (userPicked) return;
    const interval = setInterval(() => {
      setActiveId((prev) => {
        const idx = layers.findIndex((l) => l.id === prev);
        return layers[(idx + 1) % layers.length].id;
      });
    }, 4800);
    return () => clearInterval(interval);
  }, [userPicked]);

  return (
    <div
      className="relative w-full max-w-[440px] ml-auto select-none"
      aria-label={bp.ariaLabel}
    >
      <div className="rounded-2xl border border-white/20 bg-white/[0.07] backdrop-blur-xl shadow-[0_24px_80px_-20px_rgba(8,145,178,0.35)] overflow-hidden">
        <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-white/10">
          <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-white/45">
            {bp.header}
          </span>
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-wider text-accent-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-muted opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-muted" />
            </span>
            {bp.status}
          </span>
        </div>

        <div className="relative px-4 pt-4 pb-3 bg-[#071018]/50">
          <BlueprintCanvas
            layerId={highlightId}
            reducedMotion={reducedMotion}
            svgLabels={svgLabels}
          />

          <div
            key={active.id}
            className="mt-3 px-3 py-2.5 rounded-lg border border-white/10 bg-black/45 backdrop-blur-sm animate-[heroPreviewIn_0.45s_ease-out]"
          >
            <p className="font-mono text-[9px] tracking-[0.18em] uppercase text-accent-muted/80 mb-1">
              {active.code} · {active.metric}
            </p>
            <p className="text-[11px] text-white/80 leading-snug">{active.detail}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 p-3 sm:p-4 border-t border-white/10 bg-black/15">
          {layers.map((layer) => {
            const isOn = layer.id === activeId;
            const isHover = layer.id === hoverId;

            return (
              <button
                key={layer.id}
                type="button"
                onClick={() => selectLayer(layer.id)}
                onMouseEnter={() => setHoverId(layer.id)}
                onMouseLeave={() => setHoverId(null)}
                onFocus={() => setHoverId(layer.id)}
                onBlur={() => setHoverId(null)}
                aria-pressed={isOn}
                className={`rounded-xl border px-3 py-2.5 text-left transition-all duration-300 ${
                  isOn || isHover
                    ? "border-accent/60 bg-accent/15 shadow-[0_0_20px_-4px_rgba(8,145,178,0.5)]"
                    : "border-white/12 bg-white/[0.04] hover:border-white/25 hover:bg-white/[0.07]"
                }`}
              >
                <span
                  className={`block text-[11px] font-medium leading-tight ${
                    isOn || isHover ? "text-white" : "text-white/75"
                  }`}
                >
                  {layer.label}
                </span>
                <span className="mt-1 block font-mono text-[9px] tracking-wider text-white/30">
                  {layer.code}
                  {isOn ? bp.activeLabel : bp.exploreLabel}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between px-4 py-2.5 font-mono text-[9px] tracking-wider text-white/30 border-t border-white/5">
          <span>{bp.footerLeft}</span>
          <span className="text-accent-muted/60">{bp.footerRight}</span>
        </div>
      </div>
    </div>
  );
}

function subscribeReducedMotion(onStoreChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

function useReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );
}
