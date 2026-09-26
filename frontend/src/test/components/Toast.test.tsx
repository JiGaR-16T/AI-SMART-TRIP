import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { Toaster } from "@/components/ui/Toaster";
import { useToastStore, toast } from "@/store/toastStore";

describe("Toast System", () => {
  beforeEach(() => {
    act(() => {
      useToastStore.getState().clearToasts();
    });
  });

  it("renders toast when added via toast helper", () => {
    render(<Toaster />);

    act(() => {
      toast.success("Optimization Done", "Itinerary generated in 1.4ms");
    });

    expect(screen.getByText("Optimization Done")).toBeInTheDocument();
    expect(screen.getByText("Itinerary generated in 1.4ms")).toBeInTheDocument();
  });

  it("adds and clears toasts in store", () => {
    act(() => {
      toast.error("Error occurred");
    });
    expect(useToastStore.getState().toasts).toHaveLength(1);

    act(() => {
      useToastStore.getState().clearToasts();
    });
    expect(useToastStore.getState().toasts).toHaveLength(0);
  });
});
