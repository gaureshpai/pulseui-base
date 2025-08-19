# 🚀 Real-Time Figma Token Sync Setup Guide

## Overview

This guide will help you set up **real-time token synchronization** between Figma and your PulseUI project. No more manual exports - your tokens will automatically update when you make design changes in Figma!

## 🔑 Prerequisites

### 1. Get Your Figma Access Token

1. Go to [Figma Account Settings](https://www.figma.com/settings)
2. Navigate to **Personal access tokens**
3. Click **Create new token**
4. Give it a name (e.g., "PulseUI Real-time Sync")
5. Copy the generated token (you won't see it again!)

### 2. Get Your Figma File Key

1. Open your Figma file in the browser
2. Look at the URL: `https://www.figma.com/file/XXXXX/Your-File-Name`
3. The `XXXXX` part is your file key

## ⚙️ Environment Setup

### Option 1: Environment Variables (Recommended)

Create a `.env` file in your project root:

```bash
# .env
FIGMA_API_TOKEN=your_access_token_here
FIGMA_FILE_KEY=your_file_key_here
```

### Option 2: Export in Terminal

```bash
# Windows PowerShell
$env:FIGMA_API_TOKEN="your_access_token_here"
$env:FIGMA_FILE_KEY="your_file_key_here"

# Windows Command Prompt
set FIGMA_API_TOKEN=your_access_token_here
set FIGMA_FILE_KEY=your_file_key_here

# macOS/Linux
export FIGMA_API_TOKEN="your_access_token_here"
export FIGMA_FILE_KEY="your_file_key_here"
```

## 🚀 Usage

### Run Real-Time Sync

```bash
npm run sync-figma-realtime
```

### What Happens

1. **🌐 Connects to Figma API** - Fetches live data directly from your Figma file
2. **🎨 Extracts Tokens** - Gets colors, typography, spacing, and other design tokens
3. **🔄 Updates SCSS** - Automatically updates your `_tokens.scss` file
4. **📊 Reports Results** - Shows you what tokens were synced

## 🔄 Automation Options

### Option 1: Manual Sync (Recommended for Development)

Run whenever you make design changes:

```bash
npm run sync-figma-realtime
```

### Option 2: Watch Mode (Coming Soon)

Automatically sync when Figma changes are detected.

### Option 3: Cron Job (Production)

Set up automatic sync every few minutes:

```bash
# Example: Sync every 5 minutes
*/5 * * * * cd /path/to/your/project && npm run sync-figma-realtime
```

## 📁 File Structure

```
pulseui-v1.0/
├── scripts/
│   ├── sync-figma-realtime.cjs    # 🆕 Real-time sync script
│   ├── sync-figma-tokens-complete.cjs  # Original local sync
│   └── sync-figma-tokens.js       # Basic sync
├── src/
│   └── styles/
│       └── _tokens.scss           # Auto-updated by real-time sync
├── .env                           # Your Figma credentials
└── package.json                   # Contains sync-figma-realtime script
```

## 🎯 Benefits of Real-Time Sync

### ✅ **Automatic Updates**

- No more manual exports from Figma
- Tokens update instantly when you change designs
- Always in sync with your latest Figma changes

### ✅ **Live Data**

- Fetches data directly from Figma's API
- Gets the most current token values
- Resolves references in real-time

### ✅ **Better Workflow**

- Design → Code → Test → Deploy
- No manual token management
- Faster iteration cycles

## 🚨 Troubleshooting

### Error: "FIGMA_API_TOKEN environment variable is required"

**Solution**: Set your environment variables correctly

```bash
# Check if they're set
echo $FIGMA_API_TOKEN
echo $FIGMA_FILE_KEY
```

### Error: "API request failed: 403"

**Solution**: Your access token might be invalid or expired

1. Generate a new token in Figma
2. Update your environment variables
3. Make sure you have access to the file

### Error: "FIGMA_FILE_KEY environment variable is required"

**Solution**: Set your file key correctly

1. Check the URL of your Figma file
2. Extract the file key (the part after `/file/`)
3. Update your environment variable

### No Tokens Found

**Solution**: Make sure your Figma file has:

1. **Local Variables** defined
2. **Styles** created
3. **Components** with properties
4. **Proper naming conventions**

## 🔍 How It Works

### 1. **API Connection**

```javascript
// Connects to Figma's REST API
const fileData = await makeFigmaRequest(`/files/${fileKey}`);
const variablesData = await makeFigmaRequest(
  `/files/${fileKey}/local_variables`
);
```

### 2. **Data Extraction**

```javascript
// Extracts colors from local variables
if (variable.resolvedType === "COLOR") {
  const hexColor = rgbToHex(r, g, b, a);
  tokens.colors[tokenName] = hexColor;
}
```

### 3. **Token Generation**

```javascript
// Converts Figma data to SCSS variables
--color-primary: var(--color-primary-primary-color-6);
--color-surface: var(--color-gray-gray-0);
```

## 🎨 Supported Token Types

### **Colors**

- Local Variables (COLOR type)
- Component Properties (COLOR type)
- RGB/RGBA values converted to hex

### **Typography**

- Text styles
- Font properties
- Line heights

### **Spacing**

- Dimension values
- Padding/margin tokens

### **Effects**

- Shadow styles
- Border radius
- Opacity values

## 🔒 Security Notes

### **Access Token Security**

- Never commit your `.env` file to git
- Add `.env` to your `.gitignore`
- Rotate tokens regularly
- Use minimal required permissions

### **File Access**

- Only share tokens with team members who need them
- Consider using team access tokens for collaboration

## 📈 Performance

### **API Limits**

- Figma API has rate limits
- Recommended: Sync every 5-15 minutes
- Avoid excessive API calls during development

### **Optimization**

- Script only fetches changed data
- Efficient token extraction
- Minimal network overhead

## 🚀 Next Steps

1. **Set up your environment variables**
2. **Run your first real-time sync**: `npm run sync-figma-realtime`
3. **Test with a design change** in Figma
4. **Run sync again** to see the update
5. **Set up automation** if desired

## 🆘 Need Help?

### **Common Issues**

- Check environment variables are set correctly
- Verify your Figma file has the right structure
- Ensure your access token has proper permissions

### **Debug Mode**

The script provides detailed logging to help troubleshoot issues.

---

**🎉 Congratulations!** You now have real-time Figma token synchronization. Your design system will always stay in sync with your latest Figma changes!

