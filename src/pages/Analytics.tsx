import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { KpiCard } from "@/components/ui/kpi-card";
import { DollarSign, ShoppingCart, TrendingUp, Users } from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";

const comparisonData = [
  {
    metric: "Conversion Rate",
    "Group A": 2.4,
    "Group B": 3.1,
  },
  {
    metric: "Avg Order Value",
    "Group A": 85,
    "Group B": 94,
  },
  {
    metric: "Net Profit/Order",
    "Group A": 28,
    "Group B": 34,
  },
  {
    metric: "Cart Recovery",
    "Group A": 12,
    "Group B": 23,
  },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg shadow-elevated p-3">
        <p className="font-medium text-foreground mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <span 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-muted-foreground">{entry.name}:</span>
            <span className="font-medium text-foreground">
              {entry.name.includes("Rate") || entry.name.includes("Recovery") 
                ? `${entry.value}%` 
                : `$${entry.value}`}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function Analytics() {
  return (
    <DashboardLayout 
      title="Analytics" 
      subtitle="A/B test results and hold-out group analysis"
    >
      {/* Info Banner */}
      <div className="bg-info-light border border-info/20 rounded-lg p-4 mb-6">
        <div className="flex gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-info/10 flex-shrink-0">
            <Users className="h-4 w-4 text-info" />
          </div>
          <div>
            <p className="font-medium text-foreground text-sm">Hold-out Group Testing Active</p>
            <p className="text-sm text-muted-foreground mt-1">
              10% of your traffic sees standard shipping (Group A), while 90% sees ShipConvert's smart shipping (Group B). 
              This proves the incremental value of margin-based decisions.
            </p>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <KpiCard
          title="Total Profit Saved"
          value="$24,892"
          change="+$4,230"
          changeType="positive"
          icon={DollarSign}
        />
        <KpiCard
          title="Carts Rescued"
          value="1,247"
          change="+189"
          changeType="positive"
          icon={ShoppingCart}
        />
        <KpiCard
          title="Conversion Uplift"
          value="+23.4%"
          change="+2.1pp"
          changeType="positive"
          icon={TrendingUp}
        />
        <KpiCard
          title="ROI vs Control"
          value="4.2x"
          change="+0.8x"
          changeType="positive"
          icon={DollarSign}
        />
      </div>

      {/* Comparison Chart */}
      <div className="bg-card rounded-lg border border-border shadow-card p-5">
        <div className="mb-5">
          <h2 className="text-base font-semibold text-foreground">Performance Comparison</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Group A (Standard Shipping) vs Group B (ShipConvert Smart Shipping)
          </p>
        </div>
        
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={comparisonData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="metric" 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
              />
              <YAxis 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
                formatter={(value) => (
                  <span className="text-sm text-foreground">{value}</span>
                )}
              />
              <Bar 
                dataKey="Group A" 
                fill="hsl(var(--chart-muted))" 
                radius={[4, 4, 0, 0]}
                name="Group A (Standard)"
              />
              <Bar 
                dataKey="Group B" 
                fill="hsl(var(--chart-success))" 
                radius={[4, 4, 0, 0]}
                name="Group B (ShipConvert)"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Key Insight */}
        <div className="mt-5 p-4 rounded-lg bg-success-light border border-success/20">
          <p className="text-sm font-medium text-success">Key Insight</p>
          <p className="text-sm text-foreground mt-1">
            Group B shows <strong>29% higher conversion</strong> and <strong>21% higher net profit per order</strong> despite 
            absorbing shipping costs on qualifying orders. The margin-based approach ensures only profitable free shipping is offered.
          </p>
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="grid gap-4 md:grid-cols-2 mt-6">
        <div className="bg-card rounded-lg border border-border shadow-card p-5">
          <h3 className="text-base font-semibold text-foreground mb-4">Group A: Standard Shipping</h3>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-sm text-muted-foreground">Total Orders</span>
              <span className="text-sm font-medium text-foreground">1,240</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-sm text-muted-foreground">Free Shipping Offered</span>
              <span className="text-sm font-medium text-foreground">0 (None)</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-sm text-muted-foreground">Average Cart Abandonment</span>
              <span className="text-sm font-medium text-foreground">68%</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-sm text-muted-foreground">Net Profit</span>
              <span className="text-sm font-medium text-foreground">$34,720</span>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border shadow-card p-5">
          <h3 className="text-base font-semibold text-foreground mb-4">Group B: ShipConvert Smart Shipping</h3>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-sm text-muted-foreground">Total Orders</span>
              <span className="text-sm font-medium text-foreground">11,160</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-sm text-muted-foreground">Free Shipping Offered</span>
              <span className="text-sm font-medium text-success">7,812 (70%)</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-sm text-muted-foreground">Average Cart Abandonment</span>
              <span className="text-sm font-medium text-success">52%</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-sm text-muted-foreground">Net Profit</span>
              <span className="text-sm font-medium text-success">$379,440</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
