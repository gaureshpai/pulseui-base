#!/usr/bin/env node

/**
 * Post-Install Setup Script for PulseUI
 * Runs automatically after npm install to guide users through Figma integration
 */

import fs from "fs";
import path from "path";

// Add error handling and better logging
try {
  console.log("\n🎨 Welcome to PulseUI!");
  console.log(
    "⚡ Ultra-lightweight React component library with design tokens"
  );
  console.log("");
  console.log("📋 Postinstall script is running...");
  console.log(`📁 Current directory: ${process.cwd()}`);
  console.log(`📦 Package name: ${process.env.npm_package_name || "unknown"}`);
  console.log(`🔧 Script path: ${process.argv[1]}`);
  console.log(`🔧 Node version: ${process.version}`);
  console.log(`🔧 Platform: ${process.platform}`);
  console.log(`🔧 Architecture: ${process.arch}`);
  console.log(
    `🔧 NPM version: ${process.env.npm_config_user_agent || "unknown"}`
  );
  console.log("");

  // Check if this is a fresh installation
  const isFreshInstall = !fs.existsSync(".env") && !fs.existsSync("brands");
  const isPulseUIProject =
    fs.existsSync("package.json") &&
    (fs.existsSync("node_modules/pulseui-base") ||
      fs.existsSync("node_modules/@pulseui/base"));

  if (isFreshInstall && isPulseUIProject) {
    console.log("🌟 This appears to be a fresh PulseUI installation!");
    console.log("");
    console.log("🚀 To get started with multi-brand theming:");
    console.log("");
    console.log("1️⃣  Run the Figma setup using the global command:");
    console.log("   npx pulseui-setup");
    console.log("");
    console.log("2️⃣  This will help you:");
    console.log("   • Connect your Figma design tokens");
    console.log("   • Set up your brand configuration");
    console.log("   • Create multi-brand theming");
    console.log("   • Sync design tokens automatically");
    console.log("");
    console.log("💡 Your components will automatically use your brand colors!");
    console.log("");
  } else if (isPulseUIProject) {
    console.log("🔄 PulseUI is already configured in this project!");
    console.log("");
    console.log("📁 To manage your brands:");
    console.log("   • View brands: ls brands/");
    console.log("   • Sync tokens: npx pulseui-sync");
    console.log("   • Add new brand: npx pulseui-setup");
    console.log("");
  } else {
    console.log("📦 PulseUI package installed successfully!");
    console.log("");
    console.log("💡 To use PulseUI in your project:");
    console.log(
      "   • Import components: import { Button } from 'pulseui-base'"
    );
    console.log(
      "   • Import styles: import 'pulseui-base/dist/pulseui-base.css'"
    );
    console.log("   • Setup Figma: npx pulseui-setup");
    console.log("   • Sync tokens: npx pulseui-sync");
    console.log("");
  }

  console.log("📚 Documentation: https://github.com/your-org/pulseui");
  console.log("🐛 Issues: https://github.com/your-org/pulseui/issues");
  console.log("⭐ Star us: https://github.com/your-org/pulseui");
  console.log("");
} catch (error) {
  console.error("❌ Postinstall script error:", error.message);
  console.log("");
  console.log("💡 This won't affect PulseUI functionality.");
  console.log("   You can still use: npm run setup-figma");
  console.log("");
}
