# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Package: `@rp/supabase` — Supabase Helpers

Database client with strict server/client separation. The `server-only` guard causes a build-time error if server code is accidentally imported into a Client Component.

## Import paths — critical boundary

```ts
// Server Components, Route Handlers, Server Actions, Middleware
import { createClient } from "@rp/supabase/server"
import { updateSession } from "@rp/supabase/middleware"

// Client Components only
import { createClient } from "@rp/supabase/client"

// Pre-built queries (server — includes @ts-nocheck sections, in progress)
import { getUserQuery } from "@rp/supabase/queries"
import { listConfig } from "@rp/supabase/queries/config"
import { listDomains } from "@rp/supabase/queries/domains"

// Pre-built mutations (server)
import { upsertConfig, deleteConfig } from "@rp/supabase/mutations/config"
import { ... } from "@rp/supabase/mutations/domains"

// App config model (used internally by @rp/remote-config)
import { createAppConfigModel } from "@rp/supabase/app-config"

// Types
import type { Database } from "@rp/supabase/types"
```

## ORM helper

`createOrm<TRow>(supabase, tableName)` returns `getById`, `list`, `create`, `update`, `delete` — use it as a base for new table models instead of writing raw queries each time.

## Database types

Generated types live in `src/types/db.ts`. Regenerate with the Supabase CLI after schema changes:

```bash
supabase gen types typescript --linked > packages/supabase/src/types/db.ts
```

## What NOT to do

- Never import `@rp/supabase/server` in a file that has `"use client"` — the `server-only` package will throw.
- Do not call `cookies()` outside of a request context (e.g. in module scope) — pass the cookie store explicitly via `createClient({ cookies })` when needed.
- The `@ts-nocheck` at the top of query/mutation files is intentional while types are being wired up. Do not remove it until `Database` types are fully propagated.
