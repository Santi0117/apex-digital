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

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

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
    siteName: site.name,
    title: `${site.name} — Desarrollo web a medida`,
    description:
      "Sitios web, e-commerce y apps SaaS con Next.js para negocios en Latinoamérica.",
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description:
      "Sitios web, e-commerce y apps SaaS con Next.js para negocios en Latinoamérica.",
  },
  icons: {
    icon: "/logo-icon.svg",
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
