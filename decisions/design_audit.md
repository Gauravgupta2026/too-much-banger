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

## Typography

The typography uses two primary typefaces:

| Font | Applied to | Tone |
| :--- | :--- | :--- |
| **Fraunces** | Page titles (`h1`, `h2`) | Editorial, serif |
| **Bricolage Grotesque** | User interface text, buttons | Quirky, sans-serif |
| **System Sans-serif** | Tweet card text | Flat, matching standard social media posts |

### Adjustments:
- **Line Heights**: Headlines use `line-height: 0.92` with `letter-spacing: -0.06em`. Check for overlapping ascenders and descenders on custom copy.
- **Form Labels**: Labels in `interest-form.tsx` use Bricolage Grotesque. Ensure letter-spacing has sufficient width to keep inputs legible.

---

## Pointer Mask Reveal

The photo collage on the evidence board is revealed using cursor coordinates to clip the container.

1. **Render Cost**: 
   The cursor listener updates the React state on every pointer movement. While acceptable in this context, it causes component re-renders that could cause stuttering on high-refresh-rate displays.
2. **Touch Screen Behavior**: 
   Mobile touch displays lack pointer coordinates. Taps leave the spotlight mask stuck on the last touched position.

### Solution:
Restrict the mask reveal to devices that support hover using `@media (hover: hover)`. On mobile touch devices, display the collage elements statically or use a simple toggle to reveal all photos.

---

## Card Grid and Reactions

The tweet wall uses a CSS column layout for a masonry structure.

1. **Masonry Jumps**:
   Stamping a reaction adds height to a card. In CSS `column-count` grids, height changes cause cards to shift columns to balance the container. This causes elements to jump unexpectedly.
   - **Solution**: Switch from CSS columns to a flexbox-column layout, or lock positions using a javascript layout method to prevent cards from jumping columns during updates.
2. **Reaction Wheel Overlap**:
   The circular reaction menu displays in the top-right corner of a card on hover. Its `110px` dimensions overlap the tweet header (name, handle, date).
   - **Solution**: Trigger the reaction wheel when a user hovers or clicks an explicit button on the card action bar rather than the general card container.
3. **Menu CSS Code redundancy**:
   In `globals.css`, the menu has overlapping horizontal flex styles and absolute circular coordinate positioning, which creates duplicate properties. Clean up these overrides.

---

## Styling Cleanups

1. **Legacy Classes**:
   The CSS file contains rules for `.phone`, `.cup`, `.receipt-slip`, and `.polaroid-shot` styles that are not referenced in the layout code. We have deleted these to keep the stylesheet clean.
2. **Button Active States**:
   The Neo-Brutalist buttons use flat shadows for offsets. Adding active states that translate the element down by `8px` while removing the shadow will make button clicks feel tactile.
