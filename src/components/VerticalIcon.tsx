import type { ReactNode } from "react";

export type IconName =
  | "clinic"
  | "restaurant"
  | "construction"
  | "workshop"
  | "retail"
  | "realestate"
  | "livestock"
  | "agriculture"
  | "legal"
  | "personal";

const paths: Record<IconName, ReactNode> = {
  clinic: (
    <>
      <path d="M12 4v16M4 12h16" strokeWidth="1.75" strokeLinecap="round" />
      <rect x="3.5" y="3.5" width="17" height="17" rx="4" strokeWidth="1.5" fill="none" />
    </>
  ),
  restaurant: (
    <>
      <path d="M8 4v8a2 2 0 0 0 4 0V4M10 12v8" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M16 4v16M16 4c2 2 2 5 0 7" strokeWidth="1.75" strokeLinecap="round" />
    </>
  ),
  construction: (
    <>
      <path d="M4 20h16M6 20V10l6-5 6 5v10" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M10 20v-5h4v5" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </>
  ),
  workshop: (
    <>
      <path d="M14.5 6.5 17 4l3 3-2.5 2.5M10 11l-6.5 6.5a2 2 0 0 0 2.8 2.8L12.5 14" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="m14.5 6.5-3.5 3.5" strokeWidth="1.75" strokeLinecap="round" />
    </>
  ),
  /* Pliego con sello: el notario da fe. Se evitó la balanza por trillada. */
  legal: (
    <>
      <path d="M7 3.5h6L17 7v11.5a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-13a2 2 0 0 1 2-2Z" strokeWidth="1.6" strokeLinejoin="round" fill="none" />
      <path d="M13 3.5V6a1 1 0 0 0 1 1h2.5" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
      <circle cx="14" cy="16" r="3.2" strokeWidth="1.6" fill="none" />
      <path d="M8 9.5h3M8 12.5h2" strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),
  retail: (
    <>
      <path d="M4 8h16l-1.5 11a2 2 0 0 1-2 1.8H7.5a2 2 0 0 1-2-1.8L4 8Z" strokeWidth="1.75" strokeLinejoin="round" fill="none" />
      <path d="M8 8V6a4 4 0 0 1 8 0v2" strokeWidth="1.75" strokeLinecap="round" fill="none" />
    </>
  ),
  realestate: (
    <>
      <path d="M3 21h18M5 21V10l7-6 7 6v11" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M9 21v-6h6v6" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </>
  ),
  livestock: (
    <>
      <path d="M5 16c0-3 2.5-5 7-5s7 2 7 5" strokeWidth="1.75" strokeLinecap="round" fill="none" />
      <circle cx="9" cy="9" r="1.25" fill="currentColor" />
      <circle cx="15" cy="9" r="1.25" fill="currentColor" />
      <path d="M8 19h8M10 16v3M14 16v3" strokeWidth="1.75" strokeLinecap="round" />
    </>
  ),
  agriculture: (
    <>
      <path d="M12 21V10" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M12 10c-3-4-7-5-8-3 2 1 4 4 8 3Z" strokeWidth="1.75" strokeLinejoin="round" fill="none" />
      <path d="M12 10c3-4 7-5 8-3-2 1-4 4-8 3Z" strokeWidth="1.75" strokeLinejoin="round" fill="none" />
      <path d="M4 21h16" strokeWidth="1.75" strokeLinecap="round" />
    </>
  ),
  /* Curva del año: loma de dic y caída de enero — identidad de Personal. */
  personal: (
    <>
      <path
        d="M3 15 L7 15 Q9 15 10 10 Q11 5 13 5 Q15 5 16 14 Q17 20 19.5 17 L21 15"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="16" cy="14" r="1.4" fill="currentColor" />
      <circle cx="13" cy="5" r="1.2" fill="currentColor" opacity="0.7" />
    </>
  ),
};

export default function VerticalIcon({
  name,
  className = "h-7 w-7",
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className={className}
      aria-hidden
    >
      {paths[name]}
    </svg>
  );
}
