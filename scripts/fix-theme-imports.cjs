const fs = require("fs");
const path = require("path");

// Function to recursively find all TypeScript/TSX files
function findTsFiles(dir, files = []) {
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (
      stat.isDirectory() &&
      !item.startsWith(".") &&
      item !== "node_modules"
    ) {
      findTsFiles(fullPath, files);
    } else if (item.endsWith(".tsx") || item.endsWith(".ts")) {
      files.push(fullPath);
    }
  }

  return files;
}

// Function to update theme imports in a file
function updateThemeImports(filePath) {
  try {
    let content = fs.readFileSync(filePath, "utf8");
    let updated = false;

    // Replace all ThemeContext imports with themeUtils
    if (content.includes("contexts/ThemeContext")) {
      content = content.replace(
        /from ['"]\.\.\/\.\.\/\.\.\/contexts\/ThemeContext['"]/g,
        "from '../../../utils/themeUtils'"
      );
      content = content.replace(
        /from ['"]\.\.\/\.\.\/contexts\/ThemeContext['"]/g,
        "from '../../utils/themeUtils'"
      );
      content = content.replace(
        /from ['"]\.\.\/contexts\/ThemeContext['"]/g,
        "from '../utils/themeUtils'"
      );
      content = content.replace(
        /from ['"]\.\/contexts\/ThemeContext['"]/g,
        "from './utils/themeUtils'"
      );
      updated = true;
    }

    // Replace useTheme with isDark
    if (content.includes("useTheme")) {
      content = content.replace(
        /import \{ useTheme \} from/g,
        "import { isDark } from"
      );
      updated = true;
    }

    // Remove useTheme destructuring
    if (content.includes("const { isDark } = useTheme();")) {
      content = content.replace("const { isDark } = useTheme();", "");
      updated = true;
    }

    if (content.includes("const { isDark, toggleTheme } = useTheme();")) {
      content = content.replace(
        "const { isDark, toggleTheme } = useTheme();",
        ""
      );
      updated = true;
    }

    if (content.includes("const { isDark, themeMode } = useTheme();")) {
      content = content.replace(
        "const { isDark, themeMode } = useTheme();",
        ""
      );
      updated = true;
    }

    if (content.includes("const { isDark, themeName } = useTheme();")) {
      content = content.replace(
        "const { isDark, themeName } = useTheme();",
        ""
      );
      updated = true;
    }

    if (content.includes("const { isDark, isLight } = useTheme();")) {
      content = content.replace("const { isDark, isLight } = useTheme();", "");
      updated = true;
    }

    // Replace isDark usage with isDark()
    if (content.includes("isDark ?") && !content.includes("isDark() ?")) {
      content = content.replace(/isDark \?/g, "isDark() ?");
      updated = true;
    }

    if (content.includes("!isDark") && !content.includes("!isDark()")) {
      content = content.replace(/!isDark/g, "!isDark()");
      updated = true;
    }

    if (content.includes("isDark &&") && !content.includes("isDark() &&")) {
      content = content.replace(/isDark &&/g, "isDark() &&");
      updated = true;
    }

    if (content.includes("isDark ||") && !content.includes("isDark() ||")) {
      content = content.replace(/isDark \|\|/g, "isDark() ||");
      updated = true;
    }

    if (content.includes("isDark ===") && !content.includes("isDark() ===")) {
      content = content.replace(/isDark ===/g, "isDark() ===");
      updated = true;
    }

    if (content.includes("isDark !==") && !content.includes("isDark() !==")) {
      content = content.replace(/isDark !==/g, "isDark() !==");
      updated = true;
    }

    if (updated) {
      fs.writeFileSync(filePath, content, "utf8");
      console.log(`✅ Updated: ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
  }
}

// Main execution
console.log("🔄 Fixing remaining theme imports...");

const srcDir = path.join(__dirname, "..", "src");
const tsFiles = findTsFiles(srcDir);

console.log(`📁 Found ${tsFiles.length} TypeScript files`);

let updatedCount = 0;
for (const file of tsFiles) {
  const originalContent = fs.readFileSync(file, "utf8");
  updateThemeImports(file);
  const newContent = fs.readFileSync(file, "utf8");

  if (originalContent !== newContent) {
    updatedCount++;
  }
}

console.log(`✅ Updated ${updatedCount} files`);
console.log("🎉 Theme import fixes complete!");

