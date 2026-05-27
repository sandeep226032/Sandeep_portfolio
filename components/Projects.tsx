"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import TiltSpotlightCard from "@/components/ui/TiltSpotlightCard";

const projects = [
  {
    num: "01",
    featured: true,
    name: "StudHive",
    tagline: "Social Interface for College Updates",
    desc: "A full-stack social platform for college communities to share updates, announcements, and resources. Built across the MERN stack with a focus on auth, access control, and discoverability.",
    problem:
      "College updates were scattered across informal channels, making discovery and admin control difficult.",
    role: "Designed and built the full-stack architecture, authentication flow, student/admin access, and update discovery experience.",
    impact:
      "Created a focused campus communication product with secure access control and mobile-friendly workflows.",
    metrics: ["JWT Auth", "RBAC", "Search + Filters"],
    features: [
      "JWT-based authentication with secure session management",
      "Role-based access control separating student and admin views",
      "Search and filtering for discovering relevant college updates",
      "Fully responsive UI optimised for mobile and desktop",
    ],
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT Auth", "REST API"],
    githubUrl: "https://github.com/sandeep226032/StudHiveFrontend",
    demoUrl: null as string | null,
    packageUrl: null as string | null,
  },
  {
    num: "02",
    featured: true,
    name: "DocuAgent AI",
    tagline: "AI File Retrieval Agent · 2026",
    desc: "An AI-powered file retrieval agent for finding relevant Google Drive files and links through contextual RAG responses.",
    problem:
      "Finding the right Drive resource can be slow when users only remember partial file details, file type, or related context.",
    role: "Built the retrieval workflow using Streamlit, FastAPI, LangChain, Groq LLM, Google Drive API, and vector database search.",
    impact:
      "Created an intelligent retrieval layer where users can provide file name and type to receive relevant Drive resources with contextual responses.",
    metrics: ["RAG Search", "Groq LLM", "Vector DB"],
    features: [
      "Built an AI-powered agent for intelligent file and link retrieval",
      "Implemented RAG-based search over Google Drive resources",
      "Used file name and type inputs to retrieve relevant contextual results",
      "Connected Streamlit UI with FastAPI backend and LangChain orchestration",
    ],
    stack: ["Streamlit", "FastAPI", "LangChain", "Groq LLM", "Google Drive API", "Vector DB", "RAG"],
    githubUrl: null as string | null,
    demoUrl: null as string | null,
    packageUrl: null as string | null,
  },
  {
    num: "03",
    featured: false,
    name: "SMTP Email Verifier",
    tagline: "SMTP & Network Programming · 2026",
    desc: "An email verification package built around SMTP programming, DNS/MX validation, and socket-level network communication.",
    problem:
      "Basic email format checks are not enough for real validation because domains, MX records, SMTP timeouts, and blocked ports affect deliverability.",
    role: "Developed the SMTP verification flow, DNS/MX lookup logic, socket-level checks, timeout handling, and npm package publishing workflow.",
    impact:
      "Published a reusable npm package for more reliable email validation while handling real-world SMTP timeout and port-blocking challenges.",
    metrics: ["SMTP", "DNS/MX", "npm Package"],
    features: [
      "Validated email domains through DNS and MX record checks",
      "Used SMTP-level communication for mailbox verification workflows",
      "Handled timeout, network, and port-blocking edge cases",
      "Published the verifier as an npm package",
    ],
    stack: ["Node.js", "SMTP", "DNS", "MX Records", "Sockets", "npm", "Network Programming"],
    githubUrl: null as string | null,
    demoUrl: null as string | null,
    packageUrl: null as string | null,
  },
  {
    num: "04",
    featured: false,
    name: "Bus Manzil",
    tagline: "College Exhibition Project · 2024",
    desc: "A transportation-focused web application addressing campus mobility, exhibited at the College Project Exhibition (2024) alongside StudHive.",
    problem:
      "Students needed clearer access to transport and route-oriented information around campus mobility.",
    role: "Built the web experience and project presentation flow for exhibition review.",
    impact: "Turned a campus mobility idea into a working academic product demo.",
    metrics: ["Exhibited", "Transport UX", "Web App"],
    features: [],
    stack: ["Web Development"],
    githubUrl: "https://github.com/sandeep226032/BusManzil",
    demoUrl: null as string | null,
    packageUrl: null as string | null,
  },
];

type Project = (typeof projects)[number];

function Links({
  github,
  demo,
  packageUrl,
  name,
}: {
  github: string | null;
  demo: string | null;
  packageUrl: string | null;
  name: string;
}) {
  const base = { color: "var(--text-muted)", borderColor: "var(--border)" };
  const on = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    el.style.color = "var(--gold)";
    el.style.borderColor = "var(--gold-mid)";
  };
  const off = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    el.style.color = base.color;
    el.style.borderColor = base.borderColor;
  };

  if (!github && !demo && !packageUrl) return null;

  return (
    <div className="flex flex-wrap gap-3">
      {github && (
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[0.68rem] tracking-[0.06em] uppercase no-underline border px-[0.85rem] py-[0.4rem] rounded-[2px] inline-flex items-center gap-2 transition-all duration-200"
          style={base}
          onMouseEnter={on}
          onMouseLeave={off}
          aria-label={`GitHub for ${name}`}
        >
          <Github size={12} aria-hidden="true" />
          GitHub
        </a>
      )}
      {demo && (
        <a
          href={demo}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[0.68rem] tracking-[0.06em] uppercase no-underline border px-[0.85rem] py-[0.4rem] rounded-[2px] inline-flex items-center gap-2 transition-all duration-200"
          style={base}
          onMouseEnter={on}
          onMouseLeave={off}
          aria-label={`Live demo for ${name}`}
        >
          <ExternalLink size={12} aria-hidden="true" />
          Live Demo
        </a>
      )}
      {packageUrl && (
        <a
          href={packageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[0.68rem] tracking-[0.06em] uppercase no-underline border px-[0.85rem] py-[0.4rem] rounded-[2px] inline-flex items-center gap-2 transition-all duration-200"
          style={base}
          onMouseEnter={on}
          onMouseLeave={off}
          aria-label={`npm package for ${name}`}
        >
          <ExternalLink size={12} aria-hidden="true" />
          npm
        </a>
      )}
    </div>
  );
}

function CaseRows({ project }: { project: Project }) {
  return (
    <div className="grid gap-3 mb-5 md:grid-cols-3">
      {[
        ["Problem", project.problem],
        ["Role", project.role],
        ["Impact", project.impact],
      ].map(([label, value]) => (
        <div
          key={label}
          className="rounded-[4px] border p-4"
          style={{ background: "var(--surface-dim)", borderColor: "var(--border)" }}
        >
          <p
            className="font-mono text-[0.6rem] uppercase tracking-[0.1em] mb-2"
            style={{ color: "var(--gold)" }}
          >
            {label}
          </p>
          <p className="text-[0.8rem] leading-[1.65]" style={{ color: "var(--text-muted)" }}>
            {value}
          </p>
        </div>
      ))}
    </div>
  );
}

function ProjectPreview({ project }: { project: Project }) {
  return (
    <aside
      className="rounded-[4px] border p-5 font-mono text-[0.72rem] leading-[1.9] self-start min-w-[240px]"
      style={{ background: "var(--bg)", borderColor: "var(--border)", color: "var(--text-dim)" }}
      aria-label={`${project.name} implementation preview`}
    >
      <div className="mb-4 flex items-center justify-between">
        <p className="font-mono text-[0.65rem] tracking-[0.1em] uppercase" style={{ color: "var(--gold)" }}>
          case-study.json
        </p>
        <span className="h-2 w-2 rounded-full" style={{ background: "var(--sage)" }} />
      </div>
      {[
        ["project", project.name],
        ["role", "Full Stack"],
        [
          "backend",
          project.stack.includes("FastAPI")
            ? "FastAPI"
            : project.stack.includes("SMTP")
              ? "Node/npm"
              : project.stack.includes("Node.js")
                ? "Node + Express"
                : "Web App",
        ],
        [
          "database",
          project.stack.includes("Vector DB")
            ? "Vector DB"
            : project.stack.includes("MongoDB")
              ? "MongoDB"
              : "Planned",
        ],
        ["focus", project.metrics[0]],
      ].map(([k, v]) => (
        <div key={k}>
          <span style={{ color: "var(--sage)" }}>&quot;{k}&quot;</span>:{" "}
          <span style={{ color: "var(--text-muted)" }}>&quot;{v}&quot;</span>,
        </div>
      ))}
      <div className="mt-5 flex flex-col gap-2">
        {project.metrics.map((metric, i) => (
          <motion.div
            key={metric}
            initial={{ width: "35%" }}
            whileInView={{ width: `${72 + i * 8}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="h-[3px] rounded-full"
            style={{ background: i % 2 === 0 ? "var(--gold)" : "var(--sage)" }}
          />
        ))}
      </div>
    </aside>
  );
}

function FeaturedCard({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <TiltSpotlightCard className="p-8 transition-colors duration-300">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
          <div>
          <p className="font-mono text-[0.65rem] tracking-[0.1em] uppercase mb-2" style={{ color: "var(--text-dim)" }}>
            {project.num} / Featured
          </p>
          <h3 className="font-head font-bold text-[1.4rem] tracking-tight mb-1" style={{ color: "var(--text)" }}>
            {project.name}
          </h3>
          <p className="font-mono text-[0.7rem] tracking-[0.06em] uppercase mb-4" style={{ color: "var(--gold)" }}>
            {project.tagline}
          </p>
          <p className="text-[0.9rem] leading-[1.75] mb-5" style={{ color: "var(--text-muted)" }}>
            {project.desc}
          </p>

          <CaseRows project={project} />

          {project.features.length > 0 && (
            <ul className="flex flex-col gap-2 mb-5" aria-label="Key features">
              {project.features.map((feature) => (
                <li key={feature} className="text-[0.825rem] pl-4 relative list-none" style={{ color: "var(--text-muted)" }}>
                  <span className="absolute left-0 text-[0.7rem]" style={{ color: "var(--gold)" }} aria-hidden="true">
                    ▸
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          )}

          <div className="flex flex-wrap gap-2 pt-4 border-t mb-5" style={{ borderColor: "var(--border)" }}>
            {project.stack.map((item) => (
              <span
                key={item}
                className="font-mono text-[0.62rem] tracking-[0.06em] uppercase px-[0.65rem] py-[0.22rem] rounded-[2px] border bg-[var(--surface-dim)]"
                style={{ color: "var(--sage)", borderColor: "rgba(90,143,123,0.2)" }}
              >
                {item}
              </span>
            ))}
          </div>
          <Links
            github={project.githubUrl}
            demo={project.demoUrl}
            packageUrl={project.packageUrl}
            name={project.name}
          />
          </div>

          <ProjectPreview project={project} />
        </div>
      </TiltSpotlightCard>
    </motion.div>
  );
}

function StandardCard({ project, delay }: { project: Project; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <TiltSpotlightCard className="flex flex-col p-8 transition-colors duration-300 h-full">
        <div className="mb-5 flex items-start justify-between gap-5">
          <div>
            <p className="font-mono text-[0.65rem] tracking-[0.1em] uppercase mb-2" style={{ color: "var(--text-dim)" }}>
              {project.num}
            </p>
            <h3 className="font-head font-bold text-[1.2rem] tracking-tight mb-1" style={{ color: "var(--text)" }}>
              {project.name}
            </h3>
            <p className="font-mono text-[0.7rem] tracking-[0.06em] uppercase" style={{ color: "var(--gold)" }}>
              {project.tagline}
            </p>
          </div>
          <ArrowRight
            size={18}
            className="mt-1 transition-transform duration-300 group-hover:translate-x-1"
            style={{ color: "var(--text-dim)" }}
          />
        </div>

        <p className="text-[0.9rem] leading-[1.75] mb-5" style={{ color: "var(--text-muted)" }}>
          {project.desc}
        </p>
        <CaseRows project={project} />
        <div className="flex flex-wrap gap-2 pt-4 border-t mb-5" style={{ borderColor: "var(--border)" }}>
          {project.stack.map((item) => (
            <span
              key={item}
              className="font-mono text-[0.62rem] tracking-[0.06em] uppercase px-[0.65rem] py-[0.22rem] rounded-[2px] border bg-[var(--surface-dim)]"
              style={{ color: "var(--sage)", borderColor: "rgba(90,143,123,0.2)" }}
            >
              {item}
            </span>
          ))}
        </div>
        <Links
          github={project.githubUrl}
          demo={project.demoUrl}
          packageUrl={project.packageUrl}
          name={project.name}
        />
      </TiltSpotlightCard>
    </motion.div>
  );
}

export default function Projects() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section id="projects" className="max-w-[1100px] mx-auto px-10 py-24" aria-labelledby="projects-heading">
      <div ref={headerRef}>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-mono text-[0.7rem] tracking-[0.14em] uppercase mb-3 flex items-center gap-3"
          style={{ color: "var(--gold)" }}
        >
          <span className="w-6 h-[1px] inline-block flex-shrink-0" style={{ background: "var(--gold)" }} aria-hidden="true" />
          Projects
        </motion.p>
        <motion.h2
          id="projects-heading"
          initial={{ opacity: 0, y: 16 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-head font-extrabold tracking-tight leading-[1.05] mb-4"
          style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--text)" }}
        >
          Built from scratch.
          <br />
          <span style={{ color: "var(--text-muted)" }}>Told like case studies.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[1rem] leading-[1.75] max-w-[560px] mb-14"
          style={{ color: "var(--text-muted)" }}
        >
          Projects framed around the problem, my role, and the engineering impact behind the build.
        </motion.p>
      </div>

      <div className="flex flex-col gap-6">
        {projects.map((project, i) =>
          project.featured ? (
            <FeaturedCard key={project.name} project={project} />
          ) : (
            <StandardCard key={project.name} project={project} delay={i * 0.1} />
          )
        )}
      </div>
    </section>
  );
}
