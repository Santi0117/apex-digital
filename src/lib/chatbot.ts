import { site } from "./site";

type ReplyRule = {
  keywords: string[];
  reply: string;
};

const rules: ReplyRule[] = [
  {
    keywords: ["cuesta", "precio", "costo", "cuanto", "cuánto", "presupuesto", "tarifa"],
    reply:
      "Los proyectos van desde $400 (sitio corporativo) hasta $1,500+ (app SaaS). E-commerce desde $800. Mantenimiento desde $20/mes. Cada cotización es a medida según alcance — escribime a " +
      site.email +
      " y te preparo una propuesta sin compromiso.",
  },
  {
    keywords: ["tiempo", "tarda", "demora", "plazo", "entrega", "semanas", "días"],
    reply:
      "Un sitio web suele llevar 2–4 semanas. E-commerce 4–6 semanas. Apps más complejas 6–12 semanas. Siempre con revisiones semanales para que estés al tanto del avance.",
  },
  {
    keywords: ["mantenimiento", "soporte", "updates", "backup", "hosting"],
    reply:
      "El plan de mantenimiento incluye actualizaciones de seguridad, backups, monitoreo básico y soporte por correo. Desde $20/mes según el tamaño del proyecto.",
  },
  {
    keywords: ["cr", "costa rica", "latinoamérica", "latam", "fuera", "remoto", "país", "pais"],
    reply:
      "Trabajo 100% remoto con clientes en " +
      site.region +
      " y fuera de la región. Las reuniones son por videollamada y la comunicación por correo o WhatsApp.",
  },
  {
    keywords: ["servicio", "ofrece", "hacen", "haces", "desarrollo", "ecommerce", "saas", "sitio"],
    reply:
      "Ofrezco sitios web corporativos, tiendas online (e-commerce), aplicaciones SaaS a medida y mantenimiento mensual. Todo con código propio — sin plantillas genéricas.",
  },
  {
    keywords: ["contacto", "hablar", "reunión", "llamada", "agendar", "escribir"],
    reply:
      "Podés escribirme a " +
      site.email +
      " o usar el botón «Hablemos» en la página. Respondo en menos de 24 horas hábiles.",
  },
  {
    keywords: ["hola", "buenas", "hey", "saludos", "qué tal", "que tal"],
    reply:
      "¡Hola! 👋 Soy el asistente de " +
      site.name +
      ". Preguntame sobre precios, tiempos, servicios o cómo empezar un proyecto.",
  },
];

const defaultReply =
  "No estoy seguro de entender esa pregunta. Podés preguntarme sobre precios, tiempos de entrega, servicios, mantenimiento o contacto. También podés escribir directo a " +
  site.email +
  ".";

export function getChatResponse(message: string): string {
  const normalized = message
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");

  for (const rule of rules) {
    if (rule.keywords.some((kw) => normalized.includes(kw))) {
      return rule.reply;
    }
  }

  return defaultReply;
}

export const welcomeMessage =
  "¡Hola! Soy el asistente de " +
  site.name +
  ". Puedo ayudarte con preguntas sobre servicios, precios y tiempos de entrega. ¿En qué te puedo ayudar?";

export const quickReplies = [
  "¿Cuánto cuesta un sitio web?",
  "¿Cuánto tiempo tarda?",
  "¿Qué incluye el mantenimiento?",
  "¿Trabajás fuera de CR?",
] as const;
