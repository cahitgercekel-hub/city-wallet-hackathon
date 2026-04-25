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
                  isActive ? "text-brand-purple" : "text-muted-foreground"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className="w-5 h-5" fill={isActive ? "currentColor" : "none"} strokeWidth={isActive ? 1.5 : 2} />
                  <span>{label}</span>
                  <span
                    className={`h-0.5 w-6 rounded-full ${isActive ? "bg-brand-purple" : "bg-transparent"}`}
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
