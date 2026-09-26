import React, { forwardRef } from "react";
import { AlertCircle } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      label,
      helperText,
      error,
      startIcon,
      endIcon,
      className = "",
      disabled,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);
    const helperId = inputId ? `${inputId}-helper` : undefined;
    const errorId = inputId ? `${inputId}-error` : undefined;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="input-label">
            {label}
            {props.required && <span style={{ color: "var(--color-danger-500)", marginLeft: "4px" }}>*</span>}
          </label>
        )}
        <div className="input-container">
          {startIcon && (
            <div
              style={{
                position: "absolute",
                left: "0.75rem",
                display: "flex",
                alignItems: "center",
                pointerEvents: "none",
                color: "var(--color-text-secondary)",
              }}
            >
              {startIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            disabled={disabled}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : helperText ? helperId : undefined}
            className={`input-control ${error ? "has-error" : ""} ${className}`.trim()}
            style={{
              paddingLeft: startIcon ? "2.5rem" : undefined,
              paddingRight: endIcon ? "2.5rem" : undefined,
            }}
            {...props}
          />
          {endIcon && (
            <div
              style={{
                position: "absolute",
                right: "0.75rem",
                display: "flex",
                alignItems: "center",
                pointerEvents: "none",
                color: "var(--color-text-secondary)",
              }}
            >
              {endIcon}
            </div>
          )}
        </div>
        {error && (
          <div id={errorId} className="input-error-msg" role="alert">
            <AlertCircle size={14} />
            <span>{error}</span>
          </div>
        )}
        {!error && helperText && (
          <div id={helperId} className="input-helper">
            {helperText}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
