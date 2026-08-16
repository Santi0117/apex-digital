import { verticals } from "@/lib/content";
import SectorGlyph from "./SectorGlyph";

export default function SectorsGrid() {
  return (
    <section id="industrias-grid" className="relative pb-10 pt-2 md:pb-12 md:pt-4">
      <div className="relative z-10 mx-auto max-w-5xl px-5 md:px-8">
        <p className="mb-6 flex justify-center text-[11px] font-semibold tracking-[0.2em] text-[#67e8f9] uppercase">
          Industrias listas
        </p>

        <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-5 sm:gap-y-10">
          {verticals.map((sector) => (
            <a
              key={sector.id}
              href={`#${sector.id}`}
              className="group flex flex-col items-center gap-2 px-1 text-center text-[#a5f3fc] transition-all duration-300 hover:-translate-y-0.5 hover:text-white"
            >
              <SectorGlyph name={sector.icon} plain />
              <span className="max-w-[9rem] text-sm font-semibold leading-snug text-white/85 transition-colors group-hover:text-white sm:text-[15px]">
                {sector.name}
              </span>
            </a>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <a
            href="#industrias"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition hover:text-white"
          >
            Ver detalle de cada vertical
            <span
              aria-hidden
              className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-ov-teal text-xs text-white"
            >
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
