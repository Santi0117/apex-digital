import type { Metadata } from "next";
import TrustedCompaniesPage from "@/components/TrustedCompaniesPage";

export const metadata: Metadata = {
  title: "Empresas que confiaron en Onvision",
  description:
    "Marcas y proyectos que han trabajado con Onvision Digital: sitios, e-commerce y software a medida.",
};

export default function EmpresasPage() {
  return <TrustedCompaniesPage />;
}
