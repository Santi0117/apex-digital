import type { Metadata } from "next";
import CompanyNav from "@/components/company/CompanyNav";
import CompanyFooter from "@/components/company/CompanyFooter";
import OnvisionCLI from "@/components/company/OnvisionCLI";
import WhatsAppFab from "@/components/WhatsAppFab";
import DigitalPage from "@/components/digital/DigitalPage";
import "@/components/digital/DigitalPage.css";
import "@/components/digital/DigitalPricing.css";
import "@/components/digital/DigitalImpact.css";
import "@/components/digital/DigitalMeeting.css";
import "@/components/digital/Carousel.css";

export const metadata: Metadata = {
  title: "Onvision Digital — Sitios, tiendas y software a medida",
  description:
    "Sitios web, e-commerce, software a medida y apps. Diseño a tu marca, Onvi incluido y entrega lista para revisar.",
};

export default function DigitalRoutePage() {
  return (
    <div className="bg-black min-h-screen">
      <CompanyNav />
      <main>
        <DigitalPage />
      </main>
      <CompanyFooter />
      <OnvisionCLI />
      <WhatsAppFab />
    </div>
  );
}
