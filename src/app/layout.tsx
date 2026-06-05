import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { site } from "@/lib/site";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — Desarrollo web a medida`,
    template: `%s | ${site.name}`,
  },
  description:
    "Sitios web, e-commerce y apps SaaS con Next.js para negocios en Latinoamérica. Cotización sin compromiso.",
  keywords: [
    "desarrollo web",
    "Next.js",
    "e-commerce",
    "Costa Rica",
    "sitios web",
    "SaaS",
  ],
  openGraph: {
    type: "website",
    locale: "es_CR",
    url: siteUrl,
    siteName: "Onvision Digital",
    title: "Onvision Digital — Desarrollo web a medida",
    description:
      "Sitios web, e-commerce y apps SaaS con Next.js para negocios en Latinoamérica.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Onvision Digital — Desarrollo web a medida",
    description:
      "Sitios web, e-commerce y apps SaaS con Next.js para negocios en Latinoamérica.",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo-icon.svg", type: "image/svg+xml" },
      { url: "/icon", sizes: "96x96", type: "image/png" },
    ],
    apple: "/apple-icon",
    shortcut: "/favicon.ico",
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
