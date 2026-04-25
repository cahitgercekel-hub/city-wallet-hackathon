import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import MobileShell from "@/components/MobileShell";

const Offer = () => (
  <MobileShell>
    <header className="px-5 pt-5 pb-3">
      <Link to="/" aria-label="Back" className="inline-flex p-2 -ml-2 rounded-full hover:bg-muted">
        <ArrowLeft className="w-5 h-5" />
      </Link>
    </header>

    <main className="px-5 pb-32">
      <h1 className="text-2xl font-bold mb-4">Café Müller</h1>

      <div className="w-full h-48 rounded-2xl bg-muted flex items-center justify-center mb-6">
        <span className="text-muted-foreground font-medium">Map</span>
      </div>

      <p className="text-foreground leading-relaxed mb-3">
        Enjoy a warm latte and a quiet corner during off-peak hours. This offer
        gives you 20% off any drink and includes a small pastry of the day.
      </p>
      <p className="text-muted-foreground text-sm leading-relaxed">
        Valid today between 12:00 and 14:00. Show the QR code at checkout to
        redeem. Cashback is credited instantly to your City Wallet balance.
      </p>
    </main>

    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] p-5 bg-background border-t border-border">
      <Link
        to="/redeem"
        className="block w-full text-center py-4 rounded-xl bg-brand-purple text-white font-medium hover:opacity-90 transition"
      >
        Get Now
      </Link>
    </div>
  </MobileShell>
);

export default Offer;
