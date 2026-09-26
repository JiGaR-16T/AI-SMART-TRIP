import React from "react";
import * as RadixDialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { IconButton } from "./IconButton";

export interface DrawerProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  width?: string;
}

export const Drawer: React.FC<DrawerProps> = ({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  width = "460px",
}) => {
  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="overlay-backdrop" />
        <RadixDialog.Content
          className="drawer-dialog"
          style={{ maxWidth: width }}
          aria-describedby={description ? undefined : undefined}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              marginBottom: "var(--space-4)",
              paddingBottom: "var(--space-3)",
              borderBottom: "1px solid var(--color-border)",
            }}
          >
            <div>
              {title && (
                <RadixDialog.Title
                  style={{
                    fontSize: "var(--text-lg)",
                    fontWeight: "var(--weight-bold)",
                    letterSpacing: "var(--tracking-tight)",
                    color: "var(--color-text)",
                  }}
                >
                  {title}
                </RadixDialog.Title>
              )}
              {description && (
                <RadixDialog.Description
                  style={{
                    fontSize: "var(--text-xs)",
                    color: "var(--color-text-secondary)",
                    marginTop: "var(--space-1)",
                  }}
                >
                  {description}
                </RadixDialog.Description>
              )}
            </div>
            <RadixDialog.Close asChild>
              <IconButton icon={<X size={18} />} aria-label="Close drawer" size="sm" />
            </RadixDialog.Close>
          </div>

          <div style={{ flex: 1 }}>{children}</div>

          {footer && (
            <div
              style={{
                marginTop: "var(--space-6)",
                paddingTop: "var(--space-4)",
                borderTop: "1px solid var(--color-border)",
                display: "flex",
                justifyContent: "flex-end",
                gap: "var(--space-3)",
              }}
            >
              {footer}
            </div>
          )}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};
