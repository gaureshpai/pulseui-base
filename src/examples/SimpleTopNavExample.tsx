import React from "react";
import { SimpleTopNav } from "../components/atoms/SimpleTopNav/SimpleTopNav";
import { SimpleThemeProvider } from "../components/SimpleThemeProvider/SimpleThemeProvider";

export const SimpleTopNavExample: React.FC = () => {
  const handleVersionChange = (version: string) => {
    console.log(`Version changed to: ${version}`);
  };

  return (
    <SimpleThemeProvider>
      <div style={{ minHeight: "100vh", backgroundColor: "var(--color-surface)" }}>
        <SimpleTopNav
          brandName="PULSE UI"
          brandTitle="DESIGN SYSTEM"
          versionSelector={{
            show: true,
            version: "1.6.0",
            versions: ["1.6.0", "1.5.0", "1.4.0"],
            onVersionChange: handleVersionChange,
          }}
        />
        
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <h1>SimpleTopNav with Theme Toggle</h1>
          <p>
            This example demonstrates the SimpleTopNav component with an integrated theme toggle.
            The theme toggle button is positioned in the top-right corner of the navigation bar.
          </p>
          <p>
            <strong>Features:</strong>
          </p>
          <ul style={{ textAlign: "left", maxWidth: "600px", margin: "0 auto" }}>
            <li>Theme toggle using ActionButton with sunny icon for light theme</li>
            <li>Responsive design with mobile navigation</li>
            <li>Version selector integration</li>
            <li>Custom brand information</li>
            <li>Accessible navigation with proper ARIA labels</li>
          </ul>
          
          <div style={{ marginTop: "2rem" }}>
            <h3>Theme Toggle Details:</h3>
            <p>
              The theme toggle button automatically shows:
            </p>
            <ul style={{ textAlign: "left", maxWidth: "600px", margin: "0 auto" }}>
              <li><strong>Sunny icon (☀️)</strong> when in light theme - click to switch to dark</li>
              <li><strong>Bedtime icon (🌙)</strong> when in dark theme - click to switch to light</li>
            </ul>
            <p>
              The button is accessible on both desktop and mobile devices, with proper hover effects
              and smooth transitions.
            </p>
          </div>
        </div>
      </div>
    </SimpleThemeProvider>
  );
};
