"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

// ─── Animation variants ───────────────────────────────────────────────────────

const CONTAINER_VARIANTS = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const },
  },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Profile photo placeholder — geometric, no gradients. */
function ProfilePhoto({ placeholder }: { placeholder: string }) {
  return (
    <div
      className="relative mx-auto flex h-64 w-64 flex-col items-center justify-center lg:h-80 lg:w-80"
      style={{ border: "1px solid rgba(255,255,255,0.08)" }}
    >
      {/* Amber corner accent */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 h-8 w-8 border-l-2 border-t-2"
        style={{ borderColor: "#e8651a" }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2"
        style={{ borderColor: "#e8651a" }}
      />

      {/* Initials */}
      <span className="select-none text-7xl font-extrabold text-[#f5f5f5] lg:text-8xl">
        SM
      </span>

      {/* Placeholder label */}
      <span className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-zinc-600">
        {placeholder}
      </span>
    </div>
  );
}

/** Highlight stat item — clean row with amber marker. */
function StatRow({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div
      className="flex flex-col gap-0.5 border-l-2 py-1 pl-4"
      style={{ borderColor: "#e8651a" }}
    >
      <span className="font-mono text-xs uppercase tracking-[0.15em] text-zinc-600">
        {label}
      </span>
      <span className="text-sm font-semibold text-[#f5f5f5]">{value}</span>
      <span className="font-mono text-xs text-zinc-500">{sub}</span>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

/**
 * About section of the portfolio.
 *
 * Displays a geometric profile photo placeholder, professional bio, and
 * a grid of highlight stats. Design: sharp corners, amber accents, no gradients.
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
    <span className="font-semibold text-[#f5f5f5]">{chunks}</span>
  );

  return (
    <section
      id="about"
      aria-label={t("ariaLabel")}
      className="relative px-6 py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-[2fr_3fr] lg:gap-24">

          {/* ── Photo ─────────────────────────────────────────────────────── */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
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
            className="flex flex-col gap-8"
          >
            {/* Section label */}
            <motion.div variants={itemVariants} className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-[0.22em] text-zinc-600">
                — {t("sectionLabel")}
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              variants={itemVariants}
              className="text-4xl font-bold leading-tight text-[#f5f5f5] sm:text-5xl lg:text-6xl"
            >
              {t("heading")}{" "}
              <span style={{ color: "#e8651a" }}>{t("headingHighlight")}</span>
            </motion.h2>

            {/* Bio */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-4 text-base leading-relaxed text-zinc-400"
            >
              <p>{t.rich("bio1", { b: boldSpan })}</p>
              <p>{t.rich("bio2", { b: boldSpan })}</p>
            </motion.div>

            {/* Divider */}
            <motion.div
              variants={itemVariants}
              aria-hidden="true"
              className="h-px"
              style={{ background: "rgba(255,255,255,0.08)" }}
            />

            {/* Highlight stats grid */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 gap-5 sm:grid-cols-2"
            >
              <StatRow
                label={t("highlights.newgo.subtitle")}
                value="NewGo Software House"
                sub={t("highlights.newgo.detail")}
              />
              <StatRow
                label="PUCRS"
                value={t("highlights.uxdesign.title")}
                sub={t("highlights.uxdesign.detail")}
              />
              <StatRow
                label="UMC"
                value={t("highlights.ads.title")}
                sub={t("highlights.ads.detail")}
              />
              <StatRow
                label={t("highlights.english.subtitle")}
                value={t("highlights.english.title")}
                sub={t("highlights.english.detail")}
              />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
