"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Configuration for a single decorative floating orb. */
interface OrbConfig {
  id: string;
  size: number;
  left: string;
  top: string;
  /** RGB channel values as a comma-separated string, e.g. "99, 102, 241" */
  rgb: string;
  opacity: number;
  duration: number;
  delay: number;
  yOffset: number;
}

const ORBS: OrbConfig[] = [
  { id: "orb-a", size: 600, left: "5%",  top: "10%", rgb: "99, 102, 241",  opacity: 0.3,  duration: 8,  delay: 0,   yOffset: 50 },
  { id: "orb-b", size: 400, left: "72%", top: "5%",  rgb: "139, 92, 246",  opacity: 0.22, duration: 10, delay: 1.5, yOffset: 35 },
  { id: "orb-c", size: 700, left: "62%", top: "55%", rgb: "99, 102, 241",  opacity: 0.15, duration: 12, delay: 0.5, yOffset: 60 },
  { id: "orb-d", size: 320, left: "22%", top: "65%", rgb: "139, 92, 246",  opacity: 0.18, duration: 9,  delay: 2,   yOffset: 40 },
  { id: "orb-e", size: 480, left: "42%", top: "35%", rgb: "79, 70, 229",   opacity: 0.1,  duration: 11, delay: 1,   yOffset: 45 },
];

/**
 * Renders decorative blurred floating orbs as a background layer.
 *
 * The orbs use radial-gradient + blur to produce a soft glow effect.
 * All animations are disabled when `prefers-reduced-motion` is active.
 */
export function FloatingOrbs() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {ORBS.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.left,
            top: orb.top,
            background: `radial-gradient(circle, rgba(${orb.rgb}, ${orb.opacity}), transparent 70%)`,
            filter: "blur(60px)",
            transform: "translate(-50%, -50%)",
          }}
          animate={shouldReduceMotion ? {} : { y: [0, -orb.yOffset, 0] }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
