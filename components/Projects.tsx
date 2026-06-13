"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Github, ImageIcon, Lock, Sparkles } from "lucide-react";

const projects = [
  {
    num: "01",
    featured: true,
    name: "DocuAgent AI",
    image: "/projects/document-ai.png",
    tagline: "File retrieval agent",
    desc: "People waste time searching Drive folders when they only remember partial file names or context.I built an AI retrieval agent using FastAPI, LangChain, RAG, vector search, and Google Drive APIs.It turns vague file queries into relevant Drive file and link recommendations.",
    problem:
      "Users often remember partial file details, file types, or context, but still lose time searching across Drive folders and shared links.",
    role:
      "Built the retrieval workflow, FastAPI backend, LangChain orchestration, Groq LLM integration.",
    architecture:
      "Streamlit UI -> FastAPI service -> LangChain retrieval chain -> vector database -> Google Drive API -> contextual LLM response.",
    challenges:
      "Balancing simple user inputs with useful retrieval context, normalizing Drive results, and keeping the backend flow understandable.",
    result:
      "Created a practical AI assistant that turns vague file queries into contextual Drive resource recommendations.",
    metrics: ["RAG", "FastAPI", "Vector Search"],
    features: [
      "RAG-based search over file metadata and contextual inputs",
      "FastAPI backend connected to a Streamlit interface",
      "Google Drive API integration for file and link retrieval",
      "LLM-powered responses using LangChain orchestration",
    ],
    stack: ["FastAPI", "Streamlit", "LangChain", "Groq LLM", "Google Drive API", "Vector DB", "RAG"],
    githubUrl: "https://github.com/sandeep226032/TailorTalk_assignment_ai_agent.git",
    demoUrl: null as string | null,
    packageUrl: null as string | null,
  },
  {
    num: "02",
    featured: true,
    name: "Automated Cold Outreach",
    image: "/projects/cold-outreach.png",
    tagline: "End-to-end outreach pipeline",
    desc: "Finding the right decision-makers and sending outreach manually was slow, repetitive, and hard to scale. I built a Node.js automation pipeline that discovers companies, finds verified contacts, enriches lead data, and prepares personalized emails with safety checkpoints. It turns cold outreach from a manual workflow into a structured backend system with rate limits, retries, review steps, and CSV reporting.",
    problem:
      "Coordinating manual lead generation across multiple APIs while handling different rate limits and data formats is inefficient and unreliable.",
    role:
      "Architected the pipeline, implemented Bottleneck-based throttling, built a reusable retry utility, and integrated Ocean.io and Prospeo APIs.",
    architecture:
      "Node.js CLI -> Ocean.io -> Prospeo Decision Maker Search -> Data Enrichment -> Bottleneck Queues -> Brevo SMTP -> CSV Reporting.",
    challenges:
      "Managing disparate API credit systems, implementing robust error recovery with backoff, and normalizing inconsistent JSON responses.",
    result:
      "Built a production-grade CLI tool that automates lead discovery to email delivery with safety checkpoints and auditing.",
    metrics: ["Rate Limiting", "API Pipeline", "Node.js"],
    features: [
      "Multi-stage API orchestration (Ocean.io, Prospeo, Brevo)",
      "Advanced rate limiting using Bottleneck queues",
      "Robust retry mechanism with exponential backoff strategy",
      "Safety checkpoints for manual review before email dispatch",
      "Zod-powered configuration and environment validation",
    ],
    stack: ["Node.js", "Ocean.io", "Prospeo", "Brevo", "Bottleneck", "Zod", "CSV"],
    githubUrl: "https://github.com/sandeep226032/Automated-cold-outreach-engine.git",
    demoUrl: null as string | null,
    packageUrl: null as string | null,
  },
  {
    num: "03",
    featured: false,
    name: "SMTP Email Verifier",
    image: "/projects/smtp-verifier.png",
    tagline: "Network programming package",
    desc: "Most email validators only check format, but real deliverability depends on DNS, MX records, SMTP behavior, and network failures.I built a Node.js email verification utility using DNS/MX lookup, SMTP checks, sockets, and timeout handling.It demonstrates production-minded backend validation beyond simple regex checks.",
    problem:
      "Basic email format checks miss real deliverability issues caused by missing MX records, SMTP failures, timeouts, and blocked ports.",
    role:
      "Developed the SMTP verification flow, DNS/MX lookup logic, socket-level checks, timeout handling, and npm publishing workflow.",
    architecture:
      "Node.js package -> syntax/domain validation -> DNS and MX lookup -> SMTP handshake checks -> normalized verification result.",
    challenges:
      "Handling SMTP provider differences, network timeouts, port restrictions, and cases where servers intentionally block verification.",
    result:
      "Published a reusable backend utility that demonstrates practical network programming beyond standard CRUD APIs.",
    metrics: ["SMTP", "DNS/MX", "npm"],
    features: [
      "DNS and MX record validation",
      "SMTP-level mailbox verification workflow",
      "Timeout and blocked-port edge handling",
      "Reusable package-oriented implementation",
    ],
    stack: ["Node.js", "SMTP", "DNS", "MX Records", "Sockets", "npm", "Network Programming"],
    githubUrl: "https://github.com/sandeep226032/smtp-email-verifier.git",
    demoUrl: null as string | null,
    packageUrl: "https://www.npmjs.com/package/sn-smptp-email-verifier",
  },
  {
    num: "04",
    featured: true,
    name: "StudHive",
    image: "/projects/studhive.png",
    tagline: "Campus communication platform",
    desc: "College updates were scattered across WhatsApp groups, notices, and informal channels.I built a full-stack campus communication platform with authentication, RBAC, search, and filtering.It gives students and admins one organized place to publish, manage, and discover updates.",
    problem:
      "College updates were scattered across informal channels, making discovery, moderation, and admin control difficult.",
    role:
      "Designed and built the full-stack architecture, REST APIs, authentication flow, student/admin access, and update discovery experience.",
    architecture:
      "React frontend -> Node.js/Express REST API -> JWT auth and RBAC middleware -> MongoDB persistence -> search and filter workflows.",
    challenges:
      "Designing clear access boundaries between students and admins while keeping the product easy to use on mobile.",
    result:
      "Built a focused campus communication product with secure access control and responsive workflows.",
    metrics: ["JWT Auth", "RBAC", "MERN"],
    features: [
      "JWT-based authentication with secure session management",
      "Role-based access control separating student and admin views",
      "Search and filtering for relevant college updates",
      "Responsive UI optimized for mobile and desktop",
    ],
    stack: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "REST API"],
    githubUrl: "https://github.com/sandeep226032/StudHiveFrontend",
    demoUrl: null as string | null,
    packageUrl: null as string | null,
  },
];

type Project = (typeof projects)[number];

function ScreenshotMiniCard({ project }: { project: Project }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <a
      href={project.githubUrl || project.packageUrl || project.demoUrl || "#projects"}
      target={project.githubUrl || project.packageUrl || project.demoUrl ? "_blank" : undefined}
      rel={project.githubUrl || project.packageUrl || project.demoUrl ? "noopener noreferrer" : undefined}
      className="group block w-[220px] shrink-0 overflow-hidden rounded-[10px] border no-underline sm:w-[260px]"
      style={{ background: "var(--surface)", borderColor: "var(--border)" }}
      aria-label={`Open ${project.name}`}
    >
      <div className="flex items-center justify-between border-b px-3 py-2" style={{ borderColor: "var(--border)" }}>
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full" style={{ background: "#ff5f57" }} />
          <span className="h-2 w-2 rounded-full" style={{ background: "#ffbd2e" }} />
          <span className="h-2 w-2 rounded-full" style={{ background: "#28c840" }} />
        </div>
        <span className="max-w-[130px] truncate font-mono text-[0.56rem] uppercase tracking-[0.08em]" style={{ color: "var(--text-dim)" }}>
          {project.name}
        </span>
      </div>

      <div className="relative aspect-[16/9] overflow-hidden" style={{ background: "var(--bg)" }}>
        {!imageFailed ? (
          <Image
            src={project.image}
            alt={`${project.name} screenshot`}
            fill
            sizes="260px"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 px-4 text-center">
            <span
              className="flex h-10 w-10 items-center justify-center rounded-[8px] border"
              style={{ color: "var(--gold)", background: "var(--gold-dim)", borderColor: "var(--gold-mid)" }}
              aria-hidden="true"
            >
              <ImageIcon size={18} />
            </span>
            <p className="font-head text-[0.95rem] font-extrabold leading-tight" style={{ color: "var(--text)" }}>
              {project.name}
            </p>
          </div>
        )}
      </div>
    </a>
  );
}

function ScreenshotMarquee() {
  const marqueeProjects = [...projects, ...projects];

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative border-b py-6"
      style={{ borderColor: "var(--border)" }}
      aria-label="Animated project screenshots"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16" style={{ background: "linear-gradient(to right, var(--bg), transparent)" }} />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16" style={{ background: "linear-gradient(to left, var(--bg), transparent)" }} />
      <div className="overflow-hidden">
        <div className="project-shot-marquee flex w-max gap-4">
          {marqueeProjects.map((project, index) => (
            <ScreenshotMiniCard key={`${project.name}-${index}`} project={project} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  const linkClass =
    "flex h-[42px] w-[42px] items-center justify-center rounded-[10px] border transition-all duration-300 hover:scale-[1.05] active:scale-[0.95]";

  const style = { 
    borderColor: "var(--border-hover)", 
    background: "var(--surface-dim)",
    color: "var(--text)"
  };

  return (
    <div className="flex gap-2.5">
      {project.githubUrl ? (
        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={linkClass} style={style} title="View Source">
          <Github size={19} strokeWidth={2} aria-hidden="true" />
        </a>
      ) : (
        <div className={linkClass} style={{ ...style, opacity: 0.4 }} title="Private Repository">
          <Lock size={17} strokeWidth={2} aria-hidden="true" />
        </div>
      )}
      {(project.demoUrl || project.packageUrl) && (
        <a 
          href={(project.demoUrl || project.packageUrl) as string} 
          target="_blank" 
          rel="noopener noreferrer" 
          className={linkClass} 
          style={style} 
          title="View Live"
        >
          <ExternalLink size={19} strokeWidth={2} aria-hidden="true" />
        </a>
      )}
    </div>
  );
}

function ProjectItem({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="border-b px-6 py-8 sm:px-8 sm:py-10 last:border-b-0"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2.5 mb-1.5">
            <h3 className="font-head text-[1.3rem] font-extrabold leading-tight tracking-tight sm:text-[1.5rem]" style={{ color: "var(--text)" }}>
              {project.name}
            </h3>
            <Sparkles size={18} className="shrink-0" style={{ color: "var(--gold)" }} aria-hidden="true" />
          </div>
          
          <p className="font-mono text-[0.75rem] uppercase tracking-[0.1em] mb-4" style={{ color: "var(--gold)" }}>
            {project.tagline}
          </p>

          <p className="text-[0.98rem] leading-[1.8] max-w-[700px] mb-6" style={{ color: "var(--text-muted)" }}>
            {project.desc}
          </p>

          <div className="flex flex-wrap gap-2" aria-label={`${project.name} technologies`}>
            {project.stack.map((tag) => (
              <span
                key={tag}
                className="rounded-full border px-3.5 py-1 text-[0.72rem] font-medium transition-all duration-200"
                style={{ 
                  color: "var(--text-muted)", 
                  borderColor: "var(--border)", 
                  background: "rgba(255,255,255,0.03)" 
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="shrink-0 sm:pt-1">
          <ProjectLinks project={project} />
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="projects"
      ref={ref}
      className="px-5 py-20 sm:px-6 md:px-10 lg:py-24"
      aria-labelledby="projects-heading"
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
            id="projects-heading"
            className="font-head text-[2rem] font-extrabold leading-tight tracking-tight sm:text-[2.5rem]"
            style={{ color: "var(--text)" }}
          >
            Projects.
          </h2>
        </motion.div>

        <ScreenshotMarquee />

        <div role="list" aria-label="Projects">
          {projects.map((project, index) => (
            <ProjectItem key={project.name} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
