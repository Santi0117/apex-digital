"use client";

import type { ReactNode } from "react";
import SectionHeader from "./SectionHeader";
import ScrollReveal from "./ScrollReveal";

const services = [
  {
    icon: "cart",
    badge: "Más solicitado",
    title: "Tienda online (e-commerce)",
    description:
      "Catálogo, carrito, pagos online y panel admin para que gestionés tus ventas vos mismo.",
    price: "$800",
    unit: "proyecto",
    features: ["Next.js", "Stripe", "PostgreSQL", "Panel admin"],
    cta: "Cotizar tienda →",
    highlighted: true,
  },
  {
    icon: "building",
    title: "Sitio web para negocio",
    description:
      "Página profesional que transmite confianza, aparece en Google y da formalidad digital.",
    price: "$400",
    unit: "proyecto",
    features: ["React", "SEO", "Responsive", "Formulario de contacto"],
    cta: "Cotizar sitio →",
    highlighted: false,
  },
  {
    icon: "monitor",
    title: "App web (SaaS)",
    description:
      "Login, roles de usuario, base de datos y funcionalidades específicas para tu negocio.",
    price: "$1,500",
    unit: "proyecto",
    features: ["Node.js", "API REST", "Roles de usuario", "Base de datos"],
    cta: "Cotizar app →",
    highlighted: false,
  },
  {
    icon: "refresh",
    title: "Mantenimiento mensual",
    description:
      "Actualizaciones, backups y soporte para que tu sitio funcione perfecto siempre.",
    price: "$20",
    unit: "mes",
    features: ["Hosting", "Soporte", "Updates", "Backups"],
    cta: "Consultar plan →",
    highlighted: false,
  },
];

function ServiceIcon({ type }: { type: string }) {
  const paths: Record<string, ReactNode> = {
    cart: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a.75.75 0 100-1.5.75.75 0 000 1.5zm7.5 0a.75.75 0 100-1.5.75.75 0 000 1.5zM5.106 5.272H19.5l-1.125 5.25H7.617"
      />
    ),
    building: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 21h19.5M4.5 21V7.5a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5V21M12 21V4.5a1.5 1.5 0 011.5-1.5h3A1.5 1.5 0 0118 4.5V21M9 9h.008v.008H9V9zm0 3h.008v.008H9V12zm0 3h.008v.008H9V15z"
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

export default function Services() {
  return (
    <section id="servicios" className="bg-white pt-16 md:pt-24 pb-10 md:pb-12">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <ScrollReveal>
          <SectionHeader
            label="Servicios"
            title="¿Qué podés contratar?"
            description="Cada proyecto es a medida — no usamos plantillas genéricas. Código limpio, rápido y fácil de mantener."
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 md:gap-6">
          {services.map((service, i) => (
            <ScrollReveal
              key={service.title}
              delay={100 + i * 90}
              className="h-full"
            >
              <article
                className={`group card-hover flex flex-col h-full min-h-[420px] p-7 md:p-8 rounded-3xl bg-white cursor-default ${
                  service.highlighted
                    ? "ring-1 ring-accent/30 shadow-lg shadow-accent/10"
                    : ""
                }`}
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center justify-center w-11 h-11 rounded-xl border border-neutral-200 bg-accent-soft text-accent group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-all duration-300">
                    <ServiceIcon type={service.icon} />
                  </div>
                  {service.badge && (
                    <span className="text-[10px] font-medium tracking-wide uppercase px-2.5 py-1 rounded-full bg-accent-soft text-accent border border-accent/20">
                      {service.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-medium text-neutral-900 mb-2 group-hover:text-accent-hover transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed mb-6">
                  {service.description}
                </p>

                <p className="text-3xl font-medium tracking-tight text-neutral-900 mb-1">
                  {service.price}
                </p>
                <p className="text-xs text-neutral-400 mb-6">/ {service.unit}</p>

                <ul className="flex-1 space-y-2.5 mb-8">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-neutral-600"
                    >
                      <span className="mt-0.5 text-accent shrink-0">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href="#cotizar"
                  className={`appearance-none inline-flex items-center justify-center w-full rounded-full px-6 py-3.5 text-sm font-medium transition-all duration-200 ${
                    service.highlighted
                      ? "bg-neutral-900 text-white hover:bg-neutral-800"
                      : "border border-neutral-300 text-neutral-900 hover:border-accent hover:text-accent-hover"
                  }`}
                >
                  {service.cta}
                </a>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={500} className="flex justify-center mt-8">
          <a
            href="#portafolio"
            className="flex items-center justify-center w-10 h-10 rounded-full border border-neutral-200 text-neutral-400 hover:border-accent hover:bg-accent-soft hover:text-accent transition-all duration-200 hover:scale-110"
            aria-label="Ver portafolio"
          >
            ↓
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
