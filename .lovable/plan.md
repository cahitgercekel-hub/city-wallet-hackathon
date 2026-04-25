## Urgency Color on Offer Expiry Indicator

Make the expiry progress bar, pulsing dot, and "X min left" text on each `OfferCard` smoothly transition through green → amber → red as the offer approaches expiration, giving users a clear visual urgency cue.

### Color thresholds (based on remaining time %)

- More than 50% remaining → green (`#1D9E75`)
- 20–50% remaining → amber (`#F59E0B`)
- Less than 20% remaining → red (`#DC2626`)
- Expired → muted gray (existing behavior)

### Changes (`src/components/OfferCard.tsx`)

In Row 5 (the expiry section), derive a single `urgencyColor` from the existing `fillPercent` value and apply it to three elements:

1. **Progress bar fill** — replace the static `hsl(var(--primary))` background with `urgencyColor`. Add a `background-color 600ms ease` transition alongside the existing width transition for a smooth color shift.
2. **Pulsing dot** — same `urgencyColor` (was primary), with the same smooth color transition.
3. **"X min left" text** — currently `text-foreground`; switch to `urgencyColor` so the number itself turns red when critical. Keep the existing muted gray when the offer is expired.

No changes to layout, sizing, or the underlying `fillPercent` math. The existing `useNow(1000)` re-render cadence already drives the per-second updates that make the color shift feel live.

### Result

As an offer's timer ticks down, the thin progress bar, the pulse dot, and the "min left" label all shift from a calm green, to an alert amber around the halfway point, to an urgent red in the final stretch — reinforcing FOMO without any extra layout noise.
