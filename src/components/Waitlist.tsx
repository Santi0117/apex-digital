"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { appUrlDeVertical } from "@/lib/activacion";
import { waitlist, verticals } from "@/lib/content";
import { site } from "@/lib/site";

export default function Waitlist() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [industry, setIndustry] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Restaurantes, Inmo, Obras, Salud, Retail, Agrícola, etc.: ir directo a activar la prueba.
    if (industry && appUrlDeVertical(industry)) {
      router.push(`/activar?vertical=${industry}&plan=vertical`);
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setSuccess(true);
    setLoading(false);
    setName("");
    setEmail("");
    setCompany("");
    setIndustry("");
  };

  const fieldClass =
    "w-full rounded-2xl border border-white/15 bg-white/10 px-4 py-3.5 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-ov-teal focus:ring-2 focus:ring-ov-teal/25";

  return (
    <section
      id="registro"
      className="hero-surface relative overflow-hidden py-20 md:py-28"
    >
      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] text-ov-teal-hot uppercase">
              <span className="h-0.5 w-5 rounded-full bg-ov-teal-hot" />
              Empezá hoy
            </p>
            <h2 className="font-display mb-5 text-3xl font-bold tracking-tight text-white text-balance md:text-5xl md:leading-[1.1]">
              {waitlist.title}
            </h2>
            <p className="mb-8 max-w-md text-base leading-relaxed text-white/65 md:text-lg">
              {waitlist.subtitle}
            </p>

            <ul className="space-y-3">
              {waitlist.benefits.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-3 text-sm text-white/80"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ov-teal/25 text-[11px] font-bold text-ov-teal-hot">
                    ✓
                  </span>
                  {b}
                </li>
              ))}
            </ul>

            <p className="mt-8 text-xs text-white/45">
              No necesitás tarjeta de crédito · Acceso en menos de 24 h
            </p>
          </div>

          <form
            id="form-registro"
            onSubmit={handleSubmit}
            className="rounded-[1.75rem] border border-white/12 bg-white/[0.07] p-7 backdrop-blur-md md:p-9"
          >
            <h3 className="font-display mb-6 text-lg font-bold text-white">
              Empezá tu prueba de 15 días
            </h3>
            <div className="space-y-3.5">
              <select
                required
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className={`${fieldClass} [&>option]:bg-ov-deep [&>option]:text-white`}
              >
                <option value="" disabled>
                  ¿Cuál es tu industria?
                </option>
                {verticals.map((v) => {
                  const lista = appUrlDeVertical(v.id) !== null;
                  return (
                    <option key={v.id} value={v.id}>
                      {lista ? `${v.name} · disponible ahora` : `${v.name} · lista de espera`}
                    </option>
                  );
                })}
                <option value="otra">Otra</option>
              </select>
              {!(industry && appUrlDeVertical(industry)) && (
                <>
                  <input
                    type="text"
                    required
                    placeholder="Tu nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={fieldClass}
                  />
                  <input
                    type="email"
                    required
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={fieldClass}
                  />
                  <input
                    type="text"
                    required
                    placeholder="Empresa"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className={fieldClass}
                  />
                </>
              )}
            </div>
            {industry && appUrlDeVertical(industry) && (
              <p className="mt-3 text-sm text-ov-teal-hot">
                Esta industria ya está lista. Te llevamos a crear tu cuenta y activar la prueba.
              </p>
            )}

            {success && (
              <p className="mt-4 text-center text-sm text-ov-teal-hot">
                ¡Listo! Te escribimos en menos de 24 horas.
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-teal mt-6 w-full disabled:opacity-50"
            >
              {loading
                ? "Enviando..."
                : industry && appUrlDeVertical(industry)
                  ? "Activar prueba ahora →"
                  : "Quiero probar 15 días →"}
            </button>
            <p className="mt-4 text-center text-xs text-white/45">
              o escribinos a {site.email}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
