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
``

---

