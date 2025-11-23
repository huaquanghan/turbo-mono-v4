# Dependency Upgrade Report

Generated: 2025-11-23

## Summary

This document lists all dependencies that can be upgraded to their latest versions.

## Major Upgrades Required

### Critical Updates

| Package | Current | Latest | Type | Breaking |
|---------|---------|--------|------|----------|
| **next** | 15.3.2 | **16.0.3** | major | ⚠️ Yes |
| **react** | 19.1.0 | **19.2.0** | minor | ✅ No |
| **react-dom** | 19.1.0 | **19.2.0** | minor | ✅ No |
| **zod** | 3.24.4/3.25.0 | **4.1.12** | major | ⚠️ Yes |
| **@biomejs/biome** | 1.9.4 | **2.3.7** | major | ⚠️ Yes |
| **recharts** | 2.15.3 | **3.5.0** | major | ⚠️ Yes |
| **react-day-picker** | 8.10.1 | **9.11.1** | major | ⚠️ Yes |

### Framework Updates

| Package | Current | Latest | Notes |
|---------|---------|--------|-------|
| next | 15.3.2 | 16.0.3 | Next.js 16 - major release |
| react | 19.1.0 | 19.2.0 | React 19.2 - minor update |
| react-dom | 19.1.0 | 19.2.0 | Matches React version |

### Build Tools

| Package | Current | Latest | Notes |
|---------|---------|--------|-------|
| turbo | 2.5.3 | 2.6.1 | Turborepo minor update |
| @turbo/gen | 2.5.3 | 2.6.1 | Should match turbo version |
| @biomejs/biome | 1.9.4 | 2.3.7 | Major version bump |
| typescript | 5.8.3 | 5.9.3 | Minor update |

### Type Definitions

| Package | Current | Latest | Notes |
|---------|---------|--------|-------|
| @types/node | ^20 | 24.10.1 | Major version available |
| @types/react | ^19.1.4 | 19.2.6 | Minor update |
| @types/react-dom | ^19.1.5 | 19.2.3 | Minor update |

### Styling

| Package | Current | Latest | Notes |
|---------|---------|--------|-------|
| tailwindcss | ^4 | 4.1.17 | Latest v4 release |
| @tailwindcss/postcss | ^4 | 4.1.17 | Matches tailwindcss |
| lucide-react | 0.511.0 | 0.554.0 | Icon library update |

### UI Components (Radix UI)

All Radix UI packages have minor updates available:

| Package | Current | Latest |
|---------|---------|--------|
| @radix-ui/react-accordion | 1.2.11 | 1.2.12 |
| @radix-ui/react-alert-dialog | 1.1.14 | 1.1.15 |
| @radix-ui/react-aspect-ratio | 1.1.7 | 1.1.8 |
| @radix-ui/react-avatar | 1.1.10 | 1.1.11 |
| @radix-ui/react-checkbox | 1.3.2 | 1.3.3 |
| @radix-ui/react-collapsible | 1.1.11 | 1.1.12 |
| @radix-ui/react-context-menu | 2.2.15 | 2.2.16 |
| @radix-ui/react-dialog | 1.1.14 | 1.1.15 |
| @radix-ui/react-dropdown-menu | 2.1.14 | 2.1.16 |
| @radix-ui/react-hover-card | 1.1.14 | 1.1.15 |
| @radix-ui/react-label | 2.1.7 | 2.1.8 |
| @radix-ui/react-menubar | 1.1.15 | 1.1.16 |
| @radix-ui/react-navigation-menu | 1.2.13 | 1.2.14 |
| @radix-ui/react-popover | 1.1.14 | 1.1.15 |
| @radix-ui/react-progress | 1.1.7 | 1.1.8 |
| @radix-ui/react-radio-group | 1.3.7 | 1.3.8 |
| @radix-ui/react-scroll-area | 1.2.9 | 1.2.10 |
| @radix-ui/react-select | 2.2.5 | 2.2.6 |
| @radix-ui/react-separator | 1.1.7 | 1.1.8 |
| @radix-ui/react-slider | 1.3.5 | 1.3.6 |
| @radix-ui/react-slot | 1.2.2 | 1.2.4 |
| @radix-ui/react-switch | 1.2.5 | 1.2.6 |
| @radix-ui/react-tabs | 1.1.12 | 1.1.13 |
| @radix-ui/react-toggle | 1.1.9 | 1.1.10 |
| @radix-ui/react-toggle-group | 1.1.10 | 1.1.11 |
| @radix-ui/react-tooltip | 1.2.7 | 1.2.8 |

### Form & Validation

| Package | Current | Latest | Notes |
|---------|---------|--------|-------|
| react-hook-form | 7.57.0 | 7.66.1 | Minor update |
| @hookform/resolvers | 5.0.1 | 5.2.2 | Minor update |
| zod | 3.24.4/3.25.0 | 4.1.12 | Major version - breaking |

### Database & Backend

| Package | Current | Latest | Notes |
|---------|---------|--------|-------|
| @supabase/supabase-js | 2.49.8 | 2.84.0 | Minor update |
| @supabase/ssr | 0.6.1 | 0.7.0 | Minor update |
| @supabase/postgrest-js | 1.19.4 | 2.84.0 | Major version |
| supabase | 2.23.4 | 2.58.5 | Minor update |
| @upstash/redis | 1.34.0 | 1.35.6 | Patch update |
| @upstash/ratelimit | 2.0.2 | 2.0.7 | Patch update |

### Utilities

| Package | Current | Latest | Notes |
|---------|---------|--------|-------|
| date-fns | 4.1.0 | 4.1.0 | Up to date ✅ |
| clsx | 2.1.1 | 2.1.1 | Up to date ✅ |
| tailwind-merge | 3.3.0 | 3.4.0 | Minor update |
| class-variance-authority | 0.7.1 | 0.7.1 | Up to date ✅ |
| @t3-oss/env-nextjs | 0.13.6 | 0.13.8 | Patch update |
| @total-typescript/ts-reset | 0.4.0 | 0.6.1 | Minor update |

### UI Libraries

| Package | Current | Latest | Notes |
|---------|---------|--------|-------|
| cmdk | 1.1.1 | 1.1.1 | Up to date ✅ |
| sonner | 2.0.5 | 2.0.7 | Patch update |
| vaul | 1.1.2 | 1.1.2 | Up to date ✅ |
| input-otp | 1.4.2 | 1.4.2 | Up to date ✅ |
| embla-carousel-react | 8.6.0 | 8.6.0 | Up to date ✅ |
| react-day-picker | 8.10.1 | 9.11.1 | Major version |
| react-resizable-panels | 3.0.2 | 3.0.6 | Patch update |
| recharts | 2.15.3 | 3.5.0 | Major version |
| next-themes | 0.4.6 | 0.4.6 | Up to date ✅ |

### Dev Tools

| Package | Current | Latest | Notes |
|---------|---------|--------|-------|
| @commitlint/cli | 19.8.1 | 20.1.0 | Major version |
| @commitlint/config-conventional | 19.8.1 | 20.0.0 | Major version |
| husky | 9.1.7 | 9.1.7 | Up to date ✅ |
| prettier | 3.5.3 | 3.6.2 | Minor update |

## Recommended Upgrade Strategy

### Phase 1: Safe Minor/Patch Updates (Low Risk)
These can be upgraded immediately without breaking changes:

1. **React ecosystem** (19.1.0 → 19.2.0)
   - react
   - react-dom
   - @types/react
   - @types/react-dom

2. **Radix UI packages** (all patch/minor)
   - All 26 Radix UI packages

3. **Build tools** (minor updates)
   - turbo (2.5.3 → 2.6.1)
   - @turbo/gen (2.5.3 → 2.6.1)
   - typescript (5.8.3 → 5.9.3)

4. **Styling** (patch updates)
   - tailwindcss (4.x → 4.1.17)
   - @tailwindcss/postcss (4.x → 4.1.17)
   - lucide-react (0.511.0 → 0.554.0)
   - tailwind-merge (3.3.0 → 3.4.0)

5. **Forms & utilities** (minor updates)
   - react-hook-form (7.57.0 → 7.66.1)
   - @hookform/resolvers (5.0.1 → 5.2.2)
   - @t3-oss/env-nextjs (0.13.6 → 0.13.8)
   - @total-typescript/ts-reset (0.4.0 → 0.6.1)

6. **Backend** (minor updates)
   - @supabase/supabase-js (2.49.8 → 2.84.0)
   - @supabase/ssr (0.6.1 → 0.7.0)
   - supabase (2.23.4 → 2.58.5)
   - @upstash/redis (1.34.0 → 1.35.6)
   - @upstash/ratelimit (2.0.2 → 2.0.7)

7. **UI utilities** (patch updates)
   - sonner (2.0.5 → 2.0.7)
   - react-resizable-panels (3.0.2 → 3.0.6)
   - prettier (3.5.3 → 3.6.2)

### Phase 2: Major Updates (Requires Testing)
These require more careful consideration and testing:

1. **Next.js 16** (15.3.2 → 16.0.3)
   - ⚠️ Breaking changes expected
   - Review migration guide
   - Test thoroughly

2. **Biome 2** (1.9.4 → 2.3.7)
   - ⚠️ Linting rules may have changed
   - Review configuration
   - Update scripts if needed

3. **Zod 4** (3.x → 4.1.12)
   - ⚠️ API changes
   - Update validation schemas
   - Test all form validations

4. **@types/node** (^20 → 24.10.1)
   - ⚠️ Type definitions may change
   - Test TypeScript compilation

5. **@supabase/postgrest-js** (1.19.4 → 2.84.0)
   - ⚠️ Major version bump
   - Review changelog
   - Test database queries

6. **Commitlint 20** (19.8.1 → 20.x)
   - ⚠️ Configuration may need updates
   - Test commit hooks

7. **react-day-picker** (8.10.1 → 9.11.1)
   - ⚠️ API changes expected
   - Update calendar components
   - Test date selection

8. **recharts** (2.15.3 → 3.5.0)
   - ⚠️ Chart API may have changed
   - Update chart components
   - Test visualizations

## Implementation Notes

### Before Upgrading

1. ✅ Create a backup branch
2. ✅ Document current working state
3. ✅ Run full test suite (if available)
4. ✅ Take note of current functionality

### During Upgrade

1. Update dependencies in batches (Phase 1 first)
2. Run `bun install` after each batch
3. Run `bun run build` to check for issues
4. Run `bun run lint` to check for lint errors
5. Test the application thoroughly

### After Upgrading

1. Update documentation if APIs changed
2. Update CODEBASE_ANALYSIS.md with new versions
3. Create migration guide if needed
4. Monitor for runtime issues

## Breaking Changes to Watch

### Next.js 16
- Turbopack changes
- App Router improvements
- API route updates
- Middleware changes

### Zod 4
- Schema API changes
- Validation error handling
- Type inference changes

### Biome 2
- New linting rules
- Configuration format changes
- Formatting behavior

### react-day-picker 9
- Props API changes
- Styling changes
- Accessibility improvements

### recharts 3
- Chart component APIs
- Theme system changes
- TypeScript types

## Estimated Impact

| Phase | Packages | Risk | Time |
|-------|----------|------|------|
| Phase 1 | ~50 packages | Low | 1-2 hours |
| Phase 2 | ~8 packages | High | 4-8 hours |
| Testing | All | - | 2-4 hours |
| **Total** | **~58 packages** | **Mixed** | **7-14 hours** |

## Recommendations

1. **Start with Phase 1** - These are safe updates with minimal risk
2. **Test thoroughly** - Especially forms, database operations, and charts
3. **Consider Next.js 16** - Evaluate if features are needed now or can wait
4. **Update Zod carefully** - This affects form validation throughout the app
5. **Monitor performance** - Ensure new versions don't introduce regressions
6. **Document changes** - Keep track of what was updated and why

## Already Up-to-Date ✅

These packages are already on the latest version:
- date-fns (4.1.0)
- clsx (2.1.1)
- class-variance-authority (0.7.1)
- cmdk (1.1.1)
- vaul (1.1.2)
- input-otp (1.4.2)
- embla-carousel-react (8.6.0)
- next-themes (0.4.6)
- husky (9.1.7)
- server-only (0.0.1)

---

**Last Updated:** 2025-11-23
**Total Outdated Packages:** ~58
**Safe to Update:** ~50 (Phase 1)
**Requires Careful Review:** ~8 (Phase 2)
