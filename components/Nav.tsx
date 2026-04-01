"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import Link from "next/link";
import { useActiveSection } from "@/hooks/useActiveSection";

const SECTION_IDS = ["about", "experience", "projects", "skills", "education", "contact"];

const navLinks = [
  { href: "#about",      label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects",   label: "Projects" },
  { href: "#skills",     label: "Skills" },
  { href: "#education",  label: "Education" },
  { href: "#contact",    label: "Contact" },
];

export default function Nav() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const activeSection = useActiveSection(SECTION_IDS);

  /* ── scroll shadow ── */
  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  /* ── close drawer on resize to desktop ── */
  useEffect(() => {
    const handle = () => { if (window.innerWidth > 900) setMobileOpen(false); };
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);

  /* ── lock body scroll when drawer is open ── */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {/* ── Desktop / top bar ── */}
      <header
        role="banner"
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-300"
        style={{
          padding: "1.1rem 2.5rem",
          background: "rgba(8,8,8,0.88)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: `1px solid ${scrolled ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.06)"}`,
        }}
      >
        {/* Logo */}
        <Link
          href="#hero"
          className="font-head font-extrabold text-[1.05rem] tracking-tight no-underline select-none"
          style={{ color: "var(--text)" }}
          aria-label="Sandeep Nandi — back to top"
        >
          SN<span style={{ color: "var(--gold)" }}>.</span>
        </Link>

        {/* Desktop nav links */}
        <nav aria-label="Main navigation">
          <ul className="hidden md:flex items-center gap-7 list-none m-0 p-0" role="menubar">
            {navLinks.map(({ href, label }) => {
              const id = href.replace("#", "");
              const isActive = activeSection === id;
              return (
                <li key={href} role="none" className="relative flex flex-col items-center gap-[5px]">
                  <Link
                    href={href}
                    role="menuitem"
                    className="font-mono text-[0.72rem] tracking-[0.06em] uppercase no-underline transition-colors duration-200"
                    style={{ color: isActive ? "var(--text)" : "var(--text-muted)" }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--text)")}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.color = isActive ? "var(--text)" : "var(--text-muted)")}
                  >
                    {label}
                  </Link>
                  {/* Active dot indicator */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.span
                        layoutId="nav-dot"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ duration: 0.25 }}
                        className="absolute -bottom-[9px] w-[3px] h-[3px] rounded-full"
                        style={{ background: "var(--gold)" }}
                        aria-hidden="true"
                      />
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Desktop right actions */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="/resume.pdf"
            download
            className="font-mono text-[0.7rem] tracking-[0.06em] uppercase no-underline inline-flex items-center gap-2 transition-colors duration-200"
            style={{ color: "var(--text-muted)" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}
            aria-label="Download resume PDF"
          >
            <Download size={12} aria-hidden="true" />
            Resume
          </a>

          <Link
            href="#contact"
            className="font-mono text-[0.72rem] tracking-[0.06em] uppercase no-underline px-4 py-[0.45rem] rounded-[2px] border transition-all duration-200"
            style={{ color: "var(--gold)", borderColor: "var(--gold-mid)", background: "transparent" }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "var(--gold)";
              el.style.color = "var(--bg)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "transparent";
              el.style.color = "var(--gold)";
            }}
          >
            Hire Me
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden p-2 rounded-[2px] transition-colors duration-200"
          style={{ color: "var(--text-muted)" }}
          onClick={() => setMobileOpen((p) => !p)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          <AnimatePresence mode="wait" initial={false}>
            {mobileOpen ? (
              <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <X size={20} />
              </motion.span>
            ) : (
              <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <Menu size={20} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </header>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 md:hidden"
              style={{ background: "rgba(8,8,8,0.6)", backdropFilter: "blur(4px)" }}
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer panel */}
            <motion.div
              id="mobile-menu"
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 md:hidden flex flex-col"
              style={{
                background: "var(--surface)",
                borderLeft: "1px solid var(--border)",
              }}
              role="dialog"
              aria-label="Mobile navigation menu"
              aria-modal="true"
            >
              {/* Drawer header */}
              <div
                className="flex items-center justify-between px-6 py-5 border-b"
                style={{ borderColor: "var(--border)" }}
              >
                <span className="font-head font-extrabold text-[1.05rem]" style={{ color: "var(--text)" }}>
                  SN<span style={{ color: "var(--gold)" }}>.</span>
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1.5 rounded-[2px] transition-colors duration-200"
                  style={{ color: "var(--text-muted)" }}
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Drawer links */}
              <nav className="flex-1 overflow-y-auto px-6 py-8">
                <ul className="flex flex-col gap-1 list-none">
                  {navLinks.map(({ href, label }, i) => {
                    const id = href.replace("#", "");
                    const isActive = activeSection === id;
                    return (
                      <motion.li
                        key={href}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05, duration: 0.25 }}
                      >
                        <Link
                          href={href}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-3 py-3 font-mono text-[0.8rem] tracking-[0.06em] uppercase no-underline transition-colors duration-200"
                          style={{ color: isActive ? "var(--gold)" : "var(--text-muted)" }}
                        >
                          <span
                            className="w-[3px] h-[3px] rounded-full flex-shrink-0 transition-all duration-200"
                            style={{
                              background: isActive ? "var(--gold)" : "var(--text-dim)",
                              transform: isActive ? "scale(1.5)" : "scale(1)",
                            }}
                            aria-hidden="true"
                          />
                          {label}
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              {/* Drawer footer */}
              <div
                className="px-6 py-6 border-t flex flex-col gap-3"
                style={{ borderColor: "var(--border)" }}
              >
                <Link
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="w-full font-mono text-[0.75rem] tracking-[0.08em] uppercase no-underline text-center py-3 rounded-[2px] transition-all duration-200"
                  style={{ background: "var(--gold)", color: "var(--bg)" }}
                >
                  Hire Me
                </Link>
                <a
                  href="/resume.pdf"
                  download
                  className="w-full font-mono text-[0.75rem] tracking-[0.08em] uppercase no-underline text-center py-3 rounded-[2px] border inline-flex items-center justify-center gap-2 transition-all duration-200"
                  style={{ color: "var(--text-muted)", borderColor: "var(--border-hover)" }}
                  aria-label="Download resume"
                >
                  <Download size={12} aria-hidden="true" />
                  Resume
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
