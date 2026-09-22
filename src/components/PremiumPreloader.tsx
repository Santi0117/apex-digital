"use client";

import { useEffect, useRef, useState } from "react";

const SESSION_KEY = "ov-preloader-seen";
const EXIT_MS = 700;
const MAX_WAIT_MS = 3200;
const PLAYBACK_RATE = 1.35;

type Phase = "playing" | "exiting" | "done";

function hasSeenIntro(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return (
      sessionStorage.getItem(SESSION_KEY) === "1" ||
      document.documentElement.classList.contains("ov-preloader-skip")
    );
  } catch {
    return false;
  }
}

function markIntroSeen() {
  try {
    sessionStorage.setItem(SESSION_KEY, "1");
    document.documentElement.classList.add("ov-preloader-skip");
  } catch {
    /* private mode */
  }
}

/**
 * Intro del ojo Onvision: solo en la primera entrada de la sesión.
 * No se repite al cambiar secciones del nav.
 */
export default function PremiumPreloader() {
  const [phase, setPhase] = useState<Phase>(() =>
    hasSeenIntro() ? "done" : "playing",
  );
  const videoRef = useRef<HTMLVideoElement>(null);
  const exitingRef = useRef(false);

  useEffect(() => {
    if (phase !== "playing") return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      markIntroSeen();
      setPhase("done");
      return;
    }

    // Marcar al empezar: navegar a mitad de intro no la vuelve a disparar.
    markIntroSeen();
    document.documentElement.classList.add("ov-preloader-lock");

    const finish = () => {
      if (exitingRef.current) return;
      exitingRef.current = true;
      setPhase("exiting");
      window.setTimeout(() => {
        document.documentElement.classList.remove("ov-preloader-lock");
        setPhase("done");
      }, EXIT_MS);
    };

    const maxTimer = window.setTimeout(finish, MAX_WAIT_MS);
    const v = videoRef.current;

    const onEnded = () => finish();
    if (v) {
      v.addEventListener("ended", onEnded);
      v.playbackRate = PLAYBACK_RATE;
      const play = v.play();
      if (play && typeof play.catch === "function") {
        play.catch(() => finish());
      }
    }

    return () => {
      window.clearTimeout(maxTimer);
      v?.removeEventListener("ended", onEnded);
    };
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      className={`ov-preloader${phase === "exiting" ? " ov-preloader--exit" : ""}`}
      aria-hidden="true"
      role="presentation"
      suppressHydrationWarning
    >
      <div className="ov-preloader__glow" />
      <div className="ov-preloader__stage">
        <video
          ref={videoRef}
          className="ov-preloader__video"
          muted
          playsInline
          preload="auto"
        >
          <source src="/preload-eye.webm?v=4" type="video/webm" />
          <source src="/preload-eye.mp4?v=4" type="video/mp4" />
        </video>
      </div>
      <p className="ov-preloader__mark">onvision</p>
    </div>
  );
}
