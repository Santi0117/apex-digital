import type { CountryId } from "@/lib/americas-countries";

export type Locale = "es" | "en";

export type ShowcaseCardCopy = {
  title: string;
  description: string;
  tabLabel: string;
  exampleUrl?: string;
};

export type PlanCardCopy = {
  name: string;
  tagline: string;
  price: string;
  unit?: string;
  priceOr?: string;
  priceAlt?: string;
  unitAlt?: string;
  priceFull?: string;
  features: string[];
  highlighted?: boolean;
};

export type PlanGroupCopy = {
  description: string;
  plans: PlanCardCopy[];
};

export type ChatRuleCopy = {
  keywords: string[];
  reply: string;
};

export type SiteCopy = {
  nav: {
    services: string;
    portfolio: string;
    plans: string;
    schedule: string;
    process: string;
    companies: string;
    contact: string;
    letsTalk: string;
  };
  lang: {
    es: string;
    en: string;
  };
  theme: {
    light: string;
    dark: string;
    enableDark: string;
    enableLight: string;
  };
  hero: {
    badge: string;
    title: string;
    titleAccent: string;
    description: string;
    pricePeriod: string;
    pricePlans: Array<{
      label: string;
      amount: string;
      amountAlt?: string;
    }>;
    priceNote: string;
    pills: string[];
    contactUs: string;
    scheduleCta: string;
    trustedCta: string;
    systemCta: string;
    systemCtaShort: string;
    menuOpen: string;
    menuClose: string;
    bgAlt: string;
  };
  marquee: {
    ariaLabel: string;
    items: string[];
  };
  blueprint: {
    ariaLabel: string;
    header: string;
    status: string;
    layers: {
      ui: {
        label: string;
        code: string;
        detail: string;
        metric: string;
        svgLabel: string;
      };
      pay: {
        label: string;
        code: string;
        detail: string;
        metric: string;
        svgLabel: string;
      };
      admin: {
        label: string;
        code: string;
        detail: string;
        metric: string;
        svgLabel: string;
      };
      data: {
        label: string;
        code: string;
        detail: string;
        metric: string;
        svgLabel: string;
      };
    };
    activeLabel: string;
    exploreLabel: string;
    footerLeft: string;
    footerRight: string;
  };
  services: {
    main: {
      label: string;
      title: string;
      examplesLabel: string;
      cards: ShowcaseCardCopy[];
      carouselPrev: string;
      carouselNext: string;
      carouselHint: string;
      viewExample: string;
      videoHint: string;
    };
    portfolioScroll: string;
  };
  portfolio: {
    label: string;
    title: string;
    description: string;
    screenshotAlt: string;
    problemLabel: string;
    solutionLabel: string;
    prevImage: string;
    nextImage: string;
    expandHint: string;
    closeLabel: string;
    cta: string;
    projects: Array<{
      category: string;
      title: string;
      problem: string;
      solution: string;
    }>;
  };
  scrollStack: {
    label: string;
    title: string;
    description: string;
    hint: string;
    closeLabel: string;
    expandHint: string;
    tapHint: string;
    prevLabel: string;
    nextLabel: string;
    visitSite: string;
    items: Array<{
      title: string;
      subtitle: string;
    }>;
  };
  payment: {
    success: {
      label: string;
      title: string;
      body: string;
      backPlans: string;
      contact: string;
    };
    cancelled: {
      label: string;
      title: string;
      body: string;
      backPlans: string;
      quote: string;
    };
  };
  monthlyPlans: {
    label: string;
    title: string;
    description: string;
    period: string;
    onceLabel: string;
    payCta: string;
    payMessage: string;
    note: string;
    mostChosen: string;
    groups: Array<{
      id: string;
      title: string;
      planIds: string[];
    }>;
    plans: Array<{
      id: string;
      name: string;
      tagline: string;
      price: string;
      priceAlt?: string;
      priceFull?: string;
      features: string[];
      highlighted?: boolean;
    }>;
  };
  plans: {
    label: string;
    title: string;
    description: string;
    period: string;
    onceLabel: string;
    tabs: {
      web: string;
      software: string;
      shop: string;
      mobile: string;
    };
    groups: {
      web: PlanGroupCopy;
      software: PlanGroupCopy;
      shop: PlanGroupCopy;
      mobile: PlanGroupCopy;
    };
    mostChosen: string;
    requestPlan: string;
    quoteCta: string;
    payMonthlyCta: string;
    onceAskPrefix: string;
    onceAskLink: string;
    paySheet: {
      title: string;
      categorySeparator: string;
      monthlyLabel: string;
      companyNameLabel: string;
      companyNamePlaceholder: string;
      note: string;
      continueCta: string;
      continueLoading: string;
      cancelCta: string;
      closeAria: string;
      errorGeneric: string;
      payMessage: string;
    };
    customQuotePrefix: string;
    customQuoteLink: string;
  };
  process: {
    label: string;
    title: string;
    description: string;
    stepPrefix: string;
    steps: Array<{
      number: string;
      title: string;
      description: string;
    }>;
    readyPrefix: string;
    writeMe: string;
  };
  faq: {
    label: string;
    title: string;
    description: string;
    itemPrefix: string;
    items: Array<{
      question: string;
      answer: string;
      groups?: Array<{
        title: string;
        points: string[];
      }>;
    }>;
    footerText: string;
    footerCta: string;
  };
  coverage: {
    label: string;
    title: string;
    description: string;
    mapAria: string;
    mapHint: string;
    countryLabel: string;
    countryAriaPrefix: string;
    capitalPrefix: string;
    stats: {
      businessesLabel: string;
      pymesSuffix: string;
      zoneLabel: string;
      servicesLabel: string;
    };
    consultCta: string;
    countries: Record<
      CountryId,
      {
        name: string;
        capital: string;
        highlight: string;
        services: string;
      }
    >;
  };
  booking: {
    label: string;
    title: string;
    description: string;
    prevMonth: string;
    nextMonth: string;
    availabilityNote: string;
    selectDayPrompt: string;
    selectedDateLabel: string;
    availableTimesLabel: string;
    timePeriodMorning: string;
    timePeriodAfternoon: string;
    timePeriodEvening: string;
    confirmPrefix: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    phonePlaceholder: string;
    phoneLabel: string;
    notesPlaceholder: string;
    modalityLabel: string;
    modalityVirtual: string;
    modalityInPerson: string;
    locationLabel: string;
    locationPlaceholder: string;
    confirmButton: string;
    loadingButton: string;
    successTitle: string;
    successMessage: string;
    successDateLabel: string;
    successTimeLabel: string;
    successModalityLabel: string;
    errorBooking: string;
    errorConnection: string;
  };
  contact: {
    label: string;
    title: string;
    description: string;
    emailLabel: string;
    emailPlaceholder: string;
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    serviceLabel: string;
    servicePlaceholder: string;
    serviceOptions: string[];
    interestLabel: string;
    interestPlaceholder: string;
    budgetLabel: string;
    budgetPlaceholder: string;
    budgetOptions: string[];
    submitButton: string;
    loadingButton: string;
    errorSubmit: string;
    errorConnection: string;
  };
  assistant: {
    label: string;
    title: string;
    description: string;
    virtualAssistant: string;
    onlineNow: string;
    placeholder: string;
    send: string;
    thinking: string;
    errorGeneric: string;
    errorSend: string;
    welcome: string;
    emailDirect: string;
    quickReplies: string[];
    chatRules: ChatRuleCopy[];
    defaultReply: string;
  };
  footer: {
    tagline: string;
  };
  whatsapp: {
    ariaLabel: string;
  };
  site: {
    region: string;
  };
  trustedCompanies: {
    label: string;
    title: string;
    description: string;
    note: string;
    backHome: string;
    emailLabel: string;
    phoneLabel: string;
    whatsappLabel: string;
    instagramLabel: string;
    webLabel: string;
    showMap: string;
    hideMap: string;
    openMaps: string;
    highlightsTitle: string;
    visitSite: string;
    ctaTitle: string;
    ctaBody: string;
    clientsStat: string;
    filterBusinessType: string;
    filterProvince: string;
    allBusinessTypes: string;
    allProvinces: string;
    clearFilters: string;
    showingResults: string;
    noResults: string;
    filterHint: string;
    closeFilter: string;
    categories: {
      restaurant: string;
      store: string;
      clinic: string;
      education: string;
      automotive: string;
      agriculture: string;
      corporate: string;
    };
    projectTypes: {
      website: string;
      ecommerce: string;
      software: string;
    };
    provinces: {
      "san-jose": string;
      heredia: string;
      cartago: string;
      alajuela: string;
      guanacaste: string;
      usa: string;
    };
  };
};

const es: SiteCopy = {
  nav: {
    services: "Servicios",
    portfolio: "Portafolio",
    plans: "Planes",
    schedule: "Agendar",
    process: "Proceso",
    companies: "Empresas",
    contact: "Contacto",
    letsTalk: "Hablemos",
  },
  lang: {
    es: "Español",
    en: "English",
  },
  theme: {
    light: "CL",
    dark: "OS",
    enableDark: "Activar modo oscuro",
    enableLight: "Activar modo claro",
  },
  hero: {
    badge: "Disponible para proyectos",
    title: "Digitalización personalizada",
    titleAccent: "por mensualidad",
    description:
      "Diseñamos e implementamos soluciones tecnológicas personalizadas que impulsan la eficiencia, el crecimiento y la transformación digital de empresas y negocios.",
    pricePeriod: "/ mes",
    pricePlans: [
      { label: "Página estándar", amount: "$35", amountAlt: "₡15.000" },
      { label: "Página Pro", amount: "$55", amountAlt: "₡25.000" },
      { label: "E-commerce estándar", amount: "$50", amountAlt: "₡22.000" },
      { label: "E-commerce Pro", amount: "$65", amountAlt: "₡30.000" },
      { label: "App móvil", amount: "$150" },
      { label: "Software SaaS", amount: "$130" },
    ],
    priceNote: "Precios mensuales en USD. Diseño a tu medida y soporte incluidos.",
    pills: ["Sitios web", "E-commerce", "Software (SaaS)", "App móvil"],
    contactUs: "Contáctanos",
    scheduleCta: "Agendar reunión",
    trustedCta: "Empresas que confiaron en Onvision",
    systemCta: "Sistema Onvision para empresas",
    systemCtaShort: "Sistema Onvision",
    menuOpen: "Abrir menú",
    menuClose: "Cerrar menú",
    bgAlt: "Fondo hero",
  },
  marquee: {
    ariaLabel: "Servicios de Onvision Digital",
    items: [
      "Sitios web",
      "E-commerce",
      "Software SaaS",
      "App móvil",
      "Mantenimiento",
      "Landing pages",
      "SEO & posicionamiento",
      "Pasarelas de pago",
      "Panel admin",
      "Integraciones API",
    ],
  },
  blueprint: {
    ariaLabel: "Blueprint interactivo de capas del proyecto",
    header: "Blueprint · en vivo",
    status: "Trazando",
    layers: {
      ui: {
        label: "Interfaz",
        code: "LYR-01",
        detail: "Layout, tipografía y experiencia de usuario",
        metric: "marca · confianza",
        svgLabel: "hero · CTA · media",
      },
      pay: {
        label: "Pagos",
        code: "LYR-02",
        detail: "Checkout, carrito y pasarela segura",
        metric: "ventas · conversión",
        svgLabel: "catálogo · checkout · carrito",
      },
      admin: {
        label: "Panel",
        code: "LYR-03",
        detail: "Admin, roles y flujos de negocio",
        metric: "control · operación",
        svgLabel: "sidebar · tablas · roles",
      },
      data: {
        label: "Datos",
        code: "LYR-04",
        detail: "Base de datos, API y sincronización",
        metric: "escala · estabilidad",
        svgLabel: "postgres · sync · backups",
      },
    },
    activeLabel: " · activa",
    exploreLabel: " · ver capa →",
    footerLeft: "Next.js · PostgreSQL · Stripe",
    footerRight: "plano maestro",
  },
  services: {
    main: {
      label: "Lo que hacemos · servicios principales",
      title: "Todo lo que te imagines para tu negocio, lo podemos hacer realidad",
      examplesLabel: "Algunos ejemplos:",
      carouselPrev: "Imagen anterior",
      carouselNext: "Imagen siguiente",
      carouselHint: "Tocá para ver más capturas →",
      viewExample: "Ver ejemplo en vivo",
      videoHint: "Tocá para ampliar el demo en video →",
      cards: [
        {
          tabLabel: "Sitios web",
          title: "Páginas web modernas que hacen que tu negocio destaque digitalmente",
          description:
            "Incluye chatbots 100% inteligentes con IA, mapas interactivos, formularios con base de datos, calendarios y todo lo que necesitás para convertir visitas en clientes.",
        },
        {
          tabLabel: "E-commerce",
          title: "Tienda online (e-commerce)",
          description:
            "Catálogo, carrito, pagos online y panel admin. Con utilidades que las hacen únicas y personalizables: filtros por equipo, armador de outfits, jerseys a medida y más.",
        },
        {
          tabLabel: "SaaS",
          title: "Software de gestión de empresa a medida.",
          description:
            "Panel de control con ventas, inventario, clientes y comprobantes listos para Hacienda. También incluye manejo de rutas de distribución, analíticas y todo lo que tu operación necesite.",
        },
        {
          tabLabel: "App móvil",
          title: "App móvil a medida compatible con iOS y Android",
          description:
            "Apps de salud y bienestar, cuidado de mascotas, registro de usuarios, notificaciones push, diseño UI/UX personalizado y publicación en App Store y Google Play.",
        },
      ],
    },
    portfolioScroll: "Ver planes",
  },
  portfolio: {
    label: "Casos",
    title: "Algunos de los proyectos que ya están en producción",
    description:
      "Elegí un caso, recorré las pantallas y mirá el problema que resolvimos y cómo lo construimos.",
    screenshotAlt: "Captura del proyecto ",
    problemLabel: "Problema",
    solutionLabel: "Solución",
    prevImage: "Imagen anterior",
    nextImage: "Imagen siguiente",
    expandHint: "Tocá para ampliar",
    closeLabel: "Cerrar",
    cta: "Agendar reunión",
    projects: [
      {
        category: "Software SaaS",
        title: "ClinicOS — Sistema de gestión clínica",
        problem:
          "Secretaría manual y operaciones divididas por sector y doctor: calendarios, inventario, finanzas y pacientes en procesos separados, con poca visibilidad conjunta.",
        solution:
          "Plataforma unificada con dashboard, agenda, pacientes, inventario, finanzas y alertas en tiempo real para toda la clínica en un solo sistema.",
      },
      {
        category: "Inmobiliaria / Web",
        title: "Jopa Real Estate — Catálogo premium",
        problem:
          "Agencia inmobiliaria que necesitaba un catálogo online profesional y con alcance, más funciones propias personalizadas de financiamiento, formularios y captación de leads.",
        solution:
          "Sitio premium con búsqueda de propiedades, fichas con galería, calculadora de hipotecas por banco, formularios y CTAs para visitar, construir o vender.",
      },
      {
        category: "EdTech / SaaS",
        title: "UniLearn — Plataforma académica",
        problem:
          "Una universidad necesitaba salir de LMS genéricos: poca visibilidad en vivo para admin y docentes, y una experiencia poco útil para estudiantes (entregas, foco y ritmo del cuatrimestre).",
        solution:
          "Plataforma a medida con roles (admin, docente, estudiante), métricas y analíticas en vivo, calendario académico, modo enfoque tipo sprint y publicación rápida de material, tareas, quizzes y foros por semana.",
      },
      {
        category: "E-commerce / Moda",
        title: "FirstDown — Tienda de jerseys",
        problem:
          "Tienda de jerseys que necesitaba vender online con catálogo por liga y equipo, piezas personalizables y una experiencia de compra clara en colones, sin perder el vibe de marca.",
        solution:
          "E-commerce a medida con filtros MLB/NBA/NFL, catálogo por equipo, armá tu look (camiseta + pantalón), badges de stock/ofertas y carrito para solicitar pedidos con envío gratis.",
      },
    ],
  },
  scrollStack: {
    label: "Portafolio",
    title: "Proyectos en detalle",
    description:
      "Capturas de sitios web, tiendas online y sistemas a medida desarrollados para empresas en Costa Rica y el exterior.",
    hint: "Desplázate para recorrer · Flechas para cambiar pantalla",
    closeLabel: "Cerrar",
    expandHint: "Ampliar",
    tapHint: "Clic para ampliar",
    prevLabel: "Pantalla anterior",
    nextLabel: "Pantalla siguiente",
    visitSite: "Visitar sitio web",
    items: [
      {
        title: "Página estándar",
        subtitle: "Sitio corporativo a medida",
      },
      {
        title: "Página Pro",
        subtitle: "Sitios con herramientas a medida",
      },
      {
        title: "E-commerce",
        subtitle: "Catálogo, carrito y checkout",
      },
      {
        title: "Software SaaS",
        subtitle: "Sistemas a medida como ClinicOS y UniLearn",
      },
      {
        title: "App móvil",
        subtitle: "iOS y Android a medida",
      },
    ],
  },
  payment: {
    success: {
      label: "Pago",
      title: "Gracias — recibimos tu pago",
      body: "Si acabás de completar el checkout de Onvo, tu mensualidad quedó registrada. Te contactamos pronto para activar o continuar el proyecto.",
      backPlans: "Volver a planes",
      contact: "Contacto",
    },
    cancelled: {
      label: "Pago",
      title: "Pago cancelado",
      body: "No se cobró nada. Podés volver a planes e intentarlo de nuevo cuando quieras.",
      backPlans: "Volver a planes",
      quote: "Cotizar / preguntar",
    },
  },
  monthlyPlans: {
    label: "Planes",
    title: "Qué incluye cada mensualidad",
    description:
      "Elegí el plan que mejor se adapta a tu negocio. Diseño a medida, hosting y soporte van incluidos en la mensualidad.",
    period: "/ mes",
    onceLabel: "pago único",
    payCta: "Pagar plan",
    payMessage:
      "Hola, quiero pagar el plan {name} ({price}/mes) de Onvision Digital.",
    note: "Al tocar pagar te abrimos WhatsApp para confirmar el plan y enviarte el link de pago.",
    mostChosen: "Más elegido",
    groups: [
      {
        id: "paginas",
        title: "Páginas",
        planIds: ["pagina-estandar", "pagina-pro"],
      },
      {
        id: "ecommerce",
        title: "E-commerce",
        planIds: ["ecom-estandar", "ecom-pro"],
      },
      {
        id: "productos",
        title: "App y software",
        planIds: ["app-movil", "software-saas"],
      },
    ],
    plans: [
      {
        id: "pagina-estandar",
        name: "Página estándar",
        tagline: "Presencia clara y profesional.",
        price: "$35",
        priceAlt: "₡15.000",
        priceFull: "$450",
        features: [
          "Landing o sitio de 1–3 secciones",
          "Diseño responsive a tu marca",
          "Formulario o WhatsApp de contacto",
          "Chatbot IA para tu empresa",
          "Hosting y dominio configurado",
          "SEO on-page",
          "Soporte y ajustes menores incluidos",
        ],
      },
      {
        id: "pagina-pro",
        name: "Página Pro",
        tagline: "Sitios con herramientas a medida.",
        price: "$55",
        priceAlt: "₡25.000",
        priceFull: "$650",
        highlighted: true,
        features: [
          "Sitio multipágina a medida",
          "Herramientas (reservas, calculadoras, filtros)",
          "Chatbot IA para tu empresa",
          "Animaciones e interacciones premium",
          "Integración WhatsApp y analytics",
          "SEO on-page",
          "Hosting y dominio configurado",
          "Soporte prioritario y actualizaciones",
        ],
      },
      {
        id: "ecom-estandar",
        name: "E-commerce estándar",
        tagline: "Catálogo listo para vender.",
        price: "$50",
        priceAlt: "₡22.000",
        priceFull: "$650",
        features: [
          "Catálogo de productos con filtros",
          "Pedidos por WhatsApp o carrito simple",
          "Método de pago: tarjeta, pasarela, SINPE o transferencia",
          "Diseño mobile-first a tu marca",
          "Panel básico para actualizar stock/precios",
          "SEO para e-commerce",
          "Hosting, SSL y soporte mensual",
          "Optimización de velocidad",
          "1 ronda de revisiones",
        ],
      },
      {
        id: "ecom-pro",
        name: "E-commerce Pro",
        tagline: "Tienda completa con checkout.",
        price: "$65",
        priceAlt: "₡30.000",
        priceFull: "$850",
        features: [
          "Catálogo, carrito y checkout",
          "Método de pago: tarjeta, pasarela, SINPE o transferencia",
          "Features a medida (outfits, ligas, personalización)",
          "Panel admin de pedidos e inventario",
          "SEO para e-commerce",
          "Analytics y seguimiento de conversión",
          "Soporte prioritario y mejoras mensuales",
          "2 rondas de revisiones",
        ],
      },
      {
        id: "app-movil",
        name: "App móvil",
        tagline: "Producto nativo para tu operación.",
        price: "$150",
        priceFull: "$1.500",
        features: [
          "App iOS/Android o PWA a medida",
          "UI moderna con flujos de negocio",
          "Notificaciones y sincronización",
          "Panel o backend asociado",
          "Publicación y mantenimiento",
          "Soporte y actualizaciones mensuales",
        ],
      },
      {
        id: "software-saas",
        name: "Software SaaS",
        tagline: "Sistemas como ClinicOS, UniLearn o Sistema Gan.",
        price: "$130",
        priceFull: "$1.650",
        features: [
          "App web con autenticación y roles",
          "Panel admin y dashboards",
          "Base de datos e integraciones",
          "Módulos a medida de tu operación",
          "Hosting, backups y monitoreo",
          "Soporte prioritario y evolución del producto",
        ],
      },
    ],
  },
  plans: {
    label: "Planes y precios",
    title: "Planes base claros, adaptados a tu necesidad",
    description:
      "Paquetes de referencia para web, e-commerce, software SaaS y apps móviles. En el sitio pagás la mensualidad; el pago único se coordina aparte.",
    period: "/ mes",
    onceLabel: "pago único",
    tabs: {
      web: "Sitios web",
      software: "Software",
      shop: "Tienda online",
      mobile: "App móvil",
    },
    groups: {
      web: {
        description:
          "Presencia digital y sitios corporativos. Pagá la mensualidad acá; el pago único se coordina aparte.",
        plans: [
          {
            name: "Página estándar",
            tagline: "Presencia clara y profesional.",
            price: "$35",
            priceAlt: "₡15.000",
            priceFull: "$450",
            features: [
              "Landing o sitio de 1–3 secciones",
              "Diseño responsive mobile-first a tu marca",
              "Formulario de contacto + redes sociales",
              "Integración WhatsApp para consultas",
              "Chatbot IA para tu empresa",
              "Animaciones e interacciones personalizadas",
              "SEO on-page",
              "Hosting y dominio configurado",
              "Optimización de velocidad",
              "Despliegue incluido",
              "Soporte y ajustes menores incluidos en la mensualidad",
            ],
          },
          {
            name: "Página Pro",
            tagline: "Sitios con herramientas a medida.",
            price: "$55",
            priceAlt: "₡25.000",
            priceFull: "$650",
            highlighted: true,
            features: [
              "Sitio multipágina a medida",
              "Herramientas (reservas, calculadoras, filtros, mapas)",
              "Chatbot IA para tu empresa",
              "Animaciones e interacciones premium",
              "Blog o gestor de contenido básico",
              "Analytics e integración de formularios",
              "SEO on-page",
              "Integración WhatsApp y redes sociales",
              "Optimización orientada a conversión",
              "Hosting y dominio configurado",
              "Optimización de velocidad",
              "Despliegue incluido",
              "Capacitación básica de uso",
              "Soporte prioritario y actualizaciones mensuales",
            ],
          },
        ],
      },
      software: {
        description:
          "Sistemas como ClinicOS, UniLearn o Sistema Gan. Mensualidad acá; pago único o alcance a medida por cotización.",
        plans: [
          {
            name: "Software SaaS",
            tagline: "Infraestructura completa de gestión según tu negocio.",
            price: "$130",
            priceFull: "$1.650",
            highlighted: true,
            features: [
              "App web con autenticación y base de datos",
              "Panel de administrador personalizado",
              "Roles, permisos e integraciones externas",
              "Módulos a medida (ventas, inventario, clientes, rutas, etc.)",
              "Dashboards y reportes exportables",
              "Arquitectura escalable en la nube",
              "Pasarela de pagos (si aplica)",
              "Notificaciones por email y en app",
              "Seguridad reforzada (cifrado y headers)",
              "Hosting, backups automáticos y monitoreo de uptime",
              "Entrega, capacitación y documentación técnica",
              "Soporte prioritario y evolución continua del producto",
            ],
          },
        ],
      },
      shop: {
        description:
          "Catálogos y tiendas online. Pagá la mensualidad acá; el pago único se coordina aparte.",
        plans: [
          {
            name: "E-commerce estándar",
            tagline: "Catálogo listo para vender.",
            price: "$50",
            priceAlt: "₡22.000",
            priceFull: "$650",
            features: [
              "Catálogo de productos con filtros",
              "Pedidos por WhatsApp o carrito simple",
              "Método de pago: tarjeta, pasarela, SINPE o transferencia",
              "Diseño mobile-first a tu marca",
              "Panel básico para actualizar stock y precios",
              "Fichas de producto con galería",
              "SEO para e-commerce",
              "Notificaciones de pedidos por email o WhatsApp",
              "Hosting, SSL y soporte mensual",
              "Optimización de velocidad",
              "Despliegue incluido",
              "1 ronda de revisiones",
            ],
          },
          {
            name: "E-commerce Pro",
            tagline: "Tienda completa con checkout.",
            price: "$65",
            priceAlt: "₡30.000",
            priceFull: "$850",
            highlighted: true,
            features: [
              "Catálogo ilimitado con filtros y variantes",
              "Carrito y checkout optimizado para conversión",
              "Método de pago: tarjeta, pasarela, SINPE o transferencia",
              "Features a medida (outfits, ligas, personalización)",
              "Panel admin de pedidos, inventario y cupones",
              "Reportes de ventas y analytics",
              "SEO para e-commerce",
              "Integración WhatsApp para pedidos",
              "Hosting, SSL y monitoreo incluidos",
              "2 rondas de revisiones",
              "Capacitación para gestionar la tienda",
              "Soporte prioritario y mejoras mensuales",
            ],
          },
        ],
      },
      mobile: {
        description:
          "App iOS/Android o PWA a medida. Pagá la mensualidad acá; el pago único se coordina aparte.",
        plans: [
          {
            name: "App móvil",
            tagline: "Producto nativo para tu operación.",
            price: "$150",
            priceFull: "$1.500",
            highlighted: true,
            features: [
              "App nativa cross-platform (iOS + Android) o PWA",
              "Diseño UI/UX mobile-first personalizado",
              "Login, registro y recuperación de contraseña",
              "Flujos de negocio a medida para tu operación",
              "Notificaciones push",
              "Modo offline y sincronización de datos",
              "Integración con API / backend o panel admin",
              "Pagos in-app y suscripciones (si aplica)",
              "Publicación asistida en App Store y Google Play",
              "Analytics, métricas de uso y reporte de errores",
              "Deep links y compartir contenido",
              "Capacitación, documentación y soporte mensual",
            ],
          },
        ],
      },
    },
    mostChosen: "Más elegido",
    requestPlan: "Solicitar este plan",
    quoteCta: "Cotizar / preguntar",
    payMonthlyCta: "Pagar mensualidad",
    onceAskPrefix: "¿Preferís pago único?",
    onceAskLink: "Consultanos",
    paySheet: {
      title: "Confirmar mensualidad",
      categorySeparator: " · ",
      monthlyLabel: "Mensualidad",
      companyNameLabel: "Nombre del negocio o sitio",
      companyNamePlaceholder: "Ej. La Pacífica, Jopa Autos…",
      note: "Vas a pagar la mensualidad con Onvo (tarjeta, SINPE y más). El pago único se coordina aparte.",
      continueCta: "Continuar al pago",
      continueLoading: "Abriendo pago…",
      cancelCta: "Cancelar",
      closeAria: "Cerrar",
      errorGeneric: "No se pudo abrir el pago. Probá de nuevo o escribinos por WhatsApp.",
      payMessage:
        "Hola, quiero pagar la mensualidad del plan {name} ({price}/mes) de Onvision Digital.",
    },
    customQuotePrefix:
      "¿Necesitás un SaaS a medida o un proyecto con integraciones complejas? ",
    customQuoteLink: "Solicitá cotización personalizada →",
  },
  process: {
    label: "Proceso",
    title: "¿Cómo trabajamos juntos?",
    description:
      "Un proceso claro para que sepás exactamente qué esperar en cada etapa.",
    stepPrefix: "Paso ",
    steps: [
      {
        number: "01",
        title: "Llamada de descubrimiento",
        description:
          "Entendemos tu negocio, objetivos y qué necesita tu sitio para funcionar.",
      },
      {
        number: "02",
        title: "Propuesta y presupuesto",
        description:
          "Recibís un documento con alcance, tiempos y precio. Sin sorpresas después.",
      },
      {
        number: "03",
        title: "Diseño y desarrollo",
        description:
          "Construimos tu proyecto con revisiones cada semana para que siempre estés al tanto.",
      },
      {
        number: "04",
        title: "Entrega y soporte",
        description:
          "Publicamos y te enseñamos a usarlo. Quedamos disponible para soporte post-lanzamiento.",
      },
    ],
    readyPrefix: "¿Listo para empezar? ",
    writeMe: "Escríbeme",
  },
  faq: {
    label: "Preguntas frecuentes",
    title: "Lo que se pregunta todo el mundo antes de empezar",
    description:
      "Las dudas más comunes sobre la mensualidad, el dominio y qué pasa si querés parar.",
    itemPrefix: "FAQ-",
    items: [
      {
        question: "¿El sitio es mío o de ustedes?",
        answer:
          "Tuyo. Con el pago único queda a tu nombre desde que se entrega. Con la mensualidad también es tuyo, mientras la mensualidad esté al día.",
      },
      {
        question:
          "Si elegís la mensualidad, ¿cuál es el mínimo antes de poder cancelar?",
        answer:
          "El tiempo mínimo son 4 meses. Después de eso podés cancelar en cualquier momento, e incluso pedir la devolución de esa mensualidad si la usaste menos de la mitad del mes.",
      },
      {
        question: "¿Qué pasa si cancelo o me atraso con el pago?",
        answer:
          "Tenés 5 días para ponerte al día antes de que se desactiven la página y los demás servicios. Tené en cuenta que la mensualidad no cubre solo la página web: incluye el mantenimiento, el pago del servicio de IA y tu espacio promocional en nuestro sitio.",
      },
      {
        question: "¿Qué cubre exactamente el soporte incluido?",
        answer:
          "La mensualidad cubre dos cosas distintas. Por un lado, cambios sobre el sitio, que coordinamos según lo que vaya necesitando tu negocio:",
        groups: [
          {
            title: "Cambios sobre el sitio",
            points: [
              "Cambios de diseño y estructura según las necesidades del negocio.",
              "Creación y adición de nuevas secciones dentro de la página.",
              "Actualización de contenido, imágenes y elementos visuales.",
            ],
          },
          {
            title: "Y de forma ilimitada",
            points: [
              "Mantenimiento técnico y solución de errores o fallos que puedan presentarse.",
              "Atención ante posibles ataques cibernéticos o problemas de seguridad de la página.",
              "Supervisión general para mantener la página funcionando correctamente.",
            ],
          },
        ],
      },
      {
        question: "¿A nombre de quién queda el dominio?",
        answer:
          "El dominio lo comprás vos y queda a tu nombre. Ronda los $11 al año (unos ₡5.000 colones). Nosotros lo dejamos comprado, configurado y apuntando a tu sitio.",
      },
      {
        question: "¿Cuánto tarda desde que pago?",
        answer:
          "Depende bastante de qué tan rápido fluya la información de tu lado, porque el sitio es 100% personalizado. El tiempo promedio es de una semana: la idea es entregar de forma eficiente, sin bajarle a la calidad.",
      },
      {
        question: "Ya tengo página, ¿la pueden migrar?",
        answer:
          "Sí, y sin ningún costo adicional.",
      },
      {
        question: "¿Por qué mensualidad y no un solo pago?",
        answer:
          "La mensualidad se añadió para darle la oportunidad a los negocios de tener un servicio digital de manera más accesible. Aun así, podés elegir la que te sirva: el pago único aparece en cada plan.",
      },
    ],
    footerText: "¿Te quedó otra duda? ",
    footerCta: "Escribinos",
  },
  coverage: {
    label: "Cobertura",
    title: "Trabajamos en toda América",
    description:
      "Seleccioná un país en el mapa para conocer más sobre la cobertura y servicios disponibles en cada región.",
    mapAria: "Mapa interactivo de América por países",
    mapHint: "Tocá o pasá el cursor sobre un país",
    countryLabel: "País",
    countryAriaPrefix: "País: ",
    capitalPrefix: "Capital: ",
    stats: {
      businessesLabel: "Mercado estimado",
      pymesSuffix: "habitantes.",
      zoneLabel: "Zona",
      servicesLabel: "Servicios frecuentes",
    },
    consultCta: "Consultar disponibilidad →",
    countries: {
      CA: {
        name: "Canadá",
        capital: "Ottawa",
        highlight: "Norteamérica · inglés y francés",
        services: "Sitios corporativos, SaaS",
      },
      US: {
        name: "Estados Unidos",
        capital: "Washington D.C.",
        highlight: "Mercado digital maduro",
        services: "E-commerce, software a medida",
      },
      MX: {
        name: "México",
        capital: "Ciudad de México",
        highlight: "Hub de LatAm norte",
        services: "Tiendas online, apps web",
      },
      GT: {
        name: "Guatemala",
        capital: "Ciudad de Guatemala",
        highlight: "Centroamérica",
        services: "Sitios web, e-commerce",
      },
      BZ: {
        name: "Belice",
        capital: "Belmopán",
        highlight: "Caribe centroamericano",
        services: "Landing pages, reservas",
      },
      HN: {
        name: "Honduras",
        capital: "Tegucigalpa",
        highlight: "Centroamérica",
        services: "Sitios corporativos, catálogos",
      },
      SV: {
        name: "El Salvador",
        capital: "San Salvador",
        highlight: "Centroamérica",
        services: "E-commerce, landing pages",
      },
      NI: {
        name: "Nicaragua",
        capital: "Managua",
        highlight: "Centroamérica",
        services: "Sitios web, formularios",
      },
      CR: {
        name: "Costa Rica",
        capital: "San José",
        highlight: "Base de operaciones · Valle Central",
        services: "Proyectos full-stack, SaaS, e-commerce",
      },
      PA: {
        name: "Panamá",
        capital: "Ciudad de Panamá",
        highlight: "Hub logístico y financiero",
        services: "Sitios corporativos, software",
      },
      CU: {
        name: "Cuba",
        capital: "La Habana",
        highlight: "Caribe",
        services: "Sitios web, portafolios",
      },
      DO: {
        name: "Rep. Dominicana",
        capital: "Santo Domingo",
        highlight: "Caribe",
        services: "E-commerce, turismo digital",
      },
      HT: {
        name: "Haití",
        capital: "Puerto Príncipe",
        highlight: "Caribe",
        services: "Sitios web, landing pages",
      },
      JM: {
        name: "Jamaica",
        capital: "Kingston",
        highlight: "Caribe anglófono",
        services: "Sitios web, reservas",
      },
      CO: {
        name: "Colombia",
        capital: "Bogotá",
        highlight: "Andes · mercado en crecimiento",
        services: "E-commerce, apps SaaS",
      },
      VE: {
        name: "Venezuela",
        capital: "Caracas",
        highlight: "Norte de Sudamérica",
        services: "Sitios web, catálogos",
      },
      GY: {
        name: "Guyana",
        capital: "Georgetown",
        highlight: "Escudo guayanés",
        services: "Landing pages, sitios corporativos",
      },
      SR: {
        name: "Surinam",
        capital: "Paramaribo",
        highlight: "Escudo guayanés",
        services: "Sitios web, portafolios",
      },
      EC: {
        name: "Ecuador",
        capital: "Quito",
        highlight: "Pacífico andino",
        services: "E-commerce, sitios web",
      },
      PE: {
        name: "Perú",
        capital: "Lima",
        highlight: "Andes · costa pacífica",
        services: "Tiendas online, software",
      },
      BR: {
        name: "Brasil",
        capital: "Brasilia",
        highlight: "Mayor mercado de LatAm",
        services: "E-commerce, SaaS, apps",
      },
      BO: {
        name: "Bolivia",
        capital: "Sucre",
        highlight: "Andes centrales",
        services: "Sitios web, catálogos",
      },
      PY: {
        name: "Paraguay",
        capital: "Asunción",
        highlight: "Cono Sur",
        services: "Sitios corporativos, e-commerce",
      },
      UY: {
        name: "Uruguay",
        capital: "Montevideo",
        highlight: "Cono Sur · tech hub",
        services: "Software a medida, SaaS",
      },
      AR: {
        name: "Argentina",
        capital: "Buenos Aires",
        highlight: "Cono Sur · talento tech",
        services: "Apps, e-commerce, SaaS",
      },
      CL: {
        name: "Chile",
        capital: "Santiago",
        highlight: "Pacífico sur",
        services: "Sitios corporativos, software",
      },
    },
  },
  booking: {
    label: "Agendar cita",
    title: "Coordinemos una reunión de descubrimiento",
    description:
      "Elegí el día y la hora que te quede mejor. Las citas son virtuales (Google Meet o Zoom) o presenciales, todos los días de 8:00 a. m. a 9:00 p. m. (hora de Costa Rica).",
    prevMonth: "Mes anterior",
    nextMonth: "Mes siguiente",
    availabilityNote: "Todos los días · 8:00 a. m. – 9:00 p. m. · Costa Rica",
    selectDayPrompt:
      "Seleccioná un día en el calendario para ver los horarios disponibles.",
    selectedDateLabel: "Fecha seleccionada",
    availableTimesLabel: "Horario disponible",
    timePeriodMorning: "Mañana",
    timePeriodAfternoon: "Tarde",
    timePeriodEvening: "Noche",
    confirmPrefix: "Confirmá tu cita para ",
    namePlaceholder: "Nombre o empresa",
    emailPlaceholder: "Correo electrónico",
    phonePlaceholder: "8888 8888",
    phoneLabel: "Teléfono / WhatsApp",
    notesPlaceholder: "Notas opcionales (tema de la reunión)",
    modalityLabel: "Modalidad de la reunión",
    modalityVirtual: "Virtual",
    modalityInPerson: "Presencial",
    locationLabel: "¿Dónde te gustaría reunirnos?",
    locationPlaceholder: "Ej: San José, Heredia, tu oficina...",
    confirmButton: "Confirmar cita",
    loadingButton: "Agendando...",
    successTitle: "¡Cita confirmada!",
    successMessage: "Recibimos tu solicitud. Te contactamos pronto para confirmar los detalles.",
    successDateLabel: "Fecha",
    successTimeLabel: "Hora",
    successModalityLabel: "Modalidad",
    errorBooking: "No se pudo agendar.",
    errorConnection: "Error de conexión.",
  },
  contact: {
    label: "Contacto",
    title: "Contanos sobre tu proyecto",
    description:
      "Completá el formulario y te respondemos con una propuesta a medida.",
    emailLabel: "Correo electrónico",
    emailPlaceholder: "tu@empresa.com",
    nameLabel: "Nombre o empresa",
    namePlaceholder: "Tu nombre o nombre de la empresa",
    phoneLabel: "Teléfono / WhatsApp",
    phonePlaceholder: "8888 8888",
    serviceLabel: "¿Qué servicio te interesa?",
    servicePlaceholder: "Seleccioná un servicio",
    serviceOptions: [
      "Sitios web",
      "Software a medida",
      "Tienda online (e-commerce)",
      "App móvil",
      "Mantenimiento",
      "Otro / aún no lo sé",
    ],
    interestLabel: "Motivo o interés",
    interestPlaceholder:
      "Ej: Necesito una tienda online para vender productos artesanales...",
    budgetLabel: "Presupuesto estimado",
    budgetPlaceholder: "Seleccioná un rango",
    budgetOptions: [
      "Menos de $500",
      "$500 – $1,000",
      "$1,000 – $2,500",
      "$2,500 – $5,000",
      "Más de $5,000",
      "Aún no lo sé",
    ],
    submitButton: "Enviar consulta",
    loadingButton: "Enviando...",
    errorSubmit: "No se pudo enviar el formulario.",
    errorConnection: "Error de conexión.",
  },
  assistant: {
    label: "Asistente",
    title: "¿Tenés preguntas?",
    description:
      "Preguntale al asistente. Responde al instante sobre servicios, precios y tiempos.",
    virtualAssistant: "Asistente virtual",
    onlineNow: "En línea ahora",
    placeholder: "Escribí tu pregunta...",
    send: "Enviar",
    thinking: "Pensando...",
    errorGeneric: "Error de conexión.",
    errorSend: "No se pudo enviar el mensaje.",
    welcome:
      "¡Hola! Soy el asistente de Onvision Digital. Puedo ayudarte con preguntas sobre servicios, precios y tiempos de entrega. ¿En qué te puedo ayudar?",
    emailDirect: "o escríbeme directo →",
    quickReplies: [
      "¿Cuánto cuesta un sitio web?",
      "¿Cuánto tiempo tarda?",
      "¿Qué incluye la mensualidad?",
      "¿Trabajás fuera de CR?",
    ],
    chatRules: [
      {
        keywords: [
          "cuesta",
          "precio",
          "costo",
          "cuanto",
          "cuánto",
          "presupuesto",
          "tarifa",
        ],
        reply:
          "Los proyectos van desde $400 (sitio corporativo) hasta $1,500+ (app SaaS). E-commerce desde $800. Cada cotización es a medida según alcance — escríbeme a info@onvisiondigital.com y te preparo una propuesta sin compromiso.",
      },
      {
        keywords: [
          "tiempo",
          "tarda",
          "demora",
          "plazo",
          "entrega",
          "semanas",
          "días",
        ],
        reply:
          "Un sitio web suele llevar 2–4 semanas. E-commerce 4–6 semanas. Apps más complejas 6–12 semanas. Siempre con revisiones semanales para que estés al tanto del avance.",
      },
      {
        keywords: [
          "mantenimiento",
          "soporte",
          "updates",
          "backup",
          "hosting",
        ],
        reply:
          "La mensualidad de cada plan incluye hosting, dominio configurado, soporte y ajustes menores. Los detalles varían según el plan — revisá la sección Planes o escribime para aclarar tu caso.",
      },
      {
        keywords: [
          "cr",
          "costa rica",
          "latinoamérica",
          "latam",
          "fuera",
          "remoto",
          "país",
          "pais",
        ],
        reply:
          "Trabajo 100% remoto con clientes en Latinoamérica y fuera de la región. Las reuniones son por videollamada y la comunicación por correo o WhatsApp.",
      },
      {
        keywords: [
          "servicio",
          "ofrece",
          "hacen",
          "haces",
          "desarrollo",
          "ecommerce",
          "saas",
          "sitio",
        ],
        reply:
          "Ofrezco sitios web corporativos, tiendas online (e-commerce) y aplicaciones SaaS a medida. Todo con código propio — sin plantillas genéricas.",
      },
      {
        keywords: [
          "contacto",
          "hablar",
          "reunión",
          "llamada",
          "agendar",
          "escribir",
        ],
        reply:
          "Podés escribirme a info@onvisiondigital.com o usar el botón «Hablemos» en la página. Respondo en menos de 24 horas hábiles.",
      },
      {
        keywords: ["hola", "buenas", "hey", "saludos", "qué tal", "que tal"],
        reply:
          "¡Hola! 👋 Soy el asistente de Onvision Digital. Preguntame sobre precios, tiempos, servicios o cómo empezar un proyecto.",
      },
    ],
    defaultReply:
      "No estoy seguro de entender esa pregunta. Podés preguntarme sobre precios, tiempos de entrega, servicios, mantenimiento o contacto. También podés escribir directo a info@onvisiondigital.com.",
  },
  footer: {
    tagline: "Desarrollo web a medida en Latinoamérica.",
  },
  whatsapp: {
    ariaLabel: "Escribinos por WhatsApp",
  },
  site: {
    region: "Latinoamérica",
  },
  trustedCompanies: {
    label: "Clientes y proyectos",
    title: "Empresas que confiaron en Onvision",
    description:
      "Algunas de las marcas y proyectos con los que hemos trabajado: sitios, tiendas y software a medida.",
    note: "Algunos perfiles son de referencia del portafolio. Podés reemplazarlos por clientes reales con logo y contactos oficiales.",
    backHome: "Volver al inicio",
    emailLabel: "Correo",
    phoneLabel: "Teléfono",
    whatsappLabel: "WhatsApp",
    instagramLabel: "Instagram",
    webLabel: "Sitio web",
    showMap: "Ver mapa",
    hideMap: "Ocultar mapa",
    openMaps: "Abrir en Google Maps",
    highlightsTitle: "Destacados",
    visitSite: "Ver sitio web",
    ctaTitle: "¿Querés aparecer acá?",
    ctaBody: "Agendá una reunión y contanos qué necesita tu empresa.",
    clientsStat: "{count} marcas y proyectos",
    filterBusinessType: "Rubro",
    filterProvince: "Provincia",
    allBusinessTypes: "Todos los rubros",
    allProvinces: "Todo el país",
    clearFilters: "Limpiar",
    showingResults: "{shown} de {total} empresas",
    noResults: "No hay empresas con estos filtros. Probá otra combinación.",
    filterHint: "Filtrá por tipo de negocio y zona",
    closeFilter: "Cerrar filtro",
    categories: {
      restaurant: "Restaurantes",
      store: "Tiendas",
      clinic: "Clínicas",
      education: "Educación",
      automotive: "Automotriz",
      agriculture: "Agro / ganadería",
      corporate: "Empresas",
    },
    projectTypes: {
      website: "Sitio web",
      ecommerce: "E-commerce",
      software: "Software",
    },
    provinces: {
      "san-jose": "San José",
      heredia: "Heredia",
      cartago: "Cartago",
      alajuela: "Alajuela",
      guanacaste: "Guanacaste",
      usa: "Estados Unidos",
    },
  },
};

const en: SiteCopy = {
  nav: {
    services: "Services",
    portfolio: "Portfolio",
    plans: "Plans",
    schedule: "Schedule",
    process: "Process",
    companies: "Companies",
    contact: "Contact",
    letsTalk: "Let's talk",
  },
  lang: {
    es: "Español",
    en: "English",
  },
  theme: {
    light: "LT",
    dark: "DK",
    enableDark: "Enable dark mode",
    enableLight: "Enable light mode",
  },
  hero: {
    badge: "Available for projects",
    title: "Custom digitalization",
    titleAccent: "by monthly plan",
    description:
      "We design and implement custom technology solutions that drive efficiency, growth, and digital transformation for companies and businesses.",
    pricePeriod: "/ month",
    pricePlans: [
      { label: "Standard website", amount: "$35", amountAlt: "₡15,000" },
      { label: "Pro website", amount: "$55", amountAlt: "₡25,000" },
      { label: "Standard e-commerce", amount: "$50", amountAlt: "₡22,000" },
      { label: "Pro e-commerce", amount: "$65", amountAlt: "₡30,000" },
      { label: "Mobile app", amount: "$150" },
      { label: "Software SaaS", amount: "$130" },
    ],
    priceNote: "Monthly prices in USD. Tailored design and support included.",
    pills: ["Websites", "E-commerce", "Software (SaaS)", "Mobile app"],
    contactUs: "Contact us",
    scheduleCta: "Book a meeting",
    trustedCta: "Companies that trusted Onvision",
    systemCta: "Onvision system for businesses",
    systemCtaShort: "Onvision system",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    bgAlt: "Hero background",
  },
  marquee: {
    ariaLabel: "Onvision Digital services",
    items: [
      "Websites",
      "E-commerce",
      "SaaS software",
      "Mobile apps",
      "Maintenance",
      "Landing pages",
      "SEO & ranking",
      "Payment gateways",
      "Admin dashboards",
      "API integrations",
    ],
  },
  blueprint: {
    ariaLabel: "Interactive project layer blueprint",
    header: "Blueprint · live",
    status: "Drawing",
    layers: {
      ui: {
        label: "Interface",
        code: "LYR-01",
        detail: "Layout, typography, and user experience",
        metric: "brand · trust",
        svgLabel: "hero · CTA · media",
      },
      pay: {
        label: "Payments",
        code: "LYR-02",
        detail: "Checkout, cart, and secure payment gateway",
        metric: "sales · conversion",
        svgLabel: "catalog · checkout · cart",
      },
      admin: {
        label: "Admin panel",
        code: "LYR-03",
        detail: "Admin, roles, and business workflows",
        metric: "control · operations",
        svgLabel: "sidebar · tables · roles",
      },
      data: {
        label: "Data",
        code: "LYR-04",
        detail: "Database, API, and synchronization",
        metric: "scale · stability",
        svgLabel: "postgres · sync · backups",
      },
    },
    activeLabel: " · active",
    exploreLabel: " · view layer →",
    footerLeft: "Next.js · PostgreSQL · Stripe",
    footerRight: "master plan",
  },
  services: {
    main: {
      label: "What we do · core services",
      title: "Whatever you imagine for your business, we can make it real",
      examplesLabel: "Some examples:",
      carouselPrev: "Previous image",
      carouselNext: "Next image",
      carouselHint: "Tap to browse more screenshots →",
      viewExample: "View live example",
      videoHint: "Tap to expand the video demo →",
      cards: [
        {
          tabLabel: "Websites",
          title: "Modern websites that make your business stand out digitally",
          description:
            "Includes fully intelligent AI chatbots, interactive maps, database-backed forms, calendars, and everything you need to turn visitors into customers.",
        },
        {
          tabLabel: "E-commerce",
          title: "Online store (e-commerce)",
          description:
            "Catalog, cart, online payments, and admin panel. With unique, customizable features: team filters, outfit builder, custom jerseys, and more.",
        },
        {
          tabLabel: "SaaS",
          title: "Custom inventory management and electronic invoicing software for your business",
          description:
            "Control panel with sales, inventory, clients, and tax-compliant invoicing. Also includes distribution route management, analytics, and everything your operation needs.",
        },
        {
          tabLabel: "Mobile app",
          title: "Custom mobile app compatible with iOS and Android",
          description:
            "Health and wellness apps, pet care, user registration, push notifications, custom UI/UX design, and publishing on the App Store and Google Play.",
        },
      ],
    },
    portfolioScroll: "View plans",
  },
  portfolio: {
    label: "Case studies",
    title: "Some of the projects already live in production",
    description:
      "Pick a case, browse the screens, and see the problem we solved and how we built it.",
    screenshotAlt: "Project screenshot ",
    problemLabel: "Problem",
    solutionLabel: "Solution",
    prevImage: "Previous image",
    nextImage: "Next image",
    expandHint: "Tap to expand",
    closeLabel: "Close",
    cta: "Book a meeting",
    projects: [
      {
        category: "SaaS software",
        title: "ClinicOS — Clinic management system",
        problem:
          "Manual front-desk work and fragmented operations by area and doctor: calendars, inventory, finance, and patients handled separately, with little shared visibility.",
        solution:
          "A unified platform with dashboard, scheduling, patients, inventory, finance, and real-time alerts for the whole clinic in one system.",
      },
      {
        category: "Real estate / Web",
        title: "Jopa Real Estate — Premium catalog",
        problem:
          "A real estate agency needed a professional online catalog with reach, plus custom financing tools, forms, and lead capture flows.",
        solution:
          "A premium site with property search, listing galleries, bank mortgage calculators, forms, and CTAs to visit, build, or sell.",
      },
      {
        category: "EdTech / SaaS",
        title: "UniLearn — Academic platform",
        problem:
          "A university needed to move beyond generic LMS tools: little live visibility for admins and teachers, and a weak student experience around deadlines, focus, and term pacing.",
        solution:
          "A custom platform with roles (admin, teacher, student), live metrics and analytics, academic calendar, focus/sprint mode, and fast weekly publishing of materials, assignments, quizzes, and forums.",
      },
      {
        category: "E-commerce / Fashion",
        title: "FirstDown — Jersey store",
        problem:
          "A jersey shop needed to sell online with catalogs by league and team, customizable pieces, and a clear checkout experience in colones—without losing the brand vibe.",
        solution:
          "A custom e-commerce store with MLB/NBA/NFL filters, team catalogs, build-your-look (jersey + shorts), stock/sale badges, and a cart flow to request orders with free shipping.",
      },
    ],
  },
  scrollStack: {
    label: "Portfolio",
    title: "Projects in detail",
    description:
      "Screenshots from websites, online stores, and custom systems built for businesses in Costa Rica and abroad.",
    hint: "Scroll to browse · Arrows to switch screens",
    closeLabel: "Close",
    expandHint: "Expand",
    tapHint: "Click to enlarge",
    prevLabel: "Previous screen",
    nextLabel: "Next screen",
    visitSite: "Visit website",
    items: [
      {
        title: "Standard website",
        subtitle: "Custom corporate site",
      },
      {
        title: "Pro website",
        subtitle: "Sites with custom tools",
      },
      {
        title: "E-commerce",
        subtitle: "Catalog, cart, and checkout",
      },
      {
        title: "SaaS software",
        subtitle: "Custom systems like ClinicOS and UniLearn",
      },
      {
        title: "Mobile app",
        subtitle: "Custom iOS and Android",
      },
    ],
  },
  payment: {
    success: {
      label: "Payment",
      title: "Thank you — we received your payment",
      body: "If you just completed the Onvo checkout, your monthly plan is registered. We’ll contact you soon to activate or continue the project.",
      backPlans: "Back to plans",
      contact: "Contact",
    },
    cancelled: {
      label: "Payment",
      title: "Payment cancelled",
      body: "Nothing was charged. You can go back to plans and try again whenever you want.",
      backPlans: "Back to plans",
      quote: "Get a quote / ask",
    },
  },
  monthlyPlans: {
    label: "Plans",
    title: "What’s included in each monthly plan",
    description:
      "Pick the plan that fits your business. Custom design, hosting, and support are included in the monthly fee.",
    period: "/ month",
    onceLabel: "one-time",
    payCta: "Pay plan",
    payMessage:
      "Hi, I’d like to pay for the {name} plan ({price}/month) from Onvision Digital.",
    note: "Tapping pay opens WhatsApp so we can confirm the plan and send you the payment link.",
    mostChosen: "Most popular",
    groups: [
      {
        id: "paginas",
        title: "Websites",
        planIds: ["pagina-estandar", "pagina-pro"],
      },
      {
        id: "ecommerce",
        title: "E-commerce",
        planIds: ["ecom-estandar", "ecom-pro"],
      },
      {
        id: "productos",
        title: "App & software",
        planIds: ["app-movil", "software-saas"],
      },
    ],
    plans: [
      {
        id: "pagina-estandar",
        name: "Standard website",
        tagline: "Clear, professional presence.",
        price: "$35",
        priceAlt: "₡15,000",
        priceFull: "$450",
        features: [
          "Landing or 1–3 section site",
          "Brand-matched responsive design",
          "Contact form or WhatsApp",
          "AI chatbot for your business",
          "Hosting and domain setup",
          "On-page SEO",
          "Support and minor updates included",
        ],
      },
      {
        id: "pagina-pro",
        name: "Pro website",
        tagline: "Sites with custom tools.",
        price: "$55",
        priceAlt: "₡25,000",
        priceFull: "$650",
        highlighted: true,
        features: [
          "Custom multi-page site",
          "Tools (booking, calculators, filters)",
          "AI chatbot for your business",
          "Premium animations and interactions",
          "WhatsApp + analytics integration",
          "On-page SEO",
          "Hosting and domain setup",
          "Priority support and updates",
        ],
      },
      {
        id: "ecom-estandar",
        name: "Standard e-commerce",
        tagline: "Catalog ready to sell.",
        price: "$50",
        priceAlt: "₡22,000",
        priceFull: "$650",
        features: [
          "Product catalog with filters",
          "WhatsApp orders or simple cart",
          "Payment: card, gateway, SINPE, or bank transfer",
          "Mobile-first brand design",
          "Basic panel for stock/prices",
          "E-commerce SEO",
          "Hosting, SSL, and monthly support",
          "Speed optimization",
          "1 round of revisions",
        ],
      },
      {
        id: "ecom-pro",
        name: "Pro e-commerce",
        tagline: "Full store with checkout.",
        price: "$65",
        priceAlt: "₡30,000",
        priceFull: "$850",
        features: [
          "Catalog, cart, and checkout",
          "Payment: card, gateway, SINPE, or bank transfer",
          "Custom features (outfits, leagues, personalization)",
          "Admin panel for orders and inventory",
          "E-commerce SEO",
          "Analytics and conversion tracking",
          "Priority support and monthly improvements",
          "2 rounds of revisions",
        ],
      },
      {
        id: "app-movil",
        name: "Mobile app",
        tagline: "Native product for your ops.",
        price: "$150",
        priceFull: "$1,500",
        features: [
          "Custom iOS/Android or PWA",
          "Modern UI with business flows",
          "Notifications and sync",
          "Related panel or backend",
          "Publishing and maintenance",
          "Monthly support and updates",
        ],
      },
      {
        id: "software-saas",
        name: "Software SaaS",
        tagline: "Systems like ClinicOS, UniLearn, or Sistema Gan.",
        price: "$130",
        priceFull: "$1,650",
        features: [
          "Web app with auth and roles",
          "Admin panel and dashboards",
          "Database and integrations",
          "Custom modules for your operation",
          "Hosting, backups, and monitoring",
          "Priority support and product evolution",
        ],
      },
    ],
  },
  plans: {
    label: "Plans & pricing",
    title: "Clear base plans tailored to your needs",
    description:
      "Reference packages for web, e-commerce, SaaS software, and mobile apps. On this site you pay the monthly fee; one-time payment is arranged separately.",
    period: "/ mo",
    onceLabel: "one-time",
    tabs: {
      web: "Websites",
      software: "Software",
      shop: "Online store",
      mobile: "Mobile app",
    },
    groups: {
      web: {
        description:
          "Digital presence and corporate websites. Pay monthly here; one-time is arranged separately.",
        plans: [
          {
            name: "Standard website",
            tagline: "Clear, professional presence.",
            price: "$35",
            priceAlt: "₡15,000",
            priceFull: "$450",
            features: [
              "Landing or 1–3 section site",
              "Mobile-first responsive design to your brand",
              "Contact form + social media links",
              "WhatsApp integration for inquiries",
              "AI chatbot for your business",
              "Custom animations and interactions",
              "On-page SEO",
              "Hosting and domain setup",
              "Speed optimization",
              "Deployment included",
              "Support and minor tweaks included in the monthly plan",
            ],
          },
          {
            name: "Pro website",
            tagline: "Sites with custom tools.",
            price: "$55",
            priceAlt: "₡25,000",
            priceFull: "$650",
            highlighted: true,
            features: [
              "Custom multi-page site",
              "Tools (bookings, calculators, filters, maps)",
              "AI chatbot for your business",
              "Premium animations and interactions",
              "Blog or basic content manager",
              "Analytics and form integrations",
              "On-page SEO",
              "WhatsApp and social media integration",
              "Conversion-focused optimization",
              "Hosting and domain setup",
              "Speed optimization",
              "Deployment included",
              "Basic usage training",
              "Priority support and monthly updates",
            ],
          },
        ],
      },
      software: {
        description:
          "Systems like ClinicOS, UniLearn, or Sistema Gan. Pay monthly here; one-time or custom scope via quote.",
        plans: [
          {
            name: "Software SaaS",
            tagline: "Full management infrastructure tailored to your business.",
            price: "$130",
            priceFull: "$1,650",
            highlighted: true,
            features: [
              "Web app with authentication and database",
              "Custom admin panel",
              "Roles, permissions, and external integrations",
              "Custom modules (sales, inventory, clients, routes, etc.)",
              "Exportable dashboards and reports",
              "Scalable cloud architecture",
              "Payment gateway (if applicable)",
              "Email and in-app notifications",
              "Enhanced security (encryption and headers)",
              "Hosting, automatic backups, and uptime monitoring",
              "Delivery, training, and technical documentation",
              "Priority support and continuous product evolution",
            ],
          },
        ],
      },
      shop: {
        description:
          "Catalogs and online stores. Pay monthly here; one-time is arranged separately.",
        plans: [
          {
            name: "Standard e-commerce",
            tagline: "Catalog ready to sell.",
            price: "$50",
            priceAlt: "₡22,000",
            priceFull: "$650",
            features: [
              "Product catalog with filters",
              "WhatsApp orders or simple cart",
              "Payment: card, gateway, SINPE, or bank transfer",
              "Mobile-first brand design",
              "Basic panel for stock and prices",
              "Product pages with gallery",
              "E-commerce SEO",
              "Order notifications by email or WhatsApp",
              "Hosting, SSL, and monthly support",
              "Speed optimization",
              "Deployment included",
              "1 round of revisions",
            ],
          },
          {
            name: "Pro e-commerce",
            tagline: "Full store with checkout.",
            price: "$65",
            priceAlt: "₡30,000",
            priceFull: "$850",
            highlighted: true,
            features: [
              "Unlimited catalog with filters and variants",
              "Conversion-optimized cart and checkout",
              "Payment: card, gateway, SINPE, or bank transfer",
              "Custom features (outfits, leagues, personalization)",
              "Admin panel for orders, inventory, and coupons",
              "Sales reports and analytics",
              "E-commerce SEO",
              "WhatsApp integration for orders",
              "Hosting, SSL, and monitoring included",
              "2 rounds of revisions",
              "Training to manage your store",
              "Priority support and monthly improvements",
            ],
          },
        ],
      },
      mobile: {
        description:
          "Custom iOS/Android or PWA. Pay monthly here; one-time is arranged separately.",
        plans: [
          {
            name: "Mobile app",
            tagline: "Native product for your ops.",
            price: "$150",
            priceFull: "$1,500",
            highlighted: true,
            features: [
              "Native cross-platform app (iOS + Android) or PWA",
              "Custom mobile-first UI/UX design",
              "Login, registration, and password recovery",
              "Custom business flows for your operation",
              "Push notifications",
              "Offline mode and data sync",
              "API / backend integration or admin panel",
              "In-app payments and subscriptions (if applicable)",
              "Assisted publishing on App Store and Google Play",
              "Analytics, usage metrics, and error reporting",
              "Deep links and content sharing",
              "Training, documentation, and monthly support",
            ],
          },
        ],
      },
    },
    mostChosen: "Most popular",
    requestPlan: "Request this plan",
    quoteCta: "Get a quote / ask",
    payMonthlyCta: "Pay monthly",
    onceAskPrefix: "Prefer one-time?",
    onceAskLink: "Contact us",
    paySheet: {
      title: "Confirm monthly plan",
      categorySeparator: " · ",
      monthlyLabel: "Monthly",
      companyNameLabel: "Business or site name",
      companyNamePlaceholder: "E.g. La Pacífica, Jopa Autos…",
      note: "You’ll pay the monthly fee with Onvo (card, SINPE, and more). One-time payment is arranged separately.",
      continueCta: "Continue to payment",
      continueLoading: "Opening checkout…",
      cancelCta: "Cancel",
      closeAria: "Close",
      errorGeneric: "Couldn’t open checkout. Try again or message us on WhatsApp.",
      payMessage:
        "Hi, I’d like to pay the monthly fee for the {name} plan ({price}/month) from Onvision Digital.",
    },
    customQuotePrefix:
      "Need a custom SaaS or a project with complex integrations? ",
    customQuoteLink: "Request a custom quote →",
  },
  process: {
    label: "Process",
    title: "How do we work together?",
    description:
      "A clear process so you know exactly what to expect at every stage.",
    stepPrefix: "Step ",
    steps: [
      {
        number: "01",
        title: "Discovery call",
        description:
          "We learn about your business, goals, and what your site needs to succeed.",
      },
      {
        number: "02",
        title: "Proposal and budget",
        description:
          "You receive a document with scope, timeline, and price. No surprises later.",
      },
      {
        number: "03",
        title: "Design and development",
        description:
          "We build your project with weekly reviews so you're always in the loop.",
      },
      {
        number: "04",
        title: "Delivery and support",
        description:
          "We launch and teach you how to use it. We stay available for post-launch support.",
      },
    ],
    readyPrefix: "Ready to get started? ",
    writeMe: "Write to me",
  },
  faq: {
    label: "FAQ",
    title: "What everyone asks before getting started",
    description:
      "The most common questions about the monthly plan, the domain, and what happens if you stop.",
    itemPrefix: "FAQ-",
    items: [
      {
        question: "Is the site mine or yours?",
        answer:
          "Yours. With the one-time payment it is yours from delivery. With the monthly plan it is also yours, as long as the monthly payment is up to date.",
      },
      {
        question:
          "If I choose the monthly plan, what is the minimum before I can cancel?",
        answer:
          "The minimum is 4 months. After that you can cancel at any time, and you can even ask for a refund of that month if you used less than half of it.",
      },
      {
        question: "What happens if I cancel or fall behind on a payment?",
        answer:
          "You have 5 days to catch up before the site and the other services are deactivated. Keep in mind the monthly fee does not cover only the website: it includes maintenance, the AI service, and your promotional space on our site.",
      },
      {
        question: "What exactly does the included support cover?",
        answer:
          "The monthly plan covers two different things. First, changes to the site, which we coordinate based on what your business needs:",
        groups: [
          {
            title: "Changes to the site",
            points: [
              "Design and structure changes as the business needs them.",
              "Creating and adding new sections to the page.",
              "Updating content, images, and visual elements.",
            ],
          },
          {
            title: "And with no limit",
            points: [
              "Technical maintenance and fixing any errors or failures that come up.",
              "Response to cyberattacks or security issues affecting the site.",
              "General monitoring to keep the page running correctly.",
            ],
          },
        ],
      },
      {
        question: "Whose name is the domain registered under?",
        answer:
          "You buy the domain and it stays in your name. It runs about $11 a year (roughly ₡5,000 colones). We handle purchasing, configuring, and pointing it at your site.",
      },
      {
        question: "How long does it take once I pay?",
        answer:
          "It depends a lot on how quickly information flows from your side, since the site is 100% custom. The average is about one week — the goal is an efficient delivery without cutting quality.",
      },
      {
        question: "I already have a site — can you migrate it?",
        answer:
          "Yes, at no additional cost.",
      },
      {
        question: "Why a monthly plan instead of a single payment?",
        answer:
          "The monthly plan was added to give businesses the chance to have a digital service in a more accessible way. Either way, you can pick what works for you: the one-time price is listed on every plan.",
      },
    ],
    footerText: "Still have a question? ",
    footerCta: "Write to us",
  },
  coverage: {
    label: "Coverage",
    title: "We work across the Americas",
    description:
      "Select a country on the map to learn more about coverage and available services in each region.",
    mapAria: "Interactive map of the Americas by country",
    mapHint: "Tap or hover over a country",
    countryLabel: "Country",
    countryAriaPrefix: "Country: ",
    capitalPrefix: "Capital: ",
    stats: {
      businessesLabel: "Estimated market",
      pymesSuffix: "people.",
      zoneLabel: "Area",
      servicesLabel: "Common services",
    },
    consultCta: "Check availability →",
    countries: {
      CA: {
        name: "Canada",
        capital: "Ottawa",
        highlight: "North America · English & French",
        services: "Corporate sites, SaaS",
      },
      US: {
        name: "United States",
        capital: "Washington D.C.",
        highlight: "Mature digital market",
        services: "E-commerce, custom software",
      },
      MX: {
        name: "Mexico",
        capital: "Mexico City",
        highlight: "Northern LatAm hub",
        services: "Online stores, web apps",
      },
      GT: {
        name: "Guatemala",
        capital: "Guatemala City",
        highlight: "Central America",
        services: "Websites, e-commerce",
      },
      BZ: {
        name: "Belize",
        capital: "Belmopan",
        highlight: "Central American Caribbean",
        services: "Landing pages, booking systems",
      },
      HN: {
        name: "Honduras",
        capital: "Tegucigalpa",
        highlight: "Central America",
        services: "Corporate sites, catalogs",
      },
      SV: {
        name: "El Salvador",
        capital: "San Salvador",
        highlight: "Central America",
        services: "E-commerce, landing pages",
      },
      NI: {
        name: "Nicaragua",
        capital: "Managua",
        highlight: "Central America",
        services: "Websites, forms",
      },
      CR: {
        name: "Costa Rica",
        capital: "San José",
        highlight: "Home base · Central Valley",
        services: "Full-stack projects, SaaS, e-commerce",
      },
      PA: {
        name: "Panama",
        capital: "Panama City",
        highlight: "Logistics & finance hub",
        services: "Corporate sites, software",
      },
      CU: {
        name: "Cuba",
        capital: "Havana",
        highlight: "Caribbean",
        services: "Websites, portfolios",
      },
      DO: {
        name: "Dominican Republic",
        capital: "Santo Domingo",
        highlight: "Caribbean",
        services: "E-commerce, tourism digital",
      },
      HT: {
        name: "Haiti",
        capital: "Port-au-Prince",
        highlight: "Caribbean",
        services: "Websites, landing pages",
      },
      JM: {
        name: "Jamaica",
        capital: "Kingston",
        highlight: "English-speaking Caribbean",
        services: "Websites, booking systems",
      },
      CO: {
        name: "Colombia",
        capital: "Bogotá",
        highlight: "Andes · growing market",
        services: "E-commerce, SaaS apps",
      },
      VE: {
        name: "Venezuela",
        capital: "Caracas",
        highlight: "Northern South America",
        services: "Websites, catalogs",
      },
      GY: {
        name: "Guyana",
        capital: "Georgetown",
        highlight: "Guiana Shield",
        services: "Landing pages, corporate sites",
      },
      SR: {
        name: "Suriname",
        capital: "Paramaribo",
        highlight: "Guiana Shield",
        services: "Websites, portfolios",
      },
      EC: {
        name: "Ecuador",
        capital: "Quito",
        highlight: "Andean Pacific",
        services: "E-commerce, websites",
      },
      PE: {
        name: "Peru",
        capital: "Lima",
        highlight: "Andes · Pacific coast",
        services: "Online stores, software",
      },
      BR: {
        name: "Brazil",
        capital: "Brasília",
        highlight: "Largest LatAm market",
        services: "E-commerce, SaaS, apps",
      },
      BO: {
        name: "Bolivia",
        capital: "Sucre",
        highlight: "Central Andes",
        services: "Websites, catalogs",
      },
      PY: {
        name: "Paraguay",
        capital: "Asunción",
        highlight: "Southern Cone",
        services: "Corporate sites, e-commerce",
      },
      UY: {
        name: "Uruguay",
        capital: "Montevideo",
        highlight: "Southern Cone · tech hub",
        services: "Custom software, SaaS",
      },
      AR: {
        name: "Argentina",
        capital: "Buenos Aires",
        highlight: "Southern Cone · tech talent",
        services: "Apps, e-commerce, SaaS",
      },
      CL: {
        name: "Chile",
        capital: "Santiago",
        highlight: "Southern Pacific",
        services: "Corporate sites, software",
      },
    },
  },
  booking: {
    label: "Book a call",
    title: "Let's schedule a discovery meeting",
    description:
      "Pick the day and time that works best for you. Meetings are virtual (Google Meet or Zoom) or in-person, every day from 8:00 AM to 9:00 PM (Costa Rica time).",
    prevMonth: "Previous month",
    nextMonth: "Next month",
    availabilityNote: "Every day · 8:00 AM – 9:00 PM · Costa Rica",
    selectDayPrompt:
      "Select a day on the calendar to see available time slots.",
    selectedDateLabel: "Selected date",
    availableTimesLabel: "Available times",
    timePeriodMorning: "Morning",
    timePeriodAfternoon: "Afternoon",
    timePeriodEvening: "Evening",
    confirmPrefix: "Confirm your appointment for ",
    namePlaceholder: "Name or company",
    emailPlaceholder: "Email address",
    phonePlaceholder: "8888 8888",
    phoneLabel: "Phone / WhatsApp",
    notesPlaceholder: "Optional notes (meeting topic)",
    modalityLabel: "Meeting format",
    modalityVirtual: "Virtual",
    modalityInPerson: "In person",
    locationLabel: "Where would you like to meet?",
    locationPlaceholder: "E.g.: San José, Heredia, your office...",
    confirmButton: "Confirm appointment",
    loadingButton: "Booking...",
    successTitle: "Appointment confirmed!",
    successMessage: "We received your request. We'll contact you soon to confirm the details.",
    successDateLabel: "Date",
    successTimeLabel: "Time",
    successModalityLabel: "Format",
    errorBooking: "Could not book the appointment.",
    errorConnection: "Connection error.",
  },
  contact: {
    label: "Contact",
    title: "Tell us about your project",
    description:
      "Fill out the form and we'll reply with a tailored proposal.",
    emailLabel: "Email address",
    emailPlaceholder: "you@company.com",
    nameLabel: "Name or company",
    namePlaceholder: "Your name or company name",
    phoneLabel: "Phone / WhatsApp",
    phonePlaceholder: "8888 8888",
    serviceLabel: "Which service are you interested in?",
    servicePlaceholder: "Select a service",
    serviceOptions: [
      "Websites",
      "Custom software",
      "Online store (e-commerce)",
      "Mobile app",
      "Maintenance",
      "Other / not sure yet",
    ],
    interestLabel: "Reason or interest",
    interestPlaceholder:
      "E.g.: I need an online store to sell handmade products...",
    budgetLabel: "Estimated budget",
    budgetPlaceholder: "Select a range",
    budgetOptions: [
      "Under $500",
      "$500 – $1,000",
      "$1,000 – $2,500",
      "$2,500 – $5,000",
      "Over $5,000",
      "Not sure yet",
    ],
    submitButton: "Send inquiry",
    loadingButton: "Sending...",
    errorSubmit: "Could not submit the form.",
    errorConnection: "Connection error.",
  },
  assistant: {
    label: "Assistant",
    title: "Have questions?",
    description:
      "Ask the assistant. Get instant answers about services, pricing, and timelines.",
    virtualAssistant: "Virtual assistant",
    onlineNow: "Online now",
    placeholder: "Type your question...",
    send: "Send",
    thinking: "Thinking...",
    errorGeneric: "Connection error.",
    errorSend: "Could not send the message.",
    welcome:
      "Hi! I'm the Onvision Digital assistant. I can help with questions about services, pricing, and delivery times. How can I help you?",
    emailDirect: "or email me directly →",
    quickReplies: [
      "How much does a website cost?",
      "How long does it take?",
      "What's included in the monthly plan?",
      "Do you work outside Costa Rica?",
    ],
    chatRules: [
      {
        keywords: [
          "cost",
          "costs",
          "price",
          "pricing",
          "budget",
          "rate",
          "how much",
          "quote",
        ],
        reply:
          "Projects range from $400 (corporate website) to $1,500+ (SaaS app). E-commerce from $800. Each quote is tailored to scope — email info@onvisiondigital.com and I'll prepare a no-obligation proposal.",
      },
      {
        keywords: [
          "time",
          "timeline",
          "long",
          "take",
          "delivery",
          "weeks",
          "days",
          "deadline",
        ],
        reply:
          "A website usually takes 2–4 weeks. E-commerce 4–6 weeks. More complex apps 6–12 weeks. Always with weekly reviews so you stay informed.",
      },
      {
        keywords: [
          "maintenance",
          "support",
          "updates",
          "backup",
          "hosting",
        ],
        reply:
          "Each plan's monthly fee includes hosting, domain setup, support, and minor updates. Details vary by plan — check the Plans section or message me about your case.",
      },
      {
        keywords: [
          "cr",
          "costa rica",
          "latin america",
          "latam",
          "remote",
          "country",
          "international",
          "abroad",
        ],
        reply:
          "I work 100% remotely with clients in Latin America and beyond. Meetings are via video call and communication by email or WhatsApp.",
      },
      {
        keywords: [
          "service",
          "services",
          "offer",
          "development",
          "ecommerce",
          "e-commerce",
          "saas",
          "website",
          "site",
        ],
        reply:
          "I offer corporate websites, online stores (e-commerce), and custom SaaS applications. All with custom code — no generic templates.",
      },
      {
        keywords: [
          "contact",
          "talk",
          "meeting",
          "call",
          "schedule",
          "book",
          "write",
          "email",
        ],
        reply:
          "You can email info@onvisiondigital.com or use the «Let's talk» button on the page. I reply within 24 business hours.",
      },
      {
        keywords: ["hello", "hi", "hey", "greetings", "good morning", "good afternoon"],
        reply:
          "Hi! 👋 I'm the Onvision Digital assistant. Ask me about pricing, timelines, services, or how to start a project.",
      },
    ],
    defaultReply:
      "I'm not sure I understand that question. You can ask about pricing, delivery times, services, maintenance, or contact. You can also email info@onvisiondigital.com directly.",
  },
  footer: {
    tagline: "Custom web development in Latin America.",
  },
  whatsapp: {
    ariaLabel: "Message us on WhatsApp",
  },
  site: {
    region: "Latin America",
  },
  trustedCompanies: {
    label: "Clients & projects",
    title: "Companies that trusted Onvision",
    description:
      "A list of brands and projects we’ve worked with: websites, stores, and custom software.",
    note: "Some profiles are portfolio references. Replace them with real clients, logos, and official contacts when ready.",
    backHome: "Back to home",
    emailLabel: "Email",
    phoneLabel: "Phone",
    whatsappLabel: "WhatsApp",
    instagramLabel: "Instagram",
    webLabel: "Website",
    showMap: "Show map",
    hideMap: "Hide map",
    openMaps: "Open in Google Maps",
    highlightsTitle: "Highlights",
    visitSite: "View website",
    ctaTitle: "Want to be listed here?",
    ctaBody: "Book a meeting and tell us what your business needs.",
    clientsStat: "{count} brands and projects",
    filterBusinessType: "Industry",
    filterProvince: "Province",
    allBusinessTypes: "All industries",
    allProvinces: "Nationwide",
    clearFilters: "Clear",
    showingResults: "{shown} of {total} companies",
    noResults: "No companies match these filters. Try a different combination.",
    filterHint: "Filter by industry and region",
    closeFilter: "Close filter",
    categories: {
      restaurant: "Restaurants",
      store: "Stores",
      clinic: "Clinics",
      education: "Education",
      automotive: "Automotive",
      agriculture: "Agriculture",
      corporate: "Corporate",
    },
    projectTypes: {
      website: "Website",
      ecommerce: "E-commerce",
      software: "Software",
    },
    provinces: {
      "san-jose": "San José",
      heredia: "Heredia",
      cartago: "Cartago",
      alajuela: "Alajuela",
      guanacaste: "Guanacaste",
      usa: "United States",
    },
  },
};

export const translations: Record<Locale, SiteCopy> = { es, en };
