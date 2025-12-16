import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

export default function Settings() {
  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your configuration has been updated successfully.",
    });
  };

  return (
    <DashboardLayout 
      title="Settings" 
      subtitle="Manage your ShipConvert configuration"
    >
      <div className="max-w-2xl space-y-8">
        {/* General Settings */}
        <div className="bg-card rounded-lg border border-border shadow-card p-6">
          <h2 className="text-lg font-semibold text-foreground mb-6">General Settings</h2>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="storeName">Store Name</Label>
              <Input id="storeName" defaultValue="Acme Store" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select defaultValue="usd">
                <SelectTrigger id="currency">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usd">USD ($)</SelectItem>
                  <SelectItem value="eur">EUR (€)</SelectItem>
                  <SelectItem value="gbp">GBP (£)</SelectItem>
                  <SelectItem value="cad">CAD ($)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="defaultShipping">Default Shipping Cost ($)</Label>
              <Input id="defaultShipping" type="number" defaultValue="5.99" />
              <p className="text-xs text-muted-foreground">
                Used when calculating profit margins in the simulator
              </p>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-card rounded-lg border border-border shadow-card p-6">
          <h2 className="text-lg font-semibold text-foreground mb-6">Notifications</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Daily Summary Email</Label>
                <p className="text-sm text-muted-foreground">
                  Receive a daily report of shipping decisions
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Low Margin Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified when many orders are being rejected
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Weekly Analytics Report</Label>
                <p className="text-sm text-muted-foreground">
                  Receive weekly A/B test performance updates
                </p>
              </div>
              <Switch />
            </div>
          </div>
        </div>

        {/* A/B Test Settings */}
        <div className="bg-card rounded-lg border border-border shadow-card p-6">
          <h2 className="text-lg font-semibold text-foreground mb-6">A/B Test Configuration</h2>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="holdoutPercent">Hold-out Group Size (%)</Label>
              <Input id="holdoutPercent" type="number" defaultValue="10" min="5" max="50" />
              <p className="text-xs text-muted-foreground">
                Percentage of traffic that sees standard shipping (control group)
              </p>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Enable A/B Testing</Label>
                <p className="text-sm text-muted-foreground">
                  Split traffic between standard and smart shipping
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-card rounded-lg border border-destructive/30 shadow-card p-6">
          <h2 className="text-lg font-semibold text-destructive mb-4">Danger Zone</h2>
          <p className="text-sm text-muted-foreground mb-4">
            These actions are irreversible. Please proceed with caution.
          </p>
          <div className="flex gap-3">
            <Button variant="outline" className="text-destructive border-destructive/30 hover:bg-destructive/10">
              Reset All Rules
            </Button>
            <Button variant="outline" className="text-destructive border-destructive/30 hover:bg-destructive/10">
              Clear Analytics Data
            </Button>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} size="lg">
            Save Changes
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
