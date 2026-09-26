import React from "react";
import * as RadixSelect from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  label?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  options: SelectOption[];
  disabled?: boolean;
  error?: string;
  helperText?: string;
  id?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  placeholder = "Select an option...",
  value,
  defaultValue,
  onValueChange,
  options,
  disabled = false,
  error,
  helperText,
  id,
}) => {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={selectId} className="input-label">
          {label}
        </label>
      )}
      <RadixSelect.Root
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        disabled={disabled}
      >
        <RadixSelect.Trigger
          id={selectId}
          aria-label={label || placeholder}
          className={`input-control ${error ? "has-error" : ""}`}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: disabled ? "not-allowed" : "pointer",
          }}
        >
          <RadixSelect.Value placeholder={placeholder} />
          <RadixSelect.Icon>
            <ChevronDown size={16} color="var(--color-text-secondary)" />
          </RadixSelect.Icon>
        </RadixSelect.Trigger>

        <RadixSelect.Portal>
          <RadixSelect.Content
            style={{
              backgroundColor: "var(--color-surface)",
              borderRadius: "var(--radius-xl)",
              border: "1px solid var(--color-border)",
              boxShadow: "var(--shadow-xl)",
              padding: "var(--space-1)",
              zIndex: "var(--z-dropdown)",
              minWidth: "180px",
              maxHeight: "260px",
              overflowY: "auto",
            }}
          >
            <RadixSelect.ScrollUpButton style={{ display: "flex", justifyContent: "center", padding: "4px" }}>
              <ChevronUp size={14} />
            </RadixSelect.ScrollUpButton>
            <RadixSelect.Viewport>
              {options.map((opt) => (
                <RadixSelect.Item
                  key={opt.value}
                  value={opt.value}
                  disabled={opt.disabled}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.5rem 0.75rem",
                    borderRadius: "var(--radius-md)",
                    fontSize: "var(--text-sm)",
                    color: opt.disabled ? "var(--color-text-muted)" : "var(--color-text)",
                    cursor: opt.disabled ? "not-allowed" : "pointer",
                    outline: "none",
                    userSelect: "none",
                  }}
                  onMouseEnter={(e) => {
                    if (!opt.disabled) e.currentTarget.style.backgroundColor = "var(--color-surface-hover)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  <RadixSelect.ItemText>{opt.label}</RadixSelect.ItemText>
                  <RadixSelect.ItemIndicator>
                    <Check size={14} color="var(--color-primary-600)" />
                  </RadixSelect.ItemIndicator>
                </RadixSelect.Item>
              ))}
            </RadixSelect.Viewport>
            <RadixSelect.ScrollDownButton style={{ display: "flex", justifyContent: "center", padding: "4px" }}>
              <ChevronDown size={14} />
            </RadixSelect.ScrollDownButton>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
      {error && <div className="input-error-msg">{error}</div>}
      {!error && helperText && <div className="input-helper">{helperText}</div>}
    </div>
  );
};
