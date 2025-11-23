# Package Details

## Overview
This document provides detailed information about each package in the monorepo.

---

## Applications

### 📱 web (apps/web)
**Purpose**: Main Next.js web application

**Tech Stack**:
- Next.js 15.3.2 (App Router)
- React 19.1.0
- TailwindCSS v4
- TypeScript 5.8.3

**Dependencies**:
- `@rp/ui` - Component library
- `lucide-react` - Icons
- `next-themes` - Theme management

**Key Features**:
- Server-side rendering with React Server Components
- App Router for file-based routing
- Turbopack for fast development
- API routes support
- Dark mode support

**Scripts**:
```bash
bun run dev      # Start development server with Turbopack
bun run build    # Build for production
bun run start    # Start production server
bun run lint     # Lint code with Biome
```

**Directory Structure**:
```
src/
├── app/
│   ├── api/              # API routes
│   │   └── config/       # Configuration endpoints
│   ├── domains/          # Domain management pages
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   └── opengraph-image.png
├── components/
│   ├── mode-toggle.tsx   # Dark mode toggle
│   └── providers.tsx     # App providers (theme, etc.)
├── config/
│   └── api.config.ts     # API configuration
└── env.ts                # Environment variables
```

---

## Packages

### 🎨 @rp/ui (packages/ui)
**Purpose**: Shared UI component library based on shadcn/ui

**Version**: 0.0.0 (private package)

**Components** (50+):
- **Layout**: Accordion, Card, Separator, Tabs, Sheet, Sidebar, Resizable
- **Forms**: Button, Input, Textarea, Select, Checkbox, Radio Group, Switch, Slider, Label, Form, Input OTP
- **Overlays**: Dialog, Alert Dialog, Drawer, Popover, Tooltip, Hover Card, Context Menu, Dropdown Menu
- **Navigation**: Menubar, Navigation Menu, Breadcrumb, Pagination
- **Data Display**: Table, Badge, Avatar, Calendar, Chart, Progress, Aspect Ratio
- **Feedback**: Alert, Sonner (Toasts), Skeleton, Scroll Area
- **Advanced**: Command, Collapsible, Toggle, Toggle Group, Carousel

**Key Dependencies**:
- `@radix-ui/*` - Accessible component primitives (15+ Radix packages)
- `class-variance-authority` - Variant management
- `tailwind-merge` - Merge Tailwind classes
- `clsx` - Conditional classes
- `react-hook-form` - Form management
- `zod` - Schema validation
- `recharts` - Charts
- `sonner` - Toast notifications
- `date-fns` - Date utilities
- `embla-carousel-react` - Carousel functionality

**Exports**:
```javascript
// Main barrel export
import { Button, Card, Input } from '@rp/ui';

// Component-specific
import { Button } from '@rp/ui/components/button';

// Utilities
import { cn } from '@rp/ui/lib/utils';

// Hooks
import { useMobile } from '@rp/ui/hooks/use-mobile';

// Styles
import '@rp/ui/globals.css';
```

**Structure**:
```
src/
├── components/       # All UI components
├── hooks/           # Custom React hooks
│   └── use-mobile.ts
├── lib/             # Utility functions
│   └── utils.ts     # cn() and other utils
├── styles/          # Global styles
│   └── globals.css  # TailwindCSS and theme
└── index.ts         # Barrel export
```

---

### 🔐 @rp/env (packages/env)
**Purpose**: Type-safe environment variable validation

**Version**: 0.0.1

**Tech Stack**:
- `@t3-oss/env-nextjs` - Environment validation for Next.js
- `zod` - Schema validation

**Features**:
- Runtime validation of environment variables
- TypeScript type inference
- Separate server/client variable validation
- Prevents missing or invalid environment variables

**Usage Example**:
```typescript
import { env } from '@rp/env';

// Access validated environment variables
const apiUrl = env.NEXT_PUBLIC_API_URL;  // Type-safe
const dbUrl = env.DATABASE_URL;          // Server-only
```

**Structure**:
```
src/
└── index.ts    # Environment schema and validation
```

---

### 💾 @rp/kv (packages/kv)
**Purpose**: Key-value storage and rate limiting with Upstash Redis

**Version**: 0.0.0

**Tech Stack**:
- `@upstash/redis` - Redis client for Upstash
- `@upstash/ratelimit` - Rate limiting utilities
- `server-only` - Ensures server-only execution

**Exports**:
```javascript
// Redis client
import { redis } from '@rp/kv/client';

// Rate limiting
import { ratelimit } from '@rp/kv/ratelimit';
```

**Use Cases**:
- Session storage
- Caching
- API rate limiting
- Feature flags
- Real-time data

**Example Usage**:
```typescript
// Store data
await redis.set('key', 'value');
await redis.get('key');

// Rate limiting
const { success } = await ratelimit.limit(identifier);
if (!success) {
  return Response.json({ error: 'Rate limit exceeded' }, { status: 429 });
}
```

**Structure**:
```
src/
├── index.ts      # Redis client export
└── ratelimit.ts  # Rate limiting configuration
```

---

### ⚙️ @rp/remote-config (packages/remote-config)
**Purpose**: Remote configuration and feature flags management

**Version**: 0.0.0

**Tech Stack**:
- React 19.1.0
- `server-only` - Server-side safety

**Exports**:
```javascript
// Server-side config
import { getConfig } from '@rp/remote-config/server';

// Client-side access
import { useConfig } from '@rp/remote-config/client';

// Both
import { ConfigProvider } from '@rp/remote-config';
```

**Use Cases**:
- Feature flags
- A/B testing
- Environment-specific settings
- Dynamic configuration without deploys

**Structure**:
```
src/
├── index.ts          # Main exports
├── server-config.ts  # Server-side config fetching
└── client.ts         # Client-side React hooks
```

---

### 🗄️ @rp/supabase (packages/supabase)
**Purpose**: Complete Supabase integration for database operations

**Version**: 0.0.0

**Tech Stack**:
- `@supabase/supabase-js` - Supabase JavaScript client
- `@supabase/ssr` - Server-side rendering support
- `@supabase/postgrest-js` - PostgreSQL REST client
- `date-fns` - Date utilities
- `server-only` - Server-side safety

**Exports** (Comprehensive):
```javascript
// Clients
import { createClient } from '@rp/supabase/server';
import { createClient } from '@rp/supabase/client';

// Queries
import { getUserData } from '@rp/supabase/queries';
import { getCachedData } from '@rp/supabase/cached-queries';
import { getDomains } from '@rp/supabase/queries/domains';
import { getConfig } from '@rp/supabase/queries/config';

// Mutations
import { createUser, updateUser } from '@rp/supabase/mutations';
import { updateDomain } from '@rp/supabase/mutations/domains';
import { updateConfig } from '@rp/supabase/mutations/config';

// Types
import type { Database, Tables } from '@rp/supabase/types';

// Utilities
import { uploadFile } from '@rp/supabase/storage';

// Middleware
import { updateSession } from '@rp/supabase/middleware';

// Domain-specific
import { domainHelpers } from '@rp/supabase/domain';
import { supabaseHelpers } from '@rp/supabase/supabase';
import { appConfig } from '@rp/supabase/app-config';
import { configHelpers } from '@rp/supabase/config';
```

**Features**:
- Server and client implementations
- Type-safe database operations
- Query caching support
- Mutation helpers
- Storage utilities
- Middleware for session management
- Domain-specific business logic

**Structure**:
```
src/
├── client/
│   ├── server.ts      # Server-side client
│   ├── client.ts      # Client-side client
│   ├── job.ts         # Background jobs
│   └── middleware.ts  # Next.js middleware integration
├── queries/
│   ├── index.ts       # Main queries
│   ├── client.ts      # Client queries
│   ├── cached-queries.ts  # Cached queries
│   ├── domains.ts     # Domain queries
│   └── config.ts      # Config queries
├── mutations/
│   ├── index.ts       # Main mutations
│   ├── domains.ts     # Domain mutations
│   └── config.ts      # Config mutations
├── types/
│   └── index.ts       # TypeScript types
├── utils/
│   └── storage.ts     # Storage utilities
├── domain.ts          # Domain business logic
├── supabase.ts        # Supabase helpers
├── app-config.ts      # App configuration
└── config.ts          # Config helpers
```

**Usage Example**:
```typescript
// Server Component
import { createClient } from '@rp/supabase/server';

export async function ServerComponent() {
  const supabase = createClient();
  const { data } = await supabase.from('users').select('*');
  return <div>{/* render data */}</div>;
}

// Client Component
'use client';
import { createClient } from '@rp/supabase/client';

export function ClientComponent() {
  const supabase = createClient();
  // Use for real-time, client-side operations
}
```

---

## Tooling

### 🔧 @rp/typescript-config (toolings/typescript-config)
**Purpose**: Shared TypeScript configurations for consistent settings across packages

**Version**: 0.0.0

**Usage**:
```json
// In any package's tsconfig.json
{
  "extends": "@rp/typescript-config/base.json",
  "compilerOptions": {
    // Package-specific overrides
  }
}
```

**Benefits**:
- Consistent TypeScript settings
- Single source of truth
- Easy to update all packages
- Reduces configuration duplication

---

## Dependency Summary

### Production Dependencies by Category

**UI & Styling**:
- TailwindCSS v4
- Radix UI primitives (15+ packages)
- class-variance-authority
- tailwind-merge, clsx
- lucide-react (icons)
- next-themes

**Forms & Validation**:
- react-hook-form
- zod
- @hookform/resolvers

**Data Visualization**:
- recharts
- embla-carousel-react

**Backend/Services**:
- @supabase/supabase-js
- @upstash/redis
- @upstash/ratelimit

**Utilities**:
- date-fns
- server-only

**Notifications**:
- sonner (toasts)
- vaul (drawer)

### Development Dependencies

**Build Tools**:
- Turborepo 2.5.3
- TypeScript 5.8.3
- @tailwindcss/postcss

**Linting & Formatting**:
- Biome 1.9.4
- Prettier 3.5.3
- Commitlint

**Git Hooks**:
- Husky 9.1.7

---

## Package Interactions

### Typical Flow
```
User Code (apps/web)
    ↓
Uses @rp/ui components
    ↓
Uses @rp/env for config
    ↓
Uses @rp/supabase for data
    ↓
Uses @rp/kv for caching
    ↓
Uses @rp/remote-config for features
```

### Build Order (Turborepo)
```
1. @rp/typescript-config    (base config)
2. @rp/env                  (no dependencies)
3. @rp/kv                   (no dependencies)
4. @rp/remote-config        (no dependencies)
5. @rp/supabase             (no dependencies)
6. @rp/ui                   (depends on typescript-config)
7. web                      (depends on @rp/ui)
```

---

## Adding New Packages

### Template for New Package

```json
{
  "name": "@rp/my-package",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "exports": {
    ".": "./src/index.ts"
  },
  "scripts": {
    "lint": "biome lint .",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    // Runtime dependencies
  },
  "devDependencies": {
    "@rp/typescript-config": "workspace:*",
    "typescript": "^5"
  }
}
```

### Steps
1. Create directory in `packages/` or `apps/`
2. Add `package.json`
3. Create `src/` directory
4. Add to workspace (automatic with bun)
5. Run `bun install`
6. Use in other packages with `workspace:*` protocol

---

## Maintenance

### Updating Dependencies
```bash
# Update all packages
bun update

# Update specific package
bun update <package-name>

# Check for outdated packages
bun outdated
```

### Type Checking
```bash
# Check all packages
bunx turbo type-check

# Check specific package
cd packages/ui
bun run type-check
```

### Building
```bash
# Build all packages
bun run build

# Build specific package
bunx turbo build --filter=web
bunx turbo build --filter=@rp/ui
```

---

**All packages work together to provide a comprehensive, type-safe development experience.**
