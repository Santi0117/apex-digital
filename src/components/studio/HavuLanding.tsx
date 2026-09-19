"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { site } from "@/lib/site";
import "./HavuLanding.css";

const NAV = [
  { label: "Servicios", href: "#servicios" },
  { label: "Cómo", href: "#como" },
  { label: "FAQ", href: "#faq" },
] as const;

const PROBLEMS = [
  {
    n: "01",
    title: "El problema real nunca se armó",
    body: "Hay pedidos, pero nadie pone en palabras lo que duele abajo.",
  },
  {
    n: "02",
    title: "Negocio, diseño y código deciden aparte",
    body: "Cada equipo parte de supuestos distintos y reabre el mismo debate.",
  },
  {
    n: "03",
    title: "La IA se queda en comprar la herramienta",
    body: "Hay chatbots y cuentas, pero no llegan al flujo ni al producto.",
  },
  {
    n: "04",
    title: "La UI mejora y el negocio no",
    body: "Las pantallas se ven mejor, pero nadie sabe si una métrica se movió.",
  },
  {
    n: "05",
    title: "Cuando el partner se va, se para todo",
    body: "No queda criterio, sistema ni forma de seguir mejorando solos.",
  },
  {
    n: "06",
    title: "Más output, menos coherencia",
    body: "La IA produce más de todo mientras la marca pierde consistencia.",
  },
] as const;

const OFFERS = [
  {
    title: "Sitios y tiendas",
    body: "Landing, corporativo o e-commerce a tu marca, listos para vender y con Onvi incluido.",
  },
  {
    title: "Software a medida",
    body: "Apps y paneles con tu flujo: reservas, inventario, clientes y pagos.",
  },
  {
    title: "Sistema Onvision",
    body: "Un núcleo para tu industria: facturación 4.4, SINPE e inventario en vivo.",
  },
  {
    title: "Onvi + soporte 24/7",
    body: "IA en el proyecto y respuesta en español e inglés cuando el negocio no puede parar.",
  },
] as const;

const STEPS = [
  { n: "01", title: "Entender", body: "Escuchamos negocio, piso y usuarios. Acordamos dónde estás y a dónde vas." },
  { n: "02", title: "Enmarcar", body: "Problema, hipótesis, límites y éxito. Definimos la pregunta del proyecto." },
  { n: "03", title: "Explorar", body: "Varias direcciones visibles rápido, con prototipos concretos para discutir." },
  { n: "04", title: "Construir", body: "UI, producto y flujo que la gente pueda usar — no solo un mock." },
  { n: "05", title: "Aprender", body: "Uso, KPIs y respuesta. Queda conocimiento para la siguiente vuelta." },
] as const;

const FAQ = [
  {
    q: "¿Podemos hablar antes de tener el brief listo?",
    a: "Sí — de hecho preferimos eso. Empezamos por dónde estás, qué busca el negocio y qué les cuesta a los usuarios.",
  },
  {
    q: "¿En qué etapa nos pueden meter?",
    a: "Idea cruda, producto nuevo, mejorar uno existente, UI, ingeniería u operación. Proponemos el alcance que calza.",
  },
  {
    q: "¿Solo diseño o solo código?",
    a: "Sí. Primero confirmamos objetivo, usuarios y lo que hay alrededor, para que lo que hagamos sostenga.",
  },
  {
    q: "¿Cómo se define el precio?",
    a: "Por alcance, plazo y equipo. Si ya hay presupuesto, priorizamos y proponemos la vía más efectiva.",
  },
] as const;

const MARQUEE =
  "Sitios · tiendas · software · Sistema Onvision · Onvi · facturación 4.4 · SINPE · Costa Rica — construimos lo que tu empresa necesita. ";

const EASE = [0.22, 1, 0.36, 1] as const;

function Headline({ text }: { text: string }) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) {
    return <h1 className="havu-headline">{text}</h1>;
  }

  return (
    <h1 className="havu-headline" aria-label={text}>
      {words.map((word, wi) => (
        <span key={`${word}-${wi}`} className="havu-word">
          {word.split("").map((ch, ci) => (
            <motion.span
              key={`${wi}-${ci}`}
              className="havu-char"
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{
                duration: 0.7,
                delay: 0.35 + wi * 0.06 + ci * 0.018,
                ease: EASE,
              }}
            >
              {ch}
            </motion.span>
          ))}
          {wi < words.length - 1 ? <span className="havu-space"> </span> : null}
        </span>
      ))}
    </h1>
  );
}

function PixelRow() {
  return (
    <div className="havu-pixels" aria-hidden>
      <span className="havu-pixel havu-pixel--walk" />
      <span className="havu-pixel havu-pixel--bot" />
      <span className="havu-pixel havu-pixel--ufo" />
      <span className="havu-pixel havu-pixel--tag">WEB</span>
      <span className="havu-pixel havu-pixel--tag">SYS</span>
    </div>
  );
}

export default function HavuLanding() {
  const [open, setOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const fade = (delay = 0) =>
    reduce
      ? undefined
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-12% 0px" },
          transition: { duration: 0.7, delay, ease: EASE },
        };

  return (
    <div className="havu-page">
      <header className="havu-nav">
        <a href="/studio" className="havu-logo">
          <img src="/logo-eye.png" alt="" width={48} height={26} />
          <span>ONVISION</span>
        </a>
        <nav className="havu-nav-links" aria-label="Principal">
          {NAV.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="havu-nav-actions">
          <a href="/" className="havu-ghost">
            Home actual
          </a>
          <a
            href={`https://wa.me/${site.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="havu-outline"
          >
            Hablar
          </a>
          <button
            type="button"
            className="havu-menu-btn"
            aria-label="Menú"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span>MENU</span>
            <i className={open ? "is-open" : ""} />
          </button>
        </div>
      </header>

      {open ? (
        <div className="havu-drawer">
          {NAV.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a href={`https://wa.me/${site.whatsapp}`} onClick={() => setOpen(false)}>
            WhatsApp
          </a>
          <a href="/" onClick={() => setOpen(false)}>
            Volver al home
          </a>
        </div>
      ) : null}

      <main>
        <section className="havu-hero">
          <div className="havu-hero-meta">
            <motion.p
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.6 }}
            >
              ESTUDIO DIGITAL · SOFTWARE · SISTEMA
            </motion.p>
            <motion.p
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.6 }}
            >
              COSTA RICA / EST. ONVISION
            </motion.p>
          </div>

          <Headline text="No solo hacemos pantallas. Diseñamos los sistemas que mueven el negocio." />

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
          >
            <PixelRow />
          </motion.div>

          <div className="havu-hero-bottom">
            <motion.p
              className="havu-hero-copy"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.25, duration: 0.65 }}
            >
              Vení antes de que el problema esté del todo definido. Sitios,
              tiendas, software a medida, Sistema Onvision e IA Onvi — en un
              solo equipo.
            </motion.p>
            <motion.a
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="havu-cta"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.35, duration: 0.65 }}
            >
              Hablemos de tu proyecto →
            </motion.a>
          </div>
        </section>

        <div className="havu-marquee" aria-hidden>
          <div className="havu-marquee-track">
            <span>{MARQUEE}</span>
            <span>{MARQUEE}</span>
          </div>
        </div>

        <section className="havu-section" id="problemas">
          <motion.h2 className="havu-section-title" {...fade()}>
            Mientras más rápido podés construir, más importan el qué y el porqué.
          </motion.h2>
          <motion.p className="havu-section-lead" {...fade(0.08)}>
            La IA hizo más barato diseñar y codear. La velocidad no sirve si lo
            que hay que construir sigue vago.
          </motion.p>
          <ul className="havu-problems">
            {PROBLEMS.map((item, i) => (
              <motion.li key={item.n} className="havu-problem" {...fade(i * 0.05)}>
                <span>{item.n}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </section>

        <section className="havu-section" id="servicios">
          <motion.h2 className="havu-section-title" {...fade()}>
            Construimos el loop, no solo las pantallas.
          </motion.h2>
          <motion.p className="havu-section-lead" {...fade(0.08)}>
            No somos un estudio que solo arma lo que le pasan. Cruzamos
            negocio, usuarios y tecnología hasta encontrar el problema que vale
            la pena resolver.
          </motion.p>
          <ul className="havu-offers">
            {OFFERS.map((item, i) => (
              <motion.li key={item.title} className="havu-offer" {...fade(i * 0.06)}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </motion.li>
            ))}
          </ul>
        </section>

        <section className="havu-section" id="como">
          <motion.h2 className="havu-section-title" {...fade()}>
            Construir rápido. Probar chiquito. Quedarse con el aprendizaje.
          </motion.h2>
          <ol className="havu-steps">
            {STEPS.map((step, i) => (
              <motion.li key={step.n} className="havu-step" {...fade(i * 0.05)}>
                <span>Step {step.n}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </motion.li>
            ))}
          </ol>
        </section>

        <section className="havu-section havu-compare">
          <motion.h2 className="havu-section-title" {...fade()}>
            El objetivo es el cambio, no el entregable.
          </motion.h2>
          <div className="havu-compare-grid">
            <motion.div {...fade()}>
              <p className="havu-compare-label">Soporte de producción típico</p>
              <ul>
                <li>Arma lo que se pidió</li>
                <li>Entrega una UI o un sitio</li>
                <li>Separa diseño de ingeniería</li>
                <li>Se construye una vez y se para</li>
                <li>El know-how se queda afuera</li>
              </ul>
            </motion.div>
            <motion.div {...fade(0.1)}>
              <p className="havu-compare-label">Cómo trabajamos</p>
              <ul>
                <li>Partimos de qué debería construirse</li>
                <li>Diseñamos un sistema que mueve resultados</li>
                <li>Conectamos concepto, diseño y código</li>
                <li>Medimos, aprendemos y seguimos</li>
                <li>Dejamos criterio y sistemas con el cliente</li>
              </ul>
            </motion.div>
          </div>
        </section>

        <section className="havu-section" id="faq">
          <motion.h2 className="havu-section-title" {...fade()}>
            Las preguntas que más nos hacen antes de empezar.
          </motion.h2>
          <ul className="havu-faq">
            {FAQ.map((item, i) => {
              const isOpen = faqOpen === i;
              return (
                <motion.li key={item.q} {...fade(i * 0.04)}>
                  <button
                    type="button"
                    className={`havu-faq-q${isOpen ? " is-open" : ""}`}
                    aria-expanded={isOpen}
                    onClick={() => setFaqOpen(isOpen ? null : i)}
                  >
                    {item.q}
                    <span aria-hidden>{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen ? <p className="havu-faq-a">{item.a}</p> : null}
                </motion.li>
              );
            })}
          </ul>
        </section>

        <section className="havu-end">
          <motion.h2 className="havu-section-title" {...fade()}>
            No solo hacemos pantallas. Diseñamos los sistemas que mueven el
            negocio.
          </motion.h2>
          <motion.p className="havu-section-lead" {...fade(0.08)}>
            La IA puede generar mil respuestas. No puede decidir qué pregunta
            hacer. Nosotros encontramos el problema que nadie había dicho —
            y lo dejamos corriendo.
          </motion.p>
          <motion.a
            href={`https://wa.me/${site.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="havu-cta"
            {...fade(0.12)}
          >
            Agendar una demo →
          </motion.a>
        </section>
      </main>

      <footer className="havu-footer">
        <div>
          <img src="/logo-eye.png" alt="" width={40} height={22} />
          <span>Onvision Digital</span>
        </div>
        <p>© {new Date().getFullYear()} · Costa Rica · {site.email}</p>
      </footer>
    </div>
  );
}
