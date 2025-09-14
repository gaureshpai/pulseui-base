import React from "react";
import { Icon } from "../Icon/Icon";
import { Close } from "../Icon/IconSet";
import { useBreakpoint } from "../../../hooks/useBreakpoint";
import styles from "./LeftDrawer.module.scss";
import type { SvgIconComponent } from "@mui/icons-material";
import type { WithSxProps } from "../../../utils/sxUtils";
import { mergeSxWithStyles } from "../../../utils/sxUtils";

export interface LeftDrawerItem {
  id: string;
  label: string;
  icon?: SvgIconComponent;
  onClick?: () => void;
  isAction?: boolean; // For special action items like "Add Bookmark"
}

export interface LeftDrawerProps extends WithSxProps {
  isOpen: boolean;
  onClose: () => void;
  items: LeftDrawerItem[];
  title?: string;
  showOverlay?: boolean;
  width?: string;
}

export const LeftDrawer: React.FC<LeftDrawerProps> = ({
  isOpen,
  onClose,
  items,
  title = "MY MENU",
  showOverlay = true,
  width = "280px",
  className = "",
  sx,
  style,
}) => {
  const { style: sxStyle, className: sxClassName } = mergeSxWithStyles(
    sx,
    style,
    className
  );

  const { isMobile, isTablet } = useBreakpoint();

  const handleItemClick = (item: LeftDrawerItem) => {
    console.log("LeftDrawer item clicked:", item.label);
    if (item.onClick) {
      item.onClick();
    }
    // Close drawer on mobile/tablet after item click
    if (isMobile || isTablet) {
      onClose();
    }
  };

  const renderMenuItem = (item: LeftDrawerItem) => (
    <div key={item.id} className={styles.menuItem}>
      <button
        className={`${styles.menuButton} ${
          item.isAction ? styles.actionButton : ""
        }`}
        onClick={() => handleItemClick(item)}
        type="button"
      >
        {item.icon && (
          <Icon
            icon={item.icon}
            size={isMobile ? "md" : "sm"}
            color={item.isAction ? "primary" : "inherit"}
            className={styles.menuIcon}
          />
        )}
        <span
          className={`${styles.menuLabel} ${
            item.isAction ? styles.actionLabel : ""
          }`}
        >
          {item.label}
        </span>
      </button>
    </div>
  );

  return (
    <>
      {/* Overlay */}
      {showOverlay && isOpen && (
        <div
          className={`${styles.overlay} ${isOpen ? styles.visible : ""}`}
          onClick={onClose}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              onClose?.();
            }
          }}
          role="button"
          tabIndex={0}
        />
      )}

      {/* Drawer */}
      <div
        className={`${styles.leftDrawer} ${isOpen ? styles.open : ""} ${
          sxClassName || ""
        }`}
        style={{ width, ...sxStyle }}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation drawer"
      >
        {/* Header */}
        <div className={styles.drawerHeader}>
          <h2 className={styles.menuTitle}>{title}</h2>
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close drawer"
            type="button"
          >
            <Icon icon={Close} size="md" color="inherit" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className={styles.menuNavigation}>{items.map(renderMenuItem)}</nav>
      </div>
    </>
  );
};
