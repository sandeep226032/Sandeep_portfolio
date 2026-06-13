"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Bot, Braces, CloudCog, Database, Server, ShieldCheck } from "lucide-react";

const capabilityGroups = [
  {
    title: "Backend Engineering",
    icon: Server,
    summary: "API-first backend development for auth, data, integrations, admin workflows, and product modules.",
    proof: "Used during internship across logistics, CRM, CMS, and HRMS systems.",
    items: ["Node.js", "Express.js", "FastAPI", "REST APIs", "SSE", "WebSockets", "SMTP", "Network Programming"],
  },
  {
    title: "AI Applications",
    icon: Bot,
    summary: "LLM-backed workflows that connect retrieval, APIs, and product interfaces.",
    proof: "Built RAG-style file retrieval flows with FastAPI, LangChain, vector search, and Drive integration.",
    items: ["LangChain", "RAG", "Vector DBs", "OpenAI APIs", "Groq API", "AI Agents", "Prompt Workflows"],
  },
  {
    title: "Databases & Data Modeling",
    icon: Database,
    summary: "Schema design, persistence layers, ER modeling, and database-backed application workflows.",
    proof: "Worked with MongoDB, MySQL, PostgreSQL, and HRMS ER diagram design.",
    items: ["MongoDB", "PostgreSQL", "MySQL", "Mongoose", "Prisma", "ER Diagrams", "Query Design"],
  },
  {
    title: "Frontend Integration",
    icon: Braces,
    summary: "Full-stack UI integration for dashboards, admin panels, social apps, and AI interfaces.",
    proof: "Built React/Next.js interfaces connected to REST APIs and backend workflows.",
    items: ["React.js", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS", "Responsive UI", "Streamlit"],
  },
  {
    title: "Production Foundations",
    icon: CloudCog,
    summary: "Practical tooling for shipping, debugging, version control, API testing, and deployment workflows.",
    proof: "Used across internship and personal projects to move software beyond local-only demos.",
    items: ["Docker", "Git", "GitHub", "CI/CD", "Postman", "Vercel", "S3", "Cloudflare R2"],
  },
  {
    title: "Security & Access Control",
    icon: ShieldCheck,
    summary: "Authentication and authorization patterns for role-aware backend applications.",
    proof: "Implemented JWT auth, RBAC, account recovery, and protected admin/user workflows.",
    items: ["JWT", "RBAC", "Auth Flows", "Password Recovery", "Admin Access", "Protected APIs"],
  },
];

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="skills"
      ref={ref}
      className="px-5 py-20 sm:px-6 md:px-10 lg:py-24"
      aria-labelledby="skills-heading"
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
            id="skills-heading"
            className="font-head text-[2rem] font-extrabold leading-tight tracking-tight sm:text-[2.5rem]"
            style={{ color: "var(--text)" }}
          >
            Technical Skills.
          </h2>
        </motion.div>

        <div className="space-y-12 py-12">
          {capabilityGroups.map((group, i) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 
                className="font-head text-[1rem] font-bold uppercase tracking-[0.15em] mb-6 flex items-center gap-3"
                style={{ color: "var(--text-muted)" }}
              >
                <group.icon size={16} className="shrink-0" />
                {group.title}
              </h3>
              
              <div className="flex flex-wrap gap-4">
                {group.items.map((item) => (
                  <div
                    key={item}
                    className="group relative flex items-center justify-center rounded-[12px] border px-5 py-3 transition-all duration-300 hover:bg-[rgba(255,255,255,0.05)]"
                    style={{ 
                      background: "rgba(255,255,255,0.02)", 
                      borderColor: "var(--border)" 
                    }}
                  >
                    <span 
                      className="font-mono text-[0.82rem] font-bold tracking-tight uppercase" 
                      style={{ color: "var(--text-muted)" }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
