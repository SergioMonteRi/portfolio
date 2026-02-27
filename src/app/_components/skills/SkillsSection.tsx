"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SkillCategory {
  id: string;
  label: string;
  skills: string[];
}

// ─── Animation variants ───────────────────────────────────────────────────────

const CONTAINER_VARIANTS = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

const ROW_VARIANTS = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
  },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Renders a single skill category as a horizontal table row. */
function SkillRow({ category }: { category: SkillCategory }) {
  return (
    <div
      className="grid grid-cols-1 gap-3 border-t py-6 sm:grid-cols-[200px_1fr] sm:gap-8"
      style={{ borderColor: "rgba(255,255,255,0.08)" }}
    >
      {/* Category label */}
      <div className="flex items-start pt-0.5">
        <span className="font-mono text-xs uppercase tracking-[0.15em] text-zinc-500">
          {category.label}
        </span>
      </div>

      {/* Skills — comma-separated with amber hover on each */}
      <div className="flex flex-wrap gap-x-2 gap-y-1">
        {category.skills.map((skill, i) => (
          <span key={skill} className="text-sm text-zinc-300">
            {skill}
            {i < category.skills.length - 1 && (
              <span className="ml-2 text-zinc-700" aria-hidden="true">
                /
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

/**
 * Skills section of the portfolio.
 *
 * Renders all technical competencies as a two-column table: category label
 * on the left, skills as slash-separated text on the right.
 * No pill cards — clean, editorial, space-efficient.
 * All animations are disabled when `prefers-reduced-motion` is active.
 */
export function SkillsSection() {
  const t = useTranslations("skills");
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = shouldReduceMotion ? {} : CONTAINER_VARIANTS;
  const rowVariants = shouldReduceMotion ? {} : ROW_VARIANTS;
  const initial = shouldReduceMotion ? false : ("hidden" as const);

  const skillCategories: SkillCategory[] = [
    {
      id: "frontend",
      label: t("categories.frontend"),
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
    },
    {
      id: "testing",
      label: t("categories.testing"),
      skills: ["Jest", "React Testing Library", "Cucumber", "Cypress"],
    },
    {
      id: "design",
      label: t("categories.design"),
      skills: ["Figma", "Design Systems", "UX / UI", t("uxDesignSkill")],
    },
    {
      id: "infra",
      label: t("categories.infra"),
      skills: ["Firebase", "AWS Lambda", "API Gateway", "CloudWatch"],
    },
    {
      id: "others",
      label: t("categories.others"),
      skills: ["Git", "GitLab", "GitHub", "CI/CD", "REST APIs", "Micro frontends"],
    },
  ];

  return (
    <section
      id="skills"
      aria-label={t("ariaLabel")}
      className="relative px-6 py-32"
    >
      <div className="mx-auto max-w-7xl">

        {/* ── Section header ─────────────────────────────────────────────── */}
        <motion.div
          className="mb-10"
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

        {/* ── Skills table ───────────────────────────────────────────────── */}
        <motion.div
          variants={containerVariants}
          initial={initial}
          whileInView="visible"
          viewport={{ once: true }}
        >
          {skillCategories.map((category) => (
            <motion.div key={category.id} variants={rowVariants}>
              <SkillRow category={category} />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom border */}
        <div
          aria-hidden="true"
          className="border-t"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        />

      </div>
    </section>
  );
}
