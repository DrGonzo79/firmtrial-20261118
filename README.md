# FirmTrial

Runnable prototype of **The AI Accountant Test**: compare fictional accounting-firm submissions on the same synthetic close using a transparent weighted rubric. The public demo is a static Next.js export. A matching FastAPI implementation is tested source code and is **not publicly deployed**.

## What works

- Edit four evidence dimensions and exception flags for each fictional firm.
- Add/remove submissions, validate input, rank scorecards, and inspect evidence/caveats.
- Matching deterministic Python `/score` operation with boundary and ranking tests.
- Responsive static export with repo-aware GitHub Pages paths.

## Run

Requires Node `26.13.1` and Python 3.12+.

```bash
npm ci
npm run dev
uv sync --directory api --frozen
uv run --directory api uvicorn main:app --reload
```

## Verify

```bash
npm run typecheck && npm audit --audit-level=high && npm run test:e2e && npm run build
uv run --directory api pytest && uv run --directory api pip-audit
```

All firms, records, evidence, and scores are fictional. This is not accounting advice, a certification, or an AICPA/AIUC credential. Source thesis: [IdeaBrowser Idea of the Day](https://www.ideabrowser.com/hub/ideas/today), November 18, 2026.
