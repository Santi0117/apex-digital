"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./PayMonthlySheet.css";

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
    const primary = panel?.querySelector<HTMLElement>("[data-pay-primary]");
    const focusables = panel?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
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
    <div className="pay-sheet-root">
      <button
        type="button"
        className="pay-sheet-backdrop"
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
        className="pay-sheet-panel"
      >
        <div className="pay-sheet-head">
          <div>
            <p className="pay-sheet-kicker">{copy.monthlyLabel}</p>
            <h2 id={titleId} className="pay-sheet-title">
              {copy.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="pay-sheet-close"
            aria-label={copy.closeAria}
          >
            ×
          </button>
        </div>

        <div className="pay-sheet-summary">
          <p className="pay-sheet-plan">
            {selection.categoryLabel}
            {copy.categorySeparator}
            <span>{selection.planName}</span>
          </p>
          <p className="pay-sheet-price">
            <span>{selection.price}</span>
            <span className="pay-sheet-period">{selection.period}</span>
          </p>
          {selection.priceAlt ? (
            <p className="pay-sheet-alt">{selection.priceAlt}</p>
          ) : null}
        </div>

        <label className="pay-sheet-field">
          <span>{copy.companyNameLabel}</span>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder={copy.companyNamePlaceholder}
            disabled={loading}
          />
        </label>

        <p id={noteId} className="pay-sheet-note">
          {copy.note}
        </p>

        {error ? (
          <p role="alert" className="pay-sheet-error">
            {error}
          </p>
        ) : null}

        <div className="pay-sheet-actions">
          <button
            type="button"
            data-pay-primary
            onClick={startCheckout}
            disabled={loading}
            className="pay-sheet-primary"
          >
            {loading ? copy.continueLoading : copy.continueCta}
          </button>
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="pay-sheet-secondary"
          >
            {copy.cancelCta}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
