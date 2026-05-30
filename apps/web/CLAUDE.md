# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Package: `web` — Next.js App

App Router application. The primary consumer of all `@rp/*` packages.

## Key conventions

- **Env vars**: Never read `process.env` directly. Import from `@/env` (which re-exports from `@rp/env`).
- **Global providers**: `ThemeProvider`, `TooltipProvider`, and `Toaster` are mounted once in `src/components/providers.tsx`. Don't duplicate them in routes.
- **App ID**: The edge runtime identifier is `"web"`, declared in `src/config/api.config.ts`. Used by `@rp/remote-config` to scope config keys.
- **`@rp/ui` transpile**: The Next.js config transpiles `@rp/ui` via `transpilePackages`. Do not add a build step to `@rp/ui` — source is consumed directly.

## Folder layout

```
src/
  app/          App Router — layouts, pages, API routes
    api/        Route handlers (edge runtime)
    domains/    Example domain feature slice
  components/   App-level components (not shared — those live in @rp/ui)
  config/       App-wide constants (api.config.ts, etc.)
  hooks/        App-level hooks
  lib/          App-level utilities
  env.ts        Re-exports env from @rp/env — single import point
```

## Import paths

```ts
import { env } from "@/env"                         // always use this, not process.env
import { Button } from "@rp/ui/components/button"   // path-mapped component imports
import { cn } from "@rp/ui/lib/utils"
```

## What NOT to do

- Do not import from `@rp/supabase/server` inside a Client Component — `server-only` will throw at build time.
- Do not add route-level `ThemeProvider` — it's already in `Providers`.
- Do not read env vars inline; add them to `@rp/env` first.
