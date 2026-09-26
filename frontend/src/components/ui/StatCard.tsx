import React from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { TrustBadge, TrustLevel } from "./TrustBadge";

export interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: "up" | "down" | "neutral";
  subtitle?: string;
  icon?: React.ReactNode;
  trustLevel?: TrustLevel;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  trend,
  subtitle,
  icon,
  trustLevel,
  className = "",
}) => {
  return (
    <div
      className={`surface-card ${className}`.trim()}
      style={{
        padding: "var(--space-5)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-2)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span
          style={{
            fontSize: "var(--text-xs)",
            fontWeight: "var(--weight-semibold)",
            color: "var(--color-text-secondary)",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          {title}
        </span>
        {icon && (
          <div
            style={{
              padding: "var(--space-2)",
              borderRadius: "var(--radius-lg)",
              backgroundColor: "var(--color-primary-50)",
              color: "var(--color-primary-600)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {icon}
          </div>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "baseline", gap: "var(--space-2)", marginTop: "var(--space-1)" }}>
        <span
          style={{
            fontSize: "var(--text-2xl)",
            fontWeight: "var(--weight-extrabold)",
            color: "var(--color-text)",
            fontFamily: "var(--font-display)",
            lineHeight: 1,
          }}
        >
          {value}
        </span>
        {trustLevel && <TrustBadge level={trustLevel} />}
      </div>

      {(change || subtitle) && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-1-5)",
            fontSize: "var(--text-xs)",
            marginTop: "var(--space-1)",
          }}
        >
          {change && (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "2px",
                fontWeight: "var(--weight-semibold)",
                color:
                  trend === "up"
                    ? "var(--color-success-600)"
                    : trend === "down"
                    ? "var(--color-danger-600)"
                    : "var(--color-text-secondary)",
              }}
            >
              {trend === "up" ? (
                <TrendingUp size={12} />
              ) : trend === "down" ? (
                <TrendingDown size={12} />
              ) : (
                <Minus size={12} />
              )}
              {change}
            </span>
          )}
          {subtitle && (
            <span style={{ color: "var(--color-text-muted)" }}>{subtitle}</span>
          )}
        </div>
      )}
    </div>
  );
};
