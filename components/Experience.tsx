"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const systems = [
  {
    name: "Mobiking",
    type: "Logistics Platform",
    bullets: [
      "Migrated logistics APIs from Shiprocket to Delhivery, improving shipment processing reliability",
      "Implemented Forgot Password flow for enhanced user authentication security",
      "Resolved admin panel bugs ensuring uninterrupted platform operations",
      "Enhanced tracking reliability across the end-to-end shipment lifecycle",
    ],
    chips: ["Node.js", "REST API", "Delhivery API", "Admin Panel"],
  },
  {
    name: "Cavakil",
    type: "Real Estate Platform",
    bullets: [
      "Built dynamic Showcase, Navbar, Trust, and About Us modules with full frontend-backend integration",
      "All modules admin-controlled, enabling non-technical content management",
      "Implemented flexible data models to support dynamic content updates at scale",
    ],
    chips: ["Node.js", "React.js", "MongoDB", "Admin CMS"],
  },
  {
    name: "AVA CRM",
    type: "SaaS CRM System",
    bullets: [
      "Developed outbound and inbound communication integrations for the CRM",
      "Integrated Meta and Apollo platforms for lead management and outreach workflows",
      "Researched and proposed scalable multi-tenant database architecture for SaaS delivery",
      "Implement Notification service using SSE(Server Sent Events) and EventBus",
      "Implemented role-based access control (RBAC) for secure multi-user CRM access",
      "Implemented  Event-based architecture using SSE and EventBus for real-time updates and notifications",
    ],
    chips: ["Meta API", "Apollo", "PostgreSQL", "SaaS Architecture","SSE(Serever Sent Events)","Inbound Voice Bot","Outbound Voice Bot"],
  },
  {
    name: "HRMS",
    type: "HR Management System",
    bullets: [
      "Designed Entity-Relationship (ER) diagrams for the admin panel module",
      "Structured and optimized database relationships for core HR workflows",
      "Laid architectural groundwork for scalable employee data management",
    ],
    chips: ["ER Diagrams", "MySQL", "DB Design", "Admin Panel"],
  },
];

function ExpCard({ system, delay }: { system: typeof systems[0]; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col h-full w-full overflow-hidden rounded-[4px] border p-7 transition-all duration-300 card-accent group cursor-default"
      style={{
        background: "var(--surface)",
        borderColor: "var(--border)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.background = "var(--surface2)";
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border-hover)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = "var(--surface)";
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
      }}
    >
      <h3
        className="font-head font-bold text-[1.05rem] tracking-tight mb-1"
        style={{ color: "var(--text)" }}
      >
        {system.name}
      </h3>
      <p
        className="font-mono text-[0.62rem] tracking-[0.1em] uppercase mb-5"
        style={{ color: "var(--text-dim)" }}
      >
        {system.type}
      </p>

      <ul className="flex flex-col flex-grow gap-3 mb-5">
        {system.bullets.map((b) => (
          <li
            key={b}
            className="text-[0.875rem] leading-[1.6] pl-4 relative"
            style={{ color: "var(--text-muted)" }}
          >
            <span
              className="absolute left-0 text-[0.75rem] top-0"
              style={{ color: "var(--gold)" }}
              aria-hidden="true"
            >
              →
            </span>
            {b}
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap mt-auto gap-[6px]">
        {system.chips.map((c) => (
          <span
            key={c}
            className="font-mono text-[0.6rem] tracking-[0.06em] uppercase px-[0.6rem] py-[0.2rem] rounded-[2px] border"
            style={{ color: "var(--text-dim)", borderColor: "var(--border)" }}
          >
            {c}
          </span>
        ))}
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
          Production work.
          <br />
          <span style={{ color: "var(--text-muted)" }}>Shipped and maintained.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[1rem] leading-[1.75] mb-10 max-w-[520px]"
          style={{ color: "var(--text-muted)" }}
        >
          Backend Developer Intern contributing to four live systems — logistics, CRM,
          real estate, and HR management — at MatchBest Group.
        </motion.p>

        {/* Company banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex flex-wrap items-center justify-between gap-4 rounded-[4px] border p-7 mb-10"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
          role="region"
          aria-label="Employment details"
        >
          <div>
            <p
              className="font-head font-bold text-[1.35rem] tracking-tight"
              style={{ color: "var(--text)" }}
            >
              MatchBest Group
            </p>
            <p
              className="font-mono text-[0.72rem] tracking-[0.08em] uppercase mt-1"
              style={{ color: "var(--gold)" }}
            >
              Backend Developer Intern
            </p>
          </div>
          <div className="flex flex-wrap gap-3 items-center">
            <span
              className="font-mono text-[0.65rem] tracking-[0.08em] uppercase px-3 py-[0.3rem] rounded-[2px] border"
              style={{ color: "var(--text-dim)", borderColor: "var(--border)" }}
            >
              2024 — Present
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

      {/* System cards grid */}
      <div
        className="grid gap-5 items-stretch"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}
        role="list"
        aria-label="Systems worked on"
      >
        {systems.map((s, i) => (
          <div key={s.name} role="listitem" className="flex">
            <ExpCard system={s} delay={i * 0.1} />
          </div>
        ))}
      </div>
    </section>
  );
}
