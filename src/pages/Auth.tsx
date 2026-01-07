import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { Zap, Store } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Ugyldig email-adresse"),
  password: z.string().min(6, "Adgangskode skal være mindst 6 tegn"),
});

const signupSchema = loginSchema.extend({
  shopDomain: z.string().min(1, "Shopify URL er påkrævet"),
});

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [shopDomain, setShopDomain] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const validateForm = () => {
    setErrors({});
    const schema = isLogin ? loginSchema : signupSchema;
    const data = isLogin ? { email, password } : { email, password, shopDomain };

    const result = schema.safeParse(data);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            toast({
              title: "Login fejlede",
              description: "Ugyldig email eller adgangskode.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Fejl",
              description: error.message,
              variant: "destructive",
            });
          }
        } else {
          toast({
            title: "Velkommen tilbage!",
            description: "Du er nu logget ind.",
          });
        }
      } else {
        const { error } = await signUp(email, password, shopDomain);
        if (error) {
          if (error.message.includes("already registered")) {
            toast({
              title: "Konto eksisterer allerede",
              description: "Denne email er allerede registreret. Prøv at logge ind.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Fejl ved oprettelse",
              description: error.message,
              variant: "destructive",
            });
          }
        } else {
          toast({
            title: "Konto oprettet!",
            description: "Din konto er nu oprettet. Velkommen!",
          });
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary text-primary-foreground p-12 flex-col justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-foreground/10">
            <Zap className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-semibold">ProfitShip</span>
        </div>
        
        <div className="space-y-6">
          <h1 className="text-4xl font-bold leading-tight">
            Intelligente fragttilbud der øger din bundlinje
          </h1>
          <p className="text-lg text-primary-foreground/80">
            Brug AI til at tilbyde gratis fragt kun på de ordrer, hvor du har margin til det. 
            Boost konverteringer uden at miste profit.
          </p>
        </div>

        <div className="text-sm text-primary-foreground/60">
          © 2024 ProfitShip. Alle rettigheder forbeholdes.
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center justify-center gap-2 mb-8">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-foreground">ProfitShip</span>
          </div>

          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-bold text-foreground">
              {isLogin ? "Log ind på din konto" : "Opret din konto"}
            </h2>
            <p className="text-muted-foreground">
              {isLogin
                ? "Indtast dine oplysninger for at få adgang"
                : "Kom i gang med ProfitShip på få minutter"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="din@email.dk"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Adgangskode</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={errors.password ? "border-destructive" : ""}
              />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password}</p>
              )}
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="shopDomain">Din Shopify URL</Label>
                <div className="relative">
                  <Store className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="shopDomain"
                    type="text"
                    placeholder="min-butik.myshopify.com"
                    value={shopDomain}
                    onChange={(e) => setShopDomain(e.target.value)}
                    className={`pl-10 ${errors.shopDomain ? "border-destructive" : ""}`}
                  />
                </div>
                {errors.shopDomain && (
                  <p className="text-sm text-destructive">{errors.shopDomain}</p>
                )}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                  {isLogin ? "Logger ind..." : "Opretter konto..."}
                </div>
              ) : isLogin ? (
                "Log ind"
              ) : (
                "Opret konto"
              )}
            </Button>
          </form>

          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setErrors({});
              }}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {isLogin ? (
                <>
                  Har du ikke en konto?{" "}
                  <span className="text-primary font-medium">Opret en her</span>
                </>
              ) : (
                <>
                  Har du allerede en konto?{" "}
                  <span className="text-primary font-medium">Log ind</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
