"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function HeaderLogo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const playOnce = () => {
      const video = videoRef.current;
      if (!video) return;
      video.currentTime = 0;
      const attempt = video.play();
      if (attempt) {
        void attempt.then(() => setPlaying(true)).catch(() => setPlaying(false));
      }
    };

    const first = window.setTimeout(playOnce, 2800);
    const later = window.setInterval(playOnce, 14000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(later);
    };
  }, []);

  return (
    <span className="relative inline-block h-6 aspect-[532/282] shrink-0 overflow-hidden">
      <Image
        src="/logo-eye.png"
        alt=""
        width={532}
        height={282}
        className={`absolute inset-0 h-full w-full object-contain ${
          playing ? "opacity-0" : "opacity-100"
        }`}
        aria-hidden
        priority
      />
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        width={864}
        height={458}
        src="/media/header-eye.mp4"
        className={`pointer-events-none absolute inset-0 h-full w-full object-cover ${
          playing ? "opacity-100" : "opacity-0"
        }`}
        onEnded={() => setPlaying(false)}
        aria-hidden
      />
    </span>
  );
}
