import { verticals } from "@/lib/content";
import ScrollReveal from "./ScrollReveal";
import SectorGlyph from "./SectorGlyph";

export default function Verticals() {
  return (
    <section id="industrias" className="bg-ov-surface py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <ScrollReveal className="mx-auto mb-14 max-w-2xl text-center">
          <p className="section-eyebrow mb-4 justify-center">Verticales</p>
          <h2 className="section-title mb-4">
            Un núcleo. Ocho industrias. Tu versión del producto.
          </h2>
          <p className="section-lead">
            Activá los módulos de tu giro encima de facturación e inventario.
            Cambiá de vertical sin migrar datos.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {verticals.map((v, i) => (
            <ScrollReveal key={v.id} delay={(i % 4) * 0.04}>
              <article
                id={v.id}
                className="card-glow group flex h-full scroll-mt-28 flex-col overflow-hidden rounded-[1.5rem] border border-ov-line bg-white"
              >
                <div className="flex items-center gap-3 border-b border-ov-line/70 bg-white px-5 py-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ov-surface ring-1 ring-black/[0.03] transition group-hover:scale-105">
                    <SectorGlyph name={v.icon} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display truncate text-[15px] font-bold text-ov-deep">
                      {v.name}
                    </h3>
                    <p className="truncate text-[11px] text-ov-muted">
                      {v.subtitle}
                    </p>
                  </div>
                </div>
                <ul className="flex flex-1 flex-col gap-2.5 p-5">
                  {v.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5 text-[13px] leading-snug text-ov-muted"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ov-teal" />
                      {f}
                    </li>
                  ))}
                </ul>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
