import { useState } from "react";
import { ArrowLeft, User } from "lucide-react";
import { Link } from "react-router-dom";
import MobileShell from "@/components/MobileShell";

const fieldClass =
  "w-full h-11 px-3.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple/40";

const Account = () => {
  const [form, setForm] = useState({
    name: "Mia Schmidt",
    email: "mia@example.com",
    phone: "+49 151 23456789",
    country: "Germany",
    diet: "everything",
  });
  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  return (
    <MobileShell>
      <header className="flex items-center gap-3 px-4 pt-4 pb-3">
        <Link
          to="/profile"
          aria-label="Back to profile"
          className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-muted/70"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-base font-bold">Account Details</h1>
      </header>

      <main className="px-4 pb-16 flex flex-col gap-5 animate-fade-in">
        <div className="flex items-center gap-3 pt-1">
          <div className="w-16 h-16 rounded-full bg-brand-purple/10 text-brand-purple flex items-center justify-center">
            <User className="w-8 h-8" />
          </div>
          <div>
            <p className="text-base font-bold">{form.name}</p>
            <p className="text-xs text-muted-foreground">Stuttgart Mitte · Member since 2025</p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <label className="flex flex-col gap-1.5">
            <span className="text-[12px] font-semibold text-muted-foreground">Name</span>
            <input
              className={fieldClass}
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-[12px] font-semibold text-muted-foreground">Email</span>
            <input
              type="email"
              className={fieldClass}
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-[12px] font-semibold text-muted-foreground">Phone</span>
            <input
              type="tel"
              className={fieldClass}
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-[12px] font-semibold text-muted-foreground">Country</span>
            <input
              className={fieldClass}
              value={form.country}
              onChange={(e) => set("country", e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-[12px] font-semibold text-muted-foreground">
              Dietary Preferences
            </span>
            <select
              className={fieldClass}
              value={form.diet}
              onChange={(e) => set("diet", e.target.value)}
            >
              <option value="everything">I eat everything</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="not_specified">Not specified</option>
            </select>
          </label>
        </div>

        <button className="w-full mt-4 h-12 rounded-xl bg-destructive text-destructive-foreground font-bold text-[15px] hover:opacity-90 transition">
          Delete Account
        </button>
      </main>
    </MobileShell>
  );
};

export default Account;
