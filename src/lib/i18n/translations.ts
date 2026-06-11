import type { ProvinceId } from "@/lib/costa-rica-provinces";

export type Locale = "es" | "en";

export type ServiceCardCopy = {
  code: string;
  tier: string;
  badge?: string;
  title: string;
  description: string;
  features: string[];
  result: string;
  cta: string;
};

export type PlanCardCopy = {
  name: string;
  tagline: string;
  price: string;
  unit: string;
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
    pills: string[];
    contactUs: string;
    scheduleCta: string;
    menuOpen: string;
    menuClose: string;
    bgAlt: string;
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
      description: string;
      cards: ServiceCardCopy[];
    };
    divider: string;
    custom: {
      label: string;
      title: string;
      cards: ServiceCardCopy[];
    };
    resultLabel: string;
    ctaPlans: string;
    ctaQuote: string;
    portfolioScroll: string;
  };
  portfolio: {
    label: string;
    title: string;
    hint: string;
    screenshotAlt: string;
    projects: Array<{
      category: string;
      title: string;
    }>;
  };
  plans: {
    label: string;
    title: string;
    description: string;
    tabs: {
      web: string;
      shop: string;
      mobile: string;
      maintenance: string;
    };
    groups: {
      web: PlanGroupCopy;
      shop: PlanGroupCopy;
      mobile: PlanGroupCopy;
      maintenance: PlanGroupCopy;
    };
    mostChosen: string;
    requestPlan: string;
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
  coverage: {
    label: string;
    title: string;
    description: string;
    mapAria: string;
    mapHint: string;
    provinceLabel: string;
    provinceAriaPrefix: string;
    capitalPrefix: string;
    stats: {
      businessesLabel: string;
      pymesSuffix: string;
      zoneLabel: string;
      servicesLabel: string;
    };
    consultCta: string;
    provinces: Record<
      ProvinceId,
      {
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
    confirmPrefix: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    notesPlaceholder: string;
    confirmButton: string;
    loadingButton: string;
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
};

const es: SiteCopy = {
  nav: {
    services: "Servicios",
    portfolio: "Portafolio",
    plans: "Planes",
    schedule: "Agendar",
    process: "Proceso",
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
    title: "Digitalización estratégica",
    titleAccent: "a medida",
    description:
      "Diseñamos e implementamos soluciones tecnológicas personalizadas que impulsan la eficiencia, el crecimiento y la transformación digital de empresas y negocios.",
    pills: ["Sitios web", "E-commerce", "Software (SaaS)", "Mantenimiento"],
    contactUs: "Contáctanos",
    scheduleCta: "Agendar cita →",
    menuOpen: "Abrir menú",
    menuClose: "Cerrar menú",
    bgAlt: "Fondo hero",
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
      title: "Soluciones web listas para impulsar tu negocio",
      description:
        "Cada proyecto es a medida — no usamos plantillas genéricas. Código limpio, rápido y fácil de mantener.",
      cards: [
        {
          code: "SVC-01",
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
        },
        {
          code: "SVC-02",
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
        },
      ],
    },
    divider: "Especialidades a la medida · bajo cotización",
    custom: {
      label: "Proyectos personalizados",
      title: "Software a medida y apps móviles",
      cards: [
        {
          code: "SVC-03",
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
          tier: "Bajo cotización",
          title: "App móvil",
          description:
            "Aplicación completa para iOS y Android con diseño personalizado, backend integrado y publicación en tiendas.",
          features: [
            "App cross-platform (iOS + Android)",
            "Diseño UI/UX mobile-first",
            "Login, registro y notificaciones push",
            "Integración con API / backend",
            "Modo offline y sincronización de datos",
            "Publicación asistida en App Store y Google Play",
          ],
          result:
            "Tu producto en el bolsillo de tus usuarios, listo para escalar en las tiendas de apps.",
          cta: "Ver planes →",
        },
      ],
    },
    resultLabel: "Resultado: ",
    ctaPlans: "Ver planes →",
    ctaQuote: "Solicitar cotización →",
    portfolioScroll: "Ver portafolio",
  },
  portfolio: {
    label: "Portafolio",
    title: "Proyectos recientes",
    hint: "Deslizá para ver más →",
    screenshotAlt: "Captura del proyecto ",
    projects: [
      { category: "Sitio corporativo", title: "Bufete de abogados" },
      { category: "E-commerce", title: "Tienda de retail" },
      { category: "App SaaS", title: "Panel de Inventario" },
      { category: "Sitio corporativo", title: "Bienes raíces" },
      { category: "Landing page", title: "Clínica dental" },
    ],
  },
  plans: {
    label: "Planes y precios",
    title: "Planes base claros, adaptados a tu necesidad",
    description:
      "Paquetes de referencia para web, e-commerce, apps móviles y mantenimiento. El precio final se ajusta después de la reunión de descubrimiento según alcance y complejidad.",
    tabs: {
      web: "Sitios web",
      shop: "Tienda online",
      mobile: "App móvil",
      maintenance: "Mantenimiento",
    },
    groups: {
      web: {
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
      shop: {
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
      mobile: {
        description:
          "Aplicación móvil completa para iOS y Android. Incluye diseño, desarrollo, integración con backend y publicación en tiendas.",
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
      maintenance: {
        description:
          "Plan mensual para que tu sitio o app siga activo, seguro y actualizado sin que tengas que preocuparte por lo técnico.",
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
    },
    mostChosen: "Más elegido",
    requestPlan: "Solicitar este plan",
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
  coverage: {
    label: "Cobertura",
    title: "Trabajamos en todo Costa Rica",
    description:
      "Seleccioná una provincia en el mapa para conocer más sobre la cobertura y servicios disponibles en cada zona.",
    mapAria: "Mapa interactivo de Costa Rica por provincias",
    mapHint: "Tocá o pasá el cursor sobre una provincia",
    provinceLabel: "Provincia",
    provinceAriaPrefix: "Provincia de ",
    capitalPrefix: "Capital: ",
    stats: {
      businessesLabel: "Negocios sin digitalización.",
      pymesSuffix: "pymes.",
      zoneLabel: "Zona",
      servicesLabel: "Servicios frecuentes",
    },
    consultCta: "Consultar disponibilidad →",
    provinces: {
      CRA: {
        highlight: "Zona norte y Arenal",
        services: "E-commerce, sitios corporativos",
      },
      CRG: {
        highlight: "Pacífico norte, turismo",
        services: "Tiendas online, reservas",
      },
      CRL: {
        highlight: "Caribe costero",
        services: "Sitios web, logística digital",
      },
      CRP: {
        highlight: "Pacífico central y sur",
        services: "E-commerce, portafolios",
      },
      CRH: {
        highlight: "Hub tecnológico",
        services: "Software a medida, SaaS",
      },
      CRSJ: {
        highlight: "Capital, centro económico",
        services: "Proyectos full-stack, E-commerce",
      },
      CRC: {
        highlight: "Valle Central oriental",
        services: "Apps SaaS, landing pages",
      },
    },
  },
  booking: {
    label: "Agendar cita",
    title: "Coordinemos una reunión de descubrimiento",
    description:
      "Elegí el día y la hora que te quede mejor. Las citas son virtuales (Google Meet o Zoom) o presenciales en horario de Costa Rica.",
    prevMonth: "Mes anterior",
    nextMonth: "Mes siguiente",
    availabilityNote: "Disponible lun–vie · America/Costa Rica",
    selectDayPrompt:
      "Seleccioná un día en el calendario para ver los horarios disponibles.",
    selectedDateLabel: "Fecha seleccionada",
    availableTimesLabel: "Horario disponible",
    confirmPrefix: "Confirmá tu cita para ",
    namePlaceholder: "Nombre o empresa",
    emailPlaceholder: "Correo electrónico",
    notesPlaceholder: "Notas opcionales (tema de la reunión)",
    confirmButton: "Confirmar cita",
    loadingButton: "Agendando...",
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
      "¿Qué incluye el mantenimiento?",
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
          "Los proyectos van desde $400 (sitio corporativo) hasta $1,500+ (app SaaS). E-commerce desde $800. Mantenimiento desde $20/mes. Cada cotización es a medida según alcance — escríbeme a info@onvisiondigital.com y te preparo una propuesta sin compromiso.",
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
          "El plan de mantenimiento incluye actualizaciones de seguridad, backups, monitoreo básico y soporte por correo. Desde $20/mes según el tamaño del proyecto.",
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
          "Ofrezco sitios web corporativos, tiendas online (e-commerce), aplicaciones SaaS a medida y mantenimiento mensual. Todo con código propio — sin plantillas genéricas.",
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
};

const en: SiteCopy = {
  nav: {
    services: "Services",
    portfolio: "Portfolio",
    plans: "Plans",
    schedule: "Schedule",
    process: "Process",
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
    title: "Strategic digitalization",
    titleAccent: "tailored to you",
    description:
      "We design and implement custom technology solutions that drive efficiency, growth, and digital transformation for companies and businesses.",
    pills: ["Websites", "E-commerce", "Software (SaaS)", "Maintenance"],
    contactUs: "Contact us",
    scheduleCta: "Book a call →",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    bgAlt: "Hero background",
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
      title: "Web solutions ready to grow your business",
      description:
        "Every project is custom — we don't use generic templates. Clean, fast code that's easy to maintain.",
      cards: [
        {
          code: "SVC-01",
          tier: "Core service",
          badge: "Most requested",
          title: "Business website",
          description:
            "A professional site that builds trust, ranks on Google, and gives your brand a solid digital presence.",
          features: [
            "Landing pages and corporate websites",
            "Responsive design for mobile and desktop",
            "On-page SEO optimization",
            "Forms and lead capture",
            "WhatsApp and social media integration",
            "Hosting and domain setup included",
          ],
          result:
            "A professional presence that builds trust and positions your business in search engines.",
          cta: "View plans →",
        },
        {
          code: "SVC-02",
          tier: "Core service",
          title: "Online store (e-commerce)",
          description:
            "Catalog, cart, online payments, and an admin panel so you can manage sales yourself.",
          features: [
            "Product catalog with filters",
            "Cart and checkout with online payments",
            "Admin panel to manage orders",
            "Stripe / SINPE / bank transfer integration",
            "Inventory and product variants",
            "Sale notifications by email",
          ],
          result:
            "Automated online sales with full control of catalog, orders, and payments.",
          cta: "View plans →",
        },
      ],
    },
    divider: "Custom specialties · quote-based",
    custom: {
      label: "Custom projects",
      title: "Custom software and mobile apps",
      cards: [
        {
          code: "SVC-03",
          tier: "Quote-based",
          title: "Web app (SaaS)",
          description:
            "Software with login, user roles, database, and features tailored to your operations.",
          features: [
            "Login, registration, and user roles",
            "Custom dashboards and workflows",
            "Database and REST API",
            "Third-party service integrations",
            "Reports and data export",
            "Scalable architecture as you grow",
          ],
          result:
            "Your own software that automates internal processes and adapts to your business.",
          cta: "Request a quote →",
        },
        {
          code: "SVC-04",
          tier: "Quote-based",
          title: "Mobile app",
          description:
            "Full iOS and Android app with custom design, integrated backend, and store publishing.",
          features: [
            "Cross-platform app (iOS + Android)",
            "Mobile-first UI/UX design",
            "Login, registration, and push notifications",
            "API / backend integration",
            "Offline mode and data sync",
            "Assisted publishing on App Store and Google Play",
          ],
          result:
            "Your product in your users' pockets, ready to scale on app stores.",
          cta: "View plans →",
        },
      ],
    },
    resultLabel: "Outcome: ",
    ctaPlans: "View plans →",
    ctaQuote: "Request a quote →",
    portfolioScroll: "View portfolio",
  },
  portfolio: {
    label: "Portfolio",
    title: "Recent projects",
    hint: "Swipe to see more →",
    screenshotAlt: "Project screenshot ",
    projects: [
      { category: "Corporate website", title: "Law firm" },
      { category: "E-commerce", title: "Retail store" },
      { category: "SaaS app", title: "Inventory Dashboard" },
      { category: "Corporate website", title: "Real estate" },
      { category: "Landing page", title: "Dental clinic" },
    ],
  },
  plans: {
    label: "Plans & pricing",
    title: "Clear base plans tailored to your needs",
    description:
      "Reference packages for web, e-commerce, mobile apps, and maintenance. Final pricing is adjusted after the discovery call based on scope and complexity.",
    tabs: {
      web: "Websites",
      shop: "Online store",
      mobile: "Mobile app",
      maintenance: "Maintenance",
    },
    groups: {
      web: {
        description:
          "Base plans for digital presence and corporate websites. Final pricing is adjusted after the discovery call.",
        plans: [
          {
            name: "Standard",
            tagline: "Professional presence ready to sell.",
            price: "$425",
            unit: "USD · one-time",
            features: [
              "Single-section landing page",
              "Mobile-first responsive design",
              "Contact form + social media links",
              "Custom animations and interactions",
              "On-page SEO",
              "Deployment included",
              "Speed optimization",
              "SSL certificate and domain setup",
              "2 rounds of revisions",
            ],
          },
          {
            name: "Professional",
            tagline: "The standard for growing companies.",
            price: "$650",
            unit: "USD · one-time",
            highlighted: true,
            features: [
              "Multi-page website",
              "Premium animations and interactions",
              "Blog or basic content manager",
              "Analytics and form integrations",
              "Advanced on-page SEO",
              "30-day post-delivery warranty",
              "WhatsApp and social media integration",
              "Conversion-focused optimization",
              "Up to 3–4 rounds of revisions",
              "Basic usage training",
            ],
          },
          {
            name: "SaaS Platform",
            tagline: "Web applications with business logic.",
            price: "$1,250",
            unit: "USD · starting at",
            features: [
              "Web app with authentication and database",
              "Custom admin panel",
              "Roles, permissions, and external integrations",
              "Scalable architecture",
              "60-day post-delivery warranty",
              "Custom dashboards and reports",
              "Payment gateway",
              "Email and in-app notifications",
              "Enhanced security (encryption and headers)",
              "Delivery and training",
            ],
          },
        ],
      },
      shop: {
        description:
          "Base plans for e-commerce and digital catalogs. Advanced integrations are quoted based on complexity.",
        plans: [
          {
            name: "Starter",
            tagline: "Your first online store up and running.",
            price: "$800",
            unit: "USD · one-time",
            features: [
              "Catalog of up to 50 products",
              "Functional cart and checkout",
              "Online payments (Stripe / bank transfer)",
              "Admin panel for orders",
              "Responsive design",
              "Basic product SEO",
              "Sale notifications by email",
              "Deployment included",
              "3 rounds of revisions",
            ],
          },
          {
            name: "Professional",
            tagline: "Full e-commerce to scale sales.",
            price: "$1,100",
            unit: "USD · one-time",
            highlighted: true,
            features: [
              "Unlimited catalog with filters",
              "Variants, inventory, and coupons",
              "Conversion-optimized checkout",
              "Advanced SINPE / Stripe integration",
              "Admin panel with sales reports",
              "30-day post-delivery warranty",
              "Advanced e-commerce SEO",
              "WhatsApp integration for orders",
              "Up to 5 rounds of revisions",
              "Training to manage your store",
            ],
          },
          {
            name: "Advanced",
            tagline: "Stores with complex business logic.",
            price: "$1,500",
            unit: "USD · starting at",
            features: [
              "Multi-vendor or multi-branch",
              "Subscriptions and recurring payments",
              "ERP / external inventory integrations",
              "Automations and webhooks",
              "Real-time metrics dashboards",
              "30-day post-delivery warranty",
              "User roles (admin, seller, etc.)",
              "API for future integrations",
              "Documented scalable architecture",
              "Priority launch support",
            ],
          },
        ],
      },
      mobile: {
        description:
          "Complete mobile app for iOS and Android. Includes design, development, backend integration, and store publishing.",
        plans: [
          {
            name: "Full app",
            tagline: "Your product in your users' pockets.",
            price: "$1,900",
            unit: "USD · one-time",
            highlighted: true,
            features: [
              "Native cross-platform app (iOS + Android)",
              "Custom mobile-first UI/UX design",
              "Login, registration, and password recovery",
              "Integration with existing API / backend",
              "Push notifications",
              "Offline mode and data sync",
              "In-app payments and subscriptions (if applicable)",
              "Assisted publishing on App Store and Google Play",
              "Analytics, usage metrics, and error reporting",
              "30-day post-launch warranty",
              "Admin panel or CMS/web connection",
              "Deep links and content sharing",
              "Training and delivery documentation",
            ],
          },
        ],
      },
      maintenance: {
        description:
          "Monthly plan to keep your site or app active, secure, and up to date without worrying about the technical side.",
        plans: [
          {
            name: "Monthly plan",
            tagline: "Your site always active, secure, and up to date.",
            price: "$20",
            unit: "USD · per month",
            highlighted: true,
            features: [
              "Hosting and uptime monitoring",
              "Periodic automatic backups",
              "Security updates",
              "Dependency and plugin updates",
              "SSL certificate renewal and management",
              "Technical support via WhatsApp and email",
              "Performance and speed monitoring",
              "Monthly site status report",
              "Minor post-launch bug fixes",
              "Basic content updates included",
            ],
          },
        ],
      },
    },
    mostChosen: "Most popular",
    requestPlan: "Request this plan",
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
  coverage: {
    label: "Coverage",
    title: "We work across all of Costa Rica",
    description:
      "Select a province on the map to learn more about coverage and available services in each area.",
    mapAria: "Interactive map of Costa Rica by province",
    mapHint: "Tap or hover over a province",
    provinceLabel: "Province",
    provinceAriaPrefix: "Province of ",
    capitalPrefix: "Capital: ",
    stats: {
      businessesLabel: "Businesses without digitalization.",
      pymesSuffix: "SMBs.",
      zoneLabel: "Area",
      servicesLabel: "Common services",
    },
    consultCta: "Check availability →",
    provinces: {
      CRA: {
        highlight: "Northern zone and Arenal",
        services: "E-commerce, corporate websites",
      },
      CRG: {
        highlight: "Northern Pacific, tourism",
        services: "Online stores, booking systems",
      },
      CRL: {
        highlight: "Caribbean coast",
        services: "Websites, digital logistics",
      },
      CRP: {
        highlight: "Central and southern Pacific",
        services: "E-commerce, portfolios",
      },
      CRH: {
        highlight: "Tech hub",
        services: "Custom software, SaaS",
      },
      CRSJ: {
        highlight: "Capital, economic center",
        services: "Full-stack projects, e-commerce",
      },
      CRC: {
        highlight: "Eastern Central Valley",
        services: "SaaS apps, landing pages",
      },
    },
  },
  booking: {
    label: "Book a call",
    title: "Let's schedule a discovery meeting",
    description:
      "Pick the day and time that works best for you. Meetings are virtual (Google Meet or Zoom) or in-person during Costa Rica business hours.",
    prevMonth: "Previous month",
    nextMonth: "Next month",
    availabilityNote: "Available Mon–Fri · America/Costa Rica",
    selectDayPrompt:
      "Select a day on the calendar to see available time slots.",
    selectedDateLabel: "Selected date",
    availableTimesLabel: "Available times",
    confirmPrefix: "Confirm your appointment for ",
    namePlaceholder: "Name or company",
    emailPlaceholder: "Email address",
    notesPlaceholder: "Optional notes (meeting topic)",
    confirmButton: "Confirm appointment",
    loadingButton: "Booking...",
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
      "What's included in maintenance?",
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
          "Projects range from $400 (corporate website) to $1,500+ (SaaS app). E-commerce from $800. Maintenance from $20/month. Each quote is tailored to scope — email info@onvisiondigital.com and I'll prepare a no-obligation proposal.",
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
          "The maintenance plan includes security updates, backups, basic monitoring, and email support. From $20/month depending on project size.",
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
          "I offer corporate websites, online stores (e-commerce), custom SaaS applications, and monthly maintenance. All with custom code — no generic templates.",
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
};

export const translations: Record<Locale, SiteCopy> = { es, en };
