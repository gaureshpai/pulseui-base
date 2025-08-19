import React, { useEffect, type ReactNode } from "react";
import { initializeTheme, type ThemeMode } from "../../utils/themeUtils";

export interface SimpleThemeProviderProps {
  /** Default theme to use */
  defaultTheme?: ThemeMode;
  /** Whether to persist theme choice in localStorage */
  persistTheme?: boolean;
  /** Children to render */
  children: ReactNode;
}

/**
 * Simple theme provider that initializes CSS-based theming
 * No React Context needed - just initializes the theme and lets CSS handle the rest
 */
export const SimpleThemeProvider: React.FC<SimpleThemeProviderProps> = ({
  defaultTheme = "light",
  persistTheme = true,
  children,
}) => {
  useEffect(() => {
    if (persistTheme) {
      initializeTheme(defaultTheme);
    } else {
      // Just set the theme without persisting
      document.documentElement.setAttribute("data-theme", defaultTheme);
    }
  }, [defaultTheme, persistTheme]);

  return <>{children}</>;
};

