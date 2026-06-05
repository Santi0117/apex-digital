"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import SectionHeader from "./SectionHeader";
import ScrollReveal from "./ScrollReveal";
import { quickReplies, welcomeMessage } from "@/lib/chatbot";
import { site } from "@/lib/site";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export default function Assistant() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "welcome", role: "assistant", content: welcomeMessage },
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
        body: JSON.stringify({ message: trimmed, history: historyForApi }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "No se pudo enviar el mensaje.");
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
      setError(err instanceof Error ? err.message : "Error de conexión.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <section id="contacto" className="px-6 md:px-12 py-16 md:py-24 bg-white">
      <div className="max-w-2xl mx-auto">
        <ScrollReveal>
          <SectionHeader
            label="Asistente"
            title="¿Tenés preguntas?"
            description="Preguntale al asistente. Responde al instante sobre servicios, precios y tiempos."
          />
        </ScrollReveal>

        <ScrollReveal delay={120}>
          <div className="rounded-2xl border border-neutral-200 bg-white overflow-hidden shadow-sm hover:shadow-md hover:shadow-neutral-200/80 transition-shadow duration-300">
            <div className="flex items-center gap-3 px-5 py-4 border-b border-neutral-100 bg-accent-soft/50">
              <div className="flex items-center justify-center w-9 h-9 rounded-full bg-accent text-white text-sm shadow-sm">
                ◎
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-900">
                  Asistente virtual
                </p>
                <p className="flex items-center gap-1.5 text-xs text-neutral-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  En línea ahora
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
                        : "rounded-tl-sm bg-neutral-100 text-neutral-600"
                    }`}
                  >
                    {msg.role === "assistant" && msg.id === "welcome" ? (
                      <p>
                        ¡Hola! Soy el asistente de{" "}
                        <span className="font-medium text-neutral-900">
                          {site.name}
                        </span>
                        . Puedo ayudarte con preguntas sobre servicios, precios y
                        tiempos de entrega. ¿En qué te puedo ayudar?
                      </p>
                    ) : (
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    )}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-tl-sm bg-neutral-100 px-4 py-3 flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/60 animate-bounce [animation-delay:0ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/60 animate-bounce [animation-delay:150ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/60 animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              )}

              {error && (
                <p className="text-xs text-red-500 text-center">{error}</p>
              )}
            </div>

            <div className="px-5 pb-4">
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    type="button"
                    disabled={loading}
                    onClick={() => sendMessage(reply)}
                    className="appearance-none text-xs md:text-sm px-4 py-2 rounded-full border border-neutral-200 text-neutral-600 hover:border-accent hover:bg-accent-soft hover:text-accent-hover disabled:opacity-50 transition-all duration-200"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 px-4 py-4 border-t border-neutral-100"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribí tu pregunta..."
                disabled={loading}
                maxLength={500}
                className="flex-1 text-sm px-4 py-2.5 rounded-full border border-neutral-200 bg-neutral-50 text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 disabled:opacity-50 transition-all duration-200"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="appearance-none flex items-center justify-center w-10 h-10 rounded-xl bg-accent text-white hover:bg-accent-hover disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 active:scale-95"
                aria-label="Enviar"
              >
                →
              </button>
            </form>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200} className="flex justify-center mt-10">
          <a
            href={`mailto:${site.email}`}
            className="text-sm text-neutral-400 hover:text-accent transition-colors duration-200"
          >
            o escríbeme directo → {site.email}
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
