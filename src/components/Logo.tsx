import { site } from "@/lib/site";

type LogoProps = {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  showName?: boolean;
};

const sizes = {
  sm: { icon: "w-7 h-7", text: "text-sm", gap: "gap-2" },
  md: { icon: "w-9 h-9", text: "text-base sm:text-lg", gap: "gap-2.5" },
  lg: { icon: "w-11 h-11", text: "text-lg sm:text-xl", gap: "gap-3" },
};

export default function Logo({
  variant = "light",
  size = "md",
  showName = true,
}: LogoProps) {
  const s = sizes[size];
  const isLight = variant === "light";

  return (
    <div className={`inline-flex items-center ${s.gap}`}>
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${s.icon} shrink-0`}
        aria-hidden
      >
        <path
          d="M16 4L28 26H4L16 4Z"
          className={
            isLight
              ? "fill-white stroke-white/30"
              : "fill-accent stroke-accent/40"
          }
          strokeWidth="1"
        />
        <path
          d="M16 10L22 24H10L16 10Z"
          className={
            isLight ? "fill-accent-muted/90" : "fill-accent-soft"
          }
        />
      </svg>
      {showName && (
        <span
          className={`font-medium tracking-wide ${s.text} ${
            isLight ? "text-white" : "text-neutral-900"
          }`}
        >
          {site.name}
        </span>
      )}
    </div>
  );
}
