import type { Metadata } from "next";
import Hero from "@/components/Hero";
import ScrollStackShowcase from "@/components/ScrollStackShowcase";
import MonthlyPlans from "@/components/MonthlyPlans";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export const metadata: Metadata = {
  title: "Landing — Scroll Stack",
  description:
    "Landing de Onvision Digital con galería ScrollStack de proyectos.",
};

export default function LandingPage() {
  return (
    <>
      <main className="bg-page">
        <Hero />
        <ScrollStackShowcase />
        <MonthlyPlans />
      </main>
      <WhatsAppFloat />
    </>
  );
}
