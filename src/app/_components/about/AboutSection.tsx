"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Briefcase, GraduationCap, Globe } from "lucide-react";
import { useTranslations } from "next-intl";
import type { ElementType, ReactNode } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface HighlightItem {
  icon: ElementType;
  title: string;
  subtitle: string;
  detail: string;
}

// ─── Animation variants ───────────────────────────────────────────────────────

const CONTAINER_VARIANTS = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function ProfilePhoto({ placeholder }: { placeholder: string }) {
  return (
    <div className="relative mx-auto h-64 w-64 lg:h-80 lg:w-80">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-2xl blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.35) 0%, rgba(139,92,246,0.25) 50%, transparent 75%)",
        }}
      />

      {/* Border ring via gradient wrapper */}
      <div
        className="absolute inset-0 rounded-2xl p-px"
        style={{
          background:
            "linear-gradient(135deg, rgba(99,102,241,0.5), rgba(139,92,246,0.3), rgba(255,255,255,0.06))",
        }}
      >
        <div
          className="h-full w-full rounded-2xl"
          style={{ background: "linear-gradient(135deg, #0d0d1e 0%, #09090f 100%)" }}
        />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-2xl">
        {/* Inner radial highlight */}
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-2xl opacity-30"
          style={{
            background:
              "radial-gradient(circle at 35% 35%, rgba(99,102,241,0.4), transparent 55%)",
          }}
        />

        {/* Initials */}
        <span
          className="relative select-none text-7xl font-bold"
          style={{
            background: "linear-gradient(135deg, #818cf8 0%, #a78bfa 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          SM
        </span>

        {/* Placeholder label */}
        <span className="relative text-xs font-medium uppercase tracking-widest text-zinc-600">
          {placeholder}
        </span>
      </div>
    </div>
  );
}

function HighlightCard({ icon: Icon, title, subtitle, detail }: HighlightItem) {
  return (
    <div
      className="flex items-start gap-3 rounded-xl border p-4 transition-colors duration-200 hover:bg-white/[0.04]"
      style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}
    >
      <div className="mt-0.5 flex-shrink-0 rounded-lg bg-indigo-600/20 p-2">
        <Icon size={15} className="text-indigo-400" aria-hidden="true" />
      </div>

      <div className="min-w-0">
        <p className="text-sm font-semibold leading-tight text-[#f5f5f5]">{title}</p>
        <p className="mt-0.5 text-xs text-zinc-400">{subtitle}</p>
        <p className="mt-0.5 text-xs text-zinc-600">{detail}</p>
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

/**
 * About section of the portfolio.
 *
 * Displays a profile photo placeholder, a professional bio, and a grid of
 * highlight cards covering current role, education, and language skills.
 * All animations are scroll-triggered via `whileInView` and disabled when
 * `prefers-reduced-motion` is active.
 */
export function AboutSection() {
  const t = useTranslations("about");
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = shouldReduceMotion ? {} : CONTAINER_VARIANTS;
  const itemVariants = shouldReduceMotion ? {} : ITEM_VARIANTS;
  const initial = shouldReduceMotion ? false : ("hidden" as const);

  /** Renders a bold inline span for rich-text interpolation. */
  const boldSpan = (chunks: ReactNode) => (
    <span className="font-medium text-zinc-300">{chunks}</span>
  );

  const highlights: HighlightItem[] = [
    {
      icon: Briefcase,
      title: "NewGo Software House",
      subtitle: t("highlights.newgo.subtitle"),
      detail: t("highlights.newgo.detail"),
    },
    {
      icon: GraduationCap,
      title: t("highlights.uxdesign.title"),
      subtitle: "PUCRS",
      detail: t("highlights.uxdesign.detail"),
    },
    {
      icon: GraduationCap,
      title: t("highlights.ads.title"),
      subtitle: "UMC",
      detail: t("highlights.ads.detail"),
    },
    {
      icon: Globe,
      title: t("highlights.english.title"),
      subtitle: t("highlights.english.subtitle"),
      detail: t("highlights.english.detail"),
    },
  ];

  return (
    <section
      id="about"
      aria-label={t("ariaLabel")}
      className="relative px-6 py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[2fr_3fr] lg:gap-24">

          {/* ── Photo ─────────────────────────────────────────────────────── */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: -48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex justify-center"
          >
            <ProfilePhoto placeholder={t("photoPlaceholder")} />
          </motion.div>

          {/* ── Text content ──────────────────────────────────────────────── */}
          <motion.div
            variants={containerVariants}
            initial={initial}
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            {/* Section label */}
            <motion.span
              variants={itemVariants}
              className="text-sm font-medium uppercase tracking-widest text-indigo-400"
            >
              {t("sectionLabel")}
            </motion.span>

            {/* Heading */}
            <motion.h2
              variants={itemVariants}
              className="text-3xl font-bold leading-tight text-[#f5f5f5] sm:text-4xl lg:text-5xl"
            >
              {t("heading")}{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                {t("headingHighlight")}
              </span>
            </motion.h2>

            {/* Bio */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-4 text-base leading-relaxed text-zinc-400"
            >
              <p>
                {t.rich("bio1", { b: boldSpan })}
              </p>
              <p>
                {t.rich("bio2", { b: boldSpan })}
              </p>
            </motion.div>

            {/* Divider */}
            <motion.div
              variants={itemVariants}
              aria-hidden="true"
              className="h-px"
              style={{ background: "rgba(255,255,255,0.06)" }}
            />

            {/* Highlight cards */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 gap-3 sm:grid-cols-2"
            >
              {highlights.map((item) => (
                <HighlightCard key={item.title} {...item} />
              ))}
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
