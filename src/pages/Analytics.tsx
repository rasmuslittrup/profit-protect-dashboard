import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { KpiCard } from "@/components/ui/kpi-card";
import { DollarSign, TrendingUp, ShoppingCart } from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from "recharts";

const profitData = [
  { date: "1 Nov", profit: 0 },
  { date: "5 Nov", profit: 12400 },
  { date: "10 Nov", profit: 28900 },
  { date: "15 Nov", profit: 52300 },
  { date: "20 Nov", profit: 89200 },
  { date: "25 Nov", profit: 124600 },
  { date: "30 Nov", profit: 156200 },
  { date: "5 Dec", profit: 186690 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg shadow-elevated p-3">
        <p className="text-sm font-medium text-foreground mb-1">{label}</p>
        <p className="text-lg font-bold text-success">
          {payload[0].value.toLocaleString('da-DK')} kr.
        </p>
      </div>
    );
  }
  return null;
};

export default function Analytics() {
  return (
    <DashboardLayout 
      title="Statistik" 
      subtitle="Din akkumulerede indtjening med ShipConvert"
    >
      {/* Simple KPI Cards */}
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <KpiCard
          title="Samlet Reddet Indtjening"
          value="186.690 kr."
          change="+31.725 kr. denne uge"
          changeType="positive"
          icon={DollarSign}
        />
        <KpiCard
          title="Reddede Kurve"
          value="1.247"
          change="+89 denne uge"
          changeType="positive"
          icon={ShoppingCart}
        />
        <KpiCard
          title="Gns. Besparelse pr. Ordre"
          value="149 kr."
          change="+12 kr."
          changeType="positive"
          icon={TrendingUp}
        />
      </div>

      {/* Main Chart - Accumulated Profit */}
      <div className="bg-card rounded-lg border border-border shadow-card p-5">
        <div className="mb-5">
          <h2 className="text-base font-semibold text-foreground">Akkumuleret Profit (Kr.)</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Total indtjening reddet af ShipConvert over tid
          </p>
        </div>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={profitData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="date" 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
              />
              <YAxis 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="profit" 
                stroke="hsl(var(--success))" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#profitGradient)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Simple Insight */}
        <div className="mt-5 p-4 rounded-lg bg-success/10 border border-success/20">
          <p className="text-sm text-foreground">
            <strong className="text-success">+186.690 kr.</strong> i reddet indtjening siden du aktiverede ShipConvert. 
            Det svarer til <strong>1.247 kunder</strong>, der ellers ville have forladt kassen.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
