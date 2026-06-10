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
The right-hand column of the hero handles a borderless spotlight photo reveal. It uses a cursor listener to calculate coordinates, passing them to a CSS radial-gradient mask.

#### Layer Stack:
```
  [Front / Layer 2]  Stickers & Counts (🔥, ❤️, 🚀, 🥤)  -- Pointer events: auto
          |
  [Middle / Layer 1] Reveal cover stenciled slate       -- Pointer events: none
          |
  [Back / Layer 0]   Scattered Photo Collage            -- Masked by radial-gradient
```

- **Stickers (Layer 2)**: Floating badge buttons that trigger local count updates and request state changes.
- **Stencil Cover (Layer 1)**: Visual overlay indicating "Containment Breach Evidence". Pointer events are disabled to let coordinates pass to the background.
- **Photo Collage (Layer 0)**: A group of rotated polaroid elements. The browser clips this layer based on the pointer coordinates (`--mask-x`, `--mask-y`).

### Tweet Wall (Masonry Grid)
The timeline is rendered as an X/Twitter clone wall. 
- **Layout**: Employs CSS `column-count: 3` (collapsing to 2 columns on tablets and 1 column on mobile screens).
- **Tilt**: Rotates individual cards slightly using randomized degree offsets to build the physical scrapbook look.
- **Reactions**: Hovering over a card shows a circular glass selection wheel ( 👍, 🔥, ❤️, 🤪 ). Clicking an emoji stamps the badge onto the card and increases the public reaction tally.

---

## 3. Database Persistence

The backend relies on two database tables inside Supabase:

### A. `reactions` Table
Stores the reaction counts for each card.
- **Schema**: `post_id` (text), `reaction` (text), `count` (integer).
- **Update Logic**: Client updates are executed via an RPC database function: `increment_reaction(target_post_id, target_reaction)`. This function upserts the row and increments the count atomically, avoiding write conflicts.

### B. `interest_submissions` Table
Saves visitor sign-ups.
- **Schema**: `name` (text), `contact` (text), `note` (text), `attendee_status` (text).
- **Update Logic**: Client forms submit data via `/api/interest`, which performs a direct row insert.

---

## 4. Fragile Zones (Do Not Touch)

Keep the following configurations unchanged to prevent system failures:

1. **Rollback Target Selectors**:
   The verification script `rollback-and-test.mjs` checks for specific CSS classes (`.hero-reveal-wrapper`) to diagnose whether the hero is in hover-reveal or static mode. Changing these class names will break the automated test suite.
2. **Supabase Environment Variables**:
   Database client generation depends on `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`. If these are absent, the application gracefully degrades to mock local states, but persistence will fail.
3. **Circular Menu Flex Overrides**:
   The reaction menu (`.tweet-reaction-wheel`) overrides horizontal flex alignments with absolute positions for each button to shape the circle. Modifying structural classes in `reaction-bar.tsx` without reviewing `globals.css` overrides will break the circular dial.
4. **CSS Masonry Jumps**:
   The CSS `column-count` layout is sensitive to height shifts. If reaction badges grow too large or dynamic elements insert substantial vertical height, cards at the bottom of a column will shift to the top of adjacent columns. Keep badge heights compact.

---

## 5. References and Scripts

- **Rollback Verification**: `node decisions/rollback-and-test.mjs` (Verifies state integrity).
- **Supabase Setup Diagnostic**: `node decisions/test-supabase.mjs` (Verifies connection status).
