"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Download, Github, Linkedin, Mail, MapPin, ShieldCheck } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.62, delay, ease: [0.22, 1, 0.36, 1] },
});

const stats = [
  { value: "5", label: "Months Internship" },
  { value: "20+", label: "APIs & Integrations" },
  { value: "4+", label: "Production Modules" },
  { value: "10+", label: "Backend/AI Tools" },
];

const skills = ["Node.js", "Express.js", "FastAPI", "REST APIs", "LangChain", "RAG", "MongoDB", "PostgreSQL", "Docker"];

const actions = [
  {
    label: "GitHub",
    href: "https://github.com/sandeep226032",
    icon: Github,
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sandeep-nandi-166394258/",
    icon: Linkedin,
    external: true,
  },
  {
    label: "Resume",
    href: "/resume_sandeep.pdf",
    icon: Download,
    download: true,
  },
  {
    label: "Email",
    href: "mailto:Sandeep_226032@saitm.org",
    icon: Mail,
  },
];

function PixelStrip() {
  const pixels = useMemo(
    () =>
      Array.from({ length: 126 }, (_, index) => ({
        id: index,
        opacity: 0.12 + ((index * 17) % 7) * 0.09,
        active: index % 19 === 0 || index % 31 === 0 || index % 47 === 0,
      })),
    []
  );

  return (
    <motion.div
      {...fadeUp(0.12)}
      className="overflow-hidden border-y py-5"
      style={{
        borderColor: "var(--border)",
        background:
          "repeating-linear-gradient(135deg, transparent 0 8px, rgba(255,255,255,0.025) 8px 10px)",
      }}
      aria-hidden="true"
    >
      <div className="grid grid-cols-[repeat(42,minmax(0,1fr))] gap-1.5 sm:grid-cols-[repeat(63,minmax(0,1fr))]">
        {pixels.map((pixel) => (
          <span
            key={pixel.id}
            className="aspect-square rounded-[2px]"
            style={{
              background: pixel.active ? "var(--text)" : "var(--text-muted)",
              opacity: pixel.active ? 0.92 : pixel.opacity,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

function LocalTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      setTime(
        new Intl.DateTimeFormat("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date())
      );
    };

    update();
    const timer = window.setInterval(update, 30000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <span className="inline-flex items-center gap-2 font-mono text-[0.74rem] uppercase tracking-[0.08em]" style={{ color: "var(--text-dim)" }}>
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--sage)" }} aria-hidden="true" />
      IST {time || "--:--"}
    </span>
  );
}

function ProfileAvatar() {
  return (
    <div
      className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border sm:h-24 sm:w-24"
      style={{
        background: "linear-gradient(145deg, var(--surface2), var(--surface))",
        borderColor: "var(--border-hover)",
        boxShadow: "inset 0 0 0 5px var(--bg)",
      }}
      aria-hidden="true"
    >
      <span className="font-head text-[1.65rem] font-extrabold tracking-tight sm:text-[1.9rem]" style={{ color: "var(--text)" }}>
        SN
      </span>
    </div>
  );
}

function StatCard({ value, label, delay }: { value: string; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-[4px] border p-4"
      style={{ background: "var(--surface-dim)", borderColor: "var(--border)" }}
      role="listitem"
    >
      <p className="font-head text-[1.55rem] font-extrabold leading-none" style={{ color: "var(--text)" }}>
        {value}
      </p>
      <p className="mt-2 font-mono text-[0.58rem] uppercase tracking-[0.08em]" style={{ color: "var(--text-dim)" }}>
        {label}
      </p>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden px-5 pb-16 pt-28 sm:px-6 md:px-10 lg:pb-20 lg:pt-32" aria-label="Hero section">
      <div className="absolute inset-0 grid-bg opacity-35 pointer-events-none" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-[960px]">
        <PixelStrip />

        <motion.div
          {...fadeUp(0.2)}
          className="border-b py-7 sm:py-8"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-5">
              <ProfileAvatar />
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="font-head text-[2rem] font-extrabold leading-tight tracking-tight sm:text-[2.55rem]" style={{ color: "var(--text)" }}>
                    Sandeep Nandi
                  </h1>
                  <ShieldCheck size={22} style={{ color: "var(--gold)" }} aria-label="Verified profile" />
                </div>
                <p className="mt-1 text-[1rem] font-semibold sm:text-[1.1rem]" style={{ color: "var(--text-muted)" }}>
                  Backend Developer & AI Systems Builder
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:items-end">
              <span className="inline-flex items-center gap-2 font-mono text-[0.74rem] uppercase tracking-[0.08em]" style={{ color: "var(--text-dim)" }}>
                <MapPin size={14} aria-hidden="true" />
                India
              </span>
              <LocalTime />
            </div>
          </div>
        </motion.div>

        <motion.div
          {...fadeUp(0.28)}
          className="border-b py-8 sm:py-10"
          style={{ borderColor: "var(--border)" }}
        >
          <p className="max-w-[860px] text-[1.08rem] leading-[1.85] sm:text-[1.18rem]" style={{ color: "var(--text-muted)" }}>
            Hey, I&apos;m{" "}
            <strong style={{ color: "var(--text)", fontWeight: 700 }}>Sandeep</strong> - a recent B.Tech graduate and backend-focused developer from India. I build{" "}
            <strong style={{ color: "var(--text)", fontWeight: 700 }}>scalable APIs</strong>, authentication systems, database-backed products, and{" "}
            <strong style={{ color: "var(--text)", fontWeight: 700 }}>AI-powered applications</strong> using FastAPI, LangChain, RAG, and vector databases.
          </p>

          <p className="mt-6 max-w-[860px] text-[1.02rem] leading-[1.85] sm:text-[1.1rem]" style={{ color: "var(--text-muted)" }}>
            During my 5-month Backend Developer Internship, I contributed to logistics APIs, CRM workflows, admin panels, HRMS modules, third-party integrations, and production backend systems used by real teams.
          </p>

          <div className="mt-7 flex flex-wrap gap-2" aria-label="Core technologies">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-[3px] border px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.07em]"
                style={{ color: "var(--text-muted)", background: "var(--surface-dim)", borderColor: "var(--border)" }}
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          {...fadeUp(0.36)}
          className="border-b py-6"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="flex flex-wrap gap-3">
            {actions.map(({ label, href, icon: Icon, external, download }) => (
              <a
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                download={download ? true : undefined}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[4px] border px-4 py-2.5 font-mono text-[0.72rem] uppercase tracking-[0.07em] no-underline transition-all duration-200 hover:-translate-y-0.5"
                style={{ color: "var(--text)", background: "var(--surface)", borderColor: "var(--border-hover)" }}
                aria-label={label}
              >
                <Icon size={15} aria-hidden="true" />
                {label}
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          {...fadeUp(0.44)}
          className="grid gap-3 pt-6 sm:grid-cols-2 lg:grid-cols-4"
          role="list"
          aria-label="Key statistics"
        >
          {stats.map((stat, index) => (
            <StatCard key={stat.label} value={stat.value} label={stat.label} delay={index * 0.05} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
