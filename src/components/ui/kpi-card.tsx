import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon?: LucideIcon;
  className?: string;
}

export function KpiCard({ 
  title, 
  value, 
  change, 
  changeType = "neutral",
  icon: Icon,
  className 
}: KpiCardProps) {
  return (
    <div className={cn(
      "bg-card rounded-lg border border-border p-6 shadow-card transition-shadow hover:shadow-card-hover",
      className
    )}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-semibold tracking-tight text-foreground">{value}</p>
        </div>
        {Icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface">
            <Icon className="h-5 w-5 text-muted-foreground" />
          </div>
        )}
      </div>
      {change && (
        <div className="mt-4 flex items-center gap-1">
          <span className={cn(
            "text-sm font-medium",
            changeType === "positive" && "text-success",
            changeType === "negative" && "text-destructive",
            changeType === "neutral" && "text-muted-foreground"
          )}>
            {change}
          </span>
          <span className="text-sm text-muted-foreground">vs last period</span>
        </div>
      )}
    </div>
  );
}
