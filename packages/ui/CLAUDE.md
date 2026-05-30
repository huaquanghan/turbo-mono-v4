# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Package: `@rp/ui` — Shared Component Library

shadcn/ui-style component library built on Radix UI primitives and Tailwind CSS v4. Components are source files — own and edit them freely.

## Export paths

```ts
import { Button, buttonVariants } from "@rp/ui/components/<name>"  // individual component
import { cn } from "@rp/ui/lib/utils"                               // clsx + tailwind-merge
import { useIsMobile } from "@rp/ui/hooks/use-mobile"
import "@rp/ui/globals.css"                                          // import once at app root only
```

The barrel `import { ... } from "@rp/ui"` also works but prefer path-mapped imports for tree-shaking clarity.

## Adding a component

1. Create `src/components/<name>.tsx` — follow the existing pattern (CVA variants, Radix primitive, forwarded ref).
2. Add an `export *` line to `src/index.ts`.
3. The export path `@rp/ui/components/<name>` is automatically resolved by the `"./components/*"` glob export in `package.json` — no manual entry needed.

## Key patterns

- **`cn()`**: always use for merging Tailwind classes. Never string-concatenate class names.
- **`cva()`**: use `class-variance-authority` for components with variants (see `button.tsx`).
- **Radix imports**: all Radix primitives come from the unified `radix-ui` package (not `@radix-ui/react-*` individual packages).
- **Tailwind class sorting**: Biome's nursery rule enforces sorted classes inside `clsx`, `cva`, and `tw` calls.

## What NOT to do

- Do not add Next.js-specific code (e.g. `next/image`, server actions) — this package must stay framework-agnostic.
- Do not import from `server-only` — all components are client-compatible.
- Do not pin `react-day-picker` above `8.10.1` without testing — it's held at a specific version intentionally.
