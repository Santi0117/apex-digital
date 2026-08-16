import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${site.name} — SaaS multi-vertical para empresas en Costa Rica`,
  description:
    "Facturación electrónica 4.4, inventario y analíticas en el núcleo. Activá módulos por industria: clínicas, restaurantes, retail, talleres y más. Un producto de Onvision Digital.",
  keywords: [
    "facturación electrónica Costa Rica",
    "SaaS Costa Rica",
    "SINPE Móvil",
    "Hacienda 4.4",
    "software PYMEs",
    "Onvision",
    "Onvision Digital",
  ],
  icons: {
    icon: [
      { url: "/logo-icon.svg", type: "image/svg+xml" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "es_CR",
    siteName: site.name,
    title: `${site.name} — El SaaS hecho para Costa Rica`,
    description:
      "Un solo núcleo. Muchas industrias. Facturación, inventario y verticales listas para tu giro. Producto de Onvision Digital.",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
