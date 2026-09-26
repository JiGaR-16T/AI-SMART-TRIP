import React from "react";
import { Loader2 } from "lucide-react";

export interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  color?: string;
}

const sizeMap = {
  sm: 16,
  md: 24,
  lg: 36,
};

export const Spinner: React.FC<SpinnerProps> = ({
  size = "md",
  className = "",
  color = "var(--color-primary-600)",
}) => {
  return (
    <Loader2
      size={sizeMap[size]}
      color={color}
      className={`spinner ${className}`.trim()}
      role="status"
      aria-label="Loading"
    />
  );
};
