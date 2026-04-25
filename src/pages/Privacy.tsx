import { useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import MobileShell from "@/components/MobileShell";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";

const Toggle = ({
  label,
  defaultOn = false,
}: {
  label: string;
  defaultOn?: boolean;
}) => {
  const [on, setOn] = useState(defaultOn);
  return (
    <label className="flex items-center justify-between gap-3 py-2">
      <span className="text-sm">{label}</span>
      <button
        type="button"
        onClick={() => setOn((v) => !v)}
        className={`relative w-11 h-6 rounded-full transition ${
          on ? "bg-brand-purple" : "bg-muted"
        }`}
        aria-pressed={on}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition ${
            on ? "translate-x-5" : ""
          }`}
        />
      </button>
    </label>
  );
};

const Privacy = () => (
  <MobileShell>
    <TopBar title="Privacy" />
    <main className="px-4 pb-28 flex flex-col gap-5 animate-fade-in">
      <h1 className="text-[20px] font-bold">Your data, your control</h1>

      <div className="flex flex-col gap-3">
        <div className="rounded-2xl border-2 border-signal-success/40 p-4">
          <p className="text-sm font-bold text-signal-success mb-3">Stays on your device</p>
          <ul className="flex flex-col gap-2 text-sm">
            {["GPS coordinates", "Movement history", "Past offer interactions", "Personal preferences"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-signal-success shrink-0" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-border p-4">
          <p className="text-sm font-bold text-muted-foreground mb-3">Sent to server</p>
          <ul className="flex flex-col gap-2 text-sm">
            {[
              'Intent signal only: "browsing_near_cafe"',
              'Time slot: "lunch"',
              'Weather type: "cold_rain"',
              "No name. No coordinates. No identity.",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <pre className="rounded-xl bg-muted p-3 text-[12px] font-mono leading-relaxed overflow-x-auto">
{`{
  "intent": "browsing_near_cafe",
  "timeSlot": "lunch",
  "weatherType": "cold_rain"
}`}
      </pre>

      <section className="rounded-2xl border border-border p-4">
        <p className="text-sm font-bold mb-1">Consent</p>
        <Toggle label="Allow contextual offers" defaultOn />
        <Toggle label="Share anonymous usage data" />
        <button className="w-full mt-3 py-2.5 rounded-xl border border-destructive text-destructive text-sm font-medium hover:bg-destructive/5 transition">
          Delete all my data
        </button>
      </section>
    </main>
    <BottomNav />
  </MobileShell>
);

export default Privacy;
