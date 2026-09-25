/**
 * TravelMind Unified API Client
 *
 * Handles HTTP requests, VITE_API_BASE_URL injection,
 * automatic header propagation (X-Request-ID), and structured error parsing.
 */

export interface ApiErrorDetail {
  code: string;
  message: string;
  details: Record<string, string[]>;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  meta?: Record<string, unknown>;
  error?: ApiErrorDetail;
  pagination?: {
    page: number;
    page_size: number;
    total_items: number;
    total_pages: number;
    has_next: boolean;
    has_previous: boolean;
  };
}

export class ApiError extends Error {
  public code: string;
  public details: Record<string, string[]>;
  public status: number;

  constructor(status: number, error: ApiErrorDetail) {
    super(error.message || "An error occurred while communicating with the server.");
    this.name = "ApiError";
    this.status = status;
    this.code = error.code || "UNKNOWN_ERROR";
    this.details = error.details || {};
  }
}

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api/v1";

export async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = endpoint.startsWith("http")
    ? endpoint
    : `${API_BASE_URL.replace(/\/+$/, "")}/${endpoint.replace(/^\/+/, "")}`;

  const headers = new Headers(options.headers || {});
  if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }
  if (!headers.has("Accept")) {
    headers.set("Accept", "application/json");
  }

  let response: Response;
  try {
    response = await fetch(url, {
      ...options,
      headers,
    });
  } catch (err: unknown) {
    throw new ApiError(0, {
      code: "NETWORK_ERROR",
      message:
        err instanceof Error
          ? `Network connection failed: ${err.message}`
          : "Network connection failed.",
      details: {},
    });
  }

  const contentType = response.headers.get("content-type");
  const isJson = contentType && contentType.includes("application/json");

  let body: unknown = null;
  if (isJson) {
    try {
      body = await response.json();
    } catch {
      body = null;
    }
  }

  if (!response.ok) {
    if (body && typeof body === "object" && "error" in body) {
      const errorPayload = (body as { error: ApiErrorDetail }).error;
      throw new ApiError(response.status, errorPayload);
    }

    throw new ApiError(response.status, {
      code: `HTTP_${response.status}`,
      message: response.statusText || "Request failed.",
      details: {},
    });
  }

  return body as T;
}

export const apiClient = {
  get: <T>(endpoint: string, options?: RequestInit) =>
    request<T>(endpoint, { ...options, method: "GET" }),
  post: <T>(endpoint: string, body?: unknown, options?: RequestInit) =>
    request<T>(endpoint, {
      ...options,
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    }),
  put: <T>(endpoint: string, body?: unknown, options?: RequestInit) =>
    request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    }),
  delete: <T>(endpoint: string, options?: RequestInit) =>
    request<T>(endpoint, { ...options, method: "DELETE" }),
};
