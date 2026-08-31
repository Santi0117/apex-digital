import Hero from "@/components/Hero";
import ServicesMarquee from "@/components/ServicesMarquee";
import Services from "@/components/Services";
import ScrollStackShowcase from "@/components/ScrollStackShowcase";
import Plans from "@/components/Plans";
import Process from "@/components/Process";
import Faq from "@/components/Faq";
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
        <ScrollStackShowcase />
        <Plans />
        <Process />
        <Faq />
        <BookAppointment />
        <ContactForm />
        <Assistant />
        <Footer />
      </main>
      <WhatsAppFloat />
    </>
  );
}
