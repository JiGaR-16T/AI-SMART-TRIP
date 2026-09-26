import { AlgorithmReceiptData } from "@/components/ui/AlgorithmReceiptChip";

export interface TravelItem {
  id: string;
  name: string;
  category: string;
  cost: number; // in INR
  happiness: number; // score 1-100
}

export const INITIAL_ITEMS: TravelItem[] = [
  { id: "1", name: "Old Delhi Heritage Food Walk", category: "Food & Culture", cost: 1800, happiness: 85 },
  { id: "2", name: "Amber Fort Sunrise Jeep Safari", category: "Adventure", cost: 3500, happiness: 92 },
  { id: "3", name: "Taj Mahal Guided Architectural Tour", category: "Sightseeing", cost: 2200, happiness: 90 },
  { id: "4", name: "Hot Air Balloon Flight in Pushkar", category: "Luxury Experience", cost: 6500, happiness: 96 },
  { id: "5", name: "Varanasi Subah-e-Banaras Boat Ride", category: "Spiritual & Nature", cost: 1200, happiness: 88 },
];

export interface KnapsackResult {
  selectedItems: TravelItem[];
  totalCost: number;
  totalHappiness: number;
  dpOperations: number;
  receipt: AlgorithmReceiptData;
}

export function solveKnapsack(
  items: TravelItem[],
  capacity: number
): KnapsackResult {
  const startTime = performance.now();
  const n = items.length;
  // Step size for granularity (e.g. 100 INR per bucket for efficiency)
  const step = 100;
  const W = Math.floor(capacity / step);

  // dp[i][w] = max happiness
  const dp: number[][] = Array.from({ length: n + 1 }, () =>
    new Array(W + 1).fill(0)
  );

  let operations = 0;

  for (let i = 1; i <= n; i++) {
    const item = items[i - 1];
    const weight = Math.ceil(item.cost / step);

    for (let w = 0; w <= W; w++) {
      operations++;
      if (weight <= w) {
        dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - weight] + item.happiness);
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }

  // Backtrack to find selected items
  const selectedItems: TravelItem[] = [];
  let w = W;
  for (let i = n; i > 0; i--) {
    if (dp[i][w] !== dp[i - 1][w]) {
      const item = items[i - 1];
      selectedItems.push(item);
      const weight = Math.ceil(item.cost / step);
      w -= weight;
    }
  }

  const endTime = performance.now();
  const elapsed = Math.max(0.1, Number((endTime - startTime).toFixed(2)));

  const totalCost = selectedItems.reduce((acc, it) => acc + it.cost, 0);
  const totalHappiness = selectedItems.reduce((acc, it) => acc + it.happiness, 0);

  return {
    selectedItems: selectedItems.reverse(),
    totalCost,
    totalHappiness,
    dpOperations: operations,
    receipt: {
      algorithm_name: "0/1 Knapsack (Dynamic Programming)",
      execution_time_ms: elapsed,
      input_size: n,
      nodes_explored: operations,
      comparisons: operations,
      time_complexity: "O(n × W)",
      space_complexity: "O(n × W)",
    },
  };
}
