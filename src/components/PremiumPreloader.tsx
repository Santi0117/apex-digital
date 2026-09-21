"use client";

import { useEffect, useRef, useState } from "react";

const SESSION_KEY = "ov-preloader-seen";
const EXIT_MS = 700;
const MAX_WAIT_MS = 4500;

type Phase = "playing" | "exiting" | "done";

/**
 * Premium intro: Onvision eye draw (mismo motion del .MOV de referencia).
 * Solo una vez por sesión; respeta prefers-reduced-motion.
 */
export default function PremiumPreloader() {
  const [phase, setPhase] = useState<Phase>("playing");
  const videoRef = useRef<HTMLVideoElement>(null);
  const exitingRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || sessionStorage.getItem(SESSION_KEY) === "1") {
      setPhase("done");
      return;
    }

    document.documentElement.classList.add("ov-preloader-lock");

    const finish = () => {
      if (exitingRef.current) return;
      exitingRef.current = true;
      sessionStorage.setItem(SESSION_KEY, "1");
      setPhase("exiting");
      window.setTimeout(() => {
        document.documentElement.classList.remove("ov-preloader-lock");
        setPhase("done");
      }, EXIT_MS);
    };

    const maxTimer = window.setTimeout(finish, MAX_WAIT_MS);
    return () => {
      window.clearTimeout(maxTimer);
      document.documentElement.classList.remove("ov-preloader-lock");
    };
  }, []);

  useEffect(() => {
    if (phase !== "playing") return;
    if (typeof window !== "undefined" && sessionStorage.getItem(SESSION_KEY) === "1") {
      return;
    }

    const v = videoRef.current;
    if (!v) return;

    const onEnded = () => {
      if (exitingRef.current) return;
      exitingRef.current = true;
      sessionStorage.setItem(SESSION_KEY, "1");
      setPhase("exiting");
      window.setTimeout(() => {
        document.documentElement.classList.remove("ov-preloader-lock");
        setPhase("done");
      }, EXIT_MS);
    };

    v.addEventListener("ended", onEnded);
    const play = v.play();
    if (play && typeof play.catch === "function") {
      play.catch(() => onEnded());
    }

    return () => v.removeEventListener("ended", onEnded);
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      className={`ov-preloader${phase === "exiting" ? " ov-preloader--exit" : ""}`}
      aria-hidden="true"
      role="presentation"
    >
      <div className="ov-preloader__glow" />
      <div className="ov-preloader__stage">
        <video
          ref={videoRef}
          className="ov-preloader__video"
          muted
          playsInline
          preload="auto"
          // No controls — cinematic intro
        >
          <source src="/preload-eye.webm?v=4" type="video/webm" />
          <source src="/preload-eye.mp4?v=4" type="video/mp4" />
        </video>
      </div>
      <p className="ov-preloader__mark">onvision</p>
    </div>
  );
}
