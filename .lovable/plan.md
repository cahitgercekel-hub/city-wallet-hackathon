## Rename "Cashback" to "Your savings" and Add Emojis Under Stats

Update the three stat tiles on the Profile page so the cashback label reads "Your savings", and place a small emoji under each stat label for a friendlier feel.

### Changes (`src/pages/Profile.tsx`)

Update the `stats` array to add an `emoji` field and rename the first label:

- "Cashback" → **"Your savings"** with 💶
- "Offers used" stays, with 🎟️
- "CO₂ saved" stays, with 🌱

Render the emoji as a new line below the label inside each stat tile (small, ~16px, `aria-hidden`), keeping the existing big purple count-up number on top and the muted label in the middle.

### Layout per tile

```text
  €12.40        <- count-up (existing)
  Your savings  <- label (renamed)
  💶            <- new emoji row
```

No changes to the count-up animation, stagger fade-in, grid layout, or anything else. The "€X.XX saved" text in the Recent Redemptions list and the "You saved €12.40" line on the Discover page are not labelled "Cashback" so they stay as-is.

### Result

The Profile stats row reads cleaner and friendlier — the savings tile says "Your savings" with a euro-note emoji under it, and the other two tiles get matching ticket and plant emojis.
