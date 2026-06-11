"use client";

import { useState } from "react";
import SectionHeader from "./SectionHeader";
import ScrollReveal from "./ScrollReveal";

type Plan = {
  name: string;
  tagline: string;
  price: string;
  unit: string;
  features: string[];
  highlighted?: boolean;
};

type PlanGroup = {
  id: string;
  tabLabel: string;
  description: string;
  plans: Plan[];
  singleColumn?: boolean;
};

const planGroups: PlanGroup[] = [
  {
    id: "web",
    tabLabel: "Sitios web",
    description:
      "Planes base para presencia digital y sitios corporativos. El precio final se ajusta después de la reunión de descubrimiento.",
    plans: [
      {
        name: "Estandar",
        tagline: "Presencia profesional lista para vender.",
        price: "$425",
        unit: "USD · pago único",
        features: [
          "Landing page de una sección",
          "Diseño responsive mobile-first",
          "Formulario de contacto + redes sociales",
          "Animaciones e interacciones personalizadas",
          "SEO on-page",
          "Despliegue incluido",
          "Optimización de velocidad",
          "Certificado SSL y dominio configurado",
          "2 rondas de revisiones",
        
        ],
      },
      {
        name: "Profesional",
        tagline: "El estándar para empresas en crecimiento.",
        price: "$650",
        unit: "USD · pago único",
        highlighted: true,
        features: [
          "Sitio multipágina",
          "Animaciones e interacciones premium",
          "Blog o gestor de contenido básico",
          "Analytics e integración de formularios",
          "SEO on-page avanzado",
          "30 días de garantía post-entrega",
          "Integración WhatsApp y redes sociales",
          "Optimización orientada a conversión",
          "Hasta 3–4 rondas de revisiones",
          "Capacitación básica de uso",
        ],
      },
      {
        name: "Plataforma Saas",
        tagline: "Aplicaciones web con lógica de negocio.",
        price: "$1,250",
        unit: "USD · desde",
        features: [
          "App web con autenticación y base de datos",
          "Panel de administrador personalizado",
          "Roles, permisos e integraciones externas",
          "Arquitectura escalable",
          "60 días de garantía post-entrega",
          "Dashboards y reportes a medida",
          "Pasarela de pagos",
          "Notificaciones por email y en app",
          "Seguridad reforzada (cifrado y headers)",
          "Entrega y capacitación",
        ],
      },
    ],
  },
  {
    id: "shop",
    tabLabel: "Tienda online",
    description:
      "Planes base para e-commerce y catálogos digitales. Integraciones avanzadas se cotizan según complejidad.",
    plans: [
      {
        name: "Starter",
        tagline: "Tu primera tienda online operativa.",
        price: "$800",
        unit: "USD · pago único",
        features: [
          "Catálogo de hasta 50 productos",
          "Carrito y checkout funcional",
          "Pagos online (Stripe / transferencia)",
          "Panel admin para pedidos",
          "Diseño responsive",
          "SEO básico para productos",
          "Notificaciones de venta por email",
          "Despliegue incluido",
          "3 ronda de revisiones",
        ],
      },
      {
        name: "Profesional",
        tagline: "E-commerce completo para escalar ventas.",
        price: "$1,100",
        unit: "USD · pago único",
        highlighted: true,
        features: [
          "Catálogo ilimitado con filtros",
          "Variantes, inventario y cupones",
          "Checkout optimizado para conversión",
          "Integración SINPE / Stripe avanzada",
          "Panel admin con reportes de ventas",
          "30 días de garantía post-entrega",
          "SEO avanzado para e-commerce",
          "Integración WhatsApp para pedidos",
          "Hasta 5 rondas de revisiones",
          "Capacitación para gestionar la tienda",
        ],
      },
      {
        name: "Avanzada",
        tagline: "Tiendas con lógica de negocio compleja.",
        price: "$1,500",
        unit: "USD · desde",
        features: [
          "Multi-vendedor o multi-sucursal",
          "Suscripciones y pagos recurrentes",
          "Integraciones ERP / inventario externo",
          "Automatizaciones y webhooks",
          "Dashboards de métricas en tiempo real",
          "30 días de garantía post-entrega",
          "Roles de usuario (admin, vendedor, etc.)",
          "API para integraciones futuras",
          "Arquitectura escalable documentada",
          "Soporte prioritario en lanzamiento",
        ],
      },
    ],
  },
  {
    id: "mobile",
    tabLabel: "App móvil",
    description:
      "Aplicación móvil completa para iOS y Android. Incluye diseño, desarrollo, integración con backend y publicación en tiendas.",
    singleColumn: true,
    plans: [
      {
        name: "App completa",
        tagline: "Tu producto en el bolsillo de tus usuarios.",
        price: "$1,900",
        unit: "USD · pago único",
        highlighted: true,
        features: [
          "App nativa cross-platform (iOS + Android)",
          "Diseño UI/UX mobile-first personalizado",
          "Login, registro y recuperación de contraseña",
          "Integración con API / backend existente",
          "Notificaciones push",
          "Modo offline y sincronización de datos",
          "Pagos in-app y suscripciones (si aplica)",
          "Publicación asistida en App Store y Google Play",
          "Analytics, métricas de uso y reporte de errores",
          "30 días de garantía post-lanzamiento",
          "Panel admin o conexión con CMS/web",
          "Deep links y compartir contenido",
          "Capacitación y documentación de entrega",
        ],
      },
    ],
  },
  {
    id: "maintenance",
    tabLabel: "Mantenimiento",
    description:
      "Plan mensual para que tu sitio o app siga activo, seguro y actualizado sin que tengas que preocuparte por lo técnico.",
    singleColumn: true,
    plans: [
      {
        name: "Plan mensual",
        tagline: "Tu sitio siempre activo, seguro y al día.",
        price: "$20",
        unit: "USD · por mes",
        highlighted: true,
        features: [
          "Hosting y monitoreo de uptime",
          "Backups automáticos periódicos",
          "Actualizaciones de seguridad",
          "Actualización de dependencias y plugins",
          "Renovación y gestión de certificado SSL",
          "Soporte técnico por WhatsApp y email",
          "Monitoreo de rendimiento y velocidad",
          "Informe mensual de estado del sitio",
          "Corrección de bugs menores post-lanzamiento",
          "Ajustes de contenido básicos incluidos",
        ],
      },
    ],
  },
];

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="w-4 h-4 shrink-0 text-accent mt-0.5"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M16.704 5.29a1 1 0 010 1.42l-7.25 7.25a1 1 0 01-1.42 0l-3.25-3.25a1 1 0 111.42-1.42l2.54 2.54 6.54-6.54a1 1 0 011.42 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function Plans() {
  const [activeGroup, setActiveGroup] = useState(planGroups[0].id);
  const group = planGroups.find((g) => g.id === activeGroup) ?? planGroups[0];

  return (
    <section id="planes" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <ScrollReveal>
          <SectionHeader
            label="Planes y precios"
            title="Planes base claros, adaptados a tu necesidad"
            description="Paquetes de referencia para web, e-commerce, apps móviles y mantenimiento. El precio final se ajusta después de la reunión de descubrimiento según alcance y complejidad."
          />
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <div className="flex flex-wrap gap-2 mb-8 md:mb-10">
            {planGroups.map((g) => {
              const isActive = g.id === activeGroup;
              return (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setActiveGroup(g.id)}
                  aria-pressed={isActive}
                  className={`appearance-none text-sm font-medium px-5 py-2.5 rounded-full border transition-all duration-200 ${
                    isActive
                      ? "bg-accent text-white border-accent shadow-sm shadow-accent/25"
                      : "bg-white/80 text-neutral-600 border-neutral-200 hover:border-accent/40 hover:text-accent-hover"
                  }`}
                >
                  {g.tabLabel}
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <p className="text-sm text-neutral-500 mb-8 md:mb-10 max-w-2xl">
            {group.description}
          </p>
        </ScrollReveal>

        <div
          className={`grid gap-5 md:gap-6 items-stretch ${
            group.singleColumn
              ? "grid-cols-1 max-w-lg mx-auto"
              : "grid-cols-1 md:grid-cols-3"
          }`}
        >
          {group.plans.map((plan, i) => (
            <ScrollReveal key={`${group.id}-${plan.name}`} delay={120 + i * 80} className="h-full">
              <article
                className={`relative flex flex-col h-full rounded-2xl border bg-white/85 backdrop-blur-sm p-7 md:p-8 transition-all duration-300 ${
                  plan.highlighted
                    ? "border-accent/50 shadow-[0_24px_60px_-24px_rgba(8,145,178,0.35)] md:-translate-y-1"
                    : "border-neutral-200 hover:border-accent/30 hover:shadow-[0_20px_50px_-24px_rgba(8,145,178,0.15)]"
                }`}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-medium tracking-[0.12em] uppercase px-3 py-1 rounded-full bg-accent text-white whitespace-nowrap">
                    Más elegido
                  </span>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-medium text-neutral-900 mb-2 tracking-tight">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-neutral-500 leading-relaxed min-h-[40px]">
                    {plan.tagline}
                  </p>
                </div>

                <div className="mb-7 pb-7 border-b border-neutral-100">
                  <p className="text-4xl font-medium tracking-tight text-neutral-900">
                    {plan.price}
                  </p>
                  <p className="text-xs text-neutral-400 mt-1">{plan.unit}</p>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-sm text-neutral-600 leading-relaxed"
                    >
                      <CheckIcon />
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href="#cotizar"
                  className={`appearance-none inline-flex items-center justify-center w-full rounded-xl px-6 py-3.5 text-sm font-medium transition-all duration-200 ${
                    plan.highlighted
                      ? "bg-accent text-white hover:bg-accent-hover shadow-sm shadow-accent/20"
                      : "border border-neutral-200 text-neutral-900 hover:border-accent hover:text-accent-hover bg-white"
                  }`}
                >
                  Solicitar este plan
                </a>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={400}>
          <p className="mt-10 md:mt-12 text-center text-sm text-neutral-500">
            ¿Necesitás un SaaS a medida o un proyecto con integraciones complejas?{" "}
            <a
              href="#cotizar"
              className="text-accent font-medium hover:text-accent-hover transition-colors"
            >
              Solicitá cotización personalizada →
            </a>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
