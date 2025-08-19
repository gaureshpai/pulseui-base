import React, { type ReactNode } from "react";
import { type ThemeMode } from "../../utils/themeUtils";
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
export declare const SimpleThemeProvider: React.FC<SimpleThemeProviderProps>;
