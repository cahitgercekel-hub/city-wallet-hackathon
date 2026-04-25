import { useState } from "react";

export type WeatherType = "rain" | "sun" | "cloud" | "snow" | "storm";
export type OfferState = "active" | "dismissed" | "expired" | "accepted";

export interface OfferCardProps {
  headline: string;
  subline?: string;
  merchant: string;
  distance: string;
  discount: string;
  expiryMinutes: number;
  temp: string;
  weatherType: WeatherType;
  timeAgo: string;
  onAccept: () => void;
  onDismiss: () => void;
  state: OfferState;
}

const WeatherIcon = ({ type }: { type: WeatherType }) => {
  const common = {
    width: 20,
    height: 20,
    viewBox: "0 0 20 20",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (type) {
    case "rain":
      return (
        <svg {...common}>
          <path d="M5 10a2.5 2.5 0 0 1 .5-4.95A3.5 3.5 0 0 1 12 6a2.5 2.5 0 0 1 .5 4.95H5z" />
          <line x1="6" y1="14" x2="5.5" y2="17" />
          <line x1="9.5" y1="14" x2="9" y2="17" />
          <line x1="13" y1="14" x2="12.5" y2="17" />
        </svg>
      );
    case "sun":
      return (
        <svg {...common}>
          <circle cx="10" cy="10" r="3" />
          <line x1="10" y1="2" x2="10" y2="4" />
          <line x1="10" y1="16" x2="10" y2="18" />
          <line x1="2" y1="10" x2="4" y2="10" />
          <line x1="16" y1="10" x2="18" y2="10" />
          <line x1="4.3" y1="4.3" x2="5.7" y2="5.7" />
          <line x1="14.3" y1="14.3" x2="15.7" y2="15.7" />
          <line x1="4.3" y1="15.7" x2="5.7" y2="14.3" />
          <line x1="14.3" y1="5.7" x2="15.7" y2="4.3" />
        </svg>
      );
    case "cloud":
      return (
        <svg {...common}>
          <rect x="2" y="9" width="11" height="6" rx="3" />
          <rect x="7" y="6" width="11" height="6" rx="3" />
        </svg>
      );
    case "snow":
      return (
        <svg {...common}>
          <circle cx="10" cy="10" r="2" />
          <line x1="10" y1="3" x2="10" y2="17" />
          <line x1="3.5" y1="6.5" x2="16.5" y2="13.5" />
          <line x1="3.5" y1="13.5" x2="16.5" y2="6.5" />
        </svg>
      );
    case "storm":
      return (
        <svg {...common}>
          <path d="M5 10a2.5 2.5 0 0 1 .5-4.95A3.5 3.5 0 0 1 12 6a2.5 2.5 0 0 1 .5 4.95H5z" />
          <polyline points="9,12 7,16 10,16 8,19" />
        </svg>
      );
  }
};

const PinIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 11s4-3.5 4-6.5a4 4 0 1 0-8 0C2 7.5 6 11 6 11z" />
    <circle cx="6" cy="4.5" r="1.3" />
  </svg>
);

const OfferCard = ({
  headline,
  merchant,
  distance,
  discount,
  expiryMinutes,
  temp,
  weatherType,
  timeAgo,
  onAccept,
  onDismiss,
  state,
}: OfferCardProps) => {
  const [undone, setUndone] = useState(false);

  const isDismissed = state === "dismissed";
  const isExpired = state === "expired";
  const isAccepted = state === "accepted";

  const fillPercent = isExpired ? 0 : Math.max(0, Math.min(100, (expiryMinutes / 20) * 100));

  if (isDismissed && !undone) {
    return (
      <div className="w-full">
        <div
          className="w-full transition-all duration-300"
          style={{ opacity: 0, transform: "translateY(20px)", maxHeight: 0, overflow: "hidden" }}
        />
        <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F3F4F6] text-[13px] text-[#6B7280]">
          <span>Offer dismissed ·</span>
          <button
            onClick={() => setUndone(true)}
            className="text-[#534AB7] font-medium hover:underline"
          >
            Undo
          </button>
        </div>
      </div>
    );
  }

  return (
    <article
      className={`relative w-full bg-white border rounded-2xl p-4 flex flex-col gap-2.5 overflow-hidden transition-all duration-300 ${
        isAccepted ? "border-[2px] border-[#1D9E75] animate-[accepted-pulse_400ms_ease-out]" : "border-[0.5px] border-[#E5E7EB]"
      } ${isExpired ? "grayscale" : ""}`}
      style={{ maxHeight: 320 }}
    >
      <style>{`@keyframes accepted-pulse{0%{transform:scale(1)}50%{transform:scale(1.02)}100%{transform:scale(1)}}`}</style>

      {/* ROW 1 — Meta */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-1.5 text-[12px] text-[#6B7280]">
          <WeatherIcon type={weatherType} />
          <span>
            {temp} · {timeAgo}
          </span>
        </div>
      </div>

      {/* ROW 2 — Headline */}
      <h2
        className={`text-[20px] font-semibold leading-[1.3] text-left line-clamp-2 ${
          isAccepted ? "text-[#1D9E75]" : "text-[#111827]"
        }`}
      >
        {isAccepted ? "On your way!" : headline}
      </h2>

      {/* ROW 3 — Subline */}
      <p className="flex items-center gap-1 text-[14px] text-[#6B7280]">
        <PinIcon />
        <span>
          {merchant} · {distance} away
        </span>
      </p>

      {/* ROW 4 — Badges */}
      <div className="flex items-center gap-2 flex-wrap">
        <span
          className={`px-3.5 py-1 rounded-full text-[12px] font-bold ${
            isExpired ? "bg-[#E5E7EB] text-[#6B7280]" : "bg-primary text-white"
          }`}
          style={{ paddingLeft: 14, paddingRight: 14, paddingTop: 4, paddingBottom: 4 }}
        >
          {discount}
        </span>
        {weatherType === "rain" && !isExpired && (
          <span className="px-3 py-1 rounded-full text-[12px] bg-[#E6F1FB] text-[#0C447C]">
            Perfect weather to stay in
          </span>
        )}
        {expiryMinutes <= 5 && !isExpired && (
          <span className="px-3 py-1 rounded-full text-[12px] bg-[#FAEEDA] text-[#633806]">
            Almost gone
          </span>
        )}
      </div>

      {/* ROW 5 — Expiry bar */}
      <div>
        <div className="w-full h-1 bg-[#F3F4F6] rounded-[2px] overflow-hidden">
          <div
            className={isExpired || isAccepted ? "" : "animate-expiry-shrink"}
            style={{
              width: `${fillPercent}%`,
              height: "100%",
              background: "hsl(var(--primary))",
              borderRadius: 2,
              animationDuration: `${expiryMinutes * 60}s`,
              transformOrigin: "left",
            }}
          />
        </div>
        <div className="flex items-center justify-end gap-1.5 mt-1">
          {!isExpired && !isAccepted && (
            <span
              className="inline-block w-2 h-2 rounded-full animate-urgent-pulse"
              style={{ background: "hsl(var(--primary))" }}
              aria-hidden="true"
            />
          )}
          <span className="text-[13px] font-bold text-foreground">
            {isExpired ? "0" : expiryMinutes} min left
          </span>
        </div>
      </div>

      {/* ROW 6 — Buttons */}
      <div className="flex gap-2 mt-auto">
        <button
          onClick={onAccept}
          disabled={isExpired}
          className={`flex-[2] h-12 rounded-xl text-[16px] font-extrabold tracking-wide text-white transition shadow-md ${
            isAccepted ? "bg-[#1D9E75]" : "bg-primary hover:opacity-90"
          } ${isExpired ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {isAccepted ? "Accepted ✓" : "Get Now →"}
        </button>
        <button
          onClick={onDismiss}
          disabled={isExpired || isAccepted}
          className={`flex-1 h-12 rounded-xl text-[14px] font-medium text-primary bg-transparent transition hover:bg-primary/5 ${
            isExpired ? "opacity-50 cursor-not-allowed" : ""
          }`}
          style={{ border: "1.5px solid hsl(var(--primary))" }}
        >
          Maybe Later
        </button>
      </div>

      {/* Expired overlay */}
      {isExpired && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/60 pointer-events-none">
          <span className="text-[16px] font-bold text-[#6B7280]">Offer expired</span>
        </div>
      )}
    </article>
  );
};

export default OfferCard;
