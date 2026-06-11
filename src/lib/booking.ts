/** Horario de reuniones — America/Costa_Rica (UTC-6, sin DST) */
export const BOOKING_TIMEZONE = "America/Costa_Rica";

export const WORKDAY_START = 9;
export const WORKDAY_END = 17;
export const SLOT_MINUTES = 30;

export const WEEKDAY_LABELS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

export const MONTH_NAMES = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export type CalendarCell = {
  date: Date;
  inMonth: boolean;
  iso: string;
};

export function toDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function buildMonthGrid(year: number, month: number): CalendarCell[] {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const startPad = (first.getDay() + 6) % 7;
  const cells: CalendarCell[] = [];

  for (let i = startPad; i > 0; i--) {
    const date = new Date(year, month, 1 - i);
    cells.push({ date, inMonth: false, iso: toDateKey(date) });
  }

  for (let day = 1; day <= last.getDate(); day++) {
    const date = new Date(year, month, day);
    cells.push({ date, inMonth: true, iso: toDateKey(date) });
  }

  let trailing = 1;
  while (cells.length % 7 !== 0) {
    const date = new Date(year, month + 1, trailing++);
    cells.push({ date, inMonth: false, iso: toDateKey(date) });
  }

  return cells;
}

export function isBookableDay(date: Date, today: Date): boolean {
  const day = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const now = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  if (day < now) return false;
  const dow = day.getDay();
  return dow >= 1 && dow <= 5;
}

export function formatSlotLabel(
  hour: number,
  minute: number,
  locale: "es" | "en" = "es"
): string {
  const h12 = hour % 12 || 12;
  const time = `${h12}:${String(minute).padStart(2, "0")}`;
  if (locale === "en") {
    return `${time} ${hour < 12 ? "AM" : "PM"}`;
  }
  return `${time} ${hour < 12 ? "a. m." : "p. m."}`;
}

export function buildTimeSlots(locale: "es" | "en" = "es") {
  const slots: { hour: number; minute: number; label: string }[] = [];
  for (let hour = WORKDAY_START; hour < WORKDAY_END; hour++) {
    for (let minute = 0; minute < 60; minute += SLOT_MINUTES) {
      if (hour === WORKDAY_END - 1 && minute >= SLOT_MINUTES) break;
      slots.push({
        hour,
        minute,
        label: formatSlotLabel(hour, minute, locale),
      });
    }
  }
  return slots;
}

/** ISO UTC para guardar en Supabase a partir de fecha local CR */
export function localCostaRicaToISO(dateKey: string, hour: number, minute: number): string {
  const [y, m, d] = dateKey.split("-").map(Number);
  const utcMs = Date.UTC(y, m - 1, d, hour + 6, minute, 0);
  return new Date(utcMs).toISOString();
}

export function formatSelectedDate(
  dateKey: string,
  locale: "es" | "en" = "es"
): string {
  const [y, m, d] = dateKey.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString(locale === "en" ? "en-US" : "es-CR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function getWeekdayLabels(locale: "es" | "en" = "es"): string[] {
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(2024, 0, 1 + i);
    return date.toLocaleDateString(locale === "en" ? "en-US" : "es-CR", {
      weekday: "short",
    });
  });
}

export function formatMonthYear(
  year: number,
  month: number,
  locale: "es" | "en" = "es"
): string {
  const date = new Date(year, month, 1);
  return date.toLocaleDateString(locale === "en" ? "en-US" : "es-CR", {
    month: "long",
    year: "numeric",
  });
}
