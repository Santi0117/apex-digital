import CompanyNav from "@/components/company/CompanyNav";
import CompanyHero from "@/components/company/CompanyHero";
import CompanyWalkthrough from "@/components/company/CompanyWalkthrough";
import CompanyOnvi from "@/components/company/CompanyOnvi";
import CompanyChats from "@/components/company/CompanyChats";
import CompanySistema from "@/components/company/CompanySistema";
import CompanyOffers from "@/components/company/CompanyOffers";
import OnvisionCLI from "@/components/company/OnvisionCLI";
import CompanyFooter from "@/components/company/CompanyFooter";
import WhatsAppFab from "@/components/WhatsAppFab";
import LegacyHashRedirect from "@/components/LegacyHashRedirect";

export default function Home() {
  return (
    <div className="bg-black">
      <LegacyHashRedirect />
      <CompanyNav />
      <main>
        <CompanyHero />
        <CompanyWalkthrough />
        <CompanyOnvi />
        <CompanyChats />
        <CompanySistema />
        <CompanyOffers />
        <OnvisionCLI />
      </main>
      <CompanyFooter />
      <WhatsAppFab />
    </div>
  );
}
