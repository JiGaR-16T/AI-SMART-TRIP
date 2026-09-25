import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import StatusPage from "./StatusPage";
import { apiClient } from "@/services/apiClient";

describe("StatusPage", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renders loading state initially", () => {
    // Return a promise that does not resolve immediately
    vi.spyOn(apiClient, "get").mockReturnValue(new Promise(() => {}));
    render(<StatusPage />);

    expect(screen.getByTestId("status-loading")).toBeInTheDocument();
    expect(screen.getByText(/Connecting to system health services/i)).toBeInTheDocument();
  });

  it("renders components when health check succeeds", async () => {
    vi.spyOn(apiClient, "get").mockResolvedValueOnce({
      status: "healthy",
      version: "0.1.0",
      environment: "test",
      timestamp: "2026-09-25T12:00:00Z",
      components: {
        database: {
          status: "healthy",
          latency_ms: 1.5,
          engine: "postgresql",
        },
        redis: {
          status: "healthy",
          latency_ms: 0.8,
        },
        celery: {
          status: "healthy",
          latency_ms: 2.1,
        },
      },
    });

    render(<StatusPage />);

    await waitFor(() => {
      expect(screen.getByTestId("status-success")).toBeInTheDocument();
    });

    expect(screen.getByTestId("overall-status")).toHaveTextContent("HEALTHY");
    expect(screen.getByTestId("component-database")).toBeInTheDocument();
    expect(screen.getByTestId("component-redis")).toBeInTheDocument();
    expect(screen.getByTestId("component-celery")).toBeInTheDocument();
    expect(screen.getByText(/postgresql/i)).toBeInTheDocument();
  });

  it("renders error card when health check fails", async () => {
    vi.spyOn(apiClient, "get").mockRejectedValueOnce(
      new Error("Failed to connect to health probe")
    );

    render(<StatusPage />);

    await waitFor(() => {
      expect(screen.getByTestId("status-error")).toBeInTheDocument();
    });

    expect(screen.getByText(/Health Check Failed/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Failed to connect to health probe/i)
    ).toBeInTheDocument();
  });
});
