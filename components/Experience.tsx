"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Boxes, Database, GitBranch, Radio, Truck } from "lucide-react";

const systems = [
  {
    phase: "01",
    period: "Logistics Migration",
    name: "Logistics Solutions",
    type: "Enterprise Logistics Platform",
    icon: Truck,
    summary:
      "Worked on reliability-focused backend improvements for shipment processing, tracking, and admin operations.",
    impact: "Improved shipment processing reliability by migrating core logistics APIs between major service providers.",
    bullets: [
      "Migrated logistics APIs for enhanced service reliability",
      "Implemented Forgot Password flow for safer account recovery",
      "Resolved admin panel bugs affecting daily operations",
      "Enhanced tracking reliability across the shipment lifecycle",
    ],
    chips: ["Node.js", "REST API", "Logistics APIs", "Admin Panel"],
  },
  {
    phase: "02",
    period: "Dynamic Content Systems",
    name: "Web CMS Engine",
    type: "Real Estate Infrastructure",
    icon: Boxes,
    summary:
      "Built admin-controlled website modules that allowed non-technical teams to manage public-facing content.",
    impact: "Connected frontend modules with backend data models for flexible content updates.",
    bullets: [
      "Built dynamic Showcase, Navbar, and About Us modules",
      "Integrated frontend modules with backend APIs",
      "Enabled admin-controlled content management",
      "Created flexible data models for content updates",
    ],
    chips: ["Node.js", "React.js", "MongoDB", "Admin CMS"],
  },
  {
    phase: "03",
    period: "SaaS CRM Architecture",
    name: "Enterprise CRM",
    type: "SaaS CRM System",
    icon: Radio,
    summary:
      "Contributed to CRM communication workflows, access control, realtime notifications, and integration architecture.",
    impact: "Added integration and realtime foundations for lead management, outreach, and multi-user workflows.",
    bullets: [
      "Developed outbound and inbound communication integrations",
      "Integrated external messaging and lead platforms",
      "Implemented SSE notifications with EventBus architecture",
      "Implemented role-based access control for CRM users",
      "Researched scalable multi-tenant database architecture",
    ],
    chips: ["Communication APIs", "Lead APIs", "PostgreSQL", "SaaS", "SSE", "EventBus", "RBAC"],
  },
  {
    phase: "04",
    period: "Database Design",
    name: "HR Management System",
    type: "Internal HRMS",
    icon: Database,
    summary:
      "Designed data relationships and admin-panel foundations for structured employee management workflows.",
    impact: "Created database groundwork for scalable HR modules and employee data operations.",
    bullets: [
      "Designed ER diagrams for the admin panel module",
      "Structured relationships for core HR workflows",
      "Laid groundwork for scalable employee data management",
    ],
    chips: ["ER Diagrams", "MySQL", "DB Design", "Admin Panel"],
  },
];

type System = (typeof systems)[number];

function TimelineItem({ system, index }: { system: System; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-90px" });
  const Icon = system.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="relative grid gap-5 md:grid-cols-[160px_minmax(0,1fr)]"
      role="listitem"
    >
      <div className="hidden md:block">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.1em]" style={{ color: "var(--text-dim)" }}>
          Phase {system.phase}
        </p>
        <p className="mt-2 text-[0.85rem] leading-[1.5]" style={{ color: "var(--text-muted)" }}>
          {system.period}
        </p>
      </div>

      <div className="relative pl-8 md:pl-10">
        <span
          className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-[4px] border"
          style={{
            background: "var(--surface)",
            borderColor: "var(--gold-mid)",
            color: "var(--gold)",
          }}
          aria-hidden="true"
        >
          <Icon size={15} />
        </span>
        {index < systems.length - 1 && (
          <span
            className="absolute left-4 top-10 h-[calc(100%+1.25rem)] w-px"
            style={{ background: "linear-gradient(var(--border-hover), var(--border))" }}
            aria-hidden="true"
          />
        )}

        <div
          className="rounded-[4px] border p-6 md:p-7 transition-colors duration-300"
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
          <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="md:hidden font-mono text-[0.62rem] uppercase tracking-[0.1em] mb-2" style={{ color: "var(--gold)" }}>
                Phase {system.phase} / {system.period}
              </p>
              <h3 className="font-head text-[1.15rem] font-bold tracking-tight" style={{ color: "var(--text)" }}>
                {system.name}
              </h3>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.08em] mt-1" style={{ color: "var(--text-dim)" }}>
                {system.type}
              </p>
            </div>
            <span
              className="font-mono text-[0.6rem] uppercase tracking-[0.08em] rounded-[2px] border px-3 py-1"
              style={{ color: "var(--sage)", background: "var(--sage-dim)", borderColor: "rgba(90,143,123,0.25)" }}
            >
              Production
            </span>
          </div>

          <p className="text-[0.92rem] leading-[1.75] mb-4" style={{ color: "var(--text-muted)" }}>
            {system.summary}
          </p>

          <div
            className="mb-5 rounded-[4px] border p-4"
            style={{ background: "var(--bg)", borderColor: "var(--border)" }}
          >
            <div className="flex items-start gap-3">
              <GitBranch size={15} className="mt-1 flex-shrink-0" style={{ color: "var(--gold)" }} />
              <p className="text-[0.85rem] leading-[1.65]" style={{ color: "var(--text-muted)" }}>
                <span className="font-semibold" style={{ color: "var(--text)" }}>
                  Engineering impact:
                </span>{" "}
                {system.impact}
              </p>
            </div>
          </div>

          <ul className="mb-5 grid gap-2 md:grid-cols-2" aria-label={`${system.name} work highlights`}>
            {system.bullets.map((bullet) => (
              <li key={bullet} className="relative pl-4 text-[0.84rem] leading-[1.6]" style={{ color: "var(--text-muted)" }}>
                <span className="absolute left-0 top-[0.45rem] h-1.5 w-1.5 rounded-full" style={{ background: "var(--gold)" }} />
                {bullet}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-[6px]">
            {system.chips.map((chip) => (
              <span
                key={chip}
                className="font-mono text-[0.6rem] tracking-[0.06em] uppercase px-[0.6rem] py-[0.2rem] rounded-[2px] border"
                style={{ color: "var(--text-dim)", borderColor: "var(--border)" }}
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section
      id="experience"
      className="max-w-[1100px] mx-auto px-10 py-24"
      aria-labelledby="exp-heading"
    >
      <div ref={headerRef}>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-mono text-[0.7rem] tracking-[0.14em] uppercase mb-3 flex items-center gap-3"
          style={{ color: "var(--gold)" }}
        >
          <span className="w-6 h-[1px] inline-block" style={{ background: "var(--gold)" }} />
          Experience
        </motion.p>

        <motion.h2
          id="exp-heading"
          initial={{ opacity: 0, y: 16 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-head font-extrabold tracking-tight leading-[1.05] mb-4"
          style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--text)" }}
        >
          Production timeline.
          <br />
          <span style={{ color: "var(--text-muted)" }}>Systems shipped and maintained.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[1rem] leading-[1.75] mb-10 max-w-[560px]"
          style={{ color: "var(--text-muted)" }}
        >
          Backend Developer Intern contributing to live logistics, CRM, real estate, and HR management systems at an MatchBest Group.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex flex-wrap items-center justify-between gap-4 rounded-[4px] border p-7 mb-12"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
          role="region"
          aria-label="Employment details"
        >
          <div>
            <p className="font-head font-bold text-[1.35rem] tracking-tight" style={{ color: "var(--text)" }}>
                MatchBest Group
            </p>
            <p className="font-mono text-[0.72rem] tracking-[0.08em] uppercase mt-1" style={{ color: "var(--gold)" }}>
              Backend Developer Intern
            </p>
          </div>
          <div className="flex flex-wrap gap-3 items-center">
            <span
              className="font-mono text-[0.65rem] tracking-[0.08em] uppercase px-3 py-[0.3rem] rounded-[2px] border"
              style={{ color: "var(--text-dim)", borderColor: "var(--border)" }}
            >
              2024 - Present
            </span>
            <span
              className="font-mono text-[0.65rem] tracking-[0.08em] uppercase px-4 py-[0.35rem] rounded-[2px] border"
              style={{
                color: "var(--sage)",
                background: "var(--sage-dim)",
                borderColor: "rgba(90,143,123,0.25)",
              }}
            >
              Active
            </span>
          </div>
        </motion.div>
      </div>

      <div className="flex flex-col gap-5" role="list" aria-label="Production experience timeline">
        {systems.map((system, index) => (
          <TimelineItem key={system.name} system={system} index={index} />
        ))}
      </div>
    </section>
  );
}
