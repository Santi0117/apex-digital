export default function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden>
      <rect width="40" height="40" rx="11" fill="url(#ov-logo-bg)" />
      <path
        d="M12 20c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8"
        stroke="white"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <circle cx="20" cy="20" r="3.2" fill="#12B87E" />
      <defs>
        <linearGradient id="ov-logo-bg" x1="4" y1="4" x2="36" y2="36">
          <stop stopColor="#0F9F6E" />
          <stop offset="1" stopColor="#0A1628" />
        </linearGradient>
      </defs>
    </svg>
  );
}
