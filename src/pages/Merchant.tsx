import { useState, FormEvent } from "react";
import MobileShell from "@/components/MobileShell";

const rows = [
  { date: "Apr 24", shown: 47, accepted: 16, avg: "18%", cashback: "€12.40" },
  { date: "Apr 23", shown: 52, accepted: 19, avg: "20%", cashback: "€14.10" },
  { date: "Apr 22", shown: 39, accepted: 11, avg: "15%", cashback: "€8.70" },
  { date: "Apr 21", shown: 61, accepted: 24, avg: "22%", cashback: "€18.20" },
  { date: "Apr 20", shown: 44, accepted: 14, avg: "17%", cashback: "€10.30" },
];

const Merchant = () => {
  const [discount, setDiscount] = useState(15);
  const [goal, setGoal] = useState("quiet");

  return (
    <MobileShell>
      <header className="px-5 pt-6 pb-4">
        <h1 className="text-2xl font-bold text-brand-blue">Merchant Panel</h1>
      </header>

      <main className="px-5 pb-10">
        <form onSubmit={(e: FormEvent) => e.preventDefault()} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium mb-1.5">Merchant name</label>
            <input
              type="text"
              defaultValue="Café Müller"
              className="w-full px-3 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:border-brand-blue"
            />
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1.5">
              <label className="font-medium">Max discount</label>
              <span className="text-brand-blue font-semibold">{discount}%</span>
            </div>
            <input
              type="range"
              min={5}
              max={30}
              value={discount}
              onChange={(e) => setDiscount(Number(e.target.value))}
              className="w-full accent-brand-blue"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1.5">Active from</label>
              <input type="time" defaultValue="10:00" className="w-full px-3 py-2.5 rounded-xl border border-border bg-background" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Active until</label>
              <input type="time" defaultValue="14:00" className="w-full px-3 py-2.5 rounded-xl border border-border bg-background" />
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Campaign goal</p>
            <div className="flex flex-col gap-2">
              {[
                { v: "quiet", l: "Fill quiet hours" },
                { v: "new", l: "Attract new customers" },
                { v: "stock", l: "Clear stock" },
              ].map((o) => (
                <label key={o.v} className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="goal"
                    value={o.v}
                    checked={goal === o.v}
                    onChange={(e) => setGoal(e.target.value)}
                    className="accent-brand-blue"
                  />
                  {o.l}
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-brand-blue text-white font-medium hover:opacity-90 transition"
          >
            Activate Offer
          </button>
        </form>

        <section className="grid grid-cols-3 gap-2 mt-8">
          {[
            { label: "Shown", value: "47" },
            { label: "Acceptance", value: "34%" },
            { label: "Cashback", value: "€12.40" },
          ].map((m) => (
            <div key={m.label} className="rounded-xl border border-border p-3 text-center">
              <p className="text-xs text-muted-foreground">{m.label}</p>
              <p className="text-base font-semibold mt-1">{m.value}</p>
            </div>
          ))}
        </section>

        <section className="mt-8 overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="py-2 pr-2">Date</th>
                <th className="py-2 pr-2">Shown</th>
                <th className="py-2 pr-2">Accepted</th>
                <th className="py-2 pr-2">Avg %</th>
                <th className="py-2">Cashback</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.date} className="border-b border-border">
                  <td className="py-2 pr-2">{r.date}</td>
                  <td className="py-2 pr-2">{r.shown}</td>
                  <td className="py-2 pr-2">{r.accepted}</td>
                  <td className="py-2 pr-2">{r.avg}</td>
                  <td className="py-2">{r.cashback}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </MobileShell>
  );
};

export default Merchant;
