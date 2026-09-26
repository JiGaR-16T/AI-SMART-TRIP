import { describe, it, expect, beforeEach } from "vitest";
import { useThemeStore } from "@/store/themeStore";

describe("Theme Store (Zustand)", () => {
  beforeEach(() => {
    localStorage.clear();
    useThemeStore.getState().setTheme("light");
  });

  it("initializes with light or saved theme", () => {
    const state = useThemeStore.getState();
    expect(state.resolvedTheme).toBe("light");
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
  });

  it("updates theme and sets data-theme on <html>", () => {
    useThemeStore.getState().setTheme("dark");
    const state = useThemeStore.getState();
    expect(state.theme).toBe("dark");
    expect(state.resolvedTheme).toBe("dark");
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    expect(localStorage.getItem("travelmind-theme")).toBe("dark");
  });

  it("toggles between light and dark", () => {
    useThemeStore.getState().setTheme("light");
    useThemeStore.getState().toggleTheme();
    expect(useThemeStore.getState().resolvedTheme).toBe("dark");

    useThemeStore.getState().toggleTheme();
    expect(useThemeStore.getState().resolvedTheme).toBe("light");
  });
});
