import { companyNav } from "@/lib/company";
import { site } from "@/lib/site";
import LogoMark from "../LogoMark";
import ScrollReveal from "../ScrollReveal";

export default function CompanyFooter() {
  return (
    <footer className="border-t border-white/10 bg-transparent px-5 pt-14 pb-24 text-white md:px-8">
      <ScrollReveal className="mx-auto max-w-6xl" variant="up">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <LogoMark variant="light" className="h-6" />
              <span className="text-sm font-medium">Onvision Digital</span>
            </div>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/45">
              Sitios, tiendas, software y el SaaS Onvision. Una empresa, varias
              puertas.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/60">
            {companyNav.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-white">
                {link.label}
              </a>
            ))}
            <a href={`mailto:${site.email}`} className="hover:text-white">
              {site.email}
            </a>
          </nav>
        </div>
        <p className="mt-10 text-xs text-white/30">
          © {new Date().getFullYear()} Onvision Digital · Costa Rica
        </p>
      </ScrollReveal>
    </footer>
  );
}
