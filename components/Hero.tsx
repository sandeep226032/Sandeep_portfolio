"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

const stats = [
  { num: "4+", label: "Production Systems" },
  { num: "20+", label: "REST APIs Built" },
  { num: "5+", label: "Third-party Integrations" },
  { num: "2+", label: "Projects Exhibited" },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center px-6 md:px-10 pt-32 pb-16 relative overflow-hidden"
      aria-label="Hero section"
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg pointer-events-none" aria-hidden="true" />

      {/* Ambient orb */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none animate-drift"
        style={{
          background: "radial-gradient(circle, rgba(232,184,75,0.07) 0%, transparent 70%)",
          top: "-10%",
          right: "-8%",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1100px] mx-auto w-full">
        {/* Label */}
        <motion.p
          {...fadeUp(0.2)}
          className="font-mono text-[0.72rem] tracking-[0.12em] uppercase mb-6 flex items-center gap-3"
          style={{ color: "var(--gold)" }}
        >
          <span
            className="w-4 h-[1px] inline-block"
            style={{ background: "var(--gold)" }}
            aria-hidden="true"
          />
          Available for opportunities
        </motion.p>

        {/* Headline */}
        <motion.h1
          {...fadeUp(0.35)}
          className="font-head font-extrabold leading-[1.15] md:leading-[1.0] tracking-tight mb-6 text-[2.2rem] min-[412px]:text-[2.5rem] sm:text-[4rem] md:text-[5.5rem]"
          style={{
            color: "var(--text)",
          }}
        >
          <span className="block">Backend systems</span>
          <span className="block">
            that <span style={{ color: "var(--gold)" }}>ship</span> to
          </span>
          <span className="block" style={{ color: "var(--text-muted)" }}>
            production.
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          {...fadeUp(0.5)}
          className="text-[1.05rem] max-w-[540px] leading-[1.75] mb-10"
          style={{ color: "var(--text-muted)" }}
        >
          I&apos;m{" "}
          <strong style={{ color: "var(--text)", fontWeight: 600 }}>
            Sandeep Nandi
          </strong>{" "}
          — a backend developer building and maintaining real-world applications.
          Node.js, REST APIs, third-party integrations, and database architecture.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          {...fadeUp(0.65)}
          className="flex flex-col sm:flex-row flex-wrap gap-4 mb-16"
        >
          <Link
            href="#projects"
            className="font-mono text-[0.78rem] tracking-[0.08em] uppercase no-underline inline-flex justify-center items-center gap-2 px-8 py-[0.85rem] rounded-[2px] transition-all duration-200 hover:-translate-y-[1px] hover:opacity-90 w-full sm:w-auto"
            style={{ background: "var(--gold)", color: "var(--bg)" }}
            aria-label="View my projects"
          >
            <ArrowRight size={13} aria-hidden="true" />
            View Projects
          </Link>
          <Link
            href="#contact"
            className="font-mono text-[0.78rem] tracking-[0.08em] uppercase no-underline inline-flex justify-center items-center gap-2 px-8 py-[0.85rem] rounded-[2px] border transition-all duration-200 hover:-translate-y-[1px] w-full sm:w-auto"
            style={{
              color: "var(--text)",
              borderColor: "var(--border-hover)",
              background: "transparent",
            }}
            aria-label="Contact me"
          >
            Contact Me
          </Link>
          {/* Resume download — replace /resume.pdf with your actual resume file */}
          <a
            href="/resume_sandeep.pdf"
            download
            className="font-mono text-[0.78rem] tracking-[0.08em] uppercase no-underline inline-flex justify-center items-center gap-2 px-6 py-[0.85rem] rounded-[2px] border transition-all duration-200 hover:-translate-y-[1px] sm:ml-auto w-full sm:w-auto mt-2 sm:mt-0"
            style={{
              color: "var(--text-muted)",
              borderColor: "var(--border)",
              background: "transparent",
            }}
            aria-label="Download resume"
          >
            <Download size={13} aria-hidden="true" />
            Resume
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          {...fadeUp(0.8)}
          className="flex flex-wrap gap-12"
          role="list"
          aria-label="Key statistics"
        >
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col" role="listitem">
              <span
                className="font-head font-extrabold leading-none tracking-tight"
                style={{ fontSize: "2rem", color: "var(--text)" }}
              >
                {s.num.replace("+", "")}
                <span style={{ color: "var(--gold)" }}>+</span>
              </span>
              <span
                className="font-mono text-[0.65rem] tracking-[0.1em] uppercase mt-1"
                style={{ color: "var(--text-dim)" }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span
          className="font-mono text-[0.6rem] tracking-[0.12em] uppercase"
          style={{ color: "var(--text-dim)" }}
        >
          Scroll
        </span>
        <div
          className="w-[1px] h-12 animate-scroll-pulse"
          style={{
            background: "linear-gradient(to bottom, var(--text-dim), transparent)",
          }}
        />
      </motion.div>
    </section>
  );
}
