import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Package, 
  Clock, 
  Truck, 
  ShieldCheck, 
  X,
  Sparkles,
  CreditCard,
  MapPin
} from "lucide-react";

export default function LivePreview() {
  const [timeLeft, setTimeLeft] = useState(299); // 4:59
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    if (!showModal) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [showModal]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <DashboardLayout 
      title="Live Test" 
      subtitle="Se præcis hvad dine kunder oplever, når ShipConvert aktiveres"
    >
      {/* Preview Controls */}
      <div className="flex items-center gap-3 mb-4">
        <Button 
          onClick={() => setShowModal(true)}
          disabled={showModal}
        >
          <Sparkles className="h-4 w-4 mr-2" />
          Udløs ShipConvert
        </Button>
        <Badge variant="secondary" className="text-xs">
          Demo-tilstand - Ingen rigtig checkout
        </Badge>
      </div>

      {/* Preview Container */}
      <div className="relative rounded-lg overflow-hidden border border-border shadow-card" style={{ height: "650px" }}>
        
        {/* Fake E-commerce Checkout Background */}
        <div className={`absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100 transition-all duration-500 ${showModal ? "blur-sm scale-[1.02]" : ""}`}>
          {/* Fake Header */}
          <div className="bg-slate-900 text-slate-50 px-6 py-4">
            <div className="flex items-center justify-between max-w-5xl mx-auto">
              <span className="text-lg font-semibold tracking-tight">LUXE FASHION</span>
              <div className="flex items-center gap-6 text-sm text-slate-300">
                <span>Shop</span>
                <span>Kollektioner</span>
                <span>Om os</span>
              </div>
            </div>
          </div>

          {/* Checkout Content */}
          <div className="max-w-5xl mx-auto p-6">
            <div className="grid lg:grid-cols-5 gap-6">
              {/* Left - Form */}
              <div className="lg:col-span-3 space-y-5">
                <h1 className="text-xl font-semibold text-slate-900">Kassen</h1>
                
                {/* Contact Section */}
                <div className="bg-white rounded-lg border border-slate-200 p-4 space-y-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                    <CreditCard className="h-4 w-4" />
                    Kontaktoplysninger
                  </div>
                  <div className="h-9 bg-slate-100 rounded-md" />
                </div>

                {/* Shipping Section */}
                <div className="bg-white rounded-lg border border-slate-200 p-4 space-y-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                    <MapPin className="h-4 w-4" />
                    Leveringsadresse
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="h-9 bg-slate-100 rounded-md" />
                    <div className="h-9 bg-slate-100 rounded-md" />
                    <div className="h-9 bg-slate-100 rounded-md col-span-2" />
                    <div className="h-9 bg-slate-100 rounded-md" />
                    <div className="h-9 bg-slate-100 rounded-md" />
                  </div>
                </div>

                {/* Shipping Method */}
                <div className="bg-white rounded-lg border border-slate-200 p-4 space-y-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                    <Truck className="h-4 w-4" />
                    Leveringsmetode
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2.5 rounded-md border border-slate-200 bg-slate-50">
                      <span className="text-sm text-slate-600">Express Levering (2-3 dage)</span>
                      <span className="text-sm font-medium text-slate-900">369 kr.</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-md border border-slate-200">
                      <span className="text-sm text-slate-600">Standard Levering (5-7 dage)</span>
                      <span className="text-sm font-medium text-slate-900">89 kr.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right - Order Summary */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg border border-slate-200 p-4 sticky top-6">
                  <h2 className="font-medium text-slate-900 mb-3 text-sm">Ordreoversigt</h2>
                  
                  {/* Product */}
                  <div className="flex gap-3 pb-3 border-b border-slate-200">
                    <div className="w-14 h-18 bg-gradient-to-br from-slate-200 to-slate-300 rounded-md flex items-center justify-center">
                      <Package className="h-5 w-5 text-slate-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">Premium Uldfrakke</p>
                      <p className="text-xs text-slate-500">Str.: M | Farve: Kul</p>
                      <p className="text-sm font-medium text-slate-900 mt-1">2.250 kr.</p>
                    </div>
                  </div>

                  {/* Totals */}
                  <div className="py-3 space-y-1.5 text-sm">
                    <div className="flex justify-between text-slate-600">
                      <span>Subtotal</span>
                      <span>2.250 kr.</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Express Levering</span>
                      <span>369 kr.</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Moms</span>
                      <span>450 kr.</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200">
                    <div className="flex justify-between font-semibold text-slate-900 text-sm">
                      <span>Total</span>
                      <span>3.069 kr.</span>
                    </div>
                  </div>

                  <Button className="w-full mt-4 bg-slate-900 hover:bg-slate-800 text-sm">
                    Betal Nu
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ShipConvert Rescue Modal */}
        {showModal && (
          <div className="absolute inset-0 flex items-center justify-center animate-fade-in" style={{ zIndex: 50 }}>
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setShowModal(false)}
            />
            
            {/* Modal */}
            <div className="relative w-full max-w-md mx-4 animate-scale-in">
              {/* Glassmorphism Card */}
              <div 
                className="relative rounded-xl overflow-hidden"
                style={{
                  background: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(20px)",
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)"
                }}
              >
                {/* Close Button */}
                <button 
                  onClick={() => setShowModal(false)}
                  className="absolute top-3 right-3 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors z-10"
                >
                  <X className="h-4 w-4 text-slate-500" />
                </button>

                {/* Accent Top Bar */}
                <div className="h-1 bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500" />

                <div className="p-6">
                  {/* Badge */}
                  <div className="flex justify-center mb-3">
                    <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 gap-1.5 px-3 py-1 text-xs">
                      <Sparkles className="h-3 w-3" />
                      Særligt tilbud låst op
                    </Badge>
                  </div>

                  {/* Headline */}
                  <h2 className="text-xl font-bold text-slate-900 text-center mb-2">
                    Vent! Betal ikke for fragt.
                  </h2>
                  
                  {/* Subtext */}
                  <p className="text-slate-600 text-center text-sm leading-relaxed mb-5">
                    Vi kan se, du handler varer med høj kvalitet. Vi har låst op for{" "}
                    <span className="font-semibold text-emerald-600">Fri Fragt</span>, hvis du gennemfører nu.
                  </p>

                  {/* The Math */}
                  <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-4 mb-5 border border-slate-200">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">Express Levering</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-slate-400 line-through">369 kr.</span>
                          <span className="text-base font-bold text-emerald-600">GRATIS</span>
                        </div>
                      </div>
                      <div className="h-px bg-slate-200" />
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-700">Din nye total</span>
                        <span className="text-xl font-bold text-slate-900">2.700 kr.</span>
                      </div>
                      <div className="flex items-center justify-center gap-1.5 text-emerald-600 text-sm font-medium">
                        <ShieldCheck className="h-4 w-4" />
                        Du sparer 369 kr.
                      </div>
                    </div>
                  </div>

                  {/* Timer */}
                  <div className="flex items-center justify-center gap-2 mb-5">
                    <Clock className="h-4 w-4 text-amber-500" />
                    <span className="text-sm text-slate-600">
                      Tilbud reserveret i{" "}
                      <span className="font-mono font-semibold text-slate-900">{formatTime(timeLeft)}</span>
                    </span>
                  </div>

                  {/* CTA Button */}
                  <Button 
                    className="w-full h-12 text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-500/25 relative overflow-hidden group rounded-lg"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <Truck className="h-4 w-4" />
                      Få Fri Fragt Nu
                    </span>
                    <span className="absolute inset-0 bg-emerald-400 opacity-0 group-hover:opacity-20 transition-opacity" />
                    <span className="absolute -inset-1 bg-emerald-400/20 rounded-lg animate-pulse" style={{ animationDuration: "2s" }} />
                  </Button>

                  {/* Secondary Action */}
                  <button 
                    className="w-full mt-3 text-sm text-slate-400 hover:text-slate-600 transition-colors"
                    onClick={() => setShowModal(false)}
                  >
                    Nej tak, jeg betaler fuld pris
                  </button>

                  {/* Trust Badge */}
                  <div className="flex items-center justify-center gap-4 mt-5 pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      Sikker Checkout
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <Truck className="h-3.5 w-3.5" />
                      2-3 Dages Levering
                    </div>
                  </div>
                </div>
              </div>

              {/* Powered By Badge */}
              <div className="flex justify-center mt-3">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/80 backdrop-blur text-slate-200 text-xs">
                  <Sparkles className="h-3 w-3 text-emerald-400" />
                  Drevet af ShipConvert
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Preview Info */}
      <div className="mt-4 p-4 rounded-lg bg-card border border-border">
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">Sådan virker det:</strong> Når en kunde viser tegn på at forlade checkout, 
          tjekker ShipConvert dine dækningsgrad-regler. Hvis kurven kvalificerer sig, vises denne modal med fri fragt — 
          kun når det er profitabelt for dig.
        </p>
      </div>
    </DashboardLayout>
  );
}
