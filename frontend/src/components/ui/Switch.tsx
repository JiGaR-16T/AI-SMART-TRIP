import React from "react";
import * as RadixSwitch from "@radix-ui/react-switch";

export interface SwitchProps {
  id?: string;
  label?: React.ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
}

export const Switch: React.FC<SwitchProps> = ({
  id,
  label,
  checked,
  defaultChecked,
  onCheckedChange,
  disabled = false,
}) => {
  const switchId = id || (typeof label === "string" ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-3)" }}>
      <RadixSwitch.Root
        id={switchId}
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        style={{
          width: "2.6rem",
          height: "1.45rem",
          backgroundColor: checked ? "var(--color-primary-600)" : "var(--color-neutral-300)",
          borderRadius: "var(--radius-full)",
          position: "relative",
          cursor: disabled ? "not-allowed" : "pointer",
          outline: "none",
          transition: "background-color var(--duration-fast)",
          border: "none",
          padding: 0,
        }}
      >
        <RadixSwitch.Thumb
          style={{
            display: "block",
            width: "1.2rem",
            height: "1.2rem",
            backgroundColor: "#ffffff",
            borderRadius: "var(--radius-full)",
            boxShadow: "var(--shadow-sm)",
            transition: "transform var(--duration-fast)",
            transform: checked ? "translateX(1.25rem)" : "translateX(0.15rem)",
          }}
        />
      </RadixSwitch.Root>
      {label && (
        <label
          htmlFor={switchId}
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
