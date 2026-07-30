import type { IconName } from "./VerticalIcon";

const colors: Record<IconName, { bg: string; fg: string }> = {
  restaurant: { bg: "#FFF1E8", fg: "#E85D04" },
  construction: { bg: "#E8F1FB", fg: "#1D6FB8" },
  realestate: { bg: "#EAF7F1", fg: "#0F9F6E" },
  clinic: { bg: "#E8F7FA", fg: "#0E8A9A" },
  retail: { bg: "#F3EEFF", fg: "#5B4BCC" },
  livestock: { bg: "#FFF6E5", fg: "#C47A00" },
  agriculture: { bg: "#E9F8E9", fg: "#2F9E44" },
  workshop: { bg: "#F0F3F7", fg: "#3D5A80" },
};

function Illustration({ name }: { name: IconName }) {
  const c = colors[name].fg;

  switch (name) {
    case "restaurant":
      return (
        <svg viewBox="0 0 64 64" className="h-10 w-10" aria-hidden>
          <path d="M22 12v18a6 6 0 0 0 12 0V12" stroke={c} strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <path d="M28 30v22" stroke={c} strokeWidth="3.5" strokeLinecap="round" />
          <path d="M42 12v40" stroke={c} strokeWidth="3.5" strokeLinecap="round" />
          <path d="M42 12c6 5 6 14 0 18" stroke={c} strokeWidth="3.5" fill="none" strokeLinecap="round" />
        </svg>
      );
    case "construction":
      return (
        <svg viewBox="0 0 64 64" className="h-10 w-10" aria-hidden>
          <path d="M12 52h40M16 52V30l16-14 16 14v22" stroke={c} strokeWidth="3.5" fill="none" strokeLinejoin="round" />
          <path d="M28 52V38h8v14" stroke={c} strokeWidth="3.5" fill="none" />
          <path d="M14 22h14l-4-8H18l-4 8Z" fill={c} />
        </svg>
      );
    case "realestate":
      return (
        <svg viewBox="0 0 64 64" className="h-10 w-10" aria-hidden>
          <path d="M10 54h44M14 54V28l18-14 18 14v26" stroke={c} strokeWidth="3.5" fill="none" strokeLinejoin="round" />
          <rect x="26" y="36" width="12" height="18" rx="1.5" stroke={c} strokeWidth="3" fill="none" />
          <circle cx="32" cy="24" r="3" fill={c} />
        </svg>
      );
    case "clinic":
      return (
        <svg viewBox="0 0 64 64" className="h-10 w-10" aria-hidden>
          <rect x="12" y="12" width="40" height="40" rx="10" stroke={c} strokeWidth="3.5" fill="none" />
          <path d="M32 20v24M20 32h24" stroke={c} strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
    case "retail":
      return (
        <svg viewBox="0 0 64 64" className="h-10 w-10" aria-hidden>
          <path d="M14 24h36l-3 28a4 4 0 0 1-4 3.5H21a4 4 0 0 1-4-3.5L14 24Z" stroke={c} strokeWidth="3.5" fill="none" strokeLinejoin="round" />
          <path d="M24 24V20a8 8 0 0 1 16 0v4" stroke={c} strokeWidth="3.5" fill="none" strokeLinecap="round" />
        </svg>
      );
    case "livestock":
      return (
        <svg viewBox="0 0 64 64" className="h-10 w-10" aria-hidden>
          <ellipse cx="32" cy="36" rx="18" ry="12" stroke={c} strokeWidth="3.5" fill="none" />
          <circle cx="24" cy="28" r="2.5" fill={c} />
          <circle cx="40" cy="28" r="2.5" fill={c} />
          <path d="M22 48v6M42 48v6M18 42c-4 2-6 6-4 8M46 42c4 2 6 6 4 8" stroke={c} strokeWidth="3" strokeLinecap="round" fill="none" />
        </svg>
      );
    case "agriculture":
      return (
        <svg viewBox="0 0 64 64" className="h-10 w-10" aria-hidden>
          <path d="M32 54V28" stroke={c} strokeWidth="3.5" strokeLinecap="round" />
          <path d="M32 30c-8-10-18-12-20-6 6 2 12 10 20 6Z" fill={c} opacity="0.9" />
          <path d="M32 30c8-10 18-12 20-6-6 2-12 10-20 6Z" fill={c} opacity="0.55" />
          <path d="M12 54h40" stroke={c} strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );
    case "workshop":
      return (
        <svg viewBox="0 0 64 64" className="h-10 w-10" aria-hidden>
          <path d="M38 18 46 10l8 8-8 8" stroke={c} strokeWidth="3.5" fill="none" strokeLinejoin="round" />
          <path d="M38 18 18 38a7 7 0 0 0 8 8l20-20" stroke={c} strokeWidth="3.5" fill="none" strokeLinejoin="round" />
          <path d="M14 50l8-8" stroke={c} strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );
  }
}

export default function SectorGlyph({ name }: { name: IconName }) {
  const { bg } = colors[name];
  return (
    <div
      className="flex h-16 w-16 items-center justify-center rounded-2xl md:h-[4.5rem] md:w-[4.5rem]"
      style={{ background: bg }}
    >
      <Illustration name={name} />
    </div>
  );
}
