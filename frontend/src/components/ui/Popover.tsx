import React from "react";
import * as RadixPopover from "@radix-ui/react-popover";

export interface PopoverProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: "start" | "center" | "end";
  side?: "top" | "right" | "bottom" | "left";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const Popover: React.FC<PopoverProps> = ({
  trigger,
  children,
  align = "center",
  side = "bottom",
  open,
  onOpenChange,
}) => {
  return (
    <RadixPopover.Root open={open} onOpenChange={onOpenChange}>
      <RadixPopover.Trigger asChild>{trigger}</RadixPopover.Trigger>
      <RadixPopover.Portal>
        <RadixPopover.Content
          align={align}
          side={side}
          sideOffset={6}
          style={{
            backgroundColor: "var(--color-surface)",
            color: "var(--color-text)",
            borderRadius: "var(--radius-xl)",
            border: "1px solid var(--color-border)",
            boxShadow: "var(--shadow-xl)",
            padding: "var(--space-4)",
            zIndex: "var(--z-popover)",
            maxWidth: "340px",
            outline: "none",
          }}
        >
          {children}
          <RadixPopover.Arrow style={{ fill: "var(--color-surface)" }} />
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  );
};
