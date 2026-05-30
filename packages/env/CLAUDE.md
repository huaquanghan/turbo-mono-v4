# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Package: `@rp/env` — Type-safe Environment Variables

Single source of truth for all env vars across the monorepo. Built with `@t3-oss/env-nextjs` and Zod.

## Adding a variable

Edit `src/index.ts` only. Three sections:

```ts
const shared = { ... }   // available on both server and client
const client = { ... }   // must be prefixed NEXT_PUBLIC_
const server = { ... }   // server-only, never exposed to client bundle
```

Then add client vars to `experimental__runtimeEnv` as well — T3 Env requires explicit opt-in there.

## Consuming

```ts
import { env } from "@rp/env"
env.DATABASE_URL        // typed, validated at startup
env.NEXT_PUBLIC_APP_URL
```

In `apps/web`, the re-export at `src/env.ts` means you can import from `@/env` instead.

## Validation behaviour

- Validation is **skipped** when `process.env.CI` is set or when `npm_lifecycle_event === "lint"`.
- Missing required vars throw at app startup, not at the call site.

## What NOT to do

- Do not add Zod schemas for vars that don't exist yet — undefined vars cause validation failures on other developers' machines.
- Do not read `process.env.*` directly anywhere in the codebase; always go through `env`.
