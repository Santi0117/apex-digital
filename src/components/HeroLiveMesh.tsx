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

type Capability = {
  id: string;
  label: string;
  detail: string;
  metric: string;
};

const capabilities: Capability[] = [
  {
    id: "web",
    label: "Presencia web",
    detail: "Sitios rápidos, SEO y marca sólida",
    metric: "↑ visibilidad",
  },
  {
    id: "shop",
    label: "Tienda online",
    detail: "Catálogo, pagos y panel admin",
    metric: "↑ ventas",
  },
  {
    id: "saas",
    label: "Software a medida",
    detail: "Apps con login, datos y flujos propios",
    metric: "↑ eficiencia",
  },
  {
    id: "care",
    label: "Soporte continuo",
    detail: "Hosting, backups y evolución mensual",
    metric: "↑ estabilidad",
  },
];

type MeshNode = {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  capId: string;
  size: number;
  phase: number;
};

type Pulse = {
  from: MeshNode;
  to: MeshNode;
  t: number;
  capId: string;
};

function buildNodes(w: number, h: number): MeshNode[] {
  const cx = w / 2;
  const cy = h / 2;
  const nodes: MeshNode[] = [];
  const rings = [
    { count: 6, radius: 0.22, cap: "web" },
    { count: 8, radius: 0.34, cap: "shop" },
    { count: 7, radius: 0.44, cap: "saas" },
    { count: 5, radius: 0.52, cap: "care" },
  ];

  rings.forEach(({ count, radius, cap }, ringIdx) => {
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + ringIdx * 0.4;
      const r = Math.min(w, h) * radius;
      const jitter = (Math.sin(i * 2.7 + ringIdx) * 0.04 + 0.02) * Math.min(w, h);
      const x = cx + Math.cos(angle) * (r + jitter);
      const y = cy + Math.sin(angle) * (r + jitter);
      nodes.push({
        x,
        y,
        baseX: x,
        baseY: y,
        capId: cap,
        size: 1.6 + (ringIdx % 2) * 0.8,
        phase: angle,
      });
    }
  });

  return nodes;
}

export default function HeroLiveMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<MeshNode[]>([]);
  const pulsesRef = useRef<Pulse[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999, inside: false });
  const frameRef = useRef<number>(0);
  const timeRef = useRef(0);

  const [activeId, setActiveId] = useState(capabilities[0].id);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();

  const active = capabilities.find((c) => c.id === activeId) ?? capabilities[0];
  const highlightId = hoverId ?? activeId;

  const spawnPulse = useCallback((capId: string) => {
    const nodes = nodesRef.current;
    const hub = { x: nodes[0]?.baseX ?? 0, y: nodes[0]?.baseY ?? 0 } as MeshNode;
    const capNodes = nodes.filter((n) => n.capId === capId);
    if (capNodes.length === 0) return;

    const target = capNodes[Math.floor(Math.random() * capNodes.length)];
    const cx =
      nodes.reduce((s, n) => s + n.baseX, 0) / Math.max(nodes.length, 1);
    const cy =
      nodes.reduce((s, n) => s + n.baseY, 0) / Math.max(nodes.length, 1);

    hub.x = cx;
    hub.y = cy;
    hub.baseX = cx;
    hub.baseY = cy;

    pulsesRef.current.push({ from: { ...hub }, to: target, t: 0, capId });
    if (pulsesRef.current.length > 6) pulsesRef.current.shift();
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = rect.width;
    const h = rect.height;

    if (w < 1 || h < 1) return;

    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      nodesRef.current = buildNodes(w, h);
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    const nodes = nodesRef.current;
    const mouse = mouseRef.current;
    const t = timeRef.current;

    if (!reducedMotion) {
      nodes.forEach((node) => {
        const drift = Math.sin(t * 0.0012 + node.phase) * 2.2;
        const driftY = Math.cos(t * 0.001 + node.phase * 1.3) * 2.2;
        let nx = node.baseX + drift;
        let ny = node.baseY + driftY;

        if (mouse.inside) {
          const dx = nx - mouse.x;
          const dy = ny - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 90 && dist > 0) {
            const force = (90 - dist) / 90;
            nx += (dx / dist) * force * 14;
            ny += (dy / dist) * force * 14;
          }
        }

        node.x = nx;
        node.y = ny;
      });
    } else {
      nodes.forEach((node) => {
        node.x = node.baseX;
        node.y = node.baseY;
      });
    }

    const cx = w / 2;
    const cy = h / 2;

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i];
        const b = nodes[j];
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist > 95) continue;

        const bothActive =
          a.capId === highlightId || b.capId === highlightId;
        const alpha = bothActive
          ? 0.35 + (1 - dist / 95) * 0.35
          : 0.06 + (1 - dist / 95) * 0.12;

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = bothActive
          ? `rgba(${ACCENT_SOFT.r},${ACCENT_SOFT.g},${ACCENT_SOFT.b},${alpha})`
          : `rgba(255,255,255,${alpha})`;
        ctx.lineWidth = bothActive ? 1.2 : 0.6;
        ctx.stroke();
      }
    }

    const hubPulse = reducedMotion ? 0 : Math.sin(t * 0.003) * 0.5 + 0.5;
    const hubR = 18 + hubPulse * 4;
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, hubR * 2.2);
    grad.addColorStop(0, `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},0.45)`);
    grad.addColorStop(0.5, `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},0.12)`);
    grad.addColorStop(1, "rgba(8,145,178,0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, hubR * 2.2, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(cx, cy, 5, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${ACCENT_SOFT.r},${ACCENT_SOFT.g},${ACCENT_SOFT.b},0.95)`;
    ctx.fill();

    nodes.forEach((node) => {
      const isActive = node.capId === highlightId;
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.size + (isActive ? 1.2 : 0), 0, Math.PI * 2);
      ctx.fillStyle = isActive
        ? `rgba(${ACCENT_SOFT.r},${ACCENT_SOFT.g},${ACCENT_SOFT.b},0.9)`
        : "rgba(255,255,255,0.35)";
      ctx.fill();
    });

    if (!reducedMotion) {
      pulsesRef.current = pulsesRef.current.filter((p) => {
        p.t += 0.018;
        if (p.t >= 1) return false;

        const x = p.from.x + (p.to.x - p.from.x) * p.t;
        const y = p.from.y + (p.to.y - p.from.y) * p.t;
        const trail = 0.08;

        ctx.beginPath();
        ctx.moveTo(
          p.from.x + (p.to.x - p.from.x) * Math.max(0, p.t - trail),
          p.from.y + (p.to.y - p.from.y) * Math.max(0, p.t - trail)
        );
        ctx.lineTo(x, y);
        ctx.strokeStyle = `rgba(${ACCENT_SOFT.r},${ACCENT_SOFT.g},${ACCENT_SOFT.b},${0.7 * (1 - p.t)})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${0.85 * (1 - p.t * 0.5)})`;
        ctx.fill();

        return true;
      });
    }
  }, [highlightId, reducedMotion]);

  useEffect(() => {
    spawnPulse(activeId);
    const interval = setInterval(() => spawnPulse(activeId), 2800);
    return () => clearInterval(interval);
  }, [activeId, spawnPulse]);

  useEffect(() => {
    const loop = (now: number) => {
      timeRef.current = now;
      draw();
      frameRef.current = requestAnimationFrame(loop);
    };
    frameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameRef.current);
  }, [draw]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onResize = () => {
      nodesRef.current = [];
      draw();
    };

    const ro = new ResizeObserver(onResize);
    ro.observe(container);
    return () => ro.disconnect();
  }, [draw]);

  const handlePointer = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      inside: true,
    };
  };

  const handleLeave = () => {
    mouseRef.current.inside = false;
  };

  return (
    <div
      className="relative w-full max-w-[440px] ml-auto select-none"
      aria-label="Mapa interactivo de capacidades digitales"
    >
      <div className="rounded-2xl border border-white/20 bg-white/[0.07] backdrop-blur-xl shadow-[0_24px_80px_-20px_rgba(8,145,178,0.35)] overflow-hidden">
        <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-white/10">
          <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-white/45">
            Capacidades · en vivo
          </span>
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-wider text-accent-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-muted opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-muted" />
            </span>
            Activo
          </span>
        </div>

        <div
          ref={containerRef}
          className="relative aspect-[4/3.6] cursor-crosshair"
          onPointerMove={handlePointer}
          onPointerLeave={handleLeave}
        >
          <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="text-center px-6 transition-all duration-500">
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-accent-muted/80 mb-1.5">
                {active.metric}
              </p>
              <p className="text-sm font-medium text-white/95 leading-snug">
                {active.detail}
              </p>
            </div>
          </div>

          <svg
            className="pointer-events-none absolute inset-0 h-full w-full opacity-30"
            aria-hidden
          >
            <defs>
              <pattern
                id="hero-mesh-grid"
                width="28"
                height="28"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 28 0 L 0 0 0 28"
                  fill="none"
                  stroke="rgba(165,243,252,0.15)"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-mesh-grid)" />
          </svg>
        </div>

        <div className="grid grid-cols-2 gap-2 p-3 sm:p-4 border-t border-white/10 bg-black/15">
          {capabilities.map((cap) => {
            const isOn = cap.id === activeId;
            const isHover = cap.id === hoverId;

            return (
              <button
                key={cap.id}
                type="button"
                onClick={() => setActiveId(cap.id)}
                onMouseEnter={() => setHoverId(cap.id)}
                onMouseLeave={() => setHoverId(null)}
                onFocus={() => setHoverId(cap.id)}
                onBlur={() => setHoverId(null)}
                aria-pressed={isOn}
                className={`group rounded-xl border px-3 py-2.5 text-left transition-all duration-300 ${
                  isOn || isHover
                    ? "border-accent/60 bg-accent/15 shadow-[0_0_20px_-4px_rgba(8,145,178,0.5)]"
                    : "border-white/12 bg-white/[0.04] hover:border-white/25 hover:bg-white/[0.07]"
                }`}
              >
                <span
                  className={`block text-[11px] font-medium leading-tight transition-colors ${
                    isOn || isHover ? "text-white" : "text-white/75"
                  }`}
                >
                  {cap.label}
                </span>
                <span className="mt-1 block font-mono text-[9px] tracking-wider text-white/30 group-hover:text-accent-muted/70">
                  {isOn ? "● seleccionado" : "explorar →"}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between px-4 py-2.5 font-mono text-[9px] tracking-wider text-white/30 border-t border-white/5">
          <span>LAT 9.93° N · LON 84.08° W</span>
          <span className="text-accent-muted/60">Costa Rica → LATAM</span>
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
