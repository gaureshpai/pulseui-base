import React, { forwardRef } from "react";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import { Icon } from "../Icon";
import { Check } from "../Icon/IconSet";
import styles from "./Checkbox.module.scss";
import type { WithSxProps } from "../../../utils/sxUtils";
import { mergeSxWithStyles, combineClassNames } from "../../../utils/sxUtils";

export interface CheckboxProps extends WithSxProps {
  id?: string;
  name?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  required?: boolean;
  label?: string;
  error?: string;
  size?: "sm" | "md" | "lg";
  indeterminate?: boolean;
  ariaLabel?: string;
  onChange?: (checked: boolean) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      id,
      name,
      checked,
      defaultChecked,
      disabled = false,
      required = false,
      label,
      error,
      size = "md",
      indeterminate,
      ariaLabel,
      onChange,
      onFocus,
      onBlur,
      className = "",
      sx,
      style,
    },
    ref
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);
    const [internalChecked, setInternalChecked] = React.useState(
      defaultChecked || false
    );
    const { style: sxStyle, className: sxClassName } = mergeSxWithStyles(
      sx,
      style,
      className
    );

    const isControlled = checked !== undefined;
    const currentChecked = isControlled ? checked : internalChecked;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = event.target.checked;
      if (!isControlled) {
        setInternalChecked(newChecked);
      }
      onChange?.(newChecked);
    };

    // Generate unique IDs for accessibility
    const generatedId = React.useId();
    const checkboxId = id || generatedId;
    const errorId = error ? `${checkboxId}-error` : undefined;

    const containerClasses = combineClassNames(sxClassName);

    React.useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = !!indeterminate && !currentChecked;
      }
    }, [indeterminate, currentChecked]);

    return (
      <div className={containerClasses} style={sxStyle}>
        <div className={styles.checkboxLabelGroup}>
          <input
            ref={inputRef}
            id={checkboxId}
            name={name}
            type="checkbox"
            checked={currentChecked}
            disabled={disabled}
            required={required}
            onChange={handleChange}
            onFocus={onFocus}
            onBlur={onBlur}
            className={styles.checkboxInput}
            aria-describedby={errorId}
            aria-invalid={!!error}
            aria-label={ariaLabel}
          />

          <div
            className={`
              ${styles.checkbox}
              ${styles[`size-${size}`]}
              ${currentChecked ? styles.checked : ""}
              ${disabled ? styles.disabled : ""}
              ${error ? styles.error : ""}
            `}
            aria-hidden="true"
            onClick={() => {
              if (!disabled) {
                const input = document.getElementById(
                  checkboxId
                ) as HTMLInputElement;
                if (input) {
                  input.click();
                }
              }
            }}
          >
            {currentChecked && (
              <Icon
                icon={Check}
                size={size === "sm" ? "xs" : size === "lg" ? "sm" : "sm"}
                sx={{ color: "white" }}
              />
            )}
          </div>

          {label && (
            <label
              htmlFor={checkboxId}
              className={`
                ${styles.label}
                ${styles[`size-${size}`]}
                ${disabled ? styles.disabled : ""}
              `}
            >
              {label}
              {required && <span className={styles.required}>*</span>}
            </label>
          )}
        </div>

        {error && (
          <div
            id={errorId}
            className={`
              ${styles.errorMessage}
              ${styles[`size-${size}`]}
            `}
            role="alert"
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "var(--spacing-xs)",
                color: "var(--color-icon-error)",
              }}
            >
              <ErrorOutlineRoundedIcon fontSize="small" />
            </span>
            {error}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
