"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const infoRows = [
  { k: "Role",        v: "Backend Developer Intern",                  href: null,  gold: false },
  { k: "Company",     v: "MatchBest Group",                           href: null,  gold: false },
  { k: "Education",   v: "B.Tech CS — Maharshi Dayanand University",  href: null,  gold: false },
  { k: "Location",    v: "India",                                     href: null,  gold: false },
  { k: "Email",       v: "sandeep226032@saitm.org", href: "mailto:sandeep226032@saitm.org", gold: false },
  { k: "Phone",       v: "+91 9728911658",           href: "tel:+919728911658",              gold: false },
  { k: "Availability",v: "● Open to opportunities", href: null,                             gold: true  },
];

const coreTags = ["Node.js", "REST APIs", "MongoDB", "MySQL", "PostgreSQL", "Express.js", "React.js"];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      ref={ref}
      className="max-w-[1100px] mx-auto px-10 py-24"
      aria-labelledby="about-heading"
    >
      {/* Label */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="font-mono text-[0.7rem] tracking-[0.14em] uppercase mb-3 flex items-center gap-3"
        style={{ color: "var(--gold)" }}
      >
        <span
          className="w-6 h-[1px] inline-block flex-shrink-0"
          style={{ background: "var(--gold)" }}
          aria-hidden="true"
        />
        About
      </motion.p>

      {/* Heading */}
      <motion.h2
        id="about-heading"
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="font-head font-extrabold tracking-tight leading-[1.05] mb-10"
        style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--text)" }}
      >
        Backend developer.
        <br />
        <span style={{ color: "var(--text-muted)" }}>Real systems. Real impact.</span>
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-16 items-start">
        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[1rem] leading-[1.85] mb-5" style={{ color: "var(--text-muted)" }}>
            I&apos;m a{" "}
            <strong style={{ color: "var(--text)", fontWeight: 500 }}>
              Backend Developer Intern at MatchBest Group
            </strong>
            , where I work on production-grade applications serving real users. My work spans
            logistics platform migrations, CRM system integrations, and admin panel architecture.
          </p>
          <p className="text-[1rem] leading-[1.85] mb-5" style={{ color: "var(--text-muted)" }}>
            I focus on{" "}
            <strong style={{ color: "var(--text)", fontWeight: 500 }}>
              building things that work
            </strong>{" "}
            — reliable REST APIs, clean database schemas, and integrations with third-party
            platforms like Shiprocket, Delhivery, Meta, and Apollo.
          </p>
          <p className="text-[1rem] leading-[1.85] mb-8" style={{ color: "var(--text-muted)" }}>
            Currently pursuing a{" "}
            <strong style={{ color: "var(--text)", fontWeight: 500 }}>
              B.Tech in Computer Science
            </strong>{" "}
            at Maharshi Dayanand University (2022–2026), I bring a blend of academic grounding
            and real-world engineering practice to every project.
          </p>

          <div
            className="flex flex-wrap gap-2"
            role="list"
            aria-label="Core technologies"
          >
            {coreTags.map((tag) => (
              <span
                key={tag}
                role="listitem"
                className="font-mono text-[0.68rem] tracking-[0.06em] uppercase px-[0.85rem] py-[0.35rem] rounded-[2px] border"
                style={{
                  color: "var(--gold)",
                  background: "var(--gold-dim)",
                  borderColor: "var(--gold-mid)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Info card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[4px] border p-8 flex flex-col gap-5"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
          role="complementary"
          aria-label="Personal information"
        >
          {infoRows.map(({ k, v, href, gold }, i, arr) => (
            <div
              key={k}
              className={`flex flex-col gap-1 ${i < arr.length - 1 ? "pb-4 border-b" : ""}`}
              style={{ borderColor: "var(--border)" }}
            >
              <span
                className="font-mono text-[0.65rem] tracking-[0.1em] uppercase"
                style={{ color: "var(--text-dim)" }}
              >
                {k}
              </span>
              {href ? (
                <a
                  href={href}
                  className="text-[0.95rem] no-underline transition-colors duration-200"
                  style={{ color: "var(--text-muted)" }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "var(--text)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")
                  }
                >
                  {v}
                </a>
              ) : (
                <span
                  className="text-[0.95rem]"
                  style={{ color: gold ? "var(--gold)" : "var(--text-muted)" }}
                >
                  {v}
                </span>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
