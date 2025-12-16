import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { IPhoneMockup } from "@/components/IPhoneMockup";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Package, 
  Clock, 
  Truck, 
  ShieldCheck, 
  X,
  Sparkles,
  RotateCcw
} from "lucide-react";

export default function LivePreview() {
  const [timeLeft, setTimeLeft] = useState(299);
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

  const resetDemo = () => {
    setTimeLeft(299);
    setShowModal(true);
  };

  return (
    <DashboardLayout 
      title="Live Test" 
      subtitle="Se præcis hvad dine kunder oplever på mobil"
    >
      {/* Preview Controls */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <Button 
          onClick={resetDemo}
          variant="outline"
          className="gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Genstart Demo
        </Button>
        <Badge variant="secondary" className="text-xs">
          80% af din trafik ser dette på mobil
        </Badge>
      </div>

      {/* iPhone Mockup Container */}
      <div className="flex justify-center py-8">
        <IPhoneMockup>
          {/* Mobile Checkout Background */}
          <div className={`h-full bg-slate-50 transition-all duration-300 ${showModal ? "blur-sm scale-[1.01]" : ""}`}>
            {/* Mobile Header */}
            <div className="bg-slate-900 text-white px-4 py-3">
              <span className="text-sm font-semibold tracking-tight">LUXE FASHION</span>
            </div>

            {/* Mobile Checkout */}
            <div className="p-4 space-y-4">
              <h1 className="text-lg font-semibold text-slate-900">Kassen</h1>
              
              {/* Product Card */}
              <div className="bg-white rounded-lg border border-slate-200 p-3">
                <div className="flex gap-3">
                  <div className="w-16 h-20 bg-gradient-to-br from-slate-200 to-slate-300 rounded flex items-center justify-center">
                    <Package className="h-5 w-5 text-slate-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">Premium Uldfrakke</p>
                    <p className="text-xs text-slate-500">Str.: M • Kul</p>
                    <p className="text-sm font-semibold text-slate-900 mt-1">2.250 kr.</p>
                  </div>
                </div>
              </div>

              {/* Shipping Options */}
              <div className="bg-white rounded-lg border border-slate-200 p-3 space-y-2">
                <p className="text-xs font-medium text-slate-700 flex items-center gap-1.5">
                  <Truck className="h-3.5 w-3.5" />
                  Levering
                </p>
                <div className="p-2.5 rounded border border-slate-200 bg-slate-50">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Express (2-3 dage)</span>
                    <span className="font-medium text-slate-900">369 kr.</span>
                  </div>
                </div>
              </div>

              {/* Totals */}
              <div className="bg-white rounded-lg border border-slate-200 p-3 space-y-2">
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Subtotal</span>
                  <span>2.250 kr.</span>
                </div>
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Fragt</span>
                  <span>369 kr.</span>
                </div>
                <div className="h-px bg-slate-200" />
                <div className="flex justify-between text-sm font-semibold text-slate-900">
                  <span>Total</span>
                  <span>2.619 kr.</span>
                </div>
              </div>

              <button className="w-full bg-slate-900 text-white py-3 rounded-lg text-sm font-medium">
                Betal Nu
              </button>
            </div>
          </div>

          {/* ShipConvert Modal Overlay */}
          {showModal && (
            <div className="absolute inset-0 flex items-end justify-center animate-fade-in z-50">
              {/* Backdrop */}
              <div 
                className="absolute inset-0 bg-black/50"
                onClick={() => setShowModal(false)}
              />
              
              {/* Bottom Sheet Modal */}
              <div className="relative w-full animate-slide-up">
                <div className="bg-white rounded-t-2xl overflow-hidden">
                  {/* Accent Bar */}
                  <div className="h-1 bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500" />
                  
                  {/* Handle */}
                  <div className="flex justify-center py-2">
                    <div className="w-10 h-1 bg-slate-300 rounded-full" />
                  </div>
                  
                  {/* Close */}
                  <button 
                    onClick={() => setShowModal(false)}
                    className="absolute top-3 right-3 p-1 rounded-full bg-slate-100"
                  >
                    <X className="h-4 w-4 text-slate-500" />
                  </button>

                  <div className="px-5 pb-6">
                    {/* Badge */}
                    <div className="flex justify-center mb-2">
                      <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 gap-1 px-2 py-0.5 text-xs">
                        <Sparkles className="h-3 w-3" />
                        Særligt tilbud
                      </Badge>
                    </div>

                    {/* Headline */}
                    <h2 className="text-lg font-bold text-slate-900 text-center mb-1">
                      Vent! Betal ikke for fragt.
                    </h2>
                    <p className="text-slate-600 text-center text-xs mb-4">
                      Vi har låst op for <span className="font-semibold text-emerald-600">Fri Fragt</span> til dig.
                    </p>

                    {/* Savings */}
                    <div className="bg-slate-50 rounded-lg p-3 mb-4 border border-slate-200">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-slate-600">Express Levering</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-400 line-through">369 kr.</span>
                          <span className="text-sm font-bold text-emerald-600">GRATIS</span>
                        </div>
                      </div>
                      <div className="h-px bg-slate-200 mb-2" />
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-medium text-slate-700">Din nye total</span>
                        <span className="text-lg font-bold text-slate-900">2.250 kr.</span>
                      </div>
                      <div className="flex items-center justify-center gap-1 text-emerald-600 text-xs font-medium mt-1">
                        <ShieldCheck className="h-3 w-3" />
                        Du sparer 369 kr.
                      </div>
                    </div>

                    {/* Timer */}
                    <div className="flex items-center justify-center gap-1.5 mb-4">
                      <Clock className="h-3 w-3 text-amber-500" />
                      <span className="text-xs text-slate-600">
                        Reserveret i <span className="font-mono font-semibold">{formatTime(timeLeft)}</span>
                      </span>
                    </div>

                    {/* CTA */}
                    <button 
                      className="w-full py-3 rounded-lg text-sm font-semibold bg-emerald-600 text-white flex items-center justify-center gap-2"
                      onClick={() => setShowModal(false)}
                    >
                      <Truck className="h-4 w-4" />
                      Få Fri Fragt Nu
                    </button>

                    <button 
                      className="w-full mt-2 text-xs text-slate-400"
                      onClick={() => setShowModal(false)}
                    >
                      Nej tak
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </IPhoneMockup>
      </div>

      {/* Info */}
      <div className="mt-6 p-4 rounded-lg bg-card border border-border text-center max-w-xl mx-auto">
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">Mobil-optimeret:</strong> ShipConvert viser automatisk dette slide-up modal på mobil, 
          hvor 80% af din trafik handler.
        </p>
      </div>
    </DashboardLayout>
  );
}
