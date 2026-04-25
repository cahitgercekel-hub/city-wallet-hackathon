import { Settings } from "lucide-react";
import { Link } from "react-router-dom";
import MobileShell from "@/components/MobileShell";

const chips = ["Rain 11°C", "12:34 Lunch", "Café quiet 🔴"];

const Index = () => {
  return (
    <MobileShell>
      <header className="flex items-center justify-between px-5 pt-5 pb-3">
        <h1 className="text-xl font-semibold text-foreground">City Wallet</h1>
        <button aria-label="Settings" className="p-2 rounded-full hover:bg-muted">
          <Settings className="w-5 h-5" />
        </button>
      </header>

      <div className="px-5 flex gap-2 overflow-x-auto pb-4">
        {chips.map((c) => (
          <span key={c} className="shrink-0 text-xs px-3 py-1.5 rounded-full bg-muted text-muted-foreground">
            {c}
          </span>
        ))}
      </div>

      <main className="px-5 pb-10">
        <article className="w-full rounded-2xl border border-border bg-card p-6 flex flex-col gap-4">
          <h2 className="text-2xl font-bold leading-tight text-foreground">
            Warm latte, quiet corner — 20% off right now
          </h2>
          <p className="text-sm text-muted-foreground">
            Café Müller · 220 m away
          </p>

          <div className="flex items-center gap-2">
            <span className="inline-block px-3 py-1 rounded-full bg-brand-purple text-white text-xs font-semibold">
              -20%
            </span>
            <span className="text-xs text-muted-foreground">Cashback offer</span>
          </div>

          <div>
            <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
              <span>Expires in</span>
              <span>14:32</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-brand-purple rounded-full" style={{ width: "65%" }} />
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <Link
              to="/offer"
              className="w-full text-center py-3 rounded-xl bg-brand-purple text-white font-medium hover:opacity-90 transition"
            >
              Get Now
            </Link>
            <button className="w-full py-3 rounded-xl border border-border text-foreground font-medium hover:bg-muted transition">
              Maybe Later
            </button>
          </div>
        </article>

        <nav className="mt-8 flex flex-col gap-2 text-sm">
          <Link to="/merchant" className="text-muted-foreground hover:underline">→ Merchant Dashboard</Link>
          <Link to="/redeem" className="text-muted-foreground hover:underline">→ Redemption</Link>
        </nav>
      </main>
    </MobileShell>
  );
};

export default Index;
