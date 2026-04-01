export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t px-10 py-8 flex flex-wrap items-center justify-between gap-4"
      style={{ borderColor: "var(--border)" }}
      role="contentinfo"
    >
      <span
        className="font-mono text-[0.65rem] tracking-[0.08em] uppercase"
        style={{ color: "var(--text-dim)" }}
      >
        &copy; {year} Sandeep Nandi — All rights reserved
      </span>
      <span
        className="font-mono text-[0.65rem] tracking-[0.06em]"
        style={{ color: "var(--text-dim)" }}
      >
        Designed &amp; built by{" "}
        <span style={{ color: "var(--gold)" }}>Sandeep Nandi</span>
      </span>
    </footer>
  );
}
