"use client";

import { useEffect, useRef, useState } from "react";

const SESSION_KEY = "ov-preloader-seen-v2";
const EXIT_MS = 700;
const MAX_WAIT_MS = 3200;
const PLAYBACK_RATE = 1.35;

type Phase = "playing" | "exiting" | "done";

/** Sobreve Strict Mode / remounts en el mismo documento (no usa sessionStorage). */
let gateThisDocument: "unset" | "playing" | "done" = "unset";

function readSessionSeen(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

function persistSessionSeen() {
  try {
    sessionStorage.setItem(SESSION_KEY, "1");
    document.documentElement.classList.add("ov-preloader-skip");
  } catch {
    /* private mode */
  }
}

function initialPhase(): Phase {
  if (typeof window === "undefined") return "playing";

  // Remount en el mismo document (React Strict Mode)
  if (gateThisDocument === "done") return "done";
  if (gateThisDocument === "playing") return "playing";

  // Nueva visita / reload: solo si ya terminó la intro en esta sesión
  if (readSessionSeen()) {
    gateThisDocument = "done";
    return "done";
  }

  gateThisDocument = "playing";
  return "playing";
}

/**
 * Intro del ojo Onvision: una vez por sesión de navegador.
 * No se repite al cambiar secciones del nav.
 */
export default function PremiumPreloader() {
  const [phase, setPhase] = useState<Phase>(initialPhase);
  const videoRef = useRef<HTMLVideoElement>(null);
  const exitingRef = useRef(false);
  const startedRef = useRef(false);

  useEffect(() => {
    if (phase !== "playing") return;
    if (startedRef.current) return;
    startedRef.current = true;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gateThisDocument = "done";
      persistSessionSeen();
      setPhase("done");
      return;
    }

    document.documentElement.classList.add("ov-preloader-lock");

    const finish = () => {
      if (exitingRef.current) return;
      exitingRef.current = true;
      gateThisDocument = "done";
      // Persistir al terminar (o al forzar fin): próximas entradas / reloads lo saltan.
      persistSessionSeen();
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
      // No marcar "seen" en el cleanup de Strict Mode — eso mataba la intro.
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
