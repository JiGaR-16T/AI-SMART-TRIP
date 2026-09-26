import React, { forwardRef } from "react";
import { ButtonVariant, ButtonSize } from "./Button";
import { Loader2 } from "lucide-react";

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  icon: React.ReactNode;
  "aria-label": string; // Mandatory for accessibility
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon,
      variant = "ghost",
      size = "md",
      isLoading = false,
      disabled,
      className = "",
      "aria-label": ariaLabel,
      ...props
    },
    ref
  ) => {
    const variantClass = `btn-${variant}`;
    const sizeClass = `btn-${size}`;

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        aria-label={ariaLabel}
        title={ariaLabel}
        className={`btn btn-icon-only ${variantClass} ${sizeClass} ${className}`.trim()}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="spinner" size={size === "sm" ? 14 : size === "lg" ? 20 : 16} />
        ) : (
          icon
        )}
      </button>
    );
  }
);

IconButton.displayName = "IconButton";
