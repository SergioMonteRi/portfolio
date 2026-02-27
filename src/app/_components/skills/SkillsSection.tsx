"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Code2,
  FlaskConical,
  Palette,
  Cloud,
  GitBranch,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import type { ElementType } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SkillCategory {
  id: string;
  label: string;
  icon: ElementType;
  skills: string[];
  /** When true the card spans 2 columns on sm+ grids. */
  wide?: boolean;
}

// ─── Animation variants ───────────────────────────────────────────────────────

const CONTAINER_VARIANTS = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const CARD_VARIANTS = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function SkillPill({ label }: { label: string }) {
  return (
    <span
      className="rounded-full px-3 py-1 text-sm font-medium text-zinc-300 transition-colors duration-200 hover:text-indigo-300"
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {label}
    </span>
  );
}

function SkillCard({ category }: { category: SkillCategory }) {
  const Icon = category.icon;

  return (
    <div
      className="flex h-full flex-col gap-5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 transition-colors duration-300 hover:bg-white/[0.04]"
    >
      {/* Category header */}
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 rounded-lg bg-indigo-600/20 p-2">
          <Icon size={16} className="text-indigo-400" aria-hidden="true" />
        </div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">
          {category.label}
        </h3>
      </div>

      {/* Divider */}
      <div aria-hidden="true" className="h-px" style={{ background: "rgba(255,255,255,0.05)" }} />

      {/* Skill pills */}
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <SkillPill key={skill} label={skill} />
        ))}
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

/**
 * Skills section of the portfolio.
 *
 * Renders all technical competencies grouped by category in an asymmetric grid.
 * The Front-end card spans two columns to reflect its breadth.
 * Cards animate in with a stagger when the section enters the viewport.
 * All animations are disabled when `prefers-reduced-motion` is active.
 */
export function SkillsSection() {
  const t = useTranslations("skills");
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = shouldReduceMotion ? {} : CONTAINER_VARIANTS;
  const cardVariants = shouldReduceMotion ? {} : CARD_VARIANTS;
  const initial = shouldReduceMotion ? false : ("hidden" as const);

  const skillCategories: SkillCategory[] = [
    {
      id: "frontend",
      label: t("categories.frontend"),
      icon: Code2,
      skills: [
        "ReactJS",
        "React Native",
        "TypeScript",
        "JavaScript",
        "Next.js",
        "Expo",
        "Context API",
        "Hooks",
        "Redux",
        "Tailwind CSS",
        "Styled Components",
        "CSS / SCSS",
      ],
      wide: true,
    },
    {
      id: "testing",
      label: t("categories.testing"),
      icon: FlaskConical,
      skills: ["Jest", "React Testing Library", "Cucumber", "Cypress"],
    },
    {
      id: "design",
      label: t("categories.design"),
      icon: Palette,
      skills: ["Figma", "Design Systems", "UX / UI", t("uxDesignSkill")],
    },
    {
      id: "infra",
      label: t("categories.infra"),
      icon: Cloud,
      skills: ["Firebase", "AWS Lambda", "API Gateway", "CloudWatch"],
    },
    {
      id: "others",
      label: t("categories.others"),
      icon: GitBranch,
      skills: ["Git", "GitLab", "GitHub", "CI/CD", "REST APIs", "Micro frontends"],
    },
  ];

  return (
    <section
      id="skills"
      aria-label={t("ariaLabel")}
      className="relative px-6 py-32"
    >
      {/* Subtle background accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] -translate-y-1/4 translate-x-1/4 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.08), transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-6xl">

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

        {/* ── Skills grid ────────────────────────────────────────────────── */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial={initial}
          whileInView="visible"
          viewport={{ once: true }}
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.id}
              variants={cardVariants}
              className={cn(category.wide && "sm:col-span-2")}
            >
              <SkillCard category={category} />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
