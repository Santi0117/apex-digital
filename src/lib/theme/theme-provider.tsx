"use client";

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "onvision-theme";
const THEME_CHANGE = "onvision-theme-change";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  isDark: boolean;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readStoredTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  return localStorage.getItem(STORAGE_KEY) === "light" ? "light" : "dark";
}

function applyTheme(theme: Theme) {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
}

function subscribe(callback: () => void) {
  window.addEventListener(THEME_CHANGE, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(THEME_CHANGE, callback);
    window.removeEventListener("storage", callback);
  };
}

function getServerSnapshot(): Theme {
  return "dark";
}

function notifyThemeChange() {
  window.dispatchEvent(new Event(THEME_CHANGE));
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribe, readStoredTheme, getServerSnapshot);

  useLayoutEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const setTheme = useCallback((next: Theme) => {
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
    notifyThemeChange();
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(readStoredTheme() === "dark" ? "light" : "dark");
  }, [setTheme]);

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme,
      isDark: theme === "dark",
    }),
    [theme, setTheme, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}
