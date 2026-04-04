// ─── About.tsx ─────────────────────────────────────────────────────────────
"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="max-w-[1100px] mx-auto px-10 py-24" aria-labelledby="about-heading" ref={ref}>
      <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        className="font-mono text-[0.7rem] tracking-[0.14em] uppercase mb-3 flex items-center gap-3" style={{ color: "var(--gold)" }}>
        <span className="w-6 h-[1px] inline-block" style={{ background: "var(--gold)" }} />
        About
      </motion.p>
      <motion.h2 id="about-heading" initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
        className="font-head font-extrabold tracking-tight leading-[1.05] mb-10"
        style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--text)" }}>
        Backend developer.<br />
        <span style={{ color: "var(--text-muted)" }}>Real systems. Real impact.</span>
      </motion.h2>
      <div className="grid gap-16 md:grid-cols-2 items-start">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}>
          {[
            <>I&apos;m a <strong style={{ color: "var(--text)", fontWeight: 500 }}>Backend Developer Intern at MatchBest Group</strong>, where I work on production-grade applications serving real users. My work spans logistics platform migrations, CRM system integrations, and admin panel architecture.</>,
            <>I focus on <strong style={{ color: "var(--text)", fontWeight: 500 }}>building things that work</strong> — reliable REST APIs, clean database schemas, and integrations with third-party platforms like Shiprocket, Delhivery, Meta, and Apollo.</>,
            <>Currently pursuing a <strong style={{ color: "var(--text)", fontWeight: 500 }}>B.Tech in Computer Science</strong> at Maharshi Dayanand University (2022–2026), I bring a blend of academic grounding and real-world engineering practice.</>,
          ].map((p, i) => (
            <p key={i} className="text-[1rem] leading-[1.85] mb-5" style={{ color: "var(--text-muted)" }}>{p}</p>
          ))}
          <div className="flex flex-wrap gap-2 mt-6" role="list" aria-label="Core technologies">
            {["Node.js", "REST APIs", "MongoDB", "MySQL", "PostgreSQL", "Express.js", "React.js"].map((t) => (
              <span key={t} role="listitem" className="font-mono text-[0.68rem] tracking-[0.06em] uppercase px-[0.85rem] py-[0.35rem] rounded-[2px] border"
                style={{ color: "var(--gold)", background: "var(--gold-dim)", borderColor: "var(--gold-mid)" }}>
                {t}
              </span>
            ))}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 }}
          className="rounded-[4px] border p-8 flex flex-col gap-5" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
          {[
            { k: "Role", v: "Backend Developer Intern" },
            { k: "Company", v: "MatchBest Group" },
            { k: "Education", v: "B.Tech CS — Maharshi Dayanand University" },
            { k: "Location", v: "India" },
            { k: "Email", v: "Sandeep_226032@saitm.org", href: "mailto:Sandeep_226032@saitm.org" },
            { k: "Phone", v: "+91 9728911658", href: "tel:+919728911658" },
            { k: "Availability", v: "● Open to opportunities", gold: true },
          ].map(({ k, v, href, gold }, i, arr) => (
            <div key={k} className={`flex flex-col gap-1 ${i < arr.length - 1 ? "pb-4 border-b" : ""}`} style={{ borderColor: "var(--border)" }}>
              <span className="font-mono text-[0.65rem] tracking-[0.1em] uppercase" style={{ color: "var(--text-dim)" }}>{k}</span>
              {href ? (
                <a href={href} className="text-[0.95rem] no-underline" style={{ color: "var(--text-muted)" }}>{v}</a>
              ) : (
                <span className="text-[0.95rem]" style={{ color: gold ? "var(--gold)" : "var(--text-muted)" }}>{v}</span>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Education.tsx ─────────────────────────────────────────────────────────
export function Education() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="education" className="max-w-[1100px] mx-auto px-10 py-24" aria-labelledby="edu-heading" ref={ref}>
      <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
        className="font-mono text-[0.7rem] tracking-[0.14em] uppercase mb-3 flex items-center gap-3" style={{ color: "var(--gold)" }}>
        <span className="w-6 h-[1px] inline-block" style={{ background: "var(--gold)" }} />
        Education & Credentials
      </motion.p>
      <motion.h2 id="edu-heading" initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
        className="font-head font-extrabold tracking-tight leading-[1.05] mb-4"
        style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--text)" }}>
        Academic background<br /><span style={{ color: "var(--text-muted)" }}>& certifications.</span>
      </motion.h2>
      <motion.p initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}
        className="text-[1rem] leading-[1.75] max-w-[520px] mb-14" style={{ color: "var(--text-muted)" }}>
        Formal education combined with professional training and practical exhibition experience.
      </motion.p>

      <div className="grid md:grid-cols-2 gap-5 mb-8">
        {[
          { degree: "B.Tech — Computer Science", school: "Maharshi Dayanand University", year: "2022 — 2026", grade: "In Progress" },
          { degree: "Intermediate — Science Stream", school: "Govt. Model Sanskriti School", year: "Completed", grade: "86% Score" },
        ].map((e, i) => (
          <motion.div key={e.degree} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.25 + i * 0.1 }}
            className="rounded-[4px] border p-7 transition-colors duration-200" style={{ background: "var(--surface)", borderColor: "var(--border)" }}
            onMouseEnter={(el) => (el.currentTarget as HTMLElement).style.borderColor = "var(--border-hover)"}
            onMouseLeave={(el) => (el.currentTarget as HTMLElement).style.borderColor = "var(--border)"}>
            <p className="font-head font-bold text-[1rem] tracking-tight mb-1" style={{ color: "var(--text)" }}>{e.degree}</p>
            <p className="text-[0.875rem] mb-4" style={{ color: "var(--text-muted)" }}>{e.school}</p>
            <div className="flex gap-4 flex-wrap">
              <span className="font-mono text-[0.65rem] tracking-[0.08em] uppercase" style={{ color: "var(--text-dim)" }}>{e.year}</span>
              <span className="font-mono text-[0.65rem] tracking-[0.08em] uppercase" style={{ color: "var(--gold)" }}>{e.grade}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col gap-4" role="list" aria-label="Certifications and achievements">
        {[
          { icon: "🏆", name: "Web Development Certification", issuer: "Coding Blocks" },
          { icon: "⚙️", name: "50 Hours Vocational Training — Core Java, OOP & Data Structures", issuer: "Kretivan Technologies" },
          { icon: "🎓", name: "College Project Exhibition — Bus Manzil & StudHive", issuer: "College Exhibition · 2024 & 2025" },
        ].map((c, i) => (
          <motion.div key={c.name} role="listitem" initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.4 + i * 0.1 }}
            className="rounded-[4px] border px-6 py-5 flex items-center gap-5 transition-colors duration-200"
            style={{ background: "var(--surface)", borderColor: "var(--border)" }}
            onMouseEnter={(el) => (el.currentTarget as HTMLElement).style.borderColor = "var(--border-hover)"}
            onMouseLeave={(el) => (el.currentTarget as HTMLElement).style.borderColor = "var(--border)"}>
            <div className="w-9 h-9 rounded-[4px] border flex items-center justify-center text-[0.9rem] flex-shrink-0"
              style={{ background: "var(--gold-dim)", borderColor: "var(--gold-mid)" }} aria-hidden="true">{c.icon}</div>
            <div>
              <p className="text-[0.9rem] font-medium mb-1" style={{ color: "var(--text)" }}>{c.name}</p>
              <p className="font-mono text-[0.65rem] tracking-[0.06em] uppercase" style={{ color: "var(--text-dim)" }}>{c.issuer}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── Footer.tsx ────────────────────────────────────────────────────────────
export function Footer() {
  return (
    <footer className="border-t px-10 py-8 flex flex-wrap items-center justify-between gap-4" style={{ borderColor: "var(--border)" }}>
      <span className="font-mono text-[0.65rem] tracking-[0.08em] uppercase" style={{ color: "var(--text-dim)" }}>
        © 2025 Sandeep Nandi — All rights reserved
      </span>
      <span className="font-mono text-[0.65rem] tracking-[0.06em]" style={{ color: "var(--text-dim)" }}>
        Designed & built by <span style={{ color: "var(--gold)" }}>Sandeep Nandi</span>
      </span>
    </footer>
  );
}

export default About;
