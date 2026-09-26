import React from "react";
import { Avatar } from "@/components/ui/Avatar";
import { TrustBadge } from "@/components/ui/TrustBadge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Switch } from "@/components/ui/Switch";
import { toast } from "@/store/toastStore";

export const ProfilePage: React.FC = () => {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)", marginBottom: "var(--space-6)" }}>
        <Avatar name="Aditya Sharma" size="lg" />
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
            <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 800 }}>Aditya Sharma</h1>
            <TrustBadge level="DEMO" />
          </div>
          <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-secondary)" }}>
            aditya.sharma@example.edu • TravelTech Student & Explorer
          </p>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
        <Card className="surface-card">
          <CardHeader>
            <CardTitle>Traveler Preferences</CardTitle>
          </CardHeader>
          <CardContent style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
            <Input label="Preferred Currency" defaultValue="INR (₹)" disabled />
            <Input label="Default Home City" defaultValue="New Delhi (DEL)" />
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)", marginTop: "var(--space-2)" }}>
              <Switch label="Strict Budget Enforcement (Knapsack bounds cap)" defaultChecked={true} />
              <Switch label="Prefer Scenic Rail Transit over Domestic Flights" defaultChecked={true} />
              <Switch label="High Priority for UNESCO Cultural Heritage" defaultChecked={true} />
            </div>
            <div style={{ marginTop: "var(--space-4)" }}>
              <Button
                variant="primary"
                onClick={() => toast.success("Preferences Saved", "Updated profile settings.")}
              >
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
