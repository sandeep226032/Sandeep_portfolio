"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface SectionHeaderProps {
  label: string;
  title: React.ReactNode;   // allows <span> for the muted part
  subtitle?: string;
  subtitleMaxW?: string;    // e.g. "520px"
  className?: string;
}

/**
 * Reusable animated section header.
 * Renders: label bar → heading → optional subtitle paragraph.
 *
 * Usage:
 *   <SectionHeader
 *     label="Experience"
 *     title={<>Production work.<br /><span style={{color:"var(--text-muted)"}}>Shipped.</span></>}
 *     subtitle="Four live systems at an Enterprise Software Group."
 *   />
 */
export default function SectionHeader({
  label,
  title,
  subtitle,
  subtitleMaxW = "520px",
  className = "",
}: SectionHeaderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
  });

  return (
    <div ref={ref} className={className}>
      {/* Label */}
      <motion.p
        {...fade(0)}
        className="font-mono text-[0.7rem] tracking-[0.14em] uppercase mb-3 flex items-center gap-3"
        style={{ color: "var(--gold)" }}
      >
        <span
          className="w-6 h-[1px] inline-block flex-shrink-0"
          style={{ background: "var(--gold)" }}
          aria-hidden="true"
        />
        {label}
      </motion.p>

      {/* Heading */}
      <motion.h2
        {...fade(0.1)}
        className="font-head font-extrabold tracking-tight leading-[1.05] mb-4"
        style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--text)" }}
      >
        {title}
      </motion.h2>

      {/* Optional subtitle */}
      {subtitle && (
        <motion.p
          {...fade(0.2)}
          className="text-[1rem] leading-[1.75]"
          style={{ color: "var(--text-muted)", maxWidth: subtitleMaxW, marginBottom: "3.5rem" }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
