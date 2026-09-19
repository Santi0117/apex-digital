"use client";

import { useEffect, useState } from "react";
import { companyChats } from "@/lib/company";
import ScrollReveal from "../ScrollReveal";
import CompanyPoints from "./CompanyPoints";
import { clientChats, type ChatMessage, type ClientChat } from "@/lib/client-chats";
import "./CompanyWalkthrough.css";
import "./CompanyChats.css";

function Avatar({
  color,
  initials,
  size = "md",
}: {
  color: string;
  initials: string;
  size?: "sm" | "md";
}) {
  const dim = size === "sm" ? "h-6 w-6 text-[8px]" : "h-8 w-8 text-[10px]";
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-black ${dim}`}
      style={{ background: color }}
    >
      {initials}
    </span>
  );
}

function Bubble({ message }: { message: ChatMessage }) {
  if (message.role === "client") {
    return (
      <div className="ov-chats-bubble-in flex justify-end">
        <p className="max-w-[85%] rounded-2xl rounded-br-md bg-white px-3 py-2 text-[12px] leading-relaxed text-black sm:max-w-[78%]">
          {message.text}
        </p>
      </div>
    );
  }

  return (
    <div className="ov-chats-bubble-in max-w-[90%] rounded-2xl rounded-bl-md bg-white/6 px-3 py-2 sm:max-w-[82%]">
      {message.name ? (
        <p className="mb-1 text-[11px] font-medium" style={{ color: message.color }}>
          {message.name}
        </p>
      ) : null}
      <p className="text-[12px] leading-relaxed text-white/75">{message.text}</p>
    </div>
  );
}

function ChatList({
  active,
  onPick,
}: {
  active: string;
  onPick: (id: string) => void;
}) {
  return (
    <ul className="space-y-0.5">
      {clientChats.map((chat) => {
        const on = chat.id === active;
        return (
          <li key={chat.id}>
            <button
              type="button"
              onMouseEnter={() => onPick(chat.id)}
              onFocus={() => onPick(chat.id)}
              onClick={() => onPick(chat.id)}
              className={`ov-chats-row flex w-full items-start gap-2.5 rounded-xl px-2 py-2 text-left ${
                on ? "is-on" : ""
              }`}
            >
              <Avatar color={chat.color} initials={chat.initials} />
              <span className="min-w-0 flex-1">
                <span className="flex items-baseline justify-between gap-2">
                  <span className="truncate text-[13px] font-medium text-white/90">
                    {chat.name}
                  </span>
                  <span className="shrink-0 text-[10px] text-white/30">
                    {chat.time}
                  </span>
                </span>
                <span className="mt-0.5 block truncate text-[11px] text-white/40">
                  {chat.preview}
                </span>
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function Thread({ chat }: { chat: ClientChat }) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex items-center gap-2 border-b border-white/8 px-3 py-2.5">
        <Avatar color={chat.color} initials={chat.initials} size="sm" />
        <div className="min-w-0">
          <p className="truncate text-[13px] font-medium text-white/90">
            {chat.name}
          </p>
          {chat.status ? (
            <p className="text-[10px] text-white/35">{chat.status}</p>
          ) : null}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2.5 overflow-hidden px-3 py-3">
        {chat.messages.map((message, i) => (
          <Bubble key={`${chat.id}-${i}`} message={message} />
        ))}
        <p className="pt-1 text-[11px] text-white/30">Listo.</p>
      </div>
      <div className="px-3 pb-3">
        <div className="flex items-center justify-between rounded-full bg-white/5 px-3 py-2 text-[12px] text-white/30">
          <span className="truncate">Responder a {chat.name}…</span>
          <span>↑</span>
        </div>
      </div>
    </div>
  );
}

export default function CompanyChats() {
  const [activeId, setActiveId] = useState(clientChats[0]!.id);
  const [hovering, setHovering] = useState(false);
  const chat = clientChats.find((item) => item.id === activeId) ?? clientChats[0]!;

  useEffect(() => {
    if (hovering) return;
    const timer = window.setInterval(() => {
      setActiveId((current) => {
        const i = clientChats.findIndex((item) => item.id === current);
        return clientChats[(i + 1) % clientChats.length]!.id;
      });
    }, 4200);
    return () => window.clearInterval(timer);
  }, [hovering]);

  const pick = (id: string) => {
    setHovering(true);
    setActiveId(id);
  };

  return (
    <section className="w-full px-4 py-12 md:px-6 md:py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:grid lg:grid-cols-[minmax(0,1.35fr)_minmax(240px,0.7fr)] lg:items-center lg:gap-14">
        <ScrollReveal
          className="order-2 lg:order-1"
          variant="left"
          delay={0.08}
        >
        <div
          className="ov-walk-window ov-chats-pane overflow-hidden rounded-2xl"
          onMouseLeave={() => setHovering(false)}
        >
          <div className="flex items-center gap-2 border-b border-white/8 px-3 py-2 sm:gap-3 sm:py-2.5">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </div>
            <p className="flex-1 text-center text-[13px] font-medium text-white/80">
              Clientes Onvision
            </p>
            <span className="w-10" />
          </div>

          <div className="grid min-h-[440px] sm:grid-cols-[200px_1fr]">
            <aside className="border-b border-white/8 px-2 py-3 sm:border-r sm:border-b-0 sm:px-3 sm:py-4">
              <div className="mb-2 hidden rounded-full bg-white/5 px-3 py-1.5 text-[12px] text-white/30 sm:block">
                Buscar
              </div>
              <div className="max-h-[168px] overflow-y-auto sm:max-h-none">
                <ChatList active={activeId} onPick={pick} />
              </div>
            </aside>
            <Thread chat={chat} />
          </div>
        </div>
        </ScrollReveal>

        <ScrollReveal
          className="order-1 max-w-sm lg:order-2 lg:pl-2"
          variant="right"
          delay={0.14}
        >
          <h2 className="text-[1.45rem] leading-[1.15] font-medium tracking-[-0.04em] text-white sm:text-[1.9rem]">
            {companyChats.title}
          </h2>
          <CompanyPoints points={companyChats.points} />
          <a
            href={companyChats.cta.href}
            className="mt-5 inline-flex text-[14px] text-[#ff5a1f] transition hover:text-[#ff7a4d]"
          >
            {companyChats.cta.label} →
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
