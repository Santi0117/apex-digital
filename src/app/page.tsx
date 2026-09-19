import { headers } from "next/headers";
import { redirect } from "next/navigation";
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

function isSistemaHost(host: string) {
  const h = host.toLowerCase().split(":")[0] ?? "";
  return (
    h === "sistema.onvisiondigital.com" ||
    h.startsWith("sistema.") ||
    h.includes("sistema-")
  );
}

export default async function Home() {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "";
  if (isSistemaHost(host)) {
    redirect("/activar");
  }

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
