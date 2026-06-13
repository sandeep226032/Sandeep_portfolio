"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, BriefcaseBusiness } from "lucide-react";

const experiences = [
  {
    role: "Backend Developer Intern",
    company: "MatchBest Group",
    companyUrl: null as string | null,
    period: "5 Months",
    location: "India",
    description:
      "Worked on production backend modules across logistics, CRM, real estate CMS, and HRMS systems. Built and maintained REST APIs, authentication flows, admin workflows, third-party integrations, database models, and realtime notification foundations used by internal product teams.",
    tags: ["Node.js", "Express.js", "REST APIs", "MongoDB", "PostgreSQL", "MySQL", "RBAC", "SSE"],
    accent: "var(--gold)",
    bg: "var(--gold-dim)",
    logo: "/matchbestlogo.jpg",
  },
];

function ExperienceLogo({ logo, company, accent, bg }: { logo?: string; company: string; accent: string; bg: string }) {
  return (
    <div
      className="relative flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-[12px] border overflow-hidden"
      style={{
        color: accent,
        background: bg,
        borderColor: "var(--border-hover)",
      }}
      aria-hidden="true"
    >
      {logo ? (
        <Image
          src={logo}
          alt={`${company} logo`}
          fill
          className="object-cover"
        />
      ) : (
        <BriefcaseBusiness size={28} strokeWidth={2.4} />
      )}
    </div>
  );
}

function ExperienceItem({ experience, index }: { experience: (typeof experiences)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="border-b px-5 py-7 sm:px-6 sm:py-8"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_260px] md:items-start">
        <div className="flex gap-4">
          <ExperienceLogo 
            logo={experience.logo} 
            company={experience.company} 
            accent={experience.accent} 
            bg={experience.bg} 
          />
          
          <div className="min-w-0">
            <h3 className="font-head text-[1.2rem] font-extrabold leading-tight tracking-tight sm:text-[1.35rem]" style={{ color: "var(--text)" }}>
              {experience.role}
            </h3>
            <p className="mt-1 inline-flex flex-wrap items-center gap-1.5 text-[0.95rem] font-semibold" style={{ color: "var(--text-muted)" }}>
              <span>@ {experience.company}</span>
              {experience.companyUrl && (
                <a href={experience.companyUrl} target="_blank" rel="noopener noreferrer" aria-label={`${experience.company} website`}>
                  <ArrowUpRight size={15} />
                </a>
              )}
            </p>
          </div>
        </div>

        <div className="md:text-right">
          <p className="text-[0.95rem] font-semibold" style={{ color: "var(--text-muted)" }}>
            {experience.period}
          </p>
          <p className="mt-1 text-[0.92rem]" style={{ color: "var(--text-dim)" }}>
            {experience.location}
          </p>
        </div>
      </div>

      <p className="mt-5 max-w-[900px] text-[0.98rem] leading-[1.8] sm:text-[1.05rem]" style={{ color: "var(--text-muted)" }}>
        {experience.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2" aria-label={`${experience.role} technologies`}>
        {experience.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-[8px] border px-3 py-1.5 text-[0.78rem] font-semibold"
            style={{ color: "var(--text)", borderColor: "var(--border-hover)", background: "var(--surface-dim)" }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.article>
  );
}

export default function Experience() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="experience"
      ref={ref}
      className="px-5 py-20 sm:px-6 md:px-10 lg:py-24"
      aria-labelledby="experience-heading"
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
            id="experience-heading"
            className="font-head text-[2rem] font-extrabold leading-tight tracking-tight sm:text-[2.5rem]"
            style={{ color: "var(--text)" }}
          >
            Work Experience.
          </h2>
        </motion.div>

        <div role="list" aria-label="Work experience">
          {experiences.map((experience, index) => (
            <ExperienceItem key={experience.role} experience={experience} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
