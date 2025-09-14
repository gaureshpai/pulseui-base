import React from "react";
import { Input } from "../Input";
import { Icon } from "../Icon";
import { InfoOutlined } from "../Icon/IconSet";
import styles from "./TextInput.module.scss";
// import type { SxProps } from "../../../styles/stylesApi";
import type { WithSxProps } from "../../../utils/sxUtils";
import { mergeSxWithStyles, combineClassNames } from "../../../utils/sxUtils";

export interface TextInputProps extends WithSxProps {
  /** Input label */
  label?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Input placeholder text */
  placeholder?: string;
  /** Caption text below the input */
  caption?: string;
  /** Error message to display */
  error?: string;
  /** Input value */
  value?: string;
  /** Input type */
  type?: "text" | "email" | "password" | "number" | "tel" | "url" | "search";
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Input name attribute */
  name?: string;
  /** Input id attribute */
  id?: string;
  /** Callback fired when input value changes */
  onChange?: (value: string) => void;
  /** Callback fired when input is focused */
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** Callback fired when input loses focus */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** Left icon for the input */
  leftIcon?: string;
  /** Right icon for the input */
  rightIcon?: string;
  /** Whether to show password toggle for password inputs */
  showPasswordToggle?: boolean;
  /** Whether password is visible (for controlled password inputs) */
  passwordVisible?: boolean;
  /** Callback when password visibility changes */
  onPasswordVisibilityChange?: (visible: boolean) => void;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  required = false,
  placeholder,
  caption,
  error,
  value,
  type = "text",
  disabled = false,
  name,
  id,
  onChange,
  onFocus,
  onBlur,
  className = "",
  leftIcon,
  rightIcon,
  showPasswordToggle,
  passwordVisible,
  onPasswordVisibilityChange,
  sx,
  style,
}) => {
  // Generate unique IDs for accessibility
  const generatedId = React.useId();
  const inputId = id || name || generatedId;
  const captionId = caption ? `${inputId}-caption` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [captionId, errorId].filter(Boolean).join(" ");

  const { style: sxStyle, className: sxClassName } = mergeSxWithStyles(
    sx,
    style,
    className
  );

  const inputClasses = combineClassNames(
    styles.root,
    error && styles.error,
    disabled && styles.disabled,
    sxClassName
  );

  return (
    <div className={inputClasses} style={sxStyle}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}

      <Input
        id={inputId}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        showPasswordToggle={showPasswordToggle}
        passwordVisible={passwordVisible}
        onPasswordVisibilityChange={onPasswordVisibilityChange}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        className={styles.input}
        aria-describedby={describedBy || undefined}
        aria-invalid={!!error}
        aria-required={required}
      />

      {(caption || error) && (
        <div className={styles.footer}>
          {caption && !error && (
            <span id={captionId} className={styles.caption}>
              {caption}
            </span>
          )}
          {error && (
            <div
              id={errorId}
              className={styles.errorMessage}
              role="alert"
              aria-live="polite"
            >
              <Icon
                icon={InfoOutlined}
                size="sm"
                color="error"
                className={styles.errorIcon}
                aria-hidden="true"
              />
              <span>{error}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
