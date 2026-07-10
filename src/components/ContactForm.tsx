"use client";

import { useState } from "react";
import SectionHeader from "./SectionHeader";
import ScrollReveal from "./ScrollReveal";
import { formatPhoneWithCode } from "@/lib/americas-phone-codes";
import { useLanguage } from "@/lib/i18n/language-provider";
import PhoneInput from "./PhoneInput";

export default function ContactForm() {
  const { copy } = useLanguage();
  const c = copy.contact;
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneCountryCode, setPhoneCountryCode] = useState("+506");
  const [service, setService] = useState("");
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
        body: JSON.stringify({
          email,
          name,
          phone: formatPhoneWithCode(phoneCountryCode, phone),
          service,
          interest,
          budget,
          website,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? c.errorSubmit);
      }

      setSuccess(data.message);
      setEmail("");
      setName("");
      setPhone("");
      setPhoneCountryCode("+506");
      setService("");
      setInterest("");
      setBudget("");
    } catch (err) {
      setError(err instanceof Error ? err.message : c.errorConnection);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full text-sm px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/80 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all duration-200";

  return (
    <section id="cotizar" className="px-6 md:px-12 py-16 md:py-24">
      <div className="max-w-xl mx-auto">
        <ScrollReveal>
          <SectionHeader label={c.label} title={c.title} description={c.description} />
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <form
            onSubmit={handleSubmit}
            className="relative rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 md:p-8 space-y-5 shadow-sm"
          >
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
              <label
                htmlFor="contact-email"
                className="block text-xs font-medium text-neutral-500 mb-1.5"
              >
                {c.emailLabel}
              </label>
              <input
                id="contact-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={c.emailPlaceholder}
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="contact-name"
                className="block text-xs font-medium text-neutral-500 mb-1.5"
              >
                {c.nameLabel}
              </label>
              <input
                id="contact-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={c.namePlaceholder}
                className={inputClass}
              />
            </div>

            <PhoneInput
              countryValue={phoneCountryCode}
              onCountryChange={setPhoneCountryCode}
              phone={phone}
              onPhoneChange={setPhone}
              label={c.phoneLabel}
              placeholder={c.phonePlaceholder}
            />

            <div>
              <label
                htmlFor="contact-service"
                className="block text-xs font-medium text-neutral-500 mb-1.5"
              >
                {c.serviceLabel}
              </label>
              <select
                id="contact-service"
                required
                value={service}
                onChange={(e) => setService(e.target.value)}
                className={`${inputClass} appearance-none cursor-pointer`}
              >
                <option value="" disabled>
                  {c.servicePlaceholder}
                </option>
                {c.serviceOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="contact-interest"
                className="block text-xs font-medium text-neutral-500 mb-1.5"
              >
                {c.interestLabel}
              </label>
              <textarea
                id="contact-interest"
                required
                rows={3}
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                placeholder={c.interestPlaceholder}
                className={`${inputClass} resize-none`}
              />
            </div>

            <div>
              <label
                htmlFor="contact-budget"
                className="block text-xs font-medium text-neutral-500 mb-1.5"
              >
                {c.budgetLabel}
              </label>
              <select
                id="contact-budget"
                required
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className={`${inputClass} appearance-none cursor-pointer`}
              >
                <option value="" disabled>
                  {c.budgetPlaceholder}
                </option>
                {c.budgetOptions.map((opt) => (
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
              <p
                role="status"
                className="text-sm text-accent-hover text-center bg-accent-soft dark:bg-cyan-950/40 px-4 py-3 rounded-xl"
              >
                {success}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="appearance-none w-full text-sm font-medium py-3.5 rounded-xl bg-accent text-white hover:bg-accent-hover disabled:opacity-50 transition-colors duration-200"
            >
              {loading ? c.loadingButton : c.submitButton}
            </button>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
}
