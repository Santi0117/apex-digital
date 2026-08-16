import { verticals } from "@/lib/content";
import ScrollReveal from "./ScrollReveal";
import SectorGlyph from "./SectorGlyph";

export default function Verticals() {
  return (
    <section id="industrias" className="relative py-20 md:py-28">
      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <ScrollReveal className="mx-auto mb-14 max-w-2xl text-center">
          <p className="section-eyebrow mb-4 justify-center">Verticales</p>
          <h2 className="section-title mb-4 text-white">
            Detalle por industria: cómo Onvision te ayuda de verdad
          </h2>
          <p className="section-lead text-white/70">
            Cada vertical activa módulos sobre el mismo núcleo de facturación e
            inventario. Cambiá de giro sin migrar datos.
          </p>
        </ScrollReveal>

        <div className="flex flex-col gap-6 md:gap-8">
          {verticals.map((v, i) => (
            <ScrollReveal key={v.id} delay={Math.min(i * 0.04, 0.2)}>
              <article
                id={v.id}
                className="scroll-mt-28 overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04] shadow-[0_16px_40px_-28px_rgb(0_0_0_/_0.55)]"
              >
                <div className="grid gap-0 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
                  <div className="flex flex-col justify-between border-b border-white/10 bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent p-7 md:p-9 lg:border-r lg:border-b-0">
                    <div>
                      <div className="mb-5 flex items-center gap-4">
                        <SectorGlyph name={v.icon} />
                        <div>
                          <p className="mb-1 text-[11px] font-bold tracking-[0.18em] text-cyan-300 uppercase">
                            Vertical
                          </p>
                          <h3 className="font-display text-2xl font-bold tracking-tight text-white text-balance md:text-[1.75rem] md:leading-snug">
                            {v.name}
                          </h3>
                        </div>
                      </div>
                      <p className="mb-3 text-sm font-semibold text-cyan-200/90">
                        {v.subtitle}
                      </p>
                      <p className="text-[15px] leading-relaxed text-white/70 md:text-base md:leading-relaxed">
                        {v.pitch}
                      </p>
                    </div>

                    <a
                      href="/activar"
                      className="btn-teal mt-8 inline-flex w-full sm:w-auto"
                    >
                      Activar esta vertical
                    </a>
                  </div>

                  <div className="p-7 md:p-9">
                    <h4 className="font-display mb-4 text-sm font-bold tracking-wide text-white uppercase">
                      Cómo te ayuda Onvision
                    </h4>
                    <ul className="mb-8 space-y-3.5">
                      {v.helps.map((item) => (
                        <li
                          key={item}
                          className="flex gap-3 text-[15px] leading-relaxed text-white/60"
                        >
                          <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-400" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <h4 className="font-display mb-3 text-sm font-bold tracking-wide text-white uppercase">
                      Módulos incluidos
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {v.features.map((f) => (
                        <span
                          key={f}
                          className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-1.5 text-xs font-semibold text-cyan-100"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
