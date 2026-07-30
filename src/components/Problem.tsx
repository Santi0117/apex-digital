import { problems } from "@/lib/content";
import ScrollReveal from "./ScrollReveal";

export default function Problem() {
  return (
    <section id="problema" className="bg-ov-surface py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <ScrollReveal className="lg:sticky lg:top-28 lg:self-start">
            <p className="section-eyebrow mb-4">El problema</p>
            <h2 className="section-title mb-5">
              Los softwares actuales no están pensados para Costa Rica
            </h2>
            <p className="section-lead">
              El mercado pelea por facturación barata. Nadie ofrece verticales
              configurables donde el mismo núcleo se convierte en un SaaS
              distinto según la industria.
            </p>
          </ScrollReveal>

          <div className="space-y-4">
            {problems.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.05}>
                <article className="group flex gap-5 rounded-[1.5rem] border border-ov-line bg-white p-6 shadow-sm transition hover:border-ov-teal/30 md:p-7">
                  <span className="font-display shrink-0 text-3xl font-bold tracking-tight text-ov-teal/30 transition group-hover:text-ov-teal md:text-4xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display mb-2 text-lg font-bold text-ov-deep">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-ov-muted md:text-[15px]">
                      {item.description}
                    </p>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
