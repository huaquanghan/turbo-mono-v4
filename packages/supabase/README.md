# `@rp/supabase`

Utilities for interacting with Supabase from various runtime environments.

## Installation

```
bun add @rp/supabase
```

## Environment Variables

The following environment variables are expected by the client factories:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_KEY` (for admin/server usage)

## Usage

### Server Components

```ts
import { createClient } from '@rp/supabase/server'

const supabase = await createClient()
```

### Browser

```ts
import { createClient } from '@rp/supabase/client'

const supabase = createClient()
```

### Jobs or scripts

```ts
import { createClient } from '@rp/supabase/job'

const supabase = createClient()
```

### Queries and Mutations

The package exposes helper functions under `@rp/supabase/queries` and
`@rp/supabase/mutations` which expect a Supabase client instance.

### Storage Utilities

Utility helpers for uploading, downloading and removing files are exported from
`@rp/supabase/storage`.

