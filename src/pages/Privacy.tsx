import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import MobileShell from "@/components/MobileShell";

const Privacy = () => (
  <MobileShell>
    <header className="flex items-center gap-3 px-4 pt-4 pb-3">
      <Link
        to="/settings"
        aria-label="Back to settings"
        className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-muted/70"
      >
        <ArrowLeft className="w-5 h-5" />
      </Link>
      <h1 className="text-base font-bold">Privacy & GDPR</h1>
    </header>

    <main className="px-4 pb-12 flex flex-col gap-5 animate-fade-in">
      <section>
        <h2 className="text-[22px] font-bold leading-tight">Your data, in plain words.</h2>
        <p className="text-[14px] text-muted-foreground mt-2 leading-relaxed">
          We only know your <span className="font-semibold text-foreground">neighborhood</span>,
          the <span className="font-semibold text-foreground">weather</span>, and the{" "}
          <span className="font-semibold text-foreground">time</span>. We don't know your name or
          identity.
        </p>
      </section>

      <section className="rounded-2xl bg-muted/50 p-4 flex flex-col gap-2.5">
        <h3 className="text-sm font-bold">What we use</h3>
        <p className="text-[14px] leading-relaxed">
          To suggest a useful offer at the right moment, we look at things like “it's lunchtime,
          it's raining, you're near the city center.” That's it.
        </p>
      </section>

      <section className="rounded-2xl bg-muted/50 p-4 flex flex-col gap-2.5">
        <h3 className="text-sm font-bold">What we don't use</h3>
        <p className="text-[14px] leading-relaxed">
          No exact GPS location. No contacts. No browsing history. Your name and identity stay on
          your device, never shared with merchants.
        </p>
      </section>

      <section className="rounded-2xl bg-muted/50 p-4 flex flex-col gap-2.5">
        <h3 className="text-sm font-bold">You're in control</h3>
        <p className="text-[14px] leading-relaxed">
          Turn off contextual offers anytime in Settings, or delete your account and all related
          data with one tap.
        </p>
      </section>

      <div className="flex items-center justify-center gap-6 pt-6 pb-2 text-[13px]">
        <a href="#" className="underline text-foreground">
          Terms of Use
        </a>
        <a href="#" className="underline text-foreground">
          Privacy Policy
        </a>
      </div>
    </main>
  </MobileShell>
);

export default Privacy;
