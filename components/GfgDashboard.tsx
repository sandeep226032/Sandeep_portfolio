"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink } from "lucide-react";

const GFG_USERNAME = "sandeepv4pc";

type GfgStats = {
  username: string;
  codingScore: number | null;
  problemsSolved: number | null;
  instituteRank: number | null;
  streak: number | null;
  difficulty: {
    school: number;
    basic: number;
    easy: number;
    medium: number;
    hard: number;
  };
};

const gfgStats: GfgStats = {
  username: GFG_USERNAME,
  codingScore: 661,
  problemsSolved: 238,
  instituteRank: 21,
  streak: 12,
  difficulty: {
    school: 0,
    basic: 27,
    easy: 98,
    medium: 110,
    hard: 3,
  },
};

const difficultyStyles = {
  school: "#94a3b8",
  basic: "#38bdf8",
  easy: "#00b894",
  medium: "#f59e0b",
  hard: "#ff3b6b",
};

function formatNumber(value: number | null) {
  if (!value) return "--";
  return new Intl.NumberFormat("en-IN").format(value);
}

export default function GfgDashboard() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const stats = gfgStats;
  const profileUrl = `https://auth.geeksforgeeks.org/user/${stats.username}/practice/`;
  const difficultyRows = [
    { key: "school" as const, label: "School", solved: stats.difficulty.school },
    { key: "basic" as const, label: "Basic", solved: stats.difficulty.basic },
    { key: "easy" as const, label: "Easy", solved: stats.difficulty.easy },
    { key: "medium" as const, label: "Medium", solved: stats.difficulty.medium },
    { key: "hard" as const, label: "Hard", solved: stats.difficulty.hard },
  ];

  return (
    <section
      id="gfg"
      ref={ref}
      className="px-5 py-20 sm:px-6 md:px-10 lg:py-24"
      aria-labelledby="gfg-heading"
    >
      <div className="mx-auto max-w-[960px]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden border"
          style={{
            background: "#030303",
            borderColor: "rgba(255,255,255,0.14)",
            boxShadow: "0 22px 70px rgba(0,0,0,0.35)",
          }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.16]"
            style={{
              background:
                "linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(180deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
              backgroundSize: "96px 62px",
            }}
            aria-hidden="true"
          />

          <div className="relative flex flex-col gap-4 border-b px-5 py-4 sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: "rgba(255,255,255,0.16)" }}>
            <h2 id="gfg-heading" className="font-head text-[2rem] font-extrabold leading-none tracking-tight sm:text-[2.45rem]" style={{ color: "#f7f7f7" }}>
              geeksforgeeks.
            </h2>

            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 self-start font-mono text-[0.82rem] no-underline sm:self-auto"
              style={{ color: "#b8b8b8" }}
            >
              <span className="font-head text-[1.15rem] font-extrabold" style={{ color: "#2f8d46" }}>
                GFG
              </span>
              {stats.username}
              <ExternalLink size={15} aria-hidden="true" />
            </a>
          </div>

          <div className="relative grid lg:grid-cols-[0.95fr_1.05fr]">
            <div className="grid border-b lg:border-b-0 lg:border-r" style={{ borderColor: "rgba(255,255,255,0.16)" }}>
              <div className="grid sm:grid-cols-2 lg:grid-cols-1">
                <div className="border-b px-5 py-4 text-center sm:border-r lg:border-r-0" style={{ borderColor: "rgba(255,255,255,0.14)" }}>
                  <p className="font-mono text-[0.78rem] font-extrabold uppercase tracking-[0.06em]" style={{ color: "#f1f1f1" }}>
                    Solved
                  </p>
                  <p className="mt-1 font-head text-[1.65rem] font-extrabold" style={{ color: "#a8a8a8" }}>
                    {formatNumber(stats.problemsSolved)}
                  </p>
                  <p className="mt-3 font-mono text-[0.62rem] uppercase tracking-[0.08em]" style={{ color: "#6f6f6f" }}>
                    Problems solved
                  </p>
                </div>

                <div className="grid grid-cols-2">
                  <div className="border-b border-r px-5 py-4 text-center" style={{ borderColor: "rgba(255,255,255,0.14)" }}>
                    <p className="font-mono text-[0.7rem] font-extrabold uppercase tracking-[0.06em]" style={{ color: "#f1f1f1" }}>
                      Score
                    </p>
                    <p className="mt-1 font-head text-[1.15rem] font-extrabold" style={{ color: "#a8a8a8" }}>
                      {formatNumber(stats.codingScore)}
                    </p>
                  </div>

                  <div className="border-b px-5 py-4 text-center" style={{ borderColor: "rgba(255,255,255,0.14)" }}>
                    <p className="font-mono text-[0.7rem] font-extrabold uppercase tracking-[0.06em]" style={{ color: "#f1f1f1" }}>
                      Rank
                    </p>
                    <p className="mt-1 font-head text-[1.15rem] font-extrabold" style={{ color: "#a8a8a8" }}>
                      # {formatNumber(stats.instituteRank)}
                    </p>
                  </div>
                </div>

                <div className="px-5 py-4 text-center">
                  <p className="font-mono text-[0.7rem] font-extrabold uppercase tracking-[0.06em]" style={{ color: "#f1f1f1" }}>
                    Streak
                  </p>
                  <p className="mt-1 font-head text-[1.15rem] font-extrabold" style={{ color: "#a8a8a8" }}>
                    {formatNumber(stats.streak)}
                  </p>
                  <p className="mt-3 font-mono text-[0.62rem] uppercase tracking-[0.08em]" style={{ color: "#6f6f6f" }}>
                    Manual profile data
                  </p>
                </div>
              </div>
            </div>

            <div className="px-5 py-4">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="font-head text-[1.05rem] font-extrabold" style={{ color: "#f1f1f1" }}>
                  Difficulty Breakdown
                </h3>
                <span className="font-mono text-[0.58rem] uppercase tracking-[0.08em]" style={{ color: "#00b894" }}>
                  Manual
                </span>
              </div>

              <div className="grid gap-2 sm:grid-cols-5">
                {difficultyRows.map((item) => (
                  <div
                    key={item.key}
                    className="border px-3 py-4 text-center"
                    style={{ borderColor: "rgba(255,255,255,0.14)", background: "rgba(255,255,255,0.025)" }}
                  >
                    <p className="font-mono text-[0.66rem] font-extrabold uppercase tracking-[0.06em]" style={{ color: difficultyStyles[item.key] }}>
                      {item.label}
                    </p>
                    <p className="mt-2 font-head text-[1.15rem] font-extrabold" style={{ color: "#a8a8a8" }}>
                      {item.solved}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 border-t pt-4" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                <p className="text-[0.82rem] leading-[1.7]" style={{ color: "#8f8f8f" }}>
                  Tracks my GFG practice profile alongside LeetCode, showing solved problems, coding score, rank, streak, and difficulty-wise progress.
                </p>
              </div>
            </div>
          </div>

          <div
            className="relative h-2 border-t"
            style={{
              borderColor: "rgba(255,255,255,0.16)",
              background: "repeating-linear-gradient(45deg, rgba(47,141,70,0.42) 0 4px, transparent 4px 8px)",
            }}
            aria-hidden="true"
          />
        </motion.div>
      </div>
    </section>
  );
}
