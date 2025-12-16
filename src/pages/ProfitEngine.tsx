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
  { id: 1, priority: 1, ruleType: "collection", ruleValue: "Fodtøj", margin: 55, action: "free_shipping", active: true },
  { id: 2, priority: 2, ruleType: "brand", ruleValue: "Nike", margin: 60, action: "free_shipping", active: true },
  { id: 3, priority: 3, ruleType: "tag", ruleValue: "outlet", margin: 70, action: "discounted_shipping", active: true },
  { id: 4, priority: 4, ruleType: "collection", ruleValue: "Udsalgsvarer", margin: 25, action: "discounted_shipping", active: false },
];

const ruleTypes = [
  { value: "collection", label: "Kategori / Kollektion" },
  { value: "brand", label: "Brand / Leverandør" },
  { value: "tag", label: "Produkt-tag" },
  { value: "global", label: "Hele butikken (Global)" },
];

const ruleValueOptions: Record<string, string[]> = {
  collection: ["Sommersalg", "Fodtøj", "Premium Tøj", "Tilbehør", "Udsalgsvarer", "Nyheder"],
  brand: ["Nike", "Adidas", "Lego", "Apple", "Sony", "Patagonia"],
  tag: ["nyhed", "outlet", "skrøbelig", "bestseller", "limited-edition", "udsalg"],
  global: ["Alle Produkter"],
};

const actions = [
  { value: "free_shipping", label: "Tilbyd Fri Fragt" },
  { value: "discounted_shipping", label: "Tilbyd Nedsat Fragt" },
  { value: "expedited_free", label: "Tilbyd Gratis Express" },
];

export default function ProfitEngine() {
  const [rules, setRules] = useState<Rule[]>(initialRules);
  const [selectedRuleType, setSelectedRuleType] = useState("collection");
  const [selectedRuleValue, setSelectedRuleValue] = useState("");
  const [marginValue, setMarginValue] = useState("");
  const [selectedAction, setSelectedAction] = useState("");
  
  // Safety guardrails
  const [minProfitEnabled, setMinProfitEnabled] = useState(true);
  const [minProfitAmount, setMinProfitAmount] = useState("75");

  const handleCreateRule = () => {
    if (selectedRuleType !== "global" && !selectedRuleValue) {
      toast({
        title: "Manglende felter",
        description: "Vælg venligst en værdi til din regel.",
        variant: "destructive",
      });
      return;
    }

    if (!marginValue || !selectedAction) {
      toast({
        title: "Manglende felter",
        description: "Udfyld venligst alle felter for at oprette en regel.",
        variant: "destructive",
      });
      return;
    }

    const margin = parseFloat(marginValue);
    if (isNaN(margin) || margin < 0 || margin > 100) {
      toast({
        title: "Ugyldig dækningsgrad",
        description: "Dækningsgrad skal være mellem 0 og 100.",
        variant: "destructive",
      });
      return;
    }

    const newRule: Rule = {
      id: Date.now(),
      priority: rules.length + 1,
      ruleType: selectedRuleType,
      ruleValue: selectedRuleType === "global" ? "Alle Produkter" : selectedRuleValue,
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
      title: "Regel oprettet",
      description: `Ny ${typeLabel}-regel gemt succesfuldt.`,
    });
  };

  const handleRuleTypeChange = (value: string) => {
    setSelectedRuleType(value);
    setSelectedRuleValue("");
  };

  const handleDeleteRule = (id: number) => {
    setRules(rules.filter(rule => rule.id !== id));
    toast({
      title: "Regel slettet",
      description: "Reglen er blevet fjernet.",
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
      title="Profit-Regler & Logik" 
      subtitle="Definer hvornår ShipConvert skal træde til for at redde en kurv."
    >
      {/* Header Action */}
      <div className="flex justify-end mb-4">
        <Button variant="outline" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Synkroniser Kategorier fra Butik
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
                  <h2 className="text-base font-semibold text-foreground">Opret Ny Regel</h2>
                  <p className="text-sm text-muted-foreground">Byg smart fragtlogik uden behov for perfekte COGS-data</p>
                </div>
              </div>
            </div>
            
            <div className="p-5">
              {/* Rule Builder Form */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Smart Selector - Rule Type */}
                <div className="min-w-[150px]">
                  <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">Regel baseret på</Label>
                  <Select value={selectedRuleType} onValueChange={handleRuleTypeChange}>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Vælg type" />
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
                    <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">Vælg element</Label>
                    <Select value={selectedRuleValue} onValueChange={setSelectedRuleValue}>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Vælg værdi" />
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
                  <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">OG Dækningsgrad ≥</Label>
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
                  <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">SÅ</Label>
                  <Select value={selectedAction} onValueChange={setSelectedAction}>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Vælg handling" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      {actions.map(action => (
                        <SelectItem key={action.value} value={action.value}>{action.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <p className="text-xs text-muted-foreground mt-3 italic">Data hentes dynamisk fra din Shopify-butik.</p>

              {/* Preview */}
              {(selectedRuleType === "global" || selectedRuleValue) && marginValue && selectedAction && (
                <div className="mt-4 p-3 rounded-lg bg-muted border border-border animate-fade-in">
                  <p className="text-xs text-muted-foreground mb-1">Regel-forhåndsvisning:</p>
                  <p className="text-sm text-foreground">
                    Når en kurv indeholder{" "}
                    <Badge variant="secondary" className="mx-1 text-xs">
                      {selectedRuleType === "global" ? "ethvert produkt" : `${getRuleTypeLabel(selectedRuleType)}: ${selectedRuleValue}`}
                    </Badge> 
                    med dækningsgrad ≥ <span className="font-semibold text-success">{marginValue}%</span>, 
                    så <span className="font-medium">{getActionLabel(selectedAction).toLowerCase()}</span>.
                  </p>
                </div>
              )}
            </div>

            <div className="px-5 py-4 bg-muted/30 border-t border-border rounded-b-lg">
              <Button onClick={handleCreateRule} className="gap-2">
                <Plus className="h-4 w-4" />
                Opret Regel
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
                  <h2 className="text-base font-semibold text-foreground">Sikkerhedsnet</h2>
                  <p className="text-sm text-muted-foreground">Absolutte grænser for at beskytte profit</p>
                </div>
              </div>
            </div>
            
            <div className="p-5 space-y-5">
              {/* Minimum Profit Protection */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-sm font-medium">Min. Dækningsbidrag</Label>
                    <p className="text-xs text-muted-foreground">Tab aldrig penge på fragt</p>
                  </div>
                  <Switch 
                    checked={minProfitEnabled} 
                    onCheckedChange={setMinProfitEnabled}
                  />
                </div>
                
                {minProfitEnabled && (
                  <div className="animate-fade-in">
                    <Label className="text-xs text-muted-foreground">
                      Tilbyd aldrig fri fragt hvis profit falder under:
                    </Label>
                    <div className="relative mt-2">
                      <Input
                        type="number"
                        value={minProfitAmount}
                        onChange={(e) => setMinProfitAmount(e.target.value)}
                        className="pr-10"
                        placeholder="75"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">kr.</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Additional guardrails info */}
              <div className="p-3 rounded-lg bg-success-light border border-success/20">
                <p className="text-xs text-success font-medium mb-1">Profit-beskyttelse Aktiv</p>
                <p className="text-xs text-muted-foreground">
                  ShipConvert vil aldrig anbefale fri fragt, hvis det resulterer i et nettotab.
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
              <h2 className="text-base font-semibold text-foreground">Aktive Regler</h2>
              <p className="text-sm text-muted-foreground">Regler evalueres i prioritetsrækkefølge</p>
            </div>
            <Badge variant="secondary" className="text-xs">
              {rules.filter(r => r.active).length} af {rules.length} aktive
            </Badge>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider w-16">Prioritet</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Regeltype</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Betingelse</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Est. Dækningsgrad</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Handling</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider w-24">Handlinger</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {rules.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center">
                      <p className="text-muted-foreground">Ingen regler konfigureret endnu.</p>
                      <p className="text-sm text-muted-foreground mt-1">Opret din første dækningsgrad-regel ovenfor.</p>
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
