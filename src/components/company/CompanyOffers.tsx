"use client";

import { useEffect, useState } from "react";
import { companyOffers } from "@/lib/company";
import ScrollReveal, { ScrollItem, ScrollStagger } from "../ScrollReveal";
import "./CompanyOffers.css";

const VERTICALS = [
  "Restaurante",
  "Clínica",
  "Retail",
  "Obras",
  "Taller",
  "Legal",
];

function LaptopVisual() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % VERTICALS.length);
    }, 2200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="ov-offer-stage ov-offer-stage--laptop">
      <div className="ov-laptop">
        <div className="ov-laptop-lid">
          <div className="ov-laptop-bezel">
            <div className="ov-laptop-cam" aria-hidden />
            <div className="ov-laptop-screen">
              <div className="ov-laptop-bar">
                <span />
                <span />
                <span />
                <p>app.onvision.cr</p>
              </div>
              <div className="ov-laptop-body">
                <aside>
                  <p>Módulos</p>
                  <ul>
                    {["Facturación", "Inventario", "Caja", VERTICALS[active]!].map(
                      (item, i) => (
                        <li key={item} className={i === 3 ? "is-on" : ""}>
                          {item}
                        </li>
                      ),
                    )}
                  </ul>
                </aside>
                <main>
                  <p className="ov-laptop-kicker">Hoy</p>
                  <strong>Panel {VERTICALS[active]}</strong>
                  <div className="ov-laptop-cards">
                    <div>
                      <span>Ventas</span>
                      <b>₡842k</b>
                    </div>
                    <div>
                      <span>Stock</span>
                      <b>124</b>
                    </div>
                    <div>
                      <span>Onvi</span>
                      <b>3 tips</b>
                    </div>
                  </div>
                  <div className="ov-laptop-row" />
                  <div className="ov-laptop-row is-short" />
                </main>
              </div>
            </div>
          </div>
        </div>
        <div className="ov-laptop-base">
          <div className="ov-laptop-notch" aria-hidden />
        </div>
      </div>
    </div>
  );
}

function PhoneVisual() {
  return (
    <div className="ov-offer-stage ov-offer-stage--phone">
      <div className="ov-offer-phone">
        <div className="ov-offer-phone-island" aria-hidden />
        <p className="ov-offer-phone-title">Tu marca, en la web</p>
        <p className="ov-offer-phone-copy">
          Landing, tienda o app. Diseño a medida y Onvi adentro.
        </p>
        <ul>
          {["Sitio a tu marca", "Checkout Onvo", "Listo para publicar"].map(
            (item) => (
              <li key={item}>{item}</li>
            ),
          )}
        </ul>
      </div>
    </div>
  );
}

function SupportVisual() {
  return (
    <div className="ov-offer-stage ov-offer-stage--support">
      <div className="ov-offer-chat">
        <div className="ov-offer-bubble is-in">
          <p>Support · EN</p>
          <span>We’re here 24/7. What do you need to ship today?</span>
        </div>
        <div className="ov-offer-bubble is-out">
          <p>Soporte · ES</p>
          <span>Estamos. ¿Lo vemos en español o seguimos in English?</span>
        </div>
        <div className="ov-offer-code" aria-hidden>
          <span>onvi.reply(&quot;ready&quot;)</span>
          <span>status: online · 24/7</span>
          <span>lang: ES / EN</span>
        </div>
      </div>
    </div>
  );
}

const visuals = [LaptopVisual, PhoneVisual, SupportVisual];

export default function CompanyOffers() {
  return (
    <section className="w-full px-4 py-12 md:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal variant="up">
          <h2 className="max-w-2xl text-[1.45rem] leading-[1.15] font-medium tracking-[-0.04em] text-white sm:text-[1.9rem]">
            {companyOffers.title}
          </h2>
        </ScrollReveal>
        <ScrollStagger className="ov-offers-grid mt-8" stagger={0.12}>
          {companyOffers.cards.map((card, i) => {
            const Visual = visuals[i]!;
            const external = "external" in card.cta && card.cta.external;
            return (
              <ScrollItem key={card.title} variant="up">
                <article className="ov-offer-card">
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                  <a
                    href={card.cta.href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                  >
                    {card.cta.label} →
                  </a>
                  <Visual />
                </article>
              </ScrollItem>
            );
          })}
        </ScrollStagger>
      </div>
    </section>
  );
}
