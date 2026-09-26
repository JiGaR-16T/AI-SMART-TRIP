import { describe, it, expect } from "vitest";
import { solveKnapsack, TravelItem } from "@/utils/knapsack";

describe("0/1 Knapsack Dynamic Programming Engine", () => {
  const testItems: TravelItem[] = [
    { id: "1", name: "Item 1", category: "Test", cost: 1000, happiness: 10 },
    { id: "2", name: "Item 2", category: "Test", cost: 2000, happiness: 25 },
    { id: "3", name: "Item 3", category: "Test", cost: 3000, happiness: 40 },
  ];

  it("selects items that maximize happiness without exceeding budget", () => {
    // Budget 3000: optimal is Item 3 (cost 3000, val 40) or Item 1+2 (cost 3000, val 35). Optimal: Item 3
    const result = solveKnapsack(testItems, 3000);
    expect(result.totalCost).toBeLessThanOrEqual(3000);
    expect(result.totalHappiness).toBe(40);
    expect(result.selectedItems).toHaveLength(1);
    expect(result.selectedItems[0].id).toBe("3");
  });

  it("selects all items if budget is sufficiently large", () => {
    const result = solveKnapsack(testItems, 10000);
    expect(result.selectedItems).toHaveLength(3);
    expect(result.totalCost).toBe(6000);
    expect(result.totalHappiness).toBe(75);
  });

  it("returns empty selection if budget is 0", () => {
    const result = solveKnapsack(testItems, 0);
    expect(result.selectedItems).toHaveLength(0);
    expect(result.totalCost).toBe(0);
    expect(result.totalHappiness).toBe(0);
  });

  it("generates a valid AlgorithmReceipt", () => {
    const result = solveKnapsack(testItems, 4000);
    expect(result.receipt.algorithm_name).toContain("Knapsack");
    expect(result.receipt.execution_time_ms).toBeGreaterThanOrEqual(0);
    expect(result.receipt.time_complexity).toBe("O(n × W)");
    expect(result.receipt.space_complexity).toBe("O(n × W)");
  });
});
