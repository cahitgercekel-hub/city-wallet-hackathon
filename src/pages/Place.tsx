import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import MobileShell from "@/components/MobileShell";
import {
  useFavorites,
  getFavorite,
  removeFavorite,
  setNotify,
} from "@/store/favoritesStore";
import { subscribeToPush, unsubscribeFromPush } from "@/lib/push";

const initialsOf = (name: string) =>
  name
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase() || "??";

const Place = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const id = params.get("id") ?? "";
  useFavorites(); // subscribe to changes
  const fav = getFavorite(id);
  const [busy, setBusy] = useState(false);

  if (!fav) {
    return (
      <MobileShell>
        <div className="px-6 pt-20 flex flex-col items-center text-center gap-3">
          <span className="text-[56px] leading-none" aria-hidden="true">🔎</span>
          <h1 className="text-[18px] font-bold">Place not found</h1>
          <p className="text-[14px] text-muted-foreground max-w-[260px]">
            This place is no longer in your favorites.
          </p>
          <Link
            to="/favorites"
            className="mt-2 px-4 h-11 inline-flex items-center rounded-xl bg-primary text-primary-foreground text-[14px] font-semibold"
          >
            Back to Favorites
          </Link>
        </div>
      </MobileShell>
    );
  }

  const handleRemove = () => {
    removeFavorite(fav.id);
    toast.success(`Removed ${fav.merchant} from Favorites`);
    navigate("/favorites");
  };

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
    <MobileShell>
      {/* Top half — Map */}
      <section
        className="relative w-full"
        style={{ height: "44vh", minHeight: 280, background: "#E5E7EB" }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(115deg, transparent 48%, #FFFFFF 48%, #FFFFFF 52%, transparent 52%), linear-gradient(20deg, transparent 60%, #FFFFFF 60%, #FFFFFF 63%, transparent 63%)",
          }}
        />

        <Link
          to="/favorites"
          aria-label="Back to favorites"
          className="absolute top-4 left-4 z-20 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-white/90 transition"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </Link>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full z-10 flex flex-col items-center pointer-events-none">
          <div
            className="relative flex items-center justify-center w-14 h-14 rounded-full text-white font-extrabold text-[15px] shadow-lg"
            style={{ background: "hsl(var(--primary))", border: "3px solid white" }}
          >
            {initialsOf(fav.merchant)}
          </div>
          <div
            className="w-3 h-3 rotate-45 -mt-1.5"
            style={{ background: "hsl(var(--primary))", border: "3px solid white", borderTop: 0, borderLeft: 0 }}
          />
        </div>
      </section>

      {/* Bottom sheet */}
      <section
        className="relative -mt-6 bg-background rounded-t-3xl px-5 pt-5 pb-40 flex flex-col gap-4 animate-fade-in"
        style={{ boxShadow: "0 -8px 24px rgba(0,0,0,0.08)" }}
      >
        <div className="absolute left-1/2 -translate-x-1/2 top-2 w-10 h-1.5 rounded-full bg-muted" />

        {/* Merchant header */}
        <div className="flex items-start justify-between mt-2 gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-2xl shrink-0"
              aria-hidden="true"
            >
              {fav.emoji}
            </div>
            <div className="min-w-0">
              <h1 className="text-[22px] font-bold leading-tight truncate">{fav.merchant}</h1>
              <p className="text-[13px] text-muted-foreground mt-0.5">
                {fav.distance} away · {fav.category}
              </p>
            </div>
          </div>
          <button
            onClick={handleRemove}
            aria-label={`Remove ${fav.merchant} from favorites`}
            className="text-2xl leading-none p-1 hover:scale-110 active:scale-95 transition-transform"
          >
            ❤️
          </button>
        </div>

        {/* Info block */}
        <div
          className="rounded-2xl p-3.5 flex gap-2.5"
          style={{ background: "hsl(var(--warm-cream))" }}
        >
          <span className="text-xl leading-none mt-0.5" aria-hidden="true">🌙</span>
          <div className="flex-1">
            <p className="text-[12px] uppercase tracking-wide font-bold text-foreground/60">
              No live offer right now
            </p>
            <p className="text-[13px] text-foreground mt-0.5 leading-snug">
              We'll let you know as soon as {fav.merchant} posts a new deal.
            </p>
          </div>
        </div>
      </section>

      {/* Sticky bottom CTA — Notify me */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] px-4 pt-3 pb-5 bg-background border-t border-border z-40">
        <button
          onClick={handleNotify}
          disabled={busy}
          className={`w-full h-14 rounded-2xl text-[16px] font-extrabold tracking-wide shadow-md transition ${
            fav.notify
              ? "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100"
              : "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:opacity-90"
          } ${busy ? "opacity-60 cursor-wait" : ""}`}
        >
          {fav.notify
            ? "✅ Notifications on · Tap to turn off"
            : "🔔 Notify me of new offers"}
        </button>
      </div>
    </MobileShell>
  );
};

export default Place;
