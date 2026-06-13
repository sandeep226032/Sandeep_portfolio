"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const degrees = [
  {
    degree: "B.Tech — Computer Science",
    school: "Maharshi Dayanand University",
    year: "2022 — 2026",
    grade: "In Progress",
  },
  {
    degree: "Intermediate — Science Stream",
    school: "Govt. Model Sanskriti School",
    year: "Completed",
    grade: "86% Score",
  },
];

const credentials = [
  {
    icon: "🏆",
    name: "Web Development Certification",
    issuer: "Coding Blocks",
  },
  {
    icon: "⚙️",
    name: "50 Hours Vocational Training — Core Java, OOP & Data Structures",
    issuer: "Kretivan Technologies",
  },
  {
    icon: "🎓",
    name: "College Project Exhibition — Bus Manzil & StudHive",
    issuer: "College Exhibition · 2024 & 2025",
  },
];

export default function Education() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="education"
      ref={ref}
      className="px-5 py-20 sm:px-6 md:px-10 lg:py-24"
      aria-labelledby="edu-heading"
    >
      <div className="mx-auto max-w-[960px]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="border-b py-6"
          style={{ borderColor: "var(--border)" }}
        >
          <h2
            id="edu-heading"
            className="font-head text-[2rem] font-extrabold leading-tight tracking-tight sm:text-[2.5rem]"
            style={{ color: "var(--text)" }}
          >
            Education.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 py-12">
        {degrees.map((edu, i) => (
          <motion.div
            key={edu.degree}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[4px] border p-7 transition-colors duration-200"
            style={{ background: "var(--surface)", borderColor: "var(--border)" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.borderColor = "var(--border-hover)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.borderColor = "var(--border)")
            }
          >
            <p
              className="font-head font-bold text-[1rem] tracking-tight mb-1"
              style={{ color: "var(--text)" }}
            >
              {edu.degree}
            </p>
            <p
              className="text-[0.875rem] mb-4"
              style={{ color: "var(--text-muted)" }}
            >
              {edu.school}
            </p>
            <div className="flex gap-4 flex-wrap">
              <span
                className="font-mono text-[0.65rem] tracking-[0.08em] uppercase"
                style={{ color: "var(--text-dim)" }}
              >
                {edu.year}
              </span>
              <span
                className="font-mono text-[0.65rem] tracking-[0.08em] uppercase"
                style={{ color: "var(--gold)" }}
              >
                {edu.grade}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Certifications & Achievements */}
      <div
        className="flex flex-col gap-4"
        role="list"
        aria-label="Certifications and achievements"
      >
        {credentials.map((cert, i) => (
          <motion.div
            key={cert.name}
            role="listitem"
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.4 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[4px] border px-6 py-5 flex items-center gap-5 transition-colors duration-200"
            style={{ background: "var(--surface)", borderColor: "var(--border)" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.borderColor = "var(--border-hover)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.borderColor = "var(--border)")
            }
          >
            <div
              className="w-9 h-9 rounded-[4px] border flex items-center justify-center text-[0.9rem] flex-shrink-0"
              style={{
                background: "var(--gold-dim)",
                borderColor: "var(--gold-mid)",
              }}
              aria-hidden="true"
            >
              {cert.icon}
            </div>
            <div>
              <p
                className="text-[0.9rem] font-medium mb-[3px]"
                style={{ color: "var(--text)" }}
              >
                {cert.name}
              </p>
              <p
                className="font-mono text-[0.65rem] tracking-[0.06em] uppercase"
                style={{ color: "var(--text-dim)" }}
              >
                {cert.issuer}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
    </section>
  );
}
