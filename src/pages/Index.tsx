import { useNavigate } from "react-router-dom";
import MobileShell from "@/components/MobileShell";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import heroImg from "@/assets/home-hero.jpg";

const Index = () => {
  const navigate = useNavigate();

  return (
    <MobileShell>
      <TopBar />
      <main className="px-4 pb-28 flex flex-col gap-5 animate-fade-in">
        {/* Greeting */}
        <div className="pt-1">
          <h2 className="text-[24px] font-bold leading-tight text-foreground">
            Good morning, Mia! <span aria-hidden="true">☀️</span>
          </h2>
          <p className="text-[14px] text-muted-foreground mt-1">
            Here's a little something for your day.
          </p>
        </div>

        {/* Hero illustration */}
        <div
          className="w-full overflow-hidden rounded-2xl"
          style={{ aspectRatio: "16 / 9", background: "hsl(var(--warm-cream))" }}
        >
          <img
            src={heroImg}
            alt="A friendly local merchant handing coffee and pastries to a happy customer"
            width={1280}
            height={720}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Stats widget */}
        <div
          className="rounded-2xl p-4 flex items-center gap-3"
          style={{ background: "hsl(var(--warm-mint))" }}
        >
          <div className="text-3xl" aria-hidden="true">🌱</div>
          <p className="text-[14px] leading-snug text-foreground">
            You saved <span className="font-bold">€12.40</span> and supported{" "}
            <span className="font-bold">3 local shops</span> this month!
          </p>
        </div>

        {/* CTA */}
        <button
          onClick={() => navigate("/offers")}
          className="w-full h-14 rounded-2xl bg-primary text-primary-foreground text-[16px] font-bold shadow-md hover:opacity-90 transition flex items-center justify-center gap-2"
        >
          See what's waiting for you nearby <span aria-hidden="true">→</span>
        </button>

        <p className="text-center text-[12px] text-muted-foreground mt-1">
          <span aria-hidden="true">☕ 🥐 🍕</span> Fresh picks updated all day
        </p>
      </main>
      <BottomNav />
    </MobileShell>
  );
};

export default Index;
