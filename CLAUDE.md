# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Stack

Next.js 15, React 19, TypeScript, App Router. Static export deployed to GitHub Pages.

## Commands

```bash
npm install          # install dependencies
npm run dev          # local dev server at http://localhost:3000
npm run build        # standard Next.js build
npm run build:pages  # build + copy export into docs/ for GitHub Pages
npm run lint         # ESLint via next lint
```

## Architecture

The app is a fully static site — no backend, no database, no server runtime.

**Core data flow:**
- `app/site-data.ts` — the entire dataset: 20 categories × 10 problems each, with bilingual (Swedish + English) copy, source labels, and score tuples
- `app/ClientHome.tsx` — main client component: search, filtering, category navigation, bilingual rendering
- `app/site-config.ts` — canonical URL, page metadata, titles and descriptions

**Routes** (all statically exported):
- `/` — homepage with Top 10 and full problem catalogue
- `/prototype/` — alternate view of the homepage experience
- `/architecture/` — methodology page
- `/privacy/` and `/terms/` — policy pages

**Deployment:**
- `next.config.mjs` sets `output: 'export'` with the repo name as `basePath` and `assetPrefix`
- `npm run build:pages` runs `scripts/export-pages.mjs` which copies `out/` → `docs/`
- `docs/` is committed and served by GitHub Pages — do not delete it

**Score model** (defined in `app/site-data.ts`):
Each problem has a score tuple covering Severity, Frequency, Whitespace, TAM, Trygghet, Sustainability Alignment, Välfärd Friction, Digital Infrastructure Readiness, Integration & Inclusion, and Lagom Adoption, combined into a composite Problem Score.
