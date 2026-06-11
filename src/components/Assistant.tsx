"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import SectionHeader from "./SectionHeader";
import ScrollReveal from "./ScrollReveal";
import { site } from "@/lib/site";
import { useLanguage } from "@/lib/i18n/language-provider";
import type { SiteCopy } from "@/lib/i18n/translations";
import type { Locale } from "@/lib/i18n/translations";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function AssistantChat({
  locale,
  copy,
}: {
  locale: Locale;
  copy: SiteCopy["assistant"];
}) {
  const [messages, setMessages] = useState<Message[]>([
    { id: "welcome", role: "assistant", content: copy.welcome },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading, scrollToBottom]);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    setError(null);
    setInput("");

    const userMessage: Message = {
      id: createId(),
      role: "user",
      content: trimmed,
    };

    const historyForApi = [...messages, userMessage]
      .filter((m) => m.id !== "welcome")
      .map((m) => ({ role: m.role, content: m.content }));

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, history: historyForApi, locale }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? copy.errorSend);
      }

      setMessages((prev) => [
        ...prev,
        {
          id: createId(),
          role: "assistant",
          content: data.reply,
        },
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : copy.errorGeneric);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden shadow-sm hover:shadow-md hover:shadow-neutral-200/80 dark:hover:shadow-black/30 transition-shadow duration-300">
      <div className="flex items-center gap-3 px-5 py-4 border-b border-neutral-100 dark:border-neutral-800 bg-accent-soft/50 dark:bg-cyan-950/30">
        <div className="flex items-center justify-center w-9 h-9 rounded-full bg-accent text-white text-sm shadow-sm">
          ◎
        </div>
        <div>
          <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{copy.virtualAssistant}</p>
          <p className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            {copy.onlineNow}
          </p>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="p-5 md:p-6 space-y-4 max-h-[360px] overflow-y-auto"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "rounded-tr-sm bg-accent text-white"
                  : "rounded-tl-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300"
              }`}
            >
              <p className="whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="rounded-2xl rounded-tl-sm bg-neutral-100 dark:bg-neutral-800 px-4 py-3 flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-accent/60 animate-bounce [animation-delay:0ms]" />
              <span className="w-1.5 h-1.5 rounded-full bg-accent/60 animate-bounce [animation-delay:150ms]" />
              <span className="w-1.5 h-1.5 rounded-full bg-accent/60 animate-bounce [animation-delay:300ms]" />
            </div>
          </div>
        )}

        {error && <p className="text-xs text-red-500 text-center">{error}</p>}
      </div>

      <div className="px-5 pb-4">
        <div className="flex flex-wrap gap-2">
          {copy.quickReplies.map((reply) => (
            <button
              key={reply}
              type="button"
              disabled={loading}
              onClick={() => sendMessage(reply)}
              className="appearance-none text-xs md:text-sm px-4 py-2 rounded-full border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:border-accent hover:bg-accent-soft dark:hover:bg-cyan-950/40 hover:text-accent-hover disabled:opacity-50 transition-all duration-200"
            >
              {reply}
            </button>
          ))}
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 px-4 py-4 border-t border-neutral-100 dark:border-neutral-800"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={copy.placeholder}
          disabled={loading}
          maxLength={500}
          className="flex-1 text-sm px-4 py-2.5 rounded-full border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/80 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 disabled:opacity-50 transition-all duration-200"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="appearance-none flex items-center justify-center w-10 h-10 rounded-xl bg-accent text-white hover:bg-accent-hover disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 active:scale-95"
          aria-label={copy.send}
        >
          →
        </button>
      </form>
    </div>
  );
}

export default function Assistant() {
  const { locale, copy } = useLanguage();
  const a = copy.assistant;

  return (
    <section id="contacto" className="px-6 md:px-12 py-16 md:py-24">
      <div className="max-w-2xl mx-auto">
        <ScrollReveal>
          <SectionHeader label={a.label} title={a.title} description={a.description} />
        </ScrollReveal>

        <ScrollReveal delay={120}>
          <AssistantChat key={locale} locale={locale} copy={a} />
        </ScrollReveal>

        <ScrollReveal delay={200} className="flex justify-center mt-10">
          <a
            href={`mailto:${site.email}`}
            className="text-sm text-neutral-400 dark:text-neutral-500 hover:text-accent transition-colors duration-200"
          >
            {a.emailDirect} {site.email}
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
