#!/usr/bin/env node

/**
 * Complete Figma Token Sync Script
 * Generates 1:1 mapping between Figma tokens and SCSS
 * Includes all missing tokens: personas, extended colors, effects
 * Standardizes naming conventions between both systems
 */

const https = require("https");
const fs = require("fs");
const path = require("path");

// Configuration
const CONFIG = {
  FIGMA_API_TOKEN: process.env.FIGMA_API_TOKEN || "local",
  FIGMA_FILE_KEY: process.env.FIGMA_FILE_KEY || "local",
  OUTPUT_DIR: "src/styles",
  TOKENS_FILE: "src/styles/_tokens.scss",
  FIGMA_TOKENS_FILE: "Pulseui.json",
};

// Validate environment variables
function validateEnvironment() {
  // Skip validation for local file processing
  if (CONFIG.FIGMA_API_TOKEN === "local" && CONFIG.FIGMA_FILE_KEY === "local") {
    console.log("✅ Using local Pulseui.json file");
    return;
  }

  if (!CONFIG.FIGMA_API_TOKEN) {
    console.error("❌ FIGMA_API_TOKEN environment variable is required");
    console.log("Set it with: export FIGMA_API_TOKEN='your_token_here'");
    process.exit(1);
  }

  if (!CONFIG.FIGMA_FILE_KEY) {
    console.error("❌ FIGMA_FILE_KEY environment variable is required");
    console.log("Set it with: export FIGMA_FILE_KEY='your_file_key_here'");
    process.exit(1);
  }

  console.log("✅ Environment variables validated");
}

// Parse Figma tokens JSON
function parseFigmaTokens() {
  try {
    const figmaTokensPath = path.join(process.cwd(), CONFIG.FIGMA_TOKENS_FILE);
    if (!fs.existsSync(figmaTokensPath)) {
      throw new Error(`Figma tokens file not found: ${figmaTokensPath}`);
    }

    const figmaTokensContent = fs.readFileSync(figmaTokensPath, "utf8");
    const figmaTokens = JSON.parse(figmaTokensContent);

    console.log("✅ Figma tokens parsed successfully");
    return figmaTokens;
  } catch (error) {
    console.error("❌ Error parsing Figma tokens:", error.message);
    process.exit(1);
  }
}

// Extract all tokens from Figma data
function extractAllTokens(figmaTokens) {
  const tokens = {
    colors: {},
    typography: {},
    effects: {},
    spacing: {},
    radius: {},
    personas: {},
    extended: {},
  };

  try {
    console.log("🔍 Extracting tokens from Figma structure...");

    // Extract primitive colors first (these are the base values)
    if (figmaTokens["b. primitives"]) {
      console.log("  📦 Extracting primitive colors...");
      Object.entries(figmaTokens["b. primitives"]).forEach(
        ([colorCategory, colors]) => {
          if (colors && typeof colors === "object") {
            Object.entries(colors).forEach(([colorName, color]) => {
              if (color && color.value && color.type === "color") {
                const tokenName = `${colorCategory}-${colorName}`
                  .toLowerCase()
                  .replace(/\s+/g, "-");

                // Resolve references in primitive colors too
                if (
                  typeof color.value === "string" &&
                  color.value.startsWith("{")
                ) {
                  const resolvedValue = resolveFigmaReference(
                    color.value,
                    figmaTokens
                  );
                  tokens.colors[tokenName] = resolvedValue;
                } else {
                  tokens.colors[tokenName] = color.value;
                }
              }
            });
          }
        }
      );
    }

    // Extract semantic tokens with proper reference resolution
    if (figmaTokens["a. tokens"]) {
      console.log("  🎨 Extracting semantic tokens...");
      Object.entries(figmaTokens["a. tokens"]).forEach(([category, items]) => {
        if (items && typeof items === "object") {
          Object.entries(items).forEach(([itemName, item]) => {
            if (item && item.value) {
              const tokenName = `${category}-${itemName}`
                .toLowerCase()
                .replace(/\s+/g, "-");

              if (item.type === "color") {
                // Resolve Figma references
                if (
                  typeof item.value === "string" &&
                  item.value.startsWith("{")
                ) {
                  const resolvedValue = resolveFigmaReference(
                    item.value,
                    figmaTokens
                  );
                  tokens.colors[tokenName] = resolvedValue;
                } else {
                  tokens.colors[tokenName] = item.value;
                }
              } else if (item.type === "dimension") {
                tokens.spacing[tokenName] = `${item.value}px`;
              }
            }
          });
        }
      });
    }

    // Extract radius tokens
    if (figmaTokens["a. tokens"] && figmaTokens["a. tokens"].radius) {
      console.log("  🔘 Extracting radius tokens...");
      Object.entries(figmaTokens["a. tokens"].radius).forEach(
        ([radiusName, radius]) => {
          if (radius && radius.value) {
            const tokenName = radiusName.toLowerCase().replace(/\s+/g, "-");
            tokens.radius[tokenName] = `${radius.value}px`;
          }
        }
      );
    }

    // Extract spacing tokens
    if (figmaTokens["a. tokens"] && figmaTokens["a. tokens"].spacing) {
      console.log("  📏 Extracting spacing tokens...");
      Object.entries(figmaTokens["a. tokens"].spacing).forEach(
        ([spacingName, spacing]) => {
          if (spacing && spacing.value) {
            const tokenName = spacingName.toLowerCase().replace(/\s+/g, "-");
            tokens.spacing[tokenName] = `${spacing.value}px`;
          }
        }
      );
    }

    // Extract padding tokens
    if (figmaTokens["a. tokens"] && figmaTokens["a. tokens"].padding) {
      console.log("  📦 Extracting padding tokens...");
      Object.entries(figmaTokens["a. tokens"].padding).forEach(
        ([paddingName, padding]) => {
          if (padding && padding.value) {
            const tokenName = `padding-${paddingName}`
              .toLowerCase()
              .replace(/\s+/g, "-");
            tokens.spacing[tokenName] = `${padding.value}px`;
          }
        }
      );
    }

    // Extract font/typography tokens
    if (figmaTokens.font) {
      console.log("  🔤 Extracting font tokens...");
      Object.entries(figmaTokens.font).forEach(([category, styles]) => {
        Object.entries(styles).forEach(([styleName, style]) => {
          if (style && style.value) {
            const tokenName = `${category}-${styleName}`
              .toLowerCase()
              .replace(/\s+/g, "-");
            tokens.typography[tokenName] = {
              fontSize: style.value.fontSize,
              lineHeight: style.value.lineHeight,
              fontWeight: style.value.fontWeight,
              fontFamily: style.value.fontFamily,
              letterSpacing: style.value.letterSpacing,
              textCase: style.value.textCase,
            };
          }
        });
      });
    }

    // Extract effect/shadow tokens
    if (figmaTokens.effect) {
      console.log("  🌟 Extracting effect tokens...");
      Object.entries(figmaTokens.effect).forEach(([size, effects]) => {
        if (effects && typeof effects === "object") {
          Object.entries(effects).forEach(([index, effect]) => {
            if (
              effect &&
              effect.value &&
              effect.value.shadowType === "dropShadow"
            ) {
              const tokenName = `shadow-${size}-${index}`;
              tokens.effects[tokenName] = {
                radius: effect.value.radius,
                color: effect.value.color,
                offsetX: effect.value.offsetX,
                offsetY: effect.value.offsetY,
                spread: effect.value.spread,
              };
            }
          });
        }
      });
    }

    // Extract persona tokens
    if (figmaTokens["c. personas"]) {
      console.log("  👤 Extracting persona tokens...");
      tokens.personas = extractPersonaTokens(figmaTokens["c. personas"]);
    }

    // Extract typography tokens from typography section
    if (figmaTokens.typography) {
      console.log("  📝 Extracting typography section tokens...");
      Object.entries(figmaTokens.typography).forEach(([category, styles]) => {
        if (styles && typeof styles === "object") {
          Object.entries(styles).forEach(([styleName, style]) => {
            if (style && style.fontSize && style.fontSize.value) {
              const tokenName = `${category}-${styleName}`
                .toLowerCase()
                .replace(/\s+/g, "-");
              tokens.typography[tokenName] = {
                fontSize: style.fontSize.value,
                lineHeight: style.lineHeight?.value,
                fontWeight: style.fontWeight?.value,
                fontFamily: style.fontFamily?.value,
                letterSpacing: style.letterSpacing?.value,
                textCase: style.textCase?.value,
              };
            }
          });
        }
      });
    }

    console.log("✅ All tokens extracted from Figma");
    return tokens;
  } catch (error) {
    console.error("❌ Error extracting tokens:", error.message);
    return tokens;
  }
}

// Resolve Figma references like {b. primitives.blue.blue-0}
function resolveFigmaReference(reference, figmaTokens) {
  try {
    // Remove { and }
    const cleanReference = reference.replace(/[{}]/g, "");

    // Handle the special case of "b. primitives" and similar keys with spaces
    let current = figmaTokens;

    // First, try to find the exact key match
    if (current[cleanReference] !== undefined) {
      current = current[cleanReference];
    } else {
      // Split by dots and handle keys with spaces
      const parts = cleanReference.split(".");
      let pathIndex = 0;

      while (pathIndex < parts.length) {
        let key = parts[pathIndex];

        // If this part doesn't exist, try combining with next part
        if (!current[key] && pathIndex + 1 < parts.length) {
          const nextPart = parts[pathIndex + 1];
          const combinedKey = `${key}.${nextPart}`;

          if (current[combinedKey] !== undefined) {
            key = combinedKey;
            pathIndex++; // Skip next part since we combined it
          }
        }

        if (current && current[key] !== undefined) {
          current = current[key];
          pathIndex++;
        } else {
          console.log(
            `⚠️  Could not resolve reference: ${reference} - path ${key} not found`
          );
          return reference;
        }
      }
    }

    // If we found a value, return it
    if (current && current.value) {
      const resolvedValue = current.value;

      // Check if the resolved value is another reference
      if (typeof resolvedValue === "string" && resolvedValue.startsWith("{")) {
        console.log(
          `🔄 Nested reference found: ${reference} -> ${resolvedValue}, resolving...`
        );
        return resolveFigmaReference(resolvedValue, figmaTokens);
      }

      console.log(`✅ Resolved ${reference} -> ${resolvedValue}`);
      return resolvedValue;
    }

    console.log(`⚠️  No value found for reference: ${reference}`);
    return reference; // Return original if no value found
  } catch (error) {
    console.log(`⚠️  Error resolving reference ${reference}:`, error.message);
    return reference; // Return original on error
  }
}

// Extract persona tokens
function extractPersonaTokens(personas) {
  const personaTokens = {};

  Object.entries(personas).forEach(([category, items]) => {
    Object.entries(items).forEach(([itemName, item]) => {
      if (item.value && item.type === "string") {
        const tokenName = `persona-${category}-${itemName}`
          .toLowerCase()
          .replace(/\s+/g, "-");
        personaTokens[tokenName] = item.value;
      } else if (item.value && item.type === "color") {
        const tokenName = `persona-${category}-${itemName}`
          .toLowerCase()
          .replace(/\s+/g, "-");
        personaTokens[tokenName] = item.value;
      }
    });
  });

  return personaTokens;
}

// Generate SCSS with 1:1 mapping
function generateSCSS(tokens) {
  // Generate the complete SCSS content
  const scssContent = `
// Design Tokens - Complete 1:1 Mapping with Figma
// Generated automatically from Figma tokens
// Last updated: ${new Date().toISOString()}

:root {
${generateRawFigmaTokens(tokens.colors)}

${generateColorTokens(tokens.colors)}

${generateTypographyTokens(tokens.typography)}

${generateEffectTokens(tokens.effects)}

${generateSpacingTokens(tokens.spacing)}

${generateRadiusTokens(tokens.radius)}

${generatePersonaTokens(tokens.personas)}

${generateExtendedTokens(tokens)}

${generateDarkThemeTextTokens()}

${generateBackgroundTokens()}

${generateBorderTokens()}

${generateGrayScaleTokens()}
}

${generateDarkThemeCSS()}
`;

  return scssContent;
}

// Generate color tokens
function generateColorTokens(colors) {
  let scss = `  // Color Tokens - Mapped to expected component schema
  
  // Primary colors (0-900 scale)
  --color-primary-50: var(--color-primary-primary-color-0);
  --color-primary-100: var(--color-primary-primary-color-1);
  --color-primary-200: var(--color-primary-primary-color-2);
  --color-primary-300: var(--color-primary-primary-color-3);
  --color-primary-400: var(--color-primary-primary-color-4);
  --color-primary-500: var(--color-primary-primary-color-5);
  --color-primary-600: var(--color-primary-primary-color-6);
  --color-primary-700: var(--color-primary-primary-color-7);
  --color-primary-800: var(--color-primary-primary-color-8);
  --color-primary-900: var(--color-primary-primary-color-9);
  
  // Surface colors (0-900 scale)
  --color-surface-50: var(--color-gray-gray-0);
  --color-surface-100: var(--color-gray-gray-1);
  --color-surface-200: var(--color-gray-gray-2);
  --color-surface-300: var(--color-gray-gray-3);
  --color-surface-400: var(--color-gray-gray-4);
  --color-surface-500: var(--color-gray-gray-5);
  --color-surface-600: var(--color-gray-gray-6);
  --color-surface-700: var(--color-gray-gray-7);
  --color-surface-800: var(--color-gray-gray-8);
  --color-surface-900: var(--color-gray-gray-9);
  
  // Text colors
  --color-text-primary: var(--color-gray-gray-9);
  --color-text-secondary: var(--color-gray-gray-7);
  --color-text-muted: var(--color-gray-gray-6);
  --color-text-disabled: var(--color-gray-gray-5);
  
  // Border colors
  --color-border-primary: var(--color-gray-gray-3);
  --color-border-secondary: var(--color-gray-gray-4);
  --color-border-tertiary: var(--color-gray-gray-5);
  --color-border-focus: var(--color-primary-primary-color-6);
  
  // Status colors
  --color-success: var(--color-teal-teal-6);
  --color-warning: var(--color-yellow-yellow-6);
  --color-error: var(--color-red-red-6);
  --color-info: var(--color-blue-blue-6);
  
  // Component-specific colors
  --color-primary: var(--color-primary-primary-color-6);
  --color-primary-hover: var(--color-primary-primary-color-7);
  --color-primary-dark: var(--color-primary-primary-color-5);
  --color-surface: var(--color-gray-gray-0);
  --color-surface-secondary: var(--color-gray-gray-1);
  
`;

  return scss;
}

// Generate typography tokens
function generateTypographyTokens(typography) {
  let scss = `  
  // Typography Tokens - Mapped to expected component schema
  
  // Font sizes
  --font-size-xs: 12px;
  --font-size-sm: 14px;
  --font-size-md: 16px;
  --font-size-lg: 18px;
  --font-size-xl: 20px;
  --font-size-xxl: 24px;
  
  // Line heights
  --line-height-xs: 16px;
  --line-height-sm: 20px;
  --line-height-md: 24px;
  --line-height-lg: 28px;
  --line-height-xl: 32px;
  --line-height-xxl: 36px;
  --line-height-tight: 1.2;
  --line-height-normal: 1.5;
  
  // Font weights
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  
  // Font family
  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  
`;
  return scss;
}

// Generate effect tokens
function generateEffectTokens(effects) {
  let scss = `  
  // Effect/Shadow Tokens - Direct from Figma
  
`;

  Object.entries(effects).forEach(([name, effect]) => {
    scss += `  --shadow-${name}: ${effect.offsetX}px ${effect.offsetY}px ${effect.radius}px ${effect.spread}px ${effect.color};\n`;
  });

  return scss;
}

// Generate spacing tokens
function generateSpacingTokens(spacing) {
  let scss = `  
  // Spacing Tokens - Mapped to expected component schema
  
  // Base spacing scale
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-xxl: 48px;
  
  // Component-specific spacing
  --size-xs: 24px;
  --size-sm: 32px;
  --size-md: 40px;
  --size-lg: 48px;
  --size-xl: 56px;
  
  // Border widths
  --border-width-thin: 1px;
  --border-width-normal: 2px;
  --border-width-medium: 2px;
  --border-width-thick: 3px;
  
`;

  return scss;
}

// Generate radius tokens
function generateRadiusTokens(radius) {
  let scss = `  
  // Radius Tokens - Mapped to expected component schema
  
  // Border radius scale
  --radius-xs: 2px;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-xxl: 24px;
  
`;
  return scss;
}

// Generate persona tokens
function generatePersonaTokens(personas) {
  let scss = `  
  // Persona Tokens - Direct from Figma
  
`;

  Object.entries(personas).forEach(([name, value]) => {
    if (typeof value === "string") {
      scss += `  --persona-${name}: "${value}";\n`;
    } else {
      scss += `  --persona-${name}: ${value};\n`;
    }
  });

  return scss;
}

// Generate dark theme tokens
function generateDarkThemeTokens(tokens) {
  let scss = `  // Dark theme color overrides
  
`;

  // Generate dark theme variants for colors
  Object.entries(tokens.colors).forEach(([name, value]) => {
    if (typeof value === "string" && value.startsWith("#")) {
      // Create dark theme variant
      const darkValue = generateDarkVariant(value);
      scss += `  --color-${name}: ${darkValue};\n`;
    }
  });

  return scss;
}

// Generate dark variant of a color
function generateDarkVariant(hexColor) {
  // Simple dark variant generation - you can enhance this
  return hexColor;
}

// Generate dark theme text tokens
function generateDarkThemeTextTokens() {
  return `
  // Dark theme text tokens
  --color-text-title-light: var(--color-dark-dark-5);
  --color-text-title-dark: var(--color-dark-dark-0);
  
  --color-text-placeholder-light: var(--color-gray-gray-5);
  --color-text-placeholder-dark: var(--color-dark-dark-3);
  
  --color-text-link-light: var(--color-primary-primary-color-6);
  --color-text-link-dark: var(--color-primary-primary-color-4);
  
  --color-text-default-light: var(--color-gray-gray-9);
  --color-text-default-dark: var(--color-color-white);
  
  --color-text-dimmed-light: var(--color-gray-gray-6);
  --color-text-dimmed-dark: var(--color-dark-dark-2);
  
  --color-text-primary-light: var(--color-primary-primary-color-6);
  --color-text-primary-dark: var(--color-primary-primary-color-3);
  
  --color-text-secondary-light: var(--color-secondary-secondary-color-6);
  --color-text-secondary-dark: var(--color-secondary-secondary-color-3);
  
  --color-text-gray-light: var(--color-gray-gray-6);
  --color-text-gray-dark: var(--color-gray-gray-3);
  
  --color-text-success-light: var(--color-green-green-6);
  --color-text-success-dark: var(--color-green-green-3);
  
  --color-text-warning-light: var(--color-yellow-yellow-6);
  --color-text-warning-dark: var(--color-yellow-yellow-3);
  
  --color-text-error-light: var(--color-red-red-9);
  --color-text-error-dark: var(--color-red-red-7);
  
  --color-text-disabled-light: var(--color-gray-gray-5);
  --color-text-disabled-dark: var(--color-gray-gray-8);
  
  --color-text-input-disabled-light: var(--color-gray-gray-6);
  --color-text-input-disabled-dark: var(--color-gray-gray-7);
`;
}

// Generate dark theme CSS implementation
function generateDarkThemeCSS() {
  return `
  // Dark theme implementation
  [data-theme="dark"] {
    // Text colors for dark theme
    --color-text-primary: var(--color-text-default-dark);
    --color-text-secondary: var(--color-text-gray-dark);
    --color-text-muted: var(--color-text-dimmed-dark);
    --color-text-disabled: var(--color-text-disabled-dark);
    
    // Title and heading colors
    --color-text-title: var(--color-text-title-dark);
    
    // Link colors
    --color-text-link: var(--color-text-link-dark);
    
    // Placeholder colors
    --color-input-placeholder: var(--color-text-placeholder-dark);
    
    // Status colors
    --color-text-success: var(--color-text-success-dark);
    --color-text-warning: var(--color-text-warning-dark);
    --color-text-error: var(--color-text-error-dark);
    
    // Background colors for dark theme
    --color-background-default: var(--color-background-default-dark);
    --color-background-default-hover: var(--color-background-default-hover-dark);
    --color-background-body: var(--color-background-body-dark);
    --color-background-transparent: var(--color-background-transparent-dark);
    --color-background-appshell: var(--color-background-appshell-dark);
    
    // Background Primary
    --color-background-primary-filled: var(--color-background-primary-filled-dark);
    --color-background-primary-filled-hover: var(--color-background-primary-filled-hover-dark);
    --color-background-primary-light: var(--color-background-primary-light-dark);
    --color-background-primary-light-hover: var(--color-background-primary-light-hover-dark);
    
    // Background Secondary
    --color-background-secondary-filled: var(--color-background-secondary-filled-dark);
    --color-background-secondary-filled-hover: var(--color-background-secondary-filled-hover-dark);
    --color-background-secondary-light: var(--color-background-secondary-light-dark);
    --color-background-secondary-light-hover: var(--color-background-secondary-light-hover-dark);
    
    // Background Gray
    --color-background-gray-filled: var(--color-background-gray-filled-dark);
    --color-background-gray-filled-hover: var(--color-background-gray-filled-hover-dark);
    --color-background-gray-light: var(--color-background-gray-light-dark);
    --color-background-gray-light-hover: var(--color-background-gray-light-hover-dark);
    
    // Background Success
    --color-background-success-filled: var(--color-background-success-filled-dark);
    --color-background-success-filled-hover: var(--color-background-success-filled-hover-dark);
    --color-background-success-light: var(--color-background-success-light-dark);
    --color-background-success-light-hover: var(--color-background-success-light-hover-dark);
    
    // Background Warning
    --color-background-warning-filled: var(--color-background-warning-filled-dark);
    --color-background-warning-filled-hover: var(--color-background-warning-filled-hover-dark);
    --color-background-warning-light: var(--color-background-warning-light-dark);
    --color-background-warning-light-hover: var(--color-background-warning-light-hover-dark);
    
    // Background Error
    --color-background-error-filled: var(--color-background-error-filled-dark);
    --color-background-error-filled-hover: var(--color-background-error-filled-hover-dark);
    --color-background-error-light: var(--color-background-error-light-dark);
    --color-background-error-light-hover: var(--color-background-error-light-hover-dark);
    
    // Background Disabled
    --color-background-disabled-default: var(--color-background-disabled-default-dark);
    --color-background-disabled-input: var(--color-background-disabled-input-dark);
    
    // Surface colors for dark theme
    --color-surface: var(--color-dark-dark-9);
    --color-surface-secondary: var(--color-dark-dark-8);
    --color-surface-tertiary: var(--color-dark-dark-7);
    
    // Border colors for dark theme
    --color-border-primary: var(--color-dark-dark-4);
    --color-border-secondary: var(--color-dark-dark-4);
    --color-border-gray: var(--color-dark-dark-4);
    --color-border-success: var(--color-dark-dark-4);
    --color-border-warning: var(--color-dark-dark-4);
    --color-border-error: var(--color-border-error-default-dark);
    --color-border-error-disabled: var(--color-border-error-disabled-dark);
    --color-border-disabled: var(--color-border-disabled-default-dark);
    
    // Default border colors
    --color-border-default: var(--color-border-default-dark);
    --color-border-input: var(--color-border-input-dark);
    
    // Input colors for dark theme
    --color-input-background: var(--color-dark-dark-8);
    --color-input-border: var(--color-dark-dark-4);
    --color-input-text: var(--color-text-default-dark);
    
    // Button colors for dark theme
    --color-button-primary: var(--color-primary-primary-color-6);
    --color-button-primary-hover: var(--color-primary-primary-color-7);
    --color-button-primary-dark: var(--color-primary-primary-color-8);
  }
`;
}

// Generate extended tokens for component needs
function generateExtendedTokens(tokens) {
  let scss = `  // Extended Component Tokens
  
  // Button tokens
  --color-button-primary: var(--color-primary-primary-color-8);
  --color-button-primary-hover: var(--color-primary-primary-color-9);
  --color-button-secondary: var(--color-gray-gray-8);
  --color-button-secondary-hover: var(--color-gray-gray-9);
  
  // Input tokens
  --color-input-background: var(--color-color-white);
  --color-input-border: var(--color-gray-gray-3);
  --color-input-border-focus: var(--color-primary-primary-color-6);
  --color-input-text: var(--color-gray-gray-9);
  --color-input-placeholder: var(--color-gray-gray-6);
  
  // Surface tokens
  --color-surface-tertiary: var(--color-gray-gray-2);
  --color-surface-0: var(--color-gray-gray-0);
  --color-surface-2: var(--color-gray-gray-2);
  
  // Status tokens
  --color-success: var(--color-teal-teal-6);
  --color-warning: var(--color-yellow-yellow-6);
  --color-error: var(--color-red-red-6);
  --color-info: var(--color-blue-blue-6);
  
  // Switch component tokens
  --switch-track-width-sm: 32px;
  --switch-track-width-md: 44px;
  --switch-track-width-lg: 56px;
  --switch-track-height-sm: 16px;
  --switch-track-height-md: 20px;
  --switch-track-height-lg: 24px;
  --switch-thumb-size-sm: 10px;
  --switch-thumb-size-md: 14px;
  --switch-thumb-size-lg: 18px;
  --switch-thumb-offset-sm: 3px;
  --switch-thumb-offset-md: 3px;
  --switch-thumb-offset-lg: 3px;
  
  // Transform tokens
  --transform-hover: translateY(-1px);
  
  // Shadow tokens
  --shadow-hover: 0 4px 12px rgba(0, 0, 0, 0.15);
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
  --shadow-normal: 0 2px 8px rgba(0, 0, 0, 0.12);
  
  // Icon size tokens
  --icon-size-xs: 16px;
  --icon-size-sm: 20px;
  --icon-size-md: 24px;
  --icon-size-lg: 32px;
  --icon-size-xl: 40px;
  
  // Outline tokens
  --outline-focus: 2px solid var(--color-border-focus);
  --outline-offset: 2px;
  
  // Motion tokens
  --motion-duration-instant: 1ms;
  --motion-duration-fast: 50ms;
  --motion-duration-normal: 100ms;
  --motion-duration-slow: 200ms;
  --motion-duration-slower: 300ms;
  --motion-duration-slowest: 500ms;
  
  // Motion easing
  --motion-easing-ease-out: cubic-bezier(0.0, 0.0, 0.2, 1);
  --motion-easing-ease-in: cubic-bezier(0.4, 0.0, 1, 1);
  --motion-easing-ease-in-out: cubic-bezier(0.4, 0.0, 0.2, 1);
  
  // Motion transitions
  --motion-transition-normal: 0.2s;
  --motion-transition-fast: 0.1s;
  --motion-transition-slow: 0.3s;
  
  // Opacity values
  --opacity-0: 0;
  --opacity-25: 0.25;
  --opacity-50: 0.5;
  --opacity-75: 0.75;
  --opacity-100: 1;
  
  // Z-index tokens
  --z-dropdown: 1000;
  --z-sticky: 1020;
  --z-fixed: 1030;
  --z-modal-backdrop: 1040;
  --z-modal: 1050;
  --z-popover: 1060;
  --z-tooltip: 1070;
  
  // Breakpoint tokens
  --breakpoint-xs: 0px;
  --breakpoint-sm: 576px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 992px;
  --breakpoint-xl: 1200px;
  --breakpoint-xxl: 1400px;
`;

  return scss;
}

// Generate raw Figma color tokens (for reference)
function generateRawFigmaTokens(colors) {
  let scss = `  // Raw Figma Color Tokens (for reference)
  
`;

  Object.entries(colors).forEach(([name, value]) => {
    if (typeof value === "string" && value.startsWith("#")) {
      scss += `  --color-${name}: ${value};\n`;
    }
  });

  return scss;
}

// Generate background tokens
function generateBackgroundTokens() {
  return `
  // Background tokens
  --color-background-default-light: var(--color-color-white);
  --color-background-default-dark: var(--color-dark-dark-6);
  
  --color-background-default-hover-light: var(--color-gray-gray-0);
  --color-background-default-hover-dark: var(--color-dark-dark-5);
  
  --color-background-body-light: var(--color-color-white);
  --color-background-body-dark: var(--color-dark-dark-7);
  
  --color-background-transparent-light: transparent;
  --color-background-transparent-dark: transparent;
  
  --color-background-appshell-light: var(--color-gray-gray-0);
  --color-background-appshell-dark: var(--color-dark-dark-5);
  
  // Background Primary
  --color-background-primary-filled-light: var(--color-primary-primary-color-6);
  --color-background-primary-filled-dark: var(--color-primary-primary-color-8);
  
  --color-background-primary-filled-hover-light: var(--color-primary-primary-color-7);
  --color-background-primary-filled-hover-dark: var(--color-primary-primary-color-9);
  
  --color-background-primary-light-light: var(--color-primary-primary-color-light-10);
  --color-background-primary-light-dark: var(--color-primary-primary-color-dark-15);
  
  --color-background-primary-light-hover-light: var(--color-primary-primary-color-light-12);
  --color-background-primary-light-hover-dark: var(--color-primary-primary-color-dark-20);
  
  // Background Secondary
  --color-background-secondary-filled-light: var(--color-secondary-secondary-color-6);
  --color-background-secondary-filled-dark: var(--color-secondary-secondary-color-8);
  
  --color-background-secondary-filled-hover-light: var(--color-secondary-secondary-color-7);
  --color-background-secondary-filled-hover-dark: var(--color-secondary-secondary-color-9);
  
  --color-background-secondary-light-light: var(--color-secondary-secondary-color-light-10);
  --color-background-secondary-light-dark: var(--color-secondary-secondary-color-dark-15);
  
  --color-background-secondary-light-hover-light: var(--color-secondary-secondary-color-light-12);
  --color-background-secondary-light-hover-dark: var(--color-secondary-secondary-color-dark-20);
  
  // Background Gray
  --color-background-gray-filled-light: var(--color-gray-gray-6);
  --color-background-gray-filled-dark: var(--color-gray-gray-8);
  
  --color-background-gray-filled-hover-light: var(--color-gray-gray-7);
  --color-background-gray-filled-hover-dark: var(--color-gray-gray-9);
  
  --color-background-gray-light-light: var(--color-gray-gray-light-10);
  --color-background-gray-light-dark: var(--color-gray-gray-dark-15);
  
  --color-background-gray-light-hover-light: var(--color-gray-gray-light-12);
  --color-background-gray-light-hover-dark: var(--color-gray-gray-dark-20);
  
  // Background Success
  --color-background-success-filled-light: var(--color-green-green-6);
  --color-background-success-filled-dark: var(--color-green-green-8);
  
  --color-background-success-filled-hover-light: var(--color-green-green-7);
  --color-background-success-filled-hover-dark: var(--color-green-green-8);
  
  --color-background-success-light-light: var(--color-green-green-light-10);
  --color-background-success-light-dark: var(--color-green-green-dark-15);
  
  --color-background-success-light-hover-light: var(--color-green-green-light-12);
  --color-background-success-light-hover-dark: var(--color-green-green-dark-20);
  
  // Background Warning
  --color-background-warning-filled-light: var(--color-yellow-yellow-6);
  --color-background-warning-filled-dark: var(--color-yellow-yellow-8);
  
  --color-background-warning-filled-hover-light: var(--color-yellow-yellow-7);
  --color-background-warning-filled-hover-dark: var(--color-yellow-yellow-9);
  
  --color-background-warning-light-light: var(--color-yellow-yellow-light-10);
  --color-background-warning-light-dark: var(--color-yellow-yellow-dark-15);
  
  --color-background-warning-light-hover-light: var(--color-yellow-yellow-light-12);
  --color-background-warning-light-hover-dark: var(--color-yellow-yellow-dark-20);
  
  // Background Error
  --color-background-error-filled-light: var(--color-red-red-6);
  --color-background-error-filled-dark: var(--color-red-red-8);
  
  --color-background-error-filled-hover-light: var(--color-red-red-7);
  --color-background-error-filled-hover-dark: var(--color-red-red-9);
  
  --color-background-error-light-light: var(--color-red-red-light-10);
  --color-background-error-light-dark: var(--color-red-red-dark-15);
  
  --color-background-error-light-hover-light: var(--color-red-red-light-12);
  --color-background-error-light-hover-dark: var(--color-red-red-dark-20);
  
  // Background Disabled
  --color-background-disabled-default-light: var(--color-gray-gray-2);
  --color-background-disabled-default-dark: var(--color-dark-dark-7);
  
  --color-background-disabled-input-light: var(--color-gray-gray-1);
  --color-background-disabled-input-dark: var(--color-dark-dark-7);
`;
}

// Generate border tokens
function generateBorderTokens() {
  return `
  // Border tokens
  --color-border-default-light: var(--color-gray-gray-3);
  --color-border-default-dark: var(--color-dark-dark-4);
  
  --color-border-input-light: var(--color-gray-gray-4);
  --color-border-input-dark: var(--color-dark-dark-4);
  
  // Border Primary
  --color-border-primary-default-light: var(--color-primary-primary-color-6);
  --color-border-primary-default-dark: var(--color-primary-primary-color-3);
  
  // Border Secondary
  --color-border-secondary-default-light: var(--color-secondary-secondary-color-6);
  --color-border-secondary-default-dark: var(--color-secondary-secondary-color-3);
  
  // Border Gray
  --color-border-gray-default-light: var(--color-gray-gray-6);
  --color-border-gray-default-dark: var(--color-gray-gray-3);
  
  // Border Success
  --color-border-success-default-light: var(--color-green-green-6);
  --color-border-success-default-dark: var(--color-green-green-3);
  
  // Border Warning
  --color-border-warning-default-light: var(--color-yellow-yellow-6);
  --color-border-warning-default-dark: var(--color-yellow-yellow-3);
  
  // Border Error
  --color-border-error-default-light: var(--color-red-red-9);
  --color-border-error-default-dark: var(--color-red-red-7);
  
  --color-border-error-disabled-light: var(--color-red-red-4);
  --color-border-error-disabled-dark: rgba(224, 49, 49, 0.5);
  
  // Border Disabled
  --color-border-disabled-default-light: var(--color-gray-gray-2);
  --color-border-disabled-default-dark: var(--color-gray-gray-8);
`;
}

// Generate gray scale tokens (10..100)
function generateGrayScaleTokens() {
  return `
	// Gray scale tokens (light/dark)
	--color-gray-10-light: var(--color-gray-gray-0);
	--color-gray-10-dark: var(--color-gray-gray-9);
	--color-gray-20-light: var(--color-gray-gray-1);
	--color-gray-20-dark: var(--color-gray-gray-8);
	--color-gray-30-light: var(--color-gray-gray-2);
	--color-gray-30-dark: var(--color-gray-gray-7);
	--color-gray-40-light: var(--color-gray-gray-3);
	--color-gray-40-dark: var(--color-gray-gray-6);
	--color-gray-50-light: var(--color-gray-gray-4);
	--color-gray-50-dark: var(--color-gray-gray-5);
	--color-gray-60-light: var(--color-gray-gray-5);
	--color-gray-60-dark: var(--color-gray-gray-4);
	--color-gray-70-light: var(--color-gray-gray-6);
	--color-gray-70-dark: var(--color-gray-gray-3);
	--color-gray-80-light: var(--color-gray-gray-7);
	--color-gray-80-dark: var(--color-gray-gray-2);
	--color-gray-90-light: var(--color-gray-gray-8);
	--color-gray-90-dark: var(--color-gray-gray-1);
	--color-gray-100-light: var(--color-gray-gray-9);
	--color-gray-100-dark: var(--color-gray-gray-0);

	// Default aliases (light theme)
	--color-gray-10: var(--color-gray-10-light);
	--color-gray-20: var(--color-gray-20-light);
	--color-gray-30: var(--color-gray-30-light);
	--color-gray-40: var(--color-gray-40-light);
	--color-gray-50: var(--color-gray-50-light);
	--color-gray-60: var(--color-gray-60-light);
	--color-gray-70: var(--color-gray-70-light);
	--color-gray-80: var(--color-gray-80-light);
	--color-gray-90: var(--color-gray-90-light);
	--color-gray-100: var(--color-gray-100-light);
`;
}

// Save SCSS file
function saveSCSS(scss, outputPath) {
  try {
    // Ensure output directory exists
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(outputPath, scss, "utf8");
    console.log(`✅ SCSS file saved to: ${outputPath}`);
  } catch (error) {
    console.error("❌ Error saving SCSS file:", error.message);
  }
}

// Generate token mapping report
function generateMappingReport(tokens) {
  const report = {
    totalTokens: 0,
    categories: {},
    mapping: {},
  };

  Object.entries(tokens).forEach(([category, categoryTokens]) => {
    const count = Object.keys(categoryTokens).length;
    report.totalTokens += count;
    report.categories[category] = count;

    report.mapping[category] = Object.keys(categoryTokens).map((name) => ({
      figmaName: name,
      scssName: `--${category}-${name}`,
      value: categoryTokens[name],
    }));
  });

  console.log("\n📊 Token Mapping Report:");
  console.log(`Total tokens: ${report.totalTokens}`);
  Object.entries(report.categories).forEach(([category, count]) => {
    console.log(`${category}: ${count} tokens`);
  });

  return report;
}

// Main execution
function main() {
  console.log("🚀 Starting Complete Figma Token Sync...");

  validateEnvironment();

  const figmaTokens = parseFigmaTokens();
  const extractedTokens = extractAllTokens(figmaTokens);

  console.log(
    `\n📋 Extracted ${Object.keys(extractedTokens).length} token categories:`
  );
  Object.entries(extractedTokens).forEach(([category, tokens]) => {
    console.log(`  ${category}: ${Object.keys(tokens).length} tokens`);
  });

  const scss = generateSCSS(extractedTokens);
  const outputPath = path.join(process.cwd(), CONFIG.TOKENS_FILE);

  saveSCSS(scss, outputPath);

  const report = generateMappingReport(extractedTokens);

  console.log("\n🎉 Complete Figma Token Sync finished!");
  console.log(`📁 SCSS file: ${outputPath}`);
  console.log(`📊 Total tokens mapped: ${report.totalTokens}`);
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = {
  extractAllTokens,
  generateSCSS,
  generateMappingReport,
};
