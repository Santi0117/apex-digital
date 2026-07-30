import { howItWorks } from "@/lib/content";
import ScrollReveal from "./ScrollReveal";

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <ScrollReveal className="mx-auto mb-14 max-w-2xl text-center">
          <p className="section-eyebrow mb-4 justify-center">Cómo funciona</p>
          <h2 className="section-title mb-4">
            Tres pasos. Sin consultoría eterna.
          </h2>
          <p className="section-lead">
            Entrá, elegí tu industria y empezá a facturar. Onvision se adapta a
            tu empresa — no al revés.
          </p>
        </ScrollReveal>

        <div className="relative">
          <div
            className="step-rail pointer-events-none absolute top-[2.75rem] right-[12%] left-[12%] hidden h-px md:block"
            aria-hidden
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            {howItWorks.map((step, i) => (
              <ScrollReveal key={step.step} delay={i * 0.08}>
                <div className="relative h-full text-center md:px-2">
                  <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-ov-line bg-white shadow-[0_12px_28px_-16px_rgb(10_22_40_/_0.45)]">
                    <span className="font-display text-lg font-bold text-ov-teal">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="font-display mb-3 text-xl font-bold text-ov-deep">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-ov-muted md:text-[15px]">
                    {step.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
