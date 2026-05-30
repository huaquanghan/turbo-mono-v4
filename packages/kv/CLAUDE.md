# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Package: `@rp/kv` — Upstash Redis + Rate Limiting

Server-only. Both exports are guarded by `server-only` and will throw at build time if imported in Client Components.

## Exports

```ts
import { client } from "@rp/kv/client"       // raw Upstash Redis instance
import { ratelimit } from "@rp/kv/ratelimit"  // pre-configured Ratelimit (10 req / 10 s fixed window)
```

## Rate limit config

Default: **10 requests per 10-second fixed window**, defined in `src/ratelimit.ts`:

```ts
export const config = { limit: 10, window: "10s" } as const
```

To use a different limit, instantiate `Ratelimit` directly with `client` rather than changing the default — the default is intentionally shared.

## Required env vars

```
UPSTASH_REDIS_REST_URL
UPSTASH_REDIS_REST_TOKEN
```

These are read directly from `process.env` (not via `@rp/env`) because this package has no Next.js dependency.

## What NOT to do

- Do not import from this package in Client Components or browser-executed code — `server-only` will error.
- Do not change the default `ratelimit` config without checking all call sites across the monorepo.
