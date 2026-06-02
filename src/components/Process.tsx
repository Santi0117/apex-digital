"use client";

import SectionHeader from "./SectionHeader";
import ScrollReveal from "./ScrollReveal";

const steps = [
  {
    number: "01",
    title: "Llamada de descubrimiento",
    description:
      "Entendemos tu negocio, objetivos y qué necesita tu sitio para funcionar.",
  },
  {
    number: "02",
    title: "Propuesta y presupuesto",
    description:
      "Recibís un documento con alcance, tiempos y precio. Sin sorpresas después.",
  },
  {
    number: "03",
    title: "Diseño y desarrollo",
    description:
      "Construimos tu proyecto con revisiones cada semana para que siempre estés al tanto.",
  },
  {
    number: "04",
    title: "Entrega y soporte",
    description:
      "Publicamos y te enseñamos a usarlo. Quedamos disponible para soporte post-lanzamiento.",
  },
];

export default function Process() {
  return (
    <section id="proceso" className="bg-neutral-50 py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <ScrollReveal>
          <SectionHeader
            label="Proceso"
            title="¿Cómo trabajamos juntos?"
            description="Un proceso claro para que sepás exactamente qué esperar en cada etapa."
          />
        </ScrollReveal>

        <div className="relative mt-4">
          <div
            className="absolute left-[19px] md:left-[23px] top-6 bottom-6 w-px bg-gradient-to-b from-neutral-200 via-neutral-300 to-transparent"
            aria-hidden
          />

          <div className="space-y-0">
            {steps.map((step, i) => (
              <ScrollReveal key={step.number} delay={100 + i * 90}>
                <div className="group relative flex gap-6 md:gap-8 py-8 md:py-10">
                  <div className="relative z-10 flex-shrink-0">
                    <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border border-neutral-200 shadow-sm group-hover:border-neutral-900 group-hover:shadow-md transition-all duration-300">
                      <span className="text-xs md:text-sm font-medium text-neutral-400 tabular-nums group-hover:text-neutral-900 transition-colors duration-300">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 pt-1.5 md:pt-2 pb-2 border-b border-neutral-200/80 last:border-0 group-hover:pl-1 transition-all duration-300">
                    <div className="inline-block mb-3">
                      <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-accent/80">
                        Paso {step.number}
                      </span>
                    </div>
                    <h3 className="text-lg md:text-xl font-medium text-neutral-900 mb-2 tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-sm md:text-base text-neutral-500 leading-relaxed max-w-lg">
                      {step.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <ScrollReveal delay={500}>
          <p className="mt-10 text-center text-sm text-neutral-400">
            ¿Listo para empezar?{" "}
            <a
              href="#cotizar"
              className="text-neutral-900 underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-900 transition-colors"
            >
              Escribime
            </a>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
