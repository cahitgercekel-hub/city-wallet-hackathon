import { Compass, User } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

const items = [
  { to: "/", label: "Discover", icon: Compass },
  { to: "/profile", label: "Profile", icon: User },
];

const VISIBLE_ROUTES = ["/", "/profile"];

const BottomNav = () => {
  const { pathname } = useLocation();
  if (!VISIBLE_ROUTES.includes(pathname)) return null;

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-background border-t border-border z-30">
      <ul className="grid grid-cols-2">
        {items.map(({ to, label, icon: Icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 py-2.5 text-[11px] ${
                  isActive ? "text-orange-500" : "text-muted-foreground"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`flex items-center justify-center w-10 h-7 rounded-full transition-colors ${
                      isActive ? "bg-orange-100" : "bg-transparent"
                    }`}
                  >
                    <Icon className="w-5 h-5" strokeWidth={2} />
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
