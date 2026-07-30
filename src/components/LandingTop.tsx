"use client";

import dynamic from "next/dynamic";
import Hero from "./Hero";
import SectorsGrid from "./SectorsGrid";

const Aurora = dynamic(() => import("./Aurora"), {
  ssr: false,
  loading: () => null,
});

export default function LandingTop() {
  return (
    <div className="relative overflow-hidden bg-[#f7faf8]">
      <div className="pointer-events-none absolute inset-0 z-0 opacity-90">
        <Aurora
          colorStops={["#0F9F6E", "#E8F5EF", "#1D6FB8"]}
          blend={0.55}
          amplitude={1.05}
          speed={0.45}
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-white/20"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-24 bg-gradient-to-b from-transparent to-white"
        aria-hidden
      />

      <div className="relative z-10">
        <Hero />
        <SectorsGrid />
      </div>
    </div>
  );
}
