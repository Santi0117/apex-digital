import { sectorShowcase } from "@/lib/content";

function Arrow() {
  return (
    <span
      aria-hidden
      className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white/50 transition group-hover:border-cyan-300/40 group-hover:text-white"
    >
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none">
        <path
          d="M4 12 12 4M6.5 4H12v5.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function Glow() {
  return (
    <div
      className="pointer-events-none absolute inset-x-[-20%] bottom-[-40%] h-[70%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(8,145,178,0.42),transparent_68%)]"
      aria-hidden
    />
  );
}

function VisualFe() {
  return (
    <div className="relative mt-8 space-y-3 rounded-2xl border border-white/10 bg-black/30 p-4">
      <div className="flex items-center justify-between text-[11px] text-white/50">
        <span>Factura 001-001-000000148</span>
        <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 font-semibold text-emerald-300">
          Aceptada
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
        <div className="h-full w-[92%] rounded-full bg-cyan-400" />
      </div>
      <p className="font-mono text-[10px] tracking-wide text-white/35">
        Clave · 506140826003101…
      </p>
      <div className="flex items-center gap-2 text-xs text-white/70">
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
        Hacienda · TRIBU-CR · FE 4.4
      </div>
    </div>
  );
}

function VisualStock() {
  return (
    <div className="relative mt-6 space-y-2">
      <div className="mb-1 flex items-center gap-2 text-[10px] font-semibold tracking-wide text-emerald-300 uppercase">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>
        En vivo
      </div>
      {[
        ["Varilla 3/8", "142", "ok"],
        ["Café 250 g", "8", "bajo"],
        ["Cemento 50 kg", "64", "ok"],
      ].map(([name, qty, state]) => (
        <div
          key={name}
          className="flex items-center justify-between rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-[11px]"
        >
          <span className="text-white/80">{name}</span>
          <span className={state === "bajo" ? "font-semibold text-amber-300" : "text-white"}>
            {qty} und
          </span>
        </div>
      ))}
    </div>
  );
}

function VisualFinanzas() {
  return (
    <div className="relative mt-6 grid grid-cols-2 gap-2">
      <div className="rounded-xl border border-white/10 bg-black/30 p-3">
        <p className="text-[10px] tracking-wide text-white/40 uppercase">Hoy</p>
        <p className="mt-1 text-lg font-bold text-emerald-300">₡1.24 M</p>
        <p className="text-[10px] text-white/45">ingresos</p>
      </div>
      <div className="rounded-xl border border-white/10 bg-black/30 p-3">
        <p className="text-[10px] tracking-wide text-white/40 uppercase">Salidas</p>
        <p className="mt-1 text-lg font-bold text-white">₡318 mil</p>
        <p className="text-[10px] text-white/45">caja neta +</p>
      </div>
      <div className="col-span-2 rounded-xl border border-white/10 bg-cyan-400/10 px-3 py-2 text-center text-[11px] font-semibold text-cyan-200">
        SINPE · CRC / USD
      </div>
    </div>
  );
}

function VisualGiros() {
  const chips = ["Obra", "Cartera", "POS", "Plazos", "Agenda", "Lotes"];
  return (
    <div className="relative mt-6 flex flex-wrap gap-2">
      {chips.map((chip) => (
        <span
          key={chip}
          className="rounded-full border border-white/15 bg-black/30 px-3 py-1.5 text-[11px] font-semibold text-white/80"
        >
          {chip}
        </span>
      ))}
    </div>
  );
}

function VisualIa() {
  return (
    <div className="relative mt-6 space-y-2">
      <div className="rounded-2xl rounded-tl-md border border-cyan-400/20 bg-cyan-400/10 px-3 py-2.5 text-[12px] leading-snug text-white/85">
        Esta semana el margen se te fue en 3 SKUs. Reponé café 250 g antes del viernes.
      </div>
      <div className="flex justify-end">
        <div className="max-w-[85%] rounded-2xl rounded-tr-md border border-white/10 bg-black/30 px-3 py-2 text-[11px] text-white/55">
          ¿Y si bajo precio en varilla?
        </div>
      </div>
    </div>
  );
}

const visuals = {
  fe: VisualFe,
  stock: VisualStock,
  finanzas: VisualFinanzas,
  giros: VisualGiros,
  ia: VisualIa,
};

export default function SectorBento() {
  return (
    <section id="hecho" className="relative pb-28 pt-4 md:pb-40 md:pt-6">
      <div className="relative z-10 mx-auto max-w-6xl px-5 md:px-8">
        <p className="mb-3 flex justify-center text-[11px] font-semibold tracking-[0.2em] text-[#67e8f9] uppercase">
          {sectorShowcase.eyebrow}
        </p>
        <h2 className="font-display mx-auto mb-10 max-w-2xl text-center text-2xl font-bold tracking-tight text-white text-balance md:mb-12 md:text-3xl">
          {sectorShowcase.title}
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2">
          {sectorShowcase.cards.map((card) => {
            const Visual = visuals[card.visual];
            return (
              <a
                key={card.id}
                href={card.href}
                className={`group relative flex min-h-[260px] flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0b1118]/80 p-6 backdrop-blur-sm transition hover:border-cyan-400/35 md:p-7 ${
                  card.featured ? "md:row-span-2 md:min-h-[540px]" : ""
                }`}
              >
                <Glow />
                <Arrow />
                <div className="relative z-10 max-w-[20rem] pr-8">
                  <h3 className="font-display text-xl font-bold tracking-tight text-white md:text-[1.35rem]">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">
                    {card.description}
                  </p>
                </div>
                <div className="relative z-10 mt-auto">
                  <Visual />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
