"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV_KEYS = [
  { key: "about", href: "#about" },
  { key: "projects", href: "#projects" },
  { key: "skills", href: "#skills" },
  { key: "experience", href: "#experience" },
  { key: "contact", href: "#contact" },
] as const;

// ─── Sub-components ───────────────────────────────────────────────────────────

/**
 * PT | EN pill that switches the active locale.
 * The current locale label is white and bold; the other is a muted button.
 */
function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(next: string) {
    router.replace(pathname, { locale: next });
  }

  return (
    <div
      className="flex items-center gap-1 text-sm font-medium"
      aria-label="Language switcher"
    >
      <button
        onClick={() => switchLocale("pt")}
        aria-current={locale === "pt" ? "true" : undefined}
        aria-label="Mudar para Português"
        className={`rounded px-1 py-0.5 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1 focus-visible:ring-offset-[#080808] ${
          locale === "pt"
            ? "font-semibold text-white"
            : "text-zinc-500 hover:text-zinc-300"
        }`}
      >
        PT
      </button>
      <span className="select-none text-zinc-700" aria-hidden="true">
        |
      </span>
      <button
        onClick={() => switchLocale("en")}
        aria-current={locale === "en" ? "true" : undefined}
        aria-label="Switch to English"
        className={`rounded px-1 py-0.5 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1 focus-visible:ring-offset-[#080808] ${
          locale === "en"
            ? "font-semibold text-white"
            : "text-zinc-500 hover:text-zinc-300"
        }`}
      >
        EN
      </button>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

/**
 * Fixed top navigation bar for the portfolio.
 *
 * Features:
 * - Transparent background that gains a frosted-glass effect after scrolling 24px.
 * - Active section tracking via IntersectionObserver — highlights the link
 *   corresponding to whichever section is currently centred in the viewport.
 * - A sliding underline indicator (Framer Motion `layoutId`) moves between links.
 * - Mobile full-screen overlay menu, closeable via button or Escape key.
 * - Body scroll is locked while the mobile menu is open.
 * - PT | EN locale switcher that navigates to the same path in the other locale.
 * - All motion is disabled when `prefers-reduced-motion` is active.
 */
export function Navbar() {
  const t = useTranslations("navbar");
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // ── Frosted-glass backdrop on scroll ──────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Active section detection ───────────────────────────────────────────────
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -60% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // ── Body scroll lock ───────────────────────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // ── Escape key closes mobile menu ──────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen) setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  function closeMobile() {
    setMobileOpen(false);
  }

  return (
    <>
      {/* ── Header bar ──────────────────────────────────────────────────────── */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-white/[0.06] bg-[#080808]/80 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <nav
          aria-label={t("ariaLabel")}
          className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6"
        >
          {/* Logo */}
          <a
            href="#hero"
            aria-label={t("logoAriaLabel")}
            className="rounded text-lg font-bold transition-opacity hover:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080808]"
          >
            <span
              style={{
                background: "linear-gradient(135deg, #818cf8, #a78bfa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              SM
            </span>
          </a>

          {/* ── Desktop links + locale switcher ────────────────────────────── */}
          <div className="hidden items-center gap-4 lg:flex">
            <ul className="flex items-center gap-1" role="list">
              {NAV_KEYS.map((link) => {
                const sectionId = link.href.slice(1);
                const isActive = activeSection === sectionId;

                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      aria-current={isActive ? "page" : undefined}
                      className={`relative rounded px-3 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080808] ${
                        isActive
                          ? "text-white"
                          : "text-zinc-500 hover:text-zinc-200"
                      }`}
                    >
                      {t(link.key)}

                      {isActive && (
                        <motion.span
                          layoutId="nav-indicator"
                          aria-hidden="true"
                          className="absolute inset-x-3 -bottom-px h-px rounded-full bg-indigo-400"
                          transition={
                            shouldReduceMotion
                              ? { duration: 0 }
                              : { type: "spring", stiffness: 380, damping: 36 }
                          }
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>

            <LocaleSwitcher />
          </div>

          {/* ── Mobile hamburger ───────────────────────────────────────────── */}
          <button
            type="button"
            aria-label={mobileOpen ? t("closeMenu") : t("openMenu")}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 lg:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span
                  key="close"
                  initial={shouldReduceMotion ? false : { rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X size={20} aria-hidden="true" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={shouldReduceMotion ? false : { rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu size={20} aria-hidden="true" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </nav>
      </header>

      {/* ── Mobile full-screen overlay ──────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label={t("mobileDialogAriaLabel")}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[#080808]/95 backdrop-blur-xl lg:hidden"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <nav aria-label={t("mobileNavAriaLabel")}>
              <ul className="flex flex-col items-center gap-1" role="list">
                {NAV_KEYS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.3 }}
                  >
                    <a
                      href={link.href}
                      onClick={closeMobile}
                      className="block rounded px-10 py-3 text-2xl font-semibold text-zinc-400 transition-colors duration-150 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                    >
                      {t(link.key)}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Locale switcher at the bottom of mobile menu */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: NAV_KEYS.length * 0.07, duration: 0.3 }}
              className="mt-8"
            >
              <LocaleSwitcher />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
