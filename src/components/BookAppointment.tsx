"use client";

import { useEffect, useMemo, useState } from "react";
import SectionHeader from "./SectionHeader";
import ScrollReveal from "./ScrollReveal";
import {
  buildMonthGrid,
  buildTimeSlots,
  formatMonthYear,
  formatSelectedDate,
  formatSlotLabel,
  getWeekdayLabels,
  isBookableDay,
  localCostaRicaToISO,
  toDateKey,
} from "@/lib/booking";
import { useLanguage } from "@/lib/i18n/language-provider";

function slotKey(dateKey: string, hour: number, minute: number) {
  return localCostaRicaToISO(dateKey, hour, minute);
}

export default function BookAppointment() {
  const { locale, copy } = useLanguage();
  const b = copy.booking;
  const today = useMemo(() => new Date(), []);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<{ hour: number; minute: number } | null>(
    null
  );
  const [bookedSlots, setBookedSlots] = useState<Set<string>>(new Set());
  const [nowMs, setNowMs] = useState(() => Date.now());
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [modality, setModality] = useState<"virtual" | "in_person">("virtual");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const timeSlots = useMemo(() => buildTimeSlots(locale), [locale]);
  const weekdayLabels = useMemo(() => getWeekdayLabels(locale), [locale]);
  const monthKey = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}`;
  const grid = useMemo(
    () => buildMonthGrid(viewYear, viewMonth),
    [viewYear, viewMonth]
  );

  useEffect(() => {
    const id = window.setInterval(() => setNowMs(Date.now()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadBooked() {
      try {
        const res = await fetch(`/api/booking?month=${monthKey}`);
        const data = await res.json();
        if (!cancelled && Array.isArray(data.booked)) {
          setBookedSlots(new Set(data.booked as string[]));
        }
      } catch {
        if (!cancelled) setBookedSlots(new Set());
      }
    }

    void loadBooked();
    return () => {
      cancelled = true;
    };
  }, [monthKey]);

  const reloadBooked = async () => {
    try {
      const res = await fetch(`/api/booking?month=${monthKey}`);
      const data = await res.json();
      if (Array.isArray(data.booked)) {
        setBookedSlots(new Set(data.booked as string[]));
      }
    } catch {
      setBookedSlots(new Set());
    }
  };

  const goPrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const goNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const isSlotTaken = (dateKey: string, hour: number, minute: number) =>
    bookedSlots.has(slotKey(dateKey, hour, minute));

  const isSlotPast = (dateKey: string, hour: number, minute: number) => {
    const iso = slotKey(dateKey, hour, minute);
    return new Date(iso).getTime() <= nowMs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return;

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          date: selectedDate,
          hour: selectedTime.hour,
          minute: selectedTime.minute,
          notes,
          modality,
          location: modality === "in_person" ? location : "",
          website,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? b.errorBooking);

      setSuccess(data.message);
      setName("");
      setEmail("");
      setPhone("");
      setNotes("");
      setModality("virtual");
      setLocation("");
      setSelectedTime(null);
      await reloadBooked();
    } catch (err) {
      setError(err instanceof Error ? err.message : b.errorConnection);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full text-sm px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/80 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all duration-200";

  return (
    <section id="agendar" className="px-6 md:px-12 py-16 md:py-24">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <SectionHeader label={b.label} title={b.title} description={b.description} />
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] divide-y lg:divide-y-0 lg:divide-x divide-neutral-100 dark:divide-neutral-800">
              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <button
                    type="button"
                    onClick={goPrevMonth}
                    className="appearance-none flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400 hover:border-accent hover:text-accent transition-colors"
                    aria-label={b.prevMonth}
                  >
                    ←
                  </button>
                  <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100 tracking-tight capitalize">
                    {formatMonthYear(viewYear, viewMonth, locale)}
                  </h3>
                  <button
                    type="button"
                    onClick={goNextMonth}
                    className="appearance-none flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400 hover:border-accent hover:text-accent transition-colors"
                    aria-label={b.nextMonth}
                  >
                    →
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-2">
                  {weekdayLabels.map((label) => (
                    <div
                      key={label}
                      className="text-center text-[10px] font-medium tracking-wider uppercase text-neutral-400 py-1"
                    >
                      {label}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {grid.map((cell) => {
                    const bookable =
                      cell.inMonth && isBookableDay(cell.date, today);
                    const isSelected = selectedDate === cell.iso;
                    const isToday = cell.inMonth && cell.iso === toDateKey(today);

                    return (
                      <button
                        key={`${cell.iso}-${cell.inMonth}`}
                        type="button"
                        disabled={!bookable}
                        onClick={() => {
                          setSelectedDate(cell.iso);
                          setSelectedTime(null);
                          setError(null);
                          setSuccess(null);
                        }}
                        className={`aspect-square rounded-xl text-sm font-medium transition-all duration-200 ${
                          !cell.inMonth
                            ? "text-transparent pointer-events-none"
                            : !bookable
                              ? "text-neutral-300 dark:text-neutral-600 cursor-not-allowed"
                              : isSelected
                                ? "bg-accent text-white shadow-sm shadow-accent/30"
                                : isToday
                                  ? "bg-accent-soft dark:bg-cyan-950/40 text-accent border border-accent/30 hover:bg-accent hover:text-white"
                                  : "text-neutral-700 dark:text-neutral-300 hover:bg-accent-soft dark:hover:bg-cyan-950/40 hover:text-accent"
                        }`}
                      >
                        {cell.inMonth ? cell.date.getDate() : ""}
                      </button>
                    );
                  })}
                </div>

                <p className="mt-4 text-xs text-neutral-400">{b.availabilityNote}</p>
              </div>

              <div className="p-6 md:p-8 bg-neutral-50/50 dark:bg-neutral-950/50">
                {!selectedDate ? (
                  <div className="flex h-full min-h-[280px] items-center justify-center text-center px-4">
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">{b.selectDayPrompt}</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent mb-1">
                        {b.selectedDateLabel}
                      </p>
                      <p className="text-base font-medium text-neutral-900 dark:text-neutral-100 capitalize">
                        {formatSelectedDate(selectedDate, locale)}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-medium text-neutral-500 mb-3">
                        {b.availableTimesLabel}
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[220px] overflow-y-auto pr-1">
                        {timeSlots.map(({ hour, minute, label }) => {
                          const taken = isSlotTaken(selectedDate, hour, minute);
                          const past = isSlotPast(selectedDate, hour, minute);
                          const disabled = taken || past;
                          const isActive =
                            selectedTime?.hour === hour &&
                            selectedTime?.minute === minute;

                          return (
                            <button
                              key={`${hour}-${minute}`}
                              type="button"
                              disabled={disabled}
                              onClick={() => {
                                setSelectedTime({ hour, minute });
                                setError(null);
                                setSuccess(null);
                              }}
                              className={`appearance-none rounded-lg border px-2 py-2 text-xs font-medium transition-all duration-200 ${
                                disabled
                                  ? "border-neutral-100 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800 text-neutral-300 dark:text-neutral-600 cursor-not-allowed line-through"
                                  : isActive
                                    ? "border-accent bg-accent text-white"
                                    : "border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:border-accent/50 hover:text-accent"
                              }`}
                            >
                              {label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {selectedTime && (
                      <form
                        onSubmit={handleSubmit}
                        className="space-y-4 pt-2 border-t border-neutral-200 dark:border-neutral-800"
                      >
                        <div
                          className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
                          aria-hidden
                        >
                          <input
                            type="text"
                            tabIndex={-1}
                            autoComplete="off"
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                          />
                        </div>

                        <p className="text-sm text-neutral-600 dark:text-neutral-300">
                          {b.confirmPrefix}
                          <span className="font-medium text-neutral-900 dark:text-neutral-100">
                            {formatSlotLabel(
                              selectedTime.hour,
                              selectedTime.minute,
                              locale
                            )}
                          </span>
                        </p>

                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder={b.namePlaceholder}
                          className={inputClass}
                        />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder={b.emailPlaceholder}
                          className={inputClass}
                        />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder={b.phonePlaceholder}
                          className={inputClass}
                        />

                        <fieldset className="space-y-2">
                          <legend className="text-xs font-medium text-neutral-500 mb-1.5">
                            {b.modalityLabel}
                          </legend>
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setModality("virtual");
                                setLocation("");
                              }}
                              className={`appearance-none rounded-xl border px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                                modality === "virtual"
                                  ? "border-accent bg-accent text-white"
                                  : "border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:border-accent/50"
                              }`}
                            >
                              {b.modalityVirtual}
                            </button>
                            <button
                              type="button"
                              onClick={() => setModality("in_person")}
                              className={`appearance-none rounded-xl border px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                                modality === "in_person"
                                  ? "border-accent bg-accent text-white"
                                  : "border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:border-accent/50"
                              }`}
                            >
                              {b.modalityInPerson}
                            </button>
                          </div>
                        </fieldset>

                        {modality === "in_person" && (
                          <div>
                            <label className="block text-xs font-medium text-neutral-500 mb-1.5">
                              {b.locationLabel}
                            </label>
                            <input
                              type="text"
                              required
                              value={location}
                              onChange={(e) => setLocation(e.target.value)}
                              placeholder={b.locationPlaceholder}
                              className={inputClass}
                            />
                          </div>
                        )}

                        <textarea
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder={b.notesPlaceholder}
                          rows={2}
                          className={`${inputClass} resize-none`}
                        />

                        {error && (
                          <p role="alert" className="text-sm text-red-500">
                            {error}
                          </p>
                        )}
                        {success && (
                          <p
                            role="status"
                            className="text-sm text-accent-hover bg-accent-soft dark:bg-cyan-950/40 px-4 py-3 rounded-xl"
                          >
                            {success}
                          </p>
                        )}

                        <button
                          type="submit"
                          disabled={loading}
                          className="appearance-none w-full text-sm font-medium py-3.5 rounded-xl bg-accent text-white hover:bg-accent-hover disabled:opacity-50 transition-colors"
                        >
                          {loading ? b.loadingButton : b.confirmButton}
                        </button>
                      </form>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
