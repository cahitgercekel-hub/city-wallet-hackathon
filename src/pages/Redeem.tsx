import { useState } from "react";
import { Link } from "react-router-dom";
import MobileShell from "@/components/MobileShell";

const Redeem = () => {
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <MobileShell>
        <main className="px-5 pt-20 pb-10 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-brand-purple flex items-center justify-center mb-6">
            <span
              className="block w-8 h-4 border-l-[3px] border-b-[3px] border-white -rotate-45 -translate-y-1"
              aria-hidden
            />
          </div>
          <h1 className="text-2xl font-bold mb-2">Payment Confirmed</h1>
          <p className="text-muted-foreground mb-10">
            €1.80 cashback added to your account
          </p>
          <Link
            to="/"
            className="w-full py-3 rounded-xl bg-brand-purple text-white font-medium hover:opacity-90 transition"
          >
            Back to Home
          </Link>
        </main>
      </MobileShell>
    );
  }

  return (
    <MobileShell>
      <main className="px-5 pt-10 pb-10 flex flex-col items-center">
        <div className="w-[200px] h-[200px] bg-muted flex items-center justify-center rounded-xl mb-6">
          <span className="text-muted-foreground font-semibold">QR CODE</span>
        </div>
        <p className="font-mono text-sm tracking-wider text-foreground mb-3">
          TKN-9F4C-2B71-EE08
        </p>
        <p className="text-3xl font-bold text-brand-purple mb-8">10:00</p>
        <button
          onClick={() => setDone(true)}
          className="w-full py-3 rounded-xl bg-brand-purple text-white font-medium hover:opacity-90 transition"
        >
          Simulate Scan
        </button>
      </main>
    </MobileShell>
  );
};

export default Redeem;
