# Turbo Mono v4 – Technical Improvement Plan

## Objectives
- Harden the Turborepo architecture for production workloads.
- Standardize shared packages (env, supabase, kv, remote-config, ui) for reuse across apps.
- Improve developer experience with consistent tooling and automated quality gates.
- Add production-grade observability, security, and caching patterns.

## Current Snapshot (from repo)
- Monorepo: Turborepo + Bun workspaces (`apps/web`, `packages/{ui,env,kv,remote-config,supabase}`).
- Frontend: Next.js 15 App Router, React 19, Tailwind v4, shadcn/ui with multi-theme.
- Integrations: Supabase init, Upstash Redis client, remote-config scaffolding, env validation.
- Tooling: Biome, Husky/commitlint, shared TS config, no visible test harness or CI workflow yet.

## Prioritized Roadmap

### Immediate (0–3 days)
- **Monorepo & Build**
  - Lock Bun version via `.tool-versions`/`.nvmrc` equivalent or `engines` in each package; add `.npmrc`/`.bunfig` mirrors to reduce install drift.
  - Add Turborepo task graph for `lint`, `typecheck`, `test`, `build` with explicit dependencies; ensure `packages/*` build output is cached.
- **Config & Secrets**
  - Expand `@rp/env` to separate `server`, `client`, and `edge` schemas; enforce `process.env` access only via this package.
  - Document required environment variables per environment (local/staging/prod) and add `.env.example`.
- **Supabase**
  - Create server-only Supabase client factory (edge vs node) with connection options and retry/backoff; centralize error logging.
  - Add typed RPC/query helpers with Zod validation and narrow return types to avoid `any`.
- **Redis / Cache**
  - Provide a cache utility with namespaced keys, TTL defaults, and `stale-while-revalidate` helper; add rate-limit helper for API routes.
- **DX**
  - Add preflight scripts: `bun lint`, `bun typecheck`, `bun test` (stub) in root `package.json`; wire to Husky pre-commit.
  - Introduce minimal Vitest setup (shared config) to enable targeted unit tests for utilities and env validation.
- **Docs**
  - Add runbooks for local dev (Bun install quirks), env setup, and package usage to `QUICK_START`/README links.

### Short-term (1–3 weeks)
- **Architecture & Packages**
  - Introduce a shared `@rp/config` package for constants (feature flag keys, cache TTLs, Supabase schema names).
  - Create `@rp/observability` (or `@rp/logging`) with pino/otel logger, request IDs, and structured logs usable in Next API routes and server components.
  - Extract theme tokens into a `@rp/ui-theme` file and generate Tailwind CSS variables; support per-tenant theme overrides.
- **Frontend**
  - Enforce server/client boundaries: default to Server Components; mark interactive shards with `'use client'` and isolate data fetching to server actions or route handlers.
  - Add layout composition patterns (marketing vs app shell) and route groups; standardize metadata and error/loading boundaries.
  - Build shared form primitives (field wrappers, zod resolvers) in `@rp/ui` to avoid duplication.
- **Supabase**
  - Add auth helpers (server session retrieval, RLS-aware policies) and middleware for protected routes.
  - Introduce migration workflow (Supabase CLI) and seed scripts; store generated types in `@rp/supabase/types`.
  - Implement remote config fetch with ETag, cache, and fallback to baked defaults; add feature flag evaluation helper.
- **Redis / Caching**
  - Add layered caching strategy: in-memory (per-request), Redis, and revalidate tags for ISR/Next cache; define invalidation hooks alongside Supabase mutations.
  - Provide idempotency keys for mutations to prevent double writes.
- **Security & Hardening**
  - Add rate limiting middleware (sliding window) for API routes; basic bot protection (UA filters) and input sanitization for user-generated content.
  - Implement headers baseline (CSP, CORP, COEP, Referrer-Policy, Permissions-Policy) via Next middleware.
- **CI/CD**
  - Add GitHub Actions: lint, typecheck, test, build matrix (node/bun), cache `.next` and Turbo; include Supabase migration validation.
  - Add preview deployments to Vercel with environment promotion gates.
- **Testing**
  - Add Vitest for units + React Testing Library for components; integrate MSW for API mocks.
  - Plan Playwright E2E smoke for core flows (auth, theming toggle, feature flag rendering).

### Long-term (1–2 months)
- **Scalability**
  - Multi-app support (admin/marketing/docs) sharing `@rp/ui` and auth/session packages.
  - Introduce domain-driven package boundaries (e.g., `@rp/auth`, `@rp/billing`, `@rp/notifications`) with clear API surfaces.
  - Add background job runner abstraction (e.g., Upstash Q/Stability) for async tasks and cache invalidation.
- **Observability & Operations**
  - Full OpenTelemetry tracing for Next API routes and server actions; export to vendor (e.g., Honeycomb/OTel collector).
  - Error tracking (Sentry) with source maps and user/session context.
  - Runtime health checks and readiness endpoints for edge functions where applicable.
- **Performance**
  - Bundle budget enforcement and automated Lighthouse runs on PRs; image/CDN strategy with next/image and remote patterns.
  - Optimize shadcn/ui tree-shaking via explicit imports and ensure CSS layer pruning in Tailwind v4.
- **Governance & DX**
  - Adopt changesets or release-please for versioning shared packages.
  - Add architectural decision records (ADRs) for major choices (auth, caching, observability).
  - Expand pre-commit with format-on-staged files and spellcheck/markdown lint for docs.

## Risks / Technical Debt
- Bun install stability on some environments (observed crashes) — mitigate with pinned version and CI cache or pnpm fallback.
- Missing automated tests/CI increases regression risk; prioritize enabling minimal test harness.
- Remote-config/cache currently lacks validation and observability; could serve stale or invalid data silently.
- Supabase/Redis clients may run on edge without guardrails; ensure server-only usage and proper secrets scoping.

## Recommended Best Practices (Implementation Notes)
- **Environment handling:** single source of truth via `@rp/env`; never read `process.env` directly in apps/packages.
- **Server boundaries:** keep data access in server actions/route handlers; pass serialized DTOs to client components.
- **Caching:** define TTL/keys centrally; pair mutations with invalidation; prefer `async localStorage` (request scope) before Redis.
- **Security:** enforce input validation (Zod schemas) at boundaries; add rate limits and CSRF/headers middleware; audit third-party keys via `.env.example`.
- **Logging/metrics:** per-request correlation IDs, structured logs, error classifications; wrap Supabase/Redis calls to emit metrics.
- **DX:** consistent tsconfig/eslint/biome presets shared via `@rp/typescript-config`; scripts for `dev`, `lint`, `typecheck`, `test`, `build` at root; minimal seed data for local dev.

## Conceptual Flows (textual)
- **Data Read:** Next server component ➜ fetch via Supabase client ➜ optional Redis read-through ➜ return typed DTO ➜ render UI.
- **Mutation:** Client action ➜ server action/route handler ➜ input validation (Zod) ➜ Supabase write ➜ Redis invalidation ➜ emit log/trace.
- **Feature Flag:** Request ➜ load remote config (cached + ETag) ➜ evaluate flag with context ➜ expose to client via serialized config ➜ update UI/layout guards.

