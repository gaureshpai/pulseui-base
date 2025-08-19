import React, { useEffect, useState } from "react";
import styles from "./ProgressBar.module.scss";
import type { WithSxProps } from "../../../utils/sxUtils";
import { mergeSxWithStyles, combineClassNames } from "../../../utils/sxUtils";

export type ProgressBarSize = "sm" | "md" | "lg";
export type ProgressBarVariant = "default" | "success" | "warning" | "error" | "info";

export interface ProgressBarProps extends WithSxProps {
  /** Current progress value (0-100) */
  value: number;
  /** Maximum progress value (default: 100) */
  max?: number;
  /** Label displayed above the progress bar */
  label?: string;
  /** Helper text displayed below the progress bar */
  helperText?: string;
  /** Size variant of the progress bar */
  size?: ProgressBarSize;
  /** Visual variant of the progress bar */
  variant?: ProgressBarVariant;
  /** Whether to show the progress percentage */
  showPercentage?: boolean;
  /** Whether the progress bar is animated */
  animated?: boolean;
  /** Whether the progress bar is indeterminate (loading state) */
  indeterminate?: boolean;
  /** Custom class name */
  className?: string;
  /** Custom styles */
  sx?: any;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Custom aria label for accessibility */
  ariaLabel?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  helperText,
  size = "md",
  variant = "default",
  showPercentage = false,
  animated = true,
  indeterminate = false,
  className = "",
  sx,
  style,
  ariaLabel,
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Calculate progress percentage
  const progressPercentage = Math.min(Math.max((value / max) * 100, 0), 100);

  // Animate progress value
  useEffect(() => {
    if (animated && !indeterminate) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setDisplayValue(progressPercentage);
        setIsAnimating(false);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setDisplayValue(progressPercentage);
    }
  }, [progressPercentage, animated, indeterminate]);

  // Handle indeterminate animation
  useEffect(() => {
    if (indeterminate) {
      setIsAnimating(true);
    } else {
      setIsAnimating(false);
    }
  }, [indeterminate]);

  const { style: sxStyle, className: sxClassName } = mergeSxWithStyles(
    sx,
    style,
    className
  );

  const progressBarClasses = combineClassNames(
    styles.progressBar,
    styles[size],
    styles[variant],
    animated && styles.animated,
    indeterminate && styles.indeterminate,
    isAnimating && styles.animating,
    sxClassName
  );

  const progressFillClasses = combineClassNames(
    styles.progressFill,
    styles[`fill-${variant}`],
    animated && styles.animated,
    indeterminate && styles.indeterminate
  );

  const progressTrackClasses = combineClassNames(
    styles.progressTrack,
    styles[`track-${variant}`]
  );

  const labelClasses = combineClassNames(
    styles.label,
    styles[`label-${size}`]
  );

  const helperClasses = combineClassNames(
    styles.helperText,
    styles[`helper-${size}`]
  );

  const percentageClasses = combineClassNames(
    styles.percentage,
    styles[`percentage-${size}`]
  );

  // Generate aria label
  const getAriaLabel = () => {
    if (ariaLabel) return ariaLabel;
    if (indeterminate) return "Loading in progress";
    return `Progress: ${Math.round(progressPercentage)}%`;
  };

  return (
    <div className={progressBarClasses} style={sxStyle}>
      {/* Label */}
      {label && (
        <div className={labelClasses}>
          {label}
          {showPercentage && !indeterminate && (
            <span className={percentageClasses}>
              {Math.round(progressPercentage)}%
            </span>
          )}
        </div>
      )}

      {/* Progress Bar Container */}
      <div className={progressTrackClasses}>
        {/* Progress Fill */}
        <div
          className={progressFillClasses}
          style={{
            width: indeterminate ? "100%" : `${displayValue}%`,
          }}
          role="progressbar"
          aria-valuenow={indeterminate ? undefined : Math.round(progressPercentage)}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={getAriaLabel()}
        />
      </div>

      {/* Helper Text */}
      {helperText && (
        <div className={helperClasses}>
          {helperText}
        </div>
      )}
    </div>
  );
};

ProgressBar.displayName = "ProgressBar";


