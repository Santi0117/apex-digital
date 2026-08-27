"use client";

import Image from "next/image";
import { useState } from "react";
import { verticals } from "@/lib/content";
import SectorGlyph from "./SectorGlyph";

type Spec = { title: string; description: string };

type SectorSlide = {
  id: string;
  name: string;
  detail: string;
  tone: string;
  panelTitle: string;
  panelBody: string;
  image?: string;
  imageAlt: string;
  imageWidth?: number;
  imageHeight?: number;
  preview: {
    greeting: string;
    metricLabel: string;
    metricValue: string;
    rows: { label: string; value: string }[];
  };
  specs: Spec[];
  highlight: Spec;
};

const VERTICAL_BY_ID = Object.fromEntries(verticals.map((v) => [v.id, v]));

const SECTORS: SectorSlide[] = [
  {
    id: "retail",
    name: "Retail",
    detail: "POS · inventario · caja",
    tone: "bg-amber-100 text-amber-800",
    panelTitle: "Panel Retail centralizado",
    panelBody:
      "POS, carrito y cobro en un solo flujo — escaneá, cobrá con SINPE o tarjeta y seguí vendiendo.",
    image: "/product/retail-pos-hq2.png",
    imageAlt: "POS de Onvision Retail: productos, carrito y cobro",
    imageWidth: 3024,
    imageHeight: 1718,
    preview: {
      greeting: "Hoy en tu comercio",
      metricLabel: "En carrito",
      metricValue: "₡3.050",
      rows: [
        { label: "Items", value: "3" },
        { label: "Medio de pago", value: "Tarjeta" },
        { label: "Tienda", value: "Centro" },
      ],
    },
    specs: [
      {
        title: "POS con código de barras",
        description: "Buscá o escaneá productos y cobrá sin salir del mostrador.",
      },
      {
        title: "Carrito y multi-pago",
        description: "Efectivo, SINPE, tarjeta, transferencia o fiado en el mismo cobro.",
      },
      {
        title: "Stock en vivo",
        description: "Unidades visibles en cada producto antes de vender de más.",
      },
      {
        title: "Cliente en la venta",
        description: "Asociá el tiquete al cliente y mantené el historial de compras.",
      },
    ],
    highlight: {
      title: "ONVI en tu tienda",
      description: "Señales de qué reponer y dónde se te va el margen — sin hojas de cálculo.",
    },
  },
  {
    id: "constructoras",
    name: "Constructoras",
    detail: "Obra · avance · costos",
    tone: "bg-orange-100 text-orange-800",
    panelTitle: "Panel Constructoras centralizado",
    panelBody:
      "Proyectos, avance físico y presupuesto en un solo panel — sabé qué obra va y qué requiere acción.",
    image: "/product/constructoras-panel-hq2.png",
    imageAlt: "Panel de Onvision Obras: avance de proyecto y métricas de constructora",
    imageWidth: 3024,
    imageHeight: 1718,
    preview: {
      greeting: "Obra en marcha",
      metricLabel: "Avance físico",
      metricValue: "58%",
      rows: [
        { label: "Obras activas", value: "3" },
        { label: "Presupuesto en curso", value: "₡153,1M" },
        { label: "OC por aprobar", value: "1" },
      ],
    },
    specs: [
      {
        title: "Avance de obra por etapas",
        description: "Seguí el % físico y vinculalo a facturación parcial del contrato.",
      },
      {
        title: "Presupuesto y ejecutado",
        description: "Presupuesto, ejecutado, saldo y margen estimado por proyecto.",
      },
      {
        title: "Órdenes de compra",
        description: "Aprobá OC y materiales sin perder el rastro por obra.",
      },
      {
        title: "Cobros y alertas del día",
        description: "Cobros vencidos y pendientes que requieren atención hoy.",
      },
    ],
    highlight: {
      title: "ONVI en tu obra",
      description: "Qué proyectos se desvían de presupuesto y dónde apretar costos a tiempo.",
    },
  },
  {
    id: "restaurantes",
    name: "Restaurantes",
    detail: "Mesas · cocina · cobro",
    tone: "bg-rose-100 text-rose-800",
    panelTitle: "Panel Restaurantes centralizado",
    panelBody:
      "Pase de cocina, mesas y caja del turno — sabé qué pedido va atrasado antes de que se queje el cliente.",
    image: "/product/restaurantes-panel-hq.png",
    imageAlt: "Panel de Onvision Restaurante: pase de cocina y métricas del turno",
    imageWidth: 3024,
    imageHeight: 1720,
    preview: {
      greeting: "Servicio en vivo",
      metricLabel: "Mesas ocupadas",
      metricValue: "4 / 4",
      rows: [
        { label: "Órdenes abiertas", value: "4" },
        { label: "Atrasadas", value: "2" },
        { label: "Stock crítico", value: "8" },
      ],
    },
    specs: [
      {
        title: "Pase de cocina",
        description: "Mesas con tiempo en vivo: a tiempo, apurado o atrasado.",
      },
      {
        title: "POS y mesas",
        description: "Tomá la orden y pasala a cocina sin papel ni gritos.",
      },
      {
        title: "Caja del turno",
        description: "Estado de caja, facturas pendientes y atajos para cobrar.",
      },
      {
        title: "Stock crítico",
        description: "Productos bajo mínimo visibles antes de que se acabe el menú.",
      },
    ],
    highlight: {
      title: "ONVI en tu local",
      description: "Qué mesas se atrasan y dónde se te va el margen del turno.",
    },
  },
  {
    id: "clinicas",
    name: "Clínicas",
    detail: "Agenda · pacientes",
    tone: "bg-sky-100 text-sky-800",
    panelTitle: "Panel Clínicas centralizado",
    panelBody:
      "Agenda semanal, estados de cita y cobro programado — recepción ve el día completo de un vistazo.",
    image: "/product/clinicas-panel-hq.png",
    imageAlt: "Agenda de Onvision Salud: citas de la semana y estados de pacientes",
    imageWidth: 3024,
    imageHeight: 1718,
    preview: {
      greeting: "Agenda de la semana",
      metricLabel: "Citas programadas",
      metricValue: "3",
      rows: [
        { label: "Programado", value: "₡75.000" },
        { label: "En sala", value: "1" },
        { label: "Confirmadas", value: "1" },
      ],
    },
    specs: [
      {
        title: "Agenda día o semana",
        description: "Vista clara de citas libres, confirmadas o en sala.",
      },
      {
        title: "Estados de cita",
        description: "Programada, confirmada o en sala — sin llamadas cruzadas.",
      },
      {
        title: "Búsqueda de pacientes",
        description: "Encontrá al paciente y abrí la cita en segundos.",
      },
      {
        title: "Cobro programado",
        description: "Monto del día/semana a la vista antes de facturar.",
      },
    ],
    highlight: {
      title: "ONVI en tu clínica",
      description: "Huecos en agenda y citas que requieren seguimiento, sin Excel.",
    },
  },
  {
    id: "bienes-raices",
    name: "Inmobiliaria",
    detail: "Cartera · CRM",
    tone: "bg-violet-100 text-violet-800",
    panelTitle: "Panel Inmobiliaria centralizado",
    panelBody:
      "Ficha de propiedad, estado y agenda de visitas — cartera lista para cerrar y facturar.",
    image: "/product/inmobiliaria-panel-hq2.png",
    imageAlt: "Ficha de propiedad en Onvision Inmobiliaria: casa en Escazú",
    imageWidth: 3024,
    imageHeight: 1718,
    preview: {
      greeting: "Tu cartera hoy",
      metricLabel: "Precio",
      metricValue: "$395.000",
      rows: [
        { label: "Operación", value: "Venta" },
        { label: "Estado", value: "Disponible" },
        { label: "Zona", value: "Escazú" },
      ],
    },
    specs: [
      {
        title: "Ficha de propiedad",
        description: "Fotos, tipo, operación y agente en un solo detalle.",
      },
      {
        title: "Estados de cartera",
        description: "Disponible, alquiler o venta — sin perder el seguimiento.",
      },
      {
        title: "Agendar visita",
        description: "Programá visitas desde la ficha sin salir del flujo.",
      },
      {
        title: "Compartir e imprimir",
        description: "Mandá la ficha al cliente o imprimila en un clic.",
      },
    ],
    highlight: {
      title: "ONVI en tu agencia",
      description: "Qué leads enfrían y qué propiedades se mueven — para empujar lo que sí convierte.",
    },
  },
  {
    id: "abogados",
    name: "Abogados",
    detail: "Expedientes · plazos",
    tone: "",
    panelTitle: "",
    panelBody: "Expedientes, plazos hábiles y honorarios — protocolo y cartera en un solo panel.",
    imageAlt: "Panel de Onvision Legal",
    preview: {
      greeting: "Estudio hoy",
      metricLabel: "Plazos esta semana",
      metricValue: "6",
      rows: [
        { label: "Expedientes activos", value: "18" },
        { label: "Honorarios pendientes", value: "₡1,2M" },
        { label: "Vencen hoy", value: "2" },
      ],
    },
    specs: [],
    highlight: { title: "", description: "" },
  },
  {
    id: "ganaderia",
    name: "Ganadería",
    detail: "Lotes · ventas",
    tone: "",
    panelTitle: "",
    panelBody: "Cabezas por lote, tratamientos y ventas — con factura cuando cobrás.",
    imageAlt: "Panel de Onvision Ganadero",
    preview: {
      greeting: "Hacienda hoy",
      metricLabel: "Cabezas",
      metricValue: "214",
      rows: [
        { label: "Lotes activos", value: "4" },
        { label: "Tratamientos", value: "3" },
        { label: "Ventas del mes", value: "₡8,4M" },
      ],
    },
    specs: [],
    highlight: { title: "", description: "" },
  },
  {
    id: "agricultura",
    name: "Agricultura",
    detail: "Parcelas · cosechas",
    tone: "",
    panelTitle: "",
    panelBody: "Parcelas, costos por ciclo y ventas de cosecha con factura 4.4.",
    imageAlt: "Panel de Onvision Agrícola",
    preview: {
      greeting: "Ciclo actual",
      metricLabel: "Parcelas activas",
      metricValue: "7",
      rows: [
        { label: "Costo del ciclo", value: "₡2,1M" },
        { label: "Cosecha estimada", value: "12 t" },
        { label: "Insumos bajos", value: "2" },
      ],
    },
    specs: [],
    highlight: { title: "", description: "" },
  },
  {
    id: "talleres",
    name: "Talleres",
    detail: "Órdenes · repuestos",
    tone: "",
    panelTitle: "",
    panelBody: "Órdenes de trabajo, historial por placa y repuestos — del presupuesto a la factura.",
    imageAlt: "Panel de Onvision Taller",
    preview: {
      greeting: "Taller en vivo",
      metricLabel: "Órdenes abiertas",
      metricValue: "9",
      rows: [
        { label: "En espera de aprobación", value: "3" },
        { label: "Repuestos críticos", value: "5" },
        { label: "Entrega hoy", value: "2" },
      ],
    },
    specs: [],
    highlight: { title: "", description: "" },
  },
  {
    id: "personal",
    name: "Personal",
    detail: "Hogar · presupuesto",
    tone: "",
    panelTitle: "",
    panelBody: "Presupuesto, deudas y cuesta de enero — finanzas de la casa, sin factura electrónica.",
    imageAlt: "Panel de Onvision Personal",
    preview: {
      greeting: "Este mes",
      metricLabel: "Disponible",
      metricValue: "₡186.000",
      rows: [
        { label: "Presupuesto", value: "₡420.000" },
        { label: "Deudas", value: "₡95.000" },
        { label: "Meta enero", value: "64%" },
      ],
    },
    specs: [],
    highlight: { title: "", description: "" },
  },
];

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden>
      <path
        d={dir === "left" ? "M12.5 4.5 7 10l5.5 5.5" : "M7.5 4.5 13 10l-5.5 5.5"}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PanelPreview({ sector }: { sector: SectorSlide }) {
  if (sector.image) {
    return (
      <div className="relative aspect-[3024/1718] overflow-hidden rounded-2xl bg-white shadow-[0_24px_60px_-28px_rgba(15,23,42,0.45)] ring-1 ring-black/5">
        <Image
          src={sector.image}
          alt={sector.imageAlt}
          fill
          className="object-cover object-top"
          priority={sector.id === "retail"}
          quality={95}
          sizes="(max-width: 768px) 94vw, 1100px"
        />
      </div>
    );
  }

  const { preview } = sector;
  return (
    <div className="relative aspect-[3024/1718] overflow-hidden rounded-2xl bg-white shadow-[0_24px_60px_-28px_rgba(15,23,42,0.45)] ring-1 ring-black/5">
      <div className="flex h-full flex-col">
        <div className="flex items-center gap-1.5 border-b border-ov-line/80 bg-[#f4f7f8] px-3 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-2 truncate text-[11px] text-ov-muted">
            Onvision · {sector.name}
          </span>
        </div>
        <div className="grid flex-1 gap-3 p-5 sm:grid-cols-[1.1fr_0.9fr] sm:p-6">
          <div className="rounded-2xl bg-[#ecfeff] p-5 text-left">
            <p className="text-[10px] font-semibold tracking-[0.14em] text-ov-muted uppercase">
              {preview.greeting}
            </p>
            <p className="mt-2 font-display text-3xl font-bold tracking-tight text-ov-ink">
              {preview.metricValue}
            </p>
            <p className="mt-1 text-sm text-ov-muted">{preview.metricLabel}</p>
          </div>
          <div className="space-y-2.5">
            {preview.rows.map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between rounded-xl border border-ov-line/70 bg-ov-surface px-3.5 py-2.5 text-[13px]"
              >
                <span className="text-ov-muted">{row.label}</span>
                <span className="font-semibold text-ov-ink">{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CentralizedShowcase() {
  const [index, setIndex] = useState(0);
  const sector = SECTORS[index];
  const count = SECTORS.length;
  const vertical = VERTICAL_BY_ID[sector.id];

  function go(delta: number) {
    setIndex((current) => (current + delta + count) % count);
  }

  return (
    <section id="industrias-imagenes" className="relative scroll-mt-28 px-4 py-16 sm:px-6 md:px-8 md:py-24">
      <div className="relative z-10 mx-auto max-w-6xl text-center">
        <p className="mb-3 text-[11px] font-semibold tracking-[0.2em] text-cyan-300/80 uppercase">
          Por industria · Software para tu giro
        </p>

        <h2 className="font-display mx-auto max-w-3xl text-[1.75rem] leading-[1.12] font-bold tracking-tight text-white text-balance sm:text-4xl md:text-[2.6rem] md:leading-[1.1]">
          Todo su negocio centralizado según su industria
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/65 md:text-base">
          POS, inventario, caja y facturación electrónica — adaptado a tu giro,
          en una sola cuenta.
        </p>

        <div className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0" aria-hidden>
          {SECTORS.map(
            (s) =>
              s.image && (
                <Image
                  key={s.id}
                  src={s.image}
                  alt=""
                  width={s.imageWidth ?? 3024}
                  height={s.imageHeight ?? 1718}
                />
              ),
          )}
        </div>

        <div className="relative mx-auto mt-10 md:mt-14">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Sector anterior"
            className="absolute top-[42%] -left-1 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-white/10 text-white shadow-[0_10px_30px_-12px_rgba(0,0,0,0.55)] backdrop-blur transition hover:border-cyan-300/40 hover:text-cyan-200 sm:-left-3 md:-left-14"
          >
            <Chevron dir="left" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Sector siguiente"
            className="absolute top-[42%] -right-1 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-white/10 text-white shadow-[0_10px_30px_-12px_rgba(0,0,0,0.55)] backdrop-blur transition hover:border-cyan-300/40 hover:text-cyan-200 sm:-right-3 md:-right-14"
          >
            <Chevron dir="right" />
          </button>

          <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-[linear-gradient(155deg,rgba(8,145,178,0.16)_0%,rgba(17,24,32,0.92)_42%,rgba(10,15,20,0.96)_100%)] px-5 pt-7 pb-7 text-left sm:rounded-[2rem] sm:px-8 sm:pt-8 sm:pb-9 md:px-10 md:pt-9 md:pb-10">
            <div className="flex items-start justify-between gap-4">
              <div className="min-h-[5.5rem] max-w-2xl sm:min-h-[5.75rem] md:min-h-[6.25rem]">
                <h3 className="flex items-center gap-2.5 sm:gap-3">
                  {vertical ? (
                    <span className="text-cyan-300">
                      <SectorGlyph name={vertical.icon} plain size="mini" />
                    </span>
                  ) : null}
                  <span className="font-display line-clamp-1 text-xl font-bold tracking-tight text-cyan-300 drop-shadow-[0_0_12px_rgba(34,211,238,0.45)] sm:text-2xl md:text-[1.75rem]">
                    {sector.name}
                  </span>
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/60 md:text-[15px]">
                  {sector.panelBody}
                </p>
              </div>
              <p className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-cyan-200/80 tabular-nums backdrop-blur">
                {index + 1} / {count}
              </p>
            </div>

            <div className="relative mt-7 lg:mt-8">
              <div className="min-w-0 lg:pr-[4.75rem]">
                <PanelPreview sector={sector} />
              </div>

              <aside className="mt-4 flex flex-wrap justify-center gap-2 lg:absolute lg:top-4 lg:right-0 lg:z-10 lg:mt-0 lg:w-12 lg:flex-col lg:flex-nowrap lg:items-center lg:gap-2">
                {SECTORS.map((item, i) => {
                  const active = i === index;
                  const itemVertical = VERTICAL_BY_ID[item.id];
                  if (!itemVertical) return null;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setIndex(i)}
                      aria-label={item.name}
                      aria-pressed={active}
                      className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl border shadow-[0_14px_34px_-18px_rgba(0,0,0,0.55)] backdrop-blur-md transition-colors ${
                        active
                          ? "border-cyan-300/50 bg-white/15 text-cyan-300 ring-2 ring-cyan-400/25"
                          : "border-white/10 bg-white/5 text-white/65 hover:border-cyan-300/25 hover:bg-white/10 hover:text-cyan-200"
                      }`}
                    >
                      <SectorGlyph name={itemVertical.icon} plain size="mini" />
                    </button>
                  );
                })}
              </aside>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-5 grid gap-4 text-left sm:mt-6 lg:grid-cols-[minmax(0,1fr)_17.5rem] lg:items-stretch lg:gap-5">
          {vertical && (
            <article className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04] shadow-[0_16px_40px_-28px_rgb(0_0_0_/_0.55)]">
              <div className="grid h-full gap-0 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
                <div className="flex flex-col justify-between border-b border-white/10 bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent p-7 md:p-9 lg:border-r lg:border-b-0">
                  <div>
                    <div className="mb-5 flex items-center gap-4">
                      <SectorGlyph name={vertical.icon} />
                      <div>
                        <p className="mb-1 text-[11px] font-bold tracking-[0.18em] text-cyan-300 uppercase">
                          Vertical
                        </p>
                        <h3 className="font-display text-2xl font-bold tracking-tight text-white text-balance md:text-[1.75rem] md:leading-snug">
                          {vertical.name}
                        </h3>
                      </div>
                    </div>
                    <p className="mb-3 text-sm font-semibold text-cyan-200/90">
                      {vertical.subtitle}
                    </p>
                    <p className="text-[15px] leading-relaxed text-white/70 md:text-base md:leading-relaxed">
                      {vertical.pitch}
                    </p>
                  </div>

                  <a
                    href="/activar"
                    className="btn-teal mt-8 inline-flex w-full sm:w-auto"
                  >
                    Activar esta vertical
                  </a>
                </div>

                <div className="p-7 md:p-9">
                  <h4 className="font-display mb-4 text-sm font-bold tracking-wide text-white uppercase">
                    Cómo te ayuda Onvision
                  </h4>
                  <ul className="mb-8 space-y-3.5">
                    {vertical.helps.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-[15px] leading-relaxed text-white/60"
                      >
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <h4 className="font-display mb-3 text-sm font-bold tracking-wide text-white uppercase">
                    Módulos incluidos
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {vertical.features.map((f) => (
                      <span
                        key={f}
                        className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-1.5 text-xs font-semibold text-cyan-100"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          )}

          <article className="relative overflow-hidden rounded-[1.35rem] border border-white/10 bg-[linear-gradient(165deg,#060910_0%,#0a0f14_48%,#111820_100%)] p-5 text-white sm:p-6">
            <div
              className="pointer-events-none absolute -top-8 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(8,145,178,0.42),transparent_68%)] blur-2xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(ellipse_at_center,rgba(10,99,246,0.22),transparent_70%)]"
              aria-hidden
            />

            <div className="relative flex h-full min-h-[16rem] flex-col">
              <div className="mb-5 flex justify-end">
                <span className="grid h-8 w-8 place-items-center rounded-full border border-white/15 text-white/50">
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden>
                    <path
                      d="M4 12 12 4M6.5 4H12v5.5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>

              <div className="mx-auto flex flex-1 items-center justify-center py-2">
                <div className="relative grid h-24 w-24 place-items-center">
                  <span className="absolute inset-0 rounded-full border border-cyan-300/20" />
                  <span className="absolute inset-3 rounded-full border border-cyan-300/25" />
                  <span className="absolute inset-6 rounded-full border border-cyan-200/35 shadow-[0_0_48px_rgba(8,145,178,0.4)]" />
                  <svg viewBox="0 0 24 24" className="relative h-7 w-7 text-cyan-300" fill="none" aria-hidden>
                    <path
                      d="M12 3.5 13.2 8.2 18 9.5l-4.8 1.3L12 15.5l-1.2-4.7L6 9.5l4.8-1.3L12 3.5Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M18.5 14.5 19.1 16.7 21.5 17.5l-2.4.8-.6 2.2-.6-2.2-2.4-.8 2.4-.8.6-2.2Z"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              <div className="mt-auto pt-2">
                <h4 className="font-display text-lg font-bold tracking-tight">ONVI</h4>
                <p className="mt-1.5 text-[13px] leading-relaxed text-white/65">
                  Tu agente de IA personal para mejorar tu negocio
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
