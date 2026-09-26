import React, { useState } from "react";
import { Slider } from "@/components/ui/Slider";
import { Button } from "@/components/ui/Button";
import { TrustBadge } from "@/components/ui/TrustBadge";
import { AlgorithmReceiptChip } from "@/components/ui/AlgorithmReceiptChip";
import { Sparkles, CheckCircle2, Circle, Calculator } from "lucide-react";
import { INITIAL_ITEMS, solveKnapsack, KnapsackResult } from "@/utils/knapsack";

export const KnapsackToy: React.FC = () => {
  const [budget, setBudget] = useState<number[]>([8000]);
  const [result, setResult] = useState<KnapsackResult | null>(null);

  const handleRun = () => {
    const res = solveKnapsack(INITIAL_ITEMS, budget[0]);
    setResult(res);
  };

  const selectedItemIds = new Set(result?.selectedItems.map((it) => it.id) || []);

  return (
    <div
      className="surface-card"
      style={{
        padding: "var(--space-6)",
        border: "1px solid var(--color-primary-300)",
        boxShadow: "var(--shadow-lg)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: "var(--space-2)",
          marginBottom: "var(--space-4)",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
            <span
              style={{
                fontSize: "var(--text-xs)",
                fontWeight: "var(--weight-bold)",
                color: "var(--color-primary-600)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              Interactive DSA Demo
            </span>
            <TrustBadge level="LIVE" sourceText="Computes deterministically in browser runtime" />
          </div>
          <h3 style={{ fontSize: "var(--text-xl)", fontWeight: "var(--weight-bold)", marginTop: "4px" }}>
            0/1 Knapsack Budget Optimizer
          </h3>
          <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-secondary)", marginTop: "2px" }}>
            Select an activity budget. TravelMind executes real dynamic programming to maximize experience happiness score!
          </p>
        </div>
      </div>

      <div style={{ marginBottom: "var(--space-6)" }}>
        <Slider
          label="Activity Budget Allocation"
          min={2000}
          max={15000}
          step={500}
          value={budget}
          onValueChange={setBudget}
          formatValue={(val) => `₹${val.toLocaleString("en-IN")}`}
        />
      </div>

      <div style={{ marginBottom: "var(--space-6)" }}>
        <div style={{ fontSize: "var(--text-xs)", fontWeight: 600, color: "var(--color-text-secondary)", marginBottom: "var(--space-2)" }}>
          Available Experiences ({INITIAL_ITEMS.length} candidate activities):
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "var(--space-2-5, 0.625rem)" }}>
          {INITIAL_ITEMS.map((item) => {
            const isSelected = selectedItemIds.has(item.id);
            return (
              <div
                key={item.id}
                style={{
                  padding: "var(--space-3)",
                  borderRadius: "var(--radius-lg)",
                  border: isSelected ? "2px solid var(--color-success-500)" : "1px solid var(--color-border)",
                  backgroundColor: isSelected ? "var(--color-success-50)" : "var(--color-surface)",
                  transition: "all var(--duration-fast)",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                  <div style={{ fontWeight: 600, fontSize: "var(--text-xs)", color: "var(--color-text)" }}>
                    {item.name}
                  </div>
                  {isSelected ? (
                    <CheckCircle2 size={16} color="var(--color-success-600)" />
                  ) : (
                    <Circle size={16} color="var(--color-neutral-300)" />
                  )}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "var(--space-2)", fontSize: "0.75rem" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600, color: "var(--color-primary-600)" }}>
                    ₹{item.cost.toLocaleString("en-IN")}
                  </span>
                  <span style={{ color: "var(--color-accent-600)", fontWeight: 600 }}>
                    ★ {item.happiness} pts
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", flexWrap: "wrap" }}>
        <Button
          variant="primary"
          size="md"
          onClick={handleRun}
          leftIcon={<Calculator size={16} />}
        >
          Compute Optimal 0/1 Knapsack
        </Button>
        {result && (
          <AlgorithmReceiptChip
            receipt={result.receipt}
          />
        )}
      </div>

      {result && (
        <div
          style={{
            marginTop: "var(--space-6)",
            padding: "var(--space-4)",
            borderRadius: "var(--radius-xl)",
            backgroundColor: "var(--color-bg-subtle)",
            border: "1px solid var(--color-border)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "var(--space-2)" }}>
            <div>
              <div style={{ fontSize: "var(--text-xs)", color: "var(--color-text-secondary)" }}>Optimal Result</div>
              <div style={{ fontSize: "var(--text-base)", fontWeight: 700, color: "var(--color-success-600)", display: "flex", alignItems: "center", gap: "6px" }}>
                <Sparkles size={16} /> Selected {result.selectedItems.length} activities
              </div>
            </div>
            <div style={{ display: "flex", gap: "var(--space-6)", textAlign: "right" }}>
              <div>
                <div style={{ fontSize: "var(--text-xs)", color: "var(--color-text-secondary)" }}>Total Spent</div>
                <div style={{ fontFamily: "var(--font-mono)", fontWeight: 700, color: "var(--color-text)" }}>
                  ₹{result.totalCost.toLocaleString("en-IN")} / ₹{budget[0].toLocaleString("en-IN")}
                </div>
              </div>
              <div>
                <div style={{ fontSize: "var(--text-xs)", color: "var(--color-text-secondary)" }}>Max Happiness</div>
                <div style={{ fontFamily: "var(--font-mono)", fontWeight: 700, color: "var(--color-accent-600)" }}>
                  {result.totalHappiness} points
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
