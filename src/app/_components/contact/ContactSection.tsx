"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Mail, Phone, Github, Linkedin, ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import type { ElementType } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ContactInfo {
  id: string;
  icon: ElementType;
  label: string;
  value: string;
  href: string;
  external: boolean;
}

interface FormFields {
  name: string;
  email: string;
  message: string;
}

// ─── Shared input class ───────────────────────────────────────────────────────

const INPUT_CLASS =
  "w-full border bg-transparent px-4 py-3 text-sm text-[#f5f5f5] placeholder-zinc-700 outline-none transition-all duration-200 " +
  "border-white/[0.08] hover:border-white/[0.16] " +
  "focus:border-[#e8651a] focus:ring-0";

// ─── Animation variants ───────────────────────────────────────────────────────

const CONTAINER_VARIANTS = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
  },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Contact info row — clean typographic link, no card. */
function ContactInfoRow({ item }: { item: ContactInfo }) {
  const Icon = item.icon;
  const Tag = item.href ? "a" : "div";

  return (
    <Tag
      href={item.href}
      {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      aria-label={`${item.label}: ${item.value}`}
      className="group flex items-center justify-between border-t py-5 transition-colors duration-200 hover:border-[#e8651a]/30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#e8651a]"
      style={{ borderColor: "rgba(255,255,255,0.08)" }}
    >
      <div className="flex items-center gap-4">
        <Icon
          size={14}
          className="text-zinc-600 transition-colors duration-200 group-hover:text-[#e8651a]"
          aria-hidden="true"
        />
        <div className="flex flex-col gap-0.5">
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-zinc-600">
            {item.label}
          </span>
          <span className="text-sm font-medium text-zinc-300 transition-colors duration-200 group-hover:text-[#f5f5f5]">
            {item.value}
          </span>
        </div>
      </div>
      <ArrowUpRight
        size={14}
        className="text-zinc-700 transition-all duration-200 group-hover:text-[#e8651a] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        aria-hidden="true"
      />
    </Tag>
  );
}

function ContactForm() {
  const t = useTranslations("contact");
  const [fields, setFields] = useState<FormFields>({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  /**
   * Opens the default email client pre-filled with the form data.
   * Since there is no backend, mailto is the simplest way to
   * bridge the form with a real delivery mechanism.
   */
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(
      t("emailSubject", { name: fields.name })
    );
    const body = encodeURIComponent(
      `${fields.message}\n\n${t("emailReplyLabel")}: ${fields.email}`
    );
    window.open(
      `mailto:sergioribeiropalermo@gmail.com?subject=${subject}&body=${body}`
    );
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label={t("formAriaLabel")}
      className="flex flex-col gap-5"
    >
      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="contact-name"
          className="font-mono text-xs uppercase tracking-[0.15em] text-zinc-600"
        >
          {t("nameLabel")}
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder={t("namePlaceholder")}
          value={fields.name}
          onChange={handleChange}
          className={INPUT_CLASS}
        />
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="contact-email"
          className="font-mono text-xs uppercase tracking-[0.15em] text-zinc-600"
        >
          {t("emailLabel")}
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={t("emailPlaceholder")}
          value={fields.email}
          onChange={handleChange}
          className={INPUT_CLASS}
        />
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="contact-message"
          className="font-mono text-xs uppercase tracking-[0.15em] text-zinc-600"
        >
          {t("messageLabel")}
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          placeholder={t("messagePlaceholder")}
          value={fields.message}
          onChange={handleChange}
          className={`${INPUT_CLASS} resize-none`}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="mt-1 inline-flex h-11 items-center justify-center gap-2 border border-[#e8651a] px-8 text-sm font-semibold text-[#e8651a] transition-all duration-200 hover:bg-[#e8651a] hover:text-[#080808] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8651a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080808]"
      >
        {submitted ? (
          <>
            <span>{t("submittedButton")}</span>
            <span aria-hidden="true">✓</span>
          </>
        ) : (
          <span>{t("submitButton")} →</span>
        )}
      </button>

      <p className="font-mono text-xs text-zinc-700">
        {t("footerNote")}
      </p>
    </form>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

/**
 * Contact section of the portfolio.
 *
 * Two-column layout: contact info links on the left, contact form on the right.
 * Links styled as typographic rows — no card backgrounds.
 * Form uses sharp-cornered inputs with amber focus state.
 * All animations are scroll-triggered and disabled when
 * `prefers-reduced-motion` is active.
 */
export function ContactSection() {
  const t = useTranslations("contact");
  const tf = useTranslations("footer");
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = shouldReduceMotion ? {} : CONTAINER_VARIANTS;
  const itemVariants = shouldReduceMotion ? {} : ITEM_VARIANTS;
  const initial = shouldReduceMotion ? false : ("hidden" as const);

  const contactInfo: ContactInfo[] = [
    {
      id: "email",
      icon: Mail,
      label: "Email",
      value: "sergioribeiropalermo@gmail.com",
      href: "mailto:sergioribeiropalermo@gmail.com",
      external: false,
    },
    {
      id: "phone",
      icon: Phone,
      label: t("phoneLabel"),
      value: t("phoneValue"),
      href: "tel:+5511998971796",
      external: false,
    },
    {
      id: "github",
      icon: Github,
      label: "GitHub",
      value: "github.com/sergiomonteri",
      href: "https://github.com/sergiomonteri",
      external: true,
    },
    {
      id: "linkedin",
      icon: Linkedin,
      label: "LinkedIn",
      value: "in/sergiomonteroribeiro",
      href: "https://www.linkedin.com/in/sergiomonteiroribeiro/",
      external: true,
    },
  ];

  return (
    <>
      <section
        id="contact"
        aria-label={t("ariaLabel")}
        className="relative px-6 py-32"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">

            {/* ── Left: header + info ─────────────────────────────────────── */}
            <motion.div
              className="flex flex-col gap-0"
              variants={containerVariants}
              initial={initial}
              whileInView="visible"
              viewport={{ once: true }}
            >
              {/* Header */}
              <motion.div variants={itemVariants} className="mb-12">
                <span className="font-mono text-xs uppercase tracking-[0.22em] text-zinc-600">
                  — {t("sectionLabel")}
                </span>

                <h2 className="mt-3 text-4xl font-bold leading-tight text-[#f5f5f5] sm:text-5xl lg:text-6xl">
                  {t("heading")}{" "}
                  <span style={{ color: "#e8651a" }}>{t("headingHighlight")}</span>
                </h2>

                <p className="mt-4 text-sm leading-relaxed text-zinc-400 sm:text-base">
                  {t("description")}
                </p>
              </motion.div>

              {/* Contact info list */}
              <motion.div variants={itemVariants}>
                {contactInfo.map((item) => (
                  <ContactInfoRow key={item.id} item={item} />
                ))}
                <div
                  className="border-t"
                  style={{ borderColor: "rgba(255,255,255,0.08)" }}
                />
              </motion.div>
            </motion.div>

            {/* ── Right: form ────────────────────────────────────────────── */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-6"
            >
              <div>
                <h3 className="text-lg font-bold text-[#f5f5f5]">
                  {t("formTitle")}
                </h3>
                <p className="mt-1 text-sm text-zinc-500">
                  {t("formSubtitle")}
                </p>
              </div>

              <ContactForm />
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="px-6 pb-10 pt-0" aria-label={tf("ariaLabel")}>
        <div
          className="mx-auto max-w-7xl border-t pt-8"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="font-mono text-xs text-zinc-700">
              © {new Date().getFullYear()} Sergio Monteiro Ribeiro
            </p>
            <p className="font-mono text-xs text-zinc-800">
              {tf("madeWith")}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
