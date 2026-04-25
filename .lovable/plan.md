## Goal

Stop hardcoding the croissant emoji on every favorite. Auto-pick a fitting emoji from the merchant's name (and category as a hint). The chosen emoji is shown on the Favorites list and inside the Place details page (the round avatar that already exists).

## Changes

### 1. New helper `src/lib/merchantEmoji.ts`
Pure function `emojiForMerchant(name, category?)` with an ordered keyword → emoji table. First regex match wins; deterministic, no API calls.

Coverage (examples):
- bakery / bäckerei / boulanger → 🥐
- pizza / pizzeria / napoli → 🍕
- burger → 🍔; sushi/ramen → 🍣 / 🍜; taco → 🌮; kebab/döner → 🥙
- café / coffee / espresso / kaffee → ☕
- bar/pub/brewery → 🍺; wine → 🍷; cocktail → 🍸
- gelato/ice cream → 🍦; donut → 🍩; cake/konditorei → 🍰
- salad/vegan → 🥗; steak/grill → 🥩; fish/seafood → 🐟
- breakfast/brunch → 🍳; sandwich/deli/bagel → 🥪
- restaurant/bistro/trattoria → 🍽️
- supermarket/market → 🛒; pharmacy → 💊; flower → 💐; book → 📚
- salon/barber/spa → 💇; gym/fitness → 🏋️; cinema → 🎬; music → 🎶
- Fallback → 📍

### 2. `src/store/favoritesStore.ts`
- Import the helper.
- In `toggleFavorite`, compute the emoji from `merchant + category` (overrides any emoji passed in). Callers no longer need to pass one.
- In `load()`, remap stored favorites through the helper so existing localStorage entries (currently all 🥐) immediately upgrade on next load.

### 3. Caller cleanup
`src/pages/Offer.tsx` already calls `toggleFavorite({...emoji: "🥐"})`. Remove the hardcoded `emoji` field — the store now derives it. No other callers exist.

### 4. Place details page
No code change needed — `src/pages/Place.tsx` already renders `fav.emoji` in the avatar circle. It will automatically show the auto-derived emoji.

## Out of scope
- No AI/LLM call; this is a deterministic keyword matcher (fast, offline, free). If you'd later prefer Lovable AI to pick emojis for unseen names, we can add a fallback that calls it on first favorite and caches the result — say the word.
