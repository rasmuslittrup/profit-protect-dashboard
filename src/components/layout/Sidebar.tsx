import { NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Zap, 
  BarChart3, 
  Settings,
  ChevronRight,
  Eye,
  FlaskConical
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Profit Engine", href: "/profit-engine", icon: Zap },
  { name: "Live Preview", href: "/live-preview", icon: Eye },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "A/B Performance", href: "/performance", icon: FlaskConical },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 px-6 border-b border-sidebar-border">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-md">
            <Zap className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold text-white">
            ShipConvert
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-sidebar-accent text-white"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-white"
                )}
              >
                <item.icon className={cn(
                  "h-5 w-5 flex-shrink-0",
                  isActive ? "text-white" : "text-sidebar-foreground"
                )} />
                <span className="flex-1">{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-3 py-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-sidebar-accent/50 transition-colors">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 text-primary text-sm font-semibold">
              AC
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                Acme Corp
              </p>
              <p className="text-xs text-sidebar-foreground truncate">
                Pro Plan
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
