import { ArrowLeft, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import MobileShell from "@/components/MobileShell";
import BottomNav from "@/components/BottomNav";

const Offer = () => (
  <MobileShell>
    <header className="flex items-center px-4 pt-4 pb-3 relative">
      <Link to="/" aria-label="Back" className="p-2 -ml-2 rounded-full hover:bg-muted">
        <ArrowLeft className="w-5 h-5" />
      </Link>
      <h1 className="absolute left-1/2 -translate-x-1/2 text-base font-bold">Offer Detail</h1>
    </header>

    <main className="px-4 pb-44 flex flex-col gap-5 animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-brand-purple/10 text-brand-purple flex items-center justify-center font-bold">
          CM
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-base font-bold leading-tight">Café Müller</p>
          <p className="text-xs text-muted-foreground">Café · Stuttgart Mitte</p>
          <p className="text-xs text-muted-foreground inline-flex items-center gap-1 mt-0.5">
            <MapPin className="w-3 h-3" /> 80m away
          </p>
        </div>
      </div>

      <div className="w-full h-40 rounded-xl bg-muted flex items-center justify-center text-muted-foreground text-sm">
        Map · Café Müller
      </div>

      <article className="rounded-2xl border border-border p-5 flex flex-col gap-4">
        <h2 className="text-[20px] font-bold leading-snug">Cold outside? Your coffee is waiting.</h2>
        <p className="text-sm text-foreground leading-relaxed">
          Enjoy any hot drink at 15% off. Valid at the counter — just show this screen. Offer
          generated for this moment based on current weather and demand.
        </p>

        <div>
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-purple text-white text-sm font-semibold">
            15% off
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-signal-warning">
          <Clock className="w-4 h-4" />
          <span>Expires in 11:43</span>
        </div>

        <div className="h-px bg-border" />

        <div>
          <p className="text-sm font-semibold mb-2">How to redeem</p>
          <ol className="text-sm text-muted-foreground flex flex-col gap-1.5 list-decimal list-inside">
            <li>Tap "Get Now" below</li>
            <li>Show QR code at the counter</li>
            <li>Cashback added instantly</li>
          </ol>
        </div>
      </article>
    </main>

    <div className="fixed bottom-14 left-1/2 -translate-x-1/2 w-full max-w-[390px] px-4 pt-3 pb-3 bg-background border-t border-border">
      <Link
        to="/redeem"
        className="block w-full text-center py-3.5 rounded-xl bg-brand-purple text-white font-medium hover:opacity-90 transition"
      >
        Get Now
      </Link>
      <p className="text-[11px] text-muted-foreground text-center mt-2">
        GDPR: only your intent signal was used. No location data left your device.
      </p>
    </div>

    <BottomNav />
  </MobileShell>
);

export default Offer;
