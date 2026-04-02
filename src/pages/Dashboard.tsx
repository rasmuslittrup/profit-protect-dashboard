import { useState, useMemo } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
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
import { cn } from "@/lib/utils";
import { DashboardFilters, TimePeriod, ProfitFocus } from "@/components/dashboard/DashboardFilters";
import { useAnimatedNumber } from "@/hooks/useAnimatedNumber";

// Mock data sets per time period & focus
const kpiData: Record<string, Record<string, { revenue: number; carts: number; lift: number; rules: number; revChange: number; cartChange: number; liftChange: number }>> = {
  all: {
    standard: { revenue: 186690, carts: 1247, lift: 23.4, rules: 12, revChange: 12.5, cartChange: 8.2, liftChange: 3.1 },
    "max-margin": { revenue: 142300, carts: 843, lift: 28.7, rules: 12, revChange: 15.1, cartChange: 6.4, liftChange: 4.8 },
  },
  today: {
    standard: { revenue: 4820, carts: 31, lift: 21.2, rules: 12, revChange: 5.3, cartChange: 3.1, liftChange: -0.8 },
    "max-margin": { revenue: 3910, carts: 22, lift: 26.1, rules: 12, revChange: 7.8, cartChange: 4.2, liftChange: 1.2 },
  },
  week: {
    standard: { revenue: 34250, carts: 228, lift: 22.8, rules: 12, revChange: 9.1, cartChange: 6.5, liftChange: 1.4 },
    "max-margin": { revenue: 27800, carts: 164, lift: 27.3, rules: 12, revChange: 11.3, cartChange: 5.8, liftChange: 3.6 },
  },
  month: {
    standard: { revenue: 98400, carts: 654, lift: 24.1, rules: 12, revChange: 10.8, cartChange: 7.1, liftChange: 2.5 },
    "max-margin": { revenue: 76200, carts: 445, lift: 29.2, rules: 12, revChange: 13.6, cartChange: 5.9, liftChange: 5.1 },
  },
  custom: {
    standard: { revenue: 52100, carts: 347, lift: 22.1, rules: 12, revChange: 8.4, cartChange: 5.6, liftChange: 1.9 },
    "max-margin": { revenue: 41800, carts: 238, lift: 26.8, rules: 12, revChange: 10.2, cartChange: 4.3, liftChange: 3.3 },
  },
};

function formatDKK(n: number): string {
  return Math.round(n).toLocaleString("da-DK") + " kr.";
}

function formatNumber(n: number): string {
  return Math.round(n).toLocaleString("da-DK");
}

function formatPercent(n: number): string {
  return n.toFixed(1).replace(".", ",") + "%";
}

function formatChange(n: number): string {
  return (n >= 0 ? "+" : "") + n.toFixed(1).replace(".", ",") + "%";
}

function AnimatedKpiCard({ title, value, change, changeType, icon: Icon }: {
  title: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon?: any;
}) {
  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-semibold tracking-tight text-foreground transition-all duration-300">{value}</p>
        </div>
        {Icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
            <Icon className="h-5 w-5 text-muted-foreground" />
          </div>
        )}
      </div>
      {change && (
        <div className="mt-4 flex items-center gap-1">
          <span className={cn(
            "text-sm font-medium transition-all duration-300",
            changeType === "positive" && "text-success",
            changeType === "negative" && "text-destructive",
            changeType === "neutral" && "text-muted-foreground"
          )}>
            {change}
          </span>
          <span className="text-sm text-muted-foreground">vs forrige periode</span>
        </div>
      )}
    </div>
  );
}

const recentActivity = [
  { id: 1, event: "Fri fragt udløst", order: "#12847", margin: "52%", status: "approved" as const },
  { id: 2, event: "Fragt afvist", order: "#12846", margin: "18%", status: "rejected" as const },
  { id: 3, event: "Fri fragt udløst", order: "#12845", margin: "45%", status: "approved" as const },
  { id: 4, event: "Fri fragt udløst", order: "#12844", margin: "61%", status: "approved" as const },
  { id: 5, event: "Fragt afvist", order: "#12843", margin: "12%", status: "rejected" as const },
];

export default function Dashboard() {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("all");
  const [profitFocus, setProfitFocus] = useState<ProfitFocus>("standard");
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});

  const currentData = useMemo(() => {
    return kpiData[timePeriod]?.[profitFocus] ?? kpiData.all.standard;
  }, [timePeriod, profitFocus]);

  const animRevenue = useAnimatedNumber(currentData.revenue);
  const animCarts = useAnimatedNumber(currentData.carts);
  const animLift = useAnimatedNumber(currentData.lift);
  const animRevChange = useAnimatedNumber(currentData.revChange);
  const animCartChange = useAnimatedNumber(currentData.cartChange);
  const animLiftChange = useAnimatedNumber(currentData.liftChange);

  return (
    <DashboardLayout 
      title="Oversigt" 
      subtitle="Overvåg din fragtoptimerings-performance"
    >
      {/* Filter Bar */}
      <DashboardFilters
        timePeriod={timePeriod}
        onTimePeriodChange={setTimePeriod}
        profitFocus={profitFocus}
        onProfitFocusChange={setProfitFocus}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
      />

      {/* KPI Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <AnimatedKpiCard
          title="Samlet Reddet Indtjening"
          value={formatDKK(animRevenue)}
          change={formatChange(animRevChange)}
          changeType={animRevChange >= 0 ? "positive" : "negative"}
          icon={DollarSign}
        />
        <AnimatedKpiCard
          title="Reddede Kurve"
          value={formatNumber(animCarts)}
          change={formatChange(animCartChange)}
          changeType={animCartChange >= 0 ? "positive" : "negative"}
          icon={ShoppingCart}
        />
        <AnimatedKpiCard
          title="Konverteringsløft"
          value={formatPercent(animLift)}
          change={formatChange(animLiftChange)}
          changeType={animLiftChange >= 0 ? "positive" : "negative"}
          icon={TrendingUp}
        />
        <AnimatedKpiCard
          title="Aktive Regler"
          value={String(currentData.rules)}
          icon={Zap}
        />
      </div>

      {/* Quick Actions & Activity */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <div className="bg-card rounded-lg border border-border shadow-sm p-5">
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

        <div className="lg:col-span-2">
          <div className="bg-card rounded-lg border border-border shadow-sm">
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
