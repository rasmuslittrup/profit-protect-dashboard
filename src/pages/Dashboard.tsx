import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { KpiCard } from "@/components/ui/kpi-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { StrategySelector } from "@/components/StrategySelector";
import { LiveWinTicker } from "@/components/LiveWinTicker";
import { 
  DollarSign, 
  ShoppingCart, 
  TrendingUp, 
  Zap,
  ArrowRight,
  Package
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const recentActivity = [
  { id: 1, event: "Fri fragt udløst", order: "#12847", margin: "52%", status: "approved" as const },
  { id: 2, event: "Fragt afvist", order: "#12846", margin: "18%", status: "rejected" as const },
  { id: 3, event: "Fri fragt udløst", order: "#12845", margin: "45%", status: "approved" as const },
  { id: 4, event: "Fri fragt udløst", order: "#12844", margin: "61%", status: "approved" as const },
  { id: 5, event: "Fragt afvist", order: "#12843", margin: "12%", status: "rejected" as const },
];

export default function Dashboard() {
  return (
    <DashboardLayout 
      title="Oversigt" 
      subtitle="Overvåg din fragoptimerings-performance"
    >
      {/* Live Win Ticker */}
      <LiveWinTicker />

      {/* Strategy Selector */}
      <StrategySelector />

      {/* KPI Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <KpiCard
          title="Samlet Reddet Indtjening"
          value="186.690 kr."
          change="+12,5%"
          changeType="positive"
          icon={DollarSign}
        />
        <KpiCard
          title="Reddede Kurve"
          value="1.247"
          change="+8,2%"
          changeType="positive"
          icon={ShoppingCart}
        />
        <KpiCard
          title="Konverteringsløft"
          value="23,4%"
          change="+3,1%"
          changeType="positive"
          icon={TrendingUp}
        />
        <KpiCard
          title="Aktive Regler"
          value="12"
          icon={Zap}
        />
      </div>

      {/* Quick Actions & Activity */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <div className="bg-card rounded-lg border border-border shadow-card p-5">
            <h2 className="text-base font-semibold text-foreground mb-4">Hurtige Handlinger</h2>
            <div className="space-y-3">
              <Link to="/profit-engine">
                <div className="group flex items-center gap-3 p-3 rounded-lg border border-border bg-card hover:bg-muted transition-colors cursor-pointer">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                    <Zap className="h-4 w-4 text-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">Konfigurer Marginer</p>
                    <p className="text-xs text-muted-foreground">Opsæt profit-regler</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>
              </Link>
              <Link to="/profit-engine">
                <div className="group flex items-center gap-3 p-3 rounded-lg border border-border bg-card hover:bg-muted transition-colors cursor-pointer">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-success/10">
                    <Package className="h-4 w-4 text-success" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">Test Simulator</p>
                    <p className="text-xs text-muted-foreground">Kør fragtscenarier</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Activity - Polaris ResourceList style */}
        <div className="lg:col-span-2">
          <div className="bg-card rounded-lg border border-border shadow-card">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="text-base font-semibold text-foreground">Seneste Aktivitet</h2>
              <Button variant="ghost" size="sm" className="text-muted-foreground text-xs">
                Se alle
              </Button>
            </div>
            <div className="divide-y divide-border">
              {recentActivity.map((item) => (
                <div key={item.id} className="flex items-center justify-between px-4 py-3 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-foreground">{item.event}</span>
                    <span className="text-sm text-muted-foreground font-mono">{item.order}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-foreground">{item.margin}</span>
                    <StatusBadge variant={item.status === "approved" ? "success" : "error"}>
                      {item.status === "approved" ? "Godkendt" : "Afvist"}
                    </StatusBadge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
