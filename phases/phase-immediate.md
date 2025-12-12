# Phase: Immediate (0–3 days)

- [ ] Pin Bun/tool versions across workspace (`engines`, `.tool-versions`/`.bun-version`) and document install fallback.
- [ ] Define Turborepo task graph for `lint`, `typecheck`, `test`, `build` with package deps; enable remote cache.
- [ ] Expand `@rp/env` to separate `server`/`client`/`edge` schemas and forbid direct `process.env` usage.
- [ ] Publish `.env.example` per environment (local/stage/prod) with required Supabase/Redis keys and defaults.
- [ ] Add Supabase client factories (node vs edge) with retry/backoff, typed errors, and centralized logging hook.
- [ ] Create Redis cache helpers: namespaced keys, TTL presets, `stale-while-revalidate`, and rate-limit util for API routes.
- [ ] Add root scripts `bun lint`, `bun typecheck`, `bun test` (Vitest stub) and wire to Husky pre-commit.
- [ ] Introduce minimal Vitest config shared via `@rp/typescript-config`; add first unit test for env validation.
- [ ] Update QUICK_START/README with local dev runbook (Bun quirks, env setup, package graph).
