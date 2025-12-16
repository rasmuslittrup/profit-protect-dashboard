import { ReactNode } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Zap, 
  BarChart3, 
  Settings,
  Eye,
  FlaskConical
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Profit Engine", href: "/profit-engine", icon: Zap },
  { name: "Live Preview", href: "/live-preview", icon: Eye },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "A/B Performance", href: "/performance", icon: FlaskConical },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function DashboardLayout({ children, title, subtitle }: DashboardLayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Top Header Bar */}
      <header className="bg-card border-b border-border">
        <div className="max-w-polaris mx-auto px-6">
          {/* Brand + Primary Nav */}
          <div className="flex items-center h-14">
            {/* Logo */}
            <div className="flex items-center gap-2 mr-8">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Zap className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-base font-semibold text-foreground">
                ShipConvert
              </span>
            </div>

            {/* Tab Navigation */}
            <nav className="flex items-center gap-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      isActive
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </NavLink>
                );
              })}
            </nav>

            {/* Right side - Account */}
            <div className="ml-auto flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-muted text-sm">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                  AC
                </div>
                <span className="font-medium text-foreground">Acme Corp</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-polaris mx-auto px-6 py-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-foreground">{title}</h1>
          {subtitle && (
            <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
        
        {/* Content */}
        <div className="animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
}
