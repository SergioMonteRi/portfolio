"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Mail, Phone, Github, Linkedin, Send } from "lucide-react";
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
  "w-full rounded-xl border bg-white/[0.04] px-4 py-3 text-sm text-[#f5f5f5] placeholder-zinc-600 outline-none transition-all duration-200 " +
  "border-white/[0.08] hover:border-white/[0.14] hover:bg-white/[0.06] " +
  "focus:border-indigo-500/60 focus:bg-white/[0.06] focus:ring-2 focus:ring-indigo-500/20";

// ─── Animation variants ───────────────────────────────────────────────────────

const CONTAINER_VARIANTS = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function ContactInfoItem({ item }: { item: ContactInfo }) {
  const Icon = item.icon;
  const Tag = item.href ? "a" : "div";

  return (
    <Tag
      href={item.href}
      {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      aria-label={`${item.label}: ${item.value}`}
      className="group flex items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-all duration-200 hover:border-white/10 hover:bg-white/[0.05]"
    >
      <div className="flex-shrink-0 rounded-lg bg-indigo-600/20 p-2.5 transition-colors duration-200 group-hover:bg-indigo-600/30">
        <Icon size={16} className="text-indigo-400" aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wider text-zinc-600">
          {item.label}
        </p>
        <p className="truncate text-sm font-medium text-zinc-300 transition-colors duration-200 group-hover:text-white">
          {item.value}
        </p>
      </div>
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
      className="flex flex-col gap-4"
    >
      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-name" className="text-xs font-medium uppercase tracking-wider text-zinc-500">
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
        <label htmlFor="contact-email" className="text-xs font-medium uppercase tracking-wider text-zinc-500">
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
        <label htmlFor="contact-message" className="text-xs font-medium uppercase tracking-wider text-zinc-500">
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
        className="group mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 text-sm font-semibold text-white shadow-[0_0_32px_rgba(99,102,241,0.25)] transition-all duration-300 hover:bg-indigo-500 hover:shadow-[0_0_48px_rgba(99,102,241,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080808] disabled:opacity-50"
      >
        {submitted ? (
          <>
            <span>{t("submittedButton")}</span>
            <span aria-hidden="true">✓</span>
          </>
        ) : (
          <>
            <span>{t("submitButton")}</span>
            <Send
              size={15}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </>
        )}
      </button>

      <p className="text-center text-xs text-zinc-600">
        {t("footerNote")}
      </p>
    </form>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

/**
 * Contact section of the portfolio.
 *
 * Renders a two-column layout with contact info links on the left and a
 * contact form on the right. Form submission opens the system email client
 * pre-filled with the typed content (no backend required).
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
        {/* Subtle background accent */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-1/2 h-[500px] w-[700px] -translate-x-1/2 translate-y-1/2 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(99,102,241,0.07), transparent 70%)",
          }}
        />

        <div className="relative mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">

            {/* ── Left: info ─────────────────────────────────────────────── */}
            <motion.div
              className="flex flex-col gap-8"
              variants={containerVariants}
              initial={initial}
              whileInView="visible"
              viewport={{ once: true }}
            >
              {/* Header */}
              <div className="flex flex-col gap-4">
                <motion.span
                  variants={itemVariants}
                  className="text-sm font-medium uppercase tracking-widest text-indigo-400"
                >
                  {t("sectionLabel")}
                </motion.span>

                <motion.h2
                  variants={itemVariants}
                  className="text-3xl font-bold leading-tight text-[#f5f5f5] sm:text-4xl lg:text-5xl"
                >
                  {t("heading")}{" "}
                  <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                    {t("headingHighlight")}
                  </span>
                </motion.h2>

                <motion.p
                  variants={itemVariants}
                  className="text-base leading-relaxed text-zinc-400"
                >
                  {t("description")}
                </motion.p>
              </div>

              {/* Divider */}
              <motion.div
                variants={itemVariants}
                aria-hidden="true"
                className="h-px"
                style={{ background: "rgba(255,255,255,0.06)" }}
              />

              {/* Contact info list */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col gap-3"
              >
                {contactInfo.map((item) => (
                  <ContactInfoItem key={item.id} item={item} />
                ))}
              </motion.div>
            </motion.div>

            {/* ── Right: form ────────────────────────────────────────────── */}
            <motion.div
              initial={
                shouldReduceMotion ? false : { opacity: 0, x: 32 }
              }
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              className="rounded-2xl border p-6 sm:p-8"
              style={{
                borderColor: "rgba(255,255,255,0.06)",
                background: "rgba(255,255,255,0.02)",
              }}
            >
              <div className="mb-6 flex flex-col gap-1">
                <h3 className="text-lg font-semibold text-[#f5f5f5]">
                  {t("formTitle")}
                </h3>
                <p className="text-sm text-zinc-500">
                  {t("formSubtitle")}
                </p>
              </div>

              <ContactForm />
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer
        className="px-6 pb-10 pt-0"
        aria-label={tf("ariaLabel")}
      >
        <div
          className="mx-auto max-w-6xl border-t pt-8"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-zinc-600">
              © {new Date().getFullYear()} Sergio Monteiro Ribeiro
            </p>
            <p className="text-xs text-zinc-700">
              {tf("madeWith")}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
