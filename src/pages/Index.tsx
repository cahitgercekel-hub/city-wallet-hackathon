import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import MobileShell from "@/components/MobileShell";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import OfferCard from "@/components/OfferCard";
import { useOffers, setOfferState, formatTimeAgo } from "@/store/offersStore";
import heroImg from "@/assets/home-hero.jpg";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "coffee", label: "Coffee ☕" },
  { id: "lunch", label: "Lunch 🥗" },
  { id: "bakery", label: "Bakery 🥐" },
  { id: "distance", label: "Distance 📍" },
];

interface PullToRefreshProps {
  onRefresh?: () => void | Promise<void>;
  children: React.ReactNode;
}

const PullToRefresh = ({ onRefresh, children }: PullToRefreshProps) => {
  const [pull, setPull] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const startY = useRef<number | null>(null);
  const THRESHOLD = 70;

  const handleTouchStart = (e: React.TouchEvent) => {
    if (window.scrollY > 0 || refreshing) return;
    startY.current = e.touches[0].clientY;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (startY.current == null || refreshing) return;
    const dy = e.touches[0].clientY - startY.current;
    if (dy > 0) setPull(Math.min(dy * 0.5, 90));
  };
  const handleTouchEnd = () => {
    if (refreshing) return;
    if (pull >= THRESHOLD) {
      setRefreshing(true);
      setPull(50);
      const done = () => {
        setRefreshing(false);
        setPull(0);
      };
      const result = onRefresh?.();
      if (result instanceof Promise) {
        result.finally(() => setTimeout(done, 1500));
      } else {
        setTimeout(done, 1500);
      }
    } else {
      setPull(0);
    }
    startY.current = null;
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative"
    >
      <div
        className="flex items-center justify-center overflow-hidden transition-[height] duration-200"
        style={{ height: pull }}
      >
        <Loader2
          className={`w-5 h-5 text-primary ${refreshing ? "animate-spin" : ""}`}
          style={{
            transform: refreshing ? "none" : `rotate(${pull * 4}deg)`,
            opacity: Math.min(pull / THRESHOLD, 1),
          }}
        />
      </div>
      <div
        style={{
          transform: `translateY(${pull}px)`,
          transition: pull === 0 ? "transform 200ms ease-out" : "none",
        }}
      >
        {children}
      </div>
    </div>
  );
};

const Index = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");
  const [dismissed, setDismissed] = useState<Record<string, OfferState>>({});

  const visible = OFFERS.filter(
    (o) =>
      dismissed[o.id] !== "dismissed" &&
      (activeFilter === "all" || o.category === activeFilter || activeFilter === "distance"),
  );

  return (
    <MobileShell>
      <TopBar />
      <main className="pb-28 animate-fade-in">
        {/* Greeting */}
        <div className="px-4 pt-1">
          <h2 className="text-[24px] font-bold leading-tight text-foreground">
            Good morning, Mia! <span aria-hidden="true">☀️</span>
          </h2>
          <p className="text-[14px] text-muted-foreground mt-1">
            Here's a little something for your day.
          </p>

          {/* Weather & Time pills */}
          <div className="flex gap-2 mt-3 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-[12px] text-foreground/80">
              <span aria-hidden="true">☔</span>
              <span>11°C · Light rain</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-[12px] text-foreground/80">
              <span aria-hidden="true">⏰</span>
              <span>12:34 · Lunch break</span>
            </span>
          </div>
        </div>

        {/* Filter pills */}
        <div className="mt-4 overflow-x-auto no-scrollbar">
          <div className="flex gap-2 px-4 pb-1 w-max">
            {FILTERS.map((f) => {
              const active = activeFilter === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id)}
                  className={`px-4 h-9 rounded-full text-[13px] font-semibold whitespace-nowrap transition ${
                    active
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-muted text-foreground/70 hover:bg-muted/70"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Pull-to-refresh feed */}
        <PullToRefresh onRefresh={() => {}}>
          <div className="px-4 mt-4 flex flex-col gap-4">
            {visible.map((offer) => (
              <div
                key={offer.id}
                onClick={() => navigate("/offer-detail")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") navigate("/offer-detail");
                }}
                className="cursor-pointer"
              >
                <OfferCard
                  {...offer}
                  state={dismissed[offer.id] ?? "active"}
                  onAccept={() => navigate("/offer-detail")}
                  onDismiss={() =>
                    setDismissed((d) => ({ ...d, [offer.id]: "dismissed" }))
                  }
                />
              </div>
            ))}

            {visible.length === 0 && (
              <p className="text-center text-[14px] text-muted-foreground py-8">
                No offers in this category right now.
              </p>
            )}

            {/* Bottom: hero illustration + stats */}
            <div className="mt-6 flex flex-col gap-4">
              <div
                className="w-full overflow-hidden rounded-2xl"
                style={{ aspectRatio: "16 / 9", background: "hsl(var(--warm-cream))" }}
              >
                <img
                  src={heroImg}
                  alt="A friendly local merchant handing coffee and pastries to a happy customer"
                  width={1280}
                  height={720}
                  className="w-full h-full object-cover"
                />
              </div>

              <div
                className="rounded-2xl p-4 flex items-center gap-3"
                style={{ background: "hsl(var(--warm-mint))" }}
              >
                <div className="text-3xl" aria-hidden="true">🌱</div>
                <p className="text-[14px] leading-snug text-foreground">
                  You saved <span className="font-bold">€12.40</span> and supported{" "}
                  <span className="font-bold">3 local shops</span> this month!
                </p>
              </div>

              <p className="text-center text-[12px] text-muted-foreground">
                <span aria-hidden="true">☕ 🥐 🍕</span> Fresh picks updated all day
              </p>
            </div>
          </div>
        </PullToRefresh>
      </main>
      <BottomNav />
    </MobileShell>
  );
};

export default Index;
