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

### Remote Config Types

The `createAppConfigModel` helper accepts a generic schema describing the
configuration keys for your application. This allows TypeScript to infer the
value type for each key when calling `upsertConfig` or reading data.

```ts
interface MyConfig {
  welcome_message: string
  feature_enabled: boolean
}

const model = createAppConfigModel<MyConfig>(supabase)
model.upsertConfig({
  appId: 'web',
  key: 'feature_enabled',
  value: true,
  environment: 'production',
})
```

### Dynamic Table Example

To add a custom table such as `blog` with fields like `title`, `created_at` and
`published`, define the table in your Supabase migrations and regenerate the
TypeScript types. A minimal SQL migration might look like:

```sql
create table blog (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  created_at timestamp with time zone default now(),
  published boolean default false
);
```

Run `supabase gen types typescript --linked` to update
`packages/supabase/src/types/db.ts`. After regenerating, re-export the table's
CRUD types:

```ts
export type BlogRow = Database["public"]["Tables"]["blog"]["Row"];
export type BlogInsert = Database["public"]["Tables"]["blog"]["Insert"];
export type BlogUpdate = Database["public"]["Tables"]["blog"]["Update"];
```

These exports provide strongly typed access to the new table across your
application.

