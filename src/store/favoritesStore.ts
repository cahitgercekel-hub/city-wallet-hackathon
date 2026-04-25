import { useSyncExternalStore } from "react";
import { emojiForMerchant } from "@/lib/merchantEmoji";

export interface FavoriteMerchant {
  id: string;
  merchant: string;
  distance: string;
  category: string;
  emoji: string;
  notify: boolean;
}

const STORAGE_KEY = "lovable_favorites_v1";

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const merchantSlug = (merchant: string) => slugify(merchant);

const load = (): FavoriteMerchant[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as FavoriteMerchant[]) : [];
    // Auto-upgrade emojis so old/imported entries pick up name-based icons.
    return parsed.map((f) => ({
      ...f,
      emoji: emojiForMerchant(f.merchant, f.category) || f.emoji,
    }));
  } catch {
    return [];
  }
};

const save = (next: FavoriteMerchant[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
};

let favorites: FavoriteMerchant[] = load();
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());
const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};
const getSnapshot = () => favorites;

export const useFavorites = () =>
  useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

export const isFavorited = (id: string) => favorites.some((f) => f.id === id);

export const getFavorite = (id: string) => favorites.find((f) => f.id === id);

export const toggleFavorite = (
  data: Omit<FavoriteMerchant, "notify" | "emoji"> & {
    notify?: boolean;
    emoji?: string;
  }
): boolean => {
  const exists = favorites.some((f) => f.id === data.id);
  if (exists) {
    favorites = favorites.filter((f) => f.id !== data.id);
  } else {
    const emoji =
      emojiForMerchant(data.merchant, data.category) || data.emoji || "📍";
    favorites = [...favorites, { notify: false, ...data, emoji }];
  }
  save(favorites);
  emit();
  return !exists;
};

export const removeFavorite = (id: string) => {
  favorites = favorites.filter((f) => f.id !== id);
  save(favorites);
  emit();
};

export const setNotify = (id: string, notify: boolean) => {
  favorites = favorites.map((f) => (f.id === id ? { ...f, notify } : f));
  save(favorites);
  emit();
};
