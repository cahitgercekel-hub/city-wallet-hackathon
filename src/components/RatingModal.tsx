import { useEffect, useState } from "react";
import { Star, X } from "lucide-react";

interface RatingModalProps {
  open: boolean;
  merchant: string;
  onClose: () => void;
  onSubmit: (rating: number, note: string) => void;
}

const RatingModal = ({ open, merchant, onClose, onSubmit }: RatingModalProps) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [note, setNote] = useState("");

  useEffect(() => {
    if (open) {
      setRating(0);
      setHover(0);
      setNote("");
    }
  }, [open]);

  if (!open) return null;

  const submit = () => {
    if (rating === 0) return;
    onSubmit(rating, note);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[360px] bg-background rounded-2xl p-5 flex flex-col gap-4 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <h3 className="text-[16px] font-bold leading-snug pr-4">
            How was your experience at {merchant}?
          </h3>
          <button
            aria-label="Close"
            onClick={onClose}
            className="p-1 -mt-1 -mr-1 rounded-full hover:bg-muted"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex justify-center gap-2 py-2">
          {[1, 2, 3, 4, 5].map((n) => {
            const filled = (hover || rating) >= n;
            return (
              <button
                key={n}
                onMouseEnter={() => setHover(n)}
                onMouseLeave={() => setHover(0)}
                onClick={() => setRating(n)}
                aria-label={`${n} star${n > 1 ? "s" : ""}`}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className="w-9 h-9"
                  strokeWidth={1.5}
                  style={{
                    color: filled ? "#F5B400" : "hsl(var(--muted-foreground))",
                    fill: filled ? "#F5B400" : "transparent",
                  }}
                />
              </button>
            );
          })}
        </div>

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          placeholder="Leave a quick note..."
          className="w-full rounded-xl border border-border p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand-purple/40"
        />

        <button
          onClick={submit}
          disabled={rating === 0}
          className="w-full h-12 rounded-xl bg-brand-purple text-white font-extrabold text-[15px] tracking-wide hover:opacity-90 transition disabled:opacity-50"
        >
          Submit Rating
        </button>
      </div>
    </div>
  );
};

export default RatingModal;
