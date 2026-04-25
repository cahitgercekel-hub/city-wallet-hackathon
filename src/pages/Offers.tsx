import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import MobileShell from "@/components/MobileShell";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import OfferCard, { OfferCardProps, OfferState } from "@/components/OfferCard";

interface Scenario {
  weatherEmoji: string;
  weatherLabel: string;
  timeLabel: string;
  offer: Omit<OfferCardProps, "state" | "onAccept" | "onDismiss">;
  why: string;
}

const scenarios: Scenario[] = [
  {
    weatherEmoji: "☔",
    weatherLabel: "11°C · Light rain",
    timeLabel: "12:34 · Lunch",
    why: "Rainy lunch hour — a warm spot 80m away just turned quiet.",
    offer: {
      headline: "Cold outside? Your coffee is waiting.",
      merchant: "Café Müller",
      distance: "80m",
      discount: "15% off",
      expiryMinutes: 12,
      temp: "11°C",
      weatherType: "rain",
      timeAgo: "Just now",
    },
  },
  {
    weatherEmoji: "☀️",
    weatherLabel: "22°C · Sunny",
    timeLabel: "09:15 · Morning",
    why: "Sunny morning, your favourite bakery has fresh stock waiting.",
    offer: {
      headline: "Skip the queue. Breakfast is on us.",
      merchant: "Bäckerei Becker",
      distance: "120m",
      discount: "10% off",
      expiryMinutes: 8,
      temp: "22°C",
      weatherType: "sun",
      timeAgo: "1 min ago",
    },
  },
  {
    weatherEmoji: "⛅",
    weatherLabel: "17°C · Partly cloudy",
    timeLabel: "19:10 · Evening",
    why: "Concert nearby tonight — grab a slice before the crowd arrives.",
    offer: {
      headline: "Concert tonight. Grab a bite first.",
      merchant: "Pizzeria Napoli",
      distance: "200m",
      discount: "20% off",
      expiryMinutes: 20,
      temp: "17°C",
      weatherType: "cloud",
      timeAgo: "5 min ago",
    },
  },
];

const Offers = () => {
  const navigate = useNavigate();
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [cardState, setCardState] = useState<OfferState>("active");
  const scenario = scenarios[scenarioIdx];

  useEffect(() => {
    const t = setTimeout(() => {
      toast("Weather update: now 9°C · New offer available", {
        duration: 4000,
        className:
          "!bg-primary !text-white !border-primary [&_*]:!text-white",
      });
    }, 10000);
    return () => clearTimeout(t);
  }, []);

  const cycleScenario = () => {
    setScenarioIdx((i) => (i + 1) % scenarios.length);
    setCardState("active");
  };

  return (
    <MobileShell>
      <TopBar title="Offers nearby" />
      <main className="px-4 pb-28 flex flex-col gap-5 animate-fade-in">
        {/* Static 2-column context grid (no scroll, no merchant chip) */}
        <div className="grid grid-cols-2 gap-2">
          <div
            className="rounded-xl p-3 flex items-center gap-2"
            style={{ background: "hsl(var(--warm-sky))" }}
          >
            <span className="text-2xl" aria-hidden="true">{scenario.weatherEmoji}</span>
            <div className="flex flex-col">
              <span className="text-[11px] uppercase tracking-wide text-foreground/60 font-semibold">Weather</span>
              <span className="text-[13px] font-medium text-foreground">{scenario.weatherLabel}</span>
            </div>
          </div>
          <div
            className="rounded-xl p-3 flex items-center gap-2"
            style={{ background: "hsl(var(--warm-peach))" }}
          >
            <span className="text-2xl" aria-hidden="true">🕐</span>
            <div className="flex flex-col">
              <span className="text-[11px] uppercase tracking-wide text-foreground/60 font-semibold">Right now</span>
              <span className="text-[13px] font-medium text-foreground">{scenario.timeLabel}</span>
            </div>
          </div>
        </div>

        <p className="text-[13px] text-muted-foreground -mt-2">
          <span className="font-semibold text-foreground">Why this offer? </span>
          {scenario.why}
        </p>

        <OfferCard
          {...scenario.offer}
          state={cardState}
          onAccept={() => navigate("/offer-detail")}
          onDismiss={() => setCardState("dismissed")}
        />
      </main>

      <button
        onClick={cycleScenario}
        className="fixed bottom-24 right-4 z-50 px-3 py-2 rounded-full bg-foreground/80 text-background text-[12px] hover:opacity-90 transition"
        aria-label="Switch scenario (demo)"
      >
        Switch scenario
      </button>

      <BottomNav />
    </MobileShell>
  );
};

export default Offers;
