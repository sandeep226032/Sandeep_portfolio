import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

/**
 * POST /api/contact
 * Sends an email via Nodemailer when the contact form is submitted.
 *
 * Required environment variables (set in .env.local):
 *   SMTP_HOST        — e.g. smtp.gmail.com
 *   SMTP_PORT        — e.g. 587
 *   SMTP_USER        — your sending email address
 *   SMTP_PASS        — your email password or app password
 *   SMTP_FROM        — display name + address, e.g. "Portfolio <you@email.com>"
 *   CONTACT_TO_EMAIL — where to receive messages, e.g. sandeep226032@saitm.org
 */

// Input validation schema (manual, no extra deps)
function validate(body: unknown): body is {
  name: string;
  email: string;
  subject: string;
  message: string;
} {
  if (typeof body !== "object" || body === null) return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.name === "string" && b.name.trim().length > 0 &&
    typeof b.email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email) &&
    typeof b.subject === "string" && b.subject.trim().length > 0 &&
    typeof b.message === "string" && b.message.trim().length > 0
  );
}

// Rate limiting — simple in-memory store (use Redis/Upstash in production)
const rateLimitMap = new Map<string, { count: number; ts: number }>();
const RATE_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT = 3; // max 3 submissions per minute per IP

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now - entry.ts > RATE_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, ts: now });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  // Get client IP for rate limiting
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!validate(body)) {
    return NextResponse.json(
      { error: "Please fill all fields with valid information." },
      { status: 400 }
    );
  }

  const { name, email, subject, message } = body;

  // Sanitize inputs (strip potential HTML)
  const safe = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  // Create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // HTML email template
  const html = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="font-family:system-ui,sans-serif;background:#f9f9f9;padding:40px;">
      <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:6px;overflow:hidden;border:1px solid #e5e5e5;">
        <div style="background:#080808;padding:24px 28px;">
          <p style="color:#E8B84B;font-family:monospace;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;margin:0 0 4px;">New Portfolio Message</p>
          <h1 style="color:#F0EBE0;font-size:20px;margin:0;font-weight:700;">Contact Form Submission</h1>
        </div>
        <div style="padding:28px;">
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="font-family:monospace;font-size:11px;text-transform:uppercase;color:#999;padding:8px 0;width:80px;">From</td>
              <td style="font-size:14px;color:#111;padding:8px 0;font-weight:500;">${safe(name)}</td>
            </tr>
            <tr>
              <td style="font-family:monospace;font-size:11px;text-transform:uppercase;color:#999;padding:8px 0;">Email</td>
              <td style="font-size:14px;padding:8px 0;"><a href="mailto:${safe(email)}" style="color:#E8B84B;">${safe(email)}</a></td>
            </tr>
            <tr>
              <td style="font-family:monospace;font-size:11px;text-transform:uppercase;color:#999;padding:8px 0;">Subject</td>
              <td style="font-size:14px;color:#111;padding:8px 0;">${safe(subject)}</td>
            </tr>
          </table>
          <hr style="border:none;border-top:1px solid #eee;margin:20px 0;">
          <p style="font-family:monospace;font-size:11px;text-transform:uppercase;color:#999;margin-bottom:12px;">Message</p>
          <p style="font-size:15px;color:#333;line-height:1.75;white-space:pre-line;">${safe(message)}</p>
        </div>
        <div style="background:#f9f9f9;padding:16px 28px;border-top:1px solid #eee;">
          <p style="font-family:monospace;font-size:11px;color:#999;margin:0;">Sent from sandeep-portfolio contact form</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM ?? `"Portfolio" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      html,
      text: `From: ${name} <${email}>\nSubject: ${subject}\n\n${message}`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Nodemailer error:", err);
    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 }
    );
  }
}
