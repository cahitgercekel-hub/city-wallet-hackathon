## Replace Weather + Location SVG Icons With Emojis on OfferCard

Swap the custom SVG `WeatherIcon` and `PinIcon` components inside `OfferCard` for emoji glyphs to match the friendly emoji-first style used elsewhere in the app.

### Changes (`src/components/OfferCard.tsx`)

- Replace the entire SVG-based `WeatherIcon` switch with a small emoji map and a thin wrapper:
  - `rain` → 🌧️
  - `sun` → ☀️
  - `cloud` → ☁️
  - `snow` → ❄️
  - `storm` → ⛈️
- Replace the SVG `PinIcon` with a 📍 emoji glyph.
- Render both as inline `<span>` elements with a small fixed text size (~14–16px) and `aria-hidden="true"` so screen readers ignore the decorative icon (the surrounding text "{merchant} · {distance} away" / "{temp} · {timeAgo}" already conveys meaning).
- All existing call sites (`<WeatherIcon type={weatherType} />` in Row 1, `<PinIcon />` in Row 3) keep working unchanged.

### Result

The weather chip and the merchant location row on every offer card now use crisp, colorful emoji icons instead of monochrome line-art SVGs — consistent with the rest of the app's vibrant tone.
