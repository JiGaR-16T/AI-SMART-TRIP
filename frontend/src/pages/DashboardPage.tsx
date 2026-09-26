import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Wallet,
  TrendingUp,
  MapPin,
  Compass,
  Plus,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { StatCard } from "@/components/ui/StatCard";
import { Button } from "@/components/ui/Button";
import { TrustBadge } from "@/components/ui/TrustBadge";
import { AlgorithmReceiptChip } from "@/components/ui/AlgorithmReceiptChip";
import { RouteLine } from "@/components/ui/RouteLine";
import { DataTable, Column } from "@/components/ui/DataTable";
import { Drawer } from "@/components/ui/Drawer";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/Accordion";
import { Skeleton } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { toast } from "@/store/toastStore";

type DashboardViewState = "normal" | "loading" | "empty" | "error";

interface RecentTripRecord {
  id: string;
  name: string;
  destination: string;
  dates: string;
  budget: string;
  status: string;
  algorithm: string;
}

const RECENT_TRIPS: RecentTripRecord[] = [
  {
    id: "trip-01",
    name: "Golden Triangle Royal Circuit",
    destination: "Delhi - Agra - Jaipur",
    dates: "Oct 12 - Oct 17, 2026",
    budget: "₹24,500",
    status: "Confirmed",
    algorithm: "Dijkstra + Knapsack",
  },
  {
    id: "trip-02",
    name: "Munnar & Alleppey Monsoon",
    destination: "Kochi - Munnar - Alleppey",
    dates: "Nov 02 - Nov 06, 2026",
    budget: "₹19,800",
    status: "Draft",
    algorithm: "A* Multi-Modal",
  },
  {
    id: "trip-03",
    name: "Himalayan Foothills Retreat",
    destination: "Dehradun - Rishikesh",
    dates: "Dec 20 - Dec 24, 2026",
    budget: "₹14,200",
    status: "Draft",
    algorithm: "Pareto Optimization",
  },
];

const RECOMMENDED_TRIPS = [
  {
    id: "rec-1",
    title: "Gokarna & Dandeli Forest Expedition",
    region: "Karnataka",
    duration: "4 Days",
    estCost: "₹16,400",
    paretoScore: 92,
    explanation: "Scored highest on adventure-to-cost Pareto frontier. Avoids 12 hours of highway transit by utilizing Konkan rail links.",
    weights: { budgetEfficiency: "94%", scenicPacing: "88%", transitComfort: "95%" },
  },
  {
    id: "rec-2",
    title: "Spiti Valley High Altitude Traverse",
    region: "Himachal Pradesh",
    duration: "7 Days",
    estCost: "₹32,000",
    paretoScore: 89,
    explanation: "Top ranking for scenic density under ₹35k. Employs topological sorting for gradual acclimatization at Kaza.",
    weights: { budgetEfficiency: "85%", scenicPacing: "98%", transitComfort: "82%" },
  },
  {
    id: "rec-3",
    title: "Pondicherry & Chettinad Heritage",
    region: "Tamil Nadu",
    duration: "5 Days",
    estCost: "₹21,500",
    paretoScore: 95,
    explanation: "Optimal leisure-comfort ratio with zero backtrack routing across East Coast Road.",
    weights: { budgetEfficiency: "96%", scenicPacing: "91%", transitComfort: "97%" },
  },
];

export const DashboardPage: React.FC = () => {
  const [viewState, setViewState] = useState<DashboardViewState>("normal");
  const [selectedRecommendation, setSelectedRecommendation] = useState<typeof RECOMMENDED_TRIPS[0] | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleWhyRecommended = (rec: typeof RECOMMENDED_TRIPS[0]) => {
    setSelectedRecommendation(rec);
    setDrawerOpen(true);
  };

  const recentTripColumns: Column<RecentTripRecord>[] = [
    {
      key: "name",
      header: "Trip Name",
      sortable: true,
      render: (row) => (
        <div>
          <div style={{ fontWeight: 600, color: "var(--color-text)" }}>{row.name}</div>
          <div style={{ fontSize: "var(--text-xs)", color: "var(--color-text-secondary)" }}>{row.destination}</div>
        </div>
      ),
    },
    { key: "dates", header: "Dates", sortable: true },
    {
      key: "budget",
      header: "Budget (INR)",
      sortable: true,
      render: (row) => (
        <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600 }}>{row.budget}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row) => (
        <span
          style={{
            fontSize: "var(--text-xs)",
            fontWeight: 600,
            padding: "0.2rem 0.5rem",
            borderRadius: "var(--radius-full)",
            backgroundColor: row.status === "Confirmed" ? "var(--color-success-50)" : "var(--color-neutral-100)",
            color: row.status === "Confirmed" ? "var(--color-success-700)" : "var(--color-neutral-700)",
          }}
        >
          {row.status}
        </span>
      ),
    },
    {
      key: "algorithm",
      header: "Optimization Engine",
      render: (row) => (
        <span style={{ fontSize: "var(--text-xs)", fontFamily: "var(--font-mono)", color: "var(--color-primary-600)" }}>
          {row.algorithm}
        </span>
      ),
    },
    {
      key: "actions",
      header: "",
      render: () => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => toast.info("Trip Plan Viewer", "Full itinerary breakdown arriving in Part 3.")}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      {/* State Mode Switcher (Demonstrating all required states: Normal, Loading, Empty, Error) */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "var(--space-3)",
          padding: "var(--space-3) var(--space-4)",
          backgroundColor: "var(--color-bg-subtle)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-xl)",
          marginBottom: "var(--space-6)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
          <span style={{ fontSize: "var(--text-xs)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--color-text-secondary)" }}>
            Inspect Shell States:
          </span>
          <TrustBadge level="DEMO" />
        </div>

        <div style={{ display: "flex", gap: "var(--space-2)" }}>
          <Button
            variant={viewState === "normal" ? "primary" : "ghost"}
            size="sm"
            onClick={() => setViewState("normal")}
          >
            Normal
          </Button>
          <Button
            variant={viewState === "loading" ? "primary" : "ghost"}
            size="sm"
            onClick={() => setViewState("loading")}
          >
            Skeleton Loading
          </Button>
          <Button
            variant={viewState === "empty" ? "primary" : "ghost"}
            size="sm"
            onClick={() => setViewState("empty")}
          >
            Empty State
          </Button>
          <Button
            variant={viewState === "error" ? "primary" : "ghost"}
            size="sm"
            onClick={() => setViewState("error")}
          >
            Error State
          </Button>
        </div>
      </div>

      {/* ERROR STATE */}
      {viewState === "error" && (
        <ErrorState
          title="Failed to Load Dashboard Telemetry"
          message="Could not establish connection to the algorithm worker queue. Please ensure Redis and Celery daemon are running."
          onRetry={() => {
            setViewState("normal");
            toast.success("Telemetry Reconnected", "Live metrics reloaded.");
          }}
        />
      )}

      {/* EMPTY STATE */}
      {viewState === "empty" && (
        <EmptyState
          title="No Trips Generated Yet"
          description="Your itinerary dashboard is empty. Launch the intelligent planner to compute your first optimal trip with deterministic algorithm receipts."
          actionLabel="Plan Your First Trip"
          onAction={() => {
            setViewState("normal");
            toast.info("Planner Launched", "Configure origin and preferences.");
          }}
        />
      )}

      {/* SKELETON LOADING STATE */}
      {viewState === "loading" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ width: "320px" }}>
              <Skeleton height="2rem" style={{ marginBottom: "var(--space-2)" }} />
              <Skeleton height="1rem" width="60%" />
            </div>
            <Skeleton width="140px" height="2.5rem" />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "var(--space-4)" }}>
            <Skeleton height="110px" />
            <Skeleton height="110px" />
            <Skeleton height="110px" />
            <Skeleton height="110px" />
          </div>

          <Skeleton height="240px" />
          <Skeleton height="320px" />
        </div>
      )}

      {/* NORMAL STATE */}
      {viewState === "normal" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
          {/* Welcome Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: "var(--space-4)",
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                <h1 style={{ fontSize: "var(--text-3xl)", fontWeight: 800, letterSpacing: "var(--tracking-tight)" }}>
                  Welcome back, Aditya! 👋
                </h1>
                <TrustBadge level="DEMO" />
              </div>
              <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-secondary)", marginTop: "4px" }}>
                Saturday, September 26 • All 10 DSA micro-engines are active and calibrated.
              </p>
            </div>

            <div style={{ display: "flex", gap: "var(--space-3)" }}>
              <Link to="/dsa-lab">
                <Button variant="outline" size="md" leftIcon={<RefreshCw size={15} />}>
                  DSA Benchmarks
                </Button>
              </Link>
              <Link to="/">
                <Button variant="primary" size="md" leftIcon={<Plus size={16} />}>
                  Plan New Trip
                </Button>
              </Link>
            </div>
          </div>

          {/* Stat Cards Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "var(--space-4)",
            }}
          >
            <StatCard
              title="Trips Planned"
              value="3"
              subtitle="2 upcoming, 1 draft"
              icon={<Compass size={18} />}
              trustLevel="DEMO"
            />
            <StatCard
              title="Budget Saved"
              value="₹8,450"
              change="+14.2%"
              trend="up"
              subtitle="vs naive route booking"
              icon={<Wallet size={18} />}
              trustLevel="DEMO"
            />
            <StatCard
              title="DSA Operations"
              value="14,820"
              subtitle="Knapsack & graph node visits"
              icon={<TrendingUp size={18} />}
              trustLevel="DEMO"
            />
            <StatCard
              title="Destinations Visited"
              value="8 Cities"
              subtitle="Across 4 Indian states"
              icon={<MapPin size={18} />}
              trustLevel="DEMO"
            />
          </div>

          {/* Upcoming Trip Feature Card with RouteLine */}
          <div
            className="surface-card"
            style={{
              padding: "var(--space-6)",
              border: "1px solid var(--color-primary-300)",
              background: "linear-gradient(180deg, var(--color-surface) 0%, var(--color-bg-subtle) 100%)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "var(--space-2)", marginBottom: "var(--space-3)" }}>
              <div>
                <span style={{ fontSize: "var(--text-xs)", fontWeight: 700, color: "var(--color-primary-600)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Upcoming Journey In 16 Days
                </span>
                <h3 style={{ fontSize: "var(--text-xl)", fontWeight: 800, marginTop: "2px" }}>
                  Golden Triangle Royal Circuit (DEL → AGR → JAI)
                </h3>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                <TrustBadge level="ESTIMATED" sourceText="Transit costs estimated from IRCTC & state transport matrices" />
                <AlgorithmReceiptChip name="Dijkstra Shortest Path" timeMs={1.2} />
              </div>
            </div>

            {/* Decorative SVG RouteLine */}
            <RouteLine from="Delhi" to="Jaipur" stops={["Agra"]} animated={true} />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "var(--space-4)",
                marginTop: "var(--space-4)",
                paddingTop: "var(--space-4)",
                borderTop: "1px solid var(--color-border)",
              }}
            >
              <div>
                <div style={{ fontSize: "var(--text-xs)", color: "var(--color-text-secondary)" }}>Travel Dates</div>
                <div style={{ fontWeight: 600, fontSize: "var(--text-sm)" }}>Oct 12 – Oct 17, 2026 (5 Nights)</div>
              </div>
              <div>
                <div style={{ fontSize: "var(--text-xs)", color: "var(--color-text-secondary)" }}>Allocated Budget</div>
                <div style={{ fontWeight: 600, fontSize: "var(--text-sm)", fontFamily: "var(--font-mono)" }}>₹24,500 INR</div>
              </div>
              <div>
                <div style={{ fontSize: "var(--text-xs)", color: "var(--color-text-secondary)" }}>Pacing Score</div>
                <div style={{ fontWeight: 600, fontSize: "var(--text-sm)", color: "var(--color-success-600)" }}>Optimal (8.4/10)</div>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toast.info("Itinerary Details", "Detailed schedule view arriving in Part 3.")}
                >
                  Manage Itinerary
                </Button>
              </div>
            </div>
          </div>

          {/* Split Section: Budget Mini-Chart & AI Suggestions */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "var(--space-6)",
            }}
          >
            {/* Budget Mini-Chart */}
            <div className="surface-card" style={{ padding: "var(--space-6)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-4)" }}>
                <div>
                  <h3 style={{ fontSize: "var(--text-base)", fontWeight: 700 }}>Budget Optimization Allocation</h3>
                  <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-secondary)" }}>
                    Total spend: ₹24,500 of ₹30,000 budget (81.6%)
                  </p>
                </div>
                <ProgressRing score={82} max={100} size={58} strokeWidth={6} label="Saved" color="var(--color-success-500)" />
              </div>

              {/* Bar breakdown */}
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--text-xs)", marginBottom: "4px" }}>
                    <span>Accommodations (3 Nights 4-Star)</span>
                    <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600 }}>₹11,200 (45%)</span>
                  </div>
                  <div style={{ height: "6px", backgroundColor: "var(--color-neutral-200)", borderRadius: "var(--radius-full)" }}>
                    <div style={{ width: "45%", height: "100%", backgroundColor: "var(--color-primary-600)", borderRadius: "var(--radius-full)" }} />
                  </div>
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--text-xs)", marginBottom: "4px" }}>
                    <span>Transit (Express Rail + Cabs)</span>
                    <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600 }}>₹6,800 (28%)</span>
                  </div>
                  <div style={{ height: "6px", backgroundColor: "var(--color-neutral-200)", borderRadius: "var(--radius-full)" }}>
                    <div style={{ width: "28%", height: "100%", backgroundColor: "var(--color-accent-500)", borderRadius: "var(--radius-full)" }} />
                  </div>
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--text-xs)", marginBottom: "4px" }}>
                    <span>Activities & Monuments (Knapsack Selected)</span>
                    <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600 }}>₹4,500 (18%)</span>
                  </div>
                  <div style={{ height: "6px", backgroundColor: "var(--color-neutral-200)", borderRadius: "var(--radius-full)" }}>
                    <div style={{ width: "18%", height: "100%", backgroundColor: "var(--color-success-500)", borderRadius: "var(--radius-full)" }} />
                  </div>
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--text-xs)", marginBottom: "4px" }}>
                    <span>Buffer Reserve (Emergency & Dining)</span>
                    <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600 }}>₹2,000 (9%)</span>
                  </div>
                  <div style={{ height: "6px", backgroundColor: "var(--color-neutral-200)", borderRadius: "var(--radius-full)" }}>
                    <div style={{ width: "9%", height: "100%", backgroundColor: "var(--color-warning-500)", borderRadius: "var(--radius-full)" }} />
                  </div>
                </div>
              </div>
            </div>

            {/* AI Suggestions Accordion */}
            <div className="surface-card" style={{ padding: "var(--space-6)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", marginBottom: "var(--space-4)" }}>
                <Sparkles size={18} color="var(--color-primary-600)" />
                <h3 style={{ fontSize: "var(--text-base)", fontWeight: 700 }}>AI Journey Insights</h3>
                <TrustBadge level="DEMO" />
              </div>

              <Accordion type="single" collapsible defaultValue="item-1">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    Vande Bharat Train Timing Recommendation
                  </AccordionTrigger>
                  <AccordionContent>
                    Departing New Delhi at 06:10 AM on Train #22436 saves 2.5 hours of transit fatigue compared to road travel, preserving your morning energy for the Agra Fort monument tour.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    Jaipur Sunset at Nahargarh Fort
                  </AccordionTrigger>
                  <AccordionContent>
                    Our itinerary scheduler automatically buffers 45 minutes for winding hill climb traffic so you arrive at the Padao restaurant pavilion right before twilight.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    Off-Peak Entry at Taj Mahal
                  </AccordionTrigger>
                  <AccordionContent>
                    Visiting the East Gate at 06:00 AM avoids 78% of typical tourist crowds according to historical crowd heuristics, yielding a +15 point serenity score.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          {/* Recommended Trips Row (with "Why Recommended?" Drawer trigger) */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-4)" }}>
              <div>
                <h3 style={{ fontSize: "var(--text-lg)", fontWeight: 800 }}>Algorithmic Recommendations For You</h3>
                <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-secondary)" }}>
                  Pareto frontier solutions based on your cultural travel interests.
                </p>
              </div>
              <TrustBadge level="ESTIMATED" />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "var(--space-4)",
              }}
            >
              {RECOMMENDED_TRIPS.map((rec) => (
                <div
                  key={rec.id}
                  className="surface-card"
                  style={{
                    padding: "var(--space-5)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-2)" }}>
                      <span style={{ fontSize: "var(--text-xs)", fontWeight: 600, color: "var(--color-primary-600)" }}>
                        {rec.region} • {rec.duration}
                      </span>
                      <span
                        style={{
                          fontSize: "var(--text-xs)",
                          fontWeight: 700,
                          padding: "0.15rem 0.45rem",
                          borderRadius: "var(--radius-full)",
                          backgroundColor: "var(--color-success-50)",
                          color: "var(--color-success-700)",
                        }}
                      >
                        Score {rec.paretoScore}
                      </span>
                    </div>

                    <h4 style={{ fontSize: "var(--text-base)", fontWeight: 700, marginBottom: "var(--space-2)" }}>
                      {rec.title}
                    </h4>

                    <div style={{ fontSize: "var(--text-xs)", color: "var(--color-text-secondary)", marginBottom: "var(--space-3)", lineHeight: 1.5 }}>
                      {rec.explanation.substring(0, 90)}...
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "var(--space-3)", borderTop: "1px solid var(--color-border)" }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: "var(--text-sm)" }}>
                      {rec.estCost}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleWhyRecommended(rec)}
                    >
                      Why Recommended?
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Trips Table */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-4)" }}>
              <div>
                <h3 style={{ fontSize: "var(--text-lg)", fontWeight: 800 }}>Recent Itineraries</h3>
                <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-secondary)" }}>
                  Your generated travel schedules with algorithmic receipts.
                </p>
              </div>
              <TrustBadge level="DEMO" />
            </div>

            <DataTable
              columns={recentTripColumns}
              data={RECENT_TRIPS}
              keyExtractor={(row) => row.id}
            />
          </div>
        </div>
      )}

      {/* "Why Recommended?" Drawer Sheet */}
      <Drawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        title={selectedRecommendation?.title}
        description="Pareto Multi-Objective Optimization Explanation"
      >
        {selectedRecommendation && (
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)", marginTop: "var(--space-2)" }}>
            <div
              style={{
                padding: "var(--space-4)",
                backgroundColor: "var(--color-bg-subtle)",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--color-border)",
              }}
            >
              <div style={{ fontSize: "var(--text-xs)", fontWeight: 700, color: "var(--color-primary-600)", textTransform: "uppercase" }}>
                Mathematical Rationale
              </div>
              <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text)", marginTop: "var(--space-1)", lineHeight: 1.6 }}>
                {selectedRecommendation.explanation}
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: "var(--text-sm)", fontWeight: 700, marginBottom: "var(--space-2)" }}>
                Multi-Objective Weights Breakdown
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
                {Object.entries(selectedRecommendation.weights).map(([k, v]) => (
                  <div
                    key={k}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "var(--space-2-5, 0.625rem) var(--space-3)",
                      backgroundColor: "var(--color-surface)",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid var(--color-border)",
                      fontSize: "var(--text-xs)",
                    }}
                  >
                    <span style={{ textTransform: "capitalize", color: "var(--color-text-secondary)" }}>
                      {k.replace(/([A-Z])/g, " $1")}
                    </span>
                    <span style={{ fontWeight: 700, fontFamily: "var(--font-mono)", color: "var(--color-primary-600)" }}>
                      {v}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: "var(--space-2)" }}>
              <AlgorithmReceiptChip
                name="Pareto Frontier Engine"
                timeMs={2.3}
                nodesExplored={45}
                complexity="O(N log N)"
              />
            </div>

            <div style={{ marginTop: "var(--space-4)" }}>
              <Button
                variant="primary"
                size="md"
                style={{ width: "100%" }}
                onClick={() => {
                  setDrawerOpen(false);
                  toast.success("Itinerary Loaded", `Exploring ${selectedRecommendation.title}`);
                }}
              >
                Adopt This Recommendation
              </Button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default DashboardPage;
