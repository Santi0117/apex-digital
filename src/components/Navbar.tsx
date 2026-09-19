"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/content";
import { site } from "@/lib/site";
import LogoMark from "./LogoMark";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const sectionHref = (href: string) =>
    href.startsWith("#") && pathname !== "/producto"
      ? `/producto${href}`
      : href;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-ov-deep/85 shadow-[0_12px_40px_-20px_rgba(0,0,0,0.65)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 md:px-8">
        <a href="/" className="transition-opacity hover:opacity-90">
          <span className="md:hidden">
            <LogoMark variant="light" className="h-7" showName={false} />
          </span>
          <span className="hidden md:inline-flex">
            <LogoMark
              variant="light"
              className="h-9"
              showName
              nameClassName="text-lg font-medium tracking-wide text-white"
            />
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={sectionHref(link.href)}
              className="text-sm text-white/70 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={site.parentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-white/45 transition hover:text-white"
          >
            {site.parentName}
          </a>
          <a href="/activar" className="btn-ghost-cyan !px-4 !py-2.5">
            Activar
          </a>
        </div>

        <button
          type="button"
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menú"
          aria-expanded={open}
        >
          <span
            className={`block h-0.5 w-6 bg-white transition-transform ${
              open ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-opacity ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-transform ${
              open ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-ov-deep/95 px-5 py-4 backdrop-blur-xl md:hidden">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={sectionHref(link.href)}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-white"
              >
                {link.label}
              </a>
            ))}
            <a
              href={site.parentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/55"
            >
              {site.parentName}
            </a>
            <a
              href="/activar"
              className="btn-teal text-center"
              onClick={() => setOpen(false)}
            >
              Activar
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
