import { useState } from "react";
import { Shield, Rocket, Percent, Check } from "lucide-react";

interface Strategy {
  id: string;
  name: string;
  icon: typeof Shield;
  description: string;
  threshold: string;
}

const strategies: Strategy[] = [
  {
    id: "safe",
    name: "Sikker Profit",
    icon: Shield,
    description: "Tilbyder kun fri fragt, når dækningsgraden er over 60%.",
    threshold: "60%",
  },
  {
    id: "growth",
    name: "Vækst-Motor",
    icon: Rocket,
    description: "Den anbefalede balance. Redder kunder med dækningsgrad over 40%.",
    threshold: "40%",
  },
  {
    id: "clearance",
    name: "Lagerrydning",
    icon: Percent,
    description: "Aggressiv strategi for at få varer ud. Bruges til udsalg.",
    threshold: "20%",
  },
];

export function StrategySelector() {
  const [selected, setSelected] = useState("growth");

  return (
    <div className="bg-card rounded-lg border border-border shadow-card p-5 mb-6">
      <h2 className="text-base font-semibold text-foreground mb-1">Vælg din Strategi</h2>
      <p className="text-sm text-muted-foreground mb-4">Vælg den tilgang, der passer til din forretning.</p>
      
      <div className="grid gap-4 md:grid-cols-3">
        {strategies.map((strategy) => {
          const Icon = strategy.icon;
          const isSelected = selected === strategy.id;
          
          return (
            <button
              key={strategy.id}
              onClick={() => setSelected(strategy.id)}
              className={`relative text-left p-5 rounded-lg border-2 transition-all duration-200 ${
                isSelected
                  ? "border-success bg-success/5 shadow-md"
                  : "border-border bg-card hover:border-muted-foreground/30 hover:shadow-sm"
              }`}
            >
              {/* Selected Checkmark */}
              {isSelected && (
                <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-success flex items-center justify-center">
                  <Check className="h-3 w-3 text-white" />
                </div>
              )}
              
              {/* Icon */}
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${
                isSelected ? "bg-success/10" : "bg-muted"
              }`}>
                <Icon className={`h-5 w-5 ${isSelected ? "text-success" : "text-muted-foreground"}`} />
              </div>
              
              {/* Content */}
              <h3 className={`font-semibold mb-1 ${isSelected ? "text-success" : "text-foreground"}`}>
                {strategy.name}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {strategy.description}
              </p>
              
              {/* Threshold Badge */}
              <div className={`inline-flex items-center mt-3 px-2 py-1 rounded text-xs font-medium ${
                isSelected 
                  ? "bg-success/10 text-success" 
                  : "bg-muted text-muted-foreground"
              }`}>
                Min. {strategy.threshold} dækningsgrad
              </div>

              {/* Recommended Badge */}
              {strategy.id === "growth" && (
                <div className="absolute -top-2 left-4 px-2 py-0.5 bg-primary text-primary-foreground text-xs font-medium rounded">
                  Anbefalet
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
