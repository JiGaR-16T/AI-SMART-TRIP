import React from "react";
import * as RadixDialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { IconButton } from "./IconButton";

export interface ModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: string;
}

export const Modal: React.FC<ModalProps> = ({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  maxWidth = "540px",
}) => {
  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="overlay-backdrop" />
        <RadixDialog.Content
          className="modal-dialog"
          style={{ maxWidth }}
          aria-describedby={description ? undefined : undefined}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              marginBottom: "var(--space-4)",
            }}
          >
            <div>
              {title && (
                <RadixDialog.Title
                  style={{
                    fontSize: "var(--text-xl)",
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
                    fontSize: "var(--text-sm)",
                    color: "var(--color-text-secondary)",
                    marginTop: "var(--space-1)",
                  }}
                >
                  {description}
                </RadixDialog.Description>
              )}
            </div>
            <RadixDialog.Close asChild>
              <IconButton icon={<X size={18} />} aria-label="Close dialog" size="sm" />
            </RadixDialog.Close>
          </div>

          <div style={{ marginTop: "var(--space-2)" }}>{children}</div>

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
