"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

type Phase = {
  id: string;
  label: string;
  detail: string;
  steps: { kind: "cmd" | "ok" | "info"; text: string }[];
  preview: "web" | "shop" | "saas" | "care";
};

const phases: Phase[] = [
  {
    id: "web",
    label: "Presencia web",
    detail: "Sitio rápido, SEO y marca sólida",
    steps: [
      { kind: "cmd", text: "npx create-next-app@latest sitio --ts" },
      { kind: "ok", text: "layout · tipografía · meta tags" },
      { kind: "cmd", text: "npm run build && vercel deploy --prod" },
      { kind: "ok", text: "live → onvisiondigital.com" },
    ],
    preview: "web",
  },
  {
    id: "shop",
    label: "Tienda online",
    detail: "Catálogo, pagos y panel admin",
    steps: [
      { kind: "cmd", text: "npm install @stripe/stripe-js stripe" },
      { kind: "ok", text: "checkout · carrito · webhooks" },
      { kind: "cmd", text: "npm run db:push && npm run seed" },
      { kind: "ok", text: "catálogo · inventario · órdenes" },
    ],
    preview: "shop",
  },
  {
    id: "saas",
    label: "Software a medida",
    detail: "Login, roles y flujos propios",
    steps: [
      { kind: "cmd", text: "npm run auth:setup --providers=email,oauth" },
      { kind: "ok", text: "roles · sesiones · middleware" },
      { kind: "cmd", text: "npm run api:generate --rest" },
      { kind: "ok", text: "endpoints · validación · logs" },
    ],
    preview: "saas",
  },
  {
    id: "care",
    label: "Soporte continuo",
    detail: "Hosting, backups y evolución",
    steps: [
      { kind: "cmd", text: "onvision monitor --uptime --backups" },
      { kind: "ok", text: "alertas · snapshots diarios" },
      { kind: "cmd", text: "npm run analytics:enable" },
      { kind: "ok", text: "métricas · rendimiento · SEO" },
    ],
    preview: "care",
  },
];

type Line = { kind: "cmd" | "ok" | "info"; text: string; done: boolean };

function PreviewWeb() {
  return (
    <div className="space-y-2.5 animate-[heroPreviewIn_0.5s_ease-out]">
      <div className="h-2 w-16 rounded-full bg-accent/50" />
      <div className="h-3 w-3/4 rounded bg-white/20" />
      <div className="h-2 w-full rounded bg-white/10" />
      <div className="h-2 w-5/6 rounded bg-white/10" />
      <div className="mt-3 flex gap-2">
        <div className="h-7 w-20 rounded-full bg-accent/30 border border-accent/40" />
        <div className="h-7 w-16 rounded-full border border-white/15" />
      </div>
    </div>
  );
}

function PreviewShop() {
  return (
    <div className="grid grid-cols-2 gap-2 animate-[heroPreviewIn_0.5s_ease-out]">
      {[1, 2].map((i) => (
        <div
          key={i}
          className="rounded-lg border border-white/10 bg-white/[0.04] p-2.5"
        >
          <div className="mb-2 aspect-[4/3] rounded bg-gradient-to-br from-accent/20 to-white/5" />
          <div className="h-2 w-2/3 rounded bg-white/15 mb-1.5" />
          <div className="flex items-center justify-between">
            <div className="h-2 w-10 rounded bg-accent-muted/40" />
            <div className="h-5 w-5 rounded-full border border-accent/50 flex items-center justify-center text-[8px] text-accent-muted">
              +
            </div>
          </div>
        </div>
      ))}
      <div className="col-span-2 flex items-center justify-between rounded-lg border border-accent/30 bg-accent/10 px-3 py-2">
        <span className="font-mono text-[9px] text-white/50">carrito</span>
        <span className="font-mono text-[10px] text-accent-muted">2 items · $48</span>
      </div>
    </div>
  );
}

function PreviewSaas() {
  return (
    <div className="mx-auto w-[85%] space-y-3 animate-[heroPreviewIn_0.5s_ease-out]">
      <div className="text-center">
        <div className="mx-auto mb-2 h-8 w-8 rounded-lg bg-accent/25 border border-accent/40" />
        <div className="mx-auto h-2 w-24 rounded bg-white/15" />
      </div>
      <div className="space-y-2 rounded-lg border border-white/10 bg-black/20 p-3">
        <div className="h-7 rounded border border-white/10 bg-white/[0.03] px-2 flex items-center">
          <span className="font-mono text-[9px] text-white/30">email@empresa.com</span>
        </div>
        <div className="h-7 rounded border border-white/10 bg-white/[0.03] px-2 flex items-center">
          <span className="font-mono text-[9px] text-white/20">••••••••</span>
        </div>
        <div className="h-7 rounded bg-accent/25 border border-accent/40 flex items-center justify-center">
          <span className="text-[9px] font-medium text-white/80">Ingresar</span>
        </div>
      </div>
    </div>
  );
}

function PreviewCare() {
  const bars = [72, 94, 88, 96];
  return (
    <div className="space-y-3 animate-[heroPreviewIn_0.5s_ease-out]">
      <div className="flex items-center justify-between font-mono text-[9px] text-white/40">
        <span>uptime 30d</span>
        <span className="text-accent-muted">99.8%</span>
      </div>
      <div className="flex items-end gap-1.5 h-14">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t bg-accent/30 border border-accent/20 origin-bottom animate-[heroBarGrow_0.6s_ease-out_both]"
            style={{
              height: `${h}%`,
              animationDelay: `${i * 80}ms`,
            }}
          />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2 font-mono text-[9px]">
        <div className="rounded border border-white/10 px-2 py-1.5 text-white/45">
          backup <span className="text-accent-muted">ok</span>
        </div>
        <div className="rounded border border-white/10 px-2 py-1.5 text-white/45">
          ssl <span className="text-accent-muted">ok</span>
        </div>
      </div>
    </div>
  );
}

const previews: Record<Phase["preview"], () => ReactNode> = {
  web: PreviewWeb,
  shop: PreviewShop,
  saas: PreviewSaas,
  care: PreviewCare,
};

export default function HeroBuildTerminal() {
  const reducedMotion = useReducedMotion();
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [lines, setLines] = useState<Line[]>([]);
  const [typing, setTyping] = useState("");
  const [stepIndex, setStepIndex] = useState(0);
  const [userPicked, setUserPicked] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const charRef = useRef(0);
  const runIdRef = useRef(0);

  const phase = phases[phaseIndex];
  const Preview = previews[phase.preview];
  const phaseDone = stepIndex >= phase.steps.length;

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const goToPhase = useCallback(
    (index: number, fromUser: boolean) => {
      clearTimer();
      runIdRef.current += 1;
      setPhaseIndex(index);
      setLines([]);
      setTyping("");
      setStepIndex(0);
      setUserPicked(fromUser);
      charRef.current = 0;
    },
    [clearTimer]
  );

  const selectPhase = (index: number) => {
    goToPhase(index, true);
  };

  useEffect(() => {
    if (phaseDone) return;

    const current = phase.steps[stepIndex];
    if (!current) return;

    const runId = runIdRef.current;

    const advanceStep = () => {
      if (runIdRef.current !== runId) return;
      setStepIndex((s) => s + 1);
    };

    const finishCmd = () => {
      if (runIdRef.current !== runId) return;
      setLines((prev) => [...prev, { ...current, done: true }]);
      setTyping("");
      advanceStep();
    };

    if (current.kind === "ok") {
      timerRef.current = setTimeout(() => {
        if (runIdRef.current !== runId) return;
        setLines((prev) => [...prev, { ...current, done: true }]);
        advanceStep();
      }, reducedMotion ? 0 : 320);
      return clearTimer;
    }

    if (reducedMotion) {
      timerRef.current = setTimeout(finishCmd, 0);
      return clearTimer;
    }

    const full = current.text;
    charRef.current = 0;

    const typeChar = () => {
      if (runIdRef.current !== runId) return;
      charRef.current += 1;
      setTyping(full.slice(0, charRef.current));

      if (charRef.current < full.length) {
        timerRef.current = setTimeout(typeChar, 28 + Math.random() * 22);
      } else {
        timerRef.current = setTimeout(finishCmd, 400);
      }
    };

    timerRef.current = setTimeout(typeChar, 280);
    return clearTimer;
  }, [phase, stepIndex, phaseDone, reducedMotion, clearTimer]);

  useEffect(() => {
    if (!phaseDone || userPicked) return;

    timerRef.current = setTimeout(() => {
      setUserPicked(false);
      goToPhase((phaseIndex + 1) % phases.length, false);
    }, 4200);

    return clearTimer;
  }, [phaseDone, userPicked, phaseIndex, goToPhase, clearTimer]);

  return (
    <div
      className="relative w-full max-w-[440px] ml-auto select-none"
      aria-label="Terminal interactiva de construcción de proyectos"
    >
      <div className="rounded-2xl border border-white/20 bg-white/[0.07] backdrop-blur-xl shadow-[0_24px_80px_-20px_rgba(8,145,178,0.35)] overflow-hidden">
        <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-white/10">
          <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-white/45">
            Build · en vivo
          </span>
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-wider text-accent-muted">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-muted opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-muted" />
            </span>
            {phaseDone ? "listo" : "ejecutando"}
          </span>
        </div>

        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-white/5 bg-black/20">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent/40" />
          <span className="ml-2 font-mono text-[9px] text-white/25 truncate">
            ~/onvision/{phase.id}
          </span>
        </div>

        <div className="min-h-[148px] px-4 py-3 font-mono text-[11px] leading-relaxed bg-[#0a0f12]/60">
          {lines.map((line, i) => (
            <div
              key={`${phase.id}-${i}`}
              className={`mb-1.5 ${
                line.kind === "ok"
                  ? "text-accent-muted"
                  : line.kind === "info"
                    ? "text-white/40"
                    : "text-white/75"
              }`}
            >
              {line.kind === "ok" ? (
                <span>✓ {line.text}</span>
              ) : (
                <span>
                  <span className="text-accent/80">$</span> {line.text}
                </span>
              )}
            </div>
          ))}
          {typing && (
            <div className="text-white/75 mb-1.5">
              <span className="text-accent/80">$</span> {typing}
              <span className="inline-block w-[6px] h-[13px] ml-0.5 bg-accent-muted/80 animate-pulse align-middle" />
            </div>
          )}
          {!typing && !phaseDone && lines.length === 0 && (
            <div className="text-white/30">
              <span className="text-accent/80">$</span>{" "}
              <span className="inline-block w-[6px] h-[13px] bg-accent-muted/60 animate-pulse align-middle" />
            </div>
          )}
        </div>

        <div className="border-t border-white/10 bg-white/[0.03] px-4 py-4 min-h-[130px]">
          <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-white/30 mb-3">
            Preview · {phase.detail}
          </p>
          <div key={phase.id}>
            <Preview />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 p-3 sm:p-4 border-t border-white/10 bg-black/15">
          {phases.map((p, i) => {
            const isOn = i === phaseIndex;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => selectPhase(i)}
                aria-pressed={isOn}
                className={`rounded-xl border px-3 py-2.5 text-left transition-all duration-300 ${
                  isOn
                    ? "border-accent/60 bg-accent/15 shadow-[0_0_20px_-4px_rgba(8,145,178,0.5)]"
                    : "border-white/12 bg-white/[0.04] hover:border-white/25 hover:bg-white/[0.07]"
                }`}
              >
                <span
                  className={`block text-[11px] font-medium leading-tight ${
                    isOn ? "text-white" : "text-white/75"
                  }`}
                >
                  {p.label}
                </span>
                <span className="mt-1 block font-mono text-[9px] tracking-wider text-white/30">
                  {isOn ? (phaseDone ? "✓ build ok" : "building…") : "probar →"}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between px-4 py-2.5 font-mono text-[9px] tracking-wider text-white/30 border-t border-white/5">
          <span>Next.js · TypeScript · Vercel</span>
          <span className="text-accent-muted/60">onvision build v1</span>
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
