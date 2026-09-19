"use client";

import { usePathname } from "next/navigation";
import { companyNav } from "@/lib/company";
import { site } from "@/lib/site";
import PillNav from "../PillNav";
import CardNav from "../CardNav";

const NAV_ITEMS = companyNav.map((link) => ({
  label: link.label,
  href: link.href,
}));

export default function CompanyNav() {
  const pathname = usePathname();

  const activeHref =
    companyNav.find((link) => {
      if (link.href.startsWith("http")) return false;
      const path = link.href.split("#")[0];
      return path === pathname;
    })?.href ?? undefined;

  return (
    <>
      <div className="ov-nav-desktop">
        <PillNav
          logo="/logo-eye.png"
          logoAlt="Onvision Digital"
          items={NAV_ITEMS}
          activeHref={activeHref}
          className="ov-pill-nav"
          ease="power2.easeOut"
          baseColor="#0a0a0a"
          pillColor="#0a0a0a"
          pillTextColor="#ffffff"
          hoveredPillTextColor="#0a0a0a"
          socialHref={site.instagram}
          socialLabel="Instagram"
          initialLoadAnimation
        />
      </div>
      <CardNav
        logo="/logo-eye.png"
        logoAlt="Onvision Digital"
        items={NAV_ITEMS}
        baseColor="#0a0a0a"
        menuColor="#ffffff"
        buttonBgColor="#ffffff"
        buttonTextColor="#0a0a0a"
        buttonLabel="Sobre nosotros"
        buttonHref="/sobre-nosotros"
        socialHref={site.instagram}
        socialLabel="Instagram"
        ease="power3.out"
      />
    </>
  );
}
