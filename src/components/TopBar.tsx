import { Bell, Settings } from "lucide-react";

const TopBar = ({ title = "City Wallet" }: { title?: string }) => (
  <header className="flex items-center justify-between px-4 pt-4 pb-3">
    <h1 className="text-base font-bold text-foreground">{title}</h1>
    <div className="flex items-center gap-1">
      <button aria-label="Notifications" className="p-2 rounded-full hover:bg-muted">
        <Bell className="w-5 h-5" />
      </button>
      <button aria-label="Settings" className="p-2 rounded-full hover:bg-muted">
        <Settings className="w-5 h-5" />
      </button>
    </div>
  </header>
);

export default TopBar;
