import { comparisonRows } from "@/lib/content";
import ScrollReveal from "./ScrollReveal";

export default function Comparison() {
  return (
    <section id="comparativa" className="relative py-20 md:py-28">
      <div className="relative mx-auto max-w-5xl px-5 md:px-8">
        <ScrollReveal className="mx-auto mb-14 max-w-2xl text-center">
          <p className="section-eyebrow mb-4 justify-center">Comparativa</p>
          <h2 className="section-title mb-4 text-white">
            Onvision vs Alegra vs Facturele
          </h2>
          <p className="section-lead text-white/70">
            El mercado pelea por facturación barata. Nadie más ofrece verticales
            configurables sobre el mismo núcleo.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="overflow-hidden rounded-[1.75rem] border border-white/10 shadow-[0_24px_60px_-36px_rgb(0_0_0_/_0.55)]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="bg-black/40 text-white">
                    <th className="p-5 font-medium text-white/45">Aspecto</th>
                    <th className="p-5 font-bold text-cyan-300">Onvision</th>
                    <th className="p-5 font-medium text-white/45">Alegra</th>
                    <th className="p-5 font-medium text-white/45">Facturele</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr
                      key={row.label}
                      className={`border-t border-white/10 ${
                        i % 2 ? "bg-white/[0.03]" : "bg-white/[0.06]"
                      }`}
                    >
                      <td className="p-5 font-semibold text-white/85">
                        {row.label}
                      </td>
                      <td className="bg-cyan-400/10 p-5 font-bold text-cyan-200">
                        {row.onvision}
                      </td>
                      <td className="p-5 text-white/50">{row.alegra}</td>
                      <td className="p-5 text-white/50">{row.facturele}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
