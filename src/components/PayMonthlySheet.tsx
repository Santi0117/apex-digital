"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

export type PayMonthlySelection = {
  planId: string;
  planName: string;
  categoryLabel: string;
  price: string;
  priceAlt?: string;
  period: string;
};

type PayMonthlySheetCopy = {
  title: string;
  categorySeparator: string;
  monthlyLabel: string;
  companyNameLabel: string;
  companyNamePlaceholder: string;
  note: string;
  continueCta: string;
  continueLoading: string;
  cancelCta: string;
  closeAria: string;
  errorGeneric: string;
};

type Props = {
  open: boolean;
  selection: PayMonthlySelection | null;
  copy: PayMonthlySheetCopy;
  onClose: () => void;
};

export default function PayMonthlySheet({
  open,
  selection,
  copy,
  onClose,
}: Props) {
  const titleId = useId();
  const noteId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState("");

  useEffect(() => {
    if (!open) {
      setLoading(false);
      setError(null);
      setCompanyName("");
      return;
    }

    previouslyFocused.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const panel = panelRef.current;
    const primary = panel?.querySelector<HTMLElement>(
      "[data-pay-primary]",
    );
    const focusables = panel?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    (primary ?? focusables?.[0])?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        if (!loading) onClose();
        return;
      }
      if (e.key !== "Tab" || !panel || !focusables?.length) return;

      const list = Array.from(focusables);
      const first = list[0];
      const last = list[list.length - 1];
      const active = document.activeElement;

      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
      previouslyFocused.current?.focus();
    };
  }, [open, onClose, loading]);

  const startCheckout = async () => {
    if (!selection || loading) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/checkout/onvo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: selection.planId,
          planName: selection.planName,
          categoryLabel: selection.categoryLabel,
          companyName: companyName.trim() || undefined,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        url?: string;
        error?: string;
      };

      if (!res.ok || !data.url) {
        setError(data.error || copy.errorGeneric);
        setLoading(false);
        return;
      }

      window.location.href = data.url;
    } catch {
      setError(copy.errorGeneric);
      setLoading(false);
    }
  };

  if (!open || !selection || typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-[200] flex items-end justify-center sm:items-center sm:p-6">
      <button
        type="button"
        className="absolute inset-0 bg-neutral-950/50 backdrop-blur-[2px]"
        aria-label={copy.closeAria}
        onClick={() => {
          if (!loading) onClose();
        }}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={noteId}
        className="relative z-10 flex w-full max-w-md flex-col rounded-t-2xl border border-neutral-200 bg-white p-5 shadow-2xl dark:border-neutral-700 dark:bg-neutral-900 sm:rounded-2xl sm:p-6"
      >
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-accent">
              {copy.monthlyLabel}
            </p>
            <h2
              id={titleId}
              className="mt-1 text-lg font-medium tracking-tight text-neutral-900 dark:text-neutral-100"
            >
              {copy.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-800 disabled:opacity-50 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
            aria-label={copy.closeAria}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
              aria-hidden
            >
              <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
            </svg>
          </button>
        </div>

        <div className="rounded-xl border border-neutral-200 bg-neutral-50/80 p-4 dark:border-neutral-700 dark:bg-neutral-950/50">
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {selection.categoryLabel}
            {copy.categorySeparator}
            <span className="font-medium text-neutral-800 dark:text-neutral-200">
              {selection.planName}
            </span>
          </p>
          <p className="mt-3 flex items-baseline gap-1.5">
            <span className="text-3xl font-medium tracking-tight text-neutral-900 dark:text-neutral-100">
              {selection.price}
            </span>
            <span className="text-sm font-medium text-accent">
              {selection.period}
            </span>
          </p>
          {selection.priceAlt ? (
            <p className="mt-0.5 text-sm font-medium tabular-nums text-neutral-500 dark:text-neutral-400">
              {selection.priceAlt}
            </p>
          ) : null}
        </div>

        <label className="mt-4 block">
          <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
            {copy.companyNameLabel}
          </span>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder={copy.companyNamePlaceholder}
            disabled={loading}
            className="mt-1.5 w-full rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5 text-sm text-neutral-900 shadow-sm transition-colors placeholder:text-neutral-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 disabled:opacity-60 dark:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-500"
          />
        </label>

        <p
          id={noteId}
          className="mt-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300"
        >
          {copy.note}
        </p>

        {error ? (
          <p
            role="alert"
            className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300"
          >
            {error}
          </p>
        ) : null}

        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row-reverse">
          <button
            type="button"
            data-pay-primary
            onClick={startCheckout}
            disabled={loading}
            className="inline-flex flex-1 items-center justify-center rounded-xl bg-accent px-5 py-3 text-sm font-medium text-white shadow-sm shadow-accent/20 transition-colors hover:bg-accent-hover disabled:cursor-wait disabled:opacity-70"
          >
            {loading ? copy.continueLoading : copy.continueCta}
          </button>
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="inline-flex flex-1 items-center justify-center rounded-xl border border-neutral-200 bg-white px-5 py-3 text-sm font-medium text-neutral-800 transition-colors hover:border-neutral-300 disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-100 dark:hover:border-neutral-500"
          >
            {copy.cancelCta}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
