import React from "react";
import { TrustBadge } from "@/components/ui/TrustBadge";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";
import { AlgorithmReceiptChip } from "@/components/ui/AlgorithmReceiptChip";
import { Plus, Calendar, MapPin, ArrowRight } from "lucide-react";
import { toast } from "@/store/toastStore";

export const TripsPage: React.FC = () => {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-6)" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
            <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 800 }}>My Planned Trips</h1>
            <TrustBadge level="DEMO" />
          </div>
          <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-secondary)", marginTop: "2px" }}>
            View and manage your optimized itineraries.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          leftIcon={<Plus size={16} />}
          onClick={() => toast.info("New Trip Planner", "Interactive trip wizard launching in Part 3.")}
        >
          Create New Itinerary
        </Button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "var(--space-6)" }}>
        <Card className="surface-card">
          <CardHeader>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "var(--text-xs)", fontWeight: 700, color: "var(--color-primary-600)" }}>
                CONFIRMED
              </span>
              <TrustBadge level="ESTIMATED" />
            </div>
            <CardTitle style={{ marginTop: "var(--space-2)" }}>Golden Triangle Royal Circuit</CardTitle>
            <CardDescription>Delhi - Agra - Jaipur (5 Nights)</CardDescription>
          </CardHeader>
          <CardContent>
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)", fontSize: "var(--text-xs)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                <Calendar size={14} color="var(--color-text-muted)" />
                <span>Oct 12, 2026 – Oct 17, 2026</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                <MapPin size={14} color="var(--color-text-muted)" />
                <span>3 Major Transit Hubs, 8 Monuments</span>
              </div>
            </div>
            <div style={{ marginTop: "var(--space-4)" }}>
              <AlgorithmReceiptChip name="Dijkstra + Knapsack" timeMs={1.2} />
            </div>
          </CardContent>
          <CardFooter>
            <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: "var(--text-sm)" }}>
              ₹24,500 INR
            </span>
            <Button variant="ghost" size="sm" rightIcon={<ArrowRight size={14} />}>
              Details
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default TripsPage;
