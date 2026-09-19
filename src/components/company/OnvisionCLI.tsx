"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  cliWelcomeReply,
  replyForPrompt,
  stepLabel,
  type CliReply,
  type CliStep,
} from "@/lib/company";

type VisibleTurn = {
  id: number;
  prompt?: string;
  steps: CliStep[];
  ask?: string;
  done: boolean;
};

let turnSeq = 0;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function OnvisionCLI() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const runIdRef = useRef(0);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [started, setStarted] = useState(false);
  const [turns, setTurns] = useState<VisibleTurn[]>([]);
  const [busy, setBusy] = useState(false);
  const [draft, setDraft] = useState("");

  const historyRef = useRef<{ role: "user" | "assistant"; content: string }[]>(
    [],
  );

  const scrollToEnd = () => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  };

  const playReply = async (id: number, reply: CliReply, runId: number) => {
    for (const step of reply.steps) {
      if (runIdRef.current !== runId) return;
      const delay =
        step.kind === "think"
          ? 700
          : step.kind === "text"
            ? 720
            : 380;
      await sleep(delay);
      if (runIdRef.current !== runId) return;
      setTurns((prev) =>
        prev.map((turn) =>
          turn.id === id ? { ...turn, steps: [...turn.steps, step] } : turn,
        ),
      );
    }
    await sleep(320);
    if (runIdRef.current !== runId) return;
    setTurns((prev) =>
      prev.map((turn) =>
        turn.id === id ? { ...turn, ask: reply.ask, done: true } : turn,
      ),
    );
    setBusy(false);
    window.setTimeout(() => inputRef.current?.focus(), 80);
  };

  const startTurn = async (prompt: string | undefined, reply: CliReply) => {
    const runId = ++runIdRef.current;
    const id = ++turnSeq;
    setBusy(true);
    setTurns((prev) => [
      ...prev,
      { id, prompt, steps: [], done: false },
    ]);
    await playReply(id, reply, runId);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) {
      runIdRef.current += 1;
      setStarted(false);
      setTurns([]);
      setBusy(false);
      setDraft("");
      historyRef.current = [];
      return;
    }
    if (started) return;
    setStarted(true);
    void startTurn(undefined, cliWelcomeReply);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, started]);

  useEffect(() => {
    scrollToEnd();
  }, [turns, busy, open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const askAi = async (prompt: string) => {
    const runId = ++runIdRef.current;
    const id = ++turnSeq;
    setBusy(true);
    setTurns((prev) => [
      ...prev,
      { id, prompt, steps: [{ kind: "think", text: "consultando Onvi…" }], done: false },
    ]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: prompt,
          history: historyRef.current.slice(-10),
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        reply?: string;
        error?: string;
      };
      if (runIdRef.current !== runId) return;

      const replyText =
        data.reply?.trim() ||
        data.error ||
        "No pude responder ahora. Probá de nuevo o agendá en /digital#agendar.";

      historyRef.current = [
        ...historyRef.current,
        { role: "user" as const, content: prompt },
        { role: "assistant" as const, content: replyText },
      ].slice(-20);

      setTurns((prev) =>
        prev.map((turn) =>
          turn.id === id
            ? {
                ...turn,
                steps: [{ kind: "text", text: replyText }],
                ask: "¿Algo más en lo que te ayude?",
                done: true,
              }
            : turn,
        ),
      );
    } catch {
      if (runIdRef.current !== runId) return;
      const fallback = replyForPrompt(prompt);
      const text = fallback.steps
        .filter((s) => s.kind === "text" || s.kind === "code")
        .map((s) => s.text)
        .join("\n\n");
      setTurns((prev) =>
        prev.map((turn) =>
          turn.id === id
            ? {
                ...turn,
                steps: [
                  {
                    kind: "text",
                    text:
                      text ||
                      "No pude conectar con Onvi. Probá de nuevo en un momento.",
                  },
                ],
                ask: fallback.ask,
                done: true,
              }
            : turn,
        ),
      );
    }

    setBusy(false);
    window.setTimeout(() => inputRef.current?.focus(), 80);
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (busy) return;
    const prompt = draft.trim();
    if (!prompt) return;
    setDraft("");
    void askAi(prompt);
  };

  const suggestions = useMemo(
    () => ["Ver planes y mensualidad", "Contame del SaaS", "Quiero una tienda"],
    [],
  );

  const windowNode = (
    <div className="cli-window flex max-h-[min(86svh,720px)] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c0c] shadow-[0_40px_120px_-40px_rgba(0,0,0,0.85)]">
      <div className="flex items-center justify-between border-b border-white/8 px-4 py-3">
        <div className="flex w-16 items-center gap-1.5">
          <button
            type="button"
            aria-label="Cerrar"
            onClick={() => setOpen(false)}
            className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]"
          />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <p className="text-[13px] font-medium tracking-[-0.01em] text-white/90">
          Onvision IA
        </p>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded-md px-2 py-1 text-[12px] text-white/45 transition hover:text-white"
        >
          Cerrar
        </button>
      </div>

      <div
        ref={scrollerRef}
        className="min-h-0 flex-1 overflow-y-auto px-5 py-6 font-mono text-[13.5px] leading-relaxed text-white/90 md:px-8 md:text-[14.5px]"
      >
        {turns.map((turn) => (
          <article key={turn.id} className="mb-8 last:mb-0">
            {turn.prompt ? (
              <div className="rounded-md border border-white/20 px-4 py-3 text-white/85">
                {turn.prompt}
              </div>
            ) : null}
            <ul className={turn.prompt ? "mt-5 space-y-2.5" : "space-y-2.5"}>
              {turn.steps.map((step, index) => (
                <li key={`${turn.id}-${index}`} className="ov-fade-slide">
                  {step.kind === "text" ? (
                    <p
                      className={`whitespace-pre-wrap text-white/88 ${
                        turn.prompt || index > 0 ? "mt-4" : ""
                      }`}
                    >
                      {step.text}
                    </p>
                  ) : step.kind === "code" ? (
                    <pre className="mt-4 overflow-x-auto rounded-md border border-white/20 px-4 py-3 font-mono text-[13px] text-white/80">
                      {step.text}
                    </pre>
                  ) : (
                    <p className="flex items-start gap-2.5 text-white/70">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white" />
                      <span>
                        {stepLabel(step.kind)
                          ? `${stepLabel(step.kind)} ${step.text}`
                          : step.text}
                      </span>
                    </p>
                  )}
                </li>
              ))}
            </ul>
            {busy && turn.id === turns[turns.length - 1]?.id && !turn.done ? (
              <p className="mt-4 flex items-center gap-2 text-white/40">
                <span className="cli-spinner" aria-hidden />
                {turn.prompt ? "Trabajando…" : "Onvi…"}
              </p>
            ) : null}
            {turn.ask ? <p className="mt-5 text-white/88">{turn.ask}</p> : null}
          </article>
        ))}

        <form onSubmit={onSubmit} className="mt-6">
          <label className="flex items-center gap-3 rounded-md border border-white px-4 py-3">
            <span className="text-white/70">→</span>
            <input
              ref={inputRef}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              disabled={busy}
              placeholder="Contame en qué te ayudo…"
              className="w-full bg-transparent text-[14px] text-white outline-none placeholder:text-white/35 disabled:opacity-50"
            />
          </label>
        </form>

        {!busy ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {suggestions.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setDraft("");
                  void askAi(item);
                }}
                className="rounded-full border border-white/15 px-3 py-1 text-[12px] text-white/55 transition hover:border-white/35 hover:text-white"
              >
                {item}
              </button>
            ))}
          </div>
        ) : null}

        <div className="mt-6 flex items-center justify-between text-[12px] text-white/35">
          <p>Onvision 1.0</p>
          <p>/ para atajos · @ para archivos</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed right-4 bottom-4 z-[80] inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#111] px-4 py-2.5 text-[13px] font-medium text-white shadow-lg shadow-black/40 transition hover:border-white/30 hover:bg-[#181818] md:right-6 md:bottom-6"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
        Onvision IA
      </button>

      {mounted && open
        ? createPortal(
            <div className="fixed inset-0 z-[90] flex items-end justify-center p-3 sm:items-center sm:p-6">
              <button
                type="button"
                aria-label="Cerrar Onvision IA"
                className="absolute inset-0 bg-black/65 backdrop-blur-[2px]"
                onClick={() => setOpen(false)}
              />
              <div className="relative z-10 w-full max-w-3xl ov-fade-slide">
                {windowNode}
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
