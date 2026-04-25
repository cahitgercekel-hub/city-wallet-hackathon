import { ArrowLeft, ChevronRight, User } from "lucide-react";
import { Link } from "react-router-dom";
import MobileShell from "@/components/MobileShell";

const sections = [
  { to: "/privacy", label: "GDPR & Privacy" },
  { to: "/merchant", label: "Merchant Dashboard" },
  { to: "/redeem", label: "My Redemptions" },
];

const Account = () => (
  <MobileShell>
    <header className="flex items-center gap-3 px-4 pt-4 pb-3">
      <Link
        to="/profile"
        aria-label="Back to profile"
        className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-muted/70"
      >
        <ArrowLeft className="w-5 h-5" />
      </Link>
      <h1 className="text-base font-bold">Account</h1>
    </header>
    <main className="px-4 pb-28 flex flex-col gap-6 animate-fade-in">
      <div className="flex items-center gap-3 pt-2">
        <div className="w-16 h-16 rounded-full bg-brand-purple/10 text-brand-purple flex items-center justify-center">
          <User className="w-8 h-8" />
        </div>
        <div>
          <p className="text-lg font-bold">Mia Schmidt</p>
          <p className="text-xs text-muted-foreground">Stuttgart Mitte · Member since 2025</p>
        </div>
      </div>

      <nav className="rounded-2xl border border-border overflow-hidden">
        {sections.map((l, i) => (
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
  </MobileShell>
);

export default Account;
