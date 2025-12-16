import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatusBadge } from "@/components/ui/status-badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2, PlayCircle, CheckCircle, XCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Rule {
  id: number;
  category: string;
  margin: number;
  active: boolean;
}

interface SimulationResult {
  approved: boolean;
  revenue: number;
  profit: number;
  shippingCost: number;
  netUpside: number;
}

const initialRules: Rule[] = [
  { id: 1, category: "Electronics", margin: 25, active: true },
  { id: 2, category: "Shoes", margin: 50, active: true },
  { id: 3, category: "Apparel", margin: 40, active: true },
  { id: 4, category: "Home & Garden", margin: 35, active: false },
];

const categories = ["Electronics", "Shoes", "Apparel", "Home & Garden", "Sports", "Beauty", "Toys", "Books"];

export default function ProfitEngine() {
  const [rules, setRules] = useState<Rule[]>(initialRules);
  const [newCategory, setNewCategory] = useState("");
  const [newMargin, setNewMargin] = useState("");
  
  // Simulator state
  const [cartTotal, setCartTotal] = useState("100");
  const [selectedCategory, setSelectedCategory] = useState("Shoes");
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);

  const handleAddRule = () => {
    if (!newCategory || !newMargin) {
      toast({
        title: "Missing fields",
        description: "Please fill in both category and margin.",
        variant: "destructive",
      });
      return;
    }

    const margin = parseFloat(newMargin);
    if (isNaN(margin) || margin < 0 || margin > 100) {
      toast({
        title: "Invalid margin",
        description: "Margin must be between 0 and 100.",
        variant: "destructive",
      });
      return;
    }

    const newRule: Rule = {
      id: Date.now(),
      category: newCategory,
      margin,
      active: true,
    };

    setRules([...rules, newRule]);
    setNewCategory("");
    setNewMargin("");
    toast({
      title: "Rule created",
      description: `Margin rule for ${newCategory} saved successfully.`,
    });
  };

  const handleDeleteRule = (id: number) => {
    setRules(rules.filter(rule => rule.id !== id));
    toast({
      title: "Rule deleted",
      description: "The margin rule has been removed.",
    });
  };

  const handleToggleRule = (id: number) => {
    setRules(rules.map(rule => 
      rule.id === id ? { ...rule, active: !rule.active } : rule
    ));
  };

  const runSimulation = () => {
    const total = parseFloat(cartTotal);
    if (isNaN(total) || total <= 0) {
      toast({
        title: "Invalid cart total",
        description: "Please enter a valid cart amount.",
        variant: "destructive",
      });
      return;
    }

    const rule = rules.find(r => r.category === selectedCategory && r.active);
    const marginPercent = rule?.margin ?? 30; // Default 30% if no rule
    const shippingCost = 5; // Fixed shipping cost for demo
    
    const profit = total * (marginPercent / 100);
    const netUpside = profit - shippingCost;
    const approved = netUpside > 0;

    setSimulationResult({
      approved,
      revenue: total,
      profit,
      shippingCost,
      netUpside,
    });
  };

  return (
    <DashboardLayout 
      title="Profit Engine" 
      subtitle="Configure margin rules and test shipping decisions"
    >
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Margin Configuration */}
        <div className="space-y-6">
          <div className="bg-card rounded-lg border border-border shadow-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">Margin Configuration</h2>
            
            {/* Add New Rule */}
            <div className="space-y-4 pb-6 border-b border-border">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="category">Product Category</Label>
                  <Select value={newCategory} onValueChange={setNewCategory}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="margin">Estimated Margin %</Label>
                  <Input
                    id="margin"
                    type="number"
                    placeholder="e.g. 50"
                    value={newMargin}
                    onChange={(e) => setNewMargin(e.target.value)}
                    min="0"
                    max="100"
                  />
                </div>
              </div>
              <Button onClick={handleAddRule} className="w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Save Rule
              </Button>
            </div>

            {/* Rules Table */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-4">Active Rules</h3>
              <div className="space-y-3">
                {rules.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No rules configured yet. Add your first margin rule above.
                  </p>
                ) : (
                  rules.map((rule) => (
                    <div 
                      key={rule.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-surface border border-border"
                    >
                      <div className="flex items-center gap-4">
                        <Switch
                          checked={rule.active}
                          onCheckedChange={() => handleToggleRule(rule.id)}
                        />
                        <div>
                          <p className="font-medium text-foreground">{rule.category}</p>
                          <p className="text-sm text-muted-foreground">{rule.margin}% margin</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <StatusBadge variant={rule.active ? "success" : "default"}>
                          {rule.active ? "Active" : "Inactive"}
                        </StatusBadge>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeleteRule(rule.id)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Simulator */}
        <div className="space-y-6">
          <div className="bg-card rounded-lg border border-border shadow-card p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">Shipping Simulator</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Test how the system decides whether to offer free shipping based on your margin rules.
            </p>
            
            {/* Simulator Inputs */}
            <div className="space-y-4 pb-6 border-b border-border">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="cartTotal">Cart Total ($)</Label>
                  <Input
                    id="cartTotal"
                    type="number"
                    placeholder="e.g. 100"
                    value={cartTotal}
                    onChange={(e) => setCartTotal(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="simCategory">Product Category</Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger id="simCategory">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {rules.filter(r => r.active).map(rule => (
                        <SelectItem key={rule.category} value={rule.category}>
                          {rule.category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={runSimulation} className="w-full sm:w-auto">
                <PlayCircle className="h-4 w-4 mr-2" />
                Run Simulation
              </Button>
            </div>

            {/* Simulation Result */}
            {simulationResult && (
              <div className="mt-6 animate-fade-in">
                <div className={`p-4 rounded-lg border-2 ${
                  simulationResult.approved 
                    ? "bg-success-light border-success/30" 
                    : "bg-destructive-light border-destructive/30"
                }`}>
                  <div className="flex items-center gap-3 mb-4">
                    {simulationResult.approved ? (
                      <>
                        <CheckCircle className="h-6 w-6 text-success" />
                        <div>
                          <p className="font-semibold text-success">APPROVED</p>
                          <p className="text-sm text-success/80">Profit Protected</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-6 w-6 text-destructive" />
                        <div>
                          <p className="font-semibold text-destructive">REJECTED</p>
                          <p className="text-sm text-destructive/80">Low Margin</p>
                        </div>
                      </>
                    )}
                  </div>
                  
                  {/* Math Breakdown */}
                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border/50">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Revenue</p>
                      <p className="text-lg font-semibold text-foreground">${simulationResult.revenue.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Est. Profit</p>
                      <p className="text-lg font-semibold text-foreground">${simulationResult.profit.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Shipping Cost</p>
                      <p className="text-lg font-semibold text-foreground">${simulationResult.shippingCost.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">Net Upside</p>
                      <p className={`text-lg font-semibold ${
                        simulationResult.netUpside >= 0 ? "text-success" : "text-destructive"
                      }`}>
                        ${simulationResult.netUpside.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
