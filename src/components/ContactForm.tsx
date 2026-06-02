"use client";

import { useState } from "react";
import SectionHeader from "./SectionHeader";
import ScrollReveal from "./ScrollReveal";

const budgetOptions = [
  "Menos de $500",
  "$500 – $1,000",
  "$1,000 – $2,500",
  "$2,500 – $5,000",
  "Más de $5,000",
  "Aún no lo sé",
];

export default function ContactForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [interest, setInterest] = useState("");
  const [budget, setBudget] = useState("");
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, interest, budget, website }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "No se pudo enviar el formulario.");
      }

      setSuccess(data.message);
      setEmail("");
      setName("");
      setInterest("");
      setBudget("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error de conexión.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full text-sm px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all duration-200";

  return (
    <section id="cotizar" className="px-6 md:px-12 py-16 md:py-24 bg-neutral-50">
      <div className="max-w-xl mx-auto">
        <ScrollReveal>
          <SectionHeader
            label="Contacto"
            title="Contanos sobre tu proyecto"
            description="Completá el formulario y te respondemos con una propuesta a medida."
          />
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <form
            onSubmit={handleSubmit}
            className="relative rounded-2xl border border-neutral-200 bg-white p-6 md:p-8 space-y-5 shadow-sm"
          >
            {/* Honeypot — oculto para usuarios, visible para bots */}
            <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
              <label htmlFor="contact-website">Website</label>
              <input
                id="contact-website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="contact-email" className="block text-xs font-medium text-neutral-500 mb-1.5">
                Correo electrónico
              </label>
              <input
                id="contact-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@empresa.com"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="contact-name" className="block text-xs font-medium text-neutral-500 mb-1.5">
                Nombre o empresa
              </label>
              <input
                id="contact-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre o nombre de la empresa"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="contact-interest" className="block text-xs font-medium text-neutral-500 mb-1.5">
                Motivo o interés
              </label>
              <textarea
                id="contact-interest"
                required
                rows={3}
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                placeholder="Ej: Necesito una tienda online para vender productos artesanales..."
                className={`${inputClass} resize-none`}
              />
            </div>

            <div>
              <label htmlFor="contact-budget" className="block text-xs font-medium text-neutral-500 mb-1.5">
                Presupuesto estimado
              </label>
              <select
                id="contact-budget"
                required
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className={`${inputClass} appearance-none cursor-pointer`}
              >
                <option value="" disabled>
                  Seleccioná un rango
                </option>
                {budgetOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {error && (
              <p role="alert" className="text-sm text-red-500 text-center">
                {error}
              </p>
            )}

            {success && (
              <p role="status" className="text-sm text-accent-hover text-center bg-accent-soft px-4 py-3 rounded-xl">
                {success}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="appearance-none w-full text-sm font-medium py-3.5 rounded-xl bg-accent text-white hover:bg-accent-hover disabled:opacity-50 transition-colors duration-200"
            >
              {loading ? "Enviando..." : "Enviar consulta"}
            </button>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
}
