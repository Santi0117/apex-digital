import { verticals } from "@/lib/content";
import SectorGlyph from "./SectorGlyph";

export default function SectorsGrid() {
  return (
    <section id="industrias-grid" className="relative pb-20 pt-4 md:pb-28 md:pt-6">
      <div className="relative z-10 mx-auto max-w-5xl px-5 md:px-8">
        <p className="section-eyebrow mb-8 justify-center">
          Industrias listas
        </p>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {verticals.map((sector) => (
            <a
              key={sector.id}
              href={`#${sector.id}`}
              className="group flex flex-col items-center gap-3 rounded-[1.5rem] border border-white/50 bg-white/55 px-3 py-5 text-center shadow-[0_12px_32px_-18px_rgb(10_22_40_/_0.35)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-ov-teal/25 hover:bg-white/85 hover:shadow-[0_20px_40px_-18px_rgb(15_159_110_/_0.35)] md:py-6"
            >
              <div className="flex h-[4.75rem] w-[4.75rem] items-center justify-center rounded-[1.2rem] bg-white shadow-sm ring-1 ring-black/[0.04] transition-transform duration-300 group-hover:scale-105 md:h-[5.25rem] md:w-[5.25rem]">
                <SectorGlyph name={sector.icon} />
              </div>
              <span className="max-w-[8rem] text-[12px] font-semibold leading-snug text-ov-deep md:text-[13px]">
                {sector.name}
              </span>
            </a>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href="#industrias"
            className="inline-flex items-center gap-2 text-sm font-semibold text-ov-deep transition hover:text-ov-teal"
          >
            Ver detalle de cada vertical
            <span
              aria-hidden
              className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-ov-deep text-xs text-white"
            >
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
