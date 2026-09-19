"use client";

import { motion, useReducedMotion } from "motion/react";
import "./CompanyPoints.css";

export default function CompanyPoints({
  points,
  className = "",
}: {
  points: readonly string[];
  className?: string;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <ul className={`ov-points ${className}`.trim()}>
        {points.map((point) => (
          <li key={point}>
            <span className="ov-points-sq" aria-hidden />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <motion.ul
      className={`ov-points ${className}`.trim()}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.07, delayChildren: 0.08 } },
      }}
    >
      {points.map((point) => (
        <motion.li
          key={point}
          variants={{
            hidden: { opacity: 0, x: -10 },
            show: { opacity: 1, x: 0 },
          }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="ov-points-sq" aria-hidden />
          <span>{point}</span>
        </motion.li>
      ))}
    </motion.ul>
  );
}
