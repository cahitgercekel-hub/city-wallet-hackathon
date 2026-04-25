import { Link } from "react-router-dom";
import MobileShell from "@/components/MobileShell";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import {
  useFavorites,
  removeFavorite,
  type FavoriteMerchant,
} from "@/store/favoritesStore";

const FavoriteCard = ({ fav }: { fav: FavoriteMerchant }) => {
  return (
    <Link
      to={`/place?id=${encodeURIComponent(fav.id)}`}
      aria-label={`Open ${fav.merchant} details`}
      className="relative rounded-2xl border border-border bg-card p-4 flex items-center gap-3 hover:bg-muted/40 active:scale-[0.99] transition"
    >
      <div
        className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-2xl shrink-0"
        aria-hidden="true"
      >
        {fav.emoji}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-[16px] font-bold truncate">{fav.merchant}</h3>
        <p className="text-[12px] text-muted-foreground truncate">
          {fav.distance} away · {fav.category}
        </p>
        {fav.notify && (
          <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-[11px] font-semibold">
            🔔 Notifications on
          </span>
        )}
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          removeFavorite(fav.id);
        }}
        aria-label={`Remove ${fav.merchant} from favorites`}
        className="text-[20px] leading-none p-1 hover:opacity-70 transition shrink-0"
      >
        ❤️
      </button>
      <span className="text-muted-foreground text-[20px] leading-none shrink-0" aria-hidden="true">
        ›
      </span>
    </Link>
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
