import { cn } from "@/lib/utils";

type BadgeVariant = "success" | "error" | "warning" | "info" | "default";

interface StatusBadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variants: Record<BadgeVariant, string> = {
  success: "bg-success-light text-success border-success/20",
  error: "bg-destructive-light text-destructive border-destructive/20",
  warning: "bg-warning-light text-warning border-warning/20",
  info: "bg-primary/10 text-primary border-primary/20",
  default: "bg-muted text-muted-foreground border-border",
};

export function StatusBadge({ variant = "default", children, className }: StatusBadgeProps) {
  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium",
      variants[variant],
      className
    )}>
      <span className={cn(
        "h-1.5 w-1.5 rounded-full",
        variant === "success" && "bg-success",
        variant === "error" && "bg-destructive",
        variant === "warning" && "bg-warning",
        variant === "info" && "bg-primary",
        variant === "default" && "bg-muted-foreground"
      )} />
      {children}
    </span>
  );
}
