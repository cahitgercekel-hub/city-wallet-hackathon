import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Star, User } from "lucide-react";
import MobileShell from "@/components/MobileShell";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import InAppPushNotification from "@/components/InAppPushNotification";
import CountUp from "@/components/CountUp";
import RatingModal from "@/components/RatingModal";

interface Redemption {
  id: string;
  merchant: string;
  saved: string;
  when: string;
  rated?: boolean;
}

const initialRedemptions: Redemption[] = [
  { id: "r1", merchant: "Café Müller", saved: "€1.80 saved", when: "Yesterday" },
  { id: "r2", merchant: "Bäckerei Becker", saved: "€0.90 saved", when: "2 days ago" },
  { id: "r3", merchant: "Pizzeria Napoli", saved: "€3.20 saved", when: "Last week" },
];

const stats = [
  { label: "Cashback", to: 12.4, prefix: "€", decimals: 2 },
  { label: "Offers used", to: 16, decimals: 0 },
  { label: "CO₂ saved", to: 1.4, suffix: "kg", decimals: 1 },
];

const Profile = () => {
  const navigate = useNavigate();
  const [showPush, setShowPush] = useState(false);
  const [redemptions, setRedemptions] = useState(initialRedemptions);
  const [rating, setRating] = useState<Redemption | null>(null);

  const handleSubmit = () => {
    if (!rating) return;
    setRedemptions((rs) => rs.map((r) => (r.id === rating.id ? { ...r, rated: true } : r)));
    setRating(null);
  };

  return (
    <MobileShell>
      <TopBar title="Profile" showActions />
      <main className="px-4 pb-28 flex flex-col gap-6 animate-fade-in">
        {/* User header — clickable */}
        <button
          onClick={() => navigate("/account")}
          className="flex items-center gap-3 pt-2 text-left hover:opacity-80 transition"
        >
          <div className="w-14 h-14 rounded-full bg-brand-purple/10 text-brand-purple flex items-center justify-center">
            <User className="w-7 h-7" />
          </div>
          <div>
            <p className="text-base font-bold">Mia Schmidt</p>
            <p className="text-xs text-muted-foreground">Tap to view account</p>
          </div>
        </button>

        {/* Stats with stagger fade-in + count-up */}
        <div className="grid grid-cols-3 gap-2">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="rounded-xl border border-border p-3 text-center opacity-0"
              style={{
                animation: `fade-in 0.5s ease-out ${i * 120}ms forwards`,
              }}
            >
              <p className="text-[18px] font-bold text-brand-purple tabular-nums">
                <CountUp
                  to={s.to}
                  prefix={s.prefix ?? ""}
                  suffix={s.suffix ?? ""}
                  decimals={s.decimals}
                />
              </p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Recent Redemptions */}
        <section className="flex flex-col gap-3">
          <h3 className="text-[15px] font-bold">Recent Redemptions</h3>
          <ul className="rounded-2xl border border-border overflow-hidden">
            {redemptions.map((r, i) => (
              <li
                key={r.id}
                className={`flex items-center justify-between px-4 py-3 ${
                  i > 0 ? "border-t border-border" : ""
                }`}
              >
                <div>
                  <p className="text-sm font-semibold">{r.merchant}</p>
                  <p className="text-[12px] text-muted-foreground mt-0.5">
                    {r.saved} · {r.when}
                  </p>
                </div>
                <button
                  onClick={() => !r.rated && setRating(r)}
                  disabled={r.rated}
                  className={`inline-flex items-center gap-1.5 px-3 h-8 rounded-full text-[12px] font-semibold transition ${
                    r.rated
                      ? "text-[#1D9E75] bg-[#1D9E75]/10 cursor-default"
                      : "text-brand-purple hover:bg-brand-purple/10"
                  }`}
                >
                  <Star
                    className="w-3.5 h-3.5"
                    fill={r.rated ? "#1D9E75" : "transparent"}
                    strokeWidth={2}
                  />
                  {r.rated ? "Rated ✓" : "Rate"}
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* Dev tools (kept) */}
        <div className="rounded-2xl border border-dashed border-border p-4 flex flex-col gap-2">
          <p className="text-[11px] uppercase tracking-wide font-bold text-muted-foreground">
            Developer tools
          </p>
          <button
            onClick={() => setShowPush(true)}
            disabled={showPush}
            className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-foreground text-background text-sm font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            <Bell className="w-4 h-4" />
            Test Firebase Push
          </button>
        </div>
      </main>

      <InAppPushNotification show={showPush} onClose={() => setShowPush(false)} />
      <RatingModal
        open={!!rating}
        merchant={rating?.merchant ?? ""}
        onClose={() => setRating(null)}
        onSubmit={handleSubmit}
      />

      <BottomNav />
    </MobileShell>
  );
};

export default Profile;
