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
      title="Live Preview" 
      subtitle="See exactly what your customers experience when ShipConvert activates"
    >
      {/* Preview Controls */}
      <div className="flex items-center gap-4 mb-6">
        <Button 
          onClick={() => setShowModal(true)}
          disabled={showModal}
        >
          <Sparkles className="h-4 w-4 mr-2" />
          Trigger ShipConvert
        </Button>
        <Badge variant="secondary" className="text-xs">
          Demo Mode - No real checkout
        </Badge>
      </div>

      {/* Preview Container */}
      <div className="relative rounded-xl overflow-hidden border border-border shadow-elevated" style={{ height: "700px" }}>
        
        {/* Fake E-commerce Checkout Background */}
        <div className={`absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100 transition-all duration-500 ${showModal ? "blur-sm scale-[1.02]" : ""}`}>
          {/* Fake Header */}
          <div className="bg-slate-900 text-slate-50 px-6 py-4">
            <div className="flex items-center justify-between max-w-5xl mx-auto">
              <span className="text-xl font-semibold tracking-tight">LUXE FASHION</span>
              <div className="flex items-center gap-6 text-sm text-slate-300">
                <span>Shop</span>
                <span>Collections</span>
                <span>About</span>
              </div>
            </div>
          </div>

          {/* Checkout Content */}
          <div className="max-w-5xl mx-auto p-8">
            <div className="grid lg:grid-cols-5 gap-8">
              {/* Left - Form */}
              <div className="lg:col-span-3 space-y-6">
                <h1 className="text-2xl font-semibold text-slate-900">Checkout</h1>
                
                {/* Contact Section */}
                <div className="bg-card rounded-lg border border-slate-200 p-5 space-y-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                    <CreditCard className="h-4 w-4" />
                    Contact Information
                  </div>
                  <div className="h-10 bg-slate-100 rounded-md" />
                </div>

                {/* Shipping Section */}
                <div className="bg-card rounded-lg border border-slate-200 p-5 space-y-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                    <MapPin className="h-4 w-4" />
                    Shipping Address
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="h-10 bg-slate-100 rounded-md" />
                    <div className="h-10 bg-slate-100 rounded-md" />
                    <div className="h-10 bg-slate-100 rounded-md col-span-2" />
                    <div className="h-10 bg-slate-100 rounded-md" />
                    <div className="h-10 bg-slate-100 rounded-md" />
                  </div>
                </div>

                {/* Shipping Method */}
                <div className="bg-card rounded-lg border border-slate-200 p-5 space-y-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                    <Truck className="h-4 w-4" />
                    Shipping Method
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 rounded-md border border-slate-200 bg-slate-50">
                      <span className="text-sm text-slate-600">Express Shipping (2-3 days)</span>
                      <span className="text-sm font-medium text-slate-900">$49.00</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-md border border-slate-200">
                      <span className="text-sm text-slate-600">Standard Shipping (5-7 days)</span>
                      <span className="text-sm font-medium text-slate-900">$12.00</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right - Order Summary */}
              <div className="lg:col-span-2">
                <div className="bg-card rounded-lg border border-slate-200 p-5 sticky top-8">
                  <h2 className="font-medium text-slate-900 mb-4">Order Summary</h2>
                  
                  {/* Product */}
                  <div className="flex gap-4 pb-4 border-b border-slate-200">
                    <div className="w-16 h-20 bg-gradient-to-br from-slate-200 to-slate-300 rounded-md flex items-center justify-center">
                      <Package className="h-6 w-6 text-slate-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">Premium Wool Coat</p>
                      <p className="text-xs text-slate-500">Size: M | Color: Charcoal</p>
                      <p className="text-sm font-medium text-slate-900 mt-1">$300.00</p>
                    </div>
                  </div>

                  {/* Totals */}
                  <div className="py-4 space-y-2 text-sm">
                    <div className="flex justify-between text-slate-600">
                      <span>Subtotal</span>
                      <span>$300.00</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Express Shipping</span>
                      <span>$49.00</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Tax</span>
                      <span>$27.93</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200">
                    <div className="flex justify-between font-semibold text-slate-900">
                      <span>Total</span>
                      <span>$376.93</span>
                    </div>
                  </div>

                  <Button className="w-full mt-6 bg-slate-900 hover:bg-slate-800">
                    Pay Now
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
                className="relative rounded-2xl overflow-hidden"
                style={{
                  background: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(20px)",
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)"
                }}
              >
                {/* Close Button */}
                <button 
                  onClick={() => setShowModal(false)}
                  className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors z-10"
                >
                  <X className="h-4 w-4 text-slate-500" />
                </button>

                {/* Accent Top Bar */}
                <div className="h-1 bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500" />

                <div className="p-8">
                  {/* Badge */}
                  <div className="flex justify-center mb-4">
                    <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 gap-1.5 px-3 py-1">
                      <Sparkles className="h-3.5 w-3.5" />
                      Special Offer Unlocked
                    </Badge>
                  </div>

                  {/* Headline */}
                  <h2 className="text-2xl font-bold text-slate-900 text-center mb-2">
                    Wait! Don't pay for shipping.
                  </h2>
                  
                  {/* Subtext */}
                  <p className="text-slate-600 text-center text-sm leading-relaxed mb-6">
                    We noticed you're purchasing from our <span className="font-medium text-slate-800">Premium Collection</span>. 
                    We've unlocked <span className="font-semibold text-emerald-600">Free Express Shipping</span> for this order if you complete it now.
                  </p>

                  {/* The Math */}
                  <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-5 mb-6 border border-slate-200">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">Express Shipping</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-slate-400 line-through">$49.00</span>
                          <span className="text-lg font-bold text-emerald-600">FREE</span>
                        </div>
                      </div>
                      <div className="h-px bg-slate-200" />
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-700">Your New Total</span>
                        <span className="text-2xl font-bold text-slate-900">$327.93</span>
                      </div>
                      <div className="flex items-center justify-center gap-1.5 text-emerald-600 text-sm font-medium">
                        <ShieldCheck className="h-4 w-4" />
                        You save $49.00
                      </div>
                    </div>
                  </div>

                  {/* Timer */}
                  <div className="flex items-center justify-center gap-2 mb-6">
                    <Clock className="h-4 w-4 text-amber-500" />
                    <span className="text-sm text-slate-600">
                      Offer reserved for{" "}
                      <span className="font-mono font-semibold text-slate-900">{formatTime(timeLeft)}</span>
                    </span>
                  </div>

                  {/* CTA Button */}
                  <Button 
                    className="w-full h-14 text-base font-semibold bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-500/25 relative overflow-hidden group"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <Truck className="h-5 w-5" />
                      Claim Free Shipping & Checkout
                    </span>
                    {/* Pulse Effect */}
                    <span className="absolute inset-0 bg-emerald-400 opacity-0 group-hover:opacity-20 transition-opacity" />
                    <span className="absolute -inset-1 bg-emerald-400/20 rounded-lg animate-pulse" style={{ animationDuration: "2s" }} />
                  </Button>

                  {/* Secondary Action */}
                  <button 
                    className="w-full mt-4 text-sm text-slate-400 hover:text-slate-600 transition-colors"
                    onClick={() => setShowModal(false)}
                  >
                    No thanks, I'll pay full price
                  </button>

                  {/* Trust Badge */}
                  <div className="flex items-center justify-center gap-4 mt-6 pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      Secure Checkout
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <Truck className="h-3.5 w-3.5" />
                      2-3 Day Delivery
                    </div>
                  </div>
                </div>
              </div>

              {/* Powered By Badge */}
              <div className="flex justify-center mt-4">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/80 backdrop-blur text-slate-200 text-xs">
                  <Sparkles className="h-3 w-3 text-emerald-400" />
                  Powered by ShipConvert
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Preview Info */}
      <div className="mt-6 p-4 rounded-lg bg-surface border border-border">
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">How it works:</strong> When a customer shows exit intent or hesitation at checkout, 
          ShipConvert checks your margin rules. If the cart qualifies, this modal appears offering free shipping — 
          only when it's profitable for you.
        </p>
      </div>
    </DashboardLayout>
  );
}
