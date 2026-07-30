import { comparisonRows } from "@/lib/content";
import ScrollReveal from "./ScrollReveal";

export default function Comparison() {
  return (
    <section id="comparativa" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <ScrollReveal className="mx-auto mb-14 max-w-2xl text-center">
          <p className="section-eyebrow mb-4 justify-center">Comparativa</p>
          <h2 className="section-title mb-4">
            Onvision vs Alegra vs Facturele
          </h2>
          <p className="section-lead">
            El mercado pelea por facturación barata. Nadie más ofrece verticales
            configurables sobre el mismo núcleo.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="overflow-hidden rounded-[1.75rem] border border-ov-line shadow-[0_24px_60px_-36px_rgb(10_22_40_/_0.45)]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="bg-ov-deep text-white">
                    <th className="p-5 font-medium text-white/50">Aspecto</th>
                    <th className="p-5 font-bold text-ov-teal-hot">Onvision</th>
                    <th className="p-5 font-medium text-white/50">Alegra</th>
                    <th className="p-5 font-medium text-white/50">Facturele</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr
                      key={row.label}
                      className={`border-t border-ov-line/80 ${
                        i % 2 ? "bg-ov-surface/60" : "bg-white"
                      }`}
                    >
                      <td className="p-5 font-semibold text-ov-deep">
                        {row.label}
                      </td>
                      <td className="bg-ov-teal-soft/70 p-5 font-bold text-ov-teal">
                        {row.onvision}
                      </td>
                      <td className="p-5 text-ov-muted">{row.alegra}</td>
                      <td className="p-5 text-ov-muted">{row.facturele}</td>
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
