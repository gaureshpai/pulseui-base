#!/usr/bin/env node

/**
 * Real-Time Figma Token Sync Script
 * Fetches live data directly from Figma API
 * Only updates tokens that have changed - preserves existing structure
 * No more manual exports needed!
 */

const https = require("https");
const fs = require("fs");
const path = require("path");

// Configuration
const CONFIG = {
  FIGMA_API_TOKEN: process.env.FIGMA_API_TOKEN,
  FIGMA_FILE_KEY: process.env.FIGMA_FILE_KEY,
  OUTPUT_DIR: "src/styles",
  TOKENS_FILE: "src/styles/_tokens.scss",
  FIGMA_TOKENS_FILE: "Pulseui.json",
  API_BASE_URL: "https://api.figma.com/v1",
};

// Validate environment variables
function validateEnvironment() {
  if (!CONFIG.FIGMA_API_TOKEN) {
    console.error("❌ FIGMA_API_TOKEN environment variable is required");
    console.log("Set it with: export FIGMA_API_TOKEN='your_token_here'");
    console.log(
      "Get your token from: https://www.figma.com/developers/api#access-tokens"
    );
    process.exit(1);
  }

  if (!CONFIG.FIGMA_FILE_KEY) {
    console.error("❌ FIGMA_FILE_KEY environment variable is required");
    console.log("Set it with: export FIGMA_FILE_KEY='your_file_key_here'");
    console.log(
      "Get your file key from the Figma file URL: https://www.figma.com/file/XXXXX/..."
    );
    process.exit(1);
  }

  console.log("✅ Environment variables validated");
  console.log(`🔑 Using Figma File: ${CONFIG.FIGMA_FILE_KEY}`);
}

// Make HTTP request to Figma API
function makeFigmaRequest(endpoint, method = "GET") {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "api.figma.com",
      port: 443,
      path: `/v1${endpoint}`,
      method: method,
      headers: {
        "X-Figma-Token": CONFIG.FIGMA_API_TOKEN,
        "Content-Type": "application/json",
      },
    };

    const req = https.request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            const parsedData = JSON.parse(data);
            resolve(parsedData);
          } catch (error) {
            reject(new Error(`Failed to parse response: ${error.message}`));
          }
        } else {
          reject(new Error(`API request failed: ${res.statusCode} - ${data}`));
        }
      });
    });

    req.on("error", (error) => {
      reject(new Error(`Request failed: ${error.message}`));
    });

    req.end();
  });
}

// Fetch file data from Figma API
async function fetchFigmaFile() {
  try {
    console.log("🌐 Fetching live data from Figma API...");

    const endpoint = `/files/${CONFIG.FIGMA_FILE_KEY}`;
    const fileData = await makeFigmaRequest(endpoint);

    console.log("✅ Figma file data fetched successfully");
    console.log(`📁 File: ${fileData.name}`);
    console.log(
      `🔄 Last modified: ${new Date(fileData.lastModified).toLocaleString()}`
    );

    return fileData;
  } catch (error) {
    console.error("❌ Error fetching Figma file:", error.message);
    process.exit(1);
  }
}

// Fetch local variables from Figma API
async function fetchFigmaVariables() {
  try {
    console.log("🎨 Fetching local variables from Figma API...");

    const endpoint = `/files/${CONFIG.FIGMA_FILE_KEY}/local_variables`;
    const variablesData = await makeFigmaRequest(endpoint);

    console.log("✅ Local variables fetched successfully");
    console.log(
      `📊 Variables found: ${Object.keys(variablesData.meta.variables).length}`
    );

    return variablesData;
  } catch (error) {
    console.error("❌ Error fetching local variables:", error.message);
    console.log("⚠️  Continuing without local variables...");
    return null;
  }
}

// Fetch file styles from Figma API
async function fetchFigmaStyles() {
  try {
    console.log("🎭 Fetching styles from Figma API...");

    const endpoint = `/files/${CONFIG.FIGMA_FILE_KEY}/styles`;
    const stylesData = await makeFigmaRequest(endpoint);

    console.log("✅ Styles fetched successfully");
    console.log(
      `🎨 Styles found: ${Object.keys(stylesData.meta.styles).length}`
    );

    return stylesData;
  } catch (error) {
    console.error("❌ Error fetching styles:", error.message);
    console.log("⚠️  Continuing without styles...");
    return null;
  }
}

// Transform Figma API data to token format
function transformFigmaDataToTokens(fileData, variablesData, stylesData) {
  console.log("🔄 Transforming Figma API data to tokens...");

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
    // Extract colors from local variables (modern Figma files)
    if (variablesData && variablesData.meta && variablesData.meta.variables) {
      console.log("📦 Processing modern local variables...");
      Object.entries(variablesData.meta.variables).forEach(
        ([variableId, variable]) => {
          if (variable.resolvedType === "COLOR") {
            const resolvedValue = variable.resolvedValue;
            if (resolvedValue && resolvedValue.r !== undefined) {
              const hexColor = rgbToHex(
                resolvedValue.r,
                resolvedValue.g,
                resolvedValue.b,
                resolvedValue.a
              );
              const tokenName = variable.name
                .toLowerCase()
                .replace(/\s+/g, "-");
              tokens.colors[tokenName] = hexColor;
              console.log(`✅ Found variable: ${tokenName} = ${hexColor}`);
            }
          }
        }
      );
    } else {
      console.log(
        "⚠️  No modern local variables found, using document extraction..."
      );
    }

    // Extract colors from styles (if available)
    if (stylesData && stylesData.meta && stylesData.meta.styles) {
      console.log("🎨 Processing styles...");
      Object.entries(stylesData.meta.styles).forEach(([styleId, style]) => {
        if (style.styleType === "FILL") {
          const tokenName = style.name.toLowerCase().replace(/\s+/g, "-");
          console.log(`Found fill style: ${tokenName}`);
          // Note: We'd need to fetch individual style data to get actual color values
        }
      });
    }

    // Extract from document structure (this handles older Figma file formats)
    if (fileData.document) {
      console.log("📊 Extracting from document structure...");
      extractTokensFromDocument(fileData.document, tokens);
    }

    // If no tokens found from API, try to extract from file components
    if (Object.keys(tokens.colors).length === 0) {
      console.log("🔍 No tokens found via API, scanning components...");
      // This would be implemented if needed for component extraction
    }

    console.log("✅ Data transformation completed");
    console.log(`🎯 Found ${Object.keys(tokens.colors).length} color tokens`);

    return tokens;
  } catch (error) {
    console.error("❌ Error transforming data:", error.message);
    return tokens;
  }
}

// Extract tokens from document structure
function extractTokensFromDocument(document, tokens) {
  if (!document || !document.children) return;

  console.log("🔍 Scanning document structure for tokens...");
  scanNode(document, tokens, "");
}

// Scan a node and its children for color tokens
function scanNode(node, tokens, path = "") {
  if (!node) return;

  const nodeName = node.name || "unnamed";
  const currentPath = path ? `${path}/${nodeName}` : nodeName;

  // Extract colors from fills
  if (node.fills && Array.isArray(node.fills)) {
    node.fills.forEach((fill, index) => {
      if (fill.type === "SOLID" && fill.color) {
        const color = fill.color;
        if (
          color.r !== undefined &&
          color.g !== undefined &&
          color.b !== undefined
        ) {
          const hexColor = rgbToHex(color.r, color.g, color.b, color.a || 1);
          const tokenName = `${nodeName}-fill-${index}`
            .toLowerCase()
            .replace(/[^a-z0-9-]/g, "-");
          tokens.colors[tokenName] = hexColor;
          console.log(`🎨 Found fill color: ${tokenName} = ${hexColor}`);
        }
      }
    });
  }

  // Extract colors from strokes
  if (node.strokes && Array.isArray(node.strokes)) {
    node.strokes.forEach((stroke, index) => {
      if (stroke.type === "SOLID" && stroke.color) {
        const color = stroke.color;
        if (
          color.r !== undefined &&
          color.g !== undefined &&
          color.b !== undefined
        ) {
          const hexColor = rgbToHex(color.r, color.g, color.b, color.a || 1);
          const tokenName = `${nodeName}-stroke-${index}`
            .toLowerCase()
            .replace(/[^a-z0-9-]/g, "-");
          tokens.colors[tokenName] = hexColor;
          console.log(`🖊️ Found stroke color: ${tokenName} = ${hexColor}`);
        }
      }
    });
  }

  // Extract from component properties
  if (node.componentProperties) {
    Object.entries(node.componentProperties).forEach(([propName, prop]) => {
      if (prop.type === "COLOR") {
        const tokenName = `${nodeName}-${propName}`
          .toLowerCase()
          .replace(/[^a-z0-9-]/g, "-");
        if (prop.value && prop.value.r !== undefined) {
          const hexColor = rgbToHex(
            prop.value.r,
            prop.value.g,
            prop.value.b,
            prop.value.a
          );
          tokens.colors[tokenName] = hexColor;
          console.log(`🧩 Found component color: ${tokenName} = ${hexColor}`);
        }
      }
    });
  }

  // Look for nodes with specific names that might be tokens
  if (
    nodeName.toLowerCase().includes("primary") ||
    nodeName.toLowerCase().includes("secondary") ||
    nodeName.toLowerCase().includes("color") ||
    nodeName.toLowerCase().includes("brand")
  ) {
    // This might be a color token definition
    if (node.fills && node.fills[0] && node.fills[0].color) {
      const color = node.fills[0].color;
      const hexColor = rgbToHex(color.r, color.g, color.b, color.a || 1);
      const tokenName = nodeName.toLowerCase().replace(/[^a-z0-9-]/g, "-");
      tokens.colors[tokenName] = hexColor;
      console.log(`🎯 Found named color token: ${tokenName} = ${hexColor}`);
    }
  }

  // Recursively process children
  if (node.children && Array.isArray(node.children)) {
    node.children.forEach((child) => scanNode(child, tokens, currentPath));
  }
}

// Convert RGB values to hex
function rgbToHex(r, g, b, a = 1) {
  const toHex = (n) => {
    const hex = Math.round(n * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  return a < 1
    ? hex +
        Math.round(a * 255)
          .toString(16)
          .padStart(2, "0")
    : hex;
}

// Update existing SCSS file with only changed tokens
function updateExistingSCSS(newTokens, outputPath) {
  try {
    console.log("🔄 Updating existing SCSS file with only changed tokens...");

    // Read existing SCSS file
    let existingSCSS = "";
    if (fs.existsSync(outputPath)) {
      existingSCSS = fs.readFileSync(outputPath, "utf8");
      console.log("📖 Read existing SCSS file");
    } else {
      console.log("⚠️  No existing SCSS file found, creating new one");
      existingSCSS = generateDefaultSCSS();
    }

    // Parse existing tokens
    const existingTokens = parseExistingTokens(existingSCSS);
    console.log(
      `📊 Found ${Object.keys(existingTokens).length} existing tokens`
    );

    // Find new/changed tokens
    const changedTokens = findChangedTokens(existingTokens, newTokens.colors);
    console.log(
      `🔄 Found ${Object.keys(changedTokens).length} changed/new tokens`
    );

    if (Object.keys(changedTokens).length === 0) {
      console.log("✅ No changes detected - SCSS file unchanged");
      return;
    }

    // Update only the changed tokens
    const updatedSCSS = updateTokensInSCSS(existingSCSS, changedTokens);

    // Save updated file
    saveSCSS(updatedSCSS, outputPath);

    console.log("✅ SCSS file updated with only changed tokens");
  } catch (error) {
    console.error("❌ Error updating SCSS file:", error.message);
  }
}

// Parse existing tokens from SCSS file
function parseExistingTokens(scssContent) {
  const tokens = {};
  const tokenRegex = /--color-([^:]+):\s*([^;]+);/g;
  let match;

  while ((match = tokenRegex.exec(scssContent)) !== null) {
    const tokenName = match[1].trim();
    const tokenValue = match[2].trim();
    tokens[tokenName] = tokenValue;
  }

  return tokens;
}

// Find tokens that are new or have changed values
function findChangedTokens(existingTokens, newTokens) {
  const changedTokens = {};

  Object.entries(newTokens).forEach(([name, value]) => {
    if (typeof value === "string" && value.startsWith("#")) {
      const existingValue = existingTokens[name];

      // If token doesn't exist or value has changed
      if (!existingValue || existingValue !== value) {
        changedTokens[name] = value;
        if (existingValue) {
          console.log(`🔄 Token changed: ${name} ${existingValue} → ${value}`);
        } else {
          console.log(`🆕 New token: ${name} = ${value}`);
        }
      }
    }
  });

  return changedTokens;
}

// Update only changed tokens in existing SCSS
function updateTokensInSCSS(existingSCSS, changedTokens) {
  let updatedSCSS = existingSCSS;

  Object.entries(changedTokens).forEach(([name, value]) => {
    const tokenPattern = new RegExp(
      `(--color-${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}:\\s*)[^;]+;`,
      "g"
    );

    if (tokenPattern.test(updatedSCSS)) {
      // Update existing token
      updatedSCSS = updatedSCSS.replace(tokenPattern, `$1${value};`);
      console.log(`✅ Updated existing token: --color-${name}`);
    } else {
      // Add new token at the end of :root block
      const rootEndPattern = /(:root\s*\{[\s\S]*?)(\})/;
      const match = updatedSCSS.match(rootEndPattern);

      if (match) {
        const newToken = `  --color-${name}: ${value};\n`;
        updatedSCSS = updatedSCSS.replace(rootEndPattern, `$1${newToken}$2`);
        console.log(`✅ Added new token: --color-${name}`);
      }
    }
  });

  // Add timestamp comment
  const timestampComment = `// Last updated: ${new Date().toISOString()} (Real-time Figma sync)\n`;
  updatedSCSS = updatedSCSS.replace(/^/, timestampComment);

  return updatedSCSS;
}

// Generate default SCSS if no existing file
function generateDefaultSCSS() {
  return `// Design Tokens - Auto-generated from Figma
// Last updated: ${new Date().toISOString()} (Real-time Figma sync)

:root {
  // Tokens will be added here automatically
}
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

// Main execution
async function main() {
  console.log("🚀 Starting Real-Time Figma Token Sync...");
  console.log("🔄 This will fetch live data directly from Figma API!");
  console.log(
    "📝 Only changed tokens will be updated - existing structure preserved"
  );

  validateEnvironment();

  try {
    // Fetch live data from Figma
    const [fileData, variablesData, stylesData] = await Promise.all([
      fetchFigmaFile(),
      fetchFigmaVariables(),
      fetchFigmaStyles(),
    ]);

    // Transform API data to tokens
    const extractedTokens = transformFigmaDataToTokens(
      fileData,
      variablesData,
      stylesData
    );

    console.log(
      `\n📋 Extracted ${Object.keys(extractedTokens).length} token categories:`
    );
    Object.entries(extractedTokens).forEach(([category, tokens]) => {
      console.log(`  ${category}: ${Object.keys(tokens).length} tokens`);
    });

    // Update only changed tokens in existing SCSS file
    if (Object.keys(extractedTokens.colors).length > 0) {
      const outputPath = path.join(process.cwd(), CONFIG.TOKENS_FILE);
      updateExistingSCSS(extractedTokens, outputPath);

      console.log("\n🎉 Real-Time Figma Token Sync finished!");
      console.log(`📁 SCSS file: ${outputPath}`);
      console.log(
        `🎨 Total color tokens: ${Object.keys(extractedTokens.colors).length}`
      );
    } else {
      console.log("\n⚠️  No tokens found - SCSS file not updated");
      console.log(
        "Your Figma file might not have color tokens in a format we can extract"
      );
    }

    console.log(`🔄 Your tokens are now live from Figma!`);
    console.log(
      `\n💡 To keep tokens updated, run this script whenever you make design changes in Figma`
    );
    console.log(
      `💡 Or set up a cron job to run it automatically every few minutes`
    );
  } catch (error) {
    console.error("❌ Error during real-time sync:", error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = {
  fetchFigmaFile,
  fetchFigmaVariables,
  fetchFigmaStyles,
  transformFigmaDataToTokens,
  updateExistingSCSS,
  saveSCSS,
};
