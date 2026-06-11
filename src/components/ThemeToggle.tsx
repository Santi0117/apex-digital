"use client";

import type { ReactNode } from "react";
import { useLanguage } from "@/lib/i18n/language-provider";
import { useTheme } from "@/lib/theme/theme-provider";
import type { Theme } from "@/lib/theme/theme-provider";

type ThemeToggleProps = {
  variant?: "dark" | "light";
};

function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zm0 13a3 3 0 100-6 3 3 0 000 6zm-7.25-1.25a.75.75 0 010-1.06l1.06-1.06a.75.75 0 111.06 1.06l-1.06 1.06a.75.75 0 01-1.06 0zm12.5 0a.75.75 0 010-1.06l1.06-1.06a.75.75 0 111.06 1.06l-1.06 1.06a.75.75 0 01-1.06 0zM4.22 4.22a.75.75 0 011.06 0l1.06 1.06a.75.75 0 11-1.06 1.06L4.22 5.28a.75.75 0 010-1.06zm9.56 9.56a.75.75 0 011.06 0l1.06 1.06a.75.75 0 11-1.06 1.06l-1.06-1.06a.75.75 0 010-1.06zM2 10a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5A.75.75 0 012 10zm14.25 0a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM4.22 15.78a.75.75 0 010-1.06l1.06-1.06a.75.75 0 111.06 1.06l-1.06 1.06a.75.75 0 01-1.06 0zm9.56-9.56a.75.75 0 010-1.06l1.06-1.06a.75.75 0 111.06 1.06l-1.06 1.06a.75.75 0 01-1.06 0z" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M7.455 2.004a.75.75 0 01.26.77 7 7 0 009.958 9.958.75.75 0 011.067.853A8.25 8.25 0 116.75 2.79a.75.75 0 01.705-.786z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function ThemeToggle({ variant = "dark" }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const { copy } = useLanguage();

  const isDark = variant === "dark";

  const base =
    "appearance-none inline-flex items-center justify-center px-2.5 py-1 rounded-full transition-all duration-200";
  const active = isDark
    ? "bg-white text-neutral-900"
    : "bg-accent text-white";
  const inactive = isDark
    ? "text-white/60 hover:text-white"
    : "text-neutral-500 hover:text-accent";

  const item = (value: Theme, icon: ReactNode) => (
    <button
      key={value}
      type="button"
      onClick={() => setTheme(value)}
      aria-pressed={theme === value}
      aria-label={value === "light" ? copy.theme.enableLight : copy.theme.enableDark}
      className={`${base} ${theme === value ? active : inactive}`}
    >
      {icon}
    </button>
  );

  return (
    <div
      className={`inline-flex items-center gap-0.5 rounded-full p-0.5 ${
        isDark
          ? "border border-white/20 bg-white/10 backdrop-blur-sm"
          : "border border-neutral-200 bg-white/80"
      }`}
      role="group"
      aria-label="Theme"
    >
      {item("light", <SunIcon className="h-3.5 w-3.5" />)}
      <span className={`text-[10px] ${isDark ? "text-white/25" : "text-neutral-300"}`}>
        |
      </span>
      {item("dark", <MoonIcon className="h-3.5 w-3.5" />)}
    </div>
  );
}
