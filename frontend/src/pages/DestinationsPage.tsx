import React, { useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";
import { TrustBadge } from "@/components/ui/TrustBadge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ChipGroup } from "@/components/ui/Chip";
import { Search, ArrowRight } from "lucide-react";
import { toast } from "@/store/toastStore";

const DESTINATION_LIST = [
  {
    id: "1",
    name: "Jaipur & Shekhawati Circuit",
    region: "Rajasthan",
    duration: "4 Days / 3 Nights",
    budget: "₹18,500",
    tags: ["Heritage", "Forts", "Palaces"],
    bg: "linear-gradient(135deg, #f97316 0%, #db2777 100%)",
    algorithm: "Pareto Frontier (Score: 94)",
  },
  {
    id: "2",
    name: "Kerala Backwaters & Munnar",
    region: "Kerala",
    duration: "5 Days / 4 Nights",
    budget: "₹24,000",
    tags: ["Tea Gardens", "Houseboat", "Ayurveda"],
    bg: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    algorithm: "Dijkstra Transit (Score: 91)",
  },
  {
    id: "3",
    name: "Varanasi & Sarnath Spiritual Trail",
    region: "Uttar Pradesh",
    duration: "3 Days / 2 Nights",
    budget: "₹12,800",
    tags: ["Ghats", "Ganga Aarti", "Silk Weaving"],
    bg: "linear-gradient(135deg, #6366f1 0%, #4338ca 100%)",
    algorithm: "Knapsack DP (Score: 89)",
  },
  {
    id: "4",
    name: "Goa Coastal & Spice Plantation",
    region: "Goa",
    duration: "4 Days / 3 Nights",
    budget: "₹16,200",
    tags: ["Beaches", "Portuguese Architecture", "Cuisine"],
    bg: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
    algorithm: "A* Shortest Path (Score: 93)",
  },
  {
    id: "5",
    name: "Hampi & Badami Rock Architecture",
    region: "Karnataka",
    duration: "4 Days / 3 Nights",
    budget: "₹14,900",
    tags: ["UNESCO World Heritage", "Ruins", "Bouldering"],
    bg: "linear-gradient(135deg, #eab308 0%, #ca8a04 100%)",
    algorithm: "Pareto Optimization (Score: 88)",
  },
  {
    id: "6",
    name: "Leh Ladakh Himalayan High Passes",
    region: "Ladakh",
    duration: "7 Days / 6 Nights",
    budget: "₹38,000",
    tags: ["Monasteries", "High Altitude", "Lakes"],
    bg: "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
    algorithm: "Topological Sort (Score: 96)",
  },
];

export const DestinationsPage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState<string[]>(["all"]);

  const filtered = DESTINATION_LIST.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.region.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container" style={{ padding: "var(--space-12) var(--space-4)" }}>
      <SectionHeader
        badge="Indian Corridors"
        title="Explore Algorithmic Travel Circuits"
        subtitle="Every circuit is generated with verifiable route graphs and historical budget metrics."
      />

      {/* Search & Filter Bar */}
      <div
        className="surface-card"
        style={{
          padding: "var(--space-4) var(--space-6)",
          marginBottom: "var(--space-8)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-4)",
        }}
      >
        <div style={{ maxWidth: "420px" }}>
          <Input
            placeholder="Search by city, circuit, or state..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            startIcon={<Search size={16} />}
          />
        </div>

        <ChipGroup
          options={[
            { value: "all", label: "All Regions" },
            { value: "north", label: "North India" },
            { value: "south", label: "South India" },
            { value: "west", label: "West & Coast" },
            { value: "himalayas", label: "Himalayas" },
          ]}
          selectedValues={selectedTag}
          onChange={setSelectedTag}
          multiSelect={false}
        />
      </div>

      {/* Grid of Destination Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "var(--space-6)",
        }}
      >
        {filtered.map((dest) => (
          <Card key={dest.id} interactive className="surface-card">
            <div
              style={{
                height: "140px",
                borderRadius: "var(--radius-lg)",
                background: dest.bg,
                position: "relative",
                marginBottom: "var(--space-4)",
                padding: "var(--space-3)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <span
                style={{
                  backgroundColor: "rgba(0,0,0,0.45)",
                  color: "#ffffff",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  padding: "0.2rem 0.6rem",
                  borderRadius: "var(--radius-full)",
                  backdropFilter: "blur(4px)",
                }}
              >
                {dest.region}
              </span>
              <TrustBadge level="DEMO" />
            </div>

            <CardHeader style={{ marginBottom: "var(--space-2)" }}>
              <CardTitle>{dest.name}</CardTitle>
              <CardDescription>{dest.duration}</CardDescription>
            </CardHeader>

            <CardContent>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-1-5)", marginBottom: "var(--space-4)" }}>
                {dest.tags.map((t) => (
                  <span
                    key={t}
                    style={{
                      fontSize: "0.7rem",
                      padding: "0.15rem 0.5rem",
                      borderRadius: "var(--radius-md)",
                      backgroundColor: "var(--color-bg-subtle)",
                      color: "var(--color-text-secondary)",
                      border: "1px solid var(--color-border)",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <div>
                  <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-secondary)" }}>Est. Budget: </span>
                  <span style={{ fontSize: "var(--text-base)", fontWeight: 700, fontFamily: "var(--font-mono)", color: "var(--color-primary-600)" }}>
                    {dest.budget}
                  </span>
                </div>
              </div>
            </CardContent>

            <CardFooter style={{ marginTop: "var(--space-4)", paddingTop: "var(--space-3)" }}>
              <span style={{ fontSize: "var(--text-xs)", fontFamily: "var(--font-mono)", color: "var(--color-text-muted)" }}>
                {dest.algorithm}
              </span>
              <Button
                variant="ghost"
                size="sm"
                rightIcon={<ArrowRight size={14} />}
                onClick={() => toast.info("Circuit Loaded", `Selected ${dest.name} for planning.`)}
              >
                Plan Circuit
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DestinationsPage;
