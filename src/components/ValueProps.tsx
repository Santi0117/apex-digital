import { valueProps } from "@/lib/content";
import ScrollReveal from "./ScrollReveal";

export default function ValueProps() {
  return (
    <section className="hero-surface relative overflow-hidden py-20 md:py-28">
      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <ScrollReveal className="mb-14 max-w-2xl">
          <p className="mb-4 inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] text-ov-teal-hot uppercase">
            <span className="h-0.5 w-5 rounded-full bg-ov-teal-hot" />
            Por qué Onvision
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-white text-balance md:text-5xl md:leading-[1.1]">
            El diferenciador es la verticalización.
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {valueProps.map((item, i) => (
            <ScrollReveal key={item.title} delay={(i % 3) * 0.06}>
              <article
                className={`h-full rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition hover:border-ov-teal/40 hover:bg-white/[0.07] md:p-7 ${
                  i === 0 ? "sm:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div className="mb-5 flex h-9 w-9 items-center justify-center rounded-full bg-ov-teal/20 text-sm font-bold text-ov-teal-hot">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-display mb-2 text-lg font-bold text-white">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/60">
                  {item.description}
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
