import Image from "next/image";
import { site } from "@/lib/site";

type LogoProps = {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  showName?: boolean;
};

const sizes = {
  sm: { icon: "h-7", text: "text-sm", gap: "gap-2" },
  md: { icon: "h-9", text: "text-base sm:text-lg", gap: "gap-2.5" },
  lg: { icon: "h-11", text: "text-lg sm:text-xl", gap: "gap-3" },
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
      <Image
        src={isLight ? "/logo-eye.png" : "/logo-eye-accent.png"}
        alt=""
        width={532}
        height={282}
        className={`${s.icon} w-auto shrink-0 object-contain`}
        aria-hidden
        priority={size === "lg"}
      />
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
