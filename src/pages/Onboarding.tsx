import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Check, 
  CircleDot, 
  Circle,
  TrendingUp,
  ArrowRight,
  FileSpreadsheet,
  DollarSign,
  ShoppingCart,
  BarChart3,
  Sparkles
} from "lucide-react";

const steps = [
  { id: 1, name: "Connect Store", status: "complete" as const },
  { id: 2, name: "Define Margins", status: "current" as const },
  { id: 3, name: "Go Live", status: "pending" as const },
];

export default function Onboarding() {
  return (
    <DashboardLayout
      title="Welcome to ShipConvert!"
      subtitle="Let's stop your cart abandonment and protect your profits."
    >
      <div className="space-y-8">
        {/* Progress Stepper */}
        <div className="bg-card rounded-xl border border-border shadow-card p-6">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                    ${step.status === 'complete' 
                      ? 'bg-emerald text-white' 
                      : step.status === 'current'
                        ? 'bg-primary text-primary-foreground animate-pulse'
                        : 'bg-muted text-muted-foreground'
                    }
                  `}>
                    {step.status === 'complete' ? (
                      <Check className="w-5 h-5" />
                    ) : step.status === 'current' ? (
                      <CircleDot className="w-5 h-5" />
                    ) : (
                      <Circle className="w-5 h-5" />
                    )}
                  </div>
                  <span className={`
                    mt-2 text-sm font-medium
                    ${step.status === 'complete' 
                      ? 'text-emerald' 
                      : step.status === 'current'
                        ? 'text-foreground'
                        : 'text-muted-foreground'
                    }
                  `}>
                    {step.name}
                  </span>
                </div>
                
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className={`
                    w-24 md:w-32 h-0.5 mx-4
                    ${step.status === 'complete' ? 'bg-emerald' : 'bg-border'}
                  `} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Hero Action Card */}
        <div className="bg-gradient-to-br from-primary/5 via-card to-emerald/5 rounded-xl border border-border shadow-card p-8 md:p-12">
          <div className="max-w-xl mx-auto text-center">
            {/* Illustration */}
            <div className="relative mb-8">
              <div className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-primary/20 to-emerald/20 flex items-center justify-center">
                <DollarSign className="w-12 h-12 text-primary" />
              </div>
              <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-amber-500 animate-pulse" />
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              We don't know your margins yet
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              To start saving sales, tell us roughly how much you make on your main categories. 
              <span className="block mt-1 font-medium text-foreground">You don't need perfect data.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="gap-2 px-6">
                <Link to="/profit-engine">
                  <TrendingUp className="w-5 h-5" />
                  Set Category Estimates
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground">
                <FileSpreadsheet className="w-4 h-4" />
                I have a CSV with exact COGS
              </Button>
            </div>
          </div>
        </div>

        {/* Ghost Cards - Preview of what's coming */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="w-4 h-4" />
            <span>Complete setup to unlock your dashboard</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 opacity-50 pointer-events-none select-none">
            {/* Ghost KPI Cards */}
            {[
              { label: "Total Profit Saved", icon: DollarSign },
              { label: "Carts Rescued", icon: ShoppingCart },
              { label: "Conversion Uplift", icon: TrendingUp },
              { label: "ROI vs Control", icon: BarChart3 },
            ].map((card, index) => (
              <div 
                key={index}
                className="bg-card/50 backdrop-blur-sm rounded-xl border border-border p-6 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-muted/50 to-transparent" />
                <div className="relative">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center mb-4">
                    <card.icon className="w-5 h-5 text-muted-foreground/50" />
                  </div>
                  <div className="h-3 w-16 bg-muted rounded mb-2" />
                  <div className="h-8 w-24 bg-muted rounded" />
                </div>
              </div>
            ))}
          </div>

          {/* Ghost Chart */}
          <div className="bg-card/50 backdrop-blur-sm rounded-xl border border-border p-6 opacity-50 pointer-events-none select-none relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-muted/30 to-transparent" />
            <div className="relative">
              <div className="h-4 w-48 bg-muted rounded mb-6" />
              <div className="h-64 flex items-end justify-around gap-4 px-8">
                {[40, 65, 45, 80, 55, 70, 60, 75, 50, 85, 65, 90].map((height, i) => (
                  <div 
                    key={i}
                    className="flex-1 bg-muted rounded-t"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-4 px-4">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month) => (
                  <div key={month} className="h-3 w-6 bg-muted rounded" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
          <span>Need help getting started?</span>
          <Button variant="link" className="p-0 h-auto text-primary">
            Watch 2-min tutorial
          </Button>
          <span className="text-border">•</span>
          <Button variant="link" className="p-0 h-auto text-primary">
            Book a demo call
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
