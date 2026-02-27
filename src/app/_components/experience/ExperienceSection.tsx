"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  period: string;
  context: string;
  description: string;
  highlights: string[];
  notableProjects?: string[];
  current?: boolean;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function TimelineEntry({
  entry,
  isLast,
  currentBadge,
  projectsLabel,
}: {
  entry: ExperienceEntry;
  isLast: boolean;
  currentBadge: string;
  projectsLabel: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative flex gap-8 sm:gap-12">

      {/* ── Timeline column ──────────────────────────────────────────────── */}
      <div className="flex flex-col items-center pt-1">
        {/* Dot */}
        <div
          className="relative z-10 flex h-3 w-3 flex-shrink-0 items-center justify-center"
          style={{
            background: entry.current ? "#e8651a" : "rgba(255,255,255,0.15)",
          }}
        >
          {/* Pulse ring for current position */}
          {entry.current && !shouldReduceMotion && (
            <motion.div
              aria-hidden="true"
              className="absolute inset-0"
              style={{ boxShadow: "0 0 0 0 rgba(232, 101, 26, 0.4)" }}
              animate={{ boxShadow: ["0 0 0 0 rgba(232,101,26,0.4)", "0 0 0 8px rgba(232,101,26,0)", "0 0 0 0 rgba(232,101,26,0)"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
            />
          )}
        </div>

        {!isLast && (
          <div
            className="mt-3 flex-1 w-px"
            style={{ background: "rgba(255,255,255,0.08)" }}
          />
        )}
      </div>

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <motion.div
        className="flex flex-col gap-5 pb-16"
        initial={shouldReduceMotion ? false : { opacity: 0, x: 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Period */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-zinc-600">
            {entry.period}
          </span>

          {entry.current && (
            <span
              className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.1em]"
              style={{ color: "#e8651a" }}
            >
              <span
                className="h-1.5 w-1.5"
                aria-hidden="true"
                style={{ background: "#e8651a" }}
              />
              {currentBadge}
            </span>
          )}
        </div>

        {/* Company + role */}
        <div className="flex flex-col gap-1">
          <h3 className="text-2xl font-bold text-[#f5f5f5] sm:text-3xl">
            {entry.company}
          </h3>
          <p className="text-base font-semibold" style={{ color: "#e8651a" }}>
            {entry.role}
          </p>
          <p className="font-mono text-xs text-zinc-600">{entry.context}</p>
        </div>

        {/* Description */}
        <p className="max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
          {entry.description}
        </p>

        {/* Notable projects */}
        {entry.notableProjects && entry.notableProjects.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-zinc-700">
              {projectsLabel}:
            </span>
            {entry.notableProjects.map((project, i) => (
              <span key={project} className="font-mono text-xs text-zinc-500">
                {project}
                {i < (entry.notableProjects?.length ?? 0) - 1 && ","}
              </span>
            ))}
          </div>
        )}

        {/* Tech highlights — slash-separated */}
        <p className="font-mono text-xs text-zinc-700">
          {entry.highlights.join(" · ")}
        </p>
      </motion.div>

    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

/**
 * Professional experience section of the portfolio.
 *
 * Renders a vertical timeline with one entry per role.
 * Amber dot marks the current position with a pulse animation.
 * All animations are disabled when `prefers-reduced-motion` is active.
 */
export function ExperienceSection() {
  const t = useTranslations("experience");
  const shouldReduceMotion = useReducedMotion();

  const experiences: ExperienceEntry[] = [
    {
      id: "newgo",
      company: "NewGo Software House",
      role: t("entries.newgo.role"),
      period: t("entries.newgo.period"),
      context: t("entries.newgo.context"),
      description: t("entries.newgo.description"),
      highlights: [
        "React Native",
        "ReactJS",
        "Expo",
        "Next.js",
        "TypeScript",
        "AWS",
        "Micro frontends",
      ],
      notableProjects: ["Inspirar (USP)", "Petro Capital", "Smiles (Gol)"],
      current: true,
    },
    {
      id: "cpqi",
      company: "CPQi",
      role: t("entries.cpqi.role"),
      period: t("entries.cpqi.period"),
      context: t("entries.cpqi.context"),
      description: t("entries.cpqi.description"),
      highlights: ["ReactJS", "Node.js", "TypeScript", "REST APIs", "Open Finance"],
      notableProjects: ["Open Finance — BTG Pactual"],
      current: false,
    },
  ];

  return (
    <section
      id="experience"
      aria-label={t("ariaLabel")}
      className="relative px-6 py-32"
    >
      <div className="mx-auto max-w-7xl">

        {/* ── Section header ─────────────────────────────────────────────── */}
        <motion.div
          className="mb-16"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="font-mono text-xs uppercase tracking-[0.22em] text-zinc-600">
            — {t("sectionLabel")}
          </span>

          <h2 className="mt-3 text-4xl font-bold text-[#f5f5f5] sm:text-5xl lg:text-6xl">
            {t("heading")}{" "}
            <span style={{ color: "#e8651a" }}>{t("headingHighlight")}</span>
          </h2>
        </motion.div>

        {/* ── Timeline ───────────────────────────────────────────────────── */}
        <div className="relative max-w-3xl">
          {experiences.map((entry, index) => (
            <TimelineEntry
              key={entry.id}
              entry={entry}
              isLast={index === experiences.length - 1}
              currentBadge={t("currentBadge")}
              projectsLabel={t("projectsLabel")}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
