# Too Much Banger - System Blueprint

This document acts as the technical guide for the Too Much Banger scrapbook application. It details layout systems, persistence layers, and fragile code paths to prevent regression during development.

---

## 1. System Topology

The application is a Next.js frontend integrated with a Supabase PostgreSQL database. It shifts visually from a dark, exclusive "Late-Night Containment Breach" theme in the hero to a light, tactile "Morning-After Scrapbook" timeline.

```
+-------------------------------------------------------------+
|                     Next.js User Client                     |
+-------------------------------------------------------------+
       |                                             |
       | POST /api/interest                          | POST /api/reactions
       v                                             v
+------------------------+                  +------------------------+
|   Interest Submission  |                  |   Reaction Increment   |
+------------------------+                  +------------------------+
       |                                             |
       v (Table Insert)                              v (RPC Call)
+-------------------------------------------------------------+
|                      Supabase Database                      |
+-------------------------------------------------------------+
```

---

## 2. Interactive Components

### Hero Evidence Board (Spotlight Mask)
The right-hand column of the hero handles a borderless spotlight photo reveal. It uses cursor listener events on desktop and touch-swipe events on mobile to calculate coordinates, passing them to a CSS radial-gradient mask.

#### Layer Stack:
```
  [Front / Layer 2]  Stickers & Counts (🔥, ❤️, 🚀, 🥤)  -- Pointer events: auto
          |
  [Middle / Layer 1] Reveal cover stenciled slate       -- Pointer events: none
          |
  [Back / Layer 0]   Scattered Photo Collage            -- Masked by radial-gradient
```

- **Stickers (Layer 2)**: Floating badge buttons that trigger count updates and request state changes.
- **Stencil Cover (Layer 1)**: Visual overlay indicating "Containment Breach Evidence". Pointer events are disabled to let coordinates pass to the background.
- **Photo Collage (Layer 0)**: A group of rotated polaroid elements. The browser clips this layer based on the pointer or touch-swipe coordinates (`--mask-x`, `--mask-y`).

### Tweet Wall (Masonry Grid)
The timeline is rendered as an X/Twitter clone wall. 
- **Layout**: Employs CSS `column-count: 3` (collapsing to 2 columns on mobile and tablet screens under `1050px` and `680px` width).
- **Tilt**: Rotates individual cards slightly using randomized degree offsets to build the physical scrapbook look. Rotations are disabled on mobile viewports.
- **Reactions**: Hovering over a card shows a circular glass selection wheel ( 👍, 🔥, ❤️, 🤪 ). Clicking an emoji stamps the badge onto the card and increases the reaction tally.

---

## 3. Database & Analytics Integration

### A. Database Persistence
The backend relies on two database tables inside Supabase:
- **`reactions` Table**: Stores reaction counts for each card. Columns: `post_id` (text), `reaction` (text), `count` (integer). Updates are executed via an RPC database function: `increment_reaction(target_post_id, target_reaction)`.
- **`interest_submissions` Table**: Saves visitor sign-ups. Columns: `name` (text), `contact` (text), `note` (text), `attendee_status` (text).

### B. Vercel Analytics
The SDK package `@vercel/analytics` is injected into the root layout to capture page views, session durations, and core web vitals dynamically.

---

## 4. Fragile Zones (Do Not Touch)

Keep the following configurations unchanged to prevent system failures:

1. **Rollback Target Selectors**:
   The verification script `rollback-and-test.mjs` checks for specific CSS classes (`.hero-reveal-wrapper`) to diagnose whether the hero is in hover-reveal or static mode. Changing these class names will break the automated test suite.
2. **Next.js Default Output Directory (`.next`)**:
   Do not override the `distDir` parameter in `next.config.ts`. Vercel deployments rely on the default `.next` output directory to locate the routes manifest files.
3. **Circular Menu Flex Overrides**:
   The reaction menu (`.tweet-reaction-wheel`) overrides horizontal flex alignments with absolute positions for each button to shape the circle. Modifying structural classes in `reaction-bar.tsx` without reviewing `globals.css` overrides will break the circular dial.
4. **Touch Interaction Bounds**:
   The swipe coordinates calculation uses touch events (`onTouchStart`, `onTouchMove`). The CSS property `touch-action: none` is applied on the reveal container to prevent standard window scrolling during drag events. Removing this will cause page jitter on touch displays.

---

## 5. References and Scripts

- **Rollback Verification**: `node decisions/rollback-and-test.mjs` (Verifies state integrity).
- **Supabase Setup Diagnostic**: `node decisions/test-supabase.mjs` (Verifies connection status).
