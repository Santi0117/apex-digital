"use client";

import { useMemo, useState, type ReactNode, type FormEvent } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import ScrollReveal from "@/components/ScrollReveal";
import { digitalMeeting } from "@/lib/digital";
import { toDateKey } from "@/lib/booking";
import {
  countryDials,
  defaultCountryIso,
} from "@/lib/country-dials";
import "./DigitalMeeting.css";

type TimeSlot = (typeof digitalMeeting.times)[number];

const EASE = [0.22, 1, 0.36, 1] as const;

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function formatLong(d: Date) {
  return d.toLocaleDateString("es-CR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

function buildCells(view: Date) {
  const year = view.getFullYear();
  const month = view.getMonth();
  const first = new Date(year, month, 1);
  const startPad = first.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevDays = new Date(year, month, 0).getDate();

  const cells: { date: Date; inMonth: boolean }[] = [];
  for (let i = 0; i < startPad; i++) {
    const day = prevDays - startPad + 1 + i;
    cells.push({ date: new Date(year, month - 1, day), inMonth: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ date: new Date(year, month, d), inMonth: true });
  }
  let next = 1;
  while (cells.length < 42) {
    cells.push({ date: new Date(year, month + 1, next++), inMonth: false });
  }
  return cells;
}

function StepReveal({
  show,
  children,
  reduce,
}: {
  show: boolean;
  children: ReactNode;
  reduce: boolean | null;
}) {
  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="od-meet-step"
          initial={reduce ? false : { opacity: 0, y: 28, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={reduce ? undefined : { opacity: 0, y: -12, filter: "blur(4px)" }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          {children}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default function DigitalMeeting() {
  const reduce = useReducedMotion();
  const today = useMemo(() => startOfDay(new Date()), []);
  const [view, setView] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const [selected, setSelected] = useState<Date | null>(null);
  const [time, setTime] = useState<TimeSlot | null>(null);
  const [service, setService] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [countryIso, setCountryIso] = useState(defaultCountryIso);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const cells = useMemo(() => buildCells(view), [view]);
  const monthLabel = `${digitalMeeting.months[view.getMonth()]} ${view.getFullYear()}`;
  const dial =
    countryDials.find((c) => c.iso === countryIso)?.dial ?? "+506";

  const canSubmit =
    selected &&
    time &&
    service &&
    name.trim().length > 1 &&
    phone.replace(/\D/g, "").length >= 6 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const shiftMonth = (delta: number) => {
    setView((v) => new Date(v.getFullYear(), v.getMonth() + delta, 1));
  };

  const pickDate = (date: Date, inMonth: boolean) => {
    if (startOfDay(date) < today) return;
    if (!inMonth) {
      setView(new Date(date.getFullYear(), date.getMonth(), 1));
    }
    setSelected(startOfDay(date));
    setTime(null);
    setService(null);
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!canSubmit || !selected || !time || !service || loading) return;
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          name: name.trim(),
          phoneCountryCode: dial,
          phoneNumber: phone.trim(),
          date: toDateKey(selected),
          hour: time.hour,
          minute: time.minute,
          service,
          notes: note.trim(),
          modality: "virtual",
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        message?: string;
        error?: string;
      };

      if (!res.ok || !data.ok) {
        setError(data.error || "No se pudo agendar. Intentá de nuevo.");
        setLoading(false);
        return;
      }

      setSuccess(data.message || "¡Cita agendada!");
      setLoading(false);
    } catch {
      setError("No se pudo agendar. Intentá de nuevo.");
      setLoading(false);
    }
  };

  return (
    <section
      className="od-section od-meet-section"
      id="agendar"
      aria-labelledby="od-meet-title"
    >
      <ScrollReveal>
        <p className="od-kicker">{digitalMeeting.label}</p>
        <h2 id="od-meet-title" className="od-section-title">
          {digitalMeeting.title}
        </h2>
        <p className="od-section-lead">{digitalMeeting.lead}</p>
      </ScrollReveal>

      <div className="od-meet-layout">
        <div className="od-meet-calendar-wrap">
          <div className="od-meet-calendar" aria-label="Calendario">
            <div className="od-meet-cal-head">
              <p className="od-meet-cal-month">{monthLabel}</p>
              <div className="od-meet-cal-nav">
                <button
                  type="button"
                  aria-label="Mes anterior"
                  onClick={() => shiftMonth(-1)}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M10 3.5 5.5 8 10 12.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  aria-label="Mes siguiente"
                  onClick={() => shiftMonth(1)}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M6 3.5 10.5 8 6 12.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="od-meet-weekdays" aria-hidden>
              {digitalMeeting.weekdays.map((d, i) => (
                <span key={`${d}-${i}`}>{d}</span>
              ))}
            </div>

            <div className="od-meet-grid">
              {cells.map(({ date, inMonth }) => {
                const disabled = startOfDay(date) < today;
                const isSelected = selected ? sameDay(date, selected) : false;
                const isToday = sameDay(date, today);
                return (
                  <button
                    key={date.toISOString()}
                    type="button"
                    disabled={disabled}
                    aria-pressed={isSelected}
                    aria-label={date.toLocaleDateString("es-CR")}
                    className={[
                      "od-meet-day",
                      inMonth ? "is-in" : "is-out",
                      isSelected ? "is-selected" : "",
                      isToday && !isSelected ? "is-today" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    onClick={() => pickDate(date, inMonth)}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>
          </div>
          <p className="od-meet-hint">{digitalMeeting.hint}</p>
        </div>

        <div className="od-meet-flow">
          <StepReveal show={!!selected} reduce={reduce}>
            <div className="od-meet-block">
              <p className="od-meet-step-label">{digitalMeeting.timeLabel}</p>
              {selected ? (
                <p className="od-meet-picked">{formatLong(selected)}</p>
              ) : null}
              <div className="od-meet-chips">
                {digitalMeeting.times.map((slot, i) => (
                  <motion.button
                    key={slot.label}
                    type="button"
                    className={`od-meet-chip${time?.label === slot.label ? " is-on" : ""}`}
                    onClick={() => {
                      setTime(slot);
                      setService(null);
                    }}
                    initial={reduce ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: reduce ? 0 : 0.05 + i * 0.05,
                      ease: EASE,
                    }}
                  >
                    {slot.label}
                  </motion.button>
                ))}
              </div>
            </div>
          </StepReveal>

          <StepReveal show={!!time} reduce={reduce}>
            <div className="od-meet-block">
              <p className="od-meet-step-label">{digitalMeeting.serviceLabel}</p>
              <div className="od-meet-chips od-meet-chips--services">
                {digitalMeeting.services.map((item, i) => (
                  <motion.button
                    key={item}
                    type="button"
                    className={`od-meet-chip${service === item ? " is-on" : ""}`}
                    onClick={() => setService(item)}
                    initial={reduce ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: reduce ? 0 : 0.04 + i * 0.05,
                      ease: EASE,
                    }}
                  >
                    {item}
                  </motion.button>
                ))}
              </div>
            </div>
          </StepReveal>

          <StepReveal show={!!service} reduce={reduce}>
            <form className="od-meet-block od-meet-form" onSubmit={onSubmit}>
              <p className="od-meet-step-label">{digitalMeeting.detailsLabel}</p>
              <label className="od-meet-field">
                <span>{digitalMeeting.fields.name}</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={digitalMeeting.fields.namePlaceholder}
                  autoComplete="name"
                  required
                />
              </label>
              <label className="od-meet-field">
                <span>{digitalMeeting.fields.phone}</span>
                <div className="od-meet-phone">
                  <select
                    className="od-meet-dial"
                    value={countryIso}
                    onChange={(e) => setCountryIso(e.target.value)}
                    aria-label="Código de país"
                  >
                    {countryDials.map((c) => (
                      <option key={c.iso} value={c.iso}>
                        {c.name} ({c.dial})
                      </option>
                    ))}
                  </select>
                  <input
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value.replace(/[^\d\s()-]/g, ""))
                    }
                    placeholder={digitalMeeting.fields.phonePlaceholder}
                    inputMode="tel"
                    autoComplete="tel-national"
                    required
                  />
                </div>
              </label>
              <label className="od-meet-field">
                <span>{digitalMeeting.fields.email}</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={digitalMeeting.fields.emailPlaceholder}
                  autoComplete="email"
                  required
                />
              </label>
              <label className="od-meet-field">
                <span>{digitalMeeting.fields.note}</span>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder={digitalMeeting.fields.notePlaceholder}
                  rows={3}
                />
              </label>
              <button
                type="submit"
                className="od-meet-submit"
                disabled={!canSubmit || loading}
              >
                {loading ? "Agendando…" : digitalMeeting.submit}
              </button>
              {error ? (
                <p role="alert" className="od-meet-feedback od-meet-feedback--error">
                  {error}
                </p>
              ) : null}
              {success ? (
                <p role="status" className="od-meet-feedback od-meet-feedback--ok">
                  {success}
                </p>
              ) : null}
            </form>
          </StepReveal>

          {!selected ? (
            <p className="od-meet-empty">Elegí un día en el calendario para empezar.</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
