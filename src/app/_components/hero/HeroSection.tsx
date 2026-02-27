"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";
import { useTranslations } from "next-intl";

/** Stagger container — orchestrates the fade-in sequence of child elements. */
const CONTAINER_VARIANTS = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

/** Individual item animation — fades in and slides up from 20px below. */
const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as const },
  },
};

/**
 * Hero section of the portfolio.
 *
 * Editorial, typographic-driven layout with oversized name treatment.
 * "Sergio" in white, "Monteiro" in amber — no floating orbs.
 * All entry animations are disabled when `prefers-reduced-motion` is active.
 */
export function HeroSection() {
  const t = useTranslations("hero");
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = shouldReduceMotion ? {} : CONTAINER_VARIANTS;
  const itemVariants = shouldReduceMotion ? {} : ITEM_VARIANTS;
  const initial = shouldReduceMotion ? false : ("hidden" as const);

  return (
    <section
      id="hero"
      aria-label={t("ariaLabel")}
      className="relative flex min-h-screen flex-col justify-end overflow-hidden px-6 pb-16 pt-32 md:pb-24"
    >
      {/* Amber accent line — top of page */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[2px]"
        style={{ background: "#e8651a" }}
      />

      {/* Vertical grid lines — subtle structural texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "80px 100%",
        }}
      />

      <motion.div
        className="relative z-10 mx-auto w-full max-w-7xl"
        variants={containerVariants}
        initial={initial}
        animate="visible"
      >
        {/* Availability status */}
        <motion.div
          variants={itemVariants}
          className="mb-10 flex items-center gap-2.5"
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            aria-hidden="true"
            style={{ background: "#e8651a" }}
          />
          <span className="font-mono text-xs uppercase tracking-[0.22em] text-zinc-500">
            {t("available")}
          </span>
        </motion.div>

        {/* Name — oversized editorial type */}
        <motion.h1
          variants={itemVariants}
          className="mb-10 font-extrabold leading-[0.88] tracking-tight"
          style={{ fontSize: "clamp(3.5rem, 13vw, 11rem)" }}
        >
          <span className="block text-[#f5f5f5]">Sergio</span>
          <span className="block" style={{ color: "#e8651a" }}>
            Monteiro
          </span>
        </motion.h1>

        {/* Footer row — role, description, CTAs */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col gap-8 border-t pt-8 sm:flex-row sm:items-end sm:justify-between"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          {/* Left: role + description */}
          <div className="flex flex-col gap-3">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
              &#91; Front-end Developer &#93;
            </p>
            <p className="max-w-md text-sm leading-relaxed text-zinc-400 sm:text-base">
              {t("description")}
            </p>
          </div>

          {/* Right: CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Primary CTA */}
            <a
              href="#projects"
              className="inline-flex h-10 items-center gap-2 border border-[#e8651a] px-6 text-sm font-semibold text-[#e8651a] transition-all duration-200 hover:bg-[#e8651a] hover:text-[#080808] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8651a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080808]"
            >
              {t("ctaProjects")} →
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/sergiomonteri"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("githubAriaLabel")}
              className="flex h-10 w-10 items-center justify-center border border-white/10 text-zinc-500 transition-all duration-200 hover:border-white/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8651a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080808]"
            >
              <Github size={17} aria-hidden="true" />
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/sergiomonteiroribeiro/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("linkedinAriaLabel")}
              className="flex h-10 w-10 items-center justify-center border border-white/10 text-zinc-500 transition-all duration-200 hover:border-white/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8651a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080808]"
            >
              <Linkedin size={17} aria-hidden="true" />
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
