import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
  glass?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  interactive = false,
  glass = false,
  className = "",
  style,
  ...props
}) => {
  const baseClass = glass ? "glass-panel" : "surface-card";
  const hoverClass = interactive ? "surface-card-hover" : "";

  return (
    <div
      className={`${baseClass} ${hoverClass} ${className}`.trim()}
      style={{
        padding: "var(--space-6)",
        cursor: interactive ? "pointer" : "default",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = "",
  style,
  ...props
}) => (
  <div
    className={className}
    style={{
      marginBottom: "var(--space-4)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-1)",
      ...style,
    }}
    {...props}
  >
    {children}
  </div>
);

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  className = "",
  style,
  ...props
}) => (
  <h3
    className={className}
    style={{
      fontSize: "var(--text-lg)",
      fontWeight: "var(--weight-bold)",
      letterSpacing: "var(--tracking-tight)",
      color: "var(--color-text)",
      ...style,
    }}
    {...props}
  >
    {children}
  </h3>
);

export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  children,
  className = "",
  style,
  ...props
}) => (
  <p
    className={className}
    style={{
      fontSize: "var(--text-sm)",
      color: "var(--color-text-secondary)",
      lineHeight: "var(--leading-normal)",
      ...style,
    }}
    {...props}
  >
    {children}
  </p>
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = "",
  style,
  ...props
}) => (
  <div className={className} style={{ ...style }} {...props}>
    {children}
  </div>
);

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = "",
  style,
  ...props
}) => (
  <div
    className={className}
    style={{
      marginTop: "var(--space-6)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      paddingTop: "var(--space-4)",
      borderTop: "1px solid var(--color-border)",
      ...style,
    }}
    {...props}
  >
    {children}
  </div>
);
