import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Modal } from "@/components/ui/Modal";

describe("Modal component", () => {
  it("renders content when open is true", () => {
    render(
      <Modal open={true} title="Test Modal" description="Modal Description">
        <div>Modal Body Content</div>
      </Modal>
    );

    expect(screen.getByText("Test Modal")).toBeInTheDocument();
    expect(screen.getByText("Modal Description")).toBeInTheDocument();
    expect(screen.getByText("Modal Body Content")).toBeInTheDocument();
  });

  it("does not render content when open is false", () => {
    render(
      <Modal open={false} title="Hidden Modal">
        <div>Hidden Body</div>
      </Modal>
    );

    expect(screen.queryByText("Hidden Modal")).not.toBeInTheDocument();
  });

  it("calls onOpenChange when close button is clicked", () => {
    const handleOpenChange = vi.fn();
    render(
      <Modal open={true} onOpenChange={handleOpenChange} title="Closable Modal">
        <div>Content</div>
      </Modal>
    );

    const closeBtn = screen.getByLabelText("Close dialog");
    fireEvent.click(closeBtn);
    expect(handleOpenChange).toHaveBeenCalledWith(false);
  });
});
