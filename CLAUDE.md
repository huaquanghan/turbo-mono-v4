# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands use `bun` as the package manager and `turbo` as the task runner.

```bash
# Dev
bun dev                        # start all apps in dev mode (Turbopack)
bun dev --filter=web           # start only the web app

# Build
bun build                      # build all packages/apps in dependency order

# Lint & Format
bun lint                       # biome lint (all workspaces via turbo)
bun format                     # biome format (entire repo)

# Type-check
turbo check-types              # runs tsc --noEmit across all packages

# Single package
bun --filter=@rp/ui lint       # run a script scoped to one package
```

There is no test runner configured yet.

## Architecture

This is a **Turborepo monorepo** using Bun workspaces.

```
apps/
  web/           Next.js 16 app (Turbopack dev, App Router)
packages/
  ui/            Shared component library — shadcn/ui style, Radix UI, Tailwind v4
  env/           Type-safe env validation (@t3-oss/env-nextjs + zod)
  supabase/      Supabase client helpers (server, client, middleware, queries, mutations)
  kv/            Upstash Redis client + rate-limiting (@upstash/ratelimit)
  remote-config/ Feature flags / remote config — server fetch + React context client
toolings/
  typescript-config/  Shared tsconfig presets (base, nextjs, react-library)
```

### Package naming

All internal packages are scoped as `@rp/*` and referenced as `workspace:*` dependencies.

### Key conventions

- **Linting/formatting**: Biome only — no ESLint, no Prettier for `.ts/.tsx`. Biome config is at the root `biome.json`. Formatter uses tabs, double quotes, no trailing commas, line width 100.
- **Commits**: commitlint enforces header ≥ 15 chars and **must end with a period** (e.g. `feat: add login page.`).
- **`@rp/ui`**: Components live in `packages/ui/src/components/`. Exports are path-mapped (`@rp/ui/components/<name>`). The web app transpiles this package via `transpilePackages` in `next.config.mjs`.
- **`@rp/supabase`**: Separate exports for `./server` (uses `server-only`), `./client`, `./middleware`, `./queries`, `./mutations`, and more. Always import from the correct sub-path to avoid leaking server code to the client.
- **`@rp/env`**: Single source of truth for env variables. Add new vars here and re-export from `@rp/env`. Validation is skipped in CI and during lint.
- **`@rp/remote-config`**: Server config is fetched in RSC via `./server`, client-side access via React context (`./client`). Use `RemoteConfigProvider` to wrap client components.
