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
        title: "Missing credentials",
        description: "Please enter both Shop URL and Access Token.",
        variant: "destructive",
      });
      return;
    }

    setIsTesting(true);
    // Simulate API test
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsTesting(false);
    
    toast({
      title: "Connection successful",
      description: "Your store credentials are valid.",
    });
  };

  const handleSaveCredentials = async () => {
    if (!shopUrl || !accessToken) {
      toast({
        title: "Missing credentials",
        description: "Please enter both Shop URL and Access Token.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsConnected(true);
    setIsSaving(false);
    
    toast({
      title: "Credentials saved",
      description: "Your store is now connected to ShipConvert.",
    });
  };

  const handlePauseInterventions = () => {
    toast({
      title: "Interventions paused",
      description: "All ShipConvert interventions have been paused.",
      variant: "destructive",
    });
  };

  const handleUninstall = () => {
    toast({
      title: "Uninstall initiated",
      description: "Please confirm in your store admin to complete uninstallation.",
      variant: "destructive",
    });
  };

  return (
    <DashboardLayout 
      title="Settings & Integrations" 
      subtitle="Connect your store and configure ShipConvert"
    >
      <div className="max-w-3xl space-y-8">
        {/* Platform Connection */}
        <div className="bg-card rounded-xl border border-border shadow-card p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-[#96bf48]/10 flex items-center justify-center">
                <Store className="w-6 h-6 text-[#96bf48]" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Platform Connection</h2>
                <p className="text-sm text-muted-foreground">Connect your Shopify store</p>
              </div>
            </div>
            
            {/* Connection Status */}
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
              isConnected 
                ? 'bg-emerald/10 text-emerald' 
                : 'bg-muted text-muted-foreground'
            }`}>
              {isConnected ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Connected
                </>
              ) : (
                <>
                  <Circle className="w-4 h-4" />
                  Disconnected
                </>
              )}
            </div>
          </div>
          
          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="shopUrl" className="text-sm font-medium">Shop URL</Label>
              <Input 
                id="shopUrl" 
                placeholder="my-store.myshopify.com"
                value={shopUrl}
                onChange={(e) => setShopUrl(e.target.value)}
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                Your Shopify store domain without https://
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="accessToken" className="text-sm font-medium">Access Token</Label>
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
                Generate this from your Shopify Admin → Settings → Apps → Develop apps
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
                Test Connection
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
                Save Credentials
              </Button>
            </div>
          </div>
        </div>

        {/* Data Sync Preferences */}
        <div className="bg-card rounded-xl border border-border shadow-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Database className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Data Sync Preferences</h2>
              <p className="text-sm text-muted-foreground">Control how ShipConvert syncs with your store</p>
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center justify-between py-4">
              <div className="flex items-start gap-3">
                <Database className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <Label className="text-sm font-medium">Sync Product Costs (COGS) Daily</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically import cost data to improve margin calculations
                  </p>
                </div>
              </div>
              <Switch 
                checked={syncCogs} 
                onCheckedChange={setSyncCogs}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between py-4">
              <div className="flex items-start gap-3">
                <Activity className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <Label className="text-sm font-medium">Real-time Order Monitoring</Label>
                  <p className="text-sm text-muted-foreground">
                    Track orders as they happen for instant interventions
                  </p>
                </div>
              </div>
              <Switch 
                checked={realTimeMonitoring} 
                onCheckedChange={setRealTimeMonitoring}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between py-4">
              <div className="flex items-start gap-3">
                <Archive className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <Label className="text-sm font-medium">Auto-Archive Fulfilled Orders</Label>
                  <p className="text-sm text-muted-foreground">
                    Keep your dashboard clean by archiving completed orders
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
        <div className="bg-card rounded-xl border-2 border-destructive/30 shadow-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-destructive">Danger Zone</h2>
              <p className="text-sm text-muted-foreground">Irreversible actions. Proceed with caution.</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/30">
              <div>
                <p className="text-sm font-medium text-foreground">Pause All Interventions</p>
                <p className="text-xs text-muted-foreground">
                  Temporarily stop ShipConvert from triggering on your store
                </p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handlePauseInterventions}
                className="gap-2 text-amber-600 border-amber-300 hover:bg-amber-50 hover:text-amber-700"
              >
                <Pause className="w-4 h-4" />
                Pause
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-4 rounded-lg border border-destructive/30 bg-destructive/5">
              <div>
                <p className="text-sm font-medium text-foreground">Uninstall ShipConvert</p>
                <p className="text-xs text-muted-foreground">
                  Permanently remove ShipConvert from your store
                </p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleUninstall}
                className="gap-2 text-destructive border-destructive/30 hover:bg-destructive/10"
              >
                <Trash2 className="w-4 h-4" />
                Uninstall
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
