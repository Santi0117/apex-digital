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
import {
  translations,
  type Locale,
  type SiteCopy,
} from "@/lib/i18n/translations";

const STORAGE_KEY = "onvision-locale";
const LOCALE_CHANGE = "onvision-locale-change";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  copy: SiteCopy;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function readStoredLocale(): Locale {
  if (typeof window === "undefined") return "es";
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === "en" ? "en" : "es";
}

function getServerSnapshot(): Locale {
  return "es";
}

function subscribe(callback: () => void) {
  window.addEventListener(LOCALE_CHANGE, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(LOCALE_CHANGE, callback);
    window.removeEventListener("storage", callback);
  };
}

function notifyLocaleChange() {
  window.dispatchEvent(new Event(LOCALE_CHANGE));
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(
    subscribe,
    readStoredLocale,
    getServerSnapshot,
  );

  useLayoutEffect(() => {
    document.documentElement.lang = locale === "en" ? "en" : "es";
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.lang = next === "en" ? "en" : "es";
    notifyLocaleChange();
  }, []);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      copy: translations[locale],
    }),
    [locale, setLocale],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}
