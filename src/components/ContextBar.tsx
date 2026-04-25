import { useState } from "react";

export type WeatherCondition = "rain" | "sun" | "cloud" | "snow";
export type TimeSlot = "morning" | "lunch" | "afternoon" | "evening" | "night";
export type MerchantStatus = "quiet" | "normal" | "busy";

export interface ContextBarProps {
  weather: { temp: string; condition: WeatherCondition; description: string };
  timeSlot: TimeSlot;
  merchantSignal: { name: string; status: MerchantStatus; txLastHour: number; avgTx: number };
  nearbyEvent: string | null;
  explanation: string;
  currentTime?: string;
}

const timeSlotLabel: Record<TimeSlot, string> = {
  morning: "Morning",
  lunch: "Lunch break",
  afternoon: "Afternoon",
  evening: "Evening",
  night: "Late night",
};

const statusLabel: Record<MerchantStatus, string> = {
  quiet: "is quiet",
  normal: "normal traffic",
  busy: "busy right now",
};

const statusColor: Record<MerchantStatus, string> = {
  quiet: "#E24B4A",
  normal: "#BA7517",
  busy: "#639922",
};

const WeatherIcon = ({ c }: { c: WeatherCondition }) => {
  const p = {
    width: 16,
    height: 16,
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "#374151",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (c) {
    case "rain":
      return (
        <svg {...p}>
          <path d="M4 9a2 2 0 0 1 .4-3.96A2.8 2.8 0 0 1 9.6 5 2 2 0 0 1 10 8.96H4z" />
          <line x1="5" y1="11" x2="4.5" y2="13.5" />
          <line x1="7.5" y1="11" x2="7" y2="13.5" />
          <line x1="10" y1="11" x2="9.5" y2="13.5" />
        </svg>
      );
    case "sun":
      return (
        <svg {...p}>
          <circle cx="8" cy="8" r="2.4" />
          <line x1="8" y1="2" x2="8" y2="3.5" />
          <line x1="8" y1="12.5" x2="8" y2="14" />
          <line x1="2" y1="8" x2="3.5" y2="8" />
          <line x1="12.5" y1="8" x2="14" y2="8" />
          <line x1="3.7" y1="3.7" x2="4.7" y2="4.7" />
          <line x1="11.3" y1="11.3" x2="12.3" y2="12.3" />
          <line x1="3.7" y1="12.3" x2="4.7" y2="11.3" />
          <line x1="11.3" y1="4.7" x2="12.3" y2="3.7" />
        </svg>
      );
    case "cloud":
      return (
        <svg {...p}>
          <path d="M3 11a2.5 2.5 0 0 1 .5-4.96A3 3 0 0 1 9.5 6 2.5 2.5 0 0 1 13 8.5 2.5 2.5 0 0 1 10.5 11H3z" />
        </svg>
      );
    case "snow":
      return (
        <svg {...p}>
          <line x1="8" y1="2.5" x2="8" y2="13.5" />
          <line x1="3" y1="5" x2="13" y2="11" />
          <line x1="3" y1="11" x2="13" y2="5" />
        </svg>
      );
  }
};

const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#374151" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8" cy="8" r="6" />
    <polyline points="8,4.5 8,8 10.5,9.5" />
  </svg>
);

const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="#534AB7" stroke="#534AB7" strokeWidth="1" strokeLinejoin="round">
    <polygon points="8,2 9.8,6.2 14.2,6.6 10.8,9.5 11.9,13.8 8,11.4 4.1,13.8 5.2,9.5 1.8,6.6 6.2,6.2" />
  </svg>
);

const Chevron = ({ open }: { open: boolean }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    stroke="#534AB7"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ transition: "transform 200ms", transform: open ? "rotate(180deg)" : "none" }}
  >
    <polyline points="3.5,5.5 7,9 10.5,5.5" />
  </svg>
);

const chipBase = "inline-flex items-center gap-1.5 flex-shrink-0";
const chipStyle: React.CSSProperties = {
  background: "#F3F4F6",
  borderRadius: 999,
  padding: "6px 12px",
  fontSize: 13,
  color: "#374151",
};

const ContextBar = ({
  weather,
  timeSlot,
  merchantSignal,
  nearbyEvent,
  explanation,
  currentTime = "12:34",
}: ContextBarProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full flex flex-col">
      {/* Chips */}
      <div
        className="flex gap-2 overflow-x-auto pb-1"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <style>{`.context-bar-scroll::-webkit-scrollbar{display:none}`}</style>

        <div className={chipBase} style={chipStyle}>
          <WeatherIcon c={weather.condition} />
          <span>
            {weather.temp} · {weather.description}
          </span>
        </div>

        <div className={chipBase} style={chipStyle}>
          <ClockIcon />
          <span>
            {currentTime} · {timeSlotLabel[timeSlot]}
          </span>
        </div>

        <div className={chipBase} style={chipStyle}>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              background: statusColor[merchantSignal.status],
              display: "inline-block",
            }}
          />
          <span>
            {merchantSignal.name} {statusLabel[merchantSignal.status]}
          </span>
        </div>

        {nearbyEvent && (
          <div
            className={chipBase}
            style={{
              background: "#EEEDFE",
              borderRadius: 999,
              padding: "6px 12px",
              fontSize: 13,
              color: "#3C3489",
            }}
          >
            <StarIcon />
            <span>{nearbyEvent}</span>
          </div>
        )}
      </div>

      {/* Explanation toggle */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1 self-start mt-1 text-[13px] underline"
        style={{ color: "#534AB7", cursor: "pointer" }}
      >
        Why this offer?
        <Chevron open={open} />
      </button>

      <div
        className="grid transition-all duration-[250ms]"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div
            style={{
              background: "#F9FAFB",
              borderRadius: 10,
              padding: "10px 12px",
              marginTop: 6,
            }}
          >
            <p
              className="text-[11px] font-bold uppercase mb-1"
              style={{ color: "#9CA3AF", letterSpacing: "0.05em" }}
            >
              Context signals used
            </p>
            <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.5 }}>{explanation}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

/* Demo: all 3 scenarios stacked with labels */
export const ContextBarDemo = () => {
  const scenarios: { label: string; props: ContextBarProps }[] = [
    {
      label: "Scenario 1 — Cold rain + quiet café",
      props: {
        weather: { temp: "11°C", condition: "rain", description: "Light rain" },
        timeSlot: "lunch",
        merchantSignal: { name: "Café Müller", status: "quiet", txLastHour: 3, avgTx: 12 },
        nearbyEvent: null,
        explanation:
          "It is raining and 11°C outside. You are in the lunch window. Café Müller has had only 3 transactions in the last hour versus their usual 12. This combination triggered a warm drink offer.",
        currentTime: "12:34",
      },
    },
    {
      label: "Scenario 2 — Sunny + bakery quiet morning",
      props: {
        weather: { temp: "22°C", condition: "sun", description: "Sunny" },
        timeSlot: "morning",
        merchantSignal: { name: "Bäckerei Becker", status: "quiet", txLastHour: 5, avgTx: 20 },
        nearbyEvent: null,
        explanation:
          "Sunny morning but Bäckerei Becker is unusually quiet. Only 5 transactions versus usual 20. A breakfast offer was generated to fill their morning slow period.",
        currentTime: "09:15",
      },
    },
    {
      label: "Scenario 3 — Evening + event nearby",
      props: {
        weather: { temp: "17°C", condition: "cloud", description: "Partly cloudy" },
        timeSlot: "evening",
        merchantSignal: { name: "Pizzeria Napoli", status: "normal", txLastHour: 11, avgTx: 10 },
        nearbyEvent: "Marktplatz Open Air Concert",
        explanation:
          "There is a concert at Marktplatz tonight and Pizzeria Napoli is 200m away. Evening timing plus event proximity triggered a pre-concert dinner offer.",
        currentTime: "19:10",
      },
    },
  ];

  return (
    <div className="flex flex-col gap-6 w-full">
      {scenarios.map((s, i) => (
        <div key={i} className="flex flex-col gap-2">
          <p className="text-[12px] font-semibold uppercase tracking-wide text-[#6B7280]">
            {s.label}
          </p>
          <ContextBar {...s.props} />
        </div>
      ))}
    </div>
  );
};

export default ContextBar;
