import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { apiClient, ApiError } from "./apiClient";

describe("apiClient", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("handles successful JSON response", async () => {
    const mockData = { success: true, data: { id: "123" } };
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: true,
      status: 200,
      headers: new Headers({ "content-type": "application/json" }),
      json: async () => mockData,
    } as Response);

    const result = await apiClient.get<typeof mockData>("test/");
    expect(result).toEqual(mockData);
  });

  it("parses structured API errors conforming to constitution format", async () => {
    const errorBody = {
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Invalid field provided",
        details: { budget: ["Budget must be greater than 0"] },
      },
    };

    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: false,
      status: 400,
      headers: new Headers({ "content-type": "application/json" }),
      json: async () => errorBody,
    } as Response);

    try {
      await apiClient.get("test/");
      expect.unreachable();
    } catch (err: unknown) {
      expect(err).toBeInstanceOf(ApiError);
      if (err instanceof ApiError) {
        expect(err.code).toBe("VALIDATION_ERROR");
        expect(err.message).toBe("Invalid field provided");
        expect(err.details).toEqual({
          budget: ["Budget must be greater than 0"],
        });
        expect(err.status).toBe(400);
      }
    }
  });

  it("handles network failure and raises NETWORK_ERROR", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValueOnce(
      new Error("Failed to fetch")
    );

    try {
      await apiClient.get("test/");
      expect.unreachable();
    } catch (err: unknown) {
      expect(err).toBeInstanceOf(ApiError);
      const apiErr = err as ApiError;
      expect(apiErr.code).toBe("NETWORK_ERROR");
      expect(apiErr.status).toBe(0);
    }
  });
});
