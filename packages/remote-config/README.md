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
import { useConfig } from '@rp/remote-config/client'

export default function Example() {
  const config = useConfig('my-app')
  return <pre>{JSON.stringify(config, null, 2)}</pre>
}
```

The functions retrieve values from the `app_config` table filtered by the
provided `appId` and the current `NODE_ENV`. Results are cached for five
minutes and updated in real time when using the client hook.
