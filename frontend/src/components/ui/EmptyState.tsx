import React from "react";
import { FolderOpen } from "lucide-react";
import { Button } from "./Button";

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = <FolderOpen size={48} strokeWidth={1.5} color="var(--color-primary-400)" />,
  title,
  description,
  actionLabel,
  onAction,
  className = "",
}) => {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--space-12) var(--space-6)",
        textAlign: "center",
        backgroundColor: "var(--color-surface)",
        borderRadius: "var(--radius-xl)",
        border: "1px dashed var(--color-border)",
      }}
    >
      <div style={{ marginBottom: "var(--space-4)" }}>{icon}</div>
      <h3
        style={{
          fontSize: "var(--text-lg)",
          fontWeight: "var(--weight-bold)",
          color: "var(--color-text)",
          marginBottom: "var(--space-1)",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: "var(--text-sm)",
          color: "var(--color-text-secondary)",
          maxWidth: "380px",
          marginBottom: actionLabel ? "var(--space-6)" : 0,
        }}
      >
        {description}
      </p>
      {actionLabel && onAction && (
        <Button variant="primary" size="md" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
