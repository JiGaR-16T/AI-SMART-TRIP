import React, { forwardRef } from "react";
import { AlertCircle } from "lucide-react";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ id, label, helperText, error, className = "", disabled, rows = 3, ...props }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);
    const helperId = textareaId ? `${textareaId}-helper` : undefined;
    const errorId = textareaId ? `${textareaId}-error` : undefined;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={textareaId} className="input-label">
            {label}
            {props.required && <span style={{ color: "var(--color-danger-500)", marginLeft: "4px" }}>*</span>}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          rows={rows}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          className={`input-control ${error ? "has-error" : ""} ${className}`.trim()}
          style={{ resize: "vertical" }}
          {...props}
        />
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

Textarea.displayName = "Textarea";
