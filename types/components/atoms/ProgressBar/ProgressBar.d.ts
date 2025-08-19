import React from "react";
import type { WithSxProps } from "../../../utils/sxUtils";
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
export declare const ProgressBar: React.FC<ProgressBarProps>;
