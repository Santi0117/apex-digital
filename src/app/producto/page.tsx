import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import SiteAurora from "@/components/SiteAurora";
import LandingTop from "@/components/LandingTop";
import CentralizedShowcase from "@/components/CentralizedShowcase";
import BaseCommon from "@/components/BaseCommon";
import Problem from "@/components/Problem";
import HowItWorks from "@/components/HowItWorks";
import Verticals from "@/components/Verticals";
import ValueProps from "@/components/ValueProps";
import Comparison from "@/components/Comparison";
import Pricing from "@/components/Pricing";
import Waitlist from "@/components/Waitlist";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Onvision — SaaS para empresas en Costa Rica",
  description:
    "Facturación electrónica 4.4, inventario y módulos por industria. Un producto de Onvision Digital.",
};

export default function ProductoPage() {
  return (
    <>
      <Navbar />
      <div className="relative min-h-screen bg-[#0a0f14]">
        <SiteAurora />
        <main className="relative z-10">
          <LandingTop />
          <CentralizedShowcase />
          <BaseCommon />
          <Problem />
          <HowItWorks />
          <Verticals />
          <ValueProps />
          <Comparison />
          <Pricing />
          <Waitlist />
        </main>
      </div>
      <Footer />
    </>
  );
}
