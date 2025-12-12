# Phase: Long-term (1–2 months)

- [ ] Support multiple apps (admin/marketing/docs) sharing `@rp/ui`, auth/session, and config packages with clear boundaries.
- [ ] Introduce domain-driven packages (`@rp/auth`, `@rp/billing`, `@rp/notifications`) with stable API surfaces and versioning.
- [ ] Add background job runner abstraction (e.g., Upstash Q/Queue) for async tasks, cache invalidation, and scheduled jobs.
- [ ] Implement full OpenTelemetry tracing for API routes and server actions; export to vendor/collector with sampling controls.
- [ ] Integrate error tracking (Sentry) with source maps and user/session context; add runtime health/readiness endpoints where applicable.
- [ ] Enforce performance budgets (bundle size/Lighthouse) in CI; optimize shadcn/ui imports and Tailwind v4 CSS layer pruning.
- [ ] Adopt changesets or release-please for package versioning; publish ADRs for major architectural choices.
- [ ] Expand pre-commit automation: format-on-staged, markdown lint/spellcheck, dependency audit, and automated changelog generation.
