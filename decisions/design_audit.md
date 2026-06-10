# Design Audit

This audit evaluates the user interface and user experience of the Too Much Banger web application.

---

## Layout and Theme Shift

The interface transitions from a dark container in the hero section to a light grid in the archive section.

1. **Theme Shift**:
   - The dark hero container uses deep grays and red gradients. 
   - The archive container shifts to a light paper background with a dot-grid pattern. This background is fixed, which keeps the grid pattern in place while cards scroll over it.
2. **Hero Grid**:
   - The grid columns are proportioned via `grid-template-columns: minmax(0, 1fr) minmax(340px, 0.82fr)`. The text copy block sits on the left, and the evidence board fits on the right. 

---

## Typography & Element Sizing

The typography uses three typefaces:
- **Fraunces** for page titles (`h1`, `h2`).
- **Bricolage Grotesque** for user interface text and buttons.
- **System Sans-serif** for tweet card content to match standard social media posts.

### Sizing Optimization (Implemented):
To prevent the page from feeling too heavy or visual-heavy, display sizes have been scaled down by 30%:
- `h1` size clamp changed to `clamp(3.2rem, 8vw, 6.8rem)` (desktop) and `clamp(2.4rem, 16vw, 4.4rem)` (mobile).
- `h2` size clamp changed to `clamp(2.2rem, 5vw, 4.4rem)`.
- Section padding `.section-pad` reduced to `56px clamp(16px, 4vw, 48px)` on desktop and `40px 12px` on mobile.
- **Meanwhile Banner**: Reduced overall padding, border thickness (`2.5px`), shadow offset (`6px`), and font clamp size (`clamp(1.3rem, 4vw, 3.9rem)`) by 50% to make the transition section compact.

---

## Pointer Mask Reveal (Touch-Swipe Support)

The photo collage on the evidence board is revealed using cursor coordinates to clip the container.

1. **Touch Screen Support (Implemented)**: 
   - Touch drag coordinates are tracked using `onTouchStart`, `onTouchMove`, and `onTouchEnd` event listeners on the `.reveal-container`.
   - The CSS property `touch-action: none` is configured on the container. This blocks window scrolling when dragging a finger over the board, allowing smooth coordinate updates.

---

## Card Grid and Reactions (Mobile 2-Column Support)

The tweet wall uses a CSS column layout for a masonry structure.

1. **Mobile Column Adjustments (Implemented)**:
   - To fit 2 columns of tweets side-by-side on mobile devices (under `680px`), `.masonry` column count is set to `2` with a `12px` column gap.
   - Tweet card padding is reduced to `10px` and the avatar size is scaled down to `28px` to maximize space for text content. Action counts are compacted to prevent overflow.
2. **Masonry Jumps (Roadmap Item)**:
   - Stamping a reaction adds height to a card. In CSS `column-count` layouts, height changes can cause cards to shift columns to balance the container.
   - *Future Work*: Switch from CSS columns to a flexbox-column layout, or lock positions using a javascript layout method to prevent cards from jumping columns during updates.
3. **Reaction Wheel Overlap (Roadmap Item)**:
   - The circular reaction menu displays in the top-right corner of a card on hover. Its `110px` dimensions overlap the tweet header (name, handle, date).
   - *Future Work*: Trigger the reaction wheel when a user hovers or clicks an explicit button on the card action bar rather than the general card container.
