"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Smartphone, Globe, Monitor } from "lucide-react";
import { useTranslations } from "next-intl";
import type { ElementType } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ProjectLink {
  label: string;
  url: string;
  icon: ElementType;
}

interface Project {
  id: string;
  index: string;
  name: string;
  client?: string;
  description: string;
  stack: string[];
  links: ProjectLink[];
}

// ─── Animation variants ───────────────────────────────────────────────────────

const CONTAINER_VARIANTS = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const ROW_VARIANTS = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const },
  },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function ProjectRow({ project }: { project: Project }) {
  return (
    <article
      aria-label={project.name}
      className="group border-t py-10 transition-colors duration-300"
      style={{ borderColor: "rgba(255,255,255,0.08)" }}
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:gap-10">

        {/* Index number */}
        <div className="flex-shrink-0">
          <span
            className="font-mono text-5xl font-bold leading-none sm:text-6xl"
            aria-hidden="true"
            style={{ color: "rgba(255,255,255,0.06)" }}
          >
            {project.index}
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-5">
          {/* Name + client row */}
          <div className="flex flex-wrap items-baseline gap-3">
            <h3 className="text-2xl font-bold text-[#f5f5f5] transition-colors duration-200 group-hover:text-[#e8651a] sm:text-3xl">
              {project.name}
            </h3>
            {project.client && (
              <span className="font-mono text-xs uppercase tracking-[0.15em] text-zinc-600">
                {project.client}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
            {project.description}
          </p>

          {/* Stack — comma-separated, not pills */}
          <p className="font-mono text-xs text-zinc-600">
            {project.stack.join(" · ")}
          </p>

          {/* Links */}
          <div className="flex flex-wrap items-center gap-4">
            {project.links.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${link.label} — ${project.name}`}
                  className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.15em] text-zinc-500 transition-all duration-200 hover:text-[#e8651a] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#e8651a]"
                >
                  <Icon size={11} aria-hidden="true" />
                  {link.label} →
                </a>
              );
            })}
          </div>
        </div>

      </div>
    </article>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

/**
 * Projects section of the portfolio.
 *
 * Renders featured projects as numbered editorial rows — no card grids,
 * no gradient previews. Stack displayed as dot-separated text.
 * Links styled as monospace text anchors with amber hover state.
 * All animations are disabled when `prefers-reduced-motion` is active.
 */
export function ProjectsSection() {
  const t = useTranslations("projects");
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = shouldReduceMotion ? {} : CONTAINER_VARIANTS;
  const rowVariants = shouldReduceMotion ? {} : ROW_VARIANTS;
  const initial = shouldReduceMotion ? false : ("hidden" as const);

  const projects: Project[] = [
    {
      id: "inspirar",
      index: "01",
      name: "Inspirar",
      client: "USP",
      description: t("items.inspirar.description"),
      stack: [
        "React Native",
        "Expo",
        "Geolocation",
        "Health Connect",
        "Recharts",
        "AWS",
        "LogRocket",
      ],
      links: [
        {
          label: "App Store",
          url: "https://apps.apple.com/br/app/inspirar/id6753951017",
          icon: Smartphone,
        },
        {
          label: "Google Play",
          url: "https://play.google.com/store/apps/details?id=br.app.inspirar.mobile",
          icon: Smartphone,
        },
        {
          label: "Web",
          url: "https://www.inspirar.app.br/",
          icon: Globe,
        },
      ],
    },
    {
      id: "petro-capital",
      index: "02",
      name: "Petro Capital",
      client: "Petro Capital",
      description: t("items.petroCapital.description"),
      stack: ["React Native", "Expo", "React Reanimated", "Push Notifications"],
      links: [
        {
          label: "App Store",
          url: "https://apps.apple.com/br/app/petro-capital/id6752617547",
          icon: Smartphone,
        },
        {
          label: "Google Play",
          url: "https://play.google.com/store/apps/details?id=com.devfactor.petro.prod",
          icon: Smartphone,
        },
      ],
    },
    {
      id: "smiles",
      index: "03",
      name: "Smiles",
      client: "Gol",
      description: t("items.smiles.description"),
      stack: ["ReactJS", "Redux", "Context API", "Micro frontends", "AWS"],
      links: [
        {
          label: t("items.smiles.linkVisit"),
          url: "https://www.smiles.com.br/home",
          icon: Monitor,
        },
      ],
    },
  ];

  return (
    <section
      id="projects"
      aria-label={t("ariaLabel")}
      className="relative px-6 py-32"
    >
      <div className="mx-auto max-w-7xl">

        {/* ── Section header ─────────────────────────────────────────────── */}
        <motion.div
          className="mb-4"
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

          <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-base">
            {t("description")}
          </p>
        </motion.div>

        {/* ── Project rows ───────────────────────────────────────────────── */}
        <motion.div
          variants={containerVariants}
          initial={initial}
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={rowVariants}>
              <ProjectRow project={project} />
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
