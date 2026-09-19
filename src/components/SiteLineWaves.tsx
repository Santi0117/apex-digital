"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const LineWaves = dynamic(() => import("./LineWaves"), {
  ssr: false,
  loading: () => null,
});

export default function SiteLineWaves() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  if (reduceMotion) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      <LineWaves
        speed={0.3}
        innerLineCount={32}
        outerLineCount={36}
        warpIntensity={1}
        rotation={-45}
        edgeFadeWidth={0}
        colorCycleSpeed={1}
        brightness={0.2}
        color1="#0a63f6"
        color2="#365587"
        color3="#5090a1"
        enableMouseInteraction
        mouseInfluence={2}
      />
    </div>
  );
}
