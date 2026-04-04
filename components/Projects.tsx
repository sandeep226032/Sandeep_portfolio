"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import TiltSpotlightCard from "@/components/ui/TiltSpotlightCard";

/* ── Data ─────────────────────────────────────────────────────────────────
   Replace githubUrl / demoUrl below with your real links.
   ────────────────────────────────────────────────────────────────────── */
const projects = [
  {
    num: "01",
    featured: true,
    name: "StudHive",
    tagline: "Social Interface for College Updates",
    desc: "A full-stack social platform for college communities to share updates, announcements, and resources. Built across the MERN stack with a focus on auth, access control, and discoverability.",
    features: [
      "JWT-based authentication with secure session management",
      "Role-based access control separating student and admin views",
      "Search and filtering for discovering relevant college updates",
      "Fully responsive UI optimised for mobile and desktop",
    ] as string[],
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT Auth", "REST API"],
    githubUrl: "https://github.com/sandeep226032/StudHiveFrontend", // ← replace
    demoUrl:   null as string | null, // ← replace or null
  },
  {
    num: "02",
    featured: false,
    name: "Bus Manzil",
    tagline: "College Exhibition Project · 2024",
    desc: "A transportation-focused web application addressing campus mobility, exhibited at the College Project Exhibition (2024) alongside StudHive.",
    features: [] as string[],
    stack: ["Web Development"],
    githubUrl: "https://github.com/sandeep226032/BusManzil", // ← replace
    demoUrl: null as string | null,
  },
];

/* ── Shared link row ────────────────────────────────────────────────────── */
function Links({ github, demo, name }: { github: string; demo: string | null; name: string }) {
  const base = { color: "var(--text-muted)", borderColor: "var(--border)" };
  const on  = (e: React.MouseEvent<HTMLAnchorElement>) => { const el = e.currentTarget; el.style.color = "var(--gold)"; el.style.borderColor = "var(--gold-mid)"; };
  const off = (e: React.MouseEvent<HTMLAnchorElement>) => { const el = e.currentTarget; el.style.color = base.color; el.style.borderColor = base.borderColor; };
  return (
    <div className="flex gap-3">
      <a href={github} target="_blank" rel="noopener noreferrer"
        className="font-mono text-[0.68rem] tracking-[0.06em] uppercase no-underline border px-[0.85rem] py-[0.4rem] rounded-[2px] inline-flex items-center gap-2 transition-all duration-200"
        style={base} onMouseEnter={on} onMouseLeave={off} aria-label={`GitHub for ${name}`}>
        <Github size={12} aria-hidden="true" /> GitHub
      </a>
      {demo && (
        <a href={demo} target="_blank" rel="noopener noreferrer"
          className="font-mono text-[0.68rem] tracking-[0.06em] uppercase no-underline border px-[0.85rem] py-[0.4rem] rounded-[2px] inline-flex items-center gap-2 transition-all duration-200"
          style={base} onMouseEnter={on} onMouseLeave={off} aria-label={`Live demo for ${name}`}>
          <ExternalLink size={12} aria-hidden="true" /> Live Demo
        </a>
      )}
    </div>
  );
}

/* ── Featured card (full-width, 2-column) ─────────────────────────────── */
function FeaturedCard({ project }: { project: typeof projects[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <TiltSpotlightCard
        className="p-8 grid gap-10 md:grid-cols-[1fr_auto] items-start transition-colors duration-300"
      >
        <div>
          <p className="font-mono text-[0.65rem] tracking-[0.1em] uppercase mb-2" style={{ color: "var(--text-dim)" }}>
            {project.num} / Featured
          </p>
          <h3 className="font-head font-bold text-[1.4rem] tracking-tight mb-1" style={{ color: "var(--text)" }}>{project.name}</h3>
          <p className="font-mono text-[0.7rem] tracking-[0.06em] uppercase mb-4" style={{ color: "var(--gold)" }}>{project.tagline}</p>
          <p className="text-[0.9rem] leading-[1.75] mb-4" style={{ color: "var(--text-muted)" }}>{project.desc}</p>
          {project.features.length > 0 && (
            <ul className="flex flex-col gap-2 mb-5" aria-label="Key features">
              {project.features.map((f) => (
                <li key={f} className="text-[0.825rem] pl-4 relative list-none" style={{ color: "var(--text-muted)" }}>
                  <span className="absolute left-0 text-[0.7rem]" style={{ color: "var(--gold)" }} aria-hidden="true">▸</span>
                  {f}
                </li>
              ))}
            </ul>
          )}
          <div className="flex flex-wrap gap-2 pt-4 border-t mb-5" style={{ borderColor: "var(--border)" }}>
            {project.stack.map((s) => (
              <span key={s} className="font-mono text-[0.62rem] tracking-[0.06em] uppercase px-[0.65rem] py-[0.22rem] rounded-[2px] border bg-[var(--surface-dim)]"
                style={{ color: "var(--sage)", borderColor: "rgba(90,143,123,0.2)" }}>{s}</span>
            ))}
          </div>
          <Links github={project.githubUrl} demo={project.demoUrl} name={project.name} />
        </div>

        {/* Code panel */}
        <aside className="rounded-[4px] border p-5 font-mono text-[0.72rem] leading-[1.9] self-start min-w-[200px]"
          style={{ background: "var(--bg)", borderColor: "var(--border)", color: "var(--text-dim)" }}
          aria-label="Stack detail">
          <p className="font-mono text-[0.65rem] tracking-[0.1em] uppercase mb-3" style={{ color: "var(--gold)" }}>stack.json</p>
          {[["frontend","React.js"],["backend","Node + Express"],["database","MongoDB"],["auth","JWT"],["access","RBAC"],["type","Full Stack"]].map(([k,v]) => (
            <div key={k}>
              <span style={{ color: "var(--sage)" }}>&quot;{k}&quot;</span>:{" "}
              <span style={{ color: "var(--text-muted)" }}>&quot;{v}&quot;</span>,
            </div>
          ))}
        </aside>
      </TiltSpotlightCard>
    </motion.div>
  );
}

/* ── Standard card ────────────────────────────────────────────────────── */
function StandardCard({ project, delay }: { project: typeof projects[0]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <TiltSpotlightCard className="flex flex-col p-8 transition-colors duration-300 h-full">
        <p className="font-mono text-[0.65rem] tracking-[0.1em] uppercase mb-2" style={{ color: "var(--text-dim)" }}>{project.num}</p>
        <h3 className="font-head font-bold text-[1.2rem] tracking-tight mb-1" style={{ color: "var(--text)" }}>{project.name}</h3>
        <p className="font-mono text-[0.7rem] tracking-[0.06em] uppercase mb-4" style={{ color: "var(--gold)" }}>{project.tagline}</p>
        <p className="text-[0.9rem] leading-[1.75] mb-5 flex-1" style={{ color: "var(--text-muted)" }}>{project.desc}</p>
        <div className="flex flex-wrap gap-2 pt-4 border-t mb-5" style={{ borderColor: "var(--border)" }}>
          {project.stack.map((s) => (
            <span key={s} className="font-mono text-[0.62rem] tracking-[0.06em] uppercase px-[0.65rem] py-[0.22rem] rounded-[2px] border bg-[var(--surface-dim)]"
              style={{ color: "var(--sage)", borderColor: "rgba(90,143,123,0.2)" }}>{s}</span>
          ))}
        </div>
        <Links github={project.githubUrl} demo={project.demoUrl} name={project.name} />
      </TiltSpotlightCard>
    </motion.div>
  );
}

/* ── Section ────────────────────────────────────────────────────────────── */
export default function Projects() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section id="projects" className="max-w-[1100px] mx-auto px-10 py-24" aria-labelledby="projects-heading">
      <div ref={headerRef}>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          className="font-mono text-[0.7rem] tracking-[0.14em] uppercase mb-3 flex items-center gap-3" style={{ color: "var(--gold)" }}>
          <span className="w-6 h-[1px] inline-block flex-shrink-0" style={{ background: "var(--gold)" }} aria-hidden="true" />
          Projects
        </motion.p>
        <motion.h2 id="projects-heading"
          initial={{ opacity: 0, y: 16 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}
          className="font-head font-extrabold tracking-tight leading-[1.05] mb-4"
          style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--text)" }}>
          Built from scratch.<br />
          <span style={{ color: "var(--text-muted)" }}>End to end.</span>
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[1rem] leading-[1.75] max-w-[520px] mb-14" style={{ color: "var(--text-muted)" }}>
          Personal and academic projects demonstrating full-stack engineering capability.
        </motion.p>
      </div>

      <div className="flex flex-col gap-6">
        {projects.map((project, i) =>
          project.featured
            ? <FeaturedCard key={project.name} project={project} />
            : <StandardCard key={project.name} project={project} delay={i * 0.1} />
        )}
      </div>
    </section>
  );
}
