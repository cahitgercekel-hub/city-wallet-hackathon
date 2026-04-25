import { Link } from "react-router-dom";
import { ChevronRight, User } from "lucide-react";
import MobileShell from "@/components/MobileShell";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";

const links = [
  { to: "/privacy", label: "GDPR & Privacy" },
  { to: "/merchant", label: "Merchant Dashboard" },
  { to: "/redeem", label: "My Redemptions" },
];

const Profile = () => (
  <MobileShell>
    <TopBar title="Profile" showActions />
    <main className="px-4 pb-28 flex flex-col gap-6 animate-fade-in">
      <div className="flex items-center gap-3 pt-2">
        <div className="w-14 h-14 rounded-full bg-brand-purple/10 text-brand-purple flex items-center justify-center">
          <User className="w-7 h-7" />
        </div>
        <div>
          <p className="text-base font-bold">City Wallet User</p>
          <p className="text-xs text-muted-foreground">Stuttgart Mitte · Member since 2025</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[
          { l: "Cashback", v: "€12.40" },
          { l: "Offers used", v: "16" },
          { l: "CO₂ saved", v: "1.4kg" },
        ].map((s) => (
          <div key={s.l} className="rounded-xl border border-border p-3 text-center">
            <p className="text-[18px] font-bold text-brand-purple">{s.v}</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">{s.l}</p>
          </div>
        ))}
      </div>

      <nav className="rounded-2xl border border-border overflow-hidden">
        {links.map((l, i) => (
          <Link
            key={l.to}
            to={l.to}
            className={`flex items-center justify-between px-4 py-3.5 hover:bg-muted ${
              i > 0 ? "border-t border-border" : ""
            }`}
          >
            <span className="text-sm">{l.label}</span>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </Link>
        ))}
      </nav>
    </main>
    <BottomNav />
  </MobileShell>
);

export default Profile;
