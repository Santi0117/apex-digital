"use client";

import Logo from "./Logo";
import ScrollReveal from "./ScrollReveal";
import { site } from "@/lib/site";
import { useLanguage } from "@/lib/i18n/language-provider";

export default function Footer() {
  const { copy } = useLanguage();

  return (
    <footer className="px-6 md:px-12 py-10 border-t border-neutral-200/80 dark:border-neutral-800/80 bg-white/70 dark:bg-neutral-950/70 backdrop-blur-sm">
      <ScrollReveal>
        <div className="max-w-5xl mx-auto flex flex-col gap-8 md:flex-row md:justify-between md:items-start">
          <div>
            <Logo variant="dark" size="sm" />
            <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400 max-w-xs">{copy.footer.tagline}</p>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <a
              href={`mailto:${site.email}`}
              className="text-neutral-600 dark:text-neutral-400 hover:text-accent transition-colors"
            >
              {site.email}
            </a>
            <a
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-600 dark:text-neutral-400 hover:text-accent transition-colors"
            >
              WhatsApp +506 6303-0204
            </a>
          </div>
          <span className="text-sm text-neutral-400 dark:text-neutral-500 md:self-end">
            © {new Date().getFullYear()} {site.name}
          </span>
        </div>
      </ScrollReveal>
    </footer>
  );
}
