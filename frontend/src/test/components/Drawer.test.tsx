import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Drawer } from "@/components/ui/Drawer";

describe("Drawer component", () => {
  it("renders when open", () => {
    render(
      <Drawer open={true} title="Why Recommended?" description="Algorithmic Weights">
        <div>Drawer Children</div>
      </Drawer>
    );

    expect(screen.getByText("Why Recommended?")).toBeInTheDocument();
    expect(screen.getByText("Algorithmic Weights")).toBeInTheDocument();
    expect(screen.getByText("Drawer Children")).toBeInTheDocument();
  });

  it("calls onOpenChange when close button is clicked", () => {
    const handleOpenChange = vi.fn();
    render(
      <Drawer open={true} onOpenChange={handleOpenChange} title="Drawer Title">
        <div>Content</div>
      </Drawer>
    );

    const closeBtn = screen.getByLabelText("Close drawer");
    fireEvent.click(closeBtn);
    expect(handleOpenChange).toHaveBeenCalledWith(false);
  });
});
