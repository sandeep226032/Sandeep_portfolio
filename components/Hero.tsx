"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Database, Download, KeyRound, Plug, Server, ShieldCheck } from "lucide-react";
import MagneticWrapper from "@/components/ui/MagneticWrapper";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

// Staggered variants for text reveals
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2, // Waits for the small "Available" label to show first
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1], // Same smooth ease as your existing animations
    },
  },
};

const stats = [
  { value: 4, label: "Production Systems" },
  { value: 20, label: "REST APIs Built" },
  { value: 5, label: "Third-party Integrations" },
  { value: 2, label: "Projects Exhibited" },
];

const architectureNodes = [
  {
    id: "api",
    label: "API",
    title: "API Layer",
    icon: Server,
    x: "50%",
    y: "16%",
    delay: 0,
    detail: "REST endpoints shape requests, validate payloads, and route work to service logic.",
    flow: ["Request parsed", "Payload validated", "Service called"],
  },
  {
    id: "auth",
    label: "AUTH",
    title: "Auth & RBAC",
    icon: KeyRound,
    x: "25%",
    y: "42%",
    delay: 0.15,
    detail: "JWT sessions and role checks protect admin, student, and internal workflows.",
    flow: ["Token checked", "Role resolved", "Access granted"],
  },
  {
    id: "db",
    label: "DB",
    title: "Database",
    icon: Database,
    x: "50%",
    y: "62%",
    delay: 0.3,
    detail: "Schemas and queries keep production data reliable across analytics, CRM, and app modules.",
    flow: ["Schema mapped", "Query executed", "Record persisted"],
  },
  {
    id: "integrations",
    label: "INT",
    title: "Integrations",
    icon: Plug,
    x: "75%",
    y: "42%",
    delay: 0.45,
    detail: "Third-party APIs connect logistics, lead management, outreach, and automation workflows.",
    flow: ["Provider called", "Response normalized", "Status synced"],
  },
];

function CountUpStat({ value, label }: { value: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let frame = 0;
    const totalFrames = 48;
    const timer = window.setInterval(() => {
      frame += 1;
      const progress = 1 - Math.pow(1 - frame / totalFrames, 3);
      setCount(Math.round(value * progress));
      if (frame >= totalFrames) window.clearInterval(timer);
    }, 18);

    return () => window.clearInterval(timer);
  }, [inView, value]);

  return (
    <div ref={ref} className="flex flex-col" role="listitem">
      <span
        className="font-head font-extrabold leading-none tracking-tight"
        style={{ fontSize: "2rem", color: "var(--text)" }}
      >
        {count}
        <span style={{ color: "var(--gold)" }}>+</span>
      </span>
      <span
        className="font-mono text-[0.65rem] tracking-[0.1em] uppercase mt-1"
        style={{ color: "var(--text-dim)" }}
      >
        {label}
      </span>
    </div>
  );
}

function BackendArchitectureVisual() {
  const [activeNode, setActiveNode] = useState(architectureNodes[0].id);
  const active = architectureNodes.find((node) => node.id === activeNode) ?? architectureNodes[0];
  const ActiveIcon = active.icon;
  const paths = [
    { id: "api-auth", d: "M210 54 L105 143", nodes: ["api", "auth"] },
    { id: "api-integrations", d: "M210 54 L315 143", nodes: ["api", "integrations"] },
    { id: "auth-db", d: "M105 143 L210 211", nodes: ["auth", "db"] },
    { id: "integrations-db", d: "M315 143 L210 211", nodes: ["integrations", "db"] },
  ];
  const activePacketPath =
    paths.find((path) => path.nodes.includes(active.id) && path.id.includes(active.id)) ??
    paths.find((path) => path.nodes.includes(active.id)) ??
    paths[0];

  return (
    <motion.div
      {...fadeUp(0.75)}
      className="relative hidden lg:block min-h-[560px]"
      aria-label="Interactive backend architecture visual"
    >
      <div
        className="absolute inset-0 rounded-[4px] border overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, var(--surface), color-mix(in srgb, var(--surface2) 70%, transparent))",
          borderColor: "var(--border)",
        }}
      >
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute left-5 right-5 top-5 h-[340px]">
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 420 340" preserveAspectRatio="none">
            {paths.map((path, i) => {
              const highlighted = path.nodes.includes(active.id);
              return (
                <motion.path
                  key={path.id}
                  d={path.d}
                  fill="none"
                  stroke={highlighted ? "var(--gold)" : "var(--border-hover)"}
                  strokeWidth={highlighted ? "1.8" : "1"}
                  strokeDasharray="6 8"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: highlighted ? 0.9 : 0.45 }}
                  transition={{ duration: 1.1, delay: 0.35 + i * 0.1, ease: "easeOut" }}
                />
              );
            })}

            <motion.path
              key={`packet-${active.id}`}
              d={activePacketPath.d}
              fill="none"
              stroke="var(--gold)"
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: [0, 1], opacity: [0, 1, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </svg>

          {architectureNodes.map(({ id, label, title, icon: Icon, x, y, delay }) => {
            const selected = id === active.id;
            return (
              <motion.button
                key={label}
                type="button"
                initial={{ opacity: 0, scale: 0.88, y: 10 }}
                animate={{ opacity: 1, scale: selected ? 1.04 : 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.6 + delay, ease: [0.22, 1, 0.36, 1] }}
                transformTemplate={(_, generated) => `translate(-50%, -50%) ${generated}`}
                onMouseEnter={() => setActiveNode(id)}
                onFocus={() => setActiveNode(id)}
                onClick={() => setActiveNode(id)}
                className="absolute min-w-[132px] cursor-pointer rounded-[4px] border px-4 py-3 text-left transition-colors duration-200"
                style={{
                  left: x,
                  top: y,
                  background: "var(--surface)",
                  borderColor: selected ? "var(--gold-mid)" : "var(--border-hover)",
                  boxShadow: selected
                    ? "0 18px 70px rgba(0,0,0,0.24), 0 0 0 1px var(--gold-mid)"
                    : "0 18px 60px rgba(0,0,0,0.18)",
                }}
                aria-label={`Show ${title} details`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-[2px] border"
                    style={{
                      color: "var(--gold)",
                      background: "var(--gold-dim)",
                      borderColor: "var(--gold-mid)",
                    }}
                  >
                    <Icon size={15} />
                  </span>
                  <span className="font-mono text-[0.68rem] uppercase tracking-[0.08em]" style={{ color: "var(--text)" }}>
                    {label}
                  </span>
                </div>
                {selected && (
                  <motion.span
                    layoutId="architecture-active-dot"
                    className="absolute -bottom-3 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full"
                    style={{ background: "var(--gold)" }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-5 left-5 right-5 rounded-[4px] border p-4"
          style={{ background: "var(--bg)", borderColor: "var(--border)" }}
        >
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span
                className="flex h-8 w-8 items-center justify-center rounded-[2px] border"
                style={{ color: "var(--gold)", background: "var(--gold-dim)", borderColor: "var(--gold-mid)" }}
              >
                <ActiveIcon size={15} />
              </span>
              <div>
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.1em]" style={{ color: "var(--gold)" }}>
                  Active layer
                </span>
                <p className="text-[0.95rem] font-semibold leading-none mt-1" style={{ color: "var(--text)" }}>
                  {active.title}
                </p>
              </div>
            </div>
            <ShieldCheck size={16} style={{ color: "var(--sage)" }} />
          </div>
          <p className="mb-4 text-[0.82rem] leading-[1.6]" style={{ color: "var(--text-muted)" }}>
            {active.detail}
          </p>
          <div className="grid grid-cols-3 gap-2">
            {active.flow.map((item, i) => (
              <div key={item}>
                <p className="mb-2 font-mono text-[0.55rem] uppercase tracking-[0.08em]" style={{ color: "var(--text-dim)" }}>
                  {item}
                </p>
                <motion.div
                  initial={{ width: "18%" }}
                  animate={{ width: `${68 + i * 12}%` }}
                  transition={{ duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="h-[3px] rounded-full"
                  style={{ background: i === 1 ? "var(--sage)" : "var(--gold)" }}
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const { scrollY } = useScroll();
  // We use useTransform to map the scroll position to Y offsets.
  // Parallax: moving up slower or faster than the rest of the page.
  const yOrb = useTransform(scrollY, [0, 800], [0, 300]); // Moves down relative to scroll
  const yGrid = useTransform(scrollY, [0, 800], [0, -150]); // Moves up faster

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center px-6 md:px-10 pt-32 pb-16 relative overflow-hidden"
      aria-label="Hero section"
    >
      {/* Grid background with Parallax */}
      <motion.div 
        className="absolute inset-0 grid-bg pointer-events-none" 
        style={{ y: yGrid }}
        aria-hidden="true" 
      />

      {/* Ambient orb with Parallax */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none animate-drift"
        style={{
          background: "radial-gradient(circle, var(--hero-orb) 0%, transparent 70%)",
          top: "-10%",
          right: "-8%",
          y: yOrb, // Parallax property linked to scroll
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1100px] mx-auto grid w-full items-center gap-14 lg:grid-cols-[minmax(0,1fr)_420px]">
        <div>
        {/* Label */}
        <motion.p
          {...fadeUp(0.2)}
          className="font-mono text-[0.72rem] tracking-[0.12em] uppercase mb-6 flex items-center gap-3"
          style={{ color: "var(--gold)" }}
        >
          <span
            className="w-4 h-[1px] inline-block"
            style={{ background: "var(--gold)" }}
            aria-hidden="true"
          />
          Available for opportunities
        </motion.p>

        {/* Headline */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="font-head font-extrabold leading-[1.15] md:leading-[1.0] tracking-tight mb-6 text-[2.2rem] min-[412px]:text-[2.5rem] sm:text-[4rem] md:text-[5.5rem]"
          style={{
            color: "var(--text)",
          }}
        >
          {/* Each line animates independently */}
          <motion.span variants={childVariants} className="block">
            Backend systems
          </motion.span>
          <motion.span variants={childVariants} className="block">
            that <span style={{ color: "var(--gold)" }}>ship</span> to
          </motion.span>
          <motion.span variants={childVariants} className="block" style={{ color: "var(--text-muted)" }}>
            production.
          </motion.span>
        </motion.h1>

        {/* Description */}
        <motion.p
          {...fadeUp(0.5)}
          className="text-[1.05rem] max-w-[540px] leading-[1.75] mb-10"
          style={{ color: "var(--text-muted)" }}
        >
          I&apos;m{" "}
          <strong style={{ color: "var(--text)", fontWeight: 600 }}>
            Sandeep Nandi
          </strong>{" "}
          — a backend developer building and maintaining real-world applications.
          Node.js, REST APIs, third-party integrations, and database architecture.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          {...fadeUp(0.65)}
          className="flex flex-col sm:flex-row flex-wrap gap-4 mb-16 w-full"
        >
          <MagneticWrapper className="w-full sm:w-auto">
            <Link
              href="#projects"
              className="font-mono text-[0.78rem] tracking-[0.08em] uppercase no-underline inline-flex justify-center items-center gap-2 px-8 py-[0.85rem] rounded-[2px] transition-all duration-200 hover:opacity-90 w-full"
              style={{ background: "var(--accent)", color: "var(--accent-contrast)" }}
              aria-label="View my projects"
            >
              <ArrowRight size={13} aria-hidden="true" />
              View Projects
            </Link>
          </MagneticWrapper>

          <MagneticWrapper className="w-full sm:w-auto">
            <Link
              href="#contact"
              className="font-mono text-[0.78rem] tracking-[0.08em] uppercase no-underline inline-flex justify-center items-center gap-2 px-8 py-[0.85rem] rounded-[2px] border transition-all duration-200 w-full"
              style={{
                color: "var(--text)",
                borderColor: "var(--border-hover)",
                background: "transparent",
              }}
              aria-label="Contact me"
            >
              Contact Me
            </Link>
          </MagneticWrapper>

          {/* Resume download */}
          <MagneticWrapper className="w-full sm:w-auto sm:ml-auto mt-2 sm:mt-0">
            <a
              href="/resume_sandeep.pdf"
              download
              className="font-mono text-[0.78rem] tracking-[0.08em] uppercase no-underline inline-flex justify-center items-center gap-2 px-6 py-[0.85rem] rounded-[2px] border transition-all duration-200 w-full"
              style={{
                color: "var(--text-muted)",
                borderColor: "var(--border)",
                background: "transparent",
              }}
              aria-label="Download resume"
            >
              <Download size={13} aria-hidden="true" />
              Resume
            </a>
          </MagneticWrapper>
        </motion.div>

        {/* Stats */}
        <motion.div
          {...fadeUp(0.8)}
          className="flex flex-wrap gap-12"
          role="list"
          aria-label="Key statistics"
        >
          {stats.map((s) => (
            <CountUpStat key={s.label} value={s.value} label={s.label} />
          ))}
        </motion.div>
        </div>

        <BackendArchitectureVisual />
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span
          className="font-mono text-[0.6rem] tracking-[0.12em] uppercase"
          style={{ color: "var(--text-dim)" }}
        >
          Scroll
        </span>
        <div
          className="w-[1px] h-12 animate-scroll-pulse"
          style={{
            background: "linear-gradient(to bottom, var(--text-dim), transparent)",
          }}
        />
      </motion.div>
    </section>
  );
}
