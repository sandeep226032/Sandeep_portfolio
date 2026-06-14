"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink } from "lucide-react";

const LEETCODE_USERNAME = "SandeepNandi";

type Submission = {
  title: string;
  titleSlug: string;
  timestamp: string;
  statusDisplay: string;
  lang: string;
};

type LeetCodeStats = {
  username: string;
  ranking: number | null;
  reputation: number | null;
  solved: {
    total: number;
    easy: number;
    medium: number;
    hard: number;
  };
  totals: {
    total: number;
    easy: number;
    medium: number;
    hard: number;
  };
  recentSubmissions: Submission[];
};

const fallbackStats: LeetCodeStats = {
  username: LEETCODE_USERNAME,
  ranking: null,
  reputation: null,
  solved: {
    total: 0,
    easy: 0,
    medium: 0,
    hard: 0,
  },
  totals: {
    total: 0,
    easy: 0,
    medium: 0,
    hard: 0,
  },
  recentSubmissions: [],
};

const difficultyStyles = {
  easy: "#00b894",
  medium: "#f59e0b",
  hard: "#ff3b6b",
};

function formatNumber(value: number | null) {
  if (!value) return "--";
  return new Intl.NumberFormat("en-IN").format(value);
}

function formatDate(timestamp: string) {
  const date = new Date(Number(timestamp) * 1000);
  if (Number.isNaN(date.getTime())) return "--.--.--";

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  })
    .format(date)
    .replace(/\//g, ".");
}

function truncateTitle(title: string) {
  return title.length > 22 ? `${title.slice(0, 20)}...` : title;
}

export default function LeetCodeDashboard() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [stats, setStats] = useState<LeetCodeStats>(fallbackStats);
  const [status, setStatus] = useState<"loading" | "live" | "fallback">("loading");

  useEffect(() => {
    let mounted = true;

    async function loadStats() {
      try {
        const response = await fetch(`/api/leetcode?username=${LEETCODE_USERNAME}`);
        if (!response.ok) throw new Error("LeetCode stats unavailable");
        const data = await response.json();

        if (mounted) {
          setStats(data);
          setStatus("live");
        }
      } catch {
        if (mounted) setStatus("fallback");
      }
    }

    loadStats();
    return () => {
      mounted = false;
    };
  }, []);

  const profileUrl = `https://leetcode.com/u/${stats.username}/`;
  const recentRows = stats.recentSubmissions.slice(0, 3);
  const difficultyRows = [
    { key: "easy" as const, label: "Easy", solved: stats.solved.easy },
    { key: "medium" as const, label: "Medium", solved: stats.solved.medium },
    { key: "hard" as const, label: "Hard", solved: stats.solved.hard },
  ];

  return (
    <section
      id="leetcode"
      ref={ref}
      className="px-5 py-20 sm:px-6 md:px-10 lg:py-24"
      aria-labelledby="leetcode-heading"
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
            <h2 id="leetcode-heading" className="font-head text-[2rem] font-extrabold leading-none tracking-tight sm:text-[2.45rem]" style={{ color: "#f7f7f7" }}>
              leetcode.
            </h2>

            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 self-start font-mono text-[0.82rem] no-underline sm:self-auto"
              style={{ color: "#b8b8b8" }}
            >
              <span className="font-head text-[1.15rem] font-extrabold" style={{ color: "#f5c451" }}>
                LC
              </span>
              {stats.username}
              <ExternalLink size={15} aria-hidden="true" />
            </a>
          </div>

          <div className="relative grid lg:grid-cols-[1.18fr_0.82fr]">
            <div className="grid border-b lg:border-b-0 lg:border-r" style={{ borderColor: "rgba(255,255,255,0.16)" }}>
              <div className="grid sm:grid-cols-2">
                <div className="border-b px-5 py-4 text-center sm:border-b-0 sm:border-r" style={{ borderColor: "rgba(255,255,255,0.14)" }}>
                  <p className="font-mono text-[0.78rem] font-extrabold uppercase tracking-[0.06em]" style={{ color: "#f1f1f1" }}>
                    Solved
                  </p>
                  <p className="mt-1 font-head text-[1.2rem] font-extrabold" style={{ color: "#a8a8a8" }}>
                    {status === "loading" ? "--" : stats.solved.total}
                  </p>
                  <p className="mt-3 font-mono text-[0.62rem] uppercase tracking-[0.08em]" style={{ color: "#6f6f6f" }}>
                    Questions solved
                  </p>
                </div>

                <div className="border-b px-5 py-4 text-center sm:border-b-0" style={{ borderColor: "rgba(255,255,255,0.14)" }}>
                  <p className="font-mono text-[0.78rem] font-extrabold uppercase tracking-[0.06em]" style={{ color: "#f1f1f1" }}>
                    Rank
                  </p>
                  <p className="mt-1 font-head text-[1.2rem] font-extrabold" style={{ color: "#a8a8a8" }}>
                    # {status === "live" ? formatNumber(stats.ranking) : "--"}
                  </p>
                  <p className="mt-3 font-mono text-[0.62rem] uppercase tracking-[0.08em]" style={{ color: "#6f6f6f" }}>
                    {status === "live" ? "Live profile data" : status === "loading" ? "Syncing profile" : "Profile unavailable"}
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-3">
                {difficultyRows.map((item) => (
                  <div
                    key={item.key}
                    className="border-t px-4 py-4 text-center sm:border-r sm:last:border-r-0"
                    style={{ borderColor: "rgba(255,255,255,0.14)" }}
                  >
                    <p className="font-mono text-[0.78rem] font-extrabold uppercase tracking-[0.08em]" style={{ color: difficultyStyles[item.key] }}>
                      {item.label}
                    </p>
                    <p className="mt-1 font-head text-[1.1rem] font-extrabold" style={{ color: "#a8a8a8" }}>
                      {status === "loading" ? "--" : item.solved}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="px-5 py-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <h3 className="font-head text-[1.05rem] font-extrabold" style={{ color: "#f1f1f1" }}>
                  Recent Submissions
                </h3>
                <span className="font-mono text-[0.58rem] uppercase tracking-[0.08em]" style={{ color: status === "live" ? "#00b894" : "#777" }}>
                  {status === "live" ? "Live" : "Offline"}
                </span>
              </div>

              <div className="space-y-1.5">
                {recentRows.length > 0 ? (
                  recentRows.map((submission) => (
                    <a
                      key={`${submission.titleSlug}-${submission.timestamp}`}
                      href={`https://leetcode.com/problems/${submission.titleSlug}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="grid grid-cols-[minmax(0,1fr)_82px_68px] items-center gap-3 border-b py-1.5 font-mono text-[0.78rem] no-underline"
                      style={{ borderColor: "rgba(255,255,255,0.1)", color: "#a8a8a8" }}
                    >
                      <span className="truncate">{truncateTitle(submission.title)}</span>
                      <span className="text-right" style={{ color: submission.statusDisplay === "Accepted" ? "#b8b8b8" : "#ff3b6b" }}>
                        {submission.statusDisplay}
                      </span>
                      <span className="text-right">{formatDate(submission.timestamp)}</span>
                    </a>
                  ))
                ) : (
                  <div className="border-y py-5 text-center font-mono text-[0.72rem] uppercase tracking-[0.08em]" style={{ borderColor: "rgba(255,255,255,0.1)", color: "#777" }}>
                    {status === "loading" ? "Loading submissions" : "No recent submissions"}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div
            className="relative h-2 border-t"
            style={{
              borderColor: "rgba(255,255,255,0.16)",
              background: "repeating-linear-gradient(45deg, rgba(255,255,255,0.16) 0 4px, transparent 4px 8px)",
            }}
            aria-hidden="true"
          />
        </motion.div>
      </div>
    </section>
  );
}
