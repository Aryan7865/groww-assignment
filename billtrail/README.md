# BillTrail — demo prototype

A consumer-owned electricity grievance record builder. Static web app, no backend.

## Run locally

```bash
npm install
npm run dev     # http://localhost:5173
npm run build   # produces /dist for hosting
```

## Deploy

**Vercel (one click):** `npm i -g vercel && vercel --prod` from this folder, or import the repo on vercel.com. Framework auto-detects as Vite.

**Netlify:** drag-and-drop the `dist/` folder.

**GitHub Pages / any static host:** upload `dist/` as the web root.

## What's inside

- **Home** — case status, what needs attention, latest bill, completeness
- **Bills** — 13 months of synthetic data with source-labelled figures
- **Analyse** — one-chart-at-a-time comparison + neutral observations
- **My Case** — grievance timeline, open questions, evidence vault, export preview
- **Take the tour** — 6-step walkthrough, auto-opens on first visit

All data is synthetic and anonymised (see `src/data.js`). No network calls.
