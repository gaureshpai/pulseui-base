import React, { useEffect, useRef, useCallback } from "react";
import styles from "./Modal.module.scss";
import { ModalFooter } from "./ModalFooter";
import { Icon } from "../Icon";
import { Close } from "../Icon/IconSet";
// import type { SxProps } from "../../../styles/stylesApi";
import type { WithSxProps } from "../../../utils/sxUtils";
import { mergeSxWithStyles, combineClassNames } from "../../../utils/sxUtils";

export interface ModalProps extends WithSxProps {
  /** Modal content */
  children?: React.ReactNode;
  /** Modal title */
  title?: string;
  /** Whether to show the title */
  showTitle?: boolean;
  /** Modal description */
  description?: string;
  /** Whether to show the description */
  showDescription?: boolean;
  /** Whether to show the close button */
  showClose?: boolean;
  /** Whether to show the modal */
  show?: boolean;
  /** Modal size */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Whether to show the footer */
  showFooter?: boolean;
  /** Footer variant */
  footerVariant?: "button-only" | "primary" | "destructive";
  /** Primary button text */
  primaryText?: string;
  /** Secondary button text */
  secondaryText?: string;
  /** Primary button click handler */
  onPrimaryClick?: () => void;
  /** Secondary button click handler */
  onSecondaryClick?: () => void;
  /** Whether the primary button is disabled */
  primaryDisabled?: boolean;
  /** Whether the secondary button is disabled */
  secondaryDisabled?: boolean;
  /** Custom footer content */
  footerContent?: React.ReactNode;
  /** Close handler */
  onClose?: () => void;
  /** Whether the modal is disabled */
  disabled?: boolean;
  /** Whether to close on backdrop click */
  closeOnBackdropClick?: boolean;
  /** Whether to close on escape key */
  closeOnEscape?: boolean;
  /** Unique identifier */
  id?: string;
}

export const Modal: React.FC<ModalProps> = ({
  children,
  title,
  showTitle = true,
  description,
  showDescription = true,
  showClose = true,
  show = false,
  size = "md",
  showFooter = false,
  footerVariant = "primary",
  primaryText = "OK",
  secondaryText = "Cancel",
  onPrimaryClick,
  onSecondaryClick,
  primaryDisabled = false,
  secondaryDisabled = false,
  footerContent,
  onClose,
  disabled = false,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  id,
  className = "",
  sx,
  style,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  const { style: sxStyle, className: sxClassName } = mergeSxWithStyles(
    sx,
    style,
    className
  );

  const modalClasses = combineClassNames(
    styles.modal,
    styles[`size-${size}`],
    disabled && styles.disabled,
    sxClassName
  );

  const backdropClasses = combineClassNames(
    styles.backdrop,
    show && styles.visible
  );

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (closeOnBackdropClick && e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  const handleClose = () => {
    if (!disabled && onClose) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (closeOnEscape && e.key === "Escape" && onClose) {
      onClose();
    }
  };

  // Focus trap functionality
  const getFocusableElements = useCallback(() => {
    if (!modalRef.current) return [];

    const focusableSelectors = [
      "button:not([disabled])",
      "input:not([disabled])",
      "select:not([disabled])",
      "textarea:not([disabled])",
      "a[href]",
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]',
    ].join(", ");

    return Array.from(
      modalRef.current.querySelectorAll(focusableSelectors)
    ) as HTMLElement[];
  }, []);

  const trapFocus = useCallback(
    (e: KeyboardEvent) => {
      if (!show || !modalRef.current) return;

      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.key === "Tab") {
        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    },
    [show, getFocusableElements]
  );

  useEffect(() => {
    if (show) {
      // Store the previously focused element
      previousActiveElement.current = document.activeElement as HTMLElement;

      // Prevent body scroll
      document.body.style.overflow = "hidden";

      // Add focus trap event listener
      document.addEventListener("keydown", trapFocus);

      // Focus the modal
      if (modalRef.current) {
        modalRef.current.focus();
      }
    } else {
      // Restore body scroll
      document.body.style.overflow = "unset";

      // Remove focus trap event listener
      document.removeEventListener("keydown", trapFocus);

      // Restore focus to previously focused element
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
        previousActiveElement.current = null;
      }
    }

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", trapFocus);
    };
  }, [show, trapFocus]);

  if (!show) return null;

  return (
    <div
      className={backdropClasses}
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      role="presentation"
      tabIndex={-1}
      aria-labelledby={title ? `${id}-title` : undefined}
      aria-describedby={description ? `${id}-description` : undefined}
    >
      <div
        ref={modalRef}
        className={modalClasses}
        style={sxStyle}
        id={id}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        {(showTitle && title) || showClose ? (
          <div className={styles.header}>
            {showTitle && title && (
              <h2 className={styles.title} id={`${id}-title`}>
                {title}
              </h2>
            )}
            {showClose && (
              <button
                className={styles.closeButton}
                onClick={handleClose}
                disabled={disabled}
                aria-label="Close modal"
                type="button"
              >
                <Icon icon={Close} size="sm" />
              </button>
            )}
          </div>
        ) : null}

        {/* Description */}
        {showDescription && description && (
          <div className={styles.description} id={`${id}-description`}>
            {description}
          </div>
        )}

        {/* Content */}
        <div className={styles.content}>{children}</div>

        {/* Footer */}
        {showFooter && (
          <ModalFooter
            variant={footerVariant}
            primaryText={primaryText}
            secondaryText={secondaryText}
            onPrimaryClick={onPrimaryClick}
            onSecondaryClick={onSecondaryClick}
            primaryDisabled={primaryDisabled}
            secondaryDisabled={secondaryDisabled}
          >
            {footerContent}
          </ModalFooter>
        )}
      </div>
    </div>
  );
};
