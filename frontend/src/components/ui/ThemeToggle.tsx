import React from "react";
import { useThemeStore } from "@/store/themeStore";
import { Sun, Moon, Laptop } from "lucide-react";

export const ThemeToggle: React.FC<{ showLabel?: boolean }> = ({ showLabel = false }) => {
  const { theme, setTheme, resolvedTheme } = useThemeStore();

  const nextTheme = theme === "light" ? "dark" : theme === "dark" ? "system" : "light";

  const icons: Record<string, React.ReactNode> = {
    light: <Sun size={16} />,
    dark: <Moon size={16} />,
    system: <Laptop size={16} />,
  };

  return (
    <button
      type="button"
      onClick={() => setTheme(nextTheme)}
      className="btn btn-sm btn-ghost"
      title={`Current theme: ${theme} (resolved: ${resolvedTheme}). Click to cycle.`}
      aria-label={`Toggle theme: currently ${theme}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-2)",
        padding: showLabel ? "0 var(--space-3)" : "0 var(--space-2)",
      }}
    >
      <span style={{ display: "flex", alignItems: "center" }}>
        {icons[theme]}
      </span>
      {showLabel && (
        <span style={{ fontSize: "var(--text-xs)", textTransform: "capitalize" }}>
          {theme}
        </span>
      )}
    </button>
  );
};
