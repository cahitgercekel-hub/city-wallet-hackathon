import { ArrowLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import MobileShell from "@/components/MobileShell";

const groups = [
  {
    title: "Your Account",
    items: [
      { label: "Account Details", to: "/account" },
      { label: "Notifications", to: "/settings" },
      { label: "Customer Support", to: "/settings" },
    ],
  },
  {
    title: "Community",
    items: [
      { label: "Invite your friends", to: "/settings" },
      { label: "Rate us", to: "/settings" },
    ],
  },
  {
    title: "Others",
    items: [
      { label: "Merchant Dashboard", to: "/merchant" },
      { label: "Terms & Conditions", to: "/privacy" },
    ],
  },
];

const Settings = () => (
  <MobileShell>
    <header className="flex items-center gap-3 px-4 pt-4 pb-3">
      <Link
        to="/profile"
        aria-label="Back to profile"
        className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-muted/70"
      >
        <ArrowLeft className="w-5 h-5" />
      </Link>
      <h1 className="text-base font-bold">Settings</h1>
    </header>
    <main className="px-4 pb-28 flex flex-col gap-6 animate-fade-in">
      {groups.map((g) => (
        <section key={g.title} className="flex flex-col gap-2">
          <h2 className="text-[11px] uppercase tracking-wide font-bold text-muted-foreground px-1">
            {g.title}
          </h2>
          <nav className="rounded-2xl border border-border overflow-hidden bg-card">
            {g.items.map((l, i) => (
              <Link
                key={l.label}
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
        </section>
      ))}

      <button className="mt-2 w-full py-3 rounded-xl border border-destructive/40 text-destructive font-semibold text-sm hover:bg-destructive/5 transition">
        Delete Account
      </button>
    </main>
  </MobileShell>
);

export default Settings;
