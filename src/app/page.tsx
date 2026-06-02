import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import CoverageMap from "@/components/CoverageMap";
import ContactForm from "@/components/ContactForm";
import Assistant from "@/components/Assistant";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Services />
        <Portfolio />
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
