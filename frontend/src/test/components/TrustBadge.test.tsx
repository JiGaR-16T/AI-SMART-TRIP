import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TrustBadge } from "@/components/ui/TrustBadge";

describe("TrustBadge component (Golden Rule 8)", () => {
  it("renders LIVE badge with correct styles and role", () => {
    render(<TrustBadge level="LIVE" />);
    const badge = screen.getByRole("status");
    expect(badge).toHaveTextContent("LIVE");
    expect(badge).toHaveClass("trust-badge-live");
    expect(badge).toHaveAttribute("title");
  });

  it("renders ESTIMATED badge", () => {
    render(<TrustBadge level="ESTIMATED" sourceText="Calibrated route estimates" />);
    const badge = screen.getByRole("status");
    expect(badge).toHaveTextContent("ESTIMATED");
    expect(badge).toHaveClass("trust-badge-estimated");
    expect(badge).toHaveAttribute("title", "Calibrated route estimates");
  });

  it("renders CACHED badge", () => {
    render(<TrustBadge level="CACHED" />);
    const badge = screen.getByRole("status");
    expect(badge).toHaveTextContent("CACHED");
    expect(badge).toHaveClass("trust-badge-cached");
  });

  it("renders DEMO badge", () => {
    render(<TrustBadge level="DEMO" />);
    const badge = screen.getByRole("status");
    expect(badge).toHaveTextContent("DEMO");
    expect(badge).toHaveClass("trust-badge-demo");
  });
});
