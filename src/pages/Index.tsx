import { useState, useEffect } from "react";
import { CloudRain, Sun, Clock, ChevronDown } from "lucide-react";
import { useState as useStateAlias } from "react";
import { toast } from "sonner";
import MobileShell from "@/components/MobileShell";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import ContextChip from "@/components/ContextChip";
import OfferCard, { OfferCardProps } from "@/components/OfferCard";

interface Scenario {
  label: string;
  chips: { icon?: React.ReactNode; text: string; dot?: "quiet" | "busy"; extra?: boolean }[];
  why: string;
  offer: OfferCardProps;
}

const scenarios: Scenario[] = [
  {
    label: "Scenario: Cold + Quiet Café",
    chips: [
      { icon: <CloudRain className="w-3.5 h-3.5" />, text: "11°C · Rain" },
      { icon: <Clock className="w-3.5 h-3.5" />, text: "12:34 · Lunch" },
      { dot: "quiet", text: "Café Müller quiet" },
    ],
    why: "Cold weather (11°C) · Lunch hour · Café Müller has low transaction volume right now",
    offer: {
      weatherIcon: <CloudRain className="w-4 h-4" />,
      weatherLabel: "11°C",
      headline: "Cold outside? Your coffee is waiting.",
      merchant: "Café Müller",
      distance: "80m away",
      discount: "15% off",
      expiryMinutes: 12,
      expiryProgress: 60,
    },
  },
  {
    label: "Scenario: Sunny + Lunch Rush Avoided",
    chips: [
      { icon: <Sun className="w-3.5 h-3.5" />, text: "22°C · Sunny" },
      { icon: <Clock className="w-3.5 h-3.5" />, text: "12:34 · Lunch" },
      { dot: "quiet", text: "Bäckerei Becker quiet" },
    ],
    why: "Mild weather (22°C) · Lunch hour · Bäckerei Becker has low transaction volume right now",
    offer: {
      weatherIcon: <Sun className="w-4 h-4" />,
      weatherLabel: "22°C",
      headline: "Skip the queue. Lunch is on us.",
      merchant: "Bäckerei Becker",
      distance: "120m away",
      discount: "10% off",
      expiryMinutes: 8,
      expiryProgress: 40,
    },
  },
  {
    label: "Scenario: Evening + Event Nearby",
    chips: [
      { icon: <Sun className="w-3.5 h-3.5" />, text: "17°C · Clear" },
      { icon: <Clock className="w-3.5 h-3.5" />, text: "19:10 · Evening" },
      { dot: "busy", text: "Pizzeria Napoli busy" },
      { extra: true, text: "Marktplatz Event tonight" },
    ],
    why: "Mild evening (17°C) · Concert at Marktplatz · Pizzeria Napoli is on the route",
    offer: {
      weatherIcon: <Sun className="w-4 h-4" />,
      weatherLabel: "17°C",
      headline: "Concert tonight. Grab a bite first.",
      merchant: "Pizzeria Napoli",
      distance: "200m away",
      discount: "20% off",
      expiryMinutes: 20,
      expiryProgress: 80,
    },
  },
];

const ScenarioBlock = ({ s }: { s: Scenario }) => {
  const [open, setOpen] = useState(false);
  return (
    <section className="flex flex-col gap-3">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{s.label}</h3>

      <div className="flex gap-2 overflow-x-auto -mx-4 px-4 pb-1">
        {s.chips.map((c, i) => (
          <ContextChip
            key={i}
            icon={
              c.dot ? (
                <span
                  className={`inline-block w-2 h-2 rounded-full ${
                    c.dot === "quiet" ? "bg-signal-quiet" : "bg-signal-busy"
                  }`}
                />
              ) : (
                c.icon
              )
            }
          >
            {c.text}
          </ContextChip>
        ))}
      </div>

      <div>
        <button
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center gap-1 text-[13px] text-muted-foreground"
        >
          Why this offer?
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
        <div
          className={`grid transition-all duration-200 ${open ? "grid-rows-[1fr] mt-2" : "grid-rows-[0fr]"}`}
        >
          <div className="overflow-hidden">
            <p className="text-[13px] text-muted-foreground">{s.why}</p>
          </div>
        </div>
      </div>

      <OfferCard {...s.offer} />

      <div className="flex items-center justify-center gap-1.5 pt-1" aria-label="Swipe for more offers">
        <span className="w-2 h-2 rounded-full bg-brand-purple" />
        <span className="w-2 h-2 rounded-full bg-muted" />
        <span className="w-2 h-2 rounded-full bg-muted" />
      </div>
      <p className="text-center text-[11px] text-muted-foreground -mt-1">Swipe for more offers</p>
    </section>
  );
};

const Index = () => {
  useEffect(() => {
    const t = setTimeout(() => {
      toast("Weather update: now 9°C · New offer available", {
        duration: 4000,
        className:
          "!bg-brand-purple !text-white !border-brand-purple [&_*]:!text-white",
      });
    }, 10000);
    return () => clearTimeout(t);
  }, []);

  return (
    <MobileShell>
      <TopBar />
      <main className="px-4 pb-28 flex flex-col gap-8 animate-fade-in">
        {scenarios.map((s, i) => (
          <ScenarioBlock key={i} s={s} />
        ))}
      </main>
      <BottomNav />
    </MobileShell>
  );
};

export default Index;
