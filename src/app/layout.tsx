import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Syne } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${site.name} — SaaS multi-vertical para empresas en Costa Rica`,
  description:
    "Facturación electrónica 4.4, inventario y analiticas en el nucleo. Activá módulos por industria: clínicas, restaurantes, retail, talleres y más. Hecho para Costa Rica.",
  keywords: [
    "facturación electrónica Costa Rica",
    "SaaS Costa Rica",
    "SINPE Móvil",
    "Hacienda 4.4",
    "software PYMEs",
    "Onvision",
  ],
  openGraph: {
    type: "website",
    locale: "es_CR",
    siteName: site.name,
    title: `${site.name} — El SaaS hecho para Costa Rica`,
    description:
      "Un solo núcleo. Muchas industrias. Facturación, inventario y verticales listas para tu giro.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${jakarta.variable} ${syne.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
