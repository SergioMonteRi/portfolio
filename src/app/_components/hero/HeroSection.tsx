"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Github, Linkedin, ArrowDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { FloatingOrbs } from "./FloatingOrbs";

/** Stagger container — orchestrates the fade-in sequence of child elements. */
const CONTAINER_VARIANTS = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

/** Individual item animation — fades in and slides up from 32px below. */
const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

/**
 * Hero section of the portfolio.
 *
 * Displays the developer's name with a gradient, role, a short description,
 * and CTA links to the projects section, GitHub, and LinkedIn.
 * Animated background orbs run behind the content.
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
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6"
    >
      <FloatingOrbs />

      {/* Main content */}
      <motion.div
        className="relative z-10 flex max-w-5xl flex-col items-center gap-6 text-center"
        variants={containerVariants}
        initial={initial}
        animate="visible"
      >
        {/* Availability badge */}
        <motion.div variants={itemVariants}>
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-indigo-400 backdrop-blur-sm">
            {t("available")}
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl font-bold leading-none tracking-tight sm:text-7xl md:text-8xl lg:text-[9rem]"
        >
          <span className="text-[#f5f5f5]">Sergio</span>{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-300 bg-clip-text text-transparent">
            Monteiro
          </span>
        </motion.h1>

        {/* Role */}
        <motion.p
          variants={itemVariants}
          className="text-2xl font-medium tracking-wide text-zinc-400 sm:text-3xl"
        >
          Front-end Developer
        </motion.p>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="max-w-xl text-base leading-relaxed text-zinc-500 sm:text-lg"
        >
          {t("description")}
        </motion.p>

        {/* CTA row */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-4 pt-2"
        >
          {/* Primary CTA */}
          <a
            href="#projects"
            className="inline-flex h-12 items-center gap-2 rounded-full bg-indigo-600 px-8 text-sm font-semibold text-white shadow-[0_0_40px_rgba(99,102,241,0.3)] transition-all duration-300 hover:bg-indigo-500 hover:shadow-[0_0_60px_rgba(99,102,241,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080808]"
          >
            {t("ctaProjects")}
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/sergiomonteri"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("githubAriaLabel")}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-400 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080808]"
          >
            <Github size={20} aria-hidden="true" />
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/sergiomonteiroribeiro/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("linkedinAriaLabel")}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-400 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080808]"
          >
            <Linkedin size={20} aria-hidden="true" />
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={shouldReduceMotion ? {} : { y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      >
        <ArrowDown size={20} className="text-zinc-600" />
      </motion.div>
    </section>
  );
}
