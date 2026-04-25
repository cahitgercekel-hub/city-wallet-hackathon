## Goal

Make each favorite card on `/favorites` clickable. Tapping a card opens a new **Place Details** page that looks like the Offer details page (map + bottom sheet with merchant info), but **without the live offer/countdown** and **without the "Get Now" CTA**. The "Notify me of new offers" toggle moves from the Favorites list into this details page.

## Changes

### 1. New page `src/pages/Place.tsx`
- Route: `/place?id={favoriteId}`
- Reads the favorite via `getFavorite(id)` from `favoritesStore`.
- Layout mirrors `Offer.tsx`:
  - Top half: same faux map with center pin (initials from merchant name) and back button (→ `/favorites`).
  - Bottom sheet: merchant emoji avatar, name, distance · category, plus a heart button (already favorited → tap removes and navigates back).
- Replaces the "Today's offer" + countdown + Get-Now CTA with:
  - A short info block: "No live offer right now. We'll let you know when {merchant} posts one."
  - The **Notify me** toggle (moved from FavoriteCard) as the prominent action — same green/orange styling, calls `subscribeToPush` / `unsubscribeFromPush` and `setNotify`.
- Graceful fallback if `id` is missing / not in favorites: show "Place not found" with link back to `/favorites`.

### 2. Register route in `src/App.tsx`
- Add `<Route path="/place" element={<Place />} />`.

### 3. Update `src/pages/Favorites.tsx`
- Wrap each `FavoriteCard` content in a `Link to={"/place?id=" + fav.id}`.
- Remove the Notify-me button from the card (it now lives on the details page).
- Keep the heart (remove-from-favorites) button, but stop click propagation so tapping the heart doesn't navigate.
- Show a small status hint instead: e.g. "🔔 Notifications on" when `fav.notify`, otherwise subtle chevron `›` to indicate the row is tappable.
- Drop now-unused imports (`subscribeToPush`, `unsubscribeFromPush`, `setNotify`, `useState`).

## Out of scope
- No backend changes. Notify-me remains the existing mock toast flow.
- No changes to Offer page heart behavior or Profile page heart behavior.
