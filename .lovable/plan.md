## Favorites Page + Real Push Notifications

Add a new **Favorites** tab between Discover and Profile in the bottom nav. Users can favorite a merchant from two places — the Offer Detail page and the Profile "Recent Redemptions" list — and from `/favorites` they see a clean merchant card (no countdown timer) with a "Notify me when an offer is available" button that uses real Web Push notifications.

---

### Important note on "Full real push notifications"

True push notifications that reach the user when the app is closed require:
1. **Lovable Cloud** (backend) — we'll enable it as part of this work.
2. **A service worker** registered in the app to receive push events.
3. **Browser permission prompt** — the user must accept; if denied, no push is possible.
4. **VAPID keys** stored as Cloud secrets and used by an edge function to send push messages.
5. A trigger to actually fire the notification (a backend cron, or — for the demo — a "Send me a test push now" button + an edge function that fires when a new offer is created).

For the demo experience, we'll wire it end-to-end with a **"Send test push"** trigger so the flow is verifiable. Production-grade scheduling (e.g. fire when a real offer drops) can be layered on later. iOS Safari requires the app to be installed as a PWA before push works — we'll show a friendly notice on iOS.

---

### 1. Bottom navigation (`src/components/BottomNav.tsx`)

- Add a third item in the middle: `{ to: "/favorites", label: "Favorites", emoji: "❤️" }`.
- Switch grid from `grid-cols-2` → `grid-cols-3`.
- Add `/favorites` to `VISIBLE_ROUTES` so the nav renders there.
- Active tab styling stays identical (orange pill + dot indicator).

### 2. Favorites store (`src/store/favoritesStore.ts`, new)

A small `useSyncExternalStore` singleton mirroring `offersStore`:

- `favorites: FavoriteMerchant[]` — `{ id, merchant, distance, category, emoji, notify: boolean }`.
- `useFavorites()` hook.
- `isFavorited(merchantId)`, `toggleFavorite(merchantData)`, `setNotify(merchantId, on)`.
- Persist to `localStorage` so favorites survive refresh.
- `merchantId` derived from the offer's merchant slug (e.g. "cafe-muller").

### 3. Heart toggle — Offer Detail (`src/pages/Offer.tsx`)

- Replace the static 🥐 emoji on the right of the merchant header with a clickable **heart button** (❤️ filled when favorited, 🤍 outline when not). Tap toggles favorite + shows sonner toast: "Added to Favorites" / "Removed from Favorites".

### 4. Heart toggle — Profile redemptions (`src/pages/Profile.tsx`)

- In the redemptions list, insert a heart button **left of the Rate button** (same ghost-button styling). Same toggle + toast behavior. Uses the merchant name as the key.

### 5. Favorites page (`src/pages/Favorites.tsx`, new)

- TopBar with title "Favorites" (no notification bell, no gear).
- BottomNav at the bottom.
- **Empty state**: large 💛 emoji, heading "No favorites yet", subtext "Tap the heart on any offer to save it here."
- **Populated state**: vertical list of merchant cards. Each card shows:
  - Merchant emoji + name + distance · category
  - Small ❤️ remove button (top-right)
  - **No countdown timer** (per spec)
  - Primary button: **"🔔 Notify me of new offers"** → triggers Web Push subscription flow; once subscribed, button flips to "✅ Notifications on" with a small toggle to turn off.

### 6. Lovable Cloud + Web Push backend

Enable Lovable Cloud, then add:

- **Table `push_subscriptions`** — `id, endpoint, p256dh, auth, merchant_id, created_at`. RLS: anyone can insert/delete their own row by endpoint (anonymous demo).
- **Cloud secrets**: `VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`, `VAPID_SUBJECT` — generated and added via the secrets tool. The public key is also exposed as a non-secret/publishable config so the frontend can subscribe.
- **Edge function `subscribe-push`** — accepts `{ subscription, merchantId }`, validates with Zod, stores in `push_subscriptions`.
- **Edge function `unsubscribe-push`** — deletes by endpoint.
- **Edge function `send-push`** — for the demo: accepts `{ merchantId, title, body }`, looks up subscriptions for that merchant, sends Web Push using `web-push` (Deno port). Used by a "Send test push" button on the merchant card so the user can verify the round-trip.

### 7. Service worker (`public/sw.js`, new)

- Listen for `push` events, parse JSON payload, call `self.registration.showNotification(title, { body, icon, badge, data })`.
- Listen for `notificationclick` events → focus or open `/favorites`.
- Registered from the app on first mount via `navigator.serviceWorker.register('/sw.js')`.

### 8. Frontend push helper (`src/lib/push.ts`, new)

- `requestPushPermission()` — calls `Notification.requestPermission()`, returns boolean.
- `subscribeToPush(merchantId)` — gets the service worker registration, calls `pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: VAPID_PUBLIC_KEY })`, posts to `subscribe-push` edge function.
- `unsubscribeFromPush(merchantId)` — unsubscribes locally + posts to `unsubscribe-push`.
- iOS Safari detection → show a sonner info toast: "On iPhone, add this app to your Home Screen first to receive push notifications."

### 9. Routing (`src/App.tsx`)

- Import `Favorites` and add `<Route path="/favorites" element={<Favorites />} />` above the catch-all.

---

### What you'll see when it's done

1. Bottom nav now has three tabs: 🧭 Discover · ❤️ Favorites · 👤 Profile.
2. On the Offer Detail page and on each row of Recent Redemptions, a heart button toggles favoriting with a toast confirmation.
3. The Favorites tab shows an empty state until you favorite something, then displays each merchant as a clean card without a timer.
4. Tapping "🔔 Notify me of new offers" requests browser permission, subscribes you to push, and stores the subscription server-side. A "Send test push" button fires a real OS-level push notification to verify it works.

### Open question

Do you want the "test push" button visible to all users, or only as a hidden dev tool? (Production behavior — auto-firing pushes when a real offer drops — would need a cron job or webhook trigger we can add as a follow-up.)
