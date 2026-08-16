import { appsIntro, baseFeatures } from "@/lib/content";
import ScrollReveal from "./ScrollReveal";

export default function BaseCommon() {
  return (
    <section id="modulos" className="relative py-20 md:py-28">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid items-end gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <ScrollReveal>
            <p className="section-eyebrow mb-4">Base común</p>
            <h2 className="section-title mb-5 max-w-xl text-white">{appsIntro.title}</h2>
            <p className="section-lead max-w-lg text-white/70">{appsIntro.body}</p>
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="lg:pb-1">
            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-2">
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {baseFeatures.map((item, i) => (
                  <div
                    key={item.name}
                    className={`rounded-[1.25rem] border border-white/10 bg-white/[0.06] px-4 py-4 ${
                      i === baseFeatures.length - 1 && baseFeatures.length % 2 === 1
                        ? "sm:col-span-2"
                        : ""
                    }`}
                  >
                    <p className="font-display text-sm font-bold text-white">
                      {item.name}
                    </p>
                    <p className="mt-1 text-xs text-white/55">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
