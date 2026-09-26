import React from "react";

export interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  action?: React.ReactNode;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  title,
  subtitle,
  align = "left",
  action,
  className = "",
}) => {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: align === "center" ? "center" : "flex-start",
        textAlign: align === "center" ? "center" : "left",
        marginBottom: "var(--space-8)",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "var(--space-4)",
        }}
      >
        <div style={{ maxWidth: align === "center" ? "680px" : "600px", margin: align === "center" ? "0 auto" : 0 }}>
          {badge && (
            <span
              style={{
                display: "inline-block",
                fontSize: "var(--text-xs)",
                fontWeight: "var(--weight-bold)",
                color: "var(--color-primary-600)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "var(--space-2)",
              }}
            >
              {badge}
            </span>
          )}
          <h2
            style={{
              fontSize: "var(--text-3xl)",
              fontWeight: "var(--weight-extrabold)",
              letterSpacing: "var(--tracking-tight)",
              color: "var(--color-text)",
              lineHeight: "var(--leading-tight)",
            }}
          >
            {title}
          </h2>
          {subtitle && (
            <p
              style={{
                fontSize: "var(--text-base)",
                color: "var(--color-text-secondary)",
                marginTop: "var(--space-2-5, 0.625rem)",
                lineHeight: "var(--leading-relaxed)",
              }}
            >
              {subtitle}
            </p>
          )}
        </div>
        {action && <div>{action}</div>}
      </div>
    </div>
  );
};
