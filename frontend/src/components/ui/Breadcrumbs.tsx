import React from "react";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrent?: boolean;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  showHomeIcon?: boolean;
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  showHomeIcon = true,
  className = "",
}) => {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-2)",
          listStyle: "none",
          padding: 0,
          margin: 0,
          fontSize: "var(--text-xs)",
          color: "var(--color-text-secondary)",
        }}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li
              key={index}
              style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-2)" }}
            >
              {index > 0 && (
                <ChevronRight size={12} color="var(--color-text-muted)" aria-hidden="true" />
              )}
              {index === 0 && showHomeIcon && (
                <Home size={13} style={{ marginRight: "2px" }} aria-hidden="true" />
              )}
              {item.href && !isLast ? (
                <a
                  href={item.href}
                  style={{
                    color: "var(--color-text-secondary)",
                    textDecoration: "none",
                    fontWeight: "var(--weight-medium)",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-primary-600)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-text-secondary)")}
                >
                  {item.label}
                </a>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  style={{
                    color: isLast ? "var(--color-text)" : "var(--color-text-secondary)",
                    fontWeight: isLast ? "var(--weight-semibold)" : "var(--weight-normal)",
                  }}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
