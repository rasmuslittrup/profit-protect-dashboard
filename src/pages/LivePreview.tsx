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
  MapPin,
  Monitor,
  Smartphone,
  RotateCcw,
  Check
} from "lucide-react";

type DeviceMode = "desktop" | "mobile";

const INITIAL_SHIPPING = 369;
const INITIAL_TOTAL = 3069;
const SUBTOTAL = 2250;
const TAX = 450;

export default function LivePreview() {
  const [timeLeft, setTimeLeft] = useState(299);
  const [showModal, setShowModal] = useState(true);
  const [deviceMode, setDeviceMode] = useState<DeviceMode>("desktop");
  const [shippingCost, setShippingCost] = useState(INITIAL_SHIPPING);
  const [cartTotal, setCartTotal] = useState(INITIAL_TOTAL);
  const [discountApplied, setDiscountApplied] = useState(false);

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

  const formatPrice = (price: number) => {
    return price.toLocaleString('da-DK') + " kr.";
  };

  const handleApplyDiscount = () => {
    setShippingCost(0);
    setCartTotal(SUBTOTAL + TAX); // 2700
    setDiscountApplied(true);
    setShowModal(false);
  };

  const handleReset = () => {
    setShippingCost(INITIAL_SHIPPING);
    setCartTotal(INITIAL_TOTAL);
    setDiscountApplied(false);
    setTimeLeft(299);
    setShowModal(true);
  };

  const isMobile = deviceMode === "mobile";

  return (
    <DashboardLayout 
      title="Live Test" 
      subtitle="Se præcis hvad dine kunder oplever, når ShipConvert aktiveres"
    >
      {/* Preview Controls */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
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

        <div className="flex items-center gap-4">
          {/* Reset Link */}
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Nulstil Test
          </button>

          {/* Device Switcher */}
          <div className="flex items-center bg-muted rounded-lg p-1">
            <button
              onClick={() => setDeviceMode("desktop")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                deviceMode === "desktop"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Monitor className="h-4 w-4" />
              Desktop
            </button>
            <button
              onClick={() => setDeviceMode("mobile")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                deviceMode === "mobile"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Smartphone className="h-4 w-4" />
              Mobil
            </button>
          </div>
        </div>
      </div>

      {/* Preview Container */}
      <div 
        className={`relative rounded-lg overflow-hidden border border-border shadow-card flex items-center justify-center ${
          isMobile ? "bg-slate-200 py-8" : ""
        }`} 
        style={{ height: isMobile ? "auto" : "650px", minHeight: isMobile ? "750px" : undefined }}
      >
        {/* Mobile Phone Frame */}
        {isMobile ? (
          <div 
            className="relative bg-slate-900 rounded-[40px] p-3 shadow-2xl"
            style={{
              width: "375px",
              boxShadow: "0 50px 100px -20px rgba(0, 0, 0, 0.25), inset 0 0 0 2px rgba(255,255,255,0.1)"
            }}
          >
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-slate-900 rounded-b-2xl z-20" />
            
            {/* Dynamic Island */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-30" />
            
            {/* Screen */}
            <div 
              className="relative bg-white rounded-[32px] overflow-hidden"
              style={{ height: "680px" }}
            >
              {/* Status Bar */}
              <div className="absolute top-0 left-0 right-0 h-12 bg-white z-10 flex items-end justify-between px-8 pb-1">
                <span className="text-xs font-semibold text-slate-900">9:41</span>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-3 text-slate-900" viewBox="0 0 17 11">
                    <rect x="0" y="0" width="15" height="11" rx="2" fill="none" stroke="currentColor" strokeWidth="1"/>
                    <rect x="2" y="2" width="9" height="7" rx="1" fill="currentColor"/>
                    <rect x="16" y="3.5" width="1" height="4" rx="0.5" fill="currentColor"/>
                  </svg>
                </div>
              </div>

              {/* Mobile Checkout Content */}
              <div className={`h-full pt-12 overflow-hidden transition-all duration-300 ${showModal ? "blur-sm scale-[1.01]" : ""}`}>
                {/* Mobile Header */}
                <div className="bg-slate-900 text-white px-4 py-3">
                  <span className="text-sm font-semibold tracking-tight">LUXE FASHION</span>
                </div>

                {/* Mobile Checkout */}
                <div className="p-4 space-y-3 bg-slate-50 h-full">
                  <h1 className="text-base font-semibold text-slate-900">Kassen</h1>
                  
                  {/* Product Card */}
                  <div className="bg-white rounded-lg border border-slate-200 p-3">
                    <div className="flex gap-3">
                      <div className="w-14 h-16 bg-gradient-to-br from-slate-200 to-slate-300 rounded flex items-center justify-center flex-shrink-0">
                        <Package className="h-4 w-4 text-slate-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">Premium Uldfrakke</p>
                        <p className="text-xs text-slate-500">Str.: M • Kul</p>
                        <p className="text-sm font-semibold text-slate-900 mt-1">{formatPrice(SUBTOTAL)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Shipping */}
                  <div className="bg-white rounded-lg border border-slate-200 p-3 space-y-2">
                    <p className="text-xs font-medium text-slate-700 flex items-center gap-1.5">
                      <Truck className="h-3.5 w-3.5" />
                      Levering
                    </p>
                    <div className="p-2 rounded border border-slate-200 bg-slate-50">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-600">Express (2-3 dage)</span>
                        <span className={`font-medium ${shippingCost === 0 ? "text-emerald-600" : "text-slate-900"}`}>
                          {shippingCost === 0 ? "GRATIS" : formatPrice(shippingCost)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Totals */}
                  <div className="bg-white rounded-lg border border-slate-200 p-3 space-y-1.5">
                    <div className="flex justify-between text-xs text-slate-600">
                      <span>Subtotal</span>
                      <span>{formatPrice(SUBTOTAL)}</span>
                    </div>
                    <div className="flex justify-between text-xs text-slate-600">
                      <span>Fragt</span>
                      <span className={shippingCost === 0 ? "text-emerald-600 font-medium" : ""}>
                        {shippingCost === 0 ? "GRATIS" : formatPrice(shippingCost)}
                      </span>
                    </div>
                    <div className="h-px bg-slate-200 my-1" />
                    <div className="flex justify-between text-sm font-semibold text-slate-900">
                      <span>Total</span>
                      <span>{formatPrice(cartTotal)}</span>
                    </div>
                  </div>

                  <button className="w-full bg-slate-900 text-white py-2.5 rounded-lg text-sm font-medium">
                    Betal Nu
                  </button>
                </div>
              </div>

              {/* Mobile Modal */}
              {showModal && (
                <div className="absolute inset-0 flex items-end justify-center z-50">
                  <div 
                    className="absolute inset-0 bg-black/50"
                    onClick={() => setShowModal(false)}
                  />
                  
                  <div className="relative w-full animate-slide-up">
                    <div className="bg-white rounded-t-2xl overflow-hidden">
                      <div className="h-1 bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500" />
                      
                      <div className="flex justify-center py-2">
                        <div className="w-10 h-1 bg-slate-300 rounded-full" />
                      </div>
                      
                      <button 
                        onClick={() => setShowModal(false)}
                        className="absolute top-3 right-3 p-1 rounded-full bg-slate-100"
                      >
                        <X className="h-3.5 w-3.5 text-slate-500" />
                      </button>

                      <div className="px-4 pb-5">
                        <div className="flex justify-center mb-2">
                          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 gap-1 px-2 py-0.5 text-xs">
                            <Sparkles className="h-2.5 w-2.5" />
                            Særligt tilbud
                          </Badge>
                        </div>

                        <h2 className="text-base font-bold text-slate-900 text-center mb-1">
                          Vent! Betal ikke for fragt.
                        </h2>
                        <p className="text-slate-600 text-center text-xs mb-3">
                          Vi har låst op for <span className="font-semibold text-emerald-600">Fri Fragt</span> til dig.
                        </p>

                        <div className="bg-slate-50 rounded-lg p-3 mb-3 border border-slate-200">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xs text-slate-600">Express Levering</span>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-slate-400 line-through">{formatPrice(INITIAL_SHIPPING)}</span>
                              <span className="text-sm font-bold text-emerald-600">GRATIS</span>
                            </div>
                          </div>
                          <div className="h-px bg-slate-200 mb-2" />
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-medium text-slate-700">Din nye total</span>
                            <span className="text-lg font-bold text-slate-900">{formatPrice(SUBTOTAL + TAX)}</span>
                          </div>
                          <div className="flex items-center justify-center gap-1 text-emerald-600 text-xs font-medium mt-1">
                            <ShieldCheck className="h-3 w-3" />
                            Du sparer {formatPrice(INITIAL_SHIPPING)}
                          </div>
                        </div>

                        <div className="flex items-center justify-center gap-1.5 mb-3">
                          <Clock className="h-3 w-3 text-amber-500" />
                          <span className="text-xs text-slate-600">
                            Reserveret i <span className="font-mono font-semibold">{formatTime(timeLeft)}</span>
                          </span>
                        </div>

                        <button 
                          className={`w-full py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                            discountApplied
                              ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                              : "bg-emerald-600 text-white hover:bg-emerald-700"
                          }`}
                          onClick={handleApplyDiscount}
                          disabled={discountApplied}
                        >
                          {discountApplied ? (
                            <>
                              <Check className="h-4 w-4" />
                              Rabat Anvendt ✓
                            </>
                          ) : (
                            <>
                              <Truck className="h-4 w-4" />
                              Få Fri Fragt Nu
                            </>
                          )}
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

              {/* Home Indicator */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-slate-900 rounded-full z-40" />
            </div>

            {/* Side Buttons */}
            <div className="absolute -left-0.5 top-28 w-1 h-8 bg-slate-800 rounded-l" />
            <div className="absolute -left-0.5 top-40 w-1 h-12 bg-slate-800 rounded-l" />
            <div className="absolute -left-0.5 top-54 w-1 h-12 bg-slate-800 rounded-l" />
            <div className="absolute -right-0.5 top-36 w-1 h-14 bg-slate-800 rounded-r" />
          </div>
        ) : (
          /* Desktop View */
          <>
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
                          <span className={`text-sm font-medium ${shippingCost === 0 ? "text-emerald-600" : "text-slate-900"}`}>
                            {shippingCost === 0 ? "GRATIS" : formatPrice(shippingCost)}
                          </span>
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
                          <p className="text-sm font-medium text-slate-900 mt-1">{formatPrice(SUBTOTAL)}</p>
                        </div>
                      </div>

                      {/* Totals */}
                      <div className="py-3 space-y-1.5 text-sm">
                        <div className="flex justify-between text-slate-600">
                          <span>Subtotal</span>
                          <span>{formatPrice(SUBTOTAL)}</span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                          <span>Express Levering</span>
                          <span className={shippingCost === 0 ? "text-emerald-600 font-medium" : ""}>
                            {shippingCost === 0 ? "GRATIS" : formatPrice(shippingCost)}
                          </span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                          <span>Moms</span>
                          <span>{formatPrice(TAX)}</span>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-200">
                        <div className="flex justify-between font-semibold text-slate-900 text-sm">
                          <span>Total</span>
                          <span>{formatPrice(cartTotal)}</span>
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

            {/* Desktop ShipConvert Modal */}
            {showModal && (
              <div className="absolute inset-0 flex items-center justify-center animate-fade-in" style={{ zIndex: 50 }}>
                <div 
                  className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                  onClick={() => setShowModal(false)}
                />
                
                <div className="relative w-full max-w-md mx-4 animate-scale-in">
                  <div 
                    className="relative rounded-xl overflow-hidden"
                    style={{
                      background: "rgba(255, 255, 255, 0.95)",
                      backdropFilter: "blur(20px)",
                      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)"
                    }}
                  >
                    <button 
                      onClick={() => setShowModal(false)}
                      className="absolute top-3 right-3 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors z-10"
                    >
                      <X className="h-4 w-4 text-slate-500" />
                    </button>

                    <div className="h-1 bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500" />

                    <div className="p-6">
                      <div className="flex justify-center mb-3">
                        <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 gap-1.5 px-3 py-1 text-xs">
                          <Sparkles className="h-3 w-3" />
                          Særligt tilbud låst op
                        </Badge>
                      </div>

                      <h2 className="text-xl font-bold text-slate-900 text-center mb-2">
                        Vent! Betal ikke for fragt.
                      </h2>
                      
                      <p className="text-slate-600 text-center text-sm leading-relaxed mb-5">
                        Vi kan se, du handler varer med høj kvalitet. Vi har låst op for{" "}
                        <span className="font-semibold text-emerald-600">Fri Fragt</span>, hvis du gennemfører nu.
                      </p>

                      <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-4 mb-5 border border-slate-200">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-600">Express Levering</span>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-slate-400 line-through">{formatPrice(INITIAL_SHIPPING)}</span>
                              <span className="text-base font-bold text-emerald-600">GRATIS</span>
                            </div>
                          </div>
                          <div className="h-px bg-slate-200" />
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-700">Din nye total</span>
                            <span className="text-xl font-bold text-slate-900">{formatPrice(SUBTOTAL + TAX)}</span>
                          </div>
                          <div className="flex items-center justify-center gap-1.5 text-emerald-600 text-sm font-medium">
                            <ShieldCheck className="h-4 w-4" />
                            Du sparer {formatPrice(INITIAL_SHIPPING)}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-center gap-2 mb-5">
                        <Clock className="h-4 w-4 text-amber-500" />
                        <span className="text-sm text-slate-600">
                          Tilbud reserveret i{" "}
                          <span className="font-mono font-semibold text-slate-900">{formatTime(timeLeft)}</span>
                        </span>
                      </div>

                      <Button 
                        className={`w-full h-12 text-sm font-semibold relative overflow-hidden group rounded-lg transition-all ${
                          discountApplied
                            ? "bg-slate-200 text-slate-500 cursor-not-allowed shadow-none"
                            : "bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-500/25"
                        }`}
                        onClick={handleApplyDiscount}
                        disabled={discountApplied}
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          {discountApplied ? (
                            <>
                              <Check className="h-4 w-4" />
                              Rabat Anvendt ✓
                            </>
                          ) : (
                            <>
                              <Truck className="h-4 w-4" />
                              Få Fri Fragt Nu
                            </>
                          )}
                        </span>
                        {!discountApplied && (
                          <>
                            <span className="absolute inset-0 bg-emerald-400 opacity-0 group-hover:opacity-20 transition-opacity" />
                            <span className="absolute -inset-1 bg-emerald-400/20 rounded-lg animate-pulse" style={{ animationDuration: "2s" }} />
                          </>
                        )}
                      </Button>

                      <button 
                        className="w-full mt-3 text-sm text-slate-400 hover:text-slate-600 transition-colors"
                        onClick={() => setShowModal(false)}
                      >
                        Nej tak, jeg betaler fuld pris
                      </button>

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

                  <div className="flex justify-center mt-3">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/80 backdrop-blur text-slate-200 text-xs">
                      <Sparkles className="h-3 w-3 text-emerald-400" />
                      Drevet af ShipConvert
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
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
