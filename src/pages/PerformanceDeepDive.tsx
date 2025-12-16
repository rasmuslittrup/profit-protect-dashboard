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
  { day: "Dag 1", standard: 9000, shipconvert: 9375 },
  { day: "Dag 5", standard: 43500, shipconvert: 48000 },
  { day: "Dag 10", standard: 84000, shipconvert: 98250 },
  { day: "Dag 15", standard: 123750, shipconvert: 151500 },
  { day: "Dag 20", standard: 163500, shipconvert: 208500 },
  { day: "Dag 25", standard: 201750, shipconvert: 263250 },
  { day: "Dag 30", standard: 240000, shipconvert: 326250 },
];

const breakdownData = [
  { 
    metric: "Kurv-afbrydelsesrate", 
    standard: "68,4%", 
    shipconvert: "61,2%", 
    change: -7.2,
    changeType: "decrease" as const,
    icon: ShoppingCart 
  },
  { 
    metric: "Gns. Ordreværdi", 
    standard: "956 kr.", 
    shipconvert: "1.067 kr.", 
    change: 11.6,
    changeType: "increase" as const,
    icon: DollarSign 
  },
  { 
    metric: "Fragtomkostninger Afholdt", 
    standard: "17.550 kr.", 
    shipconvert: "30.900 kr.", 
    change: 76.1,
    changeType: "increase" as const,
    icon: Truck 
  },
  { 
    metric: "Antal Ordrer", 
    standard: "1.247", 
    shipconvert: "1.456", 
    change: 16.8,
    changeType: "increase" as const,
    icon: Users 
  },
];

export default function PerformanceDeepDive() {
  return (
    <DashboardLayout
      title="Performance Dybdegående"
      subtitle="A/B-test analyse der beviser ShipConvert ROI"
    >
      <div className="space-y-6">
        {/* Header with date range */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-lg text-sm">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium text-foreground">Sidste 30 Dage</span>
            <span className="text-muted-foreground">• 16. nov – 16. dec 2024</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-3 h-3 rounded-full bg-chart-muted" />
            <span>50% Kontrolgruppe</span>
            <span className="mx-2">•</span>
            <div className="w-3 h-3 rounded-full bg-success" />
            <span>50% ShipConvert</span>
          </div>
        </div>

        {/* Split Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Control Group */}
          <div className="relative bg-card rounded-lg border border-border shadow-card p-5 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-chart-muted" />
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                <Users className="w-4 h-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Kontrolgruppe A</p>
                <h3 className="text-base font-semibold text-foreground">Standard Checkout</h3>
              </div>
            </div>
            
            <div className="space-y-5">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Konverteringsrate</p>
                <p className="text-2xl font-bold text-foreground">2,1%</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Indtjening pr. Besøgende</p>
                <p className="text-2xl font-bold text-foreground">9 kr.</p>
              </div>
              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground mb-1">Samlet Netto Profit</p>
                <p className="text-xl font-semibold text-foreground">240.000 kr.</p>
              </div>
            </div>
          </div>

          {/* ShipConvert Group */}
          <div className="relative bg-card rounded-lg border-2 border-success/30 shadow-card p-5 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-success" />
            <div className="absolute top-3 right-3">
              <span className="px-2 py-1 bg-success/10 text-success text-xs font-semibold rounded-full">
                VINDER
              </span>
            </div>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-success" />
              </div>
              <div>
                <p className="text-xs font-medium text-success uppercase tracking-wider">Testgruppe B</p>
                <h3 className="text-base font-semibold text-foreground">ShipConvert Interventioner</h3>
              </div>
            </div>
            
            <div className="space-y-5">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Konverteringsrate</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold text-foreground">2,8%</p>
                  <span className="flex items-center text-success text-sm font-medium">
                    <ArrowUpRight className="w-4 h-4" />
                    +33%
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Indtjening pr. Besøgende</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold text-foreground">10,88 kr.</p>
                  <span className="flex items-center text-success text-sm font-medium">
                    <ArrowUpRight className="w-4 h-4" />
                    +21%
                  </span>
                </div>
              </div>
              <div className="pt-4 border-t border-success/20">
                <p className="text-sm text-muted-foreground mb-1">Samlet Netto Profit</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-xl font-semibold text-success">326.250 kr.</p>
                  <span className="text-success text-sm font-medium">+86.250 kr.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cumulative Profit Chart */}
        <div className="bg-card rounded-lg border border-border shadow-card p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-base font-semibold text-foreground">Kumulativ Netto Profit</h3>
              <p className="text-sm text-muted-foreground">Se divergensen over 30 dage</p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-chart-muted" />
                <span className="text-muted-foreground">Standard</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-success" />
                <span className="text-muted-foreground">ShipConvert</span>
              </div>
            </div>
          </div>
          
          <div className="h-[280px]">
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
                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}k kr.`}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}
                  formatter={(value: number, name: string) => [
                    `${value.toLocaleString('da-DK')} kr.`,
                    name === 'standard' ? 'Standard' : 'ShipConvert'
                  ]}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="standard" 
                  stroke="hsl(var(--chart-muted))"
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--chart-muted))', strokeWidth: 0, r: 4 }}
                  name="Standard Checkout"
                />
                <Line 
                  type="monotone" 
                  dataKey="shipconvert" 
                  stroke="hsl(var(--success))"
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--success))', strokeWidth: 0, r: 4 }}
                  name="ShipConvert"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          {/* Profit Gap Callout */}
          <div className="mt-4 p-4 bg-success/5 rounded-lg border border-success/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-success/10 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-success" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Inkrementel Profit Genereret</p>
                  <p className="text-xs text-muted-foreground">Sammenlignet med standard checkout over 30 dage</p>
                </div>
              </div>
              <p className="text-xl font-bold text-success">+86.250 kr.</p>
            </div>
          </div>
        </div>

        {/* Breakdown Table */}
        <div className="bg-card rounded-lg border border-border shadow-card overflow-hidden">
          <div className="p-5 border-b border-border">
            <h3 className="text-base font-semibold text-foreground">Detaljeret Opdeling</h3>
            <p className="text-sm text-muted-foreground">Matematikken bag resultaterne</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left py-3 px-5 text-xs font-medium text-muted-foreground uppercase tracking-wider">Metrik</th>
                  <th className="text-right py-3 px-5 text-xs font-medium text-muted-foreground uppercase tracking-wider">Standard</th>
                  <th className="text-right py-3 px-5 text-xs font-medium text-muted-foreground uppercase tracking-wider">ShipConvert</th>
                  <th className="text-right py-3 px-5 text-xs font-medium text-muted-foreground uppercase tracking-wider">Ændring</th>
                </tr>
              </thead>
              <tbody>
                {breakdownData.map((row, index) => (
                  <tr key={index} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                    <td className="py-3 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                          <row.icon className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <span className="text-sm font-medium text-foreground">{row.metric}</span>
                      </div>
                    </td>
                    <td className="py-3 px-5 text-right text-sm text-muted-foreground font-mono">
                      {row.standard}
                    </td>
                    <td className="py-3 px-5 text-right text-sm text-foreground font-mono font-medium">
                      {row.shipconvert}
                    </td>
                    <td className="py-3 px-5 text-right">
                      <span className={`inline-flex items-center gap-1 text-sm font-medium ${
                        row.metric === "Kurv-afbrydelsesrate" 
                          ? 'text-success' 
                          : row.metric === "Fragtomkostninger Afholdt"
                            ? 'text-warning'
                            : 'text-success'
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
          <div className="p-5 bg-muted/30 border-t border-border">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                <DollarSign className="w-4 h-4 text-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground mb-1">Matematikken Der Tæller</p>
                <p className="text-sm text-muted-foreground">
                  ShipConvert brugte <span className="font-medium text-foreground">13.350 kr. mere</span> på fragt, 
                  men genererede <span className="font-medium text-success">86.250 kr. mere</span> i netto profit. 
                  Det er et <span className="font-medium text-success">6,5x afkast</span> på fragtinvesteringen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
