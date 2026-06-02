"use client";

import Image from "next/image";
import SectionHeader from "./SectionHeader";
import ScrollReveal from "./ScrollReveal";

const projects = [
  {
    image: "/projects/consultora-legal.jpg",
    category: "Sitio corporativo",
    title: "Bufete de abogados",
    stack: "React · Tailwind · Vercel",
  },
  {
    image: "/projects/santi.jpg",
    category: "E-commerce",
    title: "Tienda de retail",
    stack: "Next.js · PostgreSQL · Stripe",
  },
  {
    image: "/projects/panel-inventario.jpg",
    category: "App SaaS",
    title: "Panel de Inventario",
    stack: "NestJS · React · Node.js",
  },
  {
    image: "/projects/constructora-inmobiliaria.jpg",
    category: "Sitio corporativo",
    title: "Bienes raíces",
    stack: "Next.js · CMS · SEO local",
  },
  {
    image: "/projects/diente.jpg",
    category: "Landing page",
    title: "Clínica dental",
    stack: "Next.js · Framer Motion · CMS",
  },
];

export default function Portfolio() {
  return (
    <section id="portafolio" className="bg-white pt-8 md:pt-10 pb-16 md:pb-24">
      <ScrollReveal className="max-w-5xl mx-auto px-6 md:px-12 mb-8 md:mb-10">
        <SectionHeader
          label="Portafolio"
          title="Proyectos recientes"
          hint="Deslizá para ver más →"
        />
      </ScrollReveal>

      <ScrollReveal delay={120} className="relative">
        <div className="bg-stars rounded-3xl mx-4 md:mx-8 lg:mx-auto lg:max-w-6xl py-10 md:py-14 overflow-hidden">
          <div className="flex gap-5 md:gap-6 overflow-x-auto pb-6 px-6 md:px-10 snap-x snap-mandatory">
            {projects.map((project) => (
              <article
                key={project.title}
                className="group flex-shrink-0 w-[300px] sm:w-[340px] md:w-[380px] snap-start rounded-2xl bg-white overflow-hidden portfolio-card-hover cursor-default"
              >
                <div className="bg-white p-4 md:p-5">
                  <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-white border border-neutral-200/80 flex items-center justify-center">
                    <Image
                      src={project.image}
                      alt={`Captura del proyecto ${project.title}`}
                      fill
                      className="object-contain object-center p-1 transition-transform duration-500 group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 300px, 380px"
                    />
                    <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-xl pointer-events-none" />
                  </div>
                </div>

                <div className="p-6 md:p-7 border-t border-neutral-100">
                  <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-accent mb-2.5">
                    {project.category}
                  </p>
                  <h3 className="text-lg font-medium text-neutral-900 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-neutral-400">{project.stack}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
