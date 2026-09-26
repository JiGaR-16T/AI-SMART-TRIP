import React from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TrustBadge } from "@/components/ui/TrustBadge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Cpu, Route, DollarSign, Layers, ShieldAlert } from "lucide-react";

export const HowItWorksPage: React.FC = () => {
  const engines = [
    {
      icon: <Cpu size={24} color="var(--color-primary-600)" />,
      name: "1. Trie Autocomplete & Entity Extraction",
      complexity: "O(k) where k = query length",
      desc: "Instantly recognizes over 8,000 Indian railway stations, airports, hill stations, and cultural monuments without expensive API calls.",
    },
    {
      icon: <Route size={24} color="var(--color-accent-500)" />,
      name: "2. Dijkstra & A* Graph Engine",
      complexity: "O(V log V + E)",
      desc: "Computes the Pareto-optimal multi-modal route combining IRCTC train schedules, intercity buses, and highway connections.",
    },
    {
      icon: <DollarSign size={24} color="var(--color-success-500)" />,
      name: "3. 0/1 Knapsack Budget Optimizer",
      complexity: "O(n × W)",
      desc: "Solves the combinatorial knapsack problem to pick the maximum utility set of hotel nights, excursions, and dining experiences strictly within your wallet constraint.",
    },
    {
      icon: <Layers size={24} color="var(--color-primary-500)" />,
      name: "4. Pareto Multi-Objective Frontier",
      complexity: "O(N log N)",
      desc: "Filters out dominated itineraries across transit fatigue, budget efficiency, and sight richness so you only see genuine top choices.",
    },
  ];

  return (
    <div className="container" style={{ padding: "var(--space-12) var(--space-4)" }}>
      <SectionHeader
        badge="Engine Architecture"
        title="How TravelMind Works Under the Hood"
        subtitle="A full-stack, India-first travel planner where AI understands requests and REAL algorithms do the computing."
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "var(--space-6)",
          marginBottom: "var(--space-12)",
        }}
      >
        {engines.map((eng) => (
          <Card key={eng.name} className="surface-card">
            <CardHeader>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {eng.icon}
                <TrustBadge level="DEMO" />
              </div>
              <CardTitle style={{ marginTop: "var(--space-3)" }}>{eng.name}</CardTitle>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "var(--text-xs)", color: "var(--color-primary-600)", fontWeight: 700 }}>
                {eng.complexity}
              </div>
            </CardHeader>
            <CardContent>
              <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
                {eng.desc}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Constitution Highlight Card */}
      <div
        className="surface-card"
        style={{
          padding: "var(--space-8)",
          borderRadius: "var(--radius-2xl)",
          border: "1px solid var(--color-primary-300)",
          background: "linear-gradient(135deg, var(--color-bg-subtle) 0%, var(--color-surface) 100%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", marginBottom: "var(--space-3)" }}>
          <ShieldAlert size={20} color="var(--color-primary-600)" />
          <h3 style={{ fontSize: "var(--text-lg)", fontWeight: 800 }}>TravelMind Engineering Constitution: Golden Rule 4</h3>
        </div>
        <p style={{ fontSize: "var(--text-base)", color: "var(--color-text)", lineHeight: 1.7 }}>
          <strong>&ldquo;AI is NEVER the source of truth for deterministic work (costs, budgets, routes, scheduling, constraints, ranking).&rdquo;</strong> AI is used strictly for natural language understanding and friendly explanations. All itinerary calculations are validated by mathematical algorithms that return verifiable algorithm execution receipts.
        </p>
      </div>
    </div>
  );
};

export default HowItWorksPage;
