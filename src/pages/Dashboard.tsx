import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { KpiCard } from "@/components/ui/kpi-card";
import { StatusBadge } from "@/components/ui/status-badge";
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
  { id: 1, event: "Free shipping triggered", order: "#12847", margin: "52%", status: "approved" as const },
  { id: 2, event: "Shipping rejected", order: "#12846", margin: "18%", status: "rejected" as const },
  { id: 3, event: "Free shipping triggered", order: "#12845", margin: "45%", status: "approved" as const },
  { id: 4, event: "Free shipping triggered", order: "#12844", margin: "61%", status: "approved" as const },
  { id: 5, event: "Shipping rejected", order: "#12843", margin: "12%", status: "rejected" as const },
];

export default function Dashboard() {
  return (
    <DashboardLayout 
      title="Dashboard" 
      subtitle="Monitor your shipping optimization performance"
    >
      {/* KPI Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <KpiCard
          title="Total Profit Saved"
          value="$24,892"
          change="+12.5%"
          changeType="positive"
          icon={DollarSign}
        />
        <KpiCard
          title="Carts Rescued"
          value="1,247"
          change="+8.2%"
          changeType="positive"
          icon={ShoppingCart}
        />
        <KpiCard
          title="Conversion Uplift"
          value="23.4%"
          change="+3.1%"
          changeType="positive"
          icon={TrendingUp}
        />
        <KpiCard
          title="Rules Active"
          value="12"
          icon={Zap}
        />
      </div>

      {/* Quick Actions & Activity */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Quick Actions */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Quick Actions</h2>
          <div className="space-y-3">
            <Link to="/profit-engine">
              <div className="group bg-card rounded-lg border border-border p-4 shadow-card transition-all hover:shadow-card-hover hover:border-primary/30 cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">Configure Margins</p>
                    <p className="text-sm text-muted-foreground">Set up profit rules</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </div>
            </Link>
            <Link to="/profit-engine">
              <div className="group bg-card rounded-lg border border-border p-4 shadow-card transition-all hover:shadow-card-hover hover:border-primary/30 cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                    <Package className="h-5 w-5 text-success" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">Test Simulator</p>
                    <p className="text-sm text-muted-foreground">Run shipping scenarios</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              View all
            </Button>
          </div>
          <div className="bg-card rounded-lg border border-border shadow-card overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-surface">
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Event</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Order</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Margin</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentActivity.map((item) => (
                  <tr key={item.id} className="hover:bg-surface/50 transition-colors">
                    <td className="px-4 py-3 text-sm text-foreground">{item.event}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground font-mono">{item.order}</td>
                    <td className="px-4 py-3 text-sm text-foreground font-medium">{item.margin}</td>
                    <td className="px-4 py-3">
                      <StatusBadge variant={item.status === "approved" ? "success" : "error"}>
                        {item.status === "approved" ? "Approved" : "Rejected"}
                      </StatusBadge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
