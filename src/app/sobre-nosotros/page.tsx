import type { Metadata } from "next";
import CompanyNav from "@/components/company/CompanyNav";
import CompanyFooter from "@/components/company/CompanyFooter";
import OnvisionCLI from "@/components/company/OnvisionCLI";
import WhatsAppFab from "@/components/WhatsAppFab";
import SobreNosotrosPage from "@/components/about/SobreNosotrosPage";

export const metadata: Metadata = {
  title: "Sobre nosotros — Onvision Digital",
  description:
    "Digitalizar un negocio no debería costar una fortuna. Conocé el objetivo y el stack de Onvision Digital.",
};

export default function SobreNosotrosRoutePage() {
  return (
    <div className="bg-black min-h-screen">
      <CompanyNav />
      <main>
        <SobreNosotrosPage />
      </main>
      <CompanyFooter />
      <OnvisionCLI />
      <WhatsAppFab />
    </div>
  );
}
