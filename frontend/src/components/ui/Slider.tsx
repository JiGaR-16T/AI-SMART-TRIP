import React from "react";
import * as RadixSlider from "@radix-ui/react-slider";

export interface SliderProps {
  label?: string;
  value?: number[];
  defaultValue?: number[];
  onValueChange?: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  formatValue?: (val: number) => string;
}

export const Slider: React.FC<SliderProps> = ({
  label,
  value,
  defaultValue = [0],
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  formatValue = (v) => `${v}`,
}) => {
  const currentVal = value ? value[0] : defaultValue[0];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)", width: "100%" }}>
      {(label || currentVal !== undefined) && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {label && <span className="input-label" style={{ marginBottom: 0 }}>{label}</span>}
          <span style={{ fontSize: "var(--text-xs)", fontFamily: "var(--font-mono)", fontWeight: 600, color: "var(--color-primary-600)" }}>
            {formatValue(currentVal)}
          </span>
        </div>
      )}
      <RadixSlider.Root
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          userSelect: "none",
          touchAction: "none",
          width: "100%",
          height: "1.25rem",
        }}
      >
        <RadixSlider.Track
          style={{
            backgroundColor: "var(--color-neutral-200)",
            position: "relative",
            flexGrow: 1,
            borderRadius: "var(--radius-full)",
            height: "6px",
          }}
        >
          <RadixSlider.Range
            style={{
              position: "absolute",
              backgroundColor: "var(--color-primary-600)",
              borderRadius: "var(--radius-full)",
              height: "100%",
            }}
          />
        </RadixSlider.Track>
        <RadixSlider.Thumb
          aria-label={label || "Slider"}
          style={{
            display: "block",
            width: "1.125rem",
            height: "1.125rem",
            backgroundColor: "#ffffff",
            border: "2px solid var(--color-primary-600)",
            boxShadow: "var(--shadow-sm)",
            borderRadius: "var(--radius-full)",
            cursor: disabled ? "not-allowed" : "pointer",
            outline: "none",
            transition: "transform var(--duration-fast)",
          }}
        />
      </RadixSlider.Root>
    </div>
  );
};
