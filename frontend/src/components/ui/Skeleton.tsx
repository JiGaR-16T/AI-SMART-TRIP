import React from "react";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  circle?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  circle = false,
  className = "",
  style,
  ...props
}) => {
  return (
    <div
      className={`skeleton ${className}`.trim()}
      style={{
        width: width ?? "100%",
        height: height ?? "1rem",
        borderRadius: circle ? "var(--radius-full)" : undefined,
        ...style,
      }}
      aria-hidden="true"
      {...props}
    />
  );
};
