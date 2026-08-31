export type CompanyCategory =
  | "restaurant"
  | "store"
  | "clinic"
  | "education"
  | "automotive"
  | "agriculture"
  | "corporate";

/** Tipo de solución que Onvision desarrolló para el cliente */
export type ProjectType = "website" | "ecommerce" | "software";

export type CompanyProvince =
  | "san-jose"
  | "heredia"
  | "cartago"
  | "alajuela"
  | "guanacaste"
  | "usa";

export const COMPANY_CATEGORIES: CompanyCategory[] = [
  "restaurant",
  "store",
  "clinic",
  "education",
  "automotive",
  "agriculture",
  "corporate",
];

export const COMPANY_PROVINCES: CompanyProvince[] = [
  "san-jose",
  "heredia",
  "cartago",
  "alajuela",
  "guanacaste",
  "usa",
];

export type TrustedCompany = {
  id: string;
  name: string;
  /** Logo en /public — vacío para usar iniciales */
  logo: string;
  /** Fondo blanco fijo para logos con transparencia o colores claros */
  logoOnWhite?: boolean;
  initials: string;
  accent: string;
  category: CompanyCategory;
  /** Categoría del proyecto: sitio web, e-commerce o software */
  projectType: ProjectType;
  province: CompanyProvince;
  sector: { es: string; en: string };
  location: { es: string; en: string };
  /** Pin exacto en el mapa */
  coords: { lat: number; lng: number };
  /** Si false, se muestra panel de destacados en lugar del mapa */
  showMap?: boolean;
  /** Bullets informativos cuando no hay mapa */
  highlights?: Array<{ es: string; en: string }>;
  /** Enlace externo para abrir ubicación (Waze, Google Maps, etc.) */
  navigationUrl?: string;
  description: { es: string; en: string };
  contacts: {
    email?: string;
    phone?: string;
    website?: string;
    whatsapp?: string;
    instagram?: string;
  };
};

/**
 * Ejemplos / referencias del portafolio.
 * Reemplazá coords con la dirección real del cliente
 * (Google Maps → clic derecho en el punto → coordenadas).
 */
export const TRUSTED_COMPANIES: TrustedCompany[] = [
  {
    id: "jopa-realestate",
    name: "Jopa Real Estate",
    logo: "/clients/jopa-realestate.png",
    initials: "JR",
    accent: "#2563eb",
    category: "corporate",
    projectType: "website",
    province: "cartago",
    sector: { es: "Inmobiliaria", en: "Real estate" },
    location: { es: "Pitahaya, Cartago, Costa Rica", en: "Pitahaya, Cartago, Costa Rica" },
    coords: { lat: 9.8847, lng: -83.9589 },
    navigationUrl:
      "https://waze.com/ul?q=Pitahaya%2C%20Cartago%2C%20Costa%20Rica&navigate=yes",
    description: {
      es: "Agencia inmobiliaria en Cartago. Compra, venta y asesoría de propiedades residenciales y comerciales en la zona central.",
      en: "Real estate agency in Cartago. They help with buying, selling, and advising on residential and commercial properties in the central region.",
    },
    contacts: {
      email: "joparealestate@gmail.com",
      phone: "+506 8640-4222",
      website: "https://joparealestate.com",
      whatsapp: "50686404222",
    },
  },
  {
    id: "alchemy",
    name: "Alchemy Studio",
    logo: "/clients/alchemy-studio.svg",
    initials: "AS",
    accent: "#a78bfa",
    category: "store",
    projectType: "website",
    province: "usa",
    sector: { es: "Estudio musical", en: "Music studio" },
    location: { es: "Estados Unidos", en: "United States" },
    coords: { lat: 33.7225, lng: -116.377 },
    description: {
      es: "Estudio de grabación y producción musical. Ofrecen sesiones en estudio, producción y servicios para artistas, bandas y proyectos creativos.",
      en: "Recording and music production studio. They offer studio sessions, production, and services for artists, bands, and creative projects.",
    },
    contacts: {
      email: "alchemymusicstudio@gmail.com",
      phone: "+1 760-690-3131",
      website: "https://www.alchemymusicstudio.com",
    },
  },
  {
    id: "la-pacifica",
    name: "Clínica Dental La Pacífica",
    logo: "/clients/la-pacifica.png",
    logoOnWhite: true,
    initials: "LP",
    accent: "#14b8a6",
    category: "clinic",
    projectType: "website",
    province: "san-jose",
    sector: { es: "Clínica dental", en: "Dental clinic" },
    location: {
      es: "San Francisco de Dos Ríos, San José",
      en: "San Francisco de Dos Ríos, San José",
    },
    coords: { lat: 9.8975, lng: -84.0542 },
    description: {
      es: "Centro odontológico en San Francisco de Dos Ríos. Cirugía dental, ortodoncia, endodoncia, periodoncia y atención integral para adultos y niños.",
      en: "Dental center in San Francisco de Dos Ríos. Oral surgery, orthodontics, endodontics, periodontics, and comprehensive care for adults and children.",
    },
    contacts: {
      phone: "+506 2250-3633",
      website: "https://la-pacifica.onvisiondigital.com",
    },
  },
  {
    id: "jopa-autos",
    name: "Jopa Autos",
    logo: "/clients/jopa-autos.png",
    logoOnWhite: true,
    initials: "JA",
    accent: "#60a5fa",
    category: "automotive",
    projectType: "website",
    province: "cartago",
    sector: { es: "Venta de vehículos", en: "Vehicle sales" },
    location: { es: "Pitahaya, Cartago, Costa Rica", en: "Pitahaya, Cartago, Costa Rica" },
    coords: { lat: 9.8847, lng: -83.9589 },
    navigationUrl:
      "https://waze.com/ul?q=Pitahaya%2C%20Cartago%2C%20Costa%20Rica&navigate=yes",
    description: {
      es: "Concesionario de vehículos usados y nuevos en Pitahaya, Cartago. Inventario variado, financiamiento y asesoría para encontrar el carro adecuado.",
      en: "New and used vehicle dealership in Pitahaya, Cartago. Varied inventory, financing options, and guidance to find the right car.",
    },
    contacts: {
      email: "joparealestate@gmail.com",
      phone: "+506 8640-4222",
      website: "https://autosjopa.com",
      whatsapp: "50686404222",
    },
  },
  {
    id: "firstdown",
    name: "FirstDown",
    logo: "/clients/firstdown.png",
    initials: "FD",
    accent: "#0ea5e9",
    category: "store",
    projectType: "ecommerce",
    province: "san-jose",
    sector: { es: "Tienda de jerseys", en: "Jersey store" },
    location: { es: "San José, Costa Rica", en: "San José, Costa Rica" },
    coords: { lat: 9.93265, lng: -84.07958 },
    showMap: false,
    highlights: [
      { es: "Catálogo por liga y equipo", en: "Catalog by league and team" },
      { es: "Personalización de jerseys", en: "Jersey customization" },
      { es: "Checkout y envíos", en: "Checkout and shipping" },
      { es: "Tienda online en colones", en: "Online store in colones" },
    ],
    description: {
      es: "Tienda de jerseys de fútbol americano y béisbol en Costa Rica. Venden camisetas oficiales por liga y equipo, con personalización y pedidos con envío.",
      en: "American football and baseball jersey store in Costa Rica. They sell official jerseys by league and team, with customization and shipping on orders.",
    },
    contacts: {
      instagram: "@firstdown_store",
      phone: "+506 2222-0101",
      website: "https://firstdown-store.onvisiondigital.com",
      whatsapp: "50663030204",
    },
  },
  {
    id: "clinicos",
    name: "Clinic OS",
    logo: "/clients/clinic-os.svg",
    initials: "CO",
    accent: "#f472b6",
    category: "clinic",
    projectType: "website",
    province: "cartago",
    sector: { es: "Gestión clínica", en: "Clinic management" },
    location: { es: "Cartago, Costa Rica", en: "Cartago, Costa Rica" },
    coords: { lat: 9.86444, lng: -83.91944 },
    showMap: false,
    highlights: [
      { es: "Agenda y pacientes", en: "Appointments and patients" },
      { es: "Inventario clínico", en: "Clinical inventory" },
      { es: "Finanzas integradas", en: "Integrated finances" },
      { es: "Demo interactiva", en: "Interactive demo" },
    ],
    description: {
      es: "Plataforma de gestión para clínicas y consultorios: agenda, pacientes, inventario y finanzas en un solo lugar para el equipo de salud.",
      en: "Management platform for clinics and practices: appointments, patients, inventory, and finances in one place for the healthcare team.",
    },
    contacts: {
      phone: "+506 6303-0204",
      website: "https://clinicos.onvisiondigital.com",
    },
  },
  {
    id: "crestview",
    name: "Crestview Legal",
    logo: "/clients/crestview-legal.png",
    initials: "CV",
    accent: "#34d399",
    category: "corporate",
    projectType: "website",
    province: "usa",
    sector: { es: "Servicios legales", en: "Legal services" },
    location: { es: "Estados Unidos", en: "United States" },
    coords: { lat: 33.7225, lng: -116.377 },
    description: {
      es: "Firma de servicios legales que acompaña clientes en temas jurídicos con atención personalizada y enfoque en claridad y confianza.",
      en: "Legal services firm helping clients with legal matters through personalized attention and a focus on clarity and trust.",
    },
    contacts: {
      email: "info@crestview-legal.com",
      phone: "+1 760-690-3131",
      website: "https://www.crestview-legal.com",
    },
  },
  {
    id: "guba",
    name: "Guba",
    logo: "/clients/guba.png",
    initials: "GB",
    accent: "#fb7185",
    category: "store",
    projectType: "ecommerce",
    province: "san-jose",
    sector: { es: "Retail", en: "Retail" },
    location: { es: "San José, Costa Rica", en: "San José, Costa Rica" },
    coords: { lat: 9.93554, lng: -84.08902 },
    showMap: false,
    highlights: [
      { es: "Frutas, verduras y huevos", en: "Fruits, vegetables, and eggs" },
      { es: "Catálogo online", en: "Online catalog" },
      { es: "Pedidos directos", en: "Direct orders" },
      { es: "Entrega en zona", en: "Local delivery" },
    ],
    description: {
      es: "Tienda retail con catálogo de productos para compra online. Ofrecen variedad de artículos con compra directa desde la web.",
      en: "Retail store with an online product catalog. They offer a range of items with direct online purchasing.",
    },
    contacts: {
      phone: "+506 8496-3158",
      website: "https://frutasguba.onvisiondigital.com",
    },
  },
  {
    id: "fasamar",
    name: "Fasamar S.A.",
    logo: "/clients/fasamar.png",
    initials: "FS",
    accent: "#2dd4bf",
    category: "agriculture",
    projectType: "software",
    province: "cartago",
    sector: { es: "Distribución láctea", en: "Dairy distribution" },
    location: { es: "Cartago, Costa Rica", en: "Cartago, Costa Rica" },
    coords: { lat: 9.9058, lng: -83.6852 },
    description: {
      es: "Distribuidora de productos lácteos en Costa Rica. Venta y distribución de leche, quesos y derivados a comercios y rutas de la zona cartaginesa.",
      en: "Dairy products distributor in Costa Rica. They sell and deliver milk, cheese, and dairy goods to stores and routes across the Cartago region.",
    },
    contacts: {
      email: "fasamar@gmail.com",
      phone: "+506 8814-0411",
      instagram: "@lacteosfasamar",
    },
  },
  {
    id: "unilearn",
    name: "UniLearn",
    logo: "/clients/unilearn.svg",
    initials: "UL",
    accent: "#fbbf24",
    category: "education",
    projectType: "website",
    province: "alajuela",
    sector: { es: "Educación", en: "Education" },
    location: { es: "Alajuela, Costa Rica", en: "Alajuela, Costa Rica" },
    coords: { lat: 10.01625, lng: -84.21163 },
    showMap: false,
    highlights: [
      { es: "Admin · docente · estudiante", en: "Admin · teacher · student" },
      { es: "Calendario académico", en: "Academic calendar" },
      { es: "Tareas y seguimiento", en: "Assignments and tracking" },
      { es: "Demo interactiva", en: "Interactive demo" },
    ],
    description: {
      es: "Plataforma académica para instituciones educativas. Conecta administración, docentes y estudiantes con cursos, calendario, tareas y seguimiento del progreso.",
      en: "Academic platform for educational institutions. Connects administration, teachers, and students with courses, calendar, assignments, and progress tracking.",
    },
    contacts: {
      phone: "+506 6102-0204",
      website: "https://unilearn.onvisiondigital.com",
    },
  },
];

/** Embed con pin en lat/lng (sin API key). */
export function mapsEmbedUrl(coords: { lat: number; lng: number }): string {
  const q = `${coords.lat},${coords.lng}`;
  return `https://maps.google.com/maps?q=${encodeURIComponent(q)}&z=16&ll=${coords.lat},${coords.lng}&output=embed`;
}

export function mapsOpenUrl(coords: { lat: number; lng: number }): string {
  return `https://www.google.com/maps/search/?api=1&query=${coords.lat}%2C${coords.lng}`;
}
