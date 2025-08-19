import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, jest, beforeEach } from "@jest/globals";
import "@testing-library/jest-dom";
import { SimpleTopNav } from "./SimpleTopNav";
import React from "react";

// Mock the theme utilities
const mockIsDark = jest.fn();
const mockToggleTheme = jest.fn();

jest.mock("../../../utils/themeUtils", () => ({
  isDark: mockIsDark,
  toggleTheme: mockToggleTheme,
}));

// Mock the useBreakpoint hook
jest.mock("../../../hooks/useBreakpoint", () => ({
  useBreakpoint: jest.fn(() => ({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
  })),
}));

// Mock window.addEventListener
const mockAddEventListener = jest.fn();
const mockRemoveEventListener = jest.fn();

Object.defineProperty(window, 'addEventListener', {
  value: mockAddEventListener,
  writable: true,
});

Object.defineProperty(window, 'removeEventListener', {
  value: mockRemoveEventListener,
  writable: true,
});

describe("SimpleTopNav", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockIsDark.mockReturnValue(false); // Default to light theme
  });

  it("renders with default props", () => {
    render(<SimpleTopNav />);
    
    expect(screen.getByText("VIGNESH VISHNUMOORTHY")).toBeInTheDocument();
    expect(screen.getByText("PRODUCT DESIGNER + ENGINEER")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Work")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("renders with custom brand information", () => {
    render(
      <SimpleTopNav
        brandName="Custom Brand"
        brandTitle="Custom Title"
      />
    );
    
    expect(screen.getByText("Custom Brand")).toBeInTheDocument();
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });

  it("renders with custom navigation items", () => {
    const customItems = [
      { id: "custom1", label: "Custom 1" },
      { id: "custom2", label: "Custom 2" },
    ];
    
    render(<SimpleTopNav items={customItems} />);
    
    expect(screen.getByText("Custom 1")).toBeInTheDocument();
    expect(screen.getByText("Custom 2")).toBeInTheDocument();
    expect(screen.queryByText("Home")).not.toBeInTheDocument();
  });

  it("renders theme toggle button", () => {
    render(<SimpleTopNav />);
    
    const themeToggle = screen.getByRole("button", { name: /switch to dark theme/i });
    expect(themeToggle).toBeInTheDocument();
  });

  it("shows bedtime icon when in light theme", () => {
    mockIsDark.mockReturnValue(false);
    
    render(<SimpleTopNav />);
    
    const themeToggle = screen.getByRole("button", { name: /switch to dark theme/i });
    expect(themeToggle).toBeInTheDocument();
  });

  it("shows sunny icon when in dark theme", () => {
    mockIsDark.mockReturnValue(true);
    
    render(<SimpleTopNav />);
    
    const themeToggle = screen.getByRole("button", { name: /switch to light theme/i });
    expect(themeToggle).toBeInTheDocument();
  });

  it("calls toggleTheme when theme toggle is clicked", () => {
    render(<SimpleTopNav />);
    
    const themeToggle = screen.getByRole("button", { name: /switch to dark theme/i });
    fireEvent.click(themeToggle);
    
    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });

  it("updates theme state when toggle is clicked", () => {
    render(<SimpleTopNav />);
    
    const themeToggle = screen.getByRole("button", { name: /switch to dark theme/i });
    
    // Initially shows bedtime icon (light theme)
    expect(themeToggle).toHaveAttribute("aria-label", "Switch to dark theme");
    
    // Click to toggle
    fireEvent.click(themeToggle);
    
    // Should now show sunny icon (dark theme)
    expect(themeToggle).toHaveAttribute("aria-label", "Switch to light theme");
  });

  it("renders version selector when configured", () => {
    const versionSelector = {
      show: true,
      version: "1.0.0",
      versions: ["1.0.0", "0.9.0"],
      onVersionChange: jest.fn(),
    };
    
    render(<SimpleTopNav versionSelector={versionSelector} />);
    
    expect(screen.getByText("1.0.0")).toBeInTheDocument();
  });

  it("does not render version selector when not configured", () => {
    render(<SimpleTopNav />);
    
    expect(screen.queryByText("1.0.0")).not.toBeInTheDocument();
  });

  it("handles navigation item clicks", () => {
    const handleClick = jest.fn();
    const customItems = [
      { id: "test", label: "Test", onClick: handleClick },
    ];
    
    render(<SimpleTopNav items={customItems} />);
    
    const navItem = screen.getByText("Test");
    fireEvent.click(navItem);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders with custom className", () => {
    render(<SimpleTopNav className="custom-nav" />);
    
    const nav = screen.getByRole("navigation");
    expect(nav).toHaveClass("custom-nav");
  });

  it("renders with custom styles", () => {
    const customStyle = { backgroundColor: "red" };
    render(<SimpleTopNav style={customStyle} />);
    
    const nav = screen.getByRole("navigation");
    expect(nav).toHaveStyle("background-color: red");
  });

  it("shows mobile menu toggle on mobile devices", () => {
    const { useBreakpoint } = require("../../../hooks/useBreakpoint");
    useBreakpoint.mockReturnValue({
      isMobile: true,
      isTablet: false,
      isDesktop: false,
    });
    
    render(<SimpleTopNav />);
    
    const mobileToggle = screen.getByRole("button", { name: /toggle mobile menu/i });
    expect(mobileToggle).toBeInTheDocument();
  });

  it("toggles mobile menu when mobile toggle is clicked", () => {
    const { useBreakpoint } = require("../../../hooks/useBreakpoint");
    useBreakpoint.mockReturnValue({
      isMobile: true,
      isTablet: false,
      isDesktop: false,
    });
    
    render(<SimpleTopNav />);
    
    const mobileToggle = screen.getByRole("button", { name: /toggle mobile menu/i });
    fireEvent.click(mobileToggle);
    
    // Mobile menu should now be open
    expect(screen.getByText("Navigation")).toBeInTheDocument();
  });

  it("closes mobile menu when navigation item is clicked", () => {
    const { useBreakpoint } = require("../../../hooks/useBreakpoint");
    useBreakpoint.mockReturnValue({
      isMobile: true,
      isTablet: false,
      isDesktop: false,
    });
    
    render(<SimpleTopNav />);
    
    // Open mobile menu
    const mobileToggle = screen.getByRole("button", { name: /toggle mobile menu/i });
    fireEvent.click(mobileToggle);
    
    // Click on a navigation item
    const navItem = screen.getByText("Home");
    fireEvent.click(navItem);
    
    // Mobile menu should be closed
    expect(screen.queryByText("Navigation")).not.toBeInTheDocument();
  });

  it("renders theme toggle in mobile navigation", () => {
    const { useBreakpoint } = require("../../../hooks/useBreakpoint");
    useBreakpoint.mockReturnValue({
      isMobile: true,
      isTablet: false,
      isDesktop: false,
    });
    
    render(<SimpleTopNav />);
    
    // Open mobile menu
    const mobileToggle = screen.getByRole("button", { name: /toggle mobile menu/i });
    fireEvent.click(mobileToggle);
    
    // Theme toggle should be visible in mobile nav
    const mobileThemeToggle = screen.getByRole("button", { name: /switch to dark theme/i });
    expect(mobileThemeToggle).toBeInTheDocument();
  });

  it("listens for theme changes from storage", () => {
    render(<SimpleTopNav />);
    
    expect(mockAddEventListener).toHaveBeenCalledWith('storage', expect.any(Function));
  });

  it("cleans up event listeners on unmount", () => {
    const { unmount } = render(<SimpleTopNav />);
    
    unmount();
    
    expect(mockRemoveEventListener).toHaveBeenCalledWith('storage', expect.any(Function));
  });
});
