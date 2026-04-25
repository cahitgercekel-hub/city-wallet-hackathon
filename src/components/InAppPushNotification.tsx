import { useEffect, useState } from "react";

interface InAppPushNotificationProps {
  show: boolean;
  onClose: () => void;
  title?: string;
  body?: string;
  durationMs?: number;
}

const InAppPushNotification = ({
  show,
  onClose,
  title = "City Wallet · now",
  body = "Rainy? Grab a 15% off coffee nearby!",
  durationMs = 4000,
}: InAppPushNotificationProps) => {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!show) return;
    setMounted(true);
    // next tick → slide in
    const inT = requestAnimationFrame(() => setVisible(true));
    const outT = setTimeout(() => setVisible(false), durationMs);
    const unmountT = setTimeout(() => {
      setMounted(false);
      onClose();
    }, durationMs + 350);
    return () => {
      cancelAnimationFrame(inT);
      clearTimeout(outT);
      clearTimeout(unmountT);
    };
  }, [show, durationMs, onClose]);

  if (!mounted) return null;

  return (
    <div
      className="fixed top-0 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-[360px] pointer-events-none"
      style={{
        transform: `translate(-50%, ${visible ? "12px" : "-120%"})`,
        opacity: visible ? 1 : 0,
        transition: "transform 350ms cubic-bezier(0.22,1,0.36,1), opacity 250ms ease-out",
      }}
      role="status"
      aria-live="polite"
    >
      <div
        className="pointer-events-auto flex items-center gap-3 px-3 py-3 rounded-2xl"
        style={{
          background: "rgba(20,20,22,0.88)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          boxShadow: "0 12px 32px rgba(0,0,0,0.35)",
          border: "0.5px solid rgba(255,255,255,0.08)",
        }}
      >
        {/* Left: logo */}
        <div
          className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-[11px] font-bold text-white"
          style={{ background: "hsl(var(--primary))" }}
          aria-hidden="true"
        >
          CW
        </div>

        {/* Center: text */}
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-semibold text-white leading-tight truncate">{title}</p>
          <p className="text-[13px] leading-tight mt-0.5 truncate" style={{ color: "rgba(255,255,255,0.72)" }}>
            {body}
          </p>
        </div>

        {/* Right: slide-up indicator pill */}
        <div className="flex-shrink-0 flex flex-col items-center gap-0.5 pr-0.5" aria-hidden="true">
          <div className="w-6 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.5)" }} />
          <div className="w-6 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.25)" }} />
        </div>
      </div>
    </div>
  );
};

export default InAppPushNotification;
