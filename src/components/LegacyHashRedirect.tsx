"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Legacy hashes from the old single-page portafolio on onvisiondigital.com */
const HASH_REDIRECTS: Record<string, string> = {
  "#planes": "/digital#planes",
  "#servicios": "/digital",
  "#agendar": "/digital#agendar",
  "#cotizar": "/digital#agendar",
  "#contacto": "/digital#agendar",
  "#faq": "/digital#faq",
  "#proceso": "/digital",
  "#portafolio": "/empresas",
  "#cobertura": "/empresas",
  "#galeria-stack": "/empresas",
};

export default function LegacyHashRedirect() {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash.toLowerCase();
    const dest = HASH_REDIRECTS[hash];
    if (!dest) return;
    router.replace(dest);
  }, [router]);

  return null;
}
