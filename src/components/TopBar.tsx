import { Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo_city_wallet.png";

interface TopBarProps {
  title?: string;
  showActions?: boolean;
}

const TopBar = ({ title = "City Wallet", showActions = false }: TopBarProps) => {
  const navigate = useNavigate();
  return (
    <header className="flex items-center justify-between px-4 pt-4 pb-3">
      <div className="flex items-center gap-2.5">
        <img
          src={logo}
          alt="City Wallet logo"
          className="w-9 h-9 rounded-full object-cover"
        />
        <h1 className="text-base font-bold text-foreground">{title}</h1>
      </div>
      {showActions && (
        <div className="flex items-center gap-1">
          <button
            aria-label="Settings"
            onClick={() => navigate("/settings")}
            className="p-2 rounded-full hover:bg-muted"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      )}
    </header>
  );
};

export default TopBar;
