import { site } from "@/lib/site";
import LogoMark from "./LogoMark";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ov-deep py-16 text-white">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="mb-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <div className="mb-4">
              <LogoMark
                variant="light"
                className="h-8"
                showName
                nameClassName="text-lg font-medium tracking-wide text-white"
              />
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-white/55">
              SaaS multi-vertical para empresas en Costa Rica. Facturación,
              inventario y módulos por industria.
            </p>
            <p className="mt-3 text-xs text-white/40">
              Un producto de{" "}
              <a
                href={site.parentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ov-teal-hot transition hover:text-white"
              >
                {site.parentName}
              </a>
            </p>
          </div>
          <div>
            <p className="mb-4 text-[11px] font-medium tracking-[0.2em] text-ov-teal-hot uppercase">
              Producto
            </p>
            <ul className="space-y-2.5 text-sm text-white/65">
              <li>
                <a href="/" className="transition hover:text-white">
                  Onvision Digital
                </a>
              </li>
              <li>
                <a href="/producto#modulos" className="transition hover:text-white">
                  Módulos
                </a>
              </li>
              <li>
                <a
                  href="/producto#industrias-imagenes"
                  className="transition hover:text-white"
                >
                  Industrias
                </a>
              </li>
              <li>
                <a href="/producto#precios" className="transition hover:text-white">
                  Precios
                </a>
              </li>
              <li>
                <a href="/activar" className="transition hover:text-white">
                  Activar
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="mb-4 text-[11px] font-medium tracking-[0.2em] text-ov-teal-hot uppercase">
              Contacto
            </p>
            <ul className="space-y-2.5 text-sm text-white/65">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="transition hover:text-white"
                >
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${site.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-white"
                >
                  WhatsApp {site.phone}
                </a>
              </li>
              <li>{site.location}</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} {site.parentName} — Onvision SaaS · Hecho
            en {site.region}
          </p>
          <div className="flex gap-6 text-xs text-white/40">
            <a
              href={site.parentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-white"
            >
              {site.parentUrl.replace("https://", "")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
