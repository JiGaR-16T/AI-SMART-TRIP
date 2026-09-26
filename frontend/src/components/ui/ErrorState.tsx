import React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "./Button";

export interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = "Something went wrong",
  message,
  onRetry,
  className = "",
}) => {
  return (
    <div
      className={className}
      role="alert"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--space-10) var(--space-6)",
        textAlign: "center",
        backgroundColor: "var(--color-danger-50)",
        borderRadius: "var(--radius-xl)",
        border: "1px solid var(--color-danger-200)",
      }}
    >
      <div
        style={{
          width: "3rem",
          height: "3rem",
          borderRadius: "var(--radius-full)",
          backgroundColor: "var(--color-danger-100)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--color-danger-600)",
          marginBottom: "var(--space-3)",
        }}
      >
        <AlertTriangle size={24} />
      </div>
      <h3
        style={{
          fontSize: "var(--text-base)",
          fontWeight: "var(--weight-bold)",
          color: "var(--color-danger-900)",
          marginBottom: "var(--space-1)",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: "var(--text-sm)",
          color: "var(--color-danger-700)",
          maxWidth: "400px",
          marginBottom: onRetry ? "var(--space-4)" : 0,
        }}
      >
        {message}
      </p>
      {onRetry && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRetry}
          leftIcon={<RefreshCw size={14} />}
        >
          Try Again
        </Button>
      )}
    </div>
  );
};
