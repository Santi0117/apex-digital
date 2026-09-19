"use client";

import { Renderer, Program, Mesh, Triangle } from "ogl";
import { useEffect, useRef, useState } from "react";
import "./FluidBackdrop.css";

const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

/** Lighter fluid — fewer fbm octaves, no mouse domain warp cost. */
const FRAG = `#version 300 es
precision mediump float;

uniform float uTime;
uniform vec2 uResolution;
out vec4 fragColor;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 3; i++) {
    v += a * noise(p);
    p *= 2.02;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  vec2 p = (uv - 0.5) * vec2(aspect, 1.0);

  float t = uTime * 0.035;
  vec2 q = vec2(fbm(p * 1.6 + t), fbm(p * 1.6 + vec2(5.2, 1.3) - t * 0.6));
  float n = fbm(p * 1.9 + q * 1.2);

  float ridge = abs(n * 2.0 - 1.0);
  float gloss = pow(1.0 - ridge, 3.5);
  float soft = smoothstep(0.15, 0.85, n);

  vec3 deep = vec3(0.015, 0.016, 0.02);
  vec3 mid = vec3(0.06, 0.065, 0.08);
  vec3 hi = vec3(0.13, 0.145, 0.17);
  vec3 cool = vec3(0.07, 0.1, 0.15);

  vec3 col = mix(deep, mid, soft);
  col = mix(col, hi, gloss * 0.5);
  col += cool * gloss * 0.28;

  float vignette = smoothstep(1.3, 0.28, length(p * 1.1));
  col *= mix(0.55, 1.0, vignette);

  fragColor = vec4(col, 1.0);
}
`;

const TARGET_FPS = 20;
const FRAME_MS = 1000 / TARGET_FPS;

type FluidBackdropProps = {
  className?: string;
};

export default function FluidBackdrop({ className = "" }: FluidBackdropProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || failed) return;

    let frame = 0;
    let renderer: Renderer | null = null;
    let running = false;
    let inView = true;
    let lastDraw = 0;
    let start = performance.now();

    try {
      renderer = new Renderer({
        alpha: false,
        depth: false,
        dpr: 1,
      });
      const gl = renderer.gl;
      gl.clearColor(0.01, 0.01, 0.015, 1);

      const geometry = new Triangle(gl);
      const program = new Program(gl, {
        vertex: VERT,
        fragment: FRAG,
        uniforms: {
          uTime: { value: 0 },
          uResolution: { value: [1, 1] },
        },
      });
      const mesh = new Mesh(gl, { geometry, program });

      container.appendChild(gl.canvas);
      gl.canvas.style.position = "absolute";
      gl.canvas.style.inset = "0";
      gl.canvas.style.width = "100%";
      gl.canvas.style.height = "100%";
      gl.canvas.style.display = "block";
      gl.canvas.style.pointerEvents = "none";

      const resize = () => {
        if (!renderer) return;
        const w = container.clientWidth || 1;
        const h = container.clientHeight || 1;
        renderer.setSize(w, h);
        program.uniforms.uResolution.value = [
          gl.drawingBufferWidth,
          gl.drawingBufferHeight,
        ];
      };

      const draw = (now: number) => {
        if (!renderer || !running) return;
        if (now - lastDraw < FRAME_MS) {
          frame = requestAnimationFrame(draw);
          return;
        }
        lastDraw = now;
        program.uniforms.uTime.value = (now - start) * 0.001;
        renderer.render({ scene: mesh });
        frame = requestAnimationFrame(draw);
      };

      const startLoop = () => {
        if (running || document.hidden || !inView) return;
        running = true;
        lastDraw = 0;
        frame = requestAnimationFrame(draw);
      };

      const stopLoop = () => {
        running = false;
        cancelAnimationFrame(frame);
        frame = 0;
      };

      const sync = () => {
        if (!document.hidden && inView) startLoop();
        else stopLoop();
      };

      resize();
      window.addEventListener("resize", resize);
      document.addEventListener("visibilitychange", sync);

      const io = new IntersectionObserver(
        ([entry]) => {
          inView = entry.isIntersecting && entry.intersectionRatio > 0.05;
          sync();
        },
        { threshold: [0, 0.05, 0.2] },
      );
      io.observe(container);

      sync();

      return () => {
        stopLoop();
        window.removeEventListener("resize", resize);
        document.removeEventListener("visibilitychange", sync);
        io.disconnect();
        if (gl.canvas.parentElement === container) {
          container.removeChild(gl.canvas);
        }
        gl.getExtension("WEBGL_lose_context")?.loseContext();
      };
    } catch {
      setFailed(true);
      return undefined;
    }
  }, [failed]);

  return (
    <div
      ref={containerRef}
      className={`about-fluid${failed ? " about-fluid--fallback" : ""} ${className}`}
      aria-hidden
    />
  );
}
