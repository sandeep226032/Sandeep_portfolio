"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, BadgeCheck, Code2, Github, GraduationCap, Package, Rocket, Trophy } from "lucide-react";

const signals = [
  {
    label: "Backend Internship",
    value: "5 Months",
    detail: "Completed backend internship contributing to live logistics, CRM, CMS, and HRMS systems.",
    icon: BadgeCheck,
    href: "#experience",
    status: "Verified on site",
  },
  {
    label: "Production Modules",
    value: "4+",
    detail: "Worked across APIs, integrations, admin workflows, database design, and realtime events.",
    icon: Rocket,
    href: "#experience",
    status: "Experience proof",
  },
  {
    label: "GitHub",
    value: "Public Repos",
    detail: "Project repositories and source code for full-stack and web application work.",
    icon: Github,
    href: "https://github.com/sandeep226032",
    status: "External profile",
  },
  {
    label: "npm / Package Work",
    value: "Backend Utility",
    detail: "SMTP email verification work demonstrates DNS, MX, sockets, timeouts, and package thinking.",
    icon: Package,
    href: "#projects",
    status: "Project proof",
  },
  {
    label: "AI Engineering",
    value: "RAG Systems",
    detail: "Built AI retrieval workflows using FastAPI, LangChain, vector databases, and LLM APIs.",
    icon: Code2,
    href: "#projects",
    status: "AI proof",
  },
  {
    label: "Project Exhibition",
    value: "2 Projects",
    detail: "Presented StudHive and Bus Manzil as academic product demos during college project exhibition.",
    icon: Trophy,
    href: "#projects",
    status: "Academic proof",
  },
  {
    label: "Education",
    value: "B.Tech CS",
    detail: "Computer Science graduate foundation with production internship and applied project experience.",
    icon: GraduationCap,
    href: "#education",
    status: "ATS signal",
  },
  {
    label: "Certifications",
    value: "Ready to Add",
    detail: "Add cloud, backend, AI, or database certificates here as proof assets become available.",
    icon: Award,
    href: "#contact",
    status: "Next proof asset",
  },
];

export default function TrustSignals() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="proof"
      ref={ref}
      className="px-5 py-20 sm:px-6 md:px-10 lg:py-24"
      aria-labelledby="proof-heading"
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
            id="proof-heading"
            className="font-head text-[2rem] font-extrabold leading-tight tracking-tight sm:text-[2.5rem]"
            style={{ color: "var(--text)" }}
          >
            Proof.
          </h2>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {signals.map((signal, index) => {
          const Icon = signal.icon;
          const external = signal.href.startsWith("http");

          return (
            <motion.a
              key={signal.label}
              href={signal.href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group rounded-[4px] border p-5 no-underline transition-colors duration-200"
              style={{ background: "var(--surface)", borderColor: "var(--border)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--border-hover)";
                e.currentTarget.style.background = "var(--surface2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.background = "var(--surface)";
              }}
            >
              <div className="mb-5 flex items-center justify-between gap-3">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-[3px] border"
                  style={{ color: "var(--api-blue)", background: "rgba(91,167,255,0.08)", borderColor: "rgba(91,167,255,0.25)" }}
                >
                  <Icon size={17} />
                </span>
                <span className="font-mono text-[0.55rem] uppercase tracking-[0.08em]" style={{ color: "var(--text-dim)" }}>
                  {signal.status}
                </span>
              </div>
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.1em] mb-2" style={{ color: "var(--gold)" }}>
                {signal.label}
              </p>
              <h3 className="font-head text-[1.05rem] font-bold tracking-tight mb-3" style={{ color: "var(--text)" }}>
                {signal.value}
              </h3>
              <p className="text-[0.8rem] leading-[1.6]" style={{ color: "var(--text-muted)" }}>
                {signal.detail}
              </p>
            </motion.a>
          );
        })}
      </div>
     </div>
    </section>
  );
}
