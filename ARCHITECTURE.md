# Architecture Documentation

## System Architecture

### High-Level Overview
```
┌─────────────────────────────────────────────────────────────────┐
│                         Turbo Mono v4                            │
│                     Turborepo Monorepo                           │
└─────────────────────────────────────────────────────────────────┘
                              │
                ┌─────────────┴─────────────┐
                │                           │
        ┌───────▼────────┐         ┌───────▼────────┐
        │   Applications │         │    Packages     │
        │     (apps/)    │         │  (packages/)    │
        └───────┬────────┘         └───────┬────────┘
                │                           │
        ┌───────▼────────┐         ┌───────▼────────────────┐
        │                │         │                        │
        │   Next.js Web  │         │   @rp/ui              │
        │   Application  │◄────────┤   Component Library    │
        │                │         │   (shadcn/ui)          │
        └────────────────┘         └────────────────────────┘
                                            │
                                   ┌────────┴────────┐
                                   │                 │
                         ┌─────────▼────────┐ ┌─────▼──────────┐
                         │  @rp/env         │ │  @rp/supabase  │
                         │  @rp/kv          │ │  @rp/remote-   │
                         │  (Integrations)  │ │  config        │
                         └──────────────────┘ └────────────────┘
```

## Package Dependency Graph

```
┌──────────────────────────────────────────────────────────────────┐
│                         Root Workspace                            │
│  • Package Manager: Bun                                          │
│  • Monorepo Tool: Turborepo                                      │
│  • TypeScript: 5.8.3                                             │
└──────────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
┌───────▼────────┐    ┌──────▼──────┐    ┌────────▼─────────┐
│   web (app)    │    │  ui (pkg)   │    │  env (pkg)       │
│                │    │             │    │                  │
│  Dependencies: │    │  Exports:   │    │  Exports:        │
│  • @rp/ui     │◄───┤  • Components│    │  • Env validator │
│  • next       │    │  • Hooks     │    └──────────────────┘
│  • react      │    │  • Utils     │
└────────────────┘    │  • Styles   │
                      └─────────────┘
                              │
                    ┌─────────┴─────────┐
                    │                   │
            ┌───────▼────────┐  ┌──────▼──────────┐
            │  kv (pkg)      │  │  supabase (pkg) │
            │                │  │                 │
            │  • Redis KV    │  │  • Database     │
            │  • Rate Limit  │  │  • Queries      │
            └────────────────┘  │  • Mutations    │
                                └─────────────────┘
```

## Technology Stack

### Frontend Layer
```
┌─────────────────────────────────────────────┐
│           Frontend Technologies              │
├─────────────────────────────────────────────┤
│  Framework     │ Next.js 15.3.2             │
│  UI Library    │ React 19.1.0               │
│  Styling       │ TailwindCSS v4             │
│  Components    │ shadcn/ui + Radix UI       │
│  Icons         │ Lucide React               │
│  Themes        │ next-themes                │
│  Routing       │ Next.js App Router         │
└─────────────────────────────────────────────┘
```

### Build & Development Layer
```
┌─────────────────────────────────────────────┐
│         Build & Development Tools           │
├─────────────────────────────────────────────┤
│  Monorepo      │ Turborepo 2.5.3           │
│  Runtime       │ Bun 1.2.14+               │
│  Bundler       │ Turbopack (Next.js)       │
│  Type Checker  │ TypeScript 5.8.3          │
│  Linter        │ Biome 1.9.4               │
│  Formatter     │ Biome + Prettier          │
│  Git Hooks     │ Husky 9.1.7               │
│  Commit Lint   │ Commitlint                │
└─────────────────────────────────────────────┘
```

### Backend/Integration Layer
```
┌─────────────────────────────────────────────┐
│            Backend Services                  │
├─────────────────────────────────────────────┤
│  Database      │ Supabase                   │
│  KV Store      │ Upstash Redis              │
│  API Routes    │ Next.js API Routes         │
│  SSR           │ React Server Components    │
│  Validation    │ Zod                        │
│  Forms         │ React Hook Form            │
└─────────────────────────────────────────────┘
```

## Data Flow

### Component Import Flow
```
User Application Code
        │
        ▼
  Import from @rp/ui
        │
        ├──► Barrel Export (src/index.ts)
        │         │
        │         ├──► Component Export
        │         ├──► Hook Export
        │         └──► Utility Export
        │
        └──► Direct Import
                  │
                  └──► @rp/ui/components/button
                       @rp/ui/hooks/use-mobile
                       @rp/ui/lib/utils
```

### Build Pipeline Flow
```
Developer writes code
        │
        ▼
Save file (triggers HMR)
        │
        ▼
Turbopack rebuilds
        │
        ▼
Browser updates (Fast Refresh)


Production Build:
        │
        ▼
Run: bun run build
        │
        ▼
Turborepo task orchestration
        │
        ├──► Builds packages in order
        │     (based on dependencies)
        │
        ├──► Caches successful builds
        │
        └──► Next.js production build
                │
                ├──► Static page generation
                ├──► Route manifests
                └──► Optimized bundles
```

### Request Flow (Runtime)
```
User Request
        │
        ▼
Next.js Edge Runtime
        │
        ├──► Static Pages (SSG)
        │     └──► Served from CDN
        │
        ├──► Server Components (SSR)
        │     ├──► Execute on server
        │     ├──► Fetch data (Supabase)
        │     └──► Return HTML
        │
        └──► API Routes
              ├──► Middleware (optional)
              ├──► Business logic
              ├──► Database queries
              └──► Return JSON
```

## Component Architecture

### UI Component Structure
```
@rp/ui/src/components/button.tsx
        │
        ├──► Uses class-variance-authority (CVA)
        │    for variant management
        │
        ├──► Styled with TailwindCSS utilities
        │
        ├──► Built on Radix UI primitives
        │    (accessibility, behavior)
        │
        └──► Exports React component
             with TypeScript types

Example:
┌─────────────────────────────────────┐
│  Button Component                    │
├─────────────────────────────────────┤
│  Variants:                           │
│  • default / destructive / outline   │
│  • secondary / ghost / link          │
│                                      │
│  Sizes:                              │
│  • sm / default / lg / icon          │
│                                      │
│  Props:                              │
│  • All HTML button attributes        │
│  • Type-safe variant props           │
└─────────────────────────────────────┘
```

### Page Component Structure
```
apps/web/src/app/page.tsx
        │
        ├──► Imports components from @rp/ui
        │
        ├──► Can be Server Component (default)
        │    or Client Component ('use client')
        │
        ├──► Uses Next.js metadata API
        │
        └──► Exports React component

Layout Hierarchy:
┌────────────────────────────────────┐
│  Root Layout (layout.tsx)          │
│  • HTML wrapper                    │
│  • Global styles                   │
│  • Theme provider                  │
│  └────────────────────────────────┐│
│    │  Page Component (page.tsx)   ││
│    │  • Page content              ││
│    │  • Uses UI components        ││
│    └──────────────────────────────┘│
└────────────────────────────────────┘
```

## Package Export Strategy

### UI Package Exports
```javascript
// Multiple export strategies for flexibility

// 1. Barrel Export (index.ts)
export * from './components/button';
export * from './components/card';
// ... all components

// 2. Package.json exports
{
  "exports": {
    ".": "./src/index.ts",           // Barrel
    "./components/*": "./src/components/*.tsx",  // Direct
    "./lib/*": "./src/lib/*.ts",     // Utilities
    "./hooks/*": "./src/hooks/*.ts", // Hooks
    "./globals.css": "./src/styles/globals.css"  // Styles
  }
}

// Usage in apps
import { Button } from '@rp/ui';              // Barrel
import { Button } from '@rp/ui/components/button';  // Direct
import { cn } from '@rp/ui/lib/utils';        // Utility
```

## Styling Architecture

### TailwindCSS v4 Integration
```
┌────────────────────────────────────────────┐
│  packages/ui/src/styles/globals.css        │
│  • @import "tailwindcss";                  │
│  • CSS custom properties (variables)       │
│  • Theme definitions                       │
│  • Component base styles                   │
└────────────────────────────────────────────┘
                    │
                    ▼
┌────────────────────────────────────────────┐
│  PostCSS Processing                        │
│  • @tailwindcss/postcss plugin            │
│  • Processes @import directives            │
│  • Generates utility classes               │
└────────────────────────────────────────────┘
                    │
                    ▼
┌────────────────────────────────────────────┐
│  apps/web/src/app/layout.tsx               │
│  • import '@rp/ui/globals.css';            │
│  • Applied globally to all pages           │
└────────────────────────────────────────────┘
```

### CSS Variable System
```css
/* Theme Variables */
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --primary: 240 5.9% 10%;
  /* ... more variables */
}

.dark {
  --background: 240 10% 3.9%;
  --foreground: 0 0% 98%;
  --primary: 0 0% 98%;
  /* ... dark mode overrides */
}

/* Usage in components */
.button-primary {
  background: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}
```

## Type Safety

### TypeScript Configuration Inheritance
```
root/tsconfig.json
        │
        ├──► apps/web/tsconfig.json
        │     • Extends @rp/typescript-config
        │     • App-specific paths
        │
        └──► packages/ui/tsconfig.json
              • Extends @rp/typescript-config
              • Package-specific settings
```

### Type Flow
```
Source Code (.tsx/.ts)
        │
        ▼
TypeScript Compiler (tsc)
        │
        ├──► Type Checking
        │     • Validates types
        │     • Checks imports
        │
        ├──► Declaration Files (.d.ts)
        │     • Generated for packages
        │
        └──► Compiled Output
              • JavaScript files
              • Source maps
```

## Performance Optimizations

### Turborepo Caching
```
Task Execution
        │
        ▼
Check cache (hash-based)
        │
        ├──► Cache Hit
        │     └──► Restore from cache (fast)
        │
        └──► Cache Miss
              ├──► Execute task
              ├──► Store in cache
              └──► Return result

Cache Key = hash(
  • Source files
  • Dependencies
  • Environment variables
  • Task configuration
)
```

### Next.js Optimizations
- **Turbopack**: Fast bundler for development
- **Static Generation**: Pre-render pages at build time
- **Image Optimization**: Automatic image optimization
- **Code Splitting**: Automatic route-based splitting
- **Tree Shaking**: Remove unused code
- **Minification**: Compress production bundles

## Security Considerations

### Environment Variables
- Validated with Zod schemas
- Type-safe access
- Separate public/private variables
- Next.js prefix (`NEXT_PUBLIC_`) for client-side

### Server-Only Code
- `server-only` package ensures server code stays on server
- Used in KV, Supabase, and remote-config packages
- Prevents accidental client-side leaks

### Rate Limiting
- Upstash Redis-based rate limiting
- Protects API routes from abuse
- Configurable limits per route

## Deployment Architecture

### Vercel (Recommended)
```
GitHub Repository
        │
        ▼
Vercel Build
        │
        ├──► Install dependencies (bun)
        ├──► Build with Turborepo
        ├──► Generate static assets
        └──► Deploy to Edge Network
              │
              ├──► Static files → CDN
              ├──► API routes → Serverless Functions
              └──► SSR pages → Edge Functions
```

### Environment Setup
1. Connect repository to Vercel
2. Set root directory to `apps/web`
3. Configure build command: `cd ../.. && bunx turbo build --filter=web...`
4. Add environment variables in Vercel dashboard
5. Deploy

## Scalability Considerations

### Monorepo Growth
- **New Apps**: Add to `apps/` directory
- **New Packages**: Add to `packages/` directory
- **Shared Config**: Use `toolings/` for shared configurations

### Code Organization
- Feature-based package structure
- Domain-driven design possible
- Vertical slicing supported

### Build Performance
- Turborepo caching reduces rebuild time
- Parallel task execution
- Remote caching option available

## Monitoring & Debugging

### Development
- React DevTools
- Next.js built-in error overlay
- Fast refresh for instant feedback
- TypeScript errors in IDE

### Production
- Next.js analytics (optional)
- Vercel Analytics (if deployed on Vercel)
- Custom error tracking (Sentry, etc.)
- Performance monitoring (Web Vitals)

---

**This architecture provides a solid foundation for building scalable, maintainable web applications with modern tooling and best practices.**
