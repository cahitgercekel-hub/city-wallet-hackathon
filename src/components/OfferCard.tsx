import { CloudRain, Clock } from "lucide-react";
import { Link } from "react-router-dom";

export interface OfferCardProps {
  weatherIcon?: React.ReactNode;
  weatherLabel: string;
  postedAgo?: string;
  headline: string;
  merchant: string;
  distance: string;
  discount: string;
  expiryMinutes: number;
  expiryProgress?: number; // 0-100
}

const OfferCard = ({
  weatherIcon = <CloudRain className="w-4 h-4" />,
  weatherLabel,
  postedAgo = "2 min ago",
  headline,
  merchant,
  distance,
  discount,
  expiryMinutes,
  expiryProgress = 60,
}: OfferCardProps) => (
  <article className="w-full rounded-2xl border border-border bg-card p-5 flex flex-col gap-3.5">
    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
      {weatherIcon}
      <span>{weatherLabel}</span>
      <span>·</span>
      <span>{postedAgo}</span>
    </div>

    <h2 className="text-[20px] font-bold leading-snug text-foreground line-clamp-2">{headline}</h2>

    <p className="text-sm text-muted-foreground">
      {merchant} · {distance}
    </p>

    <div>
      <span className="inline-block px-3 py-1 rounded-full bg-brand-purple text-white text-xs font-semibold">
        {discount}
      </span>
    </div>

    <div>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-signal-warning rounded-full"
          style={{ width: `${expiryProgress}%` }}
        />
      </div>
      <div className="flex items-center gap-1 text-xs text-signal-warning mt-1.5">
        <Clock className="w-3 h-3" />
        <span>{expiryMinutes} minutes left</span>
      </div>
    </div>

    <div className="flex gap-2 pt-1">
      <Link
        to="/offer"
        className="flex-[2] text-center py-3 rounded-xl bg-brand-purple text-white font-medium hover:opacity-90 transition"
      >
        Get Now
      </Link>
      <button className="flex-1 py-3 rounded-xl border border-brand-purple text-brand-purple font-medium hover:bg-brand-purple/5 transition">
        Maybe Later
      </button>
    </div>
  </article>
);

export default OfferCard;
