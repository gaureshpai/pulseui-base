import React from "react";
import styles from "./Textarea.module.scss";
import type { WithSxProps } from "../../../utils/sxUtils";
import { mergeSxWithStyles, combineClassNames } from "../../../utils/sxUtils";
import { Icon } from "../Icon/Icon";
import { ErrorOutline } from "../Icon/IconSet";

export interface TextareaProps extends WithSxProps {
  /** Textarea label */
  label?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Textarea placeholder text */
  placeholder?: string;
  /** Caption text below the textarea */
  caption?: string;
  /** Textarea value */
  value?: string;
  /** Whether the textarea is disabled */
  disabled?: boolean;
  /** Error message to display */
  error?: string;
  /** Textarea name attribute */
  name?: string;
  /** Textarea id attribute */
  id?: string;
  /** Number of rows to display */
  rows?: number;
  /** Whether textarea can be resized */
  resizable?: boolean;
  /** Callback fired when textarea value changes */
  onChange?: (value: string) => void;
  /** Callback fired when textarea is focused */
  onFocus?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  /** Callback fired when textarea loses focus */
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  /** Accessibility label (overrides label for screen readers) */
  ariaLabel?: string;
  /** Describes the textarea's purpose */
  ariaDescribedBy?: string;
  /** Tab index for keyboard navigation */
  tabIndex?: number;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  required = false,
  placeholder,
  caption,
  value = "",
  disabled = false,
  error,
  name,
  id,
  rows = 4,
  resizable = true,
  onChange,
  onFocus,
  onBlur,
  ariaLabel,
  ariaDescribedBy,
  tabIndex,
  className = "",
  sx,
  style,
}) => {
  // Generate unique IDs for accessibility
  const generatedId = React.useId();
  const textareaId = id || name || generatedId;
  const captionId = caption ? `${textareaId}-caption` : undefined;
  const errorId = error ? `${textareaId}-error` : undefined;
  const describedBy = [ariaDescribedBy, captionId, errorId]
    .filter(Boolean)
    .join(" ");

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  const { style: sxStyle, className: sxClassName } = mergeSxWithStyles(
    sx,
    style,
    className
  );

  const textareaClasses = combineClassNames(
    styles.textarea,
    !resizable && styles.noResize,
    disabled && styles.disabled,
    error && styles.error,
    sxClassName
  );

  const containerClasses = combineClassNames(
    styles.root,
    disabled && styles.disabled,
    error && styles.error
  );

  return (
    <div className={containerClasses} style={sxStyle}>
      {label && (
        <label htmlFor={textareaId} className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}

      <textarea
        id={textareaId}
        name={name}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        rows={rows}
        onChange={handleChange}
        onFocus={onFocus}
        onBlur={onBlur}
        tabIndex={tabIndex}
        className={textareaClasses}
        aria-label={ariaLabel}
        aria-describedby={describedBy || undefined}
        aria-invalid={!!error}
        aria-required={required}
      />

      {caption && (
        <div className={styles.footer}>
          <span id={captionId} className={styles.caption}>
            {caption}
          </span>
        </div>
      )}

      {error && (
        <div className={styles.footer}>
          <Icon
            icon={ErrorOutline}
            size="sm"
            color="error"
            className={styles.errorIcon}
            aria-hidden="true"
          />
          <span
            id={errorId}
            className={styles.error}
            role="alert"
            aria-live="polite"
          >
            {error}
          </span>
        </div>
      )}
    </div>
  );
};

Textarea.displayName = "Textarea";
