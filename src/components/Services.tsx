"use client";

import type { ReactNode } from "react";
import ScrollReveal from "./ScrollReveal";

type Service = {
  code: string;
  icon: string;
  tier: string;
  badge?: string;
  title: string;
  description: string;
  features: string[];
  result: string;
  cta: string;
  ctaHref?: string;
};

const mainServices: Service[] = [
  {
    code: "SVC-01",
    icon: "globe",
    tier: "Servicio principal",
    badge: "Más solicitado",
    title: "Sitio web para negocio",
    description:
      "Página profesional que transmite confianza, aparece en Google y da formalidad digital a tu marca.",
    features: [
      "Landing pages y sitios corporativos",
      "Diseño responsive para móvil y desktop",
      "Optimización SEO on-page",
      "Formularios y captación de leads",
      "Integración con WhatsApp y redes",
      "Hosting y dominio configurados",
    ],
    result:
      "Presencia profesional que genera confianza y posiciona tu negocio en buscadores.",
    cta: "Ver planes →",
    ctaHref: "#planes",
  },
  {
    code: "SVC-02",
    icon: "cart",
    tier: "Servicio principal",
    title: "Tienda online (e-commerce)",
    description:
      "Catálogo, carrito, pagos online y panel admin para que gestionés tus ventas vos mismo.",
    features: [
      "Catálogo de productos con filtros",
      "Carrito y checkout con pagos online",
      "Panel admin para gestionar pedidos",
      "Integración Stripe / SINPE / transferencia",
      "Inventario y variantes de producto",
      "Notificaciones de venta por email",
    ],
    result:
      "Ventas online automatizadas con control total de catálogo, pedidos y pagos.",
    cta: "Ver planes →",
    ctaHref: "#planes",
  },
];

const customServices: Service[] = [
  {
    code: "SVC-03",
    icon: "monitor",
    tier: "Bajo cotización",
    title: "App web (SaaS)",
    description:
      "Software con login, roles de usuario, base de datos y funcionalidades específicas para tu operación.",
    features: [
      "Login, registro y roles de usuario",
      "Dashboard y flujos personalizados",
      "Base de datos y API REST",
      "Integraciones con servicios externos",
      "Reportes y exportación de datos",
      "Arquitectura escalable según tu crecimiento",
    ],
    result:
      "Software propio que automatiza procesos internos y se adapta a tu negocio.",
    cta: "Solicitar cotización →",
  },
  {
    code: "SVC-04",
    icon: "refresh",
    tier: "Bajo cotización",
    title: "Mantenimiento y soporte",
    description:
      "Actualizaciones, backups y soporte continuo para que tu sitio funcione perfecto siempre.",
    features: [
      "Hosting y monitoreo de uptime",
      "Backups automáticos periódicos",
      "Actualizaciones de seguridad",
      "Soporte técnico por WhatsApp y email",
      "Mejoras y ajustes mensuales",
      "Informes de rendimiento y SEO",
    ],
    result:
      "Tu sitio siempre activo, seguro y evolucionando sin que tengas que preocuparte.",
    cta: "Solicitar cotización →",
  },
];

function ServiceIcon({ type }: { type: string }) {
  const paths: Record<string, ReactNode> = {
    globe: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A8.966 8.966 0 013 12c0-1.264.26-2.467.732-3.553"
      />
    ),
    cart: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a.75.75 0 100-1.5.75.75 0 000 1.5zm7.5 0a.75.75 0 100-1.5.75.75 0 000 1.5zM5.106 5.272H19.5l-1.125 5.25H7.617"
      />
    ),
    monitor: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
      />
    ),
    refresh: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182"
      />
    ),
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5"
    >
      {paths[type]}
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-4 h-4 shrink-0 text-accent"
      aria-hidden
    >
      <path d="M10 1.5a.75.75 0 01.673.418l1.882 3.815 4.213.612a.75.75 0 01.416 1.279l-3.048 2.97.719 4.192a.75.75 0 01-1.088.791L10 13.347l-3.767 1.98a.75.75 0 01-1.088-.79l.72-4.194-3.048-2.968a.75.75 0 01.416-1.28l4.213-.611L9.327 1.918A.75.75 0 0110 1.5z" />
    </svg>
  );
}

function ServiceCard({ service, delay }: { service: Service; delay: number }) {
  return (
    <ScrollReveal delay={delay} className="h-full">
      <article className="group flex flex-col h-full rounded-2xl border border-neutral-200 bg-white/80 backdrop-blur-sm p-7 md:p-8 transition-all duration-300 hover:border-accent/40 hover:shadow-[0_20px_50px_-20px_rgba(8,145,178,0.18)]">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex items-center justify-center w-11 h-11 rounded-xl border border-accent/20 bg-accent-soft text-accent">
            <ServiceIcon type={service.icon} />
          </div>
          <span className="font-mono text-[10px] tracking-wider text-neutral-400 pt-1">
            {service.code}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-[10px] font-medium tracking-[0.15em] uppercase px-2.5 py-1 rounded-full bg-accent-soft text-accent border border-accent/15">
            {service.tier}
          </span>
          {service.badge && (
            <span className="text-[10px] font-medium tracking-wide uppercase px-2.5 py-1 rounded-full bg-neutral-900 text-white">
              {service.badge}
            </span>
          )}
        </div>

        <h3 className="text-xl md:text-2xl font-medium text-neutral-900 mb-3 tracking-tight leading-snug">
          {service.title}
        </h3>
        <p className="text-sm md:text-[15px] text-neutral-500 leading-relaxed mb-6">
          {service.description}
        </p>

        <ul className="space-y-2.5 mb-7 flex-1">
          {service.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2.5 text-sm text-neutral-600"
            >
              <span className="mt-0.5 text-accent font-medium shrink-0">✓</span>
              {feature}
            </li>
          ))}
        </ul>

        <div className="flex items-start gap-2.5 rounded-xl bg-accent-soft/60 border border-accent/10 px-4 py-3.5 mb-6">
          <SparkleIcon />
          <p className="text-sm text-neutral-700 leading-relaxed">
            <span className="font-medium text-neutral-900">Resultado: </span>
            {service.result}
          </p>
        </div>

        <a
          href={service.ctaHref ?? "#cotizar"}
          className="inline-flex items-center text-sm font-medium text-accent hover:text-accent-hover transition-colors duration-200"
        >
          {service.cta}
        </a>
      </article>
    </ScrollReveal>
  );
}

function ServiceGroup({
  label,
  title,
  description,
  items,
  baseDelay,
}: {
  label: string;
  title: string;
  description?: string;
  items: Service[];
  baseDelay: number;
}) {
  return (
    <div className="mb-16 md:mb-20 last:mb-0">
      <ScrollReveal>
        <div className="mb-8 md:mb-10">
          <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-accent mb-4">
            {label}
          </p>
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-neutral-900 mb-3 text-balance">
            {title}
          </h2>
          {description && (
            <p className="text-neutral-500 text-base md:text-lg leading-relaxed max-w-2xl">
              {description}
            </p>
          )}
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6">
        {items.map((service, i) => (
          <ServiceCard
            key={service.code}
            service={service}
            delay={baseDelay + i * 100}
          />
        ))}
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <section id="servicios" className="pt-16 md:pt-24 pb-10 md:pb-12">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <ServiceGroup
          label="Lo que hacemos · servicios principales"
          title="Soluciones web listas para impulsar tu negocio"
          description="Cada proyecto es a medida — no usamos plantillas genéricas. Código limpio, rápido y fácil de mantener."
          items={mainServices}
          baseDelay={0}
        />

        <ScrollReveal delay={80}>
          <p className="text-center text-[11px] font-medium tracking-[0.22em] uppercase text-neutral-400 mb-10 md:mb-12">
            Especialidades a la medida · bajo cotización
          </p>
        </ScrollReveal>

        <ServiceGroup
          label="Proyectos personalizados"
          title="Software y soporte para operaciones complejas"
          items={customServices}
          baseDelay={200}
        />

        <ScrollReveal delay={500} className="flex justify-center mt-4">
          <a
            href="#portafolio"
            className="flex items-center justify-center w-10 h-10 rounded-full border border-neutral-200 bg-white/80 text-neutral-400 hover:border-accent hover:bg-accent-soft hover:text-accent transition-all duration-200 hover:scale-110"
            aria-label="Ver portafolio"
          >
            ↓
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
