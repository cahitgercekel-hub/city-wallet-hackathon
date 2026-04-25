import { useState, useEffect } from "react";
import OfferCard from "./OfferCard";

const baseOffer = {
  headline: "Cold outside? Your coffee is waiting.",
  merchant: "Café Müller",
  distance: "80m",
  discount: "15% off",
  expiresAt: Date.now() + 720000,
      totalDurationMs: 720000,
  temp: "11°C",
  weatherType: "rain" as const,
  timeAgo: "2 min ago",
};

type LifecycleState = "active" | "accepted" | "dismissed" | "expired";

interface BlockProps {
  label: string;
  description: string;
  children: React.ReactNode;
  controls?: React.ReactNode;
}

const Block = ({ label, description, children, controls }: BlockProps) => (
  <section className="flex flex-col gap-2">
    <p className="text-[12px] font-semibold uppercase tracking-wide text-[#6B7280]">{label}</p>
    {children}
    <p className="text-[13px] text-[#374151]">{description}</p>
    {controls && <div className="flex flex-col gap-1.5 pt-1">{controls}</div>}
  </section>
);

const SimButton = ({ onClick, children }: { onClick: () => void; children: React.ReactNode }) => (
  <button
    onClick={onClick}
    className="self-start text-left text-[13px] text-[#534AB7] hover:underline"
  >
    {children}
  </button>
);

/* STATE 2 — custom accepted view with bespoke subline/buttons */
const AcceptedCard = ({ onCancel }: { onCancel: () => void }) => {
  const [pulse, setPulse] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setPulse(false), 400);
    return () => clearTimeout(t);
  }, []);
  return (
    <article
      className="relative w-full bg-white p-4 flex flex-col gap-2.5"
      style={{
        border: "2px solid #1D9E75",
        borderRadius: 16,
        animation: pulse ? "lifecycle-pulse 400ms ease-out" : undefined,
        maxHeight: 320,
      }}
    >
      <style>{`@keyframes lifecycle-pulse{0%{transform:scale(1)}50%{transform:scale(1.03)}100%{transform:scale(1)}}`}</style>
      <h2 className="text-[20px] font-bold leading-[1.3] text-[#1D9E75]">
        On your way to Café Müller!
      </h2>
      <p className="text-[14px] text-[#374151]">
        Show QR at counter · €1.80 cashback incoming
      </p>
      <div className="flex gap-2 mt-auto pt-2">
        <button
          className="flex-[2] h-11 rounded-xl text-[15px] font-bold text-white"
          style={{ background: "#1D9E75" }}
        >
          Accepted — Show QR Code →
        </button>
        <button
          onClick={onCancel}
          className="flex-1 h-11 rounded-xl text-[14px] text-[#6B7280] bg-[#F3F4F6] hover:bg-[#E5E7EB] transition"
        >
          Cancel offer
        </button>
      </div>
    </article>
  );
};

/* STATE 3 — dismiss with slide+fade then chip */
const DismissedBlock = ({ onUndo }: { onUndo: () => void }) => {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHidden(true), 300);
    return () => clearTimeout(t);
  }, []);

  if (!hidden) {
    return (
      <div
        className="transition-all duration-300"
        style={{ opacity: 0, transform: "translateY(20px)" }}
      >
        <OfferCard {...baseOffer} state="active" onAccept={() => {}} onDismiss={() => {}} />
      </div>
    );
  }

  return (
    <div
      className="inline-flex items-center gap-2 self-start"
      style={{
        background: "#F3F4F6",
        borderRadius: 999,
        padding: "8px 16px",
        fontSize: 13,
        color: "#6B7280",
      }}
    >
      <span>Offer dismissed</span>
      <span style={{ width: 1, height: 14, background: "#D1D5DB" }} />
      <button
        onClick={onUndo}
        style={{ color: "#534AB7", cursor: "pointer" }}
        className="hover:underline"
      >
        Undo
      </button>
    </div>
  );
};

/* STATE 4 — expired with overlay & grayscale */
const ExpiredCard = () => (
  <div className="relative">
    <div
      className="transition-all duration-500"
      style={{ filter: "grayscale(100%)", opacity: 0.6 }}
    >
      <article
        className="relative w-full bg-white p-4 flex flex-col gap-2.5"
        style={{ border: "0.5px solid #E5E7EB", borderRadius: 16, maxHeight: 320 }}
      >
        <div className="flex items-center gap-1.5 text-[12px] text-[#6B7280]">
          <span>11°C · 2 min ago</span>
        </div>
        <h2 className="text-[20px] font-semibold leading-[1.3] text-[#111827]">
          Cold outside? Your coffee is waiting.
        </h2>
        <p className="text-[14px] text-[#6B7280]">Café Müller · 80m away</p>
        <div>
          <span
            className="inline-block px-3.5 py-1 rounded-full text-[12px] font-bold"
            style={{ background: "#E5E7EB", color: "#6B7280" }}
          >
            15% off
          </span>
        </div>
        <div>
          <div className="w-full h-1 bg-[#F3F4F6] rounded-[2px] overflow-hidden">
            <div style={{ width: "0%", height: "100%", background: "#534AB7" }} />
          </div>
          <div className="text-right text-[11px] text-[#6B7280] mt-1">0 min left</div>
        </div>
        <div className="flex gap-2 mt-auto">
          <button
            disabled
            className="flex-[2] h-11 rounded-xl text-[15px] font-bold text-white"
            style={{ background: "#534AB7", opacity: 0.4, cursor: "not-allowed", pointerEvents: "none" }}
          >
            Get Now
          </button>
          <button
            disabled
            className="flex-1 h-11 rounded-xl text-[14px] text-[#534AB7]"
            style={{
              border: "1.5px solid #534AB7",
              opacity: 0.4,
              cursor: "not-allowed",
              pointerEvents: "none",
            }}
          >
            Maybe Later
          </button>
        </div>
      </article>
    </div>
    <div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
      style={{
        background: "rgba(255,255,255,0.85)",
        borderRadius: 8,
        padding: "8px 16px",
      }}
    >
      <div className="text-[14px] font-bold text-[#6B7280]">Offer expired</div>
      <div className="text-[12px] text-[#9CA3AF]">This moment has passed</div>
    </div>
  </div>
);

const OfferLifecycleDemo = () => {
  const [s1, setS1] = useState<LifecycleState>("active");
  const [s2, setS2] = useState<LifecycleState>("accepted");
  const [s3, setS3] = useState<LifecycleState>("dismissed");
  const [s4, setS4] = useState<LifecycleState>("expired");
  // bump key to re-trigger transitions on undo
  const [s3Key, setS3Key] = useState(0);
  const [s2Key, setS2Key] = useState(0);

  const reset = () => {
    setS1("active");
    setS2("accepted");
    setS3("dismissed");
    setS4("expired");
    setS3Key((k) => k + 1);
    setS2Key((k) => k + 1);
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* STATE 1 */}
      <Block
        label="State 1 · Active offer"
        description="Offer is live and contextually relevant right now"
        controls={
          <>
            <SimButton onClick={() => { setS2("accepted"); setS2Key((k) => k + 1); }}>
              Simulate: User accepts →
            </SimButton>
            <SimButton onClick={() => { setS3("dismissed"); setS3Key((k) => k + 1); }}>
              Simulate: User dismisses →
            </SimButton>
            <SimButton onClick={() => setS4("expired")}>
              Simulate: Offer expires →
            </SimButton>
          </>
        }
      >
        {s1 === "active" && (
          <OfferCard {...baseOffer} state="active" onAccept={() => {}} onDismiss={() => {}} />
        )}
      </Block>

      {/* STATE 2 */}
      <Block
        label="State 2 · User accepted"
        description="User committed. One tap to QR screen."
      >
        <div key={s2Key}>
          <AcceptedCard onCancel={() => {}} />
        </div>
      </Block>

      {/* STATE 3 */}
      <Block
        label="State 3 · User dismissed"
        description="User skipped. Non-destructive. Can undo. UX stays intact."
      >
        <DismissedBlock
          key={s3Key}
          onUndo={() => setS3Key((k) => k + 1000)}
        />
      </Block>

      {/* STATE 4 */}
      <Block
        label="State 4 · Offer expired"
        description="Offer window closed. Card communicates this clearly. User is not confused."
      >
        <ExpiredCard />
      </Block>

      <button
        onClick={reset}
        className="self-center text-[13px] text-[#6B7280] hover:text-[#111827] px-4 py-2 rounded-lg border border-[#E5E7EB]"
      >
        Reset all states
      </button>
    </div>
  );
};

export default OfferLifecycleDemo;
