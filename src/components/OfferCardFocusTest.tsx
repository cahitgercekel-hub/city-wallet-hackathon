const RainCloud = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 13a3 3 0 0 1 .5-5.95A4 4 0 0 1 14 8a3 3 0 0 1 .5 5.95H6z" />
    <line x1="7" y1="17" x2="6.5" y2="20" />
    <line x1="11" y1="17" x2="10.5" y2="20" />
    <line x1="15" y1="17" x2="14.5" y2="20" />
  </svg>
);

const PinIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 11s4-3.5 4-6.5a4 4 0 1 0-8 0C2 7.5 6 11 6 11z" />
    <circle cx="6" cy="4.5" r="1.3" />
  </svg>
);

const examples = [
  { headline: "15% OFF at Café Müller", label: "Transactional — no emotional pull", color: "#E24B4A" },
  { headline: "Hot drinks discounted nearby", label: "Vague — no specific hook", color: "#BA7517" },
  { headline: "Cold outside? Your coffee is waiting.", label: "Situational — immediately relevant", color: "#1D9E75" },
];

const annotations = [
  { n: 1, el: "Weather icon", note: "Confirms relevance: this offer matches current conditions" },
  { n: 2, el: "Headline", note: "Emotional hook: situational not transactional" },
  { n: 3, el: "Distance + time", note: "Removes friction: user knows it's possible right now" },
  { n: 4, el: "CTA button", note: "Single clear action: no decision paralysis" },
];

const OfferCardFocusTest = () => {
  return (
    <div
      className="bg-white p-5 flex flex-col gap-5"
      style={{ border: "0.5px solid #E5E7EB", borderRadius: 16 }}
    >
      <div className="grid grid-cols-2 gap-5">
        {/* LEFT */}
        <div className="flex flex-col gap-3">
          <p className="text-[12px] font-semibold uppercase tracking-wide text-[#6B7280]">
            What the user sees in 3 seconds
          </p>
          <div
            className="flex flex-col gap-3 bg-white p-4"
            style={{ width: 170, border: "0.5px solid #E5E7EB", borderRadius: 14 }}
          >
            <RainCloud />
            <h3 className="text-[18px] font-bold leading-tight text-[#111827]">
              Cold outside? Your coffee is waiting.
            </h3>
            <div className="flex items-center gap-1 text-[13px] text-[#6B7280]">
              <PinIcon />
              <span>Café Müller · 80m · 12 min</span>
            </div>
            <button
              className="w-full text-white text-[15px] font-bold"
              style={{ height: 44, background: "#534AB7", borderRadius: 12 }}
            >
              Get Now
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col gap-3">
          <p className="text-[12px] font-semibold uppercase tracking-wide text-[#6B7280]">
            Information hierarchy breakdown
          </p>
          <ol className="flex flex-col gap-3">
            {annotations.map((a) => (
              <li key={a.n} className="flex gap-2.5">
                <span
                  className="flex-shrink-0 flex items-center justify-center text-white text-[11px] font-bold"
                  style={{ width: 20, height: 20, borderRadius: 999, background: "#534AB7" }}
                >
                  {a.n}
                </span>
                <div className="flex-1">
                  <p className="text-[13px] font-semibold text-[#111827]">{a.el}</p>
                  <p className="text-[12px] text-[#6B7280] leading-snug">{a.note}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <hr style={{ border: "none", borderTop: "1px solid #E5E7EB" }} />

      <div className="flex items-start justify-center gap-3">
        {examples.map((e, i) => (
          <div key={i} className="flex flex-col items-center gap-1.5">
            <div
              className="flex items-center justify-center text-center text-[12px] text-[#111827]"
              style={{
                width: 100,
                height: 80,
                border: `2px solid ${e.color}`,
                borderRadius: 10,
                padding: 8,
              }}
            >
              {e.headline}
            </div>
            <p className="text-[11px] text-[#6B7280] text-center" style={{ width: 100 }}>
              {e.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfferCardFocusTest;
