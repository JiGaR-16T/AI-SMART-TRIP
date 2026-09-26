import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LandingPage from "@/pages/LandingPage";

describe("LandingPage", () => {
  it("renders all core sections according to Part 2 specifications", () => {
    render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );

    // 1. Hero headline
    expect(
      screen.getByRole("heading", { level: 1, name: /intelligent travel planning powered by/i })
    ).toBeInTheDocument();

    // 2. Search inputs & sliders
    expect(screen.getByLabelText(/origin hub/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/destination/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /generate optimized itinerary/i })).toBeInTheDocument();

    // 3. Dijkstra Route Graph
    expect(screen.getByText(/watch dijkstra graph exploration in real-time/i)).toBeInTheDocument();

    // 4. AI Discovery & Constraints
    expect(screen.getByText(/how ai and real dsa work in harmony/i)).toBeInTheDocument();

    // 5. Featured Destinations
    expect(screen.getByText(/featured indian travel corridors/i)).toBeInTheDocument();

    // 6. How It Works (6 steps)
    expect(screen.getByText(/six steps from prompt to verifiable itinerary/i)).toBeInTheDocument();
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("06")).toBeInTheDocument();

    // 7. Interactive Knapsack Toy
    expect(screen.getByText(/0\/1 knapsack budget optimizer/i)).toBeInTheDocument();

    // 8. Call to action
    expect(
      screen.getByRole("heading", { level: 2, name: /ready to experience truly intelligent travel planning/i })
    ).toBeInTheDocument();
  });
});
