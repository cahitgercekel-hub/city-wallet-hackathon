import { useState } from "react";
import { useNow, remainingMs } from "@/store/offersStore";

export type WeatherType = "rain" | "sun" | "cloud" | "snow" | "storm";
export type OfferState = "active" | "dismissed" | "expired" | "accepted";

export interface OfferCardProps {
  headline: string;
  subline?: string;
  merchant: string;
  distance: string;
  discount: string;
  /** Absolute expiration timestamp in ms */
  expiresAt: number;
  /** Total duration of the offer in ms (used for the progress bar fill) */
  totalDurationMs: number;
  temp: string;
  weatherType: WeatherType;
  timeAgo: string;
  onAccept: () => void;
  onDismiss: () => void;
  state: OfferState;
  category?: string;
}

const tintForCategory = (category?: string, weatherType?: WeatherType) => {
  if (weatherType === "rain") return "bg-blue-50";
  switch (category) {
    case "bakery":
      return "bg-orange-50";
    case "coffee":
      return "bg-amber-50";
    case "lunch":
      return "bg-green-50";
    default:
      return "bg-white";
  }
};

const WEATHER_EMOJI: Record<WeatherType, string> = {
  rain: "🌧️",
  sun: "☀️",
  cloud: "☁️",
  snow: "❄️",
  storm: "⛈️",
};

const WeatherIcon = ({ type }: { type: WeatherType }) => (
  <span className="text-[16px] leading-none" aria-hidden="true">
    {WEATHER_EMOJI[type]}
  </span>
);

const PinIcon = () => (
  <span className="text-[14px] leading-none" aria-hidden="true">
    📍
  </span>
);

const OfferCard = ({
  headline,
  merchant,
  distance,
  discount,
  expiresAt,
  totalDurationMs,
  temp,
  weatherType,
  timeAgo,
  onAccept,
  onDismiss,
  state,
  category,
}: OfferCardProps) => {
  const [undone, setUndone] = useState(false);
  useNow(1000); // re-render every second so derived values stay live

  const remainingMsLeft = remainingMs({ expiresAt });
  const remainingMinutes = Math.ceil(remainingMsLeft / 60000);
  const effectiveExpired = state === "expired" || remainingMsLeft <= 0;

  const isDismissed = state === "dismissed";
  const isExpired = effectiveExpired;
  const isAccepted = state === "accepted";
  const tintClass = isExpired || isAccepted ? "bg-white" : tintForCategory(category, weatherType);

  const fillPercent = isExpired
    ? 0
    : Math.max(0, Math.min(100, (remainingMsLeft / totalDurationMs) * 100));

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
      className={`relative w-full ${tintClass} border rounded-2xl p-4 flex flex-col gap-2.5 overflow-hidden transition-all duration-300 ${
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
        {remainingMinutes <= 5 && !isExpired && (
          <span className="px-3 py-1 rounded-full text-[12px] bg-[#FAEEDA] text-[#633806]">
            Almost gone
          </span>
        )}
      </div>

      {/* ROW 5 — Expiry bar (green → amber → red as it nears expiration) */}
      {(() => {
        const urgencyColor =
          fillPercent > 50
            ? "#1D9E75"
            : fillPercent > 20
              ? "#F59E0B"
              : "#DC2626";
        return (
          <div>
            <div className="w-full h-1 bg-[#F3F4F6] rounded-[2px] overflow-hidden">
              <div
                style={{
                  width: `${fillPercent}%`,
                  height: "100%",
                  background: urgencyColor,
                  borderRadius: 2,
                  transition: "width 1s linear, background-color 600ms ease",
                }}
              />
            </div>
            <div className="flex items-center justify-end gap-1.5 mt-1">
              {!isExpired && !isAccepted && (
                <span
                  className="inline-block w-2 h-2 rounded-full"
                  style={{ background: urgencyColor }}
                  aria-hidden="true"
                />
              )}
              <span
                className="text-[13px] font-bold"
                style={{ color: isExpired ? "#6B7280" : urgencyColor }}
              >
                {isExpired ? "0" : remainingMinutes} min left
              </span>
            </div>
          </div>
        );
      })()}

      {/* ROW 6 — Button */}
      <div className="flex gap-2 mt-auto">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAccept();
          }}
          disabled={isExpired}
          className={`w-full h-12 rounded-xl text-[16px] font-extrabold tracking-wide text-white transition shadow-md ${
            isAccepted
              ? "bg-[#1D9E75]"
              : "bg-gradient-to-r from-orange-500 to-red-500 hover:opacity-90"
          } ${isExpired ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {isAccepted ? "Accepted ✓" : "Get Now →"}
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
