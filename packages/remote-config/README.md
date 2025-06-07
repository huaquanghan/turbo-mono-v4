# `@rp/remote-config`

Remote configuration utilities backed by Supabase. This package exposes
helpers for reading configuration values on both the server and the
client.

## Installation

```bash
bun add @rp/remote-config
```

## Usage

### Server

```ts
import { getConfig } from '@rp/remote-config/server'

const config = await getConfig('my-app')
```

### Client

```ts
'use client'
import { useRemoteConfig, RemoteConfigProvider } from '@rp/remote-config/client'

export default function Example() {
  const config = useRemoteConfig('my-app')
  return <pre>{JSON.stringify(config, null, 2)}</pre>
}
```

Alternatively, wrap your application in `RemoteConfigProvider` to expose the
values through context:

```tsx
'use client'
import { RemoteConfigProvider, useRemoteConfigContext } from '@rp/remote-config/client'

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <RemoteConfigProvider appId="my-app">
      {children}
    </RemoteConfigProvider>
  )
}

function Example() {
  const config = useRemoteConfigContext()
  return <pre>{JSON.stringify(config, null, 2)}</pre>
}
```

The functions retrieve values from the `app_config` table filtered by the
provided `appId` and the current `NODE_ENV`. Results are cached for five
minutes and updated in real time when using the client hook.

### Next.js API Route

Create an endpoint that returns your configuration with CDN-friendly caching:

```ts
import { NextResponse } from 'next/server'
import { getConfig } from '@rp/remote-config/server'

export const runtime = 'edge'

export async function GET() {
  const config = await getConfig('my-app')
  return NextResponse.json(config, {
    headers: {
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=59',
    },
  })
}
```
