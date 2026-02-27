"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useTranslations } from "next-intl";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  period: string;
  /** Short context line — company type and/or client. */
  context: string;
  description: string;
  highlights: string[];
  notableProjects?: string[];
  current?: boolean;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function HighlightTag({ label }: { label: string }) {
  return (
    <span
      className="rounded-full px-3 py-1 text-xs font-medium text-zinc-400"
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {label}
    </span>
  );
}

function TimelineDot({ current, shouldReduceMotion }: { current: boolean; shouldReduceMotion: boolean | null }) {
  return (
    <div className="relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#080808]"
      style={{ border: "2px solid rgba(99,102,241,0.5)" }}
    >
      <div className="h-2.5 w-2.5 rounded-full bg-indigo-400" />

      {/* Pulse ring for current position */}
      {current && !shouldReduceMotion && (
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 rounded-full"
          style={{ border: "1.5px solid rgba(99,102,241,0.5)" }}
          animate={{ scale: [1, 1.9, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </div>
  );
}

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
    <div className="relative flex gap-6 sm:gap-8">

      {/* ── Dot + connector column ──────────────────────────────────────── */}
      <div className="flex flex-col items-center">
        <TimelineDot current={!!entry.current} shouldReduceMotion={shouldReduceMotion} />

        {!isLast && (
          <div
            className="mt-3 flex-1 w-px"
            style={{
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0.08), transparent)",
            }}
          />
        )}
      </div>

      {/* ── Content card ────────────────────────────────────────────────── */}
      <motion.div
        className="flex flex-col gap-4 pb-14"
        initial={shouldReduceMotion ? false : { opacity: 0, x: 28 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Period + current badge */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-zinc-500">{entry.period}</span>

          {entry.current && (
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold text-emerald-400"
              style={{
                background: "rgba(52,211,153,0.1)",
                border: "1px solid rgba(52,211,153,0.2)",
              }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
              {currentBadge}
            </span>
          )}
        </div>

        {/* Company + role */}
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-bold text-[#f5f5f5] sm:text-2xl">
            {entry.company}
          </h3>
          <p className="text-base font-medium text-indigo-400">{entry.role}</p>

          <p className="flex items-center gap-1.5 text-sm text-zinc-500">
            <MapPin size={13} aria-hidden="true" />
            {entry.context}
          </p>
        </div>

        {/* Card */}
        <div
          className="flex flex-col gap-5 rounded-xl border p-5 sm:p-6"
          style={{
            borderColor: "rgba(255,255,255,0.06)",
            background: "rgba(255,255,255,0.02)",
          }}
        >
          {/* Description */}
          <p className="text-sm leading-relaxed text-zinc-400 sm:text-base">
            {entry.description}
          </p>

          {/* Notable projects */}
          {entry.notableProjects && entry.notableProjects.length > 0 && (
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="text-xs font-medium uppercase tracking-wider text-zinc-600">
                {projectsLabel}
              </span>
              {entry.notableProjects.map((project) => (
                <span key={project} className="text-xs text-zinc-500">
                  {project}
                </span>
              ))}
            </div>
          )}

          {/* Divider */}
          <div
            aria-hidden="true"
            className="h-px"
            style={{ background: "rgba(255,255,255,0.05)" }}
          />

          {/* Tech highlights */}
          <div className="flex flex-wrap gap-2">
            {entry.highlights.map((tech) => (
              <HighlightTag key={tech} label={tech} />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

/**
 * Professional experience section of the portfolio.
 *
 * Renders a vertical timeline with one entry per role.
 * The timeline line animates in via `scaleY` on scroll entry.
 * Each entry slides in from the right with `whileInView`.
 * The current position displays a pulsing ring around its timeline dot.
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
      {/* Subtle background accent — left side */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-1/2 h-[600px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.07), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-4xl">

        {/* ── Section header ─────────────────────────────────────────────── */}
        <motion.div
          className="mb-16 flex flex-col gap-4"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="text-sm font-medium uppercase tracking-widest text-indigo-400">
            {t("sectionLabel")}
          </span>

          <h2 className="text-3xl font-bold text-[#f5f5f5] sm:text-4xl lg:text-5xl">
            {t("heading")}{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              {t("headingHighlight")}
            </span>
          </h2>

          <p className="max-w-xl text-base leading-relaxed text-zinc-400">
            {t("description")}
          </p>
        </motion.div>

        {/* ── Timeline ───────────────────────────────────────────────────── */}
        <div className="relative">
          {/* Animated vertical line */}
          <motion.div
            aria-hidden="true"
            className="absolute left-3.5 top-4 h-[calc(100%-3.5rem)] w-px origin-top"
            style={{
              background:
                "linear-gradient(to bottom, rgba(99,102,241,0.5) 0%, rgba(99,102,241,0.15) 60%, transparent 100%)",
            }}
            initial={shouldReduceMotion ? false : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />

          {/* Entries */}
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
