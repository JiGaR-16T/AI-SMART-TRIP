import React from "react";
import { Radio, Sparkles, Clock, Database } from "lucide-react";

export type TrustLevel = "LIVE" | "ESTIMATED" | "CACHED" | "DEMO";

export interface TrustBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  level: TrustLevel;
  sourceText?: string;
}

const trustConfig: Record<
  TrustLevel,
  {
    label: string;
    icon: React.ReactNode;
    defaultDescription: string;
    className: string;
  }
> = {
  LIVE: {
    label: "LIVE",
    icon: <Radio size={11} strokeWidth={2.5} />,
    defaultDescription: "Direct, real-time verified data from live provider API.",
    className: "trust-badge-live",
  },
  ESTIMATED: {
    label: "ESTIMATED",
    icon: <Sparkles size={11} strokeWidth={2.5} />,
    defaultDescription: "Algorithmic computation based on historical rates and heuristics.",
    className: "trust-badge-estimated",
  },
  CACHED: {
    label: "CACHED",
    icon: <Clock size={11} strokeWidth={2.5} />,
    defaultDescription: "Recently retrieved and cached snapshot; subject to expiry.",
    className: "trust-badge-cached",
  },
  DEMO: {
    label: "DEMO",
    icon: <Database size={11} strokeWidth={2.5} />,
    defaultDescription: "Simulated architectural placeholder data for demonstration.",
    className: "trust-badge-demo",
  },
};

export const TrustBadge: React.FC<TrustBadgeProps> = ({
  level,
  sourceText,
  className = "",
  title,
  ...props
}) => {
  const config = trustConfig[level];
  const tooltipText = title || sourceText || config.defaultDescription;

  return (
    <span
      className={`trust-badge ${config.className} ${className}`.trim()}
      title={tooltipText}
      role="status"
      aria-label={`Data trust level: ${config.label}. ${tooltipText}`}
      {...props}
    >
      {config.icon}
      <span>{config.label}</span>
    </span>
  );
};
