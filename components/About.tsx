"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const infoRows = [
  { k: "Role", v: "Backend & AI Engineer", href: null, gold: false },
  { k: "Company", v: "MatchBest Group", href: null, gold: false },
  { k: "Education", v: "B.Tech CS - Maharshi Dayanand University", href: null, gold: false },
  { k: "Location", v: "India", href: null, gold: false },
  { k: "Email", v: "Sandeep_226032@saitm.org", href: "mailto:Sandeep_226032@saitm.org", gold: false },
  { k: "Phone", v: "+91 9728911658", href: "tel:+919728911658", gold: false },
  { k: "Availability", v: "Open to software engineering roles", href: null, gold: true },
];

const coreTags = [
  "Node.js",
  "FastAPI",
  "REST APIs",
  "LangChain",
  "RAG",
  "LLMs",
  "Vector DBs",
  "Docker",
  "CI/CD",
  "Auth Systems",
  "MongoDB",
  "PostgreSQL",
];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      ref={ref}
      className="px-5 py-20 sm:px-6 md:px-10 lg:py-24"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-[960px]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="border-b py-6 mb-12"
          style={{ borderColor: "var(--border)" }}
        >
          <h2
            id="about-heading"
            className="font-head text-[2rem] font-extrabold leading-tight tracking-tight sm:text-[2.5rem]"
            style={{ color: "var(--text)" }}
          >
            About.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[1rem] leading-[1.85] mb-5" style={{ color: "var(--text-muted)" }}>
            I&apos;m a{" "}
            <strong style={{ color: "var(--text)", fontWeight: 500 }}>
              recent B.Tech graduate and Backend Developer Intern at MatchBest Group
            </strong>
            , where I contributed to production systems across logistics, CRM, HRMS, real estate CMS,
            SaaS workflows, and admin platforms. My work focuses on reliable APIs, authentication
            flows, database design, and integrations used by operational teams.
          </p>
          <p className="text-[1rem] leading-[1.85] mb-5" style={{ color: "var(--text-muted)" }}>
            My portfolio is built around one positioning:{" "}
            <strong style={{ color: "var(--text)", fontWeight: 500 }}>
              backend systems, AI workflows, and production-ready software
            </strong>{" "}
            that solve real problems. I build AI-powered applications using FastAPI, LangChain,
            RAG, LLM APIs, and vector databases, then connect them to clean API and data layers.
          </p>
          <p className="text-[1rem] leading-[1.85] mb-8" style={{ color: "var(--text-muted)" }}>
            Beyond APIs, I work with SMTP and network programming concepts, Docker, CI/CD workflows,
            and secure backend foundations that make systems easier to deploy, maintain, and scale.
          </p>

          <div className="flex flex-wrap gap-2" role="list" aria-label="Core technologies">
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
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-muted)")}
                >
                  {v}
                </a>
              ) : (
                <span className="text-[0.95rem]" style={{ color: gold ? "var(--gold)" : "var(--text-muted)" }}>
                  {v}
                </span>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
    </section>
  );
}
