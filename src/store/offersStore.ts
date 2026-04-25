import { useEffect, useState, useSyncExternalStore } from "react";
import type { WeatherType } from "@/components/OfferCard";

export type OfferState = "active" | "dismissed" | "expired" | "accepted";

export interface OfferData {
  id: string;
  category: string;
  headline: string;
  merchant: string;
  distance: string;
  discount: string;
  /** Absolute expiration timestamp in ms */
  expiresAt: number;
  /** Total duration of the offer in ms — used for the progress bar */
  totalDurationMs: number;
  temp: string;
  weatherType: WeatherType;
  createdAt: number;
  state: OfferState;
}

const now = () => Date.now();
const m = (mins: number) => mins * 60 * 1000;

// Module-level singleton — survives navigation between routes
let offers: OfferData[] = [
  {
    id: "cafe-muller",
    category: "coffee",
    headline: "Cold outside? Your coffee is waiting ☕❄️",
    merchant: "Café Müller",
    distance: "80m",
    discount: "15% off",
    totalDurationMs: m(12),
    expiresAt: now() + m(12),
    temp: "11°C",
    weatherType: "rain",
    createdAt: now(),
    state: "active",
  },
  {
    id: "becker",
    category: "bakery",
    headline: "Skip the queue 🥐🏃‍♂️ Breakfast is on us",
    merchant: "Bäckerei Becker",
    distance: "120m",
    discount: "10% off",
    totalDurationMs: m(8),
    expiresAt: now() + m(8),
    temp: "22°C",
    weatherType: "sun",
    createdAt: now() - 60 * 1000,
    state: "active",
  },
  {
    id: "napoli",
    category: "lunch",
    headline: "Concert tonight 🎶 Grab a slice first 🍕",
    merchant: "Pizzeria Napoli",
    distance: "200m",
    discount: "20% off",
    totalDurationMs: m(20),
    expiresAt: now() + m(20),
    temp: "17°C",
    weatherType: "cloud",
    createdAt: now() - 5 * 60 * 1000,
    state: "active",
  },
];

const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());
const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};
const getSnapshot = () => offers;

export const useOffers = () => useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

export const useOffer = (id: string | undefined) => {
  const all = useOffers();
  if (!id) return all[0];
  return all.find((o) => o.id === id) ?? all[0];
};

export const setOfferState = (id: string, state: OfferState) => {
  offers = offers.map((o) => (o.id === id ? { ...o, state } : o));
  emit();
};

/** Hook that re-renders every `intervalMs` so derived time values stay live. */
export const useNow = (intervalMs = 1000) => {
  const [t, setT] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setT(Date.now()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return t;
};

export const remainingMs = (offer: { expiresAt: number }) =>
  Math.max(0, offer.expiresAt - Date.now());

export const formatTimeAgo = (createdAt: number) => {
  const diff = Date.now() - createdAt;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins === 1) return "1 min ago";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  return `${hrs} h ago`;
};
