import type { Metadata } from "next";
import CompanyNav from "@/components/company/CompanyNav";
import CompanyFooter from "@/components/company/CompanyFooter";
import OnvisionCLI from "@/components/company/OnvisionCLI";
import WhatsAppFab from "@/components/WhatsAppFab";
import EmpresasPage from "@/components/empresas/EmpresasPage";
import "@/components/empresas/EmpresasPage.css";

export const metadata: Metadata = {
  title: "Empresas — Onvision Digital",
  description:
    "Sitios, tiendas y software a medida que ya están corriendo. Ejemplos reales de Onvision Digital.",
};

export default function EmpresasRoutePage() {
  return (
    <div className="bg-black min-h-screen">
      <CompanyNav />
      <main>
        <EmpresasPage />
      </main>
      <CompanyFooter />
      <OnvisionCLI />
      <WhatsAppFab />
    </div>
  );
}
