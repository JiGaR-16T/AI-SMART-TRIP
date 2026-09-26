import React from "react";

export interface ProgressRingProps {
  score: number; // e.g. 85 or 0.85
  max?: number; // e.g. 100
  size?: number; // width/height in px, default 80
  strokeWidth?: number; // stroke thickness, default 7
  label?: string;
  color?: string;
  trackColor?: string;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  score,
  max = 100,
  size = 84,
  strokeWidth = 7,
  label,
  color = "var(--color-primary-600)",
  trackColor = "var(--color-neutral-200)",
}) => {
  const normalizedScore = Math.min(max, Math.max(0, score));
  const percentage = (normalizedScore / max) * 100;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
      role="progressbar"
      aria-valuenow={score}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={label || `Score: ${score} of ${max}`}
    >
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Animated score ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
          style={{
            transition: "stroke-dashoffset 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
      </svg>
      {/* Center value */}
      <div
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontSize: size > 70 ? "var(--text-lg)" : "var(--text-sm)",
            fontWeight: "var(--weight-bold)",
            color: "var(--color-text)",
            lineHeight: 1,
          }}
        >
          {score}
        </span>
        {label && (
          <span
            style={{
              fontSize: "0.625rem",
              color: "var(--color-text-secondary)",
              marginTop: "2px",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
            }}
          >
            {label}
          </span>
        )}
      </div>
    </div>
  );
};
