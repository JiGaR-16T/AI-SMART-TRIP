import React from "react";
import { Check } from "lucide-react";

export interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  icon?: React.ReactNode;
  onSelect?: () => void;
}

export const Chip: React.FC<ChipProps> = ({
  children,
  selected = false,
  icon,
  onSelect,
  className = "",
  ...props
}) => {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={selected}
      onClick={onSelect}
      className={`chip ${selected ? "chip-selected" : ""} ${className}`.trim()}
      {...props}
    >
      {selected ? <Check size={12} strokeWidth={3} /> : icon}
      <span>{children}</span>
    </button>
  );
};

export interface ChipOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

export interface ChipGroupProps {
  options: ChipOption[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  multiSelect?: boolean;
  label?: string;
}

export const ChipGroup: React.FC<ChipGroupProps> = ({
  options,
  selectedValues,
  onChange,
  multiSelect = true,
  label,
}) => {
  const handleToggle = (value: string) => {
    if (multiSelect) {
      if (selectedValues.includes(value)) {
        onChange(selectedValues.filter((v) => v !== value));
      } else {
        onChange([...selectedValues, value]);
      }
    } else {
      onChange([value]);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
      {label && <span className="input-label">{label}</span>}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-2)" }}>
        {options.map((opt) => (
          <Chip
            key={opt.value}
            selected={selectedValues.includes(opt.value)}
            onSelect={() => handleToggle(opt.value)}
            icon={opt.icon}
          >
            {opt.label}
          </Chip>
        ))}
      </div>
    </div>
  );
};
