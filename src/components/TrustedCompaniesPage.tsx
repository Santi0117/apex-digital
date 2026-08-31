"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/components/Logo";
import LanguageToggle from "@/components/LanguageToggle";
import ThemeToggle from "@/components/ThemeToggle";
import ScrollReveal from "@/components/ScrollReveal";
import {
  TRUSTED_COMPANIES,
  COMPANY_CATEGORIES,
  COMPANY_PROVINCES,
  mapsEmbedUrl,
  mapsOpenUrl,
  type CompanyCategory,
  type CompanyProvince,
} from "@/lib/trusted-companies";
import { useLanguage } from "@/lib/i18n/language-provider";
import { site } from "@/lib/site";

function CompanyAvatar({
  name,
  logo,
  logoOnWhite,
  initials,
  accent,
  large,
}: {
  name: string;
  logo: string;
  logoOnWhite?: boolean;
  initials: string;
  accent: string;
  large?: boolean;
}) {
  const sizeClass = large
    ? "h-32 w-32 sm:h-40 sm:w-40"
    : "h-16 w-16 sm:h-20 sm:w-20";

  if (logo) {
    const isSvg = logo.endsWith(".svg");
    const bgClass = logoOnWhite ? "bg-white" : "bg-white dark:bg-neutral-950";

    return (
      <div
        className={`relative shrink-0 overflow-hidden rounded-2xl border-2 shadow-lg transition-transform duration-300 group-hover:scale-[1.02] ${bgClass} ${sizeClass}`}
        style={{
          borderColor: `${accent}66`,
          boxShadow: `0 12px 40px -12px ${accent}55`,
        }}
      >
        {isSvg ? (
          <img
            src={logo}
            alt=""
            className="absolute inset-0 h-full w-full object-contain p-4"
          />
        ) : (
          <Image
            src={logo}
            alt=""
            fill
            className="object-contain p-3 sm:p-4"
            sizes={large ? "160px" : "80px"}
          />
        )}
      </div>
    );
  }

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-2xl text-xl font-semibold text-white shadow-lg transition-transform duration-300 group-hover:scale-[1.02] sm:text-2xl ${sizeClass}`}
      style={{
        background: `linear-gradient(135deg, ${accent}, ${accent}cc)`,
        boxShadow: `0 12px 40px -12px ${accent}66`,
      }}
      aria-hidden
    >
      {initials}
      <span className="sr-only">{name}</span>
    </div>
  );
}

function ContactChip({
  href,
  label,
  children,
  external,
}: {
  href: string;
  label: string;
  children: ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200/90 bg-white/90 px-3 py-1.5 text-xs font-medium text-neutral-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent hover:shadow-md dark:border-neutral-700 dark:bg-neutral-900/90 dark:text-neutral-200 dark:hover:border-accent/50"
    >
      <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-400 dark:text-neutral-500">
        {label}
      </span>
      <span className="truncate">{children}</span>
    </a>
  );
}

function MiniMap({
  coords,
  navigationUrl,
  locationLabel,
  showLabel,
  hideLabel,
  openLabel,
  accent,
}: {
  coords: { lat: number; lng: number };
  navigationUrl?: string;
  locationLabel: string;
  showLabel: string;
  hideLabel: string;
  openLabel: string;
  accent: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-5 overflow-hidden rounded-xl border border-neutral-200/90 shadow-sm dark:border-neutral-700">
      <div
        className="flex flex-wrap items-center justify-between gap-2 px-3 py-2.5"
        style={{ background: `linear-gradient(90deg, ${accent}12, transparent)` }}
      >
        <p className="text-xs font-medium text-neutral-600 dark:text-neutral-300">
          📍 {locationLabel}
        </p>
        <div className="flex items-center gap-2">
          <a
            href={navigationUrl ?? mapsOpenUrl(coords)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-accent hover:text-accent-hover"
          >
            {openLabel}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="rounded-full px-3 py-1 text-xs font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: accent }}
            aria-expanded={open}
          >
            {open ? hideLabel : showLabel}
          </button>
        </div>
      </div>
      {open ? (
        <iframe
          title={locationLabel}
          src={mapsEmbedUrl(coords)}
          className="h-44 w-full border-0 sm:h-52"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group/map flex h-28 w-full items-center justify-center gap-2 text-sm font-medium transition-colors sm:h-32"
          style={{
            background: `linear-gradient(135deg, ${accent}18, ${accent}08)`,
            color: accent,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5 transition-transform group-hover/map:scale-110"
            aria-hidden
          >
            <path
              fillRule="evenodd"
              d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.02.009.008.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"
              clipRule="evenodd"
            />
          </svg>
          {showLabel}
        </button>
      )}
    </div>
  );
}

function WebsiteCta({
  href,
  label,
  accent,
  displayUrl,
}: {
  href: string;
  label: string;
  accent: string;
  displayUrl: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group mt-4 flex w-full items-center justify-between gap-3 rounded-2xl px-5 py-3.5 text-left shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl active:scale-[0.99] sm:py-4"
      style={{
        background: `linear-gradient(135deg, ${accent}, ${accent}cc)`,
        boxShadow: `0 14px 36px -10px ${accent}55`,
      }}
    >
      <span className="min-w-0">
        <span className="block text-sm font-bold text-white sm:text-base">{label}</span>
        <span className="mt-0.5 block truncate text-xs font-medium text-white/75 sm:text-sm">
          {displayUrl}
        </span>
      </span>
      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20 text-white transition-transform duration-200 group-hover:translate-x-0.5 group-hover:bg-white/30"
        aria-hidden
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
          <path
            fillRule="evenodd"
            d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    </a>
  );
}

function CompanySpotlight({
  title,
  items,
  accent,
  website,
  visitLabel,
}: {
  title: string;
  items: string[];
  accent: string;
  website?: string;
  visitLabel?: string;
}) {
  return (
    <div className="mt-5 overflow-hidden rounded-xl border border-neutral-200/90 shadow-sm dark:border-neutral-700">
      <div
        className="px-3 py-2.5 sm:px-4"
        style={{ background: `linear-gradient(90deg, ${accent}18, transparent)` }}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-neutral-600 dark:text-neutral-300">
          {title}
        </p>
      </div>
      <div
        className="flex min-h-44 flex-col px-4 py-4 sm:min-h-52 sm:px-5 sm:py-5"
        style={{
          background: `linear-gradient(160deg, ${accent}16, ${accent}08 45%, transparent)`,
        }}
      >
        <ul className="flex flex-1 flex-col justify-center space-y-2.5 sm:space-y-3">
          {items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-sm font-medium leading-snug text-neutral-700 dark:text-neutral-200 sm:text-[15px]"
            >
              <span
                className="mt-1.5 h-2 w-2 shrink-0 rounded-full ring-2 ring-white/80 dark:ring-neutral-800/80"
                style={{ backgroundColor: accent }}
                aria-hidden
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        {website && visitLabel ? (
          <WebsiteCta
            href={website}
            label={visitLabel}
            accent={accent}
            displayUrl={website.replace(/^https?:\/\//, "")}
          />
        ) : null}
      </div>
    </div>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={`h-4 w-4 shrink-0 text-neutral-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function FilterTrigger({
  triggerText,
  open,
  onToggle,
}: {
  triggerText: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      className={`flex w-full items-center justify-between gap-3 rounded-full border bg-white px-4 py-3 text-sm font-medium shadow-sm transition-all duration-200 sm:py-2.5 dark:bg-neutral-900/90 ${
        open
          ? "border-accent/40 text-neutral-900 ring-2 ring-accent/15 dark:text-neutral-100"
          : "border-neutral-200/90 text-neutral-800 hover:border-neutral-300 dark:border-neutral-700 dark:text-neutral-100 dark:hover:border-neutral-600"
      }`}
    >
      <span className="truncate text-left">{triggerText}</span>
      <ChevronIcon open={open} />
    </button>
  );
}

function FilterPanel({
  panelLabel,
  onClose,
  closeLabel,
  children,
}: {
  panelLabel: string;
  onClose: () => void;
  closeLabel: string;
  children: ReactNode;
}) {
  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-[55] bg-black/15 sm:hidden"
        aria-label={closeLabel}
        onClick={onClose}
      />
      <div
        className="absolute left-0 right-0 top-full z-[60] mt-2 w-full rounded-2xl border border-neutral-200/90 bg-white p-4 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.18)] dark:border-neutral-700 dark:bg-neutral-900 sm:static sm:z-auto sm:mt-3 sm:shadow-sm"
        role="listbox"
        aria-label={panelLabel}
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
          {panelLabel}
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
          {children}
        </div>
      </div>
    </>
  );
}

function DropdownOption({
  active,
  onClick,
  children,
  count,
  fullWidth,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
  count?: number;
  fullWidth?: boolean;
}) {
  return (
    <button
      type="button"
      role="option"
      aria-selected={active}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-1.5 rounded-full px-3 py-2.5 text-center text-sm font-medium transition-colors duration-200 sm:inline-flex sm:justify-start sm:px-3.5 sm:py-2 sm:text-left ${
        fullWidth ? "col-span-2" : ""
      } ${
        active
          ? "bg-accent text-white shadow-sm"
          : "border border-neutral-200 text-neutral-700 hover:border-neutral-300 dark:border-neutral-600 dark:text-neutral-200 dark:hover:border-neutral-500"
      }`}
    >
      <span>{children}</span>
      {count !== undefined ? (
        <span
          className={`text-[11px] tabular-nums ${
            active ? "text-white/75" : "text-neutral-400 dark:text-neutral-500"
          }`}
        >
          {count}
        </span>
      ) : null}
    </button>
  );
}

export default function TrustedCompaniesPage() {
  const { locale, copy } = useLanguage();
  const t = copy.trustedCompanies;
  const lang = locale === "en" ? "en" : "es";
  const clientCount = TRUSTED_COMPANIES.length;
  const clientsStat = t.clientsStat.replace("{count}", String(clientCount));
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<CompanyCategory | null>(
    null,
  );
  const [provinceFilter, setProvinceFilter] = useState<CompanyProvince | null>(
    null,
  );
  const [openFilter, setOpenFilter] = useState<"category" | "province" | null>(
    null,
  );
  const filtersRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { label: copy.nav.services, href: "/#servicios" },
    { label: copy.nav.portfolio, href: "/#galeria-stack" },
    { label: copy.nav.plans, href: "/#planes" },
    { label: copy.nav.schedule, href: "/#agendar" },
    { label: copy.nav.companies, href: "/empresas" },
    { label: copy.nav.contact, href: "/#cotizar" },
  ];

  const categoryCounts = useMemo(() => {
    const counts = {} as Record<CompanyCategory, number>;
    for (const key of COMPANY_CATEGORIES) counts[key] = 0;
    for (const company of TRUSTED_COMPANIES) {
      counts[company.category] += 1;
    }
    return counts;
  }, []);

  const provinceCounts = useMemo(() => {
    const counts = {} as Record<CompanyProvince, number>;
    for (const key of COMPANY_PROVINCES) counts[key] = 0;
    for (const company of TRUSTED_COMPANIES) {
      counts[company.province] += 1;
    }
    return counts;
  }, []);

  const filteredCompanies = useMemo(
    () =>
      TRUSTED_COMPANIES.filter((company) => {
        if (categoryFilter && company.category !== categoryFilter) return false;
        if (provinceFilter && company.province !== provinceFilter) return false;
        return true;
      }),
    [categoryFilter, provinceFilter],
  );

  const hasFilters = categoryFilter !== null || provinceFilter !== null;
  const showingResults = t.showingResults
    .replace("{shown}", String(filteredCompanies.length))
    .replace("{total}", String(clientCount));

  const categoryTriggerLabel =
    categoryFilter !== null ? t.categories[categoryFilter] : t.filterBusinessType;
  const provinceTriggerLabel =
    provinceFilter !== null ? t.provinces[provinceFilter] : t.filterProvince;

  useEffect(() => {
    document.title = `${t.title} | Onvision Digital`;
  }, [t.title]);

  useEffect(() => {
    if (!openFilter) return;
    const close = (e: MouseEvent) => {
      if (filtersRef.current && !filtersRef.current.contains(e.target as Node)) {
        setOpenFilter(null);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [openFilter]);

  return (
    <div className="min-h-screen bg-page">
      {/* Nav */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-neutral-200/70 bg-page/95 shadow-sm backdrop-blur-md dark:border-neutral-800/80">
        <nav className="relative z-10 flex items-center justify-between gap-3 px-4 sm:px-6 md:px-10 lg:px-14 py-4 sm:py-5">
          <Link href="/" className="hover:opacity-90 transition-opacity shrink-0">
            <span className="md:hidden">
              <Logo variant="dark" size="sm" showName={false} />
            </span>
            <span className="hidden md:inline-flex">
              <Logo variant="dark" size="lg" />
            </span>
          </Link>

          <div className="hidden md:flex gap-8 flex-1 justify-center">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm transition-colors duration-200 ${
                  item.href === "/empresas"
                    ? "text-accent font-medium"
                    : "text-neutral-600 hover:text-accent dark:text-neutral-300 dark:hover:text-accent"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-1 sm:gap-2 shrink-0 min-w-0">
            <ThemeToggle variant="light" />
            <LanguageToggle variant="light" />
            <a
              href={site.onvisionSystemUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={copy.hero.systemCta}
              className="group relative inline-flex appearance-none items-center gap-1.5 sm:gap-2 overflow-hidden text-[11px] sm:text-sm font-semibold px-2.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-accent text-white shadow-[0_0_0_1px_rgba(165,243,252,0.35),0_8px_28px_-6px_rgba(8,145,178,0.75)] hover:bg-accent-hover hover:shadow-[0_0_0_1px_rgba(165,243,252,0.5),0_12px_32px_-4px_rgba(8,145,178,0.9)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 whitespace-nowrap max-w-[min(100%,11.5rem)] sm:max-w-none"
            >
              <span
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent group-hover:translate-x-full transition-transform duration-700 ease-out"
                aria-hidden
              />
              <span className="relative flex h-1.5 w-1.5 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-muted opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
              </span>
              <span className="relative truncate sm:hidden">
                {copy.hero.systemCtaShort}
              </span>
              <span className="relative hidden sm:inline">
                {copy.hero.systemCta}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="relative hidden sm:block h-3.5 w-3.5 opacity-90 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden
              >
                <path
                  fillRule="evenodd"
                  d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <button
              type="button"
              className="flex flex-col justify-center gap-1.5 md:hidden p-1 -mr-1 shrink-0"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? copy.hero.menuClose : copy.hero.menuOpen}
              aria-expanded={menuOpen}
            >
              <span
                className={`block h-0.5 w-6 bg-neutral-800 transition-transform dark:bg-neutral-200 ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
              />
              <span
                className={`block h-0.5 w-6 bg-neutral-800 transition-opacity dark:bg-neutral-200 ${menuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-0.5 w-6 bg-neutral-800 transition-transform dark:bg-neutral-200 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
              />
            </button>
          </div>
        </nav>

        {menuOpen && (
          <div className="relative z-20 border-t border-neutral-200/80 bg-page/95 backdrop-blur-xl px-6 py-4 md:hidden dark:border-neutral-800">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm ${
                    item.href === "/empresas"
                      ? "text-accent font-medium"
                      : "text-neutral-700 dark:text-neutral-200"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      <div className="h-[4.5rem] shrink-0 sm:h-20" aria-hidden />

      {/* Hero */}
      <section className="relative">
        <div className="relative mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-12 md:py-14">
          <ScrollReveal className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-accent shadow-sm backdrop-blur-sm dark:bg-neutral-900/60">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              {t.label}
            </div>
            <h1 className="mt-5 text-4xl font-medium tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-5xl md:text-[3.25rem] md:leading-[1.08] text-balance">
              {t.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-neutral-600 dark:text-neutral-300 sm:text-xl">
              {t.description}
            </p>
            <p className="mt-3 inline-flex rounded-full bg-accent/10 px-4 py-1.5 text-sm font-semibold text-accent dark:bg-accent/20">
              {clientsStat}
            </p>
          </ScrollReveal>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-5 pb-10 sm:px-8 sm:pb-14">
        {/* Filters — sin ScrollReveal para que el dropdown no quede detrás de las cartas */}
        <div
          ref={filtersRef}
          className={`relative mb-10 ${openFilter !== null ? "max-sm:z-40" : ""}`}
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
                {t.filterHint}
              </p>
              <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                {showingResults}
              </p>
            </div>
            {hasFilters ? (
              <button
                type="button"
                onClick={() => {
                  setCategoryFilter(null);
                  setProvinceFilter(null);
                  setOpenFilter(null);
                }}
                className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 px-3.5 py-1.5 text-sm font-medium text-neutral-600 transition-colors hover:border-accent/40 hover:text-accent dark:border-neutral-700 dark:text-neutral-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-3.5 w-3.5"
                  aria-hidden
                >
                  <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                </svg>
                {t.clearFilters}
              </button>
            ) : null}
          </div>

          <div className="relative mt-4 sm:mt-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-3">
              <div className="w-full sm:w-auto sm:min-w-[12.5rem] sm:shrink-0">
                <FilterTrigger
                  triggerText={categoryTriggerLabel}
                  open={openFilter === "category"}
                  onToggle={() =>
                    setOpenFilter((current) =>
                      current === "category" ? null : "category",
                    )
                  }
                />
              </div>
              <div className="w-full sm:w-auto sm:min-w-[12.5rem] sm:shrink-0">
                <FilterTrigger
                  triggerText={provinceTriggerLabel}
                  open={openFilter === "province"}
                  onToggle={() =>
                    setOpenFilter((current) =>
                      current === "province" ? null : "province",
                    )
                  }
                />
              </div>
            </div>

            {openFilter === "category" ? (
              <FilterPanel
                panelLabel={t.filterBusinessType}
                onClose={() => setOpenFilter(null)}
                closeLabel={t.closeFilter}
              >
                <DropdownOption
                  active={categoryFilter === null}
                  onClick={() => {
                    setCategoryFilter(null);
                    setOpenFilter(null);
                  }}
                  count={clientCount}
                  fullWidth
                >
                  {t.allBusinessTypes}
                </DropdownOption>
                {COMPANY_CATEGORIES.map((key) => (
                  <DropdownOption
                    key={key}
                    active={categoryFilter === key}
                    onClick={() => {
                      setCategoryFilter(key);
                      setOpenFilter(null);
                    }}
                    count={categoryCounts[key]}
                  >
                    {t.categories[key]}
                  </DropdownOption>
                ))}
              </FilterPanel>
            ) : null}

            {openFilter === "province" ? (
              <FilterPanel
                panelLabel={t.filterProvince}
                onClose={() => setOpenFilter(null)}
                closeLabel={t.closeFilter}
              >
                <DropdownOption
                  active={provinceFilter === null}
                  onClick={() => {
                    setProvinceFilter(null);
                    setOpenFilter(null);
                  }}
                  fullWidth
                >
                  {t.allProvinces}
                </DropdownOption>
                {COMPANY_PROVINCES.map((key) => (
                  <DropdownOption
                    key={key}
                    active={provinceFilter === key}
                    onClick={() => {
                      setProvinceFilter(key);
                      setOpenFilter(null);
                    }}
                    count={provinceCounts[key]}
                  >
                    {t.provinces[key]}
                  </DropdownOption>
                ))}
              </FilterPanel>
            ) : null}
          </div>
        </div>

        {filteredCompanies.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50/80 px-6 py-14 text-center dark:border-neutral-700 dark:bg-neutral-900/50">
            <p className="text-base text-neutral-600 dark:text-neutral-300">
              {t.noResults}
            </p>
            <button
              type="button"
              onClick={() => {
                setCategoryFilter(null);
                setProvinceFilter(null);
                setOpenFilter(null);
              }}
              className="mt-4 text-sm font-medium text-accent hover:text-accent-hover transition-colors"
            >
              {t.clearFilters}
            </button>
          </div>
        ) : (
          <div className="space-y-6 sm:space-y-8">
            {filteredCompanies.map((company) => (
              <article
                key={company.id}
                id={company.id}
                className="group relative scroll-mt-28 overflow-hidden rounded-3xl border border-neutral-200/90 bg-white/95 shadow-[0_8px_40px_-16px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(8,145,178,0.25)] dark:border-neutral-800 dark:bg-neutral-900/95 dark:hover:shadow-[0_20px_50px_-20px_rgba(8,145,178,0.15)]"
              >
                <div
                  className="absolute left-0 top-0 h-full w-1.5 sm:w-2"
                  style={{
                    background: `linear-gradient(180deg, ${company.accent}, ${company.accent}55)`,
                  }}
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-40 blur-3xl transition-opacity duration-300 group-hover:opacity-70"
                  style={{ backgroundColor: `${company.accent}33` }}
                  aria-hidden
                />

                <div className="relative flex flex-col gap-5 p-5 sm:flex-row sm:gap-8 sm:p-7">
                  <CompanyAvatar
                    name={company.name}
                    logo={company.logo}
                    logoOnWhite={company.logoOnWhite}
                    initials={company.initials}
                    accent={company.accent}
                    large
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                      <h2 className="text-2xl font-medium tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-[1.65rem]">
                        {company.name}
                      </h2>
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className="rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-white shadow-sm"
                          style={{ backgroundColor: company.accent }}
                        >
                          {company.sector[lang]}
                        </span>
                        <span className="rounded-full border border-neutral-200/90 bg-neutral-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-neutral-600 dark:border-neutral-600 dark:bg-neutral-800/80 dark:text-neutral-300">
                          {t.projectTypes[company.projectType]}
                        </span>
                      </div>
                    </div>
                    <p className="mt-2 text-sm font-medium text-neutral-500 dark:text-neutral-400">
                      {company.location[lang]}
                    </p>
                    <p className="mt-3 text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
                      {company.description[lang]}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {company.contacts.email ? (
                        <ContactChip
                          href={`mailto:${company.contacts.email}`}
                          label={t.emailLabel}
                        >
                          {company.contacts.email}
                        </ContactChip>
                      ) : null}
                      {company.contacts.phone ? (
                        <ContactChip
                          href={`tel:${company.contacts.phone.replace(/\s/g, "")}`}
                          label={t.phoneLabel}
                        >
                          {company.contacts.phone}
                        </ContactChip>
                      ) : null}
                      {company.contacts.whatsapp ? (
                        <ContactChip
                          href={`https://wa.me/${company.contacts.whatsapp}`}
                          label={t.whatsappLabel}
                          external
                        >
                          +{company.contacts.whatsapp}
                        </ContactChip>
                      ) : null}
                      {company.contacts.instagram ? (
                        <ContactChip
                          href={`https://instagram.com/${company.contacts.instagram.replace(/^@/, "")}`}
                          label={t.instagramLabel}
                          external
                        >
                          {company.contacts.instagram.startsWith("@")
                            ? company.contacts.instagram
                            : `@${company.contacts.instagram}`}
                        </ContactChip>
                      ) : null}
                    </div>

                    {company.showMap === false && company.highlights?.length ? (
                      <CompanySpotlight
                        title={t.highlightsTitle}
                        items={company.highlights.map((item) => item[lang])}
                        accent={company.accent}
                        website={company.contacts.website}
                        visitLabel={t.visitSite}
                      />
                    ) : (
                      <>
                        {company.contacts.website ? (
                          <WebsiteCta
                            href={company.contacts.website}
                            label={t.visitSite}
                            accent={company.accent}
                            displayUrl={company.contacts.website.replace(/^https?:\/\//, "")}
                          />
                        ) : null}
                        <MiniMap
                        coords={company.coords}
                        navigationUrl={company.navigationUrl}
                        locationLabel={company.location[lang]}
                        showLabel={t.showMap}
                        hideLabel={t.hideMap}
                        openLabel={t.openMaps}
                        accent={company.accent}
                      />
                      </>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        <ScrollReveal delay={80}>
          <div className="relative mt-14 overflow-hidden rounded-3xl border border-accent/30 px-6 py-10 text-center shadow-xl shadow-accent/10 sm:px-10 sm:py-12">
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/20 via-accent-muted/10 to-accent/5"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-accent/30 blur-3xl"
              aria-hidden
            />
            <div className="relative">
              <p className="text-2xl font-medium tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-3xl text-balance">
                {t.ctaTitle}
              </p>
              <p className="mx-auto mt-3 max-w-md text-base text-neutral-600 dark:text-neutral-300">
                {t.ctaBody}
              </p>
              <Link
                href="/#agendar"
                className="mt-6 inline-flex rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-accent/30 transition-all hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-xl hover:shadow-accent/35"
              >
                {copy.hero.scheduleCta}
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </main>
    </div>
  );
}
