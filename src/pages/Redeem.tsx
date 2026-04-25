import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Clock } from "lucide-react";
import MobileShell from "@/components/MobileShell";
import BottomNav from "@/components/BottomNav";

const SuccessOverlay = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const t = setTimeout(() => navigate("/"), 2500);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center animate-fade-in">
      <style>{`
        @keyframes check-pop {
          0% { transform: scale(0); opacity: 0; }
          60% { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes check-ring {
          0% { transform: scale(0.5); opacity: 0.6; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes check-draw {
          from { stroke-dashoffset: 60; }
          to { stroke-dashoffset: 0; }
        }
      `}</style>
      <div className="relative">
        <span
          className="absolute inset-0 rounded-full bg-signal-success/30"
          style={{ animation: "check-ring 1.2s ease-out forwards" }}
          aria-hidden="true"
        />
        <div
          className="relative w-28 h-28 rounded-full bg-signal-success flex items-center justify-center shadow-lg"
          style={{ animation: "check-pop 500ms cubic-bezier(0.22,1,0.36,1) forwards" }}
        >
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
            <path
              d="M14 29 L24 39 L42 19"
              stroke="white"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="60"
              style={{ animation: "check-draw 450ms ease-out 250ms forwards", strokeDashoffset: 60 }}
            />
          </svg>
        </div>
      </div>
      <h2 className="mt-8 text-[24px] font-bold text-foreground">Payment Confirmed</h2>
      <p className="mt-2 text-[15px] text-muted-foreground">€1.80 cashback added</p>
    </div>
  );
};

const Redeem = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(9 * 60 + 47);

  useEffect(() => {
    if (success) return;
    const id = setInterval(() => setSecondsLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, [success]);

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");

  return (
    <MobileShell>
      {/* Header */}
      <header className="flex items-center h-14 px-2">
        <button
          onClick={() => navigate("/offer-detail")}
          aria-label="Back"
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted transition"
        >
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
      </header>

      <main className="px-6 pb-28 flex flex-col items-center justify-center min-h-[calc(100vh-14rem)] gap-6 animate-fade-in">
        <div className="text-center">
          <h2 className="text-[20px] font-bold text-foreground">Show at counter</h2>
          <p className="text-[14px] text-muted-foreground mt-1">Café Müller · 15% off</p>
        </div>

        <div className="w-[220px] h-[220px] rounded-2xl bg-white border border-border shadow-sm flex items-center justify-center">
          <div
            className="w-[180px] h-[180px] rounded-lg"
            style={{
              backgroundImage:
                "repeating-conic-gradient(hsl(var(--foreground)) 0% 25%, white 0% 50%)",
              backgroundSize: "16px 16px",
            }}
            aria-label="QR code"
            role="img"
          />
        </div>

        <p className="font-mono text-[12px] tracking-[0.2em] text-foreground">
          CW-7F3A-2B9E-4D1C
        </p>

        <div className="flex items-center gap-1.5 text-[14px] font-semibold text-signal-warning">
          <Clock className="w-4 h-4" />
          <span className="font-mono">
            {mm}:{ss} remaining
          </span>
        </div>

        <p className="text-[12px] text-muted-foreground text-center">
          This code expires and cannot be reused
        </p>

        <button
          onClick={() => setSuccess(true)}
          className="w-full max-w-[280px] mt-4 h-14 rounded-2xl bg-primary text-primary-foreground text-[17px] font-bold shadow-md hover:opacity-90 transition flex items-center justify-center gap-2"
        >
          <Check className="w-5 h-5" strokeWidth={3} />
          Scan
        </button>
      </main>

      <BottomNav />
      {success && <SuccessOverlay />}
    </MobileShell>
  );
};

export default Redeem;
