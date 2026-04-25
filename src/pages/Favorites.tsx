import { useState } from "react";
import MobileShell from "@/components/MobileShell";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import {
  useFavorites,
  removeFavorite,
  setNotify,
  type FavoriteMerchant,
} from "@/store/favoritesStore";
import { subscribeToPush, unsubscribeFromPush } from "@/lib/push";

const FavoriteCard = ({ fav }: { fav: FavoriteMerchant }) => {
  const [busy, setBusy] = useState(false);

  const handleNotify = async () => {
    if (busy) return;
    setBusy(true);
    if (fav.notify) {
      const ok = await unsubscribeFromPush(fav.id, fav.merchant);
      if (ok) setNotify(fav.id, false);
    } else {
      const ok = await subscribeToPush(fav.id, fav.merchant);
      if (ok) setNotify(fav.id, true);
    }
    setBusy(false);
  };

  return (
    <article className="relative rounded-2xl border border-border bg-card p-4 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-2xl shrink-0" aria-hidden="true">
            {fav.emoji}
          </div>
          <div className="min-w-0">
            <h3 className="text-[16px] font-bold truncate">{fav.merchant}</h3>
            <p className="text-[12px] text-muted-foreground truncate">
              {fav.distance} away · {fav.category}
            </p>
          </div>
        </div>
        <button
          onClick={() => removeFavorite(fav.id)}
          aria-label={`Remove ${fav.merchant} from favorites`}
          className="text-[20px] leading-none p-1 hover:opacity-70 transition"
        >
          ❤️
        </button>
      </div>

      <button
        onClick={handleNotify}
        disabled={busy}
        className={`w-full h-11 rounded-xl text-[14px] font-semibold transition ${
          fav.notify
            ? "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100"
            : "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-sm hover:opacity-90"
        } ${busy ? "opacity-60 cursor-wait" : ""}`}
      >
        {fav.notify ? "✅ Notifications on · Tap to turn off" : "🔔 Notify me of new offers"}
      </button>
    </article>
  );
};

const Favorites = () => {
  const favorites = useFavorites();

  return (
    <MobileShell>
      <TopBar title="Favorites" />
      <main className="px-4 pb-28 flex flex-col gap-4 animate-fade-in">
        {favorites.length === 0 ? (
          <div className="flex flex-col items-center text-center pt-20 px-6 gap-3">
            <span className="text-[64px] leading-none" aria-hidden="true">💛</span>
            <h2 className="text-[18px] font-bold">No favorites yet</h2>
            <p className="text-[14px] text-muted-foreground max-w-[260px]">
              Tap the heart on any offer to save it here and get notified about new deals.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3 mt-2">
            {favorites.map((f) => (
              <FavoriteCard key={f.id} fav={f} />
            ))}
          </div>
        )}
      </main>
      <BottomNav />
    </MobileShell>
  );
};

export default Favorites;
