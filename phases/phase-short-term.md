# Phase: Short-term (1–3 weeks)

- [ ] Add shared `@rp/config` package for constants (feature flags, TTLs, Supabase schemas) consumed by apps/packages.
- [ ] Create `@rp/observability` with structured logger (pino/otel), request IDs, and wrappers for Supabase/Redis calls.
- [ ] Extract theme tokens to `@rp/ui` (or `@rp/ui-theme`) and generate Tailwind CSS variables; support tenant overrides.
- [ ] Enforce server/client boundaries: default server components; isolate interactive shards with `'use client'`; move data fetching to server actions/route handlers.
- [ ] Introduce layout patterns (marketing vs app shell) using route groups; standardize metadata/error/loading boundaries.
- [ ] Build shared form primitives (field wrapper + zod resolver helpers) in `@rp/ui` to remove duplication.
- [ ] Implement Supabase auth helpers (session retrieval, RLS-aware checks) and middleware for protected routes.
- [ ] Add Supabase migration + seed workflow; publish generated types to `@rp/supabase/types`.
- [ ] Ship remote config fetch with ETag/caching/fallback defaults and feature-flag evaluator with context.
- [ ] Layered caching: request-scope cache + Redis + Next revalidation tags; pair mutations with invalidation hooks and idempotency keys.
- [ ] Security middleware: rate limits (sliding window), baseline headers (CSP/CORP/COEP/Permissions-Policy), and input sanitization for user content.
- [ ] CI/CD: GitHub Actions for lint/typecheck/test/build matrix (node/bun), cache turbo/.next, validate migrations, and Vercel preview deploys with env promotion gates.
- [ ] Testing: Vitest + React Testing Library + MSW for units/integration; plan Playwright smoke for auth, theming toggle, feature-flag rendering.
