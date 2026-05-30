# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Package: `@rp/typescript-config` — Shared TypeScript Presets

Three presets. Choose based on what you're building:

| Preset | Extends | Use for |
|---|---|---|
| `base.json` | — | Node scripts, non-React packages (e.g. `@rp/kv`, `@rp/env`) |
| `nextjs.json` | `base.json` | Next.js apps — sets `moduleResolution: Bundler`, `noEmit: true`, adds `next` plugin |
| `react-library.json` | `base.json` | React component packages — sets `jsx: react-jsx` (e.g. `@rp/ui`, `@rp/remote-config`) |

## Consuming a preset

In the package's `tsconfig.json`:

```json
{ "extends": "@rp/typescript-config/nextjs.json" }
```

## Key flags in `base.json`

- `noUncheckedIndexedAccess: true` — array/object indexing returns `T | undefined`. Account for this when writing new utilities.
- `strict: true` — full strict mode.
- `isolatedModules: true` — each file must be independently compilable (no `const enum`, no namespace re-exports across files).
- `moduleResolution: NodeNext` — overridden to `Bundler` in `nextjs.json`.

## What NOT to do

- Do not override `strict: false` in a consuming `tsconfig.json` — fixes should be made in the code.
- Do not use `react-library.json` for a Next.js app — it lacks the `next` compiler plugin and uses the wrong module resolution.
