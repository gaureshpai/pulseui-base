#!/usr/bin/env node

/**
 * Figma Integration Setup Script for PulseUI
 * Automatically configures Figma design token integration
 *
 * This script can be run by npm users after installing the package:
 * npm run setup-figma
 */

import fs from "fs";
import path from "path";
import readline from "readline";
import { pathToFileURL } from "url";

console.log("🎨 PulseUI Figma Integration Setup");
console.log("=====================================");
console.log("");
console.log(
  "This setup will help you connect your Figma design tokens to PulseUI components."
);
console.log(
  "Your components will automatically use your brand colors, fonts, and spacing!"
);
console.log("");

// Check if we're in a PulseUI project
const isPulseUIProject =
  (fs.existsSync("package.json") &&
    fs.existsSync("node_modules/pulseui-base")) ||
  fs.existsSync("node_modules/@pulseui/base");

if (!isPulseUIProject) {
  console.log(
    "⚠️  Warning: This doesn't appear to be a PulseUI project directory."
  );
  console.log(
    "   Make sure you're running this from your project root where you installed PulseUI."
  );
  console.log(
    "   If you're setting up a new project, run: npm create pulseui@latest"
  );
  console.log("");
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function setupFigmaIntegration() {
  try {
    console.log("📋 Prerequisites:");
    console.log("1. Figma account with access to your design file");
    console.log("2. Figma Personal Access Token");
    console.log("3. Figma File Key");
    console.log("");

    // Get Figma API Token
    console.log("🔑 Step 1: Figma API Token");
    console.log(
      "   • Go to Figma → Settings → Account → Personal Access Tokens"
    );
    console.log('   • Click "Generate new token"');
    console.log('   • Name it "PulseUI Integration"');
    console.log('   • Copy the token (starts with "figd_")');
    console.log("");

    const figmaToken = await question("Enter your Figma API Token: ");

    if (!figmaToken.startsWith("figd_")) {
      console.log(
        '❌ Invalid Figma API token format. Should start with "figd_"'
      );
      return;
    }

    // Get Figma File Key
    console.log("");
    console.log("📁 Step 2: Figma File Key");
    console.log("   • Open your design file in Figma");
    console.log("   • Copy the file key from the URL:");
    console.log("   • https://www.figma.com/file/[FILE_KEY]/Your-Design-File");
    console.log("   • Copy the [FILE_KEY] part");
    console.log("");

    const figmaFileKey = await question("Enter your Figma File Key: ");

    if (figmaFileKey.length < 10) {
      console.log(
        "❌ Invalid Figma file key. Should be longer than 10 characters."
      );
      return;
    }

    // Get Brand Name
    console.log("");
    console.log("🏷️  Step 3: Brand Name");
    console.log(
      '   • Enter a unique name for your brand (e.g., "mycompany", "startup", "enterprise")'
    );
    console.log("   • This will create a brands/[brandname] directory");
    console.log("   • Use lowercase letters, numbers, and hyphens only");
    console.log("");

    const brandName = await question("Enter your brand name: ");

    if (!/^[a-z0-9-]+$/.test(brandName)) {
      console.log(
        "❌ Invalid brand name. Use only lowercase letters, numbers, and hyphens."
      );
      return;
    }

    console.log("");
    console.log("🔄 Setting up your Figma integration...");

    // Create .env file
    const envContent = `# PulseUI Figma Integration
# Generated on: ${new Date().toISOString()}
# Brand: ${brandName}

FIGMA_API_TOKEN=${figmaToken}
FIGMA_FILE_KEY=${figmaFileKey}
BRAND_NAME=${brandName}

# Add this to your .gitignore to keep your tokens secure
# .env
# brands/
`;

    fs.writeFileSync(".env", envContent);
    console.log("✅ Created .env file with your Figma credentials");

    // Create brands directory
    const brandsDir = "brands";
    if (!fs.existsSync(brandsDir)) {
      fs.mkdirSync(brandsDir, { recursive: true });
      console.log("✅ Created brands/ directory");
    }

    // Create brand-specific directory
    const brandDir = path.join(brandsDir, brandName);
    if (!fs.existsSync(brandDir)) {
      fs.mkdirSync(brandDir, { recursive: true });
      console.log(`✅ Created brands/${brandName}/ directory`);
    }

    // Create brand configuration
    const brandConfig = {
      name: brandName,
      figma: {
        fileKey: figmaFileKey,
        apiToken: figmaToken,
      },
      createdAt: new Date().toISOString(),
      lastSync: null,
      tokens: {
        colors: {},
        typography: {},
        spacing: {},
        shadows: {},
        borders: {},
      },
    };

    fs.writeFileSync(
      path.join(brandDir, "config.json"),
      JSON.stringify(brandConfig, null, 2)
    );
    console.log("✅ Created brand configuration file");

    // Create brand README
    const brandReadme = `# ${brandName} Brand Configuration

This directory contains your brand-specific design tokens and configuration.

## Files

- \`config.json\` - Brand configuration and metadata
- \`_tokens.scss\` - All design tokens from Figma
- \`_tokens-light.scss\` - Light theme SCSS variables
- \`_tokens-dark.scss\` - Dark theme SCSS variables

## Usage

Your PulseUI components will automatically use these tokens once synced.

## Syncing

To sync your latest design tokens from Figma:

\`\`\`bash
npm run sync-tokens
\`\`\`

## Customization

You can manually edit the generated files, but running sync again will overwrite them.
`;

    fs.writeFileSync(path.join(brandDir, "README.md"), brandReadme);

    console.log("✅ Created brand documentation");

    // Offer to run initial token sync
    console.log("");
    const runSync = await question(
      "Would you like to sync your Figma tokens now? (y/n): "
    );

    if (runSync.toLowerCase() === "y" || runSync.toLowerCase() === "yes") {
      console.log("");
      console.log("🔄 Running initial token sync...");
      console.log("This may take a few moments...");

      try {
        // Set environment variables for the sync script
        process.env.FIGMA_API_TOKEN = figmaToken;
        process.env.FIGMA_FILE_KEY = figmaFileKey;

        // Try to find and run the sync script
        const syncScriptPath = path.join(
          "node_modules",
          "pulseui-base",
          "scripts",
          "sync-figma-tokens-enhanced.js"
        );
        const localSyncScriptPath = "scripts/sync-figma-tokens-enhanced.js";

        let syncScript;

        if (fs.existsSync(syncScriptPath)) {
          // Running from installed package
          syncScript = await import(pathToFileURL(syncScriptPath).href);
        } else if (fs.existsSync(localSyncScriptPath)) {
          // Running from local development
          syncScript = await import(pathToFileURL(localSyncScriptPath).href);
        } else {
          throw new Error("Sync script not found");
        }

        // If the sync script exports a main function, call it
        if (typeof syncScript.default === "function") {
          syncScript.default();
        } else if (typeof syncScript === "function") {
          syncScript();
        } else {
          console.log("⚠️  Sync script loaded but no main function found");
          console.log("You can run: npx pulseui-sync");
        }
      } catch (error) {
        console.log("⚠️  Could not run sync automatically:", error.message);
        console.log("You can run: npx pulseui-sync");
      }
    }

    console.log("");
    console.log("🎉 Setup complete! Your PulseUI integration is ready.");
    console.log("");
    console.log("📁 What was created:");
    console.log(`   • .env file with your Figma credentials`);
    console.log(`   • brands/${brandName}/ directory`);
    console.log(`   • Brand configuration and documentation`);
    console.log("");
    console.log("🚀 Next steps:");
    console.log("   1. Run: npm run sync-tokens (to sync your design tokens)");
    console.log(
      "   2. Your components will automatically use your brand tokens!"
    );
    console.log("   3. Start building: npm run dev");
    console.log("");
    console.log("💡 Pro Tips:");
    console.log("   • Update your Figma file to see changes automatically");
    console.log("   • Run sync-tokens whenever you make design changes");
    console.log("   • Check brands/${brandName}/ for your generated tokens");
    console.log("");
    console.log(
      "📚 Learn more: https://github.com/your-org/pulseui#figma-integration"
    );
  } catch (error) {
    console.error("❌ Setup failed:", error.message);
    console.log("");
    console.log("💡 Troubleshooting:");
    console.log("   • Make sure you have write permissions in this directory");
    console.log("   • Check that your Figma credentials are correct");
    console.log("   • Try running: npm run setup-figma");
  } finally {
    rl.close();
  }
}

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

// Run the setup
setupFigmaIntegration();
