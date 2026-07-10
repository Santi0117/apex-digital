import { NextResponse } from "next/server";
import { getSupabaseAdmin, isDatabaseConfigured } from "@/lib/supabase";

export type ContactPayload = {
  email: string;
  name: string;
  phone: string;
  service: string;
  interest: string;
  budget: string;
};

const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60_000;

const LIMITS = {
  email: 254,
  name: 200,
  phone: 40,
  service: 120,
  interest: 2000,
  budget: 100,
} as const;

function getClientId(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "anonymous"
  );
}

function isRateLimited(clientId: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(clientId);

  if (!entry || now > entry.resetAt) {
    rateLimit.set(clientId, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT) return true;
  entry.count += 1;
  return false;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function truncate(value: string, max: number): string {
  return value.slice(0, max);
}

export async function POST(request: Request) {
  try {
    if (!isDatabaseConfigured()) {
      return NextResponse.json(
        { error: "El formulario aún no está configurado. Escribinos por WhatsApp." },
        { status: 503 }
      );
    }

    const clientId = getClientId(request);

    if (isRateLimited(clientId)) {
      return NextResponse.json(
        { error: "Demasiados envíos. Intentá de nuevo en un minuto." },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Honeypot anti-spam — bots suelen llenar campos ocultos
    if (typeof body.website === "string" && body.website.trim()) {
      return NextResponse.json({
        ok: true,
        message: "Recibimos tu mensaje. Te contactamos en menos de 24 horas hábiles.",
      });
    }

    const email = truncate(
      typeof body.email === "string" ? body.email.trim() : "",
      LIMITS.email
    );
    const name = truncate(
      typeof body.name === "string" ? body.name.trim() : "",
      LIMITS.name
    );
    const phone = truncate(
      typeof body.phone === "string" ? body.phone.trim() : "",
      LIMITS.phone
    );
    const service = truncate(
      typeof body.service === "string" ? body.service.trim() : "",
      LIMITS.service
    );
    const interest = truncate(
      typeof body.interest === "string" ? body.interest.trim() : "",
      LIMITS.interest
    );
    const budget = truncate(
      typeof body.budget === "string" ? body.budget.trim() : "",
      LIMITS.budget
    );

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: "Ingresá un correo válido." },
        { status: 400 }
      );
    }

    if (!name || name.length < 2) {
      return NextResponse.json(
        { error: "Ingresá tu nombre o el de tu empresa." },
        { status: 400 }
      );
    }

    if (!phone || phone.replace(/\D/g, "").length < 8) {
      return NextResponse.json(
        { error: "Ingresá un teléfono válido." },
        { status: 400 }
      );
    }

    if (!service) {
      return NextResponse.json(
        { error: "Seleccioná el servicio que te interesa." },
        { status: 400 }
      );
    }

    if (!interest || interest.length < 10) {
      return NextResponse.json(
        { error: "Contanos brevemente tu motivo o interés (mín. 10 caracteres)." },
        { status: 400 }
      );
    }

    if (!budget) {
      return NextResponse.json(
        { error: "Seleccioná un rango de presupuesto." },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();
    if (!supabase) {
      return NextResponse.json(
        { error: "Error de configuración del servidor." },
        { status: 503 }
      );
    }

    let { error: dbError } = await supabase.from("contact_submissions").insert({
      email,
      name,
      phone,
      service,
      interest,
      budget,
    });

    // Fallback si aún no existen columnas nuevas en la tabla
    if (dbError?.message?.includes("phone") && !dbError.message.includes("service")) {
      const retry = await supabase.from("contact_submissions").insert({
        email,
        name,
        service,
        interest: `[Teléfono: ${phone}]\n${interest}`,
        budget,
      });
      dbError = retry.error;
    }

    if (dbError?.message?.includes("service")) {
      const retry = await supabase.from("contact_submissions").insert({
        email,
        name,
        interest: `[Servicio: ${service}]\n[Teléfono: ${phone}]\n${interest}`,
        budget,
      });
      dbError = retry.error;
    }

    if (dbError) {
      console.error("[contact-form] DB error:", dbError.message);
      return NextResponse.json(
        { error: "No se pudo guardar tu consulta. Intentá de nuevo o escribinos por WhatsApp." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: "Recibimos tu mensaje. Te contactamos en menos de 24 horas hábiles.",
    });
  } catch {
    return NextResponse.json(
      { error: "Error al enviar el formulario." },
      { status: 500 }
    );
  }
}
