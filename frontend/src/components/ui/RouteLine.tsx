import React from "react";

export interface RouteLineProps {
  from?: string;
  to?: string;
  stops?: string[];
  animated?: boolean;
  className?: string;
  height?: number;
}

export const RouteLine: React.FC<RouteLineProps> = ({
  from = "Delhi",
  to = "Jaipur",
  stops = ["Agra"],
  animated = true,
  className = "",
  height = 54,
}) => {
  return (
    <div className={className} style={{ width: "100%", padding: "var(--space-2) 0" }}>
      <svg
        width="100%"
        height={height}
        viewBox="0 0 400 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: "visible" }}
      >
        <defs>
          <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-primary-500)" />
            <stop offset="50%" stopColor="var(--color-accent-500)" />
            <stop offset="100%" stopColor="var(--color-success-500)" />
          </linearGradient>
        </defs>

        {/* Background track */}
        <path
          d="M 20 24 C 110 4, 150 44, 250 14 S 340 38, 380 24"
          stroke="var(--color-neutral-200)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />

        {/* Active colored path */}
        <path
          d="M 20 24 C 110 4, 150 44, 250 14 S 340 38, 380 24"
          stroke="url(#routeGradient)"
          strokeWidth="3"
          strokeDasharray={animated ? "6 6" : "none"}
          strokeLinecap="round"
          fill="none"
          style={
            animated
              ? {
                  animation: "dashFlow 20s linear infinite",
                }
              : undefined
          }
        />

        {/* Start node */}
        <circle cx="20" cy="24" r="6" fill="var(--color-primary-600)" stroke="#ffffff" strokeWidth="2" />
        {/* Mid node */}
        <circle cx="200" cy="24" r="4.5" fill="var(--color-accent-500)" stroke="#ffffff" strokeWidth="1.5" />
        {/* End node */}
        <circle cx="380" cy="24" r="6" fill="var(--color-success-500)" stroke="#ffffff" strokeWidth="2" />

        {/* Labels */}
        <text x="20" y="44" fill="var(--color-text-secondary)" fontSize="10" fontWeight="600" textAnchor="start">
          {from}
        </text>
        {stops[0] && (
          <text x="200" y="44" fill="var(--color-text-muted)" fontSize="9" textAnchor="middle">
            {stops[0]}
          </text>
        )}
        <text x="380" y="44" fill="var(--color-text-secondary)" fontSize="10" fontWeight="600" textAnchor="end">
          {to}
        </text>
      </svg>
    </div>
  );
};
