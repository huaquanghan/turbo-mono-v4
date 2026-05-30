# turbomonokit

A production-ready monorepo starter built with Turborepo, Bun, and Next.js. Includes a shared component library, type-safe env validation, Supabase integration, Upstash Redis, and a remote config system — wired together and ready to extend.

## Stack

| Layer | Technology |
|---|---|
| Runtime / Package manager | Bun 1.3.11 |
| Monorepo orchestration | Turborepo 2 |
| Web framework | Next.js 16 (App Router, Turbopack) |
| UI components | Radix UI + Tailwind CSS v4 (shadcn-style) |
| Database | Supabase (Postgres + SSR client) |
| KV / Rate-limiting | Upstash Redis |
| Remote config / Feature flags | Custom `@rp/remote-config` backed by Supabase |
| Env validation | T3 Env (`@t3-oss/env-nextjs`) + Zod |
| Linting & formatting | Biome |
| Commit convention | commitlint (custom: ≥ 15 chars, ends with `.`) |
| Git hooks | Husky |
| CI | GitHub Actions + Pullfrog |

## Repository structure

```
apps/
  web/                  Next.js app — the primary consumer of all packages

packages/
  ui/                   @rp/ui     — shared component library
  env/                  @rp/env    — centralised, type-safe env variables
  supabase/             @rp/supabase — Supabase client, queries, mutations
  kv/                   @rp/kv     — Upstash Redis client + rate-limiter
  remote-config/        @rp/remote-config — remote config with SSR + React context

toolings/
  typescript-config/    @rp/typescript-config — shared tsconfig presets
```

## Getting started

**Prerequisites:** Bun ≥ 1.3.11

```bash
# Install dependencies
bun install

# Start all apps in dev mode
bun dev

# Build everything (respects Turborepo dependency order)
bun build
```

## Environment variables

Copy `.env.example` (if present) to `.env.local` inside `apps/web/`. All variables are declared and validated in `packages/env/src/index.ts`.

| Variable | Required | Description |
|---|---|---|
| `NODE_ENV` | — | `development` / `production` / `test` (defaults to `development`) |
| `NEXT_PUBLIC_APP_URL` | No | Public URL of the web app |
| `DATABASE_URL` | No | Postgres connection URL |
| `UPSTASH_REDIS_REST_URL` | Yes (for KV) | Upstash Redis REST URL |
| `UPSTASH_REDIS_REST_TOKEN` | Yes (for KV) | Upstash Redis REST token |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes (for Supabase) | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes (for Supabase) | Supabase anon/public key |

To add a new variable, declare it in `packages/env/src/index.ts` — this is the single source of truth.

## Packages

### `@rp/ui`

Shared component library built on Radix UI primitives, styled with Tailwind CSS v4 and `class-variance-authority`. Components follow the shadcn/ui pattern — they are source files you own and edit, not an opaque dependency.

```ts
import { Button, buttonVariants } from "@rp/ui/components/button"
import { cn } from "@rp/ui/lib/utils"
```

Global styles are exported as `@rp/ui/globals.css` and imported once at the app root.

### `@rp/supabase`

Supabase helpers with strict server/client separation enforced by `server-only`.

```ts
// Server components / Route handlers / Middleware
import { createClient } from "@rp/supabase/server"

// Client components
import { createClient } from "@rp/supabase/client"

// Middleware
import { updateSession } from "@rp/supabase/middleware"

// Pre-built queries and mutations
import { ... } from "@rp/supabase/queries"
import { ... } from "@rp/supabase/mutations"
```

The `app_config` table is managed through `createAppConfigModel`, which powers `@rp/remote-config`.

### `@rp/kv`

Upstash Redis client with a pre-configured rate-limiter (10 requests / 10 s fixed window).

```ts
import { client } from "@rp/kv/client"           // raw Redis client
import { ratelimit } from "@rp/kv/ratelimit"       // pre-configured Ratelimit instance
```

Both modules are server-only.

### `@rp/remote-config`

Typed remote configuration backed by Supabase's `app_config` table. Server-side values are cached in-process for 5 minutes.

```ts
// Server component
import { getConfig } from "@rp/remote-config/server"
const config = await getConfig("my-app")

// Client component — wrap the tree with the provider
import { RemoteConfigProvider, useRemoteConfig } from "@rp/remote-config"
```

### `@rp/env`

Validated, typed access to environment variables. Import `env` instead of `process.env` anywhere in the codebase.

```ts
import { env } from "@rp/env"
console.log(env.NEXT_PUBLIC_APP_URL)
```

## Development commands

```bash
bun dev                          # start all apps
bun build                        # production build
bun lint                         # biome lint (all workspaces)
bun format                       # biome format (entire repo)
turbo check-types                # TypeScript type-check all packages

# Scope a command to one package
bun --filter=web dev
bun --filter=@rp/ui lint
```

## Code style

- **Formatter**: Biome — tabs, double quotes, no trailing commas, line width 100.
- **Imports**: Biome auto-sorts imports on format.
- **Tailwind class sorting**: enforced via Biome nursery rule for `clsx`, `cva`, and `tw` functions.

## Commit convention

Commits are validated by commitlint with two rules:

1. Header must be **at least 15 characters** long.
2. Header must **end with a period**.

```
# Valid
feat: add user authentication flow.
fix: correct date formatting in invoice PDF.

# Invalid (too short, no period)
fix: typo
```

## CI

The repository uses a **Pullfrog** GitHub Actions workflow (`.github/workflows/pullfrog.yml`) that can dispatch an AI agent against the repo. Trigger it manually from the Actions tab with a `prompt` input.
