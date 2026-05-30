# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Package: `@rp/remote-config` — Remote Feature Flags / App Config

Fetches config from the `app_config` Supabase table. Server side caches results in-process for 5 minutes. Client side accesses the same data via React context.

## Exports

```ts
// Server Components / Route Handlers
import { getConfig } from "@rp/remote-config/server"
const config = await getConfig("web")              // appId matches src/config/api.config.ts

// Client Components — wrap the tree first
import { RemoteConfigProvider, useRemoteConfig } from "@rp/remote-config"
```

## Usage pattern

```tsx
// In a Server Component that wraps a client subtree:
const config = await getConfig("web")
return <RemoteConfigProvider value={config}>{children}</RemoteConfigProvider>

// Inside any Client Component in that tree:
const config = useRemoteConfig()
```

## Cache behaviour

`getConfig` uses a module-level `Map` with a 5-minute TTL. In serverless environments each instance has its own cache — cold starts will always fetch from Supabase. Do not rely on cache for high-frequency writes.

## `app_config` table schema

| Column | Type | Notes |
|---|---|---|
| `app_id` | text | matches the `appId` constant in the consuming app |
| `key` | text | config key name |
| `value` | jsonb | typed via `ConfigValue` union |
| `type` | text | `number \| boolean \| string \| object \| datetime` |
| `environment` | text | `development \| production \| test` |

## What NOT to do

- Do not import `@rp/remote-config/server` inside a `"use client"` file — it imports `server-only`.
- Do not use `useRemoteConfig()` outside a `RemoteConfigProvider` subtree — it will return `undefined`.
