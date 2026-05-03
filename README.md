# Lovable Offers — Weather & Context-Aware Local Deals

A mobile-first web app that surfaces hyper-local offers based on weather, time of day, and neighborhood. Includes a consumer experience (browse offers, favorite merchants, redeem) and a Merchant Panel (store rules, AI auto-pilot, weather-triggered discounts, live demand radar, and performance analytics).

> Built with [Lovable](https://lovable.dev). Two-way GitHub sync — pushes from GitHub flow back into Lovable automatically.

## Features

- **Consumer app**: feed of contextual offers, offer detail & redemption flow, favorites with notifications, profile/account/settings.
- **Merchant Panel** (`/merchant`):
  - Store & Rules with **AI Auto-Pilot** and weekly loss-prevention budget
  - **Conditional weather triggers** (Zapier-style IF/THEN builder)
  - **Live Local Demand radar** (animated heatmap)
  - **Competitor alerts** with one-click offer boost
  - Performance bar chart and recent activity table
- **Privacy-first**: only neighborhood, weather, and time-of-day are used — no exact location tracking.
- Mobile shell, pull-to-refresh, in-app push mockups, and a polished design system.

## Tech Stack

- **Frontend**: React 18, TypeScript 5, Vite 5, React Router 6
- **UI**: Tailwind CSS v3, shadcn/ui, Radix UI, lucide-react, sonner
- **State/Data**: TanStack Query, lightweight `useSyncExternalStore` stores
- **Backend**: [Lovable Cloud](https://docs.lovable.dev/features/cloud) (Supabase under the hood) for auth, database, storage, edge functions
- **Testing**: Vitest + Testing Library

## Getting Started

```bash
# install
npm install

# run dev server
npm run dev

# build
npm run build

# tests
npm test
```

Open <http://localhost:8080>.

## Environment Variables

The `.env` file is auto-managed by Lovable Cloud and contains **publishable** keys only — safe to commit:

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_PUBLISHABLE_KEY=...
VITE_SUPABASE_PROJECT_ID=...
VITE_VAPID_PUBLIC_KEY=...
```

Never put service-role keys or private secrets in `VITE_*` variables — they would be bundled into the client. Store private secrets in Lovable Cloud → Secrets and access them from edge functions only.

## Project Structure

```
src/
├── components/        # UI + shadcn primitives
├── pages/             # Routes (Index, Offers, Offer, Merchant, Profile, ...)
├── store/             # Lightweight client stores (offers, favorites)
├── lib/               # Helpers (push, merchant emoji, utils)
├── integrations/      # Auto-generated Supabase client + types (do not edit)
└── index.css          # Design tokens (HSL semantic colors)
supabase/              # Cloud config + migrations
```

## Routes

`/` `/offers` `/offer` `/merchant` `/redeem` `/favorites` `/place` `/profile` `/account` `/settings` `/privacy`

## Deployment

- **Via Lovable**: open the project and click *Publish*.
- **Self-hosted**: this is a standard Vite SPA — deploy `dist/` to Vercel, Netlify, Cloudflare Pages, or any static host.

## Contributing

Changes pushed to this repo sync back to the Lovable editor automatically. Use feature branches and PRs as usual.

## License

Proprietary — all rights reserved unless otherwise stated. Update this section before going public if you intend to open-source.
