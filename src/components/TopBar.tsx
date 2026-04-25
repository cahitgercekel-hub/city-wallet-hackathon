import { Bell, Settings } from "lucide-react";

interface TopBarProps {
  title?: string;
  showActions?: boolean;
}

const TopBar = ({ title = "City Wallet", showActions = false }: TopBarProps) => (
  <header className="flex items-center justify-between px-4 pt-4 pb-3">
    <div className="flex items-center gap-2.5">
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-bold text-foreground/70"
        style={{ background: "hsl(var(--warm-peach))" }}
        aria-hidden="true"
      >
        CW
      </div>
      <h1 className="text-base font-bold text-foreground">{title}</h1>
    </div>
    {showActions && (
      <div className="flex items-center gap-1">
        <button aria-label="Notifications" className="p-2 rounded-full hover:bg-muted">
          <Bell className="w-5 h-5" />
        </button>
        <button aria-label="Settings" className="p-2 rounded-full hover:bg-muted">
          <Settings className="w-5 h-5" />
        </button>
      </div>
    )}
  </header>
);

export default TopBar;
