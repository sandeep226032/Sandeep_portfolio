# Sandeep Nandi — Portfolio

A premium personal portfolio built with **Next.js 14 App Router**, **Tailwind CSS**, and **Framer Motion**.  
Editorial-industrial aesthetic: deep charcoal, amber gold accents, sharp typography (Syne + DM Mono + Figtree).

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Create your environment file
cp .env.example .env.local
# Edit .env.local with your Gmail credentials (see below)

# 3. Start dev server
npm run dev
# → http://localhost:3000
```

---

## Project Structure

```
├── app/
│   ├── layout.tsx          ← Root layout: fonts, SEO metadata, Open Graph
│   ├── page.tsx            ← Home page (assembles all sections)
│   ├── globals.css         ← CSS variables, base styles, utility classes
│   └── api/contact/
│       └── route.ts        ← POST /api/contact — Nodemailer handler
│
├── components/
│   ├── Nav.tsx             ← Fixed navbar + mobile hamburger
│   ├── Hero.tsx            ← Animated hero, stats row, CTA buttons
│   ├── About.tsx           ← Bio copy + info card
│   ├── Experience.tsx      ← MatchBest Group internship, 4 system cards
│   ├── Projects.tsx        ← StudHive (featured) + Bus Manzil
│   ├── Skills.tsx          ← Animated skill bars + badge groups
│   ├── Education.tsx       ← Degrees + certifications list
│   ├── Contact.tsx         ← Contact form wired to /api/contact
│   └── Footer.tsx
│
├── lib/
│   └── utils.ts            ← cn() class-name helper
│
├── public/
│   └── resume.pdf          ← ⬅ Add your resume PDF here
│
├── .env.example            ← Template for required env vars
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── postcss.config.js
```

---

## Contact Form (Nodemailer) Setup

The contact form at `/api/contact` sends email via SMTP using Nodemailer.

### Gmail Setup (recommended)

1. Enable **2-Step Verification** on your Google account  
   → https://myaccount.google.com/security

2. Go to **App Passwords** → create one for "Mail"  
   → https://myaccount.google.com/apppasswords

3. Copy the 16-character password into `.env.local`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=abcd efgh ijkl mnop        # ← App Password (no spaces needed)
SMTP_FROM="Sandeep Portfolio <your_email@gmail.com>"
CONTACT_TO_EMAIL=sandeep226032@saitm.org
```

### Other providers

| Provider    | SMTP_HOST               | SMTP_PORT |
|-------------|-------------------------|-----------|
| Gmail       | `smtp.gmail.com`        | 587       |
| Outlook     | `smtp.office365.com`    | 587       |
| Zoho        | `smtp.zoho.com`         | 587       |
| SendGrid    | `smtp.sendgrid.net`     | 587       |

The API route includes:
- Input validation (all fields required, valid email format)
- HTML sanitisation (no XSS via form inputs)
- In-memory rate limiting (3 requests / minute / IP)
- Styled HTML email template
- Plain-text fallback

---

## Placeholders to Replace

| File                   | Line / area               | What to update                      |
|------------------------|---------------------------|--------------------------------------|
| `components/Hero.tsx`  | `href="/resume.pdf"`      | Upload `resume.pdf` to `/public/`    |
| `components/Contact.tsx` | GitHub href             | Your actual GitHub profile URL       |
| `components/Contact.tsx` | LinkedIn href           | Your actual LinkedIn profile URL     |
| `components/Projects.tsx` | `githubUrl`            | Real GitHub repo URLs for each project |
| `components/Projects.tsx` | `demoUrl`              | Live demo URLs (or set to `null`)    |
| `app/layout.tsx`       | `openGraph.url`           | Your deployed domain                 |
| `app/layout.tsx`       | `openGraph.images`        | Add an OG image for link previews    |

### Adding a profile photo

1. Place your photo at `public/avatar.jpg`
2. In `components/About.tsx`, import and add:

```tsx
import Image from "next/image";

// Inside the info card, before the first row:
<div className="flex justify-center mb-6">
  <Image
    src="/avatar.jpg"
    alt="Sandeep Nandi"
    width={80}
    height={80}
    className="rounded-full border-2"
    style={{ borderColor: "var(--gold-mid)" }}
    priority
  />
</div>
```

---

## Adding More Projects

In `components/Projects.tsx`, add a new entry to the `projects` array:

```ts
{
  num: "03",
  featured: false,
  name: "Your Project Name",
  tagline: "Short tagline",
  desc: "Brief description of the project.",
  features: [],           // bullet points — leave empty if not needed
  stack: ["Node.js", "MongoDB"],
  githubUrl: "https://github.com/...",
  demoUrl: null,
},
```

---

## Production Build

```bash
npm run build    # type-check + optimise
npm start        # serve production build locally
```

---

## Deploy to Vercel (recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard:
# Project Settings → Environment Variables
# Add: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM, CONTACT_TO_EMAIL
```

Or connect your GitHub repo to Vercel for automatic deploys on push.

---

## Performance & SEO

- **Fonts**: loaded via `next/font/google` with `display: swap` — zero layout shift
- **Images**: use `next/image` for all photos (auto-optimised, lazy-loaded)
- **Animations**: Framer Motion with `once: true` on `useInView` — only animate on enter, never re-trigger
- **Metadata**: `title`, `description`, `keywords`, `openGraph`, `twitter` set in `app/layout.tsx`
- **Semantic HTML**: `<main>`, `<nav>`, `<section>` with `aria-labelledby`, `<footer role="contentinfo">`
- **Accessibility**: focus rings on all interactive elements, `aria-label` on icon buttons, `role="progressbar"` on skill bars

---

## Customisation

### Colours (CSS variables in `globals.css`)

```css
--gold:    #E8B84B   /* amber accent — change to any colour */
--sage:    #5A8F7B   /* stack tag colour */
--bg:      #080808   /* page background */
--surface: #111111   /* card background */
```

### Fonts (in `app/layout.tsx`)

The current set: **Syne** (headings) · **DM Mono** (labels/chips) · **Figtree** (body)

To change, import a different Google Font and update `--font-*` variables.

---

Built with Next.js 14 · Tailwind CSS · Framer Motion · Nodemailer