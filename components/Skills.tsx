"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const barGroups = [
  {
    group: "Languages",
    items: [
      { name: "JavaScript",  level: "Primary",    pct: 90 },
      { name: "Java",        level: "Proficient", pct: 70 },
      { name: "SQL",         level: "Proficient", pct: 75 },
      { name: "C",           level: "Familiar",   pct: 55 },
    ],
  },
  {
    group: "Backend",
    items: [
      { name: "Node.js",         level: "Core",     pct: 88 },
      { name: "Express.js",      level: "Core",     pct: 85 },
      { name: "REST API Design", level: "Strong",   pct: 85 },
      { name: "Next.js",         level: "Learning", pct: 60 },
    ],
  },
  {
    group: "Databases",
    items: [
      { name: "MongoDB",           level: "Primary",    pct: 82 },
      { name: "MySQL",             level: "Proficient", pct: 72 },
      { name: "PostgreSQL",        level: "Familiar",   pct: 60 },
      { name: "ER Diagram Design", level: "Strong",     pct: 78 },
    ],
  },
];

const badgeGroups = [
  {
    group: "Frontend",
    items: ["React.js", "HTML", "CSS", "MERN Stack", "Responsive UI", "REST integration"],
  },
  {
    group: "Developer Tools",
    items: ["Git", "GitHub", "VS Code", "Postman", "Delhivery API", "Meta API", "Apollo", "OOP", "Data Structures"],
  },
];

function BarGroup({ group, delay }: { group: (typeof barGroups)[0]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref} className="rounded-[4px] border p-6" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay }}
      >
        <p className="font-mono text-[0.65rem] tracking-[0.12em] uppercase mb-5 pb-3 border-b"
          style={{ color: "var(--gold)", borderColor: "var(--border)" }}>
          {group.group}
        </p>
        <div className="flex flex-col gap-4">
          {group.items.map((item, i) => (
            <div key={item.name}>
              <div className="flex justify-between items-baseline mb-[6px]">
                <span className="text-[0.875rem] font-medium" style={{ color: "var(--text)" }}>{item.name}</span>
                <span className="font-mono text-[0.65rem]" style={{ color: "var(--text-dim)" }}>{item.level}</span>
              </div>
              <div className="h-[2px] rounded-[1px] overflow-hidden" style={{ background: "var(--border)" }}
                role="progressbar" aria-valuenow={item.pct} aria-valuemin={0} aria-valuemax={100}
                aria-label={`${item.name} proficiency ${item.pct}%`}>
                <motion.div
                  className="h-full rounded-[1px]"
                  style={{ background: "linear-gradient(90deg, var(--gold), rgba(232,184,75,0.4))" }}
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${item.pct}%` } : { width: 0 }}
                  transition={{ duration: 1.2, delay: delay + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function BadgeGroup({ group, delay }: { group: (typeof badgeGroups)[0]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="rounded-[4px] border p-6 mb-5"
      style={{ background: "var(--surface)", borderColor: "var(--border)" }}
    >
      <p className="font-mono text-[0.65rem] tracking-[0.12em] uppercase mb-4 pb-3 border-b"
        style={{ color: "var(--gold)", borderColor: "var(--border)" }}>
        {group.group}
      </p>
      <div className="flex flex-wrap gap-2" role="list" aria-label={`${group.group} skills`}>
        {group.items.map((item) => (
          <span key={item} role="listitem"
            className="font-mono text-[0.65rem] tracking-[0.05em] uppercase px-3 py-[0.3rem] rounded-[2px] border transition-all duration-200 cursor-default"
            style={{ color: "var(--text-muted)", background: "var(--surface2)", borderColor: "var(--border)" }}
            onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--gold-mid)"; el.style.color = "var(--gold)"; }}
            onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--border)"; el.style.color = "var(--text-muted)"; }}
          >
            {item}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="max-w-[1100px] mx-auto px-10 py-24" aria-labelledby="skills-heading">
      <div ref={headerRef}>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          className="font-mono text-[0.7rem] tracking-[0.14em] uppercase mb-3 flex items-center gap-3" style={{ color: "var(--gold)" }}>
          <span className="w-6 h-[1px] inline-block flex-shrink-0" style={{ background: "var(--gold)" }} aria-hidden="true" />
          Skills
        </motion.p>
        <motion.h2 id="skills-heading" initial={{ opacity: 0, y: 16 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}
          className="font-head font-extrabold tracking-tight leading-[1.05] mb-4"
          style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--text)" }}>
          Technical<br /><span style={{ color: "var(--text-muted)" }}>proficiency.</span>
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[1rem] leading-[1.75] max-w-[520px] mb-12" style={{ color: "var(--text-muted)" }}>
          Languages, frameworks, databases, and developer tools I work with regularly.
        </motion.p>
      </div>

      <div className="grid gap-5 mb-5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
        {barGroups.map((g, i) => <BarGroup key={g.group} group={g} delay={i * 0.1} />)}
      </div>
      {badgeGroups.map((g, i) => <BadgeGroup key={g.group} group={g} delay={i * 0.1} />)}
    </section>
  );
}
