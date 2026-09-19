"use client";

import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import "./CardNav.css";

export type CardNavItem = {
  label: string;
  href: string;
  ariaLabel?: string;
};

type CardNavProps = {
  logo: string;
  logoAlt?: string;
  items: CardNavItem[];
  className?: string;
  ease?: string;
  baseColor?: string;
  menuColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
  buttonLabel?: string;
  buttonHref?: string;
  socialHref?: string;
  socialLabel?: string;
};

function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle
        cx="12"
        cy="12"
        r="4.1"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="17.2" cy="6.8" r="1.05" fill="currentColor" />
    </svg>
  );
}

function NavItemIcon({ label, href }: { label: string; href: string }) {
  const key = `${label} ${href}`.toLowerCase();
  const common = {
    className: "nav-card-icon",
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": true as const,
  };

  if (key.includes("servicio") || key.includes("/digital")) {
    if (key.includes("plane")) {
      return (
        <svg {...common}>
          <path
            d="M4 7.5h16M4 12h16M4 16.5h10"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <circle cx="18.5" cy="16.5" r="2" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    }
    return (
      <svg {...common}>
        <rect
          x="3.5"
          y="4.5"
          width="17"
          height="13"
          rx="2.2"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M8 20.5h8"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (key.includes("plane")) {
    return (
      <svg {...common}>
        <path
          d="M4 7.5h16M4 12h16M4 16.5h10"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle cx="18.5" cy="16.5" r="2" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  }

  if (key.includes("empresa")) {
    return (
      <svg {...common}>
        <path
          d="M3.5 20.5h17"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M5 20.5V10.5h4.5V20.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M9.5 20.5V5.5h6V20.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M15.5 20.5V12.5H19V20.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M11.5 8.5h.01M14 8.5h.01M11.5 11.5h.01M14 11.5h.01M11.5 14.5h.01M14 14.5h.01M6.5 13.5h.01M6.5 16.5h.01"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (key.includes("sistema") || key.includes("producto")) {
    return (
      <svg {...common}>
        <rect
          x="3.5"
          y="3.5"
          width="7.5"
          height="7.5"
          rx="1.6"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <rect
          x="13"
          y="3.5"
          width="7.5"
          height="7.5"
          rx="1.6"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <rect
          x="3.5"
          y="13"
          width="7.5"
          height="7.5"
          rx="1.6"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <rect
          x="13"
          y="13"
          width="7.5"
          height="7.5"
          rx="1.6"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </svg>
    );
  }

  if (key.includes("sobre") || key.includes("nosotros")) {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.6" />
        <ellipse
          cx="12"
          cy="12"
          rx="4.6"
          ry="8.25"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M3.75 12h16.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="7.5" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M10 8.5 15 12l-5 3.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const isExternal = (href: string) =>
  href.startsWith("http://") ||
  href.startsWith("https://") ||
  href.startsWith("mailto:") ||
  href.startsWith("tel:");

export default function CardNav({
  logo,
  logoAlt = "Logo",
  items,
  className = "",
  ease = "power3.out",
  baseColor = "#fff",
  menuColor,
  buttonBgColor,
  buttonTextColor,
  buttonLabel = "Activar",
  buttonHref = "/activar",
  socialHref,
  socialLabel = "Instagram",
}: CardNavProps) {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 380;

    const contentEl = navEl.querySelector<HTMLElement>(".card-nav-content");
    if (!contentEl) return 380;

    const topBar = 60;
    const gap = 8;
    const pad = 16; // 0.5rem * 2
    const count = Math.max(items.length, 1);

    // Fallback from item count (cards ~3.2rem ≈ 51px)
    const fallback = topBar + pad + count * 54 + (count - 1) * gap;

    const prev = {
      visibility: contentEl.style.visibility,
      pointerEvents: contentEl.style.pointerEvents,
      position: contentEl.style.position,
      height: contentEl.style.height,
      bottom: contentEl.style.bottom,
      overflow: contentEl.style.overflow,
      top: contentEl.style.top,
    };

    contentEl.style.visibility = "visible";
    contentEl.style.pointerEvents = "auto";
    contentEl.style.position = "static";
    contentEl.style.height = "auto";
    contentEl.style.bottom = "auto";
    contentEl.style.top = "auto";
    contentEl.style.overflow = "visible";

    void contentEl.offsetHeight;

    let contentHeight = 0;
    contentEl.querySelectorAll<HTMLElement>(".nav-card").forEach((card) => {
      contentHeight += Math.max(card.getBoundingClientRect().height, 50);
    });
    contentHeight += Math.max(count - 1, 0) * gap + pad;

    contentEl.style.visibility = prev.visibility;
    contentEl.style.pointerEvents = prev.pointerEvents;
    contentEl.style.position = prev.position;
    contentEl.style.height = prev.height;
    contentEl.style.bottom = prev.bottom;
    contentEl.style.overflow = prev.overflow;
    contentEl.style.top = prev.top;

    const needed = topBar + Math.max(contentHeight, fallback - topBar);
    const max = Math.floor(window.innerHeight - 28);
    return Math.min(needed, max);
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;

    gsap.set(navEl, { height: 60, overflow: "hidden" });
    gsap.set(cardsRef.current.filter(Boolean), { y: 14, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(navEl, {
      height: () => calculateHeight(),
      duration: 0.35,
      ease,
    });

    tl.to(
      cardsRef.current.filter(Boolean),
      { y: 0, opacity: 1, duration: 0.3, ease, stagger: 0.04 },
      "-=0.12",
    );

    return tl;
  };

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;

    return () => {
      tl?.kill();
      tlRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ease, items]);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return;

      if (isExpanded) {
        const newHeight = calculateHeight();
        gsap.set(navRef.current, { height: newHeight });

        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          newTl.progress(1);
          tlRef.current = newTl;
        }
      } else {
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          tlRef.current = newTl;
        }
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpanded]);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      // Recreate so height accounts for all rendered cards
      tl.kill();
      const fresh = createTimeline();
      if (!fresh) return;
      tlRef.current = fresh;
      fresh.play(0);
    } else {
      setIsHamburgerOpen(false);
      tl.eventCallback("onReverseComplete", () => setIsExpanded(false));
      tl.reverse();
    }
  };

  const setCardRef = (i: number) => (el: HTMLElement | null) => {
    if (el) cardsRef.current[i] = el;
  };

  const closeMenu = () => {
    const tl = tlRef.current;
    if (!tl || !isExpanded) return;
    setIsHamburgerOpen(false);
    tl.eventCallback("onReverseComplete", () => setIsExpanded(false));
    tl.reverse();
  };

  return (
    <div className={`card-nav-container ${className}`}>
      <nav
        ref={navRef}
        className={`card-nav ${isExpanded ? "open" : ""}`}
        style={{ backgroundColor: baseColor }}
      >
        <div className="card-nav-top">
          <Link href="/" className="logo-container" onClick={closeMenu}>
            <img src={logo} alt={logoAlt} className="logo" />
          </Link>

          <div className="card-nav-top-actions">
            {socialHref ? (
              <a
                href={socialHref}
                className="card-nav-social"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={socialLabel}
              >
                <InstagramGlyph className="card-nav-social-icon" />
              </a>
            ) : null}

            <div
              className={`hamburger-menu ${isHamburgerOpen ? "open" : ""}`}
              onClick={toggleMenu}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggleMenu();
                }
              }}
              role="button"
              aria-label={isExpanded ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={isExpanded}
              tabIndex={0}
              style={{ color: menuColor || "#000" }}
            >
              <div className="hamburger-line" />
              <div className="hamburger-line" />
            </div>

            {isExternal(buttonHref) ? (
              <a
                href={buttonHref}
                className="card-nav-cta-button"
                style={
                  {
                    backgroundColor: buttonBgColor,
                    color: buttonTextColor,
                  } as CSSProperties
                }
              >
                {buttonLabel}
              </a>
            ) : (
              <Link
                href={buttonHref}
                className="card-nav-cta-button"
                style={
                  {
                    backgroundColor: buttonBgColor,
                    color: buttonTextColor,
                  } as CSSProperties
                }
                onClick={closeMenu}
              >
                {buttonLabel}
              </Link>
            )}
          </div>
        </div>

        <div className="card-nav-content" aria-hidden={!isExpanded}>
          {(items || []).map((item, idx) => {
            const className = `nav-card nav-card--link nav-card--${idx % 5}`;
            const labelNode = (
              <>
                <span className="nav-card-label">{item.label}</span>
                <NavItemIcon label={item.label} href={item.href} />
              </>
            );

            if (isExternal(item.href)) {
              return (
                <a
                  key={`${item.label}-${idx}`}
                  className={className}
                  ref={setCardRef(idx)}
                  href={item.href}
                  aria-label={item.ariaLabel || item.label}
                  onClick={closeMenu}
                >
                  {labelNode}
                </a>
              );
            }

            return (
              <Link
                key={`${item.label}-${idx}`}
                className={className}
                ref={setCardRef(idx)}
                href={item.href}
                aria-label={item.ariaLabel || item.label}
                onClick={closeMenu}
              >
                {labelNode}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
