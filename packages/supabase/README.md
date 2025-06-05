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

### Domain helpers

You can create reusable CRUD helpers for any table using the `createOrm`
utility. The package ships with a default `domains` implementation which can be
used as a reference. To query or mutate rows in the `domains` table you can use
the provided functions:

```ts
import { getDomainById, listDomains } from '@rp/supabase/queries/domains'
import { createDomain, updateDomain, deleteDomain } from '@rp/supabase/mutations/domains'
```

If you need helpers for another table, create a new file that calls
`createOrm(supabase, '<table>')` and export the resulting methods. This approach
makes it easy to add domain specific logic without duplicating CRUD code.

### Storage Utilities

Utility helpers for uploading, downloading and removing files are exported from
`@rp/supabase/storage`.

