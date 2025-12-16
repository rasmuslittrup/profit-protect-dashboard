import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  RefreshCw, 
  Plus, 
  Pencil, 
  Trash2, 
  GripVertical,
  Shield,
  ArrowRight,
  Percent,
  Sparkles
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Rule {
  id: number;
  priority: number;
  category: string;
  margin: number;
  action: string;
  active: boolean;
}

const initialRules: Rule[] = [
  { id: 1, priority: 1, category: "Sneakers", margin: 55, action: "free_shipping", active: true },
  { id: 2, priority: 2, category: "Premium Apparel", margin: 60, action: "free_shipping", active: true },
  { id: 3, priority: 3, category: "Accessories", margin: 70, action: "discounted_shipping", active: true },
  { id: 4, priority: 4, category: "Sale Items", margin: 25, action: "discounted_shipping", active: false },
];

const categories = [
  "Sneakers",
  "Premium Apparel", 
  "Accessories",
  "Sale Items",
  "Electronics",
  "Home Goods",
  "Beauty",
  "Sports Equipment"
];

const actions = [
  { value: "free_shipping", label: "Offer Free Shipping" },
  { value: "discounted_shipping", label: "Offer Discounted Shipping" },
  { value: "expedited_free", label: "Offer Free Expedited" },
];

export default function ProfitEngine() {
  const [rules, setRules] = useState<Rule[]>(initialRules);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [marginValue, setMarginValue] = useState("");
  const [selectedAction, setSelectedAction] = useState("");
  
  // Safety guardrails
  const [minProfitEnabled, setMinProfitEnabled] = useState(true);
  const [minProfitAmount, setMinProfitAmount] = useState("10");

  const handleCreateRule = () => {
    if (!selectedCategory || !marginValue || !selectedAction) {
      toast({
        title: "Missing fields",
        description: "Please complete all fields to create a rule.",
        variant: "destructive",
      });
      return;
    }

    const margin = parseFloat(marginValue);
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
      priority: rules.length + 1,
      category: selectedCategory,
      margin,
      action: selectedAction,
      active: true,
    };

    setRules([...rules, newRule]);
    setSelectedCategory("");
    setMarginValue("");
    setSelectedAction("");
    
    toast({
      title: "Rule created",
      description: `New margin rule for ${selectedCategory} saved successfully.`,
    });
  };

  const handleDeleteRule = (id: number) => {
    setRules(rules.filter(rule => rule.id !== id));
    toast({
      title: "Rule deleted",
      description: "The rule has been removed.",
    });
  };

  const handleToggleRule = (id: number) => {
    setRules(rules.map(rule => 
      rule.id === id ? { ...rule, active: !rule.active } : rule
    ));
  };

  const getActionLabel = (value: string) => {
    return actions.find(a => a.value === value)?.label || value;
  };

  return (
    <DashboardLayout 
      title="Profit Rules & Logic" 
      subtitle="Define when ShipConvert should step in to rescue a cart."
    >
      {/* Header Action */}
      <div className="flex justify-end mb-6">
        <Button variant="outline" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Sync Categories from Store
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Rule Builder - Takes 2 columns */}
        <div className="lg:col-span-2">
          <div className="bg-card rounded-lg border border-border shadow-card">
            <div className="p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Add New Margin Rule</h2>
                  <p className="text-sm text-muted-foreground">Build smart shipping logic without needing perfect COGS data</p>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              {/* Rule Builder Form */}
              <div className="flex flex-wrap items-end gap-4">
                {/* IF Category */}
                <div className="flex-1 min-w-[180px] space-y-2">
                  <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">IF Category</Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <ArrowRight className="h-5 w-5 text-muted-foreground mb-2 hidden sm:block" />

                {/* AND Margin */}
                <div className="flex-1 min-w-[160px] space-y-2">
                  <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">AND Margin ≥</Label>
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="50"
                      value={marginValue}
                      onChange={(e) => setMarginValue(e.target.value)}
                      className="h-11 pr-10 text-lg font-semibold"
                      min="0"
                      max="100"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <Percent className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">Your average profit margin for this category</p>
                </div>

                <ArrowRight className="h-5 w-5 text-muted-foreground mb-2 hidden sm:block" />

                {/* THEN Action */}
                <div className="flex-1 min-w-[200px] space-y-2">
                  <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">THEN</Label>
                  <Select value={selectedAction} onValueChange={setSelectedAction}>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select action" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      {actions.map(action => (
                        <SelectItem key={action.value} value={action.value}>{action.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Preview */}
              {selectedCategory && marginValue && selectedAction && (
                <div className="mt-6 p-4 rounded-lg bg-surface border border-border animate-fade-in">
                  <p className="text-sm text-muted-foreground mb-1">Rule Preview:</p>
                  <p className="text-foreground">
                    When a cart contains <Badge variant="secondary" className="mx-1">{selectedCategory}</Badge> 
                    with margin ≥ <span className="font-semibold text-success">{marginValue}%</span>, 
                    then <span className="font-medium">{getActionLabel(selectedAction).toLowerCase()}</span>.
                  </p>
                </div>
              )}
            </div>

            <div className="px-6 py-4 bg-surface/50 border-t border-border rounded-b-lg">
              <Button onClick={handleCreateRule} className="gap-2">
                <Plus className="h-4 w-4" />
                Create Rule
              </Button>
            </div>
          </div>
        </div>

        {/* Safety Guardrails - 1 column */}
        <div className="lg:col-span-1">
          <div className="bg-card rounded-lg border border-border shadow-card h-full">
            <div className="p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10">
                  <Shield className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Safety Guardrails</h2>
                  <p className="text-sm text-muted-foreground">Absolute limits to protect profits</p>
                </div>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Minimum Profit Protection */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-sm font-medium">Minimum Net Profit</Label>
                    <p className="text-xs text-muted-foreground">Never lose money on shipping</p>
                  </div>
                  <Switch 
                    checked={minProfitEnabled} 
                    onCheckedChange={setMinProfitEnabled}
                  />
                </div>
                
                {minProfitEnabled && (
                  <div className="pl-0 animate-fade-in">
                    <Label className="text-xs text-muted-foreground">
                      Never offer free shipping if profit drops below:
                    </Label>
                    <div className="relative mt-2">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                      <Input
                        type="number"
                        value={minProfitAmount}
                        onChange={(e) => setMinProfitAmount(e.target.value)}
                        className="pl-7"
                        placeholder="10"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Additional guardrails info */}
              <div className="p-3 rounded-lg bg-success-light/50 border border-success/20">
                <p className="text-xs text-success font-medium mb-1">Profit Protection Active</p>
                <p className="text-xs text-muted-foreground">
                  ShipConvert will never recommend free shipping if it would result in a net loss.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Rules Table */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Active Rules</h2>
            <p className="text-sm text-muted-foreground">Rules are evaluated in priority order</p>
          </div>
          <Badge variant="secondary" className="text-xs">
            {rules.filter(r => r.active).length} of {rules.length} active
          </Badge>
        </div>

        <div className="bg-card rounded-lg border border-border shadow-card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-surface">
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-16">Priority</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Category</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Est. Margin</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Action</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider w-24">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rules.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center">
                    <p className="text-muted-foreground">No rules configured yet.</p>
                    <p className="text-sm text-muted-foreground mt-1">Create your first margin rule above.</p>
                  </td>
                </tr>
              ) : (
                rules.map((rule) => (
                  <tr key={rule.id} className={`hover:bg-surface/50 transition-colors ${!rule.active ? 'opacity-50' : ''}`}>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <GripVertical className="h-4 w-4 text-muted-foreground/50 cursor-grab" />
                        <span className="text-sm font-medium text-foreground">{rule.priority}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <Badge variant="secondary" className="font-normal">
                        {rule.category}
                      </Badge>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm font-semibold text-success">{rule.margin}%</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm text-foreground">{getActionLabel(rule.action)}</span>
                    </td>
                    <td className="px-4 py-4">
                      <Switch
                        checked={rule.active}
                        onCheckedChange={() => handleToggleRule(rule.id)}
                      />
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeleteRule(rule.id)}
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
