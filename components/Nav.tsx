"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 900) setMobileOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-4 transition-colors duration-300"
        style={{
          borderBottom: `1px solid ${scrolled ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.07)"}`,
          background: "rgba(8,8,8,0.85)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
        role="navigation"
        aria-label="Main navigation"
      >
        <Link href="#hero" className="font-head font-extrabold text-[1.05rem] tracking-tight no-underline" style={{ color: "var(--text)" }}>
          SN<span style={{ color: "var(--gold)" }}>.</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-8 list-none" role="menubar">
          {navLinks.map((l) => (
            <li key={l.href} role="none">
              <Link
                href={l.href}
                className="font-mono text-[0.72rem] tracking-[0.06em] uppercase no-underline transition-colors duration-200"
                style={{ color: "var(--text-muted)" }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--text)")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--text-muted)")}
                role="menuitem"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          {/* Resume download — replace href with actual resume link */}
          <a
            href="/resume.pdf"
            download
            className="font-mono text-[0.72rem] tracking-[0.06em] uppercase no-underline transition-colors duration-200"
            style={{ color: "var(--text-muted)" }}
          >
            Resume ↓
          </a>
          <Link
            href="#contact"
            className="font-mono text-[0.72rem] tracking-[0.06em] uppercase no-underline px-4 py-[0.45rem] rounded-[2px] border transition-all duration-200"
            style={{ color: "var(--gold)", borderColor: "var(--gold-mid)" }}
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
          className="md:hidden p-2 transition-colors duration-200"
          style={{ color: "var(--text)" }}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[57px] left-0 right-0 z-40 border-b"
            style={{
              background: "rgba(8,8,8,0.97)",
              backdropFilter: "blur(16px)",
              borderColor: "var(--border)",
            }}
            role="dialog"
            aria-label="Mobile navigation"
          >
            <ul className="list-none flex flex-col p-6 gap-4">
              {navLinks.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={l.href}
                    className="font-mono text-[0.8rem] tracking-[0.06em] uppercase no-underline block py-1"
                    style={{ color: "var(--text-muted)" }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {l.label}
                  </Link>
                </motion.li>
              ))}
              <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
                <Link
                  href="#contact"
                  className="font-mono text-[0.78rem] tracking-[0.06em] uppercase no-underline inline-block mt-2 px-5 py-2 rounded-[2px] border"
                  style={{ color: "var(--gold)", borderColor: "var(--gold-mid)" }}
                  onClick={() => setMobileOpen(false)}
                >
                  Hire Me
                </Link>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
