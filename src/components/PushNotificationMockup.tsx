const WifiIcon = () => (
  <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
    <rect x="0" y="6" width="2" height="4" rx="0.5" fill="#111827" />
    <rect x="4" y="4" width="2" height="6" rx="0.5" fill="#111827" />
    <rect x="8" y="2" width="2" height="8" rx="0.5" fill="#111827" />
    <rect x="12" y="0" width="2" height="10" rx="0.5" fill="#111827" />
  </svg>
);

const SignalIcon = () => (
  <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
    <path d="M1 9a6 6 0 0 1 12 0" stroke="#111827" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M3.5 9a3.5 3.5 0 0 1 7 0" stroke="#111827" strokeWidth="1.2" strokeLinecap="round" />
    <circle cx="7" cy="9" r="1" fill="#111827" />
  </svg>
);

const BatteryIcon = () => (
  <svg width="22" height="10" viewBox="0 0 22 10" fill="none">
    <rect x="0.5" y="0.5" width="18" height="9" rx="2" stroke="#111827" />
    <rect x="2" y="2" width="15" height="6" rx="1" fill="#111827" />
    <rect x="19.5" y="3.5" width="2" height="3" rx="0.5" fill="#111827" />
  </svg>
);

const PushNotificationMockup = () => {
  return (
    <div className="flex flex-col items-center">
      <div
        className="bg-[#F9FAFB]"
        style={{
          width: 358,
          border: "2px solid #D1D5DB",
          borderRadius: 40,
          padding: 12,
        }}
      >
        {/* Notch */}
        <div className="flex justify-center">
          <div style={{ width: 120, height: 5, background: "#000", borderRadius: 999 }} />
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-between px-2 mt-2">
          <span className="text-[12px] font-bold text-[#111827]">9:41</span>
          <div className="flex items-center gap-1.5">
            <WifiIcon />
            <SignalIcon />
            <BatteryIcon />
          </div>
        </div>

        {/* Notification banner */}
        <div
          className="flex gap-3 bg-white"
          style={{
            borderRadius: 14,
            padding: "12px 14px",
            margin: "8px 0",
            border: "0.5px solid #E5E7EB",
          }}
        >
          <div
            className="flex items-center justify-center text-white font-bold flex-shrink-0"
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: "#534AB7",
              fontSize: 13,
            }}
          >
            CW
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[12px] font-bold text-[#111827]">City Wallet</span>
              <span className="text-[11px] text-[#6B7280]">now</span>
            </div>
            <p className="text-[13px] text-[#374151] line-clamp-2 leading-snug mt-0.5">
              Cold outside? Your coffee is waiting. Café Müller · 80m · 15% off
            </p>
          </div>
        </div>

        {/* Lock screen */}
        <div
          className="relative flex flex-col items-center justify-center"
          style={{ height: 200, background: "#1a1a2e", borderRadius: 14 }}
        >
          <div className="text-white text-[28px] font-bold leading-none">9:41</div>
          <div className="text-white text-[14px] mt-1" style={{ opacity: 0.7 }}>
            Thursday, April 25
          </div>

          <div className="absolute bottom-3 left-3 right-3 flex gap-2">
            <button
              className="flex-1 flex items-center justify-center gap-1.5 text-white text-[12px]"
              style={{ background: "#2a2a3e", borderRadius: 10, padding: "8px 0" }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="1.2">
                <path d="M5 1h2l-.5 4h2l-4 6 .5-4H3z" fill="white" />
              </svg>
              Flashlight
            </button>
            <button
              className="flex-1 flex items-center justify-center gap-1.5 text-white text-[12px]"
              style={{ background: "#2a2a3e", borderRadius: 10, padding: "8px 0" }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="1.2">
                <rect x="1" y="3" width="10" height="7" rx="1.5" />
                <circle cx="6" cy="6.5" r="2" />
                <rect x="4" y="2" width="4" height="1.5" rx="0.5" fill="white" />
              </svg>
              Camera
            </button>
          </div>
        </div>
      </div>

      <p className="text-[13px] text-[#6B7280] text-center mt-3">
        Push notification · Lock screen view
      </p>
    </div>
  );
};

export default PushNotificationMockup;
