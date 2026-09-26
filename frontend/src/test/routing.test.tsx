import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NotFoundPage from "@/pages/NotFoundPage";

describe("Routing & Error Handling", () => {
  it("renders 404 page for unmatched routes", () => {
    render(
      <MemoryRouter initialEntries={["/non-existent-route"]}>
        <NotFoundPage />
      </MemoryRouter>
    );

    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByText("Waypoint Not Found")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /return home/i })).toBeInTheDocument();
  });
});
