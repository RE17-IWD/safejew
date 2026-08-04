# Auto-updating the data

SafeJew refreshes its numbers with **two complementary pipelines**.

## A — Daily machine fetch (GitHub Action)

- **What:** `.github/workflows/update-data.yml` runs `scripts/fetch-data.mjs` every day
  (~6 AM PT) and also on demand from the **Actions** tab.
- **What it does:** checks machine-readable sources (e.g. FBI Crime Data Explorer),
  writes a snapshot to `src/data/auto-updated.json`, and commits it if anything changed.
  Vercel then auto-deploys.
- **Safety:** it **never** overwrites the hand-curated, cited figures in
  `src/data/hate-crime-stats.ts`. Each source is wrapped in try/catch, and the job
  exits green even if a source is unreachable.
- **Extend it:** add a fetcher to the `SOURCES` array in `scripts/fetch-data.mjs`.
  Sources with clean APIs (FBI CDE, LA City / Socrata open-data portals) belong here.

No secrets are required for the default FBI endpoint. If you add a source that needs a
key, put it in **GitHub → Settings → Secrets → Actions** and read it via `process.env`.

## B — Daily intelligent refresh (Claude routine)

Most authoritative sources (ADL Audit, LA County HRC, CA DOJ) publish **annual PDF
reports**, not APIs — so they can't be scraped reliably. Pipeline B handles those:

- A **scheduled Claude Code routine** runs daily, searches the official sources for new
  releases or incidents, updates the cited numbers in `src/data/hate-crime-stats.ts`
  (and the `NOTABLE_*` incident list), and opens a commit/PR.
- **Enable it** once the GitHub connector is authorized:
  ```
  /schedule daily 6:30am  "Check ADL, LA County HRC, CA DOJ, LAPD, and recent LA
  antisemitism news for anything newer than DATA_COMPILED in
  src/data/hate-crime-stats.ts. Update the cited figures + NOTABLE_2026, bump
  DATA_COMPILED, and open a PR. Never fabricate numbers; cite every source."
  ```
- The routine commits like any contributor; review its PR before it deploys, or let it
  push to `main` if you trust it.

## Manual refresh

Run the fetcher locally anytime:

```bash
node scripts/fetch-data.mjs
```
