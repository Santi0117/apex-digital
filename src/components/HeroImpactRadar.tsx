"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

const ACCENT = { r: 8, g: 145, b: 178 };
const ACCENT_SOFT = { r: 165, g: 243, b: 252 };

type Sector = {
  id: string;
  label: string;
  detail: string;
  metric: string;
  value: number;
  unit: string;
};

const sectors: Sector[] = [
  {
    id: "web",
    label: "Presencia web",
    detail: "SEO, velocidad y marca",
    metric: "Visibilidad",
    value: 94,
    unit: "%",
  },
  {
    id: "shop",
    label: "Tienda online",
    detail: "Catálogo, pagos y checkout",
    metric: "Conversión",
    value: 38,
    unit: "%",
  },
  {
    id: "saas",
    label: "Software a medida",
    detail: "Flujos, datos y automatización",
    metric: "Eficiencia",
    value: 67,
    unit: "%",
  },
  {
    id: "care",
    label: "Soporte continuo",
    detail: "Uptime, backups y evolución",
    metric: "Disponibilidad",
    value: 99,
    unit: "%",
  },
];

type Wave = { radius: number; born: number };

function sectorIndexFromAngle(angle: number) {
  const normalized = (angle + Math.PI * 2) % (Math.PI * 2);
  const fromTop = (normalized + Math.PI / 2) % (Math.PI * 2);
  return Math.floor(fromTop / (Math.PI / 2)) % 4;
}

function sectorAngles(index: number) {
  const start = -Math.PI / 2 + index * (Math.PI / 2);
  return { start, end: start + Math.PI / 2 };
}

export default function HeroImpactRadar() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wavesRef = useRef<Wave[]>([]);
  const sweepRef = useRef(-Math.PI / 2);
  const frameRef = useRef(0);
  const lastWaveRef = useRef(0);

  const [activeId, setActiveId] = useState(sectors[0].id);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [displayValue, setDisplayValue] = useState(0);
  const [userPicked, setUserPicked] = useState(false);

  const reducedMotion = useReducedMotion();
  const highlightId = hoverId ?? activeId;
  const active = sectors.find((s) => s.id === highlightId) ?? sectors[0];
  const activeIndex = sectors.findIndex((s) => s.id === highlightId);

  const pickSector = useCallback((id: string, fromUser = true) => {
    setActiveId(id);
    if (fromUser) setUserPicked(true);
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const size = Math.min(rect.width, rect.height);
    if (size < 1) return;

    if (canvas.width !== size * dpr || canvas.height !== size * dpr) {
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, size, size);

    const cx = size / 2;
    const cy = size / 2;
    const maxR = size * 0.42;
    const now = performance.now();

    ctx.save();
    ctx.translate(cx, cy);

    for (let i = 1; i <= 4; i++) {
      const r = (maxR / 4) * i;
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255,255,255,${0.06 + i * 0.02})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    ctx.beginPath();
    ctx.moveTo(-maxR, 0);
    ctx.lineTo(maxR, 0);
    ctx.moveTo(0, -maxR);
    ctx.lineTo(0, maxR);
    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    ctx.lineWidth = 1;
    ctx.stroke();

    sectors.forEach((sector, i) => {
      const isActive = sector.id === highlightId;
      const { start, end } = sectorAngles(i);

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, maxR, start, end);
      ctx.closePath();

      if (isActive) {
        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, maxR);
        grad.addColorStop(0, `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},0.35)`);
        grad.addColorStop(1, `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},0.06)`);
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.strokeStyle = `rgba(${ACCENT_SOFT.r},${ACCENT_SOFT.g},${ACCENT_SOFT.b},0.55)`;
        ctx.lineWidth = 1.5;
      } else {
        ctx.fillStyle = "rgba(255,255,255,0.02)";
        ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,0.06)";
        ctx.lineWidth = 1;
      }
      ctx.stroke();

      const mid = start + Math.PI / 4;
      const lx = Math.cos(mid) * (maxR + 14);
      const ly = Math.sin(mid) * (maxR + 14);
      ctx.font = "500 9px var(--font-geist-sans, system-ui)";
      ctx.fillStyle = isActive
        ? `rgba(${ACCENT_SOFT.r},${ACCENT_SOFT.g},${ACCENT_SOFT.b},0.95)`
        : "rgba(255,255,255,0.35)";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const short = sector.label.split(" ")[0];
      ctx.fillText(short, lx, ly);
    });

    if (!reducedMotion) {
      if (now - lastWaveRef.current > 1400) {
        wavesRef.current.push({ radius: 0, born: now });
        lastWaveRef.current = now;
        if (wavesRef.current.length > 5) wavesRef.current.shift();
      }

      wavesRef.current = wavesRef.current.filter((wave) => {
        const age = now - wave.born;
        const r = (age / 2200) * maxR;
        if (r >= maxR) return false;

        const alpha = 0.45 * (1 - r / maxR);
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${ACCENT_SOFT.r},${ACCENT_SOFT.g},${ACCENT_SOFT.b},${alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        return true;
      });

      sweepRef.current += 0.018;
      const sweep = sweepRef.current;
      const sweepGrad = ctx.createLinearGradient(0, 0, Math.cos(sweep) * maxR, Math.sin(sweep) * maxR);
      sweepGrad.addColorStop(0, `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},0.35)`);
      sweepGrad.addColorStop(1, "rgba(8,145,178,0)");
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(sweep) * maxR, Math.sin(sweep) * maxR);
      ctx.strokeStyle = sweepGrad;
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    const hubPulse = reducedMotion ? 0.5 : Math.sin(now * 0.004) * 0.5 + 0.5;
    const hubR = 6 + hubPulse * 3;
    const hubGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, hubR * 3);
    hubGrad.addColorStop(0, `rgba(${ACCENT_SOFT.r},${ACCENT_SOFT.g},${ACCENT_SOFT.b},0.9)`);
    hubGrad.addColorStop(0.4, `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},0.35)`);
    hubGrad.addColorStop(1, "rgba(8,145,178,0)");
    ctx.fillStyle = hubGrad;
    ctx.beginPath();
    ctx.arc(0, 0, hubR * 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(0, 0, hubR, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${ACCENT_SOFT.r},${ACCENT_SOFT.g},${ACCENT_SOFT.b},0.95)`;
    ctx.fill();

    if (activeIndex >= 0) {
      const { start } = sectorAngles(activeIndex);
      const mid = start + Math.PI / 4;
      const blipR = maxR * (0.55 + Math.sin(now * 0.003) * 0.04);
      const bx = Math.cos(mid) * blipR;
      const by = Math.sin(mid) * blipR;

      ctx.beginPath();
      ctx.arc(bx, by, 4, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${ACCENT_SOFT.r},${ACCENT_SOFT.g},${ACCENT_SOFT.b},0.95)`;
      ctx.shadowColor = `rgba(${ACCENT_SOFT.r},${ACCENT_SOFT.g},${ACCENT_SOFT.b},0.8)`;
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    ctx.restore();
  }, [highlightId, activeIndex, reducedMotion]);

  useEffect(() => {
    const loop = () => {
      draw();
      frameRef.current = requestAnimationFrame(loop);
    };
    frameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameRef.current);
  }, [draw]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const ro = new ResizeObserver(() => draw());
    ro.observe(container);
    return () => ro.disconnect();
  }, [draw]);

  useEffect(() => {
    if (userPicked) return;
    const interval = setInterval(() => {
      setActiveId((prev) => {
        const idx = sectors.findIndex((s) => s.id === prev);
        return sectors[(idx + 1) % sectors.length].id;
      });
    }, 4500);
    return () => clearInterval(interval);
  }, [userPicked]);

  useEffect(() => {
    if (reducedMotion) {
      const t = setTimeout(() => setDisplayValue(active.value), 0);
      return () => clearTimeout(t);
    }

    let raf = 0;
    const from = displayValue;
    const to = active.value;
    const start = performance.now();
    const duration = 700;

    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplayValue(Math.round(from + (to - from) * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- animate toward active.value only
  }, [active.value, active.id, reducedMotion]);

  const handlePointer = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const size = Math.min(rect.width, rect.height);
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const angle = Math.atan2(e.clientY - cy, e.clientX - cx);
    const dist = Math.hypot(e.clientX - cx, e.clientY - cy);
    if (dist > size * 0.08 && dist < size * 0.48) {
      const idx = sectorIndexFromAngle(angle);
      setHoverId(sectors[idx].id);
    } else {
      setHoverId(null);
    }
  };

  const handleClick = () => {
    if (hoverId) pickSector(hoverId, true);
  };

  return (
    <div
      className="relative w-full max-w-[440px] ml-auto select-none"
      aria-label="Radar interactivo de impacto digital"
    >
      <div className="rounded-2xl border border-white/20 bg-white/[0.07] backdrop-blur-xl shadow-[0_24px_80px_-20px_rgba(8,145,178,0.35)] overflow-hidden">
        <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-white/10">
          <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-white/45">
            Radar · impacto
          </span>
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-wider text-accent-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-muted opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-muted" />
            </span>
            Escaneando
          </span>
        </div>

        <div className="relative px-4 pt-4 pb-2">
          <div
            ref={containerRef}
            className="relative mx-auto aspect-square max-w-[280px] cursor-crosshair"
            onPointerMove={handlePointer}
            onPointerLeave={() => setHoverId(null)}
            onClick={handleClick}
            role="img"
            aria-label={`Sector activo: ${active.label}`}
          >
            <canvas ref={canvasRef} className="absolute inset-0 m-auto" />
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/35 mb-1">
                {active.metric}
              </p>
              <p className="text-3xl font-medium tabular-nums text-white tracking-tight">
                {displayValue}
                <span className="text-lg text-accent-muted ml-0.5">{active.unit}</span>
              </p>
              <p className="mt-2 text-[11px] text-white/55 max-w-[140px] leading-snug">
                {active.detail}
              </p>
            </div>
          </div>
          <p className="text-center font-mono text-[9px] text-white/25 mt-2 mb-1">
            Pasá el cursor o tocá un sector
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 p-3 sm:p-4 border-t border-white/10 bg-black/15">
          {sectors.map((sector) => {
            const isOn = sector.id === activeId;
            const isHover = sector.id === hoverId;

            return (
              <button
                key={sector.id}
                type="button"
                onClick={() => pickSector(sector.id, true)}
                onMouseEnter={() => setHoverId(sector.id)}
                onMouseLeave={() => setHoverId(null)}
                onFocus={() => setHoverId(sector.id)}
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
                  {sector.label}
                </span>
                <span className="mt-1 block font-mono text-[9px] tracking-wider text-white/30">
                  {sector.metric} · {sector.value}
                  {sector.unit}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between px-4 py-2.5 font-mono text-[9px] tracking-wider text-white/30 border-t border-white/5">
          <span>Alcance · Costa Rica → LATAM</span>
          <span className="text-accent-muted/60">señal estable</span>
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
