## Goal

On the Profile page's **Recent Redemptions** list:
1. Add a heart toggle next to each "Rate" button so users can favorite/unfavorite the place from here (mirroring the Offer page behavior).
2. When there are more than 3 entries, show only the first 3 and add a **Show all (N)** / **Show less** toggle button below the list.

## Changes — `src/pages/Profile.tsx`

### Data
- Extend `Redemption` with `category: string` and `distance: string` (needed by the favorites store).
- Expand `initialRedemptions` to 6 seed entries (Café Müller, Bäckerei Becker, Pizzeria Napoli, Sushi Ten, Burger Lab, Gelato Roma) — enough to demo the collapse.

### State & helpers
- Add `expanded` boolean state, default `false`.
- Subscribe to favorites with `useFavorites()` so heart icons re-render on change.
- Add `handleFavoriteToggle(r)` that calls `toggleFavorite({ id: merchantSlug(r.merchant), merchant, distance, category })` and shows a toast. Emoji is auto-derived by the store.
- Compute `visible = expanded ? redemptions : redemptions.slice(0, 3)` and `hasMore = redemptions.length > 3`.

### List rendering
- Render `visible` instead of `redemptions`.
- In each row, place the heart button **left of** the Rate button:
  - Filled red ❤️ when `isFavorited(slug)`, outline 🤍 otherwise.
  - `aria-pressed`, `aria-label`, hover/active scale, doesn't trigger Rate.
- Both buttons sit in a small flex container `gap-2`.

### Show all / Show less
- Below the `<ul>`, when `hasMore`, render a full-width ghost button:
  - Collapsed label: `Show all (${redemptions.length}) ▾` with `ChevronDown` icon.
  - Expanded label: `Show less ▴` with `ChevronUp` icon.
  - Style: `w-full h-10 rounded-xl border border-border text-[13px] font-semibold text-muted-foreground hover:bg-muted/50 inline-flex items-center justify-center gap-1.5`.
- Toggling animates via existing `animate-fade-in` on the newly-revealed rows (add `animate-fade-in` class on `<li>` when index ≥ 3 and expanded).

### Imports
- Add `ChevronDown, ChevronUp` from `lucide-react`.

## Out of scope
- No backend changes; favorites still use the existing local store.
- No change to the Rate button behavior or the rating modal.
