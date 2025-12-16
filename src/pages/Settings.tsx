import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { 
  Store, 
  CheckCircle2, 
  Circle, 
  Eye, 
  EyeOff, 
  RefreshCw, 
  Database, 
  Activity, 
  Archive,
  AlertTriangle,
  Pause,
  Trash2,
  Shield,
  Loader2
} from "lucide-react";

export default function Settings() {
  const [isConnected, setIsConnected] = useState(false);
  const [shopUrl, setShopUrl] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [showToken, setShowToken] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Data sync preferences
  const [syncCogs, setSyncCogs] = useState(true);
  const [realTimeMonitoring, setRealTimeMonitoring] = useState(true);
  const [autoArchive, setAutoArchive] = useState(false);

  const handleTestConnection = async () => {
    if (!shopUrl || !accessToken) {
      toast({
        title: "Manglende oplysninger",
        description: "Indtast venligst både butiks-URL og adgangstoken.",
        variant: "destructive",
      });
      return;
    }

    setIsTesting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsTesting(false);
    
    toast({
      title: "Forbindelse lykkedes",
      description: "Dine butiks-oplysninger er gyldige.",
    });
  };

  const handleSaveCredentials = async () => {
    if (!shopUrl || !accessToken) {
      toast({
        title: "Manglende oplysninger",
        description: "Indtast venligst både butiks-URL og adgangstoken.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsConnected(true);
    setIsSaving(false);
    
    toast({
      title: "Oplysninger gemt",
      description: "Din butik er nu forbundet til ShipConvert.",
    });
  };

  const handlePauseInterventions = () => {
    toast({
      title: "Interventioner sat på pause",
      description: "Alle ShipConvert-interventioner er blevet sat på pause.",
      variant: "destructive",
    });
  };

  const handleUninstall = () => {
    toast({
      title: "Afinstallation startet",
      description: "Bekræft venligst i din butiks-admin for at fuldføre afinstallationen.",
      variant: "destructive",
    });
  };

  return (
    <DashboardLayout 
      title="Indstillinger & Integrationer" 
      subtitle="Forbind din butik og konfigurer ShipConvert"
    >
      <div className="max-w-2xl space-y-6">
        {/* Platform Connection */}
        <div className="bg-card rounded-lg border border-border shadow-card p-5">
          <div className="flex items-start justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <Store className="w-5 h-5 text-success" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-foreground">Platform-forbindelse</h2>
                <p className="text-sm text-muted-foreground">Forbind din Shopify-butik</p>
              </div>
            </div>
            
            {/* Connection Status */}
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${
              isConnected 
                ? 'bg-success/10 text-success' 
                : 'bg-muted text-muted-foreground'
            }`}>
              {isConnected ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Forbundet
                </>
              ) : (
                <>
                  <Circle className="w-3.5 h-3.5" />
                  Ikke forbundet
                </>
              )}
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="shopUrl" className="text-sm font-medium">Butiks-URL</Label>
              <Input 
                id="shopUrl" 
                placeholder="min-butik.myshopify.com"
                value={shopUrl}
                onChange={(e) => setShopUrl(e.target.value)}
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                Dit Shopify-domæne uden https://
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="accessToken" className="text-sm font-medium">Adgangstoken</Label>
              <div className="relative">
                <Input 
                  id="accessToken" 
                  type={showToken ? "text" : "password"}
                  placeholder="shpat_xxxxxxxxxxxxxxxxxxxxxxxx"
                  value={accessToken}
                  onChange={(e) => setAccessToken(e.target.value)}
                  className="font-mono text-sm pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowToken(!showToken)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                Generer denne fra din Shopify Admin → Indstillinger → Apps → Udvikl apps
              </p>
            </div>
            
            <div className="flex items-center gap-3 pt-2">
              <Button 
                variant="outline" 
                onClick={handleTestConnection}
                disabled={isTesting}
                className="gap-2"
              >
                {isTesting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4" />
                )}
                Test Forbindelse
              </Button>
              <Button 
                onClick={handleSaveCredentials}
                disabled={isSaving}
                className="gap-2"
              >
                {isSaving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Shield className="w-4 h-4" />
                )}
                Gem Oplysninger
              </Button>
            </div>
          </div>
        </div>

        {/* Data Sync Preferences */}
        <div className="bg-card rounded-lg border border-border shadow-card p-5">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
              <Database className="w-5 h-5 text-foreground" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-foreground">Data-synkronisering</h2>
              <p className="text-sm text-muted-foreground">Styr hvordan ShipConvert synkroniserer med din butik</p>
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center justify-between py-3">
              <div className="flex items-start gap-3">
                <Database className="w-4 h-4 text-muted-foreground mt-0.5" />
                <div>
                  <Label className="text-sm font-medium">Synkroniser Produktomkostninger (COGS) Dagligt</Label>
                  <p className="text-xs text-muted-foreground">
                    Importer automatisk omkostningsdata for at forbedre dækningsgrad-beregninger
                  </p>
                </div>
              </div>
              <Switch 
                checked={syncCogs} 
                onCheckedChange={setSyncCogs}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between py-3">
              <div className="flex items-start gap-3">
                <Activity className="w-4 h-4 text-muted-foreground mt-0.5" />
                <div>
                  <Label className="text-sm font-medium">Real-time Ordre-overvågning</Label>
                  <p className="text-xs text-muted-foreground">
                    Følg ordrer i realtid for øjeblikkelige interventioner
                  </p>
                </div>
              </div>
              <Switch 
                checked={realTimeMonitoring} 
                onCheckedChange={setRealTimeMonitoring}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between py-3">
              <div className="flex items-start gap-3">
                <Archive className="w-4 h-4 text-muted-foreground mt-0.5" />
                <div>
                  <Label className="text-sm font-medium">Auto-arkiver Afsluttede Ordrer</Label>
                  <p className="text-xs text-muted-foreground">
                    Hold dit dashboard rent ved at arkivere færdige ordrer
                  </p>
                </div>
              </div>
              <Switch 
                checked={autoArchive} 
                onCheckedChange={setAutoArchive}
              />
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-card rounded-lg border-2 border-destructive/30 shadow-card p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-destructive">Farezone</h2>
              <p className="text-sm text-muted-foreground">Uigenkaldelige handlinger. Fortsæt med forsigtighed.</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/30">
              <div>
                <p className="text-sm font-medium text-foreground">Pause Alle Interventioner</p>
                <p className="text-xs text-muted-foreground">
                  Stop midlertidigt ShipConvert fra at aktivere i din butik
                </p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handlePauseInterventions}
                className="gap-2 text-warning border-warning/30 hover:bg-warning/10"
              >
                <Pause className="w-4 h-4" />
                Pause
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-3 rounded-lg border border-destructive/30 bg-destructive/5">
              <div>
                <p className="text-sm font-medium text-foreground">Afinstaller ShipConvert</p>
                <p className="text-xs text-muted-foreground">
                  Fjern permanent ShipConvert fra din butik
                </p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleUninstall}
                className="gap-2 text-destructive border-destructive/30 hover:bg-destructive/10"
              >
                <Trash2 className="w-4 h-4" />
                Afinstaller
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
