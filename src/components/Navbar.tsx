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
 * PT | EN locale switcher.
 * Active locale is white; inactive is muted with hover state.
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
      className="flex items-center gap-1 font-mono text-xs uppercase tracking-widest"
      aria-label="Language switcher"
    >
      <button
        onClick={() => switchLocale("pt")}
        aria-current={locale === "pt" ? "true" : undefined}
        aria-label="Mudar para Português"
        className={`px-1 py-0.5 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#e8651a] ${
          locale === "pt" ? "text-[#f5f5f5]" : "text-zinc-600 hover:text-zinc-400"
        }`}
      >
        PT
      </button>
      <span className="select-none text-zinc-700" aria-hidden="true">/</span>
      <button
        onClick={() => switchLocale("en")}
        aria-current={locale === "en" ? "true" : undefined}
        aria-label="Switch to English"
        className={`px-1 py-0.5 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#e8651a] ${
          locale === "en" ? "text-[#f5f5f5]" : "text-zinc-600 hover:text-zinc-400"
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
 * - Transparent background that adds a bottom border after scrolling 24px.
 * - Active section tracking via IntersectionObserver.
 * - A sliding amber underline indicator (Framer Motion layoutId).
 * - Mobile full-screen overlay menu, closeable via button or Escape key.
 * - Body scroll lock while mobile menu is open.
 * - PT | EN locale switcher.
 * - All motion is disabled when `prefers-reduced-motion` is active.
 */
export function Navbar() {
  const t = useTranslations("navbar");
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // ── Frosted border on scroll ───────────────────────────────────────────────
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
            ? "border-b border-white/[0.08] bg-[#080808]/90 backdrop-blur-sm"
            : "bg-transparent"
        }`}
      >
        <nav
          aria-label={t("ariaLabel")}
          className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6"
        >
          {/* Logo — plain, no gradient */}
          <a
            href="#hero"
            aria-label={t("logoAriaLabel")}
            className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-[#f5f5f5] transition-opacity hover:opacity-60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#e8651a]"
          >
            SM
          </a>

          {/* ── Desktop links + locale switcher ────────────────────────────── */}
          <div className="hidden items-center gap-6 lg:flex">
            <ul className="flex items-center gap-1" role="list">
              {NAV_KEYS.map((link) => {
                const sectionId = link.href.slice(1);
                const isActive = activeSection === sectionId;

                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      aria-current={isActive ? "page" : undefined}
                      className={`relative px-3 py-2 font-mono text-xs uppercase tracking-[0.15em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#e8651a] ${
                        isActive
                          ? "text-[#f5f5f5]"
                          : "text-zinc-600 hover:text-zinc-300"
                      }`}
                    >
                      {t(link.key)}

                      {isActive && (
                        <motion.span
                          layoutId="nav-indicator"
                          aria-hidden="true"
                          className="absolute inset-x-3 -bottom-px h-[1.5px]"
                          style={{ background: "#e8651a" }}
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
            className="flex h-10 w-10 items-center justify-center text-zinc-500 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#e8651a] lg:hidden"
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
                  <X size={18} aria-hidden="true" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={shouldReduceMotion ? false : { rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu size={18} aria-hidden="true" />
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
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[#080808]/98 lg:hidden"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Amber top accent line */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-[2px]"
              style={{ background: "#e8651a" }}
            />

            <nav aria-label={t("mobileNavAriaLabel")}>
              <ul className="flex flex-col items-center gap-2" role="list">
                {NAV_KEYS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.3 }}
                  >
                    <a
                      href={link.href}
                      onClick={closeMobile}
                      className="block px-12 py-3 font-mono text-xl uppercase tracking-[0.15em] text-zinc-500 transition-colors duration-150 hover:text-[#f5f5f5] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#e8651a]"
                    >
                      {t(link.key)}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: NAV_KEYS.length * 0.06 + 0.1, duration: 0.3 }}
              className="mt-10"
            >
              <LocaleSwitcher />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
