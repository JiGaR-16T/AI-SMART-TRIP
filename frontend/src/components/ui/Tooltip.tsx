import React from "react";
import * as RadixTooltip from "@radix-ui/react-tooltip";

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  delayDuration?: number;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  side = "top",
  align = "center",
  delayDuration = 200,
}) => {
  return (
    <RadixTooltip.Provider delayDuration={delayDuration}>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            side={side}
            align={align}
            sideOffset={4}
            style={{
              backgroundColor: "var(--color-neutral-900)",
              color: "var(--color-neutral-0)",
              fontSize: "var(--text-xs)",
              fontWeight: "var(--weight-medium)",
              padding: "0.35rem 0.65rem",
              borderRadius: "var(--radius-md)",
              boxShadow: "var(--shadow-md)",
              zIndex: "var(--z-tooltip)",
              maxWidth: "280px",
              lineHeight: 1.3,
            }}
          >
            {content}
            <RadixTooltip.Arrow style={{ fill: "var(--color-neutral-900)" }} />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
};
