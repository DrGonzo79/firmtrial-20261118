# Architecture

The Next.js App Router client imports the shared fictional fixture and deterministic TypeScript scorer, enabling a static GitHub Pages export with no network dependency. The same weighted operation is implemented as FastAPI `POST /score` and tested independently; it is source-only, not hosted.

Production evolution: object storage for encrypted artifacts; Postgres for cases, consent, reviews, scores, and append-only audit events; isolated workers for file parsing; OIDC/RBAC for firm and reviewer access; signed scorecard snapshots for publication. Never expose raw submissions on the public surface.

Observability must record case/rubric version, scorer version, latency, validation failures, reviewer overrides, appeal outcomes, score distribution shifts, and publication consent events. Alert on unexpected grade drift, cross-tenant access, missing audit events, and expired public scorecards.

Failure posture: reject malformed/out-of-range values; keep scoring deterministic; do not publish on incomplete evidence or reviewer conflict; preserve prior signed versions; show stale/expired status rather than silently recomputing.
