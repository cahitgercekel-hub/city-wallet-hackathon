import { useState } from "react";
import { Link } from "react-router-dom";
import { Clock, Check } from "lucide-react";
import MobileShell from "@/components/MobileShell";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";

const QrState = () => (
  <section className="flex flex-col items-center gap-3 animate-fade-in">
    <h2 className="text-[18px] font-bold">Show at counter</h2>
    <p className="text-sm text-muted-foreground">Café Müller · 15% off</p>

    <div className="w-[200px] h-[200px] my-2 border-2 border-dashed border-brand-purple rounded-xl bg-muted/40 flex items-center justify-center">
      <span className="text-muted-foreground font-semibold">QR CODE</span>
    </div>

    <p className="font-mono text-[11px] tracking-wider text-foreground">CW-7F3A-2B9E-4D1C</p>

    <div className="flex items-center gap-1.5 text-sm text-signal-warning">
      <Clock className="w-4 h-4" />
      <span>09:47 remaining</span>
    </div>

    <p className="text-xs text-muted-foreground">This code expires and cannot be reused</p>
  </section>
);

const SuccessState = () => (
  <section className="flex flex-col items-center gap-3 animate-fade-in">
    <div className="w-16 h-16 rounded-full bg-signal-success flex items-center justify-center">
      <Check className="w-8 h-8 text-white" strokeWidth={3} />
    </div>
    <h2 className="text-[20px] font-bold">Payment Confirmed</h2>
    <p className="text-sm text-signal-success">€1.80 cashback added to your account</p>

    <div className="h-px bg-border w-full my-2" />

    <div className="w-full rounded-xl border border-border p-4 text-sm flex flex-col gap-2">
      {[
        ["Merchant", "Café Müller"],
        ["Original discount", "15%"],
        ["Cashback", "€1.80"],
        ["Token", "CW-7F3A-2B9E-4D1C"],
        ["Time", "12:36 today"],
      ].map(([k, v]) => (
        <div key={k} className="flex justify-between gap-3">
          <span className="text-muted-foreground">{k}</span>
          <span className="font-medium text-right">{v}</span>
        </div>
      ))}
    </div>

    <Link
      to="/"
      className="w-full mt-2 text-center py-3 rounded-xl border border-brand-purple text-brand-purple font-medium hover:bg-brand-purple/5 transition"
    >
      Back to Home
    </Link>
  </section>
);

const Redeem = () => {
  const [scanned, setScanned] = useState(false);

  return (
    <MobileShell>
      <TopBar title="Redeem" />
      <main className="px-4 pb-28 flex flex-col gap-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
            Step 1: QR Display
          </p>
          {!scanned && <QrState />}
          {scanned && (
            <p className="text-sm text-muted-foreground text-center py-6">QR scanned ✓</p>
          )}
        </div>

        <button
          onClick={() => setScanned((v) => !v)}
          className="w-full py-3 rounded-xl bg-brand-purple text-white font-medium hover:opacity-90 transition"
        >
          {scanned ? "Reset" : "Simulate Scan"}
        </button>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
            Step 2: Payment Confirmed (after scan)
          </p>
          {scanned ? (
            <SuccessState />
          ) : (
            <p className="text-sm text-muted-foreground text-center py-6">
              Tap "Simulate Scan" to confirm payment
            </p>
          )}
        </div>
      </main>
      <BottomNav />
    </MobileShell>
  );
};

export default Redeem;
