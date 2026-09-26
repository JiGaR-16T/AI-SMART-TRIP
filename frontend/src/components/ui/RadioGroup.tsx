import React from "react";
import * as RadixRadioGroup from "@radix-ui/react-radio-group";

export interface RadioOption {
  value: string;
  label: React.ReactNode;
  description?: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  name?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  options: RadioOption[];
  disabled?: boolean;
  orientation?: "horizontal" | "vertical";
  label?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  value,
  defaultValue,
  onValueChange,
  options,
  disabled = false,
  orientation = "vertical",
  label,
}) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
      {label && <label className="input-label">{label}</label>}
      <RadixRadioGroup.Root
        name={name}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        disabled={disabled}
        aria-label={label}
        style={{
          display: "flex",
          flexDirection: orientation === "horizontal" ? "row" : "column",
          gap: orientation === "horizontal" ? "var(--space-4)" : "var(--space-2-5, 0.625rem)",
        }}
      >
        {options.map((opt) => {
          const itemDisabled = disabled || opt.disabled;
          return (
            <div
              key={opt.value}
              style={{
                display: "inline-flex",
                alignItems: "flex-start",
                gap: "var(--space-2-5, 0.625rem)",
              }}
            >
              <RadixRadioGroup.Item
                value={opt.value}
                id={`radio-${opt.value}`}
                disabled={itemDisabled}
                style={{
                  width: "1.125rem",
                  height: "1.125rem",
                  borderRadius: "var(--radius-full)",
                  border: "1.5px solid var(--color-border-hover)",
                  backgroundColor: "var(--color-surface)",
                  cursor: itemDisabled ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  outline: "none",
                  marginTop: "2px",
                }}
              >
                <RadixRadioGroup.Indicator
                  style={{
                    width: "0.55rem",
                    height: "0.55rem",
                    borderRadius: "var(--radius-full)",
                    backgroundColor: "var(--color-primary-600)",
                  }}
                />
              </RadixRadioGroup.Item>
              <div>
                <label
                  htmlFor={`radio-${opt.value}`}
                  style={{
                    fontSize: "var(--text-sm)",
                    color: itemDisabled ? "var(--color-text-muted)" : "var(--color-text)",
                    cursor: itemDisabled ? "not-allowed" : "pointer",
                    userSelect: "none",
                  }}
                >
                  {opt.label}
                </label>
                {opt.description && (
                  <div style={{ fontSize: "var(--text-xs)", color: "var(--color-text-secondary)" }}>
                    {opt.description}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </RadixRadioGroup.Root>
    </div>
  );
};
