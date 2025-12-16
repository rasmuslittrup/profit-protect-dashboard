import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  TrendingUp, 
  Users, 
  ShoppingCart,
  Truck,
  DollarSign,
  Calendar
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const cumulativeProfitData = [
  { day: "Day 1", standard: 1200, shipconvert: 1250 },
  { day: "Day 5", standard: 5800, shipconvert: 6400 },
  { day: "Day 10", standard: 11200, shipconvert: 13100 },
  { day: "Day 15", standard: 16500, shipconvert: 20200 },
  { day: "Day 20", standard: 21800, shipconvert: 27800 },
  { day: "Day 25", standard: 26900, shipconvert: 35100 },
  { day: "Day 30", standard: 32000, shipconvert: 43500 },
];

const breakdownData = [
  { 
    metric: "Cart Abandonment Rate", 
    standard: "68.4%", 
    shipconvert: "61.2%", 
    change: -7.2,
    changeType: "decrease" as const,
    icon: ShoppingCart 
  },
  { 
    metric: "Average Order Value", 
    standard: "$127.50", 
    shipconvert: "$142.30", 
    change: 11.6,
    changeType: "increase" as const,
    icon: DollarSign 
  },
  { 
    metric: "Shipping Cost Incurred", 
    standard: "$2,340", 
    shipconvert: "$4,120", 
    change: 76.1,
    changeType: "increase" as const,
    icon: Truck 
  },
  { 
    metric: "Total Orders", 
    standard: "1,247", 
    shipconvert: "1,456", 
    change: 16.8,
    changeType: "increase" as const,
    icon: Users 
  },
];

export default function PerformanceDeepDive() {
  return (
    <DashboardLayout
      title="Performance Deep Dive"
      subtitle="A/B test analysis proving ShipConvert ROI"
    >
      <div className="space-y-8">
        {/* Header with date range */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg text-sm">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium">Last 30 Days</span>
            <span className="text-muted-foreground">• Nov 16 – Dec 16, 2024</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-3 h-3 rounded-full bg-muted-foreground/40" />
            <span>50% Hold-out</span>
            <span className="mx-2">•</span>
            <div className="w-3 h-3 rounded-full bg-emerald" />
            <span>50% ShipConvert</span>
          </div>
        </div>

        {/* Split Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Control Group */}
          <div className="relative bg-card rounded-xl border border-border shadow-card p-6 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-muted-foreground/30" />
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                <Users className="w-4 h-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Control Group A</p>
                <h3 className="text-lg font-semibold text-foreground">Standard Checkout</h3>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Conversion Rate</p>
                <p className="text-3xl font-bold text-foreground">2.1%</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Net Profit per Visitor</p>
                <p className="text-3xl font-bold text-foreground">$1.20</p>
              </div>
              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground mb-1">Total Net Profit</p>
                <p className="text-2xl font-semibold text-foreground">$32,000</p>
              </div>
            </div>
          </div>

          {/* ShipConvert Group */}
          <div className="relative bg-card rounded-xl border-2 border-emerald/30 shadow-card p-6 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-emerald" />
            <div className="absolute top-4 right-4">
              <span className="px-2 py-1 bg-emerald/10 text-emerald text-xs font-semibold rounded-full">
                WINNER
              </span>
            </div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-emerald/10 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-emerald" />
              </div>
              <div>
                <p className="text-xs font-medium text-emerald uppercase tracking-wider">Test Group B</p>
                <h3 className="text-lg font-semibold text-foreground">ShipConvert Interventions</h3>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Conversion Rate</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold text-foreground">2.8%</p>
                  <span className="flex items-center text-emerald text-sm font-medium">
                    <ArrowUpRight className="w-4 h-4" />
                    +33%
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Net Profit per Visitor</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold text-foreground">$1.45</p>
                  <span className="flex items-center text-emerald text-sm font-medium">
                    <ArrowUpRight className="w-4 h-4" />
                    +21%
                  </span>
                </div>
              </div>
              <div className="pt-4 border-t border-emerald/20">
                <p className="text-sm text-muted-foreground mb-1">Total Net Profit</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-semibold text-emerald">$43,500</p>
                  <span className="text-emerald text-sm font-medium">+$11,500</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cumulative Profit Chart */}
        <div className="bg-card rounded-xl border border-border shadow-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Net Profit Cumulative</h3>
              <p className="text-sm text-muted-foreground">Watch the divergence over 30 days</p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-muted-foreground/50" />
                <span className="text-muted-foreground">Standard</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald" />
                <span className="text-muted-foreground">ShipConvert</span>
              </div>
            </div>
          </div>
          
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cumulativeProfitData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="day" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}
                  formatter={(value: number, name: string) => [
                    `$${value.toLocaleString()}`,
                    name === 'standard' ? 'Standard' : 'ShipConvert'
                  ]}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="standard" 
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--muted-foreground))', strokeWidth: 0, r: 4 }}
                  name="Standard Checkout"
                />
                <Line 
                  type="monotone" 
                  dataKey="shipconvert" 
                  stroke="hsl(var(--emerald))"
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--emerald))', strokeWidth: 0, r: 4 }}
                  name="ShipConvert"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          {/* Profit Gap Callout */}
          <div className="mt-4 p-4 bg-emerald/5 rounded-lg border border-emerald/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-emerald" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Incremental Profit Generated</p>
                  <p className="text-xs text-muted-foreground">Compared to standard checkout over 30 days</p>
                </div>
              </div>
              <p className="text-2xl font-bold text-emerald">+$11,500</p>
            </div>
          </div>
        </div>

        {/* Breakdown Table */}
        <div className="bg-card rounded-xl border border-border shadow-card overflow-hidden">
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-semibold text-foreground">Detailed Breakdown</h3>
            <p className="text-sm text-muted-foreground">The math behind the results</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Metric</th>
                  <th className="text-right py-4 px-6 text-sm font-medium text-muted-foreground">Standard</th>
                  <th className="text-right py-4 px-6 text-sm font-medium text-muted-foreground">ShipConvert</th>
                  <th className="text-right py-4 px-6 text-sm font-medium text-muted-foreground">Change</th>
                </tr>
              </thead>
              <tbody>
                {breakdownData.map((row, index) => (
                  <tr key={index} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                          <row.icon className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <span className="text-sm font-medium text-foreground">{row.metric}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right text-sm text-muted-foreground font-mono">
                      {row.standard}
                    </td>
                    <td className="py-4 px-6 text-right text-sm text-foreground font-mono font-medium">
                      {row.shipconvert}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span className={`inline-flex items-center gap-1 text-sm font-medium ${
                        row.metric === "Cart Abandonment Rate" 
                          ? 'text-emerald' 
                          : row.metric === "Shipping Cost Incurred"
                            ? 'text-amber-600'
                            : 'text-emerald'
                      }`}>
                        {row.changeType === "decrease" ? (
                          <ArrowDownRight className="w-4 h-4" />
                        ) : (
                          <ArrowUpRight className="w-4 h-4" />
                        )}
                        {row.change > 0 ? '+' : ''}{row.change}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Math Explanation */}
          <div className="p-6 bg-muted/30 border-t border-border">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <DollarSign className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground mb-1">The Math That Matters</p>
                <p className="text-sm text-muted-foreground">
                  ShipConvert spent <span className="font-medium text-foreground">$1,780 more</span> on shipping, 
                  but generated <span className="font-medium text-emerald">$11,500 more</span> in net profit. 
                  That's a <span className="font-medium text-emerald">6.5x return</span> on shipping investment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
