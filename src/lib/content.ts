export const navLinks = [
  { label: "Cómo funciona", href: "#como-funciona" },
  { label: "Industrias", href: "#industrias" },
  { label: "Compará", href: "#comparativa" },
  { label: "Precios", href: "#precios" },
];

export const hero = {
  brand: "Onvision",
  line1: "El mismo núcleo. Un Software distinto",
  highlight: "para cada industria",
  line2:
    "Facturación electrónica 4.4, inventario y analíticas en el núcleo. Activá el software de tu industria y operá con un sistema hecho para Costa Rica — no adaptado después.",
  priceNote: "Desde ₡9,900 / mes · facturas ilimitadas · 15 días gratis",
  ctaPrimary: "Empieza gratis 15 días",
  ctaSecondary: "Ver industrias",
};

export const baseFeatures = [
  { name: "Facturación 4.4", detail: "ATV · Hacienda" },
  { name: "Inventario", detail: "Stock en tiempo real" },
  { name: "SINPE Móvil", detail: "Pagos nativos" },
  { name: "CRC / USD", detail: "Multi-moneda" },
  { name: "Reportes IVA", detail: "Básicos incluidos" },
];

export const appsIntro = {
  title: "Una base común. Módulos según tu giro.",
  body: "Todas las empresas comparten facturación electrónica, inventario y pagos. Encima se activan los módulos de tu industria — sin ERP pesado ni consultoría de meses.",
};

export const problems = [
  {
    title: "Facturación electrónica 4.4",
    description:
      "Obligatoria por Hacienda (ATV), compleja y que cambia seguido. Los softwares extranjeros tardan en actualizarse; los locales básicos se quedan cortos.",
  },
  {
    title: "CCSS, aguinaldo y liquidaciones",
    description:
      "Reglas laborales de Costa Rica que los SaaS internacionales no manejan bien. Terminás reconciliando a mano en Excel.",
  },
  {
    title: "Pagos en CRC y USD",
    description:
      "Operar en dos monedas es normal aquí. La mayoría de plataformas extranjeras lo gestiona mal o con atajos frágiles.",
  },
  {
    title: "SINPE Móvil dominante",
    description:
      "Es el método de pago del día a día en CR — y casi ningún software internacional lo integra de verdad desde el inicio.",
  },
];

export const howItWorks = [
  {
    step: "01",
    title: "Elegí tu industria",
    description:
      "Restaurante, constructora, bienes raíces, clínica, retail, ganadería, agricultura o taller. Activás la vertical que necesitás — el núcleo ya viene incluido.",
  },
  {
    step: "02",
    title: "Personalizá",
    description:
      "Logo, datos de la empresa, cédula jurídica, moneda preferida y preferencias de cobro. Sin implementaciones de 3 meses.",
  },
  {
    step: "03",
    title: "Empezá a facturar",
    description:
      "Emití facturas electrónicas, controlá inventario y cobrá con SINPE. Si cambiás de giro, cambiás de vertical sin migrar datos.",
  },
];

export const verticals = [
  {
    id: "restaurantes",
    name: "Restaurantes y relacionados",
    subtitle: "Bares, sodas, cafeterías, food trucks",
    icon: "restaurant" as const,
    features: [
      "POS táctil para mesas",
      "Menú y modificadores",
      "Comandas por cocina",
      "Cierre de caja y propinas",
      "IVA diferenciado (13% comida preparada)",
    ],
  },
  {
    id: "constructoras",
    name: "Constructoras",
    subtitle: "Obra civil y desarrollo",
    icon: "construction" as const,
    features: [
      "Avance de obra por etapas",
      "Cotizaciones y contratos de proyecto",
      "Materiales y subcontratistas",
      "Órdenes de compra",
    ],
  },
  {
    id: "bienes-raices",
    name: "Bienes raíces",
    subtitle: "Agencias e inmobiliarias",
    icon: "realestate" as const,
    features: [
      "Propiedades en cartera",
      "Seguimiento de clientes y leads",
      "Contratos de compraventa y alquiler",
      "Comisiones por agente",
    ],
  },
  {
    id: "clinicas",
    name: "Clínicas y sector médico",
    subtitle: "Médicos, dentistas, veterinarios, fisio",
    icon: "clinic" as const,
    features: [
      "Agendamiento de citas",
      "Expediente digital del paciente",
      "Cobros por consulta / procedimiento",
      "Historial clínico básico",
    ],
  },
  {
    id: "retail",
    name: "Retail",
    subtitle: "Tiendas, salones, ferreterías y más",
    icon: "retail" as const,
    features: [
      "POS con lector de código de barras",
      "Stock con alertas",
      "Gestión de proveedores",
      "Sub-categorías por tipo de tienda",
    ],
  },
  {
    id: "ganaderia",
    name: "Ganadería",
    subtitle: "Lotes, producción y ventas",
    icon: "livestock" as const,
    features: [
      "Registro de cabezas por lote",
      "Vacunas y tratamientos",
      "Gestión de ventas de ganado",
      "Reportes de producción",
    ],
  },
  {
    id: "agricultura",
    name: "Agricultura",
    subtitle: "Parcelas, ciclos y cosechas",
    icon: "agriculture" as const,
    features: [
      "Parcelas y cultivos",
      "Insumos y costos por ciclo",
      "Planificación de cosechas",
      "Ventas con factura electrónica",
    ],
  },
  {
    id: "talleres",
    name: "Talleres y servicios técnicos",
    subtitle: "Mecánica y equipo",
    icon: "workshop" as const,
    features: [
      "Órdenes de trabajo",
      "Historial por placa o serie",
      "Presupuestos y aprobaciones",
      "Inventario de repuestos",
    ],
  },
];

export const comparisonRows = [
  {
    label: "Precio base / mes",
    onvision: "₡9,900",
    alegra: "$10 (Pyme)",
    facturele: "~$5",
  },
  {
    label: "Límite de facturas",
    onvision: "Ilimitadas",
    alegra: "50 / mes",
    facturele: "Ilimitadas",
  },
  {
    label: "Verticales por industria",
    onvision: "8 verticales",
    alegra: "No",
    facturele: "No",
  },
  {
    label: "SINPE Móvil nativo",
    onvision: "Sí",
    alegra: "Limitado",
    facturele: "No",
  },
  {
    label: "Multi-moneda CRC / USD",
    onvision: "Nativo",
    alegra: "Parcial",
    facturele: "Básico",
  },
  {
    label: "Hecho para Hacienda CR",
    onvision: "Desde el diseño",
    alegra: "Adaptado",
    facturele: "Solo facturación",
  },
];

export const pricingTiers = [
  {
    id: "base",
    name: "Plan Base",
    subtitle: "Facturación ilimitada + inventario para todas las industrias",
    monthly: 9900,
    highlighted: false,
    features: [
      "Facturas electrónicas ilimitadas",
      "Inventario completo",
      "SINPE Móvil y multi-moneda",
      "Reportes básicos de IVA",
      "Sin módulos verticales",
    ],
  },
  {
    id: "vertical",
    name: "Plan Vertical",
    subtitle: "Base + módulos de la industria que elegís",
    monthly: 19900,
    highlighted: true,
    badge: "Más elegido",
    features: [
      "Todo lo del Plan Base",
      "Módulos de tu vertical",
      "POS / citas / órdenes según giro",
      "Soporte prioritario",
      "Sin cobros ocultos por usuario",
    ],
  },
  {
    id: "pro",
    name: "Plan Pro",
    subtitle: "Todo incluido para equipos en crecimiento",
    monthly: 34900,
    highlighted: false,
    features: [
      "Todo lo del Plan Vertical",
      "Múltiples usuarios incluidos",
      "Reportes avanzados",
      "Varias sedes o puntos de venta",
      "Onboarding guiado",
    ],
  },
];

export const valueProps = [
  {
    title: "Local primero",
    description:
      "Construido sobre Hacienda y CCSS — no adaptado después de un producto extranjero.",
  },
  {
    title: "Un login, muchas industrias",
    description:
      "Si cambiás de giro, cambiás de vertical sin migrar datos ni empezar de cero.",
  },
  {
    title: "Listo hoy",
    description:
      "No es consultoría ni ERP pesado. Entrá, configurá y facturá el mismo día.",
  },
  {
    title: "SINPE nativo",
    description:
      "El método de pago que ya usan tus clientes, integrado desde el día uno.",
  },
  {
    title: "Precio justo",
    description:
      "Facturas ilimitadas desde el plan más básico. Sin cobros ocultos.",
  },
  {
    title: "Verticalización real",
    description:
      "El diferenciador no es pelear por $5/mes: es un SaaS distinto por industria sobre el mismo núcleo.",
  },
];

export const waitlist = {
  title: "Empieza gratis 15 días",
  subtitle:
    "Sin tarjeta obligatoria. Contanos tu industria y te abrimos acceso. Onvision se adapta a tu empresa — no al revés.",
  benefits: [
    "Acceso al plan Vertical durante la prueba",
    "Onboarding en español para PYMEs",
    "Soporte por WhatsApp y correo",
  ],
};
