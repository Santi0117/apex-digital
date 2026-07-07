import Hero from "@/components/Hero";
import ServicesMarquee from "@/components/ServicesMarquee";
import Services from "@/components/Services";
import Plans from "@/components/Plans";
import Process from "@/components/Process";
import CoverageMap from "@/components/CoverageMap";
import ContactForm from "@/components/ContactForm";
import BookAppointment from "@/components/BookAppointment";
import Assistant from "@/components/Assistant";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function Home() {
  return (
    <>
      <main className="bg-page">
        <Hero />
        <ServicesMarquee />
        <Services />
        <Plans />
        <Process />
        <CoverageMap />
        <BookAppointment />
        <ContactForm />
        <Assistant />
        <Footer />
      </main>
      <WhatsAppFloat />
    </>
  );
}
