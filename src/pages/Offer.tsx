import { ArrowLeft } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import MobileShell from "@/components/MobileShell";
import { useOffer, useNow, remainingMs } from "@/store/offersStore";
import {
  useFavorites,
  isFavorited,
  toggleFavorite,
  merchantSlug,
} from "@/store/favoritesStore";

const formatTime = (s: number) => {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
};

const Offer = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const id = params.get("id") ?? undefined;
  const offer = useOffer(id);
  useNow(1000); // re-render every second
  useFavorites(); // subscribe to favorites changes

  const merchantId = merchantSlug(offer.merchant);
  const favorited = isFavorited(merchantId);
  const handleFavorite = () => {
    const nowFav = toggleFavorite({
      id: merchantId,
      merchant: offer.merchant,
      distance: offer.distance,
      category: offer.category,
      emoji: "🥐",
    });
    toast.success(nowFav ? `Added ${offer.merchant} to Favorites ❤️` : `Removed from Favorites`);
  };

  const msLeft = remainingMs(offer);
  const secondsLeft = Math.ceil(msLeft / 1000);
  const expired = msLeft <= 0;
  const fillPercent = expired
    ? 0
    : Math.max(0, Math.min(100, (msLeft / offer.totalDurationMs) * 100));

  return (
    <MobileShell>
      {/* Top half — Map */}
      <section
        className="relative w-full"
        style={{ height: "44vh", minHeight: 280, background: "#E5E7EB" }}
      >
        {/* Map grid pattern */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        {/* Faux roads */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(115deg, transparent 48%, #FFFFFF 48%, #FFFFFF 52%, transparent 52%), linear-gradient(20deg, transparent 60%, #FFFFFF 60%, #FFFFFF 63%, transparent 63%)",
          }}
        />

        {/* Back button */}
        <Link
          to="/"
          aria-label="Back to discover feed"
          className="absolute top-4 left-4 z-20 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-white/90 transition"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </Link>

        {/* Center pin */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full z-10 flex flex-col items-center pointer-events-none">
          <div
            className="relative flex items-center justify-center w-14 h-14 rounded-full text-white font-extrabold text-[15px] shadow-lg"
            style={{ background: "hsl(var(--primary))", border: "3px solid white" }}
          >
            BB
          </div>
          {/* pin tail */}
          <div
            className="w-3 h-3 rotate-45 -mt-1.5"
            style={{ background: "hsl(var(--primary))", border: "3px solid white", borderTop: 0, borderLeft: 0 }}
          />
          {/* pulse ring */}
          <div
            aria-hidden="true"
            className="absolute top-0 w-14 h-14 rounded-full animate-urgent-pulse"
            style={{ background: "hsl(var(--primary) / 0.25)" }}
          />
        </div>
      </section>

      {/* Bottom sheet */}
      <section
        className="relative -mt-6 bg-background rounded-t-3xl px-5 pt-5 pb-40 flex flex-col gap-4 animate-fade-in"
        style={{ boxShadow: "0 -8px 24px rgba(0,0,0,0.08)" }}
      >
        {/* drag handle */}
        <div className="absolute left-1/2 -translate-x-1/2 top-2 w-10 h-1.5 rounded-full bg-muted" />

        {/* Merchant */}
        <div className="flex items-start justify-between mt-2">
          <div>
            <h1 className="text-[22px] font-bold leading-tight">{offer.merchant}</h1>
            <p className="text-[13px] text-muted-foreground mt-0.5">
              {offer.distance} away · {offer.category}
            </p>
          </div>
          <button
            onClick={handleFavorite}
            aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
            aria-pressed={favorited}
            className="text-2xl leading-none p-1 hover:scale-110 active:scale-95 transition-transform"
          >
            {favorited ? "❤️" : "🤍"}
          </button>
        </div>

        {/* AI insight */}
        <div
          className="rounded-2xl p-3.5 flex gap-2.5"
          style={{ background: "hsl(6 90% 96%)", border: "1px solid hsl(6 80% 88%)" }}
        >
          <span className="text-xl leading-none mt-0.5" aria-hidden="true">🔴</span>
          <div className="flex-1">
            <p className="text-[12px] uppercase tracking-wide font-bold" style={{ color: "hsl(6 70% 45%)" }}>
              Why this offer?
            </p>
            <p className="text-[13px] text-foreground mt-0.5 leading-snug">
              {offer.merchant} is currently very quiet. Help them clear their fresh stock!
            </p>
          </div>
        </div>

        {/* Offer */}
        <div
          className="rounded-2xl p-4"
          style={{ background: "hsl(var(--warm-cream))" }}
        >
          <p className="text-[11px] uppercase tracking-wide font-bold text-foreground/60">
            Today's offer
          </p>
          <p className="text-[18px] font-bold leading-snug mt-1">
            {offer.discount} — {offer.headline}
          </p>
        </div>

        {/* Live countdown */}
        <div className="flex flex-col gap-2">
          <div className="flex items-baseline justify-between">
            <span className="text-[12px] uppercase tracking-wide font-semibold text-muted-foreground">
              Time remaining
            </span>
            <span
              className={`text-[28px] font-extrabold tabular-nums ${expired ? "text-muted-foreground" : "text-foreground"}`}
              style={{ fontFamily: "'JetBrains Mono', 'SF Mono', Menlo, monospace", letterSpacing: "0.02em" }}
            >
              {formatTime(secondsLeft)}
              <span className="text-[14px] font-medium text-muted-foreground ml-1">remaining</span>
            </span>
          </div>
          <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "hsl(var(--muted))" }}>
            <div
              className="h-full"
              style={{
                background: "hsl(var(--primary))",
                width: `${fillPercent}%`,
                transition: "width 1s linear",
              }}
            />
          </div>
        </div>
      </section>

      {/* Sticky bottom CTA */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] px-4 pt-3 pb-5 bg-background border-t border-border z-40">
        <button
          disabled={expired}
          onClick={() => navigate("/redeem")}
          className={`w-full h-14 rounded-2xl text-[17px] font-extrabold tracking-wide text-white shadow-md transition ${
            expired ? "bg-muted text-muted-foreground cursor-not-allowed" : "bg-primary hover:opacity-90"
          }`}
        >
          {expired ? "Offer expired" : "Get Now →"}
        </button>
      </div>
    </MobileShell>
  );
};

export default Offer;
