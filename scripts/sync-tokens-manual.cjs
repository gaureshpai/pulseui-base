#!/usr/bin/env node

/**
 * Manual Token Sync Script
 * This script helps sync design tokens between Figma JSON and SCSS files
 *
 * Usage: node scripts/sync-tokens-manual.cjs
 */

const fs = require("fs");
const path = require("path");

// File paths
const FIGMA_TOKENS_PATH = path.join(__dirname, "../tokens/figma-tokens.json");
const SCSS_TOKENS_PATH = path.join(__dirname, "../src/styles/_tokens.scss");

// Color mapping from your current SCSS tokens
const COLOR_MAPPING = {
  // Surface colors
  "color-surface-0": "#ffffff",
  "color-surface-1": "#f8f9fa",
  "color-surface-2": "#e9ecef",
  "color-surface-3": "#dee2e6",
  "color-surface-4": "#ced4da",
  "color-surface-5": "#adb5bd",
  "color-surface-variant": "#f1f3f5",
  "color-on-surface": "#212529",
  "color-on-surface-variant": "#868e96",
  "color-divider": "#dee2e6",

  // Gray scale
  "color-gray-0": "#f8f9fa",
  "color-gray-1": "#e9ecef",
  "color-gray-2": "#dee2e6",
  "color-gray-3": "#ced4da",
  "color-gray-4": "#adb5bd",
  "color-gray-5": "#868e96",
  "color-gray-6": "#495057",
  "color-gray-7": "#343a40",
  "color-gray-8": "#212529",
  "color-gray-9": "#000000",

  // Blue scale
  "color-blue-0": "#e7f5ff",
  "color-blue-1": "#d0ebff",
  "color-blue-2": "#a5d8ff",
  "color-blue-3": "#74c0fc",
  "color-blue-4": "#4dabf7",
  "color-blue-5": "#339af0",
  "color-blue-6": "#228be6",
  "color-blue-7": "#1c7ed6",
  "color-blue-8": "#1971c2",
  "color-blue-9": "#1864ab",

  // Red scale
  "color-red-0": "#fff5f5",
  "color-red-1": "#ffe3e3",
  "color-red-2": "#ffc9c9",
  "color-red-3": "#ffa8a8",
  "color-red-4": "#ff8787",
  "color-red-5": "#ff6b6b",
  "color-red-6": "#fa5252",
  "color-red-7": "#f03e3e",
  "color-red-8": "#e03131",
  "color-red-9": "#c92a2a",

  // Green scale
  "color-green-0": "#ebfbee",
  "color-green-1": "#d3f9d8",
  "color-green-2": "#b2f2bb",
  "color-green-3": "#8ce99a",
  "color-green-4": "#69db7c",
  "color-green-5": "#51cf66",
  "color-green-6": "#40c057",
  "color-green-7": "#37b24d",
  "color-green-8": "#2f9e44",
  "color-green-9": "#2b8a3e",

  // Yellow scale
  "color-yellow-0": "#fff9db",
  "color-yellow-1": "#fff3bf",
  "color-yellow-2": "#ffec99",
  "color-yellow-3": "#ffe066",
  "color-yellow-4": "#ffd43b",
  "color-yellow-5": "#fcc419",
  "color-yellow-6": "#fab005",
  "color-yellow-7": "#f59f00",
  "color-yellow-8": "#f08c00",
  "color-yellow-9": "#e67700",

  // Base colors
  "color-white": "#ffffff",
  "color-black": "#000000",

  // Primary colors
  "color-primary": "#228be6",
  "color-primary-1": "#1864ab",
  "color-primary-6": "#228be6",
  "color-primary-7": "#339af0",
};

// Dark theme color mapping
const DARK_COLOR_MAPPING = {
  "color-surface-0": "#121212",
  "color-surface-1": "#1e1e1e",
  "color-surface-2": "#232323",
  "color-surface-3": "#2a2a2a",
  "color-surface-4": "#2f2f2f",
  "color-surface-5": "#353535",
  "color-surface-variant": "#2c2c2c",
  "color-on-surface": "#e0e0e0",
  "color-on-surface-variant": "#a8a8a8",
  "color-divider": "#3a3a3a",
};

function updateFigmaTokens() {
  try {
    // Read current Figma tokens
    const figmaTokens = JSON.parse(fs.readFileSync(FIGMA_TOKENS_PATH, "utf8"));

    console.log("🔍 Current Figma tokens structure:");
    console.log(`- Colors: ${Object.keys(figmaTokens.colors || {}).length}`);
    console.log(
      `- Total lines: ${
        JSON.stringify(figmaTokens, null, 2).split("\n").length
      }`
    );

    // Update colors with real values
    if (figmaTokens.colors) {
      let updatedCount = 0;

      Object.keys(figmaTokens.colors).forEach((colorKey) => {
        // Map Figma color keys to our color mapping
        const mappedKey = mapFigmaKeyToColorKey(colorKey);
        if (COLOR_MAPPING[mappedKey]) {
          figmaTokens.colors[colorKey] = COLOR_MAPPING[mappedKey];
          updatedCount++;
        }
      });

      console.log(`✅ Updated ${updatedCount} color values`);
    }

    // Write updated tokens back
    fs.writeFileSync(FIGMA_TOKENS_PATH, JSON.stringify(figmaTokens, null, 2));
    console.log("💾 Updated Figma tokens file");
  } catch (error) {
    console.error("❌ Error updating Figma tokens:", error.message);
  }
}

function mapFigmaKeyToColorKey(figmaKey) {
  // Map Figma color keys to our color mapping keys
  const keyMappings = {
    "color-blue-blue-0": "color-blue-0",
    "color-blue-blue-1": "color-blue-1",
    "color-blue-blue-2": "color-blue-2",
    "color-blue-blue-3": "color-blue-3",
    "color-blue-blue-4": "color-blue-4",
    "color-blue-blue-5": "color-blue-5",
    "color-blue-blue-6": "color-blue-6",
    "color-blue-blue-7": "color-blue-7",
    "color-blue-blue-8": "color-blue-8",
    "color-blue-blue-9": "color-blue-9",
    "color-red-red-0": "color-red-0",
    "color-red-red-1": "color-red-1",
    "color-red-red-2": "color-red-2",
    "color-red-red-3": "color-red-3",
    "color-red-red-4": "color-red-4",
    "color-red-red-5": "color-red-5",
    "color-red-red-6": "color-red-6",
    "color-red-red-7": "color-red-7",
    "color-red-red-8": "color-red-8",
    "color-red-red-9": "color-red-9",
    "color-gray-gray-0": "color-gray-0",
    "color-gray-gray-1": "color-gray-1",
    "color-gray-gray-2": "color-gray-2",
    "color-gray-gray-3": "color-gray-3",
    "color-gray-gray-4": "color-gray-4",
    "color-gray-gray-5": "color-gray-5",
    "color-gray-gray-6": "color-gray-6",
    "color-gray-gray-7": "color-gray-7",
    "color-gray-gray-8": "color-gray-8",
    "color-gray-gray-9": "color-gray-9",
    "color-color-white": "color-white",
    "color-color-black": "color-black",
    "color-primary-primary-color-6": "color-primary",
    "color-primary-primary-color-9": "color-primary-1",
    "color-primary-primary-color-5": "color-primary-7",
  };

  return keyMappings[figmaKey] || figmaKey;
}

function validateSync() {
  try {
    const figmaTokens = JSON.parse(fs.readFileSync(FIGMA_TOKENS_PATH, "utf8"));
    const scssTokens = fs.readFileSync(SCSS_TOKENS_PATH, "utf8");

    console.log("\n🔍 Validation Results:");

    // Check for non-white colors in Figma tokens
    const nonWhiteColors = Object.values(figmaTokens.colors || {}).filter(
      (color) => color !== "#ffffff"
    );
    console.log(`- Non-white colors in Figma: ${nonWhiteColors.length}`);

    // Check SCSS token count
    const scssColorMatches = scssTokens.match(/--color-[^:]+:/g);
    console.log(
      `- Color variables in SCSS: ${
        scssColorMatches ? scssColorMatches.length : 0
      }`
    );

    if (nonWhiteColors.length > 0) {
      console.log("✅ Figma tokens now have real color values!");
    } else {
      console.log("❌ Figma tokens still have all white colors");
    }
  } catch (error) {
    console.error("❌ Error validating sync:", error.message);
  }
}

function main() {
  console.log("🎨 Pulse UI Token Sync Tool");
  console.log("============================\n");

  console.log("1️⃣ Updating Figma tokens with real color values...");
  updateFigmaTokens();

  console.log("\n2️⃣ Validating synchronization...");
  validateSync();

  console.log("\n📋 Next Steps:");
  console.log("1. Check your Figma Tokens plugin export settings");
  console.log('2. Ensure "Include Values" is enabled in Figma');
  console.log("3. Re-export tokens from Figma to get real values");
  console.log("4. Run this script again to sync with your SCSS");
}

if (require.main === module) {
  main();
}

module.exports = { updateFigmaTokens, validateSync };

