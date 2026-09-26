/**
 * Theme Store — Zustand store for theme management.
 *
 * Persists theme choice to localStorage.
 * Respects system preference on first visit (prefers-color-scheme).
 * Applies data-theme attribute to <html> for CSS variable switching.
 */
import { create } from "zustand";

export type Theme = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

interface ThemeState {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const STORAGE_KEY = "travelmind-theme";

function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined" || !window.matchMedia) return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function resolveTheme(theme: Theme): ResolvedTheme {
  return theme === "system" ? getSystemTheme() : theme;
}

function getSavedTheme(): Theme {
  if (typeof window === "undefined") return "system";
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "light" || saved === "dark" || saved === "system") return saved;
  return "system";
}

function applyTheme(resolved: ResolvedTheme) {
  document.documentElement.setAttribute("data-theme", resolved);
}

const initialTheme = getSavedTheme();
const initialResolved = resolveTheme(initialTheme);
applyTheme(initialResolved);

export const useThemeStore = create<ThemeState>((set) => ({
  theme: initialTheme,
  resolvedTheme: initialResolved,

  setTheme: (theme) => {
    const resolved = resolveTheme(theme);
    localStorage.setItem(STORAGE_KEY, theme);
    applyTheme(resolved);
    set({ theme, resolvedTheme: resolved });
  },

  toggleTheme: () => {
    set((state) => {
      const newTheme: Theme =
        state.resolvedTheme === "light" ? "dark" : "light";
      const resolved = resolveTheme(newTheme);
      localStorage.setItem(STORAGE_KEY, newTheme);
      applyTheme(resolved);
      return { theme: newTheme, resolvedTheme: resolved };
    });
  },
}));

// Listen for system preference changes when theme is "system"
if (typeof window !== "undefined" && typeof window.matchMedia === "function") {
  try {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", () => {
        const state = useThemeStore.getState();
        if (state.theme === "system") {
          const resolved = getSystemTheme();
          applyTheme(resolved);
          useThemeStore.setState({ resolvedTheme: resolved });
        }
      });
  } catch (_e) {}
}
