# Implementation Plan - Visual Adjustments, Git Setup, and Mobile Responsiveness

This plan outlines the technical changes implemented to resize wobbly elements, initialize Git, configure Vercel builds, and implement mobile touch gestures.

---

## 1. Scope of Work

### Hero Section Adjustments
- **Target**: [globals.css](file:///Users/gauravgupta/Developer/Obsidian/ai-brain/Areas/Lowerbasement/Projects/bangerlore/too-much-banger/src/app/globals.css)
- **Changes**: Enlarge `.reveal-sticker` reaction containers by 50%:
  - Pad container to `12px 21px` (from `8px 14px`).
  - Set container gap to `9px` (from `6px`).
  - Set border to `4.5px solid #000` (from `3px solid #000`).
  - Set border-radius to `24px` (from `16px`).
  - Set box-shadow to `6px 6px 0px #000` (from `4px 4px 0px #000`).
  - Set button child text styles (`span` size to `30px`, `b` size to `21px`).

### Timeline Content Updates
- **Target**: [mock-posts.ts](file:///Users/gauravgupta/Developer/Obsidian/ai-brain/Areas/Lowerbasement/Projects/bangerlore/too-much-banger/src/data/mock-posts.ts)
- **Changes**: Rewrite the 28 mock tweets. Ensure each has a unique author, handle, category, and text description to eliminate repetition. Prune duplicate avatars.

### Repository Cleanup
- **Target**: Workspace directories.
- **Changes**: 
  - Delete `.README.md.swp` swap files.
  - Delete unused desk layout styles (`.hero-art`, `.phone`, `.cup`, `.receipt-slip`, `.polaroid-shot`) from `globals.css`.

### Git Setup & Repository Pushing (Phased Commit Structure)
- **Phase 1**: Initialize local Git repository on `main` branch. Un-ignore `decisions/` directory in `.gitignore`.
- **Phase 2**: Commit project configuration and dependency settings (`package.json`, `tsconfig.json`, `eslint.config.mjs`, `vercel.json`, `README.md`).
- **Phase 3**: Commit source files (`src/`, `public/`, `supabase/`).
- **Phase 4**: Commit design logs and blueprints (`decisions/`).
- **Phase 5**: Link remote origin `https://github.com/Gauravgupta2026/too-much-banger.git` and push local commits.

### Vercel Deployment Fix & Analytics
- **Vercel Manifest Fix**: Pruned custom `distDir: ".next-prod"` from `next.config.ts` and `tsconfig.json` to allow Vercel to discover Next.js build assets in the default `.next` folder.
- **Vercel Analytics SDK**: Installed `@vercel/analytics` and injected `<Analytics />` tracking in `src/app/layout.tsx`.

### Mobile Responsiveness (Branch: `mobile-responsiveness`)
- **Swipe Interactions**: Configured `onTouchStart`, `onTouchMove`, and `onTouchEnd` coordinates logic in `page.tsx` so that touch dragging sweeps the spotlight. Set `touch-action: none` on the container to block page scrolling.
- **Double-Column Mobile Timeline**: Set column count to 2 under `max-width: 680px`. Reduced card paddings to `10px`, spacing gaps to `12px`, and avatar bounds to `28px` to maximize space for text side-by-side.
- **Typography & Transition banner Scaling**: Reduced display title sizes by 30%. Scaled down the "Meanwhile..." transition banner border, paddings, shadows, and font sizes by 50% to make it compact.

---

## 2. Verification Plan

- Run linter and typecheck: `npm run typecheck && npm run lint`.
- Verify production compilation: `npm run build`.
- Run layout tests: `node decisions/rollback-and-test.mjs`.
