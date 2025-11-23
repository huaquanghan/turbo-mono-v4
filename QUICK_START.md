# Quick Start Guide - Turbo Mono v4

## Prerequisites
- Bun v1.2.14 or higher
- Node.js v20+ (for fallback)
- Git

## Setup (5 minutes)

### 1. Install Bun (if not installed)
```bash
curl -fsSL https://bun.sh/install | bash
```

### 2. Clone and Install
```bash
git clone <repository-url>
cd turbo-mono-v4
bun install
```

### 3. Start Development
```bash
bun run dev
```

Visit http://localhost:3000

## Common Commands

### Development
```bash
bun run dev          # Start all packages in dev mode
bun run build        # Build all packages
bun run lint         # Lint all packages
bun run format       # Format code with Biome
```

### Package-Specific
```bash
cd apps/web
bun run dev          # Start only web app
bun run build        # Build only web app
```

## Adding Components

### Add shadcn/ui Component
```bash
# From repository root
bunx shadcn@latest add <component-name> -c apps/web
```

Examples:
```bash
bunx shadcn@latest add button -c apps/web
bunx shadcn@latest add card -c apps/web
bunx shadcn@latest add dialog -c apps/web
```

Components are added to `packages/ui/src/components/`

## Using Components

### Import from UI Package
```tsx
import { Button, Card, Input } from '@rp/ui';

export default function MyPage() {
  return (
    <Card>
      <h1>Hello World</h1>
      <Button>Click Me</Button>
    </Card>
  );
}
```

### Direct Import
```tsx
import { Button } from '@rp/ui/components/button';
```

## Project Structure

```
turbo-mono-v4/
├── apps/
│   └── web/              # Main Next.js app
│       └── src/
│           ├── app/      # App router pages
│           └── components/
│
├── packages/
│   ├── ui/              # Component library
│   ├── env/             # Environment validation
│   ├── kv/              # Redis/KV storage
│   ├── remote-config/   # Feature flags
│   └── supabase/        # Database integration
│
└── toolings/
    └── typescript-config/
```

## Environment Variables

### Create .env file
```bash
cp .env.example .env.local
```

### Example .env.local
```env
# Database
DATABASE_URL=your-database-url

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Upstash Redis
UPSTASH_REDIS_REST_URL=your-redis-url
UPSTASH_REDIS_REST_TOKEN=your-redis-token
```

## Creating New Package

### 1. Create Directory
```bash
mkdir packages/my-package
cd packages/my-package
```

### 2. Create package.json
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
    "lint": "biome lint ."
  },
  "devDependencies": {
    "@rp/typescript-config": "workspace:*",
    "typescript": "^5"
  }
}
```

### 3. Create Source Files
```bash
mkdir src
touch src/index.ts
```

### 4. Use in App
```bash
cd apps/web
bun add @rp/my-package@workspace:*
```

## Troubleshooting

### Build Fails
```bash
# Clean and rebuild
rm -rf node_modules .turbo apps/*/node_modules packages/*/node_modules
bun install
bun run build
```

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Type Errors
```bash
# Regenerate TypeScript cache
rm -rf apps/web/.next
bun run build
```

### Husky Hook Fails
```bash
# Temporarily bypass hooks
git commit --no-verify -m "your message"
```

## Tips & Tricks

### 1. Fast Refresh
- Uses Turbopack for instant HMR
- Save files to see changes immediately

### 2. Component Development
- Edit components in `packages/ui/src/components/`
- Changes reflect in all apps using them

### 3. Turbo Caching
- First build is slow (~30s)
- Subsequent builds are fast (<5s) with cache
- Run `bunx turbo build --force` to skip cache

### 4. Parallel Development
```bash
# Terminal 1: Run web app
cd apps/web && bun run dev

# Terminal 2: Watch UI package
cd packages/ui && bun run dev
```

### 5. Git Workflow
```bash
# Feature branch
git checkout -b feat/my-feature

# Commit with conventional commits
git commit -m "feat: add new component"

# Pre-commit hook runs lint automatically
```

## Next Steps

1. ✅ Explore the codebase structure
2. ✅ Try adding a new shadcn/ui component
3. ✅ Create a new page in `apps/web/src/app/`
4. ✅ Build a custom component in the UI package
5. ✅ Set up environment variables for integrations
6. ✅ Deploy to Vercel or your preferred platform

## Resources

- [Turborepo Docs](https://turbo.build/repo/docs)
- [Next.js 15 Docs](https://nextjs.org/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [TailwindCSS v4 Docs](https://tailwindcss.com/)
- [React 19 Docs](https://react.dev/)

## Support

For issues or questions:
1. Check existing documentation
2. Search closed issues in repository
3. Open a new issue with details

---

**Happy coding!** 🚀
