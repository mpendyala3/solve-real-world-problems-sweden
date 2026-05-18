# Solve Real-World Problems Sweden

Solve Real-World Problems Sweden is a browser-based, Sweden-first founder intelligence site built with Next.js, React, and a static GitHub Pages export.
It turns a curated set of recurring Swedish pain points into a bilingual product-discovery experience for founders, operators, and researchers who want to build around real demand instead of abstract startup ideas.

## What it does

- Publishes a curated library of `200` founder-relevant problems across `20` Swedish categories
- Presents each problem in both Swedish and English
- Scores each problem with structured market and trust signals
- Highlights a Top 10 set of problem cards on the homepage
- Supports search across categories, titles, descriptions, and source families
- Lets visitors filter by category and inspect ranked problems in more detail
- Includes an `/architecture` page that explains the intended source-to-publication pipeline
- Includes `/privacy` and `/terms` routes for public-site policy coverage
- Includes a `/prototype` route for reviewing the main experience outside the canonical homepage
- Ships metadata routes for `manifest.webmanifest`, `robots.txt`, and `sitemap.xml`
- Exports to a static `docs/` build for GitHub Pages hosting

## Why it feels useful

- It frames Sweden-specific friction as founder opportunity, not as a generic complaint list
- It keeps the product lightweight: no backend, no database, no server runtime
- It makes the methodology legible enough for public trust through architecture and policy pages
- It uses bilingual copy throughout, so the same site can serve Swedish readers and international collaborators
- It ships as a static artifact, which keeps hosting and deployment simple

## Problem model

- The core dataset lives in `app/site-data.ts`
- The repo currently contains `20` categories with `10` problems each
- Each problem includes:
  - Swedish and English title
  - Swedish and English explanation
  - exact source labels
  - a score tuple used to derive a visible score breakdown
- The UI presents the data as a curated public catalogue rather than an editable or user-submitted system

## Routes

- `/` - primary homepage and canonical public experience
- `/prototype/` - alternate prototype view of the homepage experience
- `/architecture/` - methodology and platform blueprint
- `/privacy/` - public privacy policy
- `/terms/` - public terms of use

## Tech stack

- Next.js `15`
- React `19`
- TypeScript
- App Router
- Static export for GitHub Pages

## Deployment model

- Production hosting target is GitHub Pages
- `next.config.mjs` sets `output: 'export'`
- Production builds use the repo name as `basePath` and `assetPrefix`
- `npm run build:pages` builds the app to `out/` and then copies the export into `docs/`
- `docs/` is the deployment artifact committed to the repo

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build for GitHub Pages

```bash
npm run build:pages
```

This produces:

- `out/` - raw Next static export
- `docs/` - GitHub Pages-ready artifact, including `.nojekyll`

## Files

- `app/ClientHome.tsx` - main client-side homepage UI, bilingual copy, search, filtering, and navigation
- `app/site-data.ts` - curated category and problem dataset plus score helpers
- `app/site-config.ts` - canonical URL, metadata copy, and page title/description config
- `app/page.tsx` - homepage route metadata wrapper
- `app/prototype/page.tsx` - prototype route wrapper around the homepage UI
- `app/architecture/page.tsx` - architecture and methodology page
- `app/privacy/page.tsx` - privacy policy page
- `app/terms/page.tsx` - terms page
- `app/layout.tsx` - global metadata, fonts, JSON-LD, and root layout shell
- `app/globals.css` - full visual system and responsive styling
- `scripts/export-pages.mjs` - copies `out/` into `docs/` after export
- `public/` - icons and static assets used by the exported site
- `docs/` - committed GitHub Pages output
- `PROJECT-BRIEF.md` - product thesis and conceptual architecture for the project

## Notes

- The public site is static; the richer ingestion, compliance, clustering, and editorial workflow described on `/architecture` is currently documented as product direction rather than implemented backend infrastructure in this repo
- A standalone `public/architecture.html` artifact also exists, but the live app route is `app/architecture/page.tsx`
