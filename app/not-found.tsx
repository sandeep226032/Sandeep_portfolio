import Link from "next/link";

export default function NotFound() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      style={{ background: "var(--bg)" }}
    >
      <p
        className="font-mono text-[0.7rem] tracking-[0.14em] uppercase mb-4 flex items-center gap-3"
        style={{ color: "var(--gold)" }}
      >
        <span
          className="w-6 h-[1px] inline-block"
          style={{ background: "var(--gold)" }}
        />
        404
        <span
          className="w-6 h-[1px] inline-block"
          style={{ background: "var(--gold)" }}
        />
      </p>

      <h1
        className="font-head font-extrabold tracking-tight leading-[1.0] mb-4"
        style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "var(--text)" }}
      >
        Page not
        <br />
        <span style={{ color: "var(--text-muted)" }}>found.</span>
      </h1>

      <p
        className="text-[1rem] leading-[1.75] mb-10 max-w-[360px]"
        style={{ color: "var(--text-muted)" }}
      >
        This route doesn&apos;t exist. Head back to the portfolio.
      </p>

      <Link
        href="/"
        className="font-mono text-[0.78rem] tracking-[0.08em] uppercase no-underline inline-flex items-center gap-2 px-8 py-[0.85rem] rounded-[2px] transition-all duration-200 hover:-translate-y-[1px] hover:opacity-90"
        style={{ background: "var(--gold)", color: "var(--bg)" }}
      >
        ← Back to Home
      </Link>
    </main>
  );
}
