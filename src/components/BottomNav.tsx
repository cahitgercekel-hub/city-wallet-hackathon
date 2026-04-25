import { NavLink, useLocation } from "react-router-dom";

const items = [
  { to: "/", label: "Discover", emoji: "🧭" },
  { to: "/favorites", label: "Favorites", emoji: "❤️" },
  { to: "/profile", label: "Profile", emoji: "👤" },
];

const VISIBLE_ROUTES = ["/", "/favorites", "/profile"];

const BottomNav = () => {
  const { pathname } = useLocation();
  if (!VISIBLE_ROUTES.includes(pathname)) return null;

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-background border-t border-border z-30">
      <ul className="grid grid-cols-3">
        {items.map(({ to, label, emoji }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 py-2.5 text-[11px] ${
                  isActive ? "text-orange-500 font-semibold" : "text-muted-foreground"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`flex items-center justify-center w-10 h-7 rounded-full transition-colors text-[18px] leading-none ${
                      isActive ? "bg-orange-100" : "bg-transparent"
                    }`}
                    aria-hidden="true"
                  >
                    {emoji}
                  </span>
                  <span>{label}</span>
                  <span
                    className={`h-1 w-1 rounded-full ${isActive ? "bg-orange-500" : "bg-transparent"}`}
                  />
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BottomNav;
