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
      <h1 className="text-base font-bold">Terms & Conditions</h1>
    </header>

    <main className="px-4 pb-10 flex flex-col flex-1 min-h-[calc(100vh-8rem)] animate-fade-in">
      <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <span className="text-2xl leading-none" aria-hidden>🛡️</span>
          <p className="text-sm leading-relaxed text-foreground">
            Your privacy is our priority. We only use your general neighborhood,
            the current weather, and the time of day to find you the best
            offers. We do not track your name, exact identity, or permanent
            location history.
          </p>
        </div>
      </div>

      <div className="mt-auto pt-10 flex justify-center gap-6">
        <a href="#" className="text-gray-500 underline text-sm">
          Terms of Use
        </a>
        <a href="#" className="text-gray-500 underline text-sm">
          Privacy Policy
        </a>
      </div>
    </main>
  </MobileShell>
);

export default Privacy;
