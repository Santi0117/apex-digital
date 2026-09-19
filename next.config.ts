import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    // Parent /Development/pnpm-lock.yaml confuses workspace detection
    root: path.resolve(__dirname),
  },
  /**
   * Legacy anchors / paths from mi-portafolio (onvisiondigital.com)
   * → new multi-page IA.
   */
  async redirects() {
    return [
      // Old single-page sections → Digital
      { source: "/servicios", destination: "/digital", permanent: true },
      { source: "/planes", destination: "/digital#planes", permanent: true },
      { source: "/cotizar", destination: "/digital#agendar", permanent: true },
      { source: "/agendar", destination: "/digital#agendar", permanent: true },
      { source: "/contacto", destination: "/digital#agendar", permanent: true },
      { source: "/faq", destination: "/digital#faq", permanent: true },
      { source: "/proceso", destination: "/digital", permanent: true },
      { source: "/portafolio", destination: "/empresas", permanent: true },
      { source: "/cobertura", destination: "/empresas", permanent: true },
      { source: "/galeria-stack", destination: "/empresas", permanent: true },

      // Old /landing alias
      { source: "/landing", destination: "/", permanent: true },

      // Hash-style paths some crawlers / shares used as path segments
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
