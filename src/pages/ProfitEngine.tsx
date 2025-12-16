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
  ruleType: string;
  ruleValue: string;
  margin: number;
  action: string;
  active: boolean;
}

const initialRules: Rule[] = [
  { id: 1, priority: 1, ruleType: "collection", ruleValue: "Footwear", margin: 55, action: "free_shipping", active: true },
  { id: 2, priority: 2, ruleType: "brand", ruleValue: "Nike", margin: 60, action: "free_shipping", active: true },
  { id: 3, priority: 3, ruleType: "tag", ruleValue: "outlet", margin: 70, action: "discounted_shipping", active: true },
  { id: 4, priority: 4, ruleType: "collection", ruleValue: "Sale Items", margin: 25, action: "discounted_shipping", active: false },
];

const ruleTypes = [
  { value: "collection", label: "Collection" },
  { value: "brand", label: "Brand / Vendor" },
  { value: "tag", label: "Product Tag" },
  { value: "global", label: "Storewide (Global)" },
];

const ruleValueOptions: Record<string, string[]> = {
  collection: ["Summer Sale", "Footwear", "Premium Apparel", "Accessories", "Sale Items", "New Arrivals"],
  brand: ["Nike", "Adidas", "Lego", "Apple", "Sony", "Patagonia"],
  tag: ["new-arrival", "outlet", "fragile", "best-seller", "limited-edition", "clearance"],
  global: ["All Products"],
};

const actions = [
  { value: "free_shipping", label: "Offer Free Shipping" },
  { value: "discounted_shipping", label: "Offer Discounted Shipping" },
  { value: "expedited_free", label: "Offer Free Expedited" },
];

export default function ProfitEngine() {
  const [rules, setRules] = useState<Rule[]>(initialRules);
  const [selectedRuleType, setSelectedRuleType] = useState("collection");
  const [selectedRuleValue, setSelectedRuleValue] = useState("");
  const [marginValue, setMarginValue] = useState("");
  const [selectedAction, setSelectedAction] = useState("");
  
  // Safety guardrails
  const [minProfitEnabled, setMinProfitEnabled] = useState(true);
  const [minProfitAmount, setMinProfitAmount] = useState("10");

  const handleCreateRule = () => {
    if (selectedRuleType !== "global" && !selectedRuleValue) {
      toast({
        title: "Missing fields",
        description: "Please select a value for your rule.",
        variant: "destructive",
      });
      return;
    }

    if (!marginValue || !selectedAction) {
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
      ruleType: selectedRuleType,
      ruleValue: selectedRuleType === "global" ? "All Products" : selectedRuleValue,
      margin,
      action: selectedAction,
      active: true,
    };

    setRules([...rules, newRule]);
    setSelectedRuleType("collection");
    setSelectedRuleValue("");
    setMarginValue("");
    setSelectedAction("");
    
    const typeLabel = ruleTypes.find(t => t.value === selectedRuleType)?.label || selectedRuleType;
    toast({
      title: "Rule created",
      description: `New ${typeLabel} rule saved successfully.`,
    });
  };

  const handleRuleTypeChange = (value: string) => {
    setSelectedRuleType(value);
    setSelectedRuleValue("");
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

  const getRuleTypeLabel = (value: string) => {
    return ruleTypes.find(t => t.value === value)?.label || value;
  };

  return (
    <DashboardLayout 
      title="Profit Rules & Logic" 
      subtitle="Define when ShipConvert should step in to rescue a cart."
    >
      {/* Header Action */}
      <div className="flex justify-end mb-4">
        <Button variant="outline" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Sync Categories from Store
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Rule Builder - Takes 2 columns */}
        <div className="lg:col-span-2">
          <div className="bg-card rounded-lg border border-border shadow-card">
            <div className="p-5 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                  <Sparkles className="h-4 w-4 text-foreground" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-foreground">Add New Margin Rule</h2>
                  <p className="text-sm text-muted-foreground">Build smart shipping logic without needing perfect COGS data</p>
                </div>
              </div>
            </div>
            
            <div className="p-5">
              {/* Rule Builder Form */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Smart Selector - Rule Type */}
                <div className="min-w-[150px]">
                  <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">Rule Based On</Label>
                  <Select value={selectedRuleType} onValueChange={handleRuleTypeChange}>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      {ruleTypes.map(type => (
                        <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Smart Selector - Rule Value */}
                {selectedRuleType !== "global" && (
                  <div className="min-w-[160px]">
                    <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">Select Item</Label>
                    <Select value={selectedRuleValue} onValueChange={setSelectedRuleValue}>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Select value" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        {ruleValueOptions[selectedRuleType]?.map(value => (
                          <SelectItem key={value} value={value}>{value}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <ArrowRight className="h-4 w-4 text-muted-foreground mt-6 hidden sm:block flex-shrink-0" />

                {/* AND Margin */}
                <div className="flex-1 min-w-[120px]">
                  <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">AND Margin ≥</Label>
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="50"
                      value={marginValue}
                      onChange={(e) => setMarginValue(e.target.value)}
                      className="h-10 pr-10 text-base font-medium"
                      min="0"
                      max="100"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <Percent className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </div>

                <ArrowRight className="h-4 w-4 text-muted-foreground mt-6 hidden sm:block flex-shrink-0" />

                {/* THEN Action */}
                <div className="flex-1 min-w-[180px]">
                  <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">THEN</Label>
                  <Select value={selectedAction} onValueChange={setSelectedAction}>
                    <SelectTrigger className="h-10">
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
              
              <p className="text-xs text-muted-foreground mt-3 italic">Matches are pulled dynamically from your Shopify store data.</p>

              {/* Preview */}
              {(selectedRuleType === "global" || selectedRuleValue) && marginValue && selectedAction && (
                <div className="mt-4 p-3 rounded-lg bg-muted border border-border animate-fade-in">
                  <p className="text-xs text-muted-foreground mb-1">Rule Preview:</p>
                  <p className="text-sm text-foreground">
                    When a cart contains{" "}
                    <Badge variant="secondary" className="mx-1 text-xs">
                      {selectedRuleType === "global" ? "any product" : `${getRuleTypeLabel(selectedRuleType)}: ${selectedRuleValue}`}
                    </Badge> 
                    with margin ≥ <span className="font-semibold text-success">{marginValue}%</span>, 
                    then <span className="font-medium">{getActionLabel(selectedAction).toLowerCase()}</span>.
                  </p>
                </div>
              )}
            </div>

            <div className="px-5 py-4 bg-muted/30 border-t border-border rounded-b-lg">
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
            <div className="p-5 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-warning/10">
                  <Shield className="h-4 w-4 text-warning" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-foreground">Safety Guardrails</h2>
                  <p className="text-sm text-muted-foreground">Absolute limits to protect profits</p>
                </div>
              </div>
            </div>
            
            <div className="p-5 space-y-5">
              {/* Minimum Profit Protection */}
              <div className="space-y-3">
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
                  <div className="animate-fade-in">
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
              <div className="p-3 rounded-lg bg-success-light border border-success/20">
                <p className="text-xs text-success font-medium mb-1">Profit Protection Active</p>
                <p className="text-xs text-muted-foreground">
                  ShipConvert will never recommend free shipping if it would result in a net loss.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Rules Table - Polaris Inventory List style */}
      <div className="mt-6">
        <div className="bg-card rounded-lg border border-border shadow-card">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div>
              <h2 className="text-base font-semibold text-foreground">Active Rules</h2>
              <p className="text-sm text-muted-foreground">Rules are evaluated in priority order</p>
            </div>
            <Badge variant="secondary" className="text-xs">
              {rules.filter(r => r.active).length} of {rules.length} active
            </Badge>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-16">Priority</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Rule Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Condition</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Est. Margin</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Action</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider w-24">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {rules.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center">
                      <p className="text-muted-foreground">No rules configured yet.</p>
                      <p className="text-sm text-muted-foreground mt-1">Create your first margin rule above.</p>
                    </td>
                  </tr>
                ) : (
                  rules.map((rule) => (
                    <tr key={rule.id} className={`hover:bg-muted/30 transition-colors ${!rule.active ? 'opacity-50' : ''}`}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <GripVertical className="h-4 w-4 text-muted-foreground/50 cursor-grab" />
                          <span className="text-sm font-medium text-foreground">{rule.priority}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs text-muted-foreground">{getRuleTypeLabel(rule.ruleType)}</span>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="secondary" className="font-normal text-xs">
                          {rule.ruleValue}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm font-semibold text-success">{rule.margin}%</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-foreground">{getActionLabel(rule.action)}</span>
                      </td>
                      <td className="px-4 py-3">
                        <Switch
                          checked={rule.active}
                          onCheckedChange={() => handleToggleRule(rule.id)}
                        />
                      </td>
                      <td className="px-4 py-3">
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
      </div>
    </DashboardLayout>
  );
}
