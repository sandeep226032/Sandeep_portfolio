// ─── Projects.tsx ──────────────────────────────────────────────────────────
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

const projects = [
  {
    num: "01",
    featured: true,
    name: "StudHive",
    tagline: "Social Interface for College Updates",
    desc: "A full-stack social platform for college communities to share updates, announcements, and resources. Built across the complete MERN stack with a focus on authentication, access control, and discoverability.",
    features: [
      "JWT-based authentication with secure session management",
      "Role-based access control separating student and admin views",
      "Search and filtering for discovering relevant college updates",
      "Fully responsive UI optimized for mobile and desktop",
    ],
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT Auth", "REST API"],
    githubUrl: "#", // ← Replace with actual GitHub URL
    demoUrl: "#",   // ← Replace with actual live demo URL
  },
  {
    num: "02",
    featured: false,
    name: "Bus Manzil",
    tagline: "College Exhibition Project · 2024",
    desc: "Exhibited at the College Project Exhibition (2024). A transportation-focused application addressing campus mobility, presented alongside StudHive.",
    features: [],
    stack: ["Web Development"],
    githubUrl: "#",
    demoUrl: null,
  },
];

export default function Projects() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section id="projects" className="max-w-[1100px] mx-auto px-10 py-24" aria-labelledby="projects-heading">
      <div ref={headerRef}>
        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={headerInView ? { opacity: 1, y: 0 } : {}}
          className="font-mono text-[0.7rem] tracking-[0.14em] uppercase mb-3 flex items-center gap-3"
          style={{ color: "var(--gold)" }}
        >
          <span className="w-6 h-[1px] inline-block" style={{ background: "var(--gold)" }} />
          Projects
        </motion.p>
        <motion.h2
          id="projects-heading"
          initial={{ opacity: 0, y: 16 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
          className="font-head font-extrabold tracking-tight leading-[1.05] mb-4"
          style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--text)" }}
        >
          Built from scratch.<br />
          <span style={{ color: "var(--text-muted)" }}>End to end.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}
          className="text-[1rem] leading-[1.75] max-w-[520px] mb-14"
          style={{ color: "var(--text-muted)" }}
        >
          Personal and academic projects demonstrating full-stack engineering capability.
        </motion.p>
      </div>

      <div className="flex flex-col gap-6">
        {projects.map((p, i) => {
          const ref = useRef(null);
          const inView = useInView(ref, { once: true, margin: "-80px" });
          return (
            <motion.article
              key={p.name}
              ref={ref}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`relative rounded-[4px] border p-8 overflow-hidden card-glow transition-all duration-300 ${p.featured ? "grid gap-10 md:grid-cols-[1fr_auto]" : ""}`}
              style={{ background: "var(--surface)", borderColor: "var(--border)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--gold-mid)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              <div>
                <p className="font-mono text-[0.65rem] tracking-[0.1em] uppercase mb-2" style={{ color: "var(--text-dim)" }}>
                  {p.num}{p.featured ? " / Featured" : ""}
                </p>
                <h3 className="font-head font-bold text-[1.4rem] tracking-tight mb-1" style={{ color: "var(--text)" }}>{p.name}</h3>
                <p className="font-mono text-[0.7rem] tracking-[0.06em] uppercase mb-4" style={{ color: "var(--gold)" }}>{p.tagline}</p>
                <p className="text-[0.9rem] leading-[1.75] mb-4" style={{ color: "var(--text-muted)" }}>{p.desc}</p>
                {p.features.length > 0 && (
                  <ul className="flex flex-col gap-2 mb-5" aria-label="Key features">
                    {p.features.map((f) => (
                      <li key={f} className="text-[0.825rem] pl-4 relative list-none" style={{ color: "var(--text-muted)" }}>
                        <span className="absolute left-0 text-[0.7rem]" style={{ color: "var(--gold)" }} aria-hidden="true">▸</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="flex flex-wrap gap-2 pt-4 border-t mb-5" style={{ borderColor: "var(--border)" }}>
                  {p.stack.map((s) => (
                    <span key={s} className="font-mono text-[0.62rem] tracking-[0.06em] uppercase px-[0.65rem] py-[0.22rem] rounded-[2px] border"
                      style={{ color: "var(--sage)", background: "var(--sage-dim)", borderColor: "rgba(90,143,123,0.2)" }}>
                      {s}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <a href={p.githubUrl} target="_blank" rel="noopener noreferrer"
                    className="font-mono text-[0.68rem] tracking-[0.06em] uppercase no-underline border px-[0.85rem] py-[0.4rem] rounded-[2px] inline-flex items-center gap-2 transition-all duration-200"
                    style={{ color: "var(--text-muted)", borderColor: "var(--border)" }}
                    onMouseEnter={(e) => { const el = e.currentTarget; el.style.color="var(--gold)"; el.style.borderColor="var(--gold-mid)"; }}
                    onMouseLeave={(e) => { const el = e.currentTarget; el.style.color="var(--text-muted)"; el.style.borderColor="var(--border)"; }}
                    aria-label={`GitHub for ${p.name}`}>
                    <Github size={12} aria-hidden="true" /> GitHub
                  </a>
                  {p.demoUrl && (
                    <a href={p.demoUrl} target="_blank" rel="noopener noreferrer"
                      className="font-mono text-[0.68rem] tracking-[0.06em] uppercase no-underline border px-[0.85rem] py-[0.4rem] rounded-[2px] inline-flex items-center gap-2 transition-all duration-200"
                      style={{ color: "var(--text-muted)", borderColor: "var(--border)" }}
                      onMouseEnter={(e) => { const el = e.currentTarget; el.style.color="var(--gold)"; el.style.borderColor="var(--gold-mid)"; }}
                      onMouseLeave={(e) => { const el = e.currentTarget; el.style.color="var(--text-muted)"; el.style.borderColor="var(--border)"; }}
                      aria-label={`Live demo for ${p.name}`}>
                      <ExternalLink size={12} aria-hidden="true" /> Live Demo
                    </a>
                  )}
                </div>
              </div>
              {p.featured && (
                <div className="rounded-[4px] border p-5 font-mono text-[0.72rem] leading-[1.9] self-start min-w-[200px]"
                  style={{ background: "var(--bg)", borderColor: "var(--border)", color: "var(--text-dim)" }}
                  aria-label="Tech stack detail">
                  <p className="uppercase text-[0.65rem] tracking-[0.1em] mb-3" style={{ color: "var(--gold)" }}>stack.json</p>
                  {[["frontend","React.js"],["backend","Node + Express"],["database","MongoDB"],["auth","JWT"],["access","RBAC"],["type","Full Stack"]].map(([k,v])=>(
                    <div key={k}><span style={{ color: "var(--sage)" }}>"{k}"</span>: <span style={{ color: "var(--text-muted)" }}>"{v}"</span>,</div>
                  ))}
                </div>
              )}
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
