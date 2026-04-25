import { ArrowLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import MobileShell from "@/components/MobileShell";

interface Item {
  label: string;
  to?: string;
}

const groups: { title: string; items: Item[] }[] = [
  {
    title: "Your Account",
    items: [
      { label: "Account Details", to: "/account" },
      { label: "Notifications" },
      { label: "Customer Support" },
    ],
  },
  {
    title: "Community",
    items: [{ label: "Invite your friends" }, { label: "Rate us" }],
  },
  {
    title: "Others",
    items: [
      { label: "Merchant Dashboard", to: "/merchant" },
      { label: "Privacy & GDPR", to: "/privacy" },
      { label: "Terms & Conditions" },
    ],
  },
];

const Row = ({ item, last }: { item: Item; last: boolean }) => {
  const inner = (
    <div
      className={`flex items-center justify-between px-4 py-3.5 hover:bg-muted ${
        last ? "" : "border-b border-border"
      }`}
    >
      <span className="text-sm">{item.label}</span>
      <ChevronRight className="w-4 h-4 text-muted-foreground" />
    </div>
  );
  return item.to ? <Link to={item.to}>{inner}</Link> : <button className="w-full text-left">{inner}</button>;
};

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

    <main className="px-4 pb-16 flex flex-col gap-6 animate-fade-in">
      {groups.map((g) => (
        <section key={g.title} className="flex flex-col gap-2">
          <h2 className="text-[12px] uppercase tracking-wide font-bold text-muted-foreground px-1">
            {g.title}
          </h2>
          <div className="rounded-2xl border border-border overflow-hidden bg-background">
            {g.items.map((it, i) => (
              <Row key={it.label} item={it} last={i === g.items.length - 1} />
            ))}
          </div>
        </section>
      ))}
    </main>
  </MobileShell>
);

export default Settings;
