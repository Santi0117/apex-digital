import Navbar from "@/components/Navbar";
import LandingTop from "@/components/LandingTop";
import BaseCommon from "@/components/BaseCommon";
import Problem from "@/components/Problem";
import HowItWorks from "@/components/HowItWorks";
import Verticals from "@/components/Verticals";
import ValueProps from "@/components/ValueProps";
import Comparison from "@/components/Comparison";
import Pricing from "@/components/Pricing";
import Waitlist from "@/components/Waitlist";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <LandingTop />
        <BaseCommon />
        <Problem />
        <HowItWorks />
        <Verticals />
        <ValueProps />
        <Comparison />
        <Pricing />
        <Waitlist />
      </main>
      <Footer />
    </>
  );
}
