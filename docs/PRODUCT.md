# Product plan

## ICP and JTBD

Primary ICP: 5–50 person US accounting firms using AI in bookkeeping/client service and pursuing more sophisticated buyers. JTBD: “Before I market or assure our AI-enabled quality, expose gaps in our actual work and give me credible, comparable evidence.” Audience: controllers and small-business owners evaluating providers.

## MVP

One synthetic month-end close, versioned rubric, structured submission, qualified reviewer workflow, private scorecard, explicit publication consent, and six-month expiry. This demo ships the scoring/ranking/inspection vertical slice. It excludes real firm claims, document uploads, payment, matching, and AI-generated judgments.

## Data model

`CaseVersion` owns fixtures and expected outcomes; `Firm` owns consent; `Submission` links firm/case and immutable artifacts; `CriterionResult` stores reviewer evidence and score; `Exception` stores severity/remediation; `Scorecard` stores rubric version, expiry, publication state, and reviewer identity. Audit events append every change.

## AI/model strategy

No model is needed for the first paid wedge. Deterministic checks and credentialed review establish the gold set. Later, models may propose classifications or summarize evidence, but cannot set the published score. Store prompt/model versions, citations, confidence, and reviewer overrides; measure agreement, false-pass rate, and subgroup drift.

## Economics

Validate the report’s $750 assessment with five paid pilots. At 6 reviewer hours and $85 loaded hourly cost, gross profit is only $240 (32%); the method must reach 3 hours for $495 (66%) before scaling. A $250 retest can work only if evidence collection is mostly reused. Treat $149/mo intros and $299 placement as unproven and editorially risky.

## Validation and moat

Success in 30 days: 30 qualified outreaches, 10 calls, 5 firms attempting the case, 3 paying $750, 2 consenting to named publication, and 1 buyer using results in diligence. Kill if zero paid pilots after 30 qualified conversations. The defensible asset is a credentialed reviewer brand plus longitudinal benchmark corpus and trusted methodology—not the scoring UI.

## 30/60/90

- **30:** interview, version synthetic case/rubric, sell five private pilots, log completion cost.
- **60:** publish consenting results and methodology, instrument buyer engagement, retest rubric reliability.
- **90:** choose private readiness, media/affiliate, or methodology licensing based on paid behavior; do not add marketplace mechanics without buyer pull.

## Risks

Defamation/advertising claims, CPA board rules, leaked client data, gaming, reviewer conflicts, AICPA/AIUC category capture, low firm consent, and false precision. Controls: synthetic inputs, qualified reviewers, evidence links, appeals, conflict disclosures, consent gates, score expiry, versioned rubrics, and no pay-to-score.
