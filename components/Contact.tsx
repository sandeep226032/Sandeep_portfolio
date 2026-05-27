"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle2, Download, Github, Linkedin, LoaderCircle, Send } from "lucide-react";

export default function Contact() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [msg, setMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMsg("Message sent. I'll get back to you soon.");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
        setMsg(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMsg("Network error. Please try again.");
    }
  };

  const inputStyle = {
    width: "100%",
    background: "var(--bg)",
    border: "1px solid var(--border)",
    borderRadius: "2px",
    padding: "0.75rem 1rem",
    color: "var(--text)",
    fontFamily: "var(--font-body)",
    fontSize: "0.9rem",
    outline: "none",
    transition: "border-color 0.2s, background-color 0.2s",
  };

  const socialLinkStyle = { color: "var(--text-muted)", borderColor: "var(--border)" };
  const socialHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    el.style.color = "var(--gold)";
    el.style.borderColor = "var(--gold-mid)";
  };
  const socialLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    el.style.color = "var(--text-muted)";
    el.style.borderColor = "var(--border)";
  };

  return (
    <section
      id="contact"
      className="max-w-[1100px] mx-auto px-6 md:px-10 py-16 md:py-24"
      aria-labelledby="contact-heading"
    >
      <div ref={headerRef}>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          className="font-mono text-[0.7rem] tracking-[0.14em] uppercase mb-3 flex items-center gap-3"
          style={{ color: "var(--gold)" }}
        >
          <span className="w-6 h-[1px] inline-block" style={{ background: "var(--gold)" }} />
          Contact
        </motion.p>
        <motion.h2
          id="contact-heading"
          initial={{ opacity: 0, y: 16 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="font-head font-extrabold tracking-tight leading-[1.05] mb-4"
          style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--text)" }}
        >
          Let&apos;s work
          <br />
          <span style={{ color: "var(--text-muted)" }}>together.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="text-[1rem] leading-[1.75] max-w-[520px] mb-14"
          style={{ color: "var(--text-muted)" }}
        >
          Open to backend development roles, internship extensions, and collaboration. Drop me a message.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-10 md:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25 }}
        >
          {[
            { label: "Email", value: "Sandeep_226032@saitm.org", href: "mailto:Sandeep_226032@saitm.org" },
            { label: "Phone", value: "+91 9728911658", href: "tel:+919728911658" },
            { label: "Location", value: "India", href: null },
            { label: "Availability", value: "Open to opportunities", href: null, gold: true },
          ].map((item) => (
            <div key={item.label} className="mb-6">
              <p
                className="font-mono text-[0.65rem] tracking-[0.1em] uppercase mb-1"
                style={{ color: "var(--text-dim)" }}
              >
                {item.label}
              </p>
              {item.href ? (
                <a
                  href={item.href}
                  className="text-[0.95rem] no-underline"
                  style={{ color: item.gold ? "var(--gold)" : "var(--text-muted)" }}
                >
                  {item.value}
                </a>
              ) : (
                <p className="text-[0.95rem]" style={{ color: item.gold ? "var(--gold)" : "var(--text-muted)" }}>
                  {item.value}
                </p>
              )}
            </div>
          ))}

          <div className="flex flex-wrap gap-3 mt-8">
            <a
              href="https://github.com/sandeep226032"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[0.68rem] tracking-[0.06em] uppercase no-underline border px-4 py-2 rounded-[2px] inline-flex items-center gap-2 transition-all duration-200"
              style={socialLinkStyle}
              onMouseEnter={socialHover}
              onMouseLeave={socialLeave}
              aria-label="GitHub profile"
            >
              <Github size={13} aria-hidden="true" />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/sandeep-nandi-166394258/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[0.68rem] tracking-[0.06em] uppercase no-underline border px-4 py-2 rounded-[2px] inline-flex items-center gap-2 transition-all duration-200"
              style={socialLinkStyle}
              onMouseEnter={socialHover}
              onMouseLeave={socialLeave}
              aria-label="LinkedIn profile"
            >
              <Linkedin size={13} aria-hidden="true" />
              LinkedIn
            </a>
          </div>

          <div
            className="mt-8 rounded-[4px] border p-5"
            style={{ background: "var(--surface)", borderColor: "var(--border)" }}
          >
            <p
              className="font-mono text-[0.62rem] tracking-[0.1em] uppercase mb-2"
              style={{ color: "var(--gold)" }}
            >
              Response window
            </p>
            <p className="text-[0.9rem] leading-[1.65] mb-4" style={{ color: "var(--text-muted)" }}>
              Usually replies within 24 hours for backend roles, internship extensions, and project collaboration.
            </p>
            <a
              href="/resume_sandeep.pdf"
              download
              className="font-mono text-[0.68rem] tracking-[0.06em] uppercase no-underline border px-4 py-2 rounded-[2px] inline-flex items-center gap-2 transition-all duration-200"
              style={socialLinkStyle}
              onMouseEnter={socialHover}
              onMouseLeave={socialLeave}
            >
              <Download size={13} aria-hidden="true" />
              Download Resume
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35 }}
          className="rounded-[4px] border p-6 md:p-8"
          style={{ background: "var(--surface)", borderColor: "var(--border)" }}
        >
          <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              <div>
                <label
                  htmlFor="name"
                  className="font-mono text-[0.65rem] tracking-[0.1em] uppercase block mb-2"
                  style={{ color: "var(--text-dim)" }}
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "var(--gold-mid)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="font-mono text-[0.65rem] tracking-[0.1em] uppercase block mb-2"
                  style={{ color: "var(--text-dim)" }}
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                  style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "var(--gold-mid)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                />
              </div>
            </div>

            <div className="mb-5">
              <label
                htmlFor="subject"
                className="font-mono text-[0.65rem] tracking-[0.1em] uppercase block mb-2"
                style={{ color: "var(--text-dim)" }}
              >
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                required
                placeholder="What's this about?"
                value={form.subject}
                onChange={handleChange}
                style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = "var(--gold-mid)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="message"
                className="font-mono text-[0.65rem] tracking-[0.1em] uppercase block mb-2"
                style={{ color: "var(--text-dim)" }}
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="Tell me about the opportunity or project..."
                value={form.message}
                onChange={handleChange}
                style={{ ...inputStyle, resize: "none" }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "var(--gold-mid)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="w-full font-mono text-[0.78rem] tracking-[0.08em] uppercase px-6 py-4 rounded-[2px] border-none cursor-pointer transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                background: status === "success" ? "var(--sage)" : "var(--gold)",
                color: status === "success" ? "var(--bg)" : "var(--accent-contrast)",
              }}
              aria-label="Send message"
            >
              {status === "loading" && <LoaderCircle size={14} className="animate-spin" aria-hidden="true" />}
              {status === "success" && <CheckCircle2 size={14} aria-hidden="true" />}
              {(status === "idle" || status === "error") && <Send size={13} aria-hidden="true" />}
              {status === "idle" && "Send Message"}
              {status === "loading" && "Sending..."}
              {status === "success" && "Message Sent"}
              {status === "error" && "Try Again"}
            </button>

            {msg && (
              <p
                className="font-mono text-[0.72rem] text-center mt-3"
                style={{
                  color: status === "success" ? "var(--sage)" : "var(--danger)",
                }}
                role="alert"
                aria-live="polite"
              >
                {msg}
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
