# SafeJew

**Data-driven safety intelligence for Jewish communities — mapped, filterable, and actionable in real time.**

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript) ![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green?logo=supabase) ![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?logo=vercel)

---

## Overview

SafeJew is a community safety analytics platform built specifically for the Jewish community. It aggregates incident reports from multiple verified sources — the Anti-Defamation League, the FBI, local law enforcement, and direct community submissions — and presents them in a unified, searchable, mappable interface.

The platform began in 2023 when co-founders Adrian Erlikhman and Michael Tarekegn, then high school students in Los Angeles, recognized that while antisemitic incidents were accelerating, the data infrastructure for tracking and responding to them was fragmented, outdated, and inaccessible to the people who needed it most.

SafeJew earned a $1,000 Teen Innovation Grant from JFEDLA (the Jewish Federation of Greater Los Angeles) and was distributed across JFEDLA's Greater LA network in partnership with the Community Security Initiative (CSI). Version 2 is a full rebuild — institutional-grade credibility, mobile-first design, and a dedicated campus module for university deployment through Hillel International.

### The Campus Pitch

A core feature of SafeJew V2 is the university deployment model. With over 850 Hillel chapters nationwide and 1 in 4 Jewish college students reporting antisemitism annually (Hillel International, 2023), campuses represent the most urgent deployment context. The campus module provides per-institution incident tracking, dedicated Hillel staff dashboards, and anonymized trend data for campus security administrators — with privacy by design at every layer.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3 |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Maps | Leaflet + react-leaflet |
| Charts | Recharts |
| Fonts | Inter (sans), Playfair Display (serif) via next/font |
| Deployment | Vercel |

---

## Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/your-org/safejew.git
cd safejew
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env.local
```

### 4. Demo mode (no Supabase required)

If you do not configure a Supabase project, SafeJew runs entirely on synthetic demonstration data. The incident map, campus map, and analytics all work with the built-in demo dataset. The reporting form simulates submission without writing to a database.

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app is fully functional in demo mode.

### 5. Full mode (live Supabase database)

Follow the Supabase Setup section below, populate `.env.local` with real credentials, and run:

```bash
npm run dev
```

---

## Supabase Setup

### Step 1 — Create a Supabase project

Go to [app.supabase.com](https://app.supabase.com), create a new project, and choose a region close to your users.

### Step 2 — Create the schema

In the Supabase dashboard, navigate to **SQL Editor** and run the contents of `supabase/schema.sql`. This creates the `incidents` and `campuses` tables with the correct column types, indexes, and Row Level Security policies.

### Step 3 — Seed demonstration data (optional)

To populate the database with the same synthetic incidents used in demo mode, run `supabase/seed.sql` in the SQL Editor. This is useful for development and testing.

### Step 4 — Copy API credentials

1. In the Supabase dashboard, go to **Project Settings → API**.
2. Copy the **Project URL** into `.env.local` as `NEXT_PUBLIC_SUPABASE_URL`.
3. Copy the **anon (public) key** into `.env.local` as `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
4. Copy the **service role key** into `.env.local` as `SUPABASE_SERVICE_ROLE_KEY`.

> The service role key bypasses Row Level Security. Never expose it to the browser. Never commit it to version control. It is used only in server-side API routes.

---

## Environment Variables

Create a `.env.local` file in the project root with the following variables:

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | For full mode | Your Supabase project URL (e.g., `https://abc.supabase.co`) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | For full mode | Supabase anon key — safe to expose to the browser |
| `SUPABASE_SERVICE_ROLE_KEY` | For full mode | Supabase service role key — server-side only, never expose |
| `NEXT_PUBLIC_DEMO_MODE` | Optional | Set to `true` to force demo mode even if Supabase is configured |

If `NEXT_PUBLIC_SUPABASE_URL` is absent, the app automatically enters demo mode.

---

## Demo Mode

Demo mode requires no database, no API keys, and no configuration. The following features work entirely on synthetic data:

- Incident map with all filters
- Campus map (Demo University, Westwood)
- Analytics and trend charts
- Per-incident detail popups

The reporting form in demo mode accepts submissions and displays a confirmation message, but does not persist data.

Demo mode is detected automatically:

```typescript
export const isDemoMode = (): boolean => {
  return process.env.NEXT_PUBLIC_DEMO_MODE === 'true' || !process.env.NEXT_PUBLIC_SUPABASE_URL;
};
```

---

## Deployment (Vercel)

### Step 1 — Connect your repository

Log in to [vercel.com](https://vercel.com), import your GitHub repository, and select the Next.js framework preset.

### Step 2 — Set environment variables

In the Vercel project dashboard, go to **Settings → Environment Variables** and add the three Supabase variables from the table above. Set them for the Production, Preview, and Development environments as appropriate.

The `SUPABASE_SERVICE_ROLE_KEY` must be marked as sensitive and never exposed to the client.

### Step 3 — Deploy

Click **Deploy**. Vercel automatically runs `npm run build` and deploys to a global CDN. Subsequent pushes to your main branch trigger automatic redeployment.

---

## Project Structure

```
safejew/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout — fonts, Nav, Footer
│   │   ├── page.tsx                # Landing page
│   │   ├── about/
│   │   │   └── page.tsx            # Founding story and team
│   │   ├── campus/
│   │   │   └── page.tsx            # Hillel / university pitch page
│   │   ├── map/
│   │   │   └── page.tsx            # Full incident map
│   │   └── report/
│   │       └── page.tsx            # Incident reporting form
│   ├── components/
│   │   ├── Nav.tsx                 # Site navigation
│   │   ├── Footer.tsx              # Site footer
│   │   ├── campus/
│   │   │   └── CampusMap.tsx       # Embedded campus incident map (Leaflet)
│   │   └── map/
│   │       └── IncidentMap.tsx     # Full incident map with filters (Leaflet)
│   ├── lib/
│   │   ├── demo-data.ts            # Synthetic incident dataset
│   │   └── supabase/
│   │       ├── client.ts           # Browser Supabase client
│   │       └── server.ts           # Server Supabase client (service role)
│   ├── middleware.ts               # Next.js middleware (auth routing)
│   └── types/
│       └── index.ts                # Shared TypeScript types
├── supabase/
│   ├── schema.sql                  # Database schema and RLS policies
│   └── seed.sql                    # Demo data seed
├── public/
├── tailwind.config.ts
├── next.config.ts
└── .env.example
```

---

## Database Schema

### `incidents`

Stores individual antisemitic incident reports.

| Column | Type | Description |
|---|---|---|
| `id` | uuid | Primary key |
| `category` | enum | `vandalism`, `harassment`, `assault`, `online_threat`, `other` |
| `description` | text | Incident description (user-submitted or sourced) |
| `occurred_at` | timestamptz | When the incident occurred |
| `neighborhood` | text | Neighborhood-level location name |
| `lat` | float8 | Latitude (neighborhood centroid — not exact address) |
| `lng` | float8 | Longitude (neighborhood centroid — not exact address) |
| `severity` | enum | `low`, `medium`, `high` |
| `source` | enum | `community`, `ADL`, `FBI`, `LAPD`, `CSI` |
| `status` | enum | `pending`, `verified`, `rejected` |
| `campus_id` | uuid (nullable) | Foreign key to `campuses` — null if not campus-associated |
| `created_at` | timestamptz | Record creation timestamp |

### `campuses`

Registry of university campuses with active SafeJew deployments.

| Column | Type | Description |
|---|---|---|
| `id` | uuid | Primary key |
| `name` | text | University name |
| `city` | text | City |
| `state` | text | State code |
| `lat` | float8 | Campus center latitude |
| `lng` | float8 | Campus center longitude |
| `hillel_contact` | text (nullable) | Email address of Hillel chapter contact |

---

## Privacy Design

SafeJew was designed from the beginning with the privacy of reporting individuals as a first-order constraint. The following principles are enforced at the data layer:

**Neighborhood-level location only.** The reporting form and all database records store a neighborhood-level centroid, not the exact address where an incident occurred. Users are shown a neighborhood selector, not a street-level pin. This is enforced at the application layer and cannot be bypassed through the API.

**Anonymous reporting by default.** No account is required to submit a report. Reporter contact information is optional and, when provided, is stored in a restricted column inaccessible to public-facing queries.

**Role-based data access.** Individual report details — including any optional contact information — are accessible only to authenticated administrators with the service role key. Public-facing API routes query only aggregate data and omit all personally identifying fields.

**Encrypted evidence storage.** If and when file evidence uploads are implemented, files are stored in Supabase Storage with server-side encryption. Presigned URLs are generated on demand by authenticated server-side routes; no file is publicly addressable.

**No third-party analytics on sensitive pages.** The reporting form does not load any third-party scripts. Session recording, behavioral analytics, and advertising trackers are prohibited on any page where a user may be describing a personal safety incident.

---

## Roadmap

| Initiative | Status |
|---|---|
| Verified data partnerships with ADL and JFEDLA | In progress |
| University pilot program — 3–5 LA Hillel chapters | Active outreach |
| Expand to 20+ campuses via Hillel regional network | 2026 |
| Mobile reporting application (iOS + Android) | 2026 |
| Hillel International national infrastructure integration | 2027 |
| ML-powered predictive risk modeling | Future release |
| Expansion beyond Greater Los Angeles | Dependent on data partnerships |

---

## Acknowledgments

SafeJew was built with support from and in partnership with the following organizations:

**JFEDLA — Jewish Federation of Greater Los Angeles** provided the Teen Innovation Grant that funded the first version of SafeJew and distributed it across the Greater LA network.

**Community Security Initiative (CSI)** — JFEDLA's dedicated community safety arm — provided distribution, feedback, and partnership during the initial rollout.

**Anti-Defamation League (ADL)** publishes the annual Audit of Antisemitic Incidents, which is a primary data source for verified incident information.

**Hillel International** provides the campus network context that makes the university partnership program possible. The statistic that 1 in 4 Jewish college students reports experiencing antisemitism annually is sourced from Hillel International's 2023 research.

---

*SafeJew is an independent platform built by Adrian Erlikhman and Michael Tarekegn. It is not affiliated with or endorsed by any of the organizations listed above unless explicitly stated.*
