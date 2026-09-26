import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "@/components/ui/Button";

describe("Button component", () => {
  it("renders with default props", () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("btn-primary");
    expect(button).toHaveClass("btn-md");
  });

  it("renders variants and sizes correctly", () => {
    const { rerender } = render(<Button variant="outline" size="lg">Large Outline</Button>);
    let button = screen.getByRole("button", { name: /large outline/i });
    expect(button).toHaveClass("btn-outline");
    expect(button).toHaveClass("btn-lg");

    rerender(<Button variant="danger" size="sm">Small Danger</Button>);
    button = screen.getByRole("button", { name: /small danger/i });
    expect(button).toHaveClass("btn-danger");
    expect(button).toHaveClass("btn-sm");
  });

  it("handles click events", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Submit</Button>);
    const button = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("disables button and displays loading spinner when isLoading is true", () => {
    const handleClick = vi.fn();
    render(<Button isLoading onClick={handleClick}>Saving</Button>);
    const button = screen.getByRole("button", { name: /saving/i });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
