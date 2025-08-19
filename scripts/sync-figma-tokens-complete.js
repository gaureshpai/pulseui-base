#!/usr/bin/env node

/**
 * Complete Figma Token Sync Script for PulseUI
 * Syncs all design tokens from Figma to local SCSS files
 */

import https from "https";
import fs from "fs";
import path from "path";

// Configuration
const CONFIG = {
  FIGMA_API_TOKEN: process.env.FIGMA_API_TOKEN,
  FIGMA_FILE_KEY: process.env.FIGMA_FILE_KEY,
  OUTPUT_DIR: "src/styles",
  TOKENS_FILE: "src/styles/_tokens.scss",
  FIGMA_TOKENS_FILE: "Pulseui.json",
};

// Validate environment variables
function validateEnvironment() {
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
    // Extract font/typography tokens
    if (figmaTokens.font) {
      Object.entries(figmaTokens.font).forEach(([category, styles]) => {
        Object.entries(styles).forEach(([styleName, style]) => {
          if (style.value) {
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
      Object.entries(figmaTokens.effect).forEach(([size, effects]) => {
        Object.entries(effects).forEach(([index, effect]) => {
          if (effect.value && effect.value.shadowType === "dropShadow") {
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
      });
    }

    // Extract primitive colors
    if (figmaTokens["b. primitives"]) {
      Object.entries(figmaTokens["b. primitives"]).forEach(
        ([colorCategory, colors]) => {
          Object.entries(colors).forEach(([colorName, color]) => {
            if (color.value && color.type === "color") {
              const tokenName = `${colorCategory}-${colorName}`
                .toLowerCase()
                .replace(/\s+/g, "-");
              tokens.colors[tokenName] = color.value;
            }
          });
        }
      );
    }

    // Extract semantic tokens
    if (figmaTokens["a. tokens"]) {
      Object.entries(figmaTokens["a. tokens"]).forEach(([category, items]) => {
        Object.entries(items).forEach(([itemName, item]) => {
          if (item.value && item.type === "color") {
            const tokenName = `${category}-${itemName}`
              .toLowerCase()
              .replace(/\s+/g, "-");
            tokens.colors[tokenName] = item.value;
          } else if (item.value && item.type === "dimension") {
            const tokenName = `${category}-${itemName}`
              .toLowerCase()
              .replace(/\s+/g, "-");
            tokens.spacing[tokenName] = `${item.value}px`;
          }
        });
      });
    }

    // Extract radius tokens
    if (figmaTokens["a. tokens"] && figmaTokens["a. tokens"].radius) {
      Object.entries(figmaTokens["a. tokens"].radius).forEach(
        ([radiusName, radius]) => {
          if (radius.value) {
            const tokenName = radiusName.toLowerCase().replace(/\s+/g, "-");
            tokens.radius[tokenName] = `${radius.value}px`;
          }
        }
      );
    }

    // Extract spacing tokens
    if (figmaTokens["a. tokens"] && figmaTokens["a. tokens"].spacing) {
      Object.entries(figmaTokens["a. tokens"].spacing).forEach(
        ([spacingName, spacing]) => {
          if (spacing.value) {
            const tokenName = spacingName.toLowerCase().replace(/\s+/g, "-");
            tokens.spacing[tokenName] = `${spacing.value}px`;
          }
        }
      );
    }

    // Extract padding tokens
    if (figmaTokens["a. tokens"] && figmaTokens["a. tokens"].padding) {
      Object.entries(figmaTokens["a. tokens"].padding).forEach(
        ([paddingName, padding]) => {
          if (padding.value) {
            const tokenName = `padding-${paddingName}`
              .toLowerCase()
              .replace(/\s+/g, "-");
            tokens.spacing[tokenName] = `${padding.value}px`;
          }
        }
      );
    }

    // Extract persona tokens
    if (figmaTokens["c. personas"]) {
      tokens.personas = extractPersonaTokens(figmaTokens["c. personas"]);
    }

    // Extract typography tokens
    if (figmaTokens.typography) {
      Object.entries(figmaTokens.typography).forEach(([category, styles]) => {
        Object.entries(styles).forEach(([styleName, style]) => {
          if (style.fontSize && style.fontSize.value) {
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
      });
    }

    console.log("✅ All tokens extracted from Figma");
    return tokens;
  } catch (error) {
    console.error("❌ Error extracting tokens:", error.message);
    return tokens;
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
  let scss = `// Design Tokens - Complete 1:1 Mapping with Figma
// Generated automatically from Figma tokens
// Last updated: ${new Date().toISOString()}

// Root variables for light theme
:root {
`;

  // Generate color tokens
  scss += generateColorTokens(tokens.colors);

  // Generate typography tokens
  scss += generateTypographyTokens(tokens.typography);

  // Generate effect tokens
  scss += generateEffectTokens(tokens.effects);

  // Generate spacing tokens
  scss += generateSpacingTokens(tokens.spacing);

  // Generate radius tokens
  scss += generateRadiusTokens(tokens.radius);

  // Generate persona tokens
  scss += generatePersonaTokens(tokens.personas);

  scss += `}

// Dark theme variables
[data-theme="dark"] {
`;

  // Generate dark theme variants
  scss += generateDarkThemeTokens(tokens);

  scss += `}

// Extended tokens for component-specific needs
:root {
`;

  // Generate extended tokens
  scss += generateExtendedTokens(tokens);

  scss += `}`;

  return scss;
}

// Generate color tokens
function generateColorTokens(colors) {
  let scss = `  // Color Tokens - Direct from Figma
  
`;

  Object.entries(colors).forEach(([name, value]) => {
    if (typeof value === "string") {
      scss += `  --color-${name}: ${value};\n`;
    }
  });

  return scss;
}

// Generate typography tokens
function generateTypographyTokens(typography) {
  let scss = `  
  // Typography Tokens - Direct from Figma
  
`;

  Object.entries(typography).forEach(([name, style]) => {
    if (style.fontSize) {
      scss += `  --font-${name}-size: ${style.fontSize}px;\n`;
    }
    if (style.lineHeight) {
      scss += `  --font-${name}-line-height: ${style.lineHeight}px;\n`;
    }
    if (style.fontWeight) {
      scss += `  --font-${name}-weight: ${style.fontWeight};\n`;
    }
    if (style.fontFamily) {
      scss += `  --font-${name}-family: "${style.fontFamily}";\n`;
    }
    if (style.letterSpacing) {
      scss += `  --font-${name}-letter-spacing: ${style.letterSpacing}px;\n`;
    }
    if (style.textCase) {
      scss += `  --font-${name}-text-case: ${style.textCase};\n`;
    }
  });

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
  // Spacing Tokens - Direct from Figma
  
`;

  Object.entries(spacing).forEach(([name, value]) => {
    scss += `  --spacing-${name}: ${value};\n`;
  });

  return scss;
}

// Generate radius tokens
function generateRadiusTokens(radius) {
  let scss = `  
  // Radius Tokens - Direct from Figma
  
`;

  Object.entries(radius).forEach(([name, value]) => {
    scss += `  --radius-${name}: ${value};\n`;
  });

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

// Generate extended tokens for component needs
function generateExtendedTokens(tokens) {
  let scss = `  // Extended Component Tokens
  
  // Button tokens
  --color-button-primary: var(--color-primary-color-8);
  --color-button-primary-hover: var(--color-primary-color-9);
  --color-button-secondary: var(--color-gray-8);
  --color-button-secondary-hover: var(--color-gray-9);
  
  // Input tokens
  --color-input-background: var(--color-white);
  --color-input-border: var(--color-gray-3);
  --color-input-border-focus: var(--color-primary-color-6);
  --color-input-text: var(--color-gray-9);
  --color-input-placeholder: var(--color-gray-6);
  
  // Icon tokens
  --color-icon-primary: var(--color-gray-9);
  --color-icon-secondary: var(--color-gray-6);
  --color-icon-muted: var(--color-gray-5);
  
  // Status tokens
  --color-success: var(--color-green-6);
  --color-warning: var(--color-yellow-6);
  --color-error: var(--color-red-6);
  --color-info: var(--color-blue-6);
  
  // Motion tokens
  --motion-duration-instant: 1ms;
  --motion-duration-fast: 50ms;
  --motion-duration-normal: 100ms;
  --motion-duration-slow: 200ms;
  --motion-duration-slower: 300ms;
  --motion-duration-slowest: 500ms;
  
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
if (import.meta.url === path.toFileURL(process.argv[1]).href) {
  main();
}

export { extractAllTokens, generateSCSS, generateMappingReport };
