import React, { useState } from "react";

export interface AvatarProps {
  src?: string;
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  size = "md",
  className = "",
}) => {
  const [imgError, setImgError] = useState(false);

  const getInitials = (str: string) => {
    return str
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const sizeDimensions = {
    sm: "2rem",
    md: "2.5rem",
    lg: "3.5rem",
  };

  const fontSizes = {
    sm: "var(--text-xs)",
    md: "var(--text-sm)",
    lg: "var(--text-lg)",
  };

  const dim = sizeDimensions[size];

  return (
    <div
      className={className}
      style={{
        width: dim,
        height: dim,
        borderRadius: "var(--radius-full)",
        overflow: "hidden",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--color-primary-100)",
        color: "var(--color-primary-700)",
        fontWeight: "var(--weight-bold)",
        fontSize: fontSizes[size],
        userSelect: "none",
        border: "1.5px solid var(--color-border)",
        flexShrink: 0,
      }}
      title={name}
      aria-label={name}
    >
      {src && !imgError ? (
        <img
          src={src}
          alt={name}
          onError={() => setImgError(true)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        <span>{getInitials(name)}</span>
      )}
    </div>
  );
};
