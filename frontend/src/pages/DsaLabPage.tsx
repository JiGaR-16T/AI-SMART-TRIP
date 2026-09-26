import React from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { KnapsackToy } from "@/components/algorithms/KnapsackToy";
import { RouteGraphVisualizer } from "@/components/algorithms/RouteGraphVisualizer";

export const DsaLabPage: React.FC = () => {
  return (
    <div className="container" style={{ padding: "var(--space-12) var(--space-4)" }}>
      <SectionHeader
        badge="Interactive Algorithm Playground"
        title="TravelMind DSA Lab"
        subtitle="Explore and execute real data structure algorithms running in the browser and backend engine."
      />

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-12)" }}>
        {/* Knapsack Toy Section */}
        <div>
          <h2 style={{ fontSize: "var(--text-xl)", fontWeight: 800, marginBottom: "var(--space-4)" }}>
            1. Combinatorial Optimization: 0/1 Knapsack
          </h2>
          <KnapsackToy />
        </div>

        {/* Dijkstra Graph Section */}
        <div>
          <h2 style={{ fontSize: "var(--text-xl)", fontWeight: 800, marginBottom: "var(--space-4)" }}>
            2. Shortest Route Discovery: Dijkstra Graph Relaxation
          </h2>
          <RouteGraphVisualizer />
        </div>

        {/* Algorithm Complexity Reference Table */}
        <div className="surface-card" style={{ padding: "var(--space-6)" }}>
          <h3 style={{ fontSize: "var(--text-lg)", fontWeight: 800, marginBottom: "var(--space-4)" }}>
            Core Algorithm Complexity Matrix
          </h3>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "var(--text-sm)" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--color-border)", textAlign: "left", color: "var(--color-text-secondary)" }}>
                  <th style={{ padding: "var(--space-2) var(--space-3)" }}>Algorithm</th>
                  <th style={{ padding: "var(--space-2) var(--space-3)" }}>Use Case</th>
                  <th style={{ padding: "var(--space-2) var(--space-3)" }}>Time Complexity</th>
                  <th style={{ padding: "var(--space-2) var(--space-3)" }}>Space Complexity</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                  <td style={{ padding: "var(--space-3)", fontWeight: 600 }}>Trie</td>
                  <td style={{ padding: "var(--space-3)" }}>Station & City Prefix Autocomplete</td>
                  <td style={{ padding: "var(--space-3)", fontFamily: "var(--font-mono)", color: "var(--color-primary-600)" }}>O(k)</td>
                  <td style={{ padding: "var(--space-3)", fontFamily: "var(--font-mono)" }}>O(Σ · |V|)</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                  <td style={{ padding: "var(--space-3)", fontWeight: 600 }}>Dijkstra + Min-Heap</td>
                  <td style={{ padding: "var(--space-3)" }}>Multi-modal Shortest Transit Route</td>
                  <td style={{ padding: "var(--space-3)", fontFamily: "var(--font-mono)", color: "var(--color-primary-600)" }}>O((V + E) log V)</td>
                  <td style={{ padding: "var(--space-3)", fontFamily: "var(--font-mono)" }}>O(V)</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                  <td style={{ padding: "var(--space-3)", fontWeight: 600 }}>0/1 Knapsack (DP)</td>
                  <td style={{ padding: "var(--space-3)" }}>Activity Selection Within Budget</td>
                  <td style={{ padding: "var(--space-3)", fontFamily: "var(--font-mono)", color: "var(--color-primary-600)" }}>O(n · W)</td>
                  <td style={{ padding: "var(--space-3)", fontFamily: "var(--font-mono)" }}>O(n · W)</td>
                </tr>
                <tr>
                  <td style={{ padding: "var(--space-3)", fontWeight: 600 }}>Pareto Optimization</td>
                  <td style={{ padding: "var(--space-3)" }}>Non-Dominated Trade-off Frontier</td>
                  <td style={{ padding: "var(--space-3)", fontFamily: "var(--font-mono)", color: "var(--color-primary-600)" }}>O(N log N)</td>
                  <td style={{ padding: "var(--space-3)", fontFamily: "var(--font-mono)" }}>O(N)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DsaLabPage;
