import React from "react";
import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

export interface CheckboxProps {
  id?: string;
  label?: React.ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  required?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  label,
  checked,
  defaultChecked,
  onCheckedChange,
  disabled = false,
  required = false,
}) => {
  const checkboxId = id || (typeof label === "string" ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-2-5, 0.625rem)" }}>
      <RadixCheckbox.Root
        id={checkboxId}
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={(c) => onCheckedChange?.(Boolean(c))}
        disabled={disabled}
        required={required}
        style={{
          width: "1.125rem",
          height: "1.125rem",
          borderRadius: "var(--radius-sm)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1.5px solid var(--color-border-hover)",
          backgroundColor: checked ? "var(--color-primary-600)" : "var(--color-surface)",
          cursor: disabled ? "not-allowed" : "pointer",
          transition: "all var(--duration-fast)",
        }}
      >
        <RadixCheckbox.Indicator>
          <Check size={12} strokeWidth={3} color="#ffffff" />
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
      {label && (
        <label
          htmlFor={checkboxId}
          style={{
            fontSize: "var(--text-sm)",
            color: disabled ? "var(--color-text-muted)" : "var(--color-text)",
            cursor: disabled ? "not-allowed" : "pointer",
            userSelect: "none",
          }}
        >
          {label}
        </label>
      )}
    </div>
  );
};
