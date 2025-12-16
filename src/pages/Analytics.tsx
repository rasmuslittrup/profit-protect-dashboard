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
    metric: "Konvertering",
    "Gruppe A": 2.4,
    "Gruppe B": 3.1,
  },
  {
    metric: "Gns. Ordreværdi",
    "Gruppe A": 85,
    "Gruppe B": 94,
  },
  {
    metric: "Netto Profit/Ordre",
    "Gruppe A": 28,
    "Gruppe B": 34,
  },
  {
    metric: "Kurv-redning",
    "Gruppe A": 12,
    "Gruppe B": 23,
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
              {label === "Konvertering" || label === "Kurv-redning" 
                ? `${entry.value}%` 
                : `${entry.value} kr.`}
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
      title="Statistik" 
      subtitle="A/B-testresultater og kontrolgruppe-analyse"
    >
      {/* Info Banner */}
      <div className="bg-info-light border border-info/20 rounded-lg p-4 mb-6">
        <div className="flex gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-info/10 flex-shrink-0">
            <Users className="h-4 w-4 text-info" />
          </div>
          <div>
            <p className="font-medium text-foreground text-sm">Kontrolgruppe-test Aktiv</p>
            <p className="text-sm text-muted-foreground mt-1">
              10% af din trafik ser standard fragt (Gruppe A), mens 90% ser ShipConverts smarte fragt (Gruppe B). 
              Dette beviser den inkrementelle værdi af dækningsgrad-baserede beslutninger.
            </p>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <KpiCard
          title="Samlet Reddet Indtjening"
          value="186.690 kr."
          change="+31.725 kr."
          changeType="positive"
          icon={DollarSign}
        />
        <KpiCard
          title="Reddede Kurve"
          value="1.247"
          change="+189"
          changeType="positive"
          icon={ShoppingCart}
        />
        <KpiCard
          title="Konverteringsløft"
          value="+23,4%"
          change="+2,1pp"
          changeType="positive"
          icon={TrendingUp}
        />
        <KpiCard
          title="ROI vs Kontrol"
          value="4,2x"
          change="+0,8x"
          changeType="positive"
          icon={DollarSign}
        />
      </div>

      {/* Comparison Chart */}
      <div className="bg-card rounded-lg border border-border shadow-card p-5">
        <div className="mb-5">
          <h2 className="text-base font-semibold text-foreground">Performance Sammenligning</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Gruppe A (Standard Fragt) vs Gruppe B (ShipConvert Smart Fragt)
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
                dataKey="Gruppe A" 
                fill="hsl(var(--chart-muted))" 
                radius={[4, 4, 0, 0]}
                name="Gruppe A (Standard)"
              />
              <Bar 
                dataKey="Gruppe B" 
                fill="hsl(var(--chart-success))" 
                radius={[4, 4, 0, 0]}
                name="Gruppe B (ShipConvert)"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Key Insight */}
        <div className="mt-5 p-4 rounded-lg bg-success-light border border-success/20">
          <p className="text-sm font-medium text-success">Vigtig Indsigt</p>
          <p className="text-sm text-foreground mt-1">
            Gruppe B viser <strong>29% højere konvertering</strong> og <strong>21% højere netto profit pr. ordre</strong> på trods af 
            at absorbere fragtomkostninger på kvalificerende ordrer. Den dækningsgrad-baserede tilgang sikrer, at kun profitabel fri fragt tilbydes.
          </p>
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="grid gap-4 md:grid-cols-2 mt-6">
        <div className="bg-card rounded-lg border border-border shadow-card p-5">
          <h3 className="text-base font-semibold text-foreground mb-4">Gruppe A: Standard Fragt</h3>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-sm text-muted-foreground">Antal Ordrer</span>
              <span className="text-sm font-medium text-foreground">1.240</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-sm text-muted-foreground">Fri Fragt Tilbudt</span>
              <span className="text-sm font-medium text-foreground">0 (Ingen)</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-sm text-muted-foreground">Gns. Kurv-afbrydelse</span>
              <span className="text-sm font-medium text-foreground">68%</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-sm text-muted-foreground">Netto Profit</span>
              <span className="text-sm font-medium text-foreground">260.400 kr.</span>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border shadow-card p-5">
          <h3 className="text-base font-semibold text-foreground mb-4">Gruppe B: ShipConvert Smart Fragt</h3>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-sm text-muted-foreground">Antal Ordrer</span>
              <span className="text-sm font-medium text-foreground">11.160</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-sm text-muted-foreground">Fri Fragt Tilbudt</span>
              <span className="text-sm font-medium text-success">7.812 (70%)</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-sm text-muted-foreground">Gns. Kurv-afbrydelse</span>
              <span className="text-sm font-medium text-success">52%</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-sm text-muted-foreground">Netto Profit</span>
              <span className="text-sm font-medium text-success">2.845.800 kr.</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
