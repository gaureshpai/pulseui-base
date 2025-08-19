// Simple theme utilities to replace React Context
// This provides the same functionality without the complexity

export type ThemeMode = "light" | "dark";
export type ThemeName = "default-light" | "default-dark";

// Get current theme from DOM
export const getCurrentTheme = (): ThemeMode => {
  return (
    (document.documentElement.getAttribute("data-theme") as ThemeMode) ||
    "light"
  );
};

// Check if current theme is dark
export const isDark = (): boolean => {
  return getCurrentTheme() === "dark";
};

// Check if current theme is light
export const isLight = (): boolean => {
  return getCurrentTheme() === "light";
};

// Set theme (updates DOM and localStorage)
export const setTheme = (theme: ThemeMode): void => {
  document.documentElement.setAttribute("data-theme", theme);

  try {
    localStorage.setItem("pulseui-theme", theme);
  } catch (error) {
    console.warn("Failed to save theme to localStorage:", error);
  }
};

// Toggle between light and dark
export const toggleTheme = (): void => {
  const currentTheme = getCurrentTheme();
  const newTheme: ThemeMode = currentTheme === "dark" ? "light" : "dark";
  setTheme(newTheme);
};

// Initialize theme from localStorage
export const initializeTheme = (defaultTheme: ThemeMode = "light"): void => {
  try {
    const saved = localStorage.getItem("pulseui-theme") as ThemeMode;
    if (saved && (saved === "light" || saved === "dark")) {
      setTheme(saved);
    } else {
      setTheme(defaultTheme);
    }
  } catch (error) {
    console.warn("Failed to load theme from localStorage:", error);
    setTheme(defaultTheme);
  }
};

// Get theme name for compatibility
export const getThemeName = (): ThemeName => {
  const mode = getCurrentTheme();
  return mode === "dark" ? "default-dark" : "default-light";
};

// Get theme mode for compatibility
export const getThemeMode = (): ThemeMode => {
  return getCurrentTheme();
};
