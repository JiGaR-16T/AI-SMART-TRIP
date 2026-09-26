import React, { useState, useRef, useEffect } from "react";
import { Check, ChevronsUpDown, Search } from "lucide-react";

export interface ComboboxOption {
  value: string;
  label: string;
  description?: string;
}

export interface ComboboxProps {
  label?: string;
  placeholder?: string;
  options: ComboboxOption[];
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  error?: string;
}

export const Combobox: React.FC<ComboboxProps> = ({
  label,
  placeholder = "Select or search...",
  options,
  value,
  onChange,
  disabled = false,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  const filteredOptions = options.filter(
    (opt) =>
      opt.label.toLowerCase().includes(search.toLowerCase()) ||
      (opt.description && opt.description.toLowerCase().includes(search.toLowerCase()))
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full" ref={containerRef} style={{ position: "relative" }}>
      {label && <label className="input-label">{label}</label>}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className={`input-control ${error ? "has-error" : ""}`}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: disabled ? "not-allowed" : "pointer",
          textAlign: "left",
        }}
      >
        <span style={{ color: selectedOption ? "var(--color-text)" : "var(--color-text-muted)" }}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronsUpDown size={16} color="var(--color-text-secondary)" />
      </button>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            right: 0,
            backgroundColor: "var(--color-surface)",
            borderRadius: "var(--radius-xl)",
            border: "1px solid var(--color-border)",
            boxShadow: "var(--shadow-xl)",
            padding: "var(--space-2)",
            zIndex: "var(--z-dropdown)",
            maxHeight: "260px",
            overflowY: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-2)",
              padding: "0.4rem 0.6rem",
              borderBottom: "1px solid var(--color-border)",
              marginBottom: "var(--space-1)",
            }}
          >
            <Search size={14} color="var(--color-text-muted)" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
              style={{
                width: "100%",
                border: "none",
                outline: "none",
                background: "transparent",
                color: "var(--color-text)",
                fontSize: "var(--text-xs)",
              }}
            />
          </div>

          {filteredOptions.length === 0 ? (
            <div
              style={{
                padding: "var(--space-3)",
                textAlign: "center",
                fontSize: "var(--text-xs)",
                color: "var(--color-text-muted)",
              }}
            >
              No options found
            </div>
          ) : (
            filteredOptions.map((opt) => (
              <div
                key={opt.value}
                onClick={() => {
                  onChange?.(opt.value);
                  setIsOpen(false);
                  setSearch("");
                }}
                role="option"
                aria-selected={opt.value === value}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.5rem 0.75rem",
                  borderRadius: "var(--radius-md)",
                  fontSize: "var(--text-sm)",
                  cursor: "pointer",
                  backgroundColor: opt.value === value ? "var(--color-primary-50)" : "transparent",
                  color: opt.value === value ? "var(--color-primary-700)" : "var(--color-text)",
                }}
                onMouseEnter={(e) => {
                  if (opt.value !== value) e.currentTarget.style.backgroundColor = "var(--color-surface-hover)";
                }}
                onMouseLeave={(e) => {
                  if (opt.value !== value) e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <div>
                  <div style={{ fontWeight: opt.value === value ? 600 : 400 }}>{opt.label}</div>
                  {opt.description && (
                    <div style={{ fontSize: "var(--text-xs)", color: "var(--color-text-secondary)" }}>
                      {opt.description}
                    </div>
                  )}
                </div>
                {opt.value === value && <Check size={14} color="var(--color-primary-600)" />}
              </div>
            ))
          )}
        </div>
      )}
      {error && <div className="input-error-msg">{error}</div>}
    </div>
  );
};
