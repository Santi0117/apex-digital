"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Aurora = dynamic(() => import("./Aurora"), {
  ssr: false,
  loading: () => null,
});

export default function SiteAurora() {
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
    <div
      className="pointer-events-none fixed inset-0 z-0 opacity-[0.55]"
      aria-hidden
    >
      <Aurora
        colorStops={["#0891B2", "#0E7490", "#0A63F6"]}
        blend={0.55}
        amplitude={0.95}
        speed={0.32}
      />
    </div>
  );
}
