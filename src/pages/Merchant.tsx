import { useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import MobileShell from "@/components/MobileShell";

const metrics = [
  { label: "Offers Shown", value: "47" },
  { label: "Acceptance Rate", value: "34%" },
  { label: "Total Cashback Paid", value: "€12.40" },
  { label: "Avg Discount Used", value: "15%" },
];

const rows = [
  { d: "25.04", s: 12, a: 4, avg: "15%", c: "€3.20" },
  { d: "24.04", s: 9, a: 3, avg: "18%", c: "€2.70" },
  { d: "23.04", s: 11, a: 5, avg: "12%", c: "€3.00" },
  { d: "22.04", s: 8, a: 2, avg: "20%", c: "€2.00" },
  { d: "21.04", s: 7, a: 2, avg: "14%", c: "€1.50" },
];

const Merchant = () => {
  const [discount, setDiscount] = useState(20);
  const [goal, setGoal] = useState("quiet");
  const [saved, setSaved] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 4000);
  };

  return (
    <MobileShell>
      <header className="px-4 pt-5 pb-4 border-b border-border flex items-center gap-2">
        <Link
          to="/profile"
          aria-label="Back to profile"
          className="p-2 -ml-2 rounded-full hover:bg-muted"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" strokeWidth={2.5} />
        </Link>
        <h1 className="text-xl font-bold text-brand-blue">Merchant Panel</h1>
      </header>

      <main className="px-4 py-5 flex flex-col gap-7 animate-fade-in">
        <section className="grid grid-cols-2 gap-2">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-xl bg-brand-blue-soft p-3 text-brand-blue-deep"
            >
              <p className="text-[12px] leading-tight">{m.label}</p>
              <p className="text-[22px] font-bold mt-1 leading-none">{m.value}</p>
            </div>
          ))}
        </section>

        <form onSubmit={submit} className="rounded-2xl border border-border p-4 flex flex-col gap-4">
          <h2 className="text-base font-bold">Set Offer Rules</h2>

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
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={0}
                max={100}
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
                className="flex-1 accent-brand-blue"
              />
              <div className="flex items-center rounded-xl border border-border bg-background overflow-hidden">
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={discount}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    if (Number.isNaN(v)) return;
                    setDiscount(Math.max(0, Math.min(100, v)));
                  }}
                  className="w-14 px-2 py-2 text-sm text-right bg-transparent focus:outline-none"
                  aria-label="Max discount percentage"
                />
                <span className="px-2 text-sm text-muted-foreground">%</span>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-1.5">Active hours</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-muted-foreground mb-1">From</label>
                <input
                  type="time"
                  defaultValue="10:00"
                  className="w-full px-3 py-2.5 rounded-xl border border-border bg-background"
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Until</label>
                <input
                  type="time"
                  defaultValue="14:00"
                  className="w-full px-3 py-2.5 rounded-xl border border-border bg-background"
                />
              </div>
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

          {saved && (
            <div className="rounded-xl bg-signal-success/10 border border-signal-success/30 text-signal-success text-sm p-3 animate-fade-in">
              Offer rules saved. AI will generate offers automatically.
            </div>
          )}
        </form>

        <section>
          <h2 className="text-sm font-bold mb-3">Recent Performance</h2>

          {/* Bar chart */}
          {(() => {
            const maxVal = Math.max(...rows.map((r) => r.s));
            return (
              <div className="rounded-2xl border border-border p-4 mb-3">
                <div className="flex items-center gap-4 mb-3 text-[11px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-brand-blue inline-block" />
                    Shown
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-signal-success inline-block" />
                    Accepted
                  </span>
                </div>
                <div className="flex items-end justify-between gap-2 h-32">
                  {[...rows].reverse().map((r) => {
                    const shownH = (r.s / maxVal) * 100;
                    const acceptedH = (r.a / maxVal) * 100;
                    return (
                      <div key={r.d} className="flex-1 flex flex-col items-center gap-1.5">
                        <div className="w-full flex items-end justify-center gap-1 h-full">
                          <div
                            className="w-1/2 rounded-t-md bg-brand-blue transition-all"
                            style={{ height: `${shownH}%` }}
                            title={`Shown: ${r.s}`}
                          />
                          <div
                            className="w-1/2 rounded-t-md bg-signal-success transition-all"
                            style={{ height: `${acceptedH}%` }}
                            title={`Accepted: ${r.a}`}
                          />
                        </div>
                        <span className="text-[10px] text-muted-foreground">{r.d}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}

          {/* Raw data table */}
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full text-xs">
              <thead className="bg-brand-blue-soft text-brand-blue-deep">
                <tr className="text-left">
                  <th className="py-2 px-2 font-semibold whitespace-nowrap">Date</th>
                  <th className="py-2 px-2 font-semibold whitespace-nowrap">Shown</th>
                  <th className="py-2 px-2 font-semibold whitespace-nowrap">Accepted</th>
                  <th className="py-2 px-2 font-semibold whitespace-nowrap">Avg %</th>
                  <th className="py-2 px-2 font-semibold whitespace-nowrap">Cashback</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.d} className="border-t border-border">
                    <td className="py-2 px-2 whitespace-nowrap">{r.d}</td>
                    <td className="py-2 px-2 whitespace-nowrap">{r.s}</td>
                    <td className="py-2 px-2 whitespace-nowrap">{r.a}</td>
                    <td className="py-2 px-2 whitespace-nowrap">{r.avg}</td>
                    <td className="py-2 px-2 whitespace-nowrap">{r.c}</td>
                  </tr>
                ))}
                <tr className="border-t border-border font-bold bg-muted/40">
                  <td className="py-2 px-2 whitespace-nowrap">Total</td>
                  <td className="py-2 px-2 whitespace-nowrap">47</td>
                  <td className="py-2 px-2 whitespace-nowrap">16</td>
                  <td className="py-2 px-2 whitespace-nowrap">15% avg</td>
                  <td className="py-2 px-2 whitespace-nowrap">€12.40</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </MobileShell>
  );
};

export default Merchant;
