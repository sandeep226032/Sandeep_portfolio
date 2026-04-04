"use client";

import { motion } from "framer-motion";

export default function InfiniteMarquee({
  items,
  duration = 40,
  reverse = false,
}: {
  items: string[];
  duration?: number;
  reverse?: boolean;
}) {
  return (
    <div className="relative flex w-full overflow-hidden mb-6 py-4">
      {/* Edge gradient masks */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-16 md:w-32 z-10 pointer-events-none" 
        style={{ background: "linear-gradient(to right, var(--bg) 0%, transparent 100%)" }}
      />
      <div 
        className="absolute right-0 top-0 bottom-0 w-16 md:w-32 z-10 pointer-events-none" 
        style={{ background: "linear-gradient(to left, var(--bg) 0%, transparent 100%)" }}
      />

      {/* Track Container */}
      <motion.div
        className="flex whitespace-nowrap min-w-max"
        animate={{
          x: reverse ? ["-50%", "0%"] : ["0%", "-50%"],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: duration,
        }}
      >
        {/* We output the array exactly twice. -50% shifts precisely one full set out of view, looping seamlessly. */}
        {[...items, ...items].map((item, idx) => (
          <span
            key={idx}
            className="inline-block font-mono text-[0.75rem] tracking-[0.05em] uppercase px-5 py-[0.6rem] mx-2 rounded-[2px] border transition-colors hover:text-[var(--gold)] hover:border-[var(--gold-mid)]"
            style={{
              color: "var(--text-muted)",
              background: "var(--surface)",
              borderColor: "var(--border)",
            }}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
