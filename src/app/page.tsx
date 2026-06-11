import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Plans from "@/components/Plans";
import Process from "@/components/Process";
import CoverageMap from "@/components/CoverageMap";
import ContactForm from "@/components/ContactForm";
import Assistant from "@/components/Assistant";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function Home() {
  return (
    <>
      <main className="bg-page">
        <Hero />
        <Services />
        <Portfolio />
        <Plans />
        <Process />
        <CoverageMap />
        <ContactForm />
        <Assistant />
        <Footer />
      </main>
      <WhatsAppFloat />
    </>
  );
}
