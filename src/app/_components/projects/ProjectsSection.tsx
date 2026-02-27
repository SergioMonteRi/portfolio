"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink, Smartphone, Globe, Monitor } from "lucide-react";
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
  name: string;
  /** Optional client / company name displayed as a badge. */
  client?: string;
  description: string;
  stack: string[];
  links: ProjectLink[];
  /** CSS gradient string for the card preview area. */
  previewGradient: string;
  /** RGB values used for the hover glow and inner accent shapes. */
  accentRgb: string;
}

// ─── Animation variants ───────────────────────────────────────────────────────

const CONTAINER_VARIANTS = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.05 },
  },
};

const CARD_VARIANTS = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function CardPreview({
  gradient,
  accentRgb,
}: {
  gradient: string;
  accentRgb: string;
}) {
  return (
    <div className="relative h-44 overflow-hidden" style={{ background: gradient }}>
      {/* Dot grid overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Abstract blurred orbs */}
      <div
        aria-hidden="true"
        className="absolute -right-10 -top-10 h-40 w-40 rounded-full blur-2xl"
        style={{ background: `rgba(${accentRgb}, 0.5)` }}
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-8 left-4 h-28 w-28 rounded-full blur-2xl"
        style={{ background: "rgba(255,255,255,0.06)" }}
      />

      {/* Decorative rings */}
      <div
        aria-hidden="true"
        className="absolute right-8 bottom-8 h-20 w-20 rounded-full border border-white/20"
      />
      <div
        aria-hidden="true"
        className="absolute right-12 bottom-12 h-10 w-10 rounded-full border border-white/10"
      />
    </div>
  );
}

function StackPill({ label }: { label: string }) {
  return (
    <span
      className="rounded-full px-2.5 py-1 text-xs font-medium text-zinc-500"
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {label}
    </span>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article
      aria-label={`${project.name}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] transition-all duration-300 hover:-translate-y-1.5 hover:border-white/10 hover:shadow-[0_0_48px_rgba(99,102,241,0.12)]"
    >
      <CardPreview gradient={project.previewGradient} accentRgb={project.accentRgb} />

      <div className="flex flex-1 flex-col gap-4 p-6">
        {/* Client badge */}
        {project.client && (
          <div>
            <span className="rounded-full bg-indigo-600/20 px-2.5 py-0.5 text-xs font-semibold text-indigo-400">
              {project.client}
            </span>
          </div>
        )}

        {/* Name */}
        <h3 className="text-xl font-bold text-[#f5f5f5] transition-colors duration-200 group-hover:text-white">
          {project.name}
        </h3>

        {/* Description */}
        <p className="flex-1 text-sm leading-relaxed text-zinc-400">
          {project.description}
        </p>

        {/* Stack pills */}
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <StackPill key={tech} label={tech} />
          ))}
        </div>

        {/* Links */}
        <div
          className="flex flex-wrap items-center gap-1 border-t pt-4"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          {project.links.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${link.label} — ${project.name}`}
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-zinc-500 transition-all duration-200 hover:bg-white/[0.06] hover:text-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080808]"
              >
                <Icon size={12} aria-hidden="true" />
                {link.label}
                <ExternalLink size={10} aria-hidden="true" className="opacity-40" />
              </a>
            );
          })}
        </div>
      </div>
    </article>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

/**
 * Projects section of the portfolio.
 *
 * Renders a grid of featured project cards, each containing a visual preview,
 * description, tech stack pills, and external links (App Store, Google Play, Web).
 * Cards animate in with a stagger when the section enters the viewport.
 * All animations are disabled when `prefers-reduced-motion` is active.
 */
export function ProjectsSection() {
  const t = useTranslations("projects");
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = shouldReduceMotion ? {} : CONTAINER_VARIANTS;
  const cardVariants = shouldReduceMotion ? {} : CARD_VARIANTS;
  const initial = shouldReduceMotion ? false : ("hidden" as const);

  const projects: Project[] = [
    {
      id: "inspirar",
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
      previewGradient:
        "linear-gradient(135deg, rgba(99,102,241,0.9) 0%, rgba(6,182,212,0.7) 100%)",
      accentRgb: "99, 102, 241",
    },
    {
      id: "petro-capital",
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
      previewGradient:
        "linear-gradient(135deg, rgba(139,92,246,0.9) 0%, rgba(79,70,229,0.7) 100%)",
      accentRgb: "139, 92, 246",
    },
    {
      id: "smiles",
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
      previewGradient:
        "linear-gradient(135deg, rgba(99,102,241,0.8) 0%, rgba(217,70,239,0.7) 100%)",
      accentRgb: "99, 102, 241",
    },
  ];

  return (
    <section
      id="projects"
      aria-label={t("ariaLabel")}
      className="relative px-6 py-32"
    >
      <div className="mx-auto max-w-6xl">

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

        {/* ── Cards grid ─────────────────────────────────────────────────── */}
        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial={initial}
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={cardVariants} className="h-full">
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
