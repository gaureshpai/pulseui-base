#!/usr/bin/env node

/**
 * Restore Token Structure Script
 * Restores the main _tokens.scss file to match the backup structure exactly
 * But updates color values with the latest from Figma
 */

const fs = require("fs");
const path = require("path");

// Configuration
const CONFIG = {
  BACKUP_FILE: "src/styles/_tokens.backup.1755549715267.scss",
  MAIN_FILE: "src/styles/_tokens.scss",
  FIGMA_COLORS_FILE: "src/styles/_tokens.scss", // Current Figma colors
};

// Read backup file to get the exact structure
function readBackupFile() {
  try {
    const backupPath = path.join(process.cwd(), CONFIG.BACKUP_FILE);
    if (!fs.existsSync(backupPath)) {
      throw new Error(`Backup file not found: ${backupPath}`);
    }

    const backupContent = fs.readFileSync(backupPath, "utf8");
    console.log("✅ Backup file read successfully");
    return backupContent;
  } catch (error) {
    console.error("❌ Error reading backup file:", error.message);
    process.exit(1);
  }
}

// Read current Figma colors
function readFigmaColors() {
  try {
    const figmaPath = path.join(process.cwd(), CONFIG.FIGMA_COLORS_FILE);
    if (!fs.existsSync(figmaPath)) {
      throw new Error(`Figma colors file not found: ${figmaPath}`);
    }

    const figmaContent = fs.readFileSync(figmaPath, "utf8");
    console.log("✅ Figma colors file read successfully");
    return figmaContent;
  } catch (error) {
    console.error("❌ Error reading Figma colors file:", error.message);
    process.exit(1);
  }
}

// Extract color tokens from Figma content
function extractFigmaColors(figmaContent) {
  const colors = {};
  const colorRegex = /--color-([^:]+):\s*([^;]+);/g;
  let match;

  while ((match = colorRegex.exec(figmaContent)) !== null) {
    const tokenName = match[1].trim();
    const tokenValue = match[2].trim();
    colors[tokenName] = tokenValue;
  }

  console.log(
    `📊 Extracted ${Object.keys(colors).length} color tokens from Figma`
  );
  return colors;
}

// Restore structure with updated colors
function restoreStructure(backupContent, figmaColors) {
  console.log("🔄 Restoring structure with updated colors...");

  let restoredContent = backupContent;

  // Update color values while preserving exact structure
  Object.entries(figmaColors).forEach(([tokenName, tokenValue]) => {
    // Find the exact token in backup structure
    const tokenPattern = new RegExp(
      `(--color-${tokenName.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      )}:\\s*)[^;]+;`,
      "g"
    );

    if (tokenPattern.test(restoredContent)) {
      // Update existing token value
      restoredContent = restoredContent.replace(
        tokenPattern,
        `$1${tokenValue};`
      );
      console.log(`✅ Updated: --color-${tokenName}`);
    } else {
      // This is a new token, add it at the end of the color section
      const colorSectionEnd = restoredContent.indexOf("  // Typography Tokens");
      if (colorSectionEnd !== -1) {
        const newToken = `  --color-${tokenName}: ${tokenValue};\n`;
        restoredContent =
          restoredContent.slice(0, colorSectionEnd) +
          newToken +
          restoredContent.slice(colorSectionEnd);
        console.log(`🆕 Added: --color-${tokenName}`);
      }
    }
  });

  // Update timestamp
  const timestampComment = `// Design Tokens - Complete 1:1 Mapping with Figma
// Generated automatically from Figma tokens
// Last updated: ${new Date().toISOString()}
// Structure restored from backup, colors updated from Figma

`;

  restoredContent = restoredContent.replace(
    /^\/\/ Design Tokens.*\n\/\/ Generated.*\n\/\/ Last updated.*\n/,
    timestampComment
  );

  return restoredContent;
}

// Save restored file
function saveRestoredFile(content) {
  try {
    const outputPath = path.join(process.cwd(), CONFIG.MAIN_FILE);

    // Ensure output directory exists
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    fs.writeFileSync(outputPath, content, "utf8");
    console.log(`✅ Restored file saved to: ${outputPath}`);
  } catch (error) {
    console.error("❌ Error saving restored file:", error.message);
  }
}

// Main execution
async function main() {
  console.log("🚀 Starting Token Structure Restoration...");
  console.log(
    "📝 This will restore the exact backup structure with updated Figma colors"
  );

  try {
    // Read files
    const backupContent = readBackupFile();
    const figmaContent = readFigmaColors();

    // Extract Figma colors
    const figmaColors = extractFigmaColors(figmaContent);

    // Restore structure with updated colors
    const restoredContent = restoreStructure(backupContent, figmaColors);

    // Save restored file
    saveRestoredFile(restoredContent);

    console.log("\n🎉 Token Structure Restoration completed!");
    console.log("✅ Main file now has exact backup structure");
    console.log("✅ All color values updated from Figma");
    console.log("✅ Naming conventions preserved exactly");
  } catch (error) {
    console.error("❌ Error during restoration:", error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = {
  readBackupFile,
  readFigmaColors,
  extractFigmaColors,
  restoreStructure,
  saveRestoredFile,
};
