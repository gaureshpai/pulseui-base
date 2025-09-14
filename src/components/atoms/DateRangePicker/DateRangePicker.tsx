import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./DateRangePicker.module.scss";
import { Input } from "../Input";
import { Calendar } from "../Calendar";
import { Icon } from "../Icon";
import { CalendarToday } from "../Icon/IconSet";
import type { WithSxProps } from "../../../utils/sxUtils";
import { mergeSxWithStyles, combineClassNames } from "../../../utils/sxUtils";

export interface DateRangePickerProps extends WithSxProps {
  /** Label for the date range picker */
  label?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Start date value */
  startDate?: string;
  /** End date value */
  endDate?: string;
  /** Start date placeholder */
  startPlaceholder?: string;
  /** End date placeholder */
  endPlaceholder?: string;
  /** Whether the component is disabled */
  disabled?: boolean;
  /** Error message */
  error?: string;
  /** Helper text */
  helperText?: string;
  /** Callback when start date changes */
  onStartDateChange?: (date: string) => void;
  /** Callback when end date changes */
  onEndDateChange?: (date: string) => void;
  /** Callback when date range changes */
  onRangeChange?: (startDate: string, endDate: string) => void;
  /** Callback when start date input is focused */
  onStartFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** Callback when end date input is focused */
  onEndFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** Callback when start date input loses focus */
  onStartBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** Callback when end date input loses focus */
  onEndBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** Unique identifier */
  id?: string;
  /** Start date input name */
  startName?: string;
  /** End date input name */
  endName?: string;
  /** Size of the inputs */
  size?: "sm" | "md" | "lg" | "xl";
  /** Whether to show calendar icons */
  showCalendarIcons?: boolean;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  label,
  required = false,
  startDate = "",
  endDate = "",
  startPlaceholder = "Start date",
  endPlaceholder = "End date",
  disabled = false,
  error,
  helperText,
  onStartDateChange,
  onEndDateChange,
  onRangeChange,
  onStartFocus,
  onEndFocus,
  onStartBlur,
  onEndBlur,
  id,
  startName,
  endName,
  size = "md",
  showCalendarIcons = true,
  className = "",
  sx,
  style,
}) => {
  // Generate unique IDs for accessibility
  const generatedId = React.useId();
  const containerId = id || generatedId;
  const startId = `${containerId}-start`;
  const endId = `${containerId}-end`;
  const helperTextId = helperText ? `${containerId}-helper` : undefined;
  const errorId = error ? `${containerId}-error` : undefined;
  const describedBy = [helperTextId, errorId].filter(Boolean).join(" ");

  // Calendar state
  const [showCalendar, setShowCalendar] = useState(false);
  const [activeInput, setActiveInput] = useState<"start" | "end" | null>(null);
  const [tempStartDate, setTempStartDate] = useState<Date | null>(null);
  const [tempEndDate, setTempEndDate] = useState<Date | null>(null);
  const [calendarPosition, setCalendarPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });
  const calendarRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { style: sxStyle, className: sxClassName } = mergeSxWithStyles(
    sx,
    style,
    className
  );

  const containerClasses = combineClassNames(
    styles.dateRangePicker,
    styles[`size-${size}`],
    disabled && styles.disabled,
    error && styles.error,
    sxClassName
  );

  const handleStartDateChange = (value: string) => {
    onStartDateChange?.(value);
    onRangeChange?.(value, endDate);
  };

  const handleEndDateChange = (value: string) => {
    onEndDateChange?.(value);
    onRangeChange?.(startDate, value);
  };

  // Calendar handlers
  const handleCalendarClick = () => {
    console.log("DateRangePicker clicked"); // Debug log
    setActiveInput("start"); // Default to start date
    setShowCalendar(true);

    // Calculate position for the calendar popup
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      console.log("Container rect:", rect); // Debug log
      setCalendarPosition({
        top: rect.bottom + window.scrollY + 4, // 4px gap
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }

    // Set temp dates based on current values
    setTempStartDate(startDate ? new Date(startDate) : null);
    setTempEndDate(endDate ? new Date(endDate) : null);
  };

  const handleCalendarRangeSelect = (start: Date | null, end: Date | null) => {
    setTempStartDate(start);
    setTempEndDate(end);

    // Update the active input
    if (activeInput === "start" && start) {
      const startDateString = start.toISOString().split("T")[0];
      onStartDateChange?.(startDateString);
      onRangeChange?.(startDateString, endDate);
    } else if (activeInput === "end" && end) {
      const endDateString = end.toISOString().split("T")[0];
      onEndDateChange?.(endDateString);
      onRangeChange?.(startDate, endDateString);
    }
  };

  const handleCalendarClose = () => {
    setShowCalendar(false);
    setActiveInput(null);
  };

  // Convert string dates to Date objects for Calendar component
  const calendarStartDate = startDate ? new Date(startDate) : undefined;
  const calendarEndDate = endDate ? new Date(endDate) : undefined;

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        containerRef.current &&
        !calendarRef.current.contains(event.target as Node) &&
        !containerRef.current.contains(event.target as Node)
      ) {
        handleCalendarClose();
      }
    };

    if (showCalendar) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCalendar]);

  const mainComponent = (
    <div
      ref={containerRef}
      className={containerClasses}
      onClick={handleCalendarClick}
      style={{ cursor: "pointer", ...sxStyle }}
    >
      {/* Label */}
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}

      {/* Date Range Inputs */}
      <div className={styles.inputsContainer}>
        {/* Start Date Input */}
        <div className={styles.inputWrapper}>
          <Input
            id={startId}
            name={startName}
            type="text"
            value={startDate}
            placeholder={startPlaceholder}
            disabled={disabled}
            required={required}
            size={size}
            onChange={handleStartDateChange}
            onFocus={onStartFocus}
            onBlur={onStartBlur}
            className={styles.input}
            aria-describedby={describedBy || undefined}
            aria-invalid={!!error}
            aria-required={required}
            readonly={true}
          />
          {showCalendarIcons && (
            <div className={styles.calendarIcon}>
              <Icon
                icon={CalendarToday}
                size={size === "sm" ? "sm" : size === "lg" ? "md" : "sm"}
                color="muted"
              />
            </div>
          )}
        </div>

        {/* Separator */}
        <div className={styles.separator}>
          <span className={styles.hyphen}>-</span>
        </div>

        {/* End Date Input */}
        <div className={styles.inputWrapper}>
          <Input
            id={endId}
            name={endName}
            type="text"
            value={endDate}
            placeholder={endPlaceholder}
            disabled={disabled}
            required={required}
            size={size}
            onChange={handleEndDateChange}
            onFocus={onEndFocus}
            onBlur={onEndBlur}
            className={styles.input}
            aria-describedby={describedBy || undefined}
            aria-invalid={!!error}
            aria-required={required}
            readonly={true}
          />
          {showCalendarIcons && (
            <div className={styles.calendarIcon}>
              <Icon
                icon={CalendarToday}
                size={size === "sm" ? "sm" : size === "lg" ? "md" : "sm"}
                color="muted"
              />
            </div>
          )}
        </div>
      </div>

      {/* Calendar Popup - Temporary inline for debugging */}
      {showCalendar && (
        <div
          ref={calendarRef}
          className={styles.calendarPopup}
          style={{
            position: "fixed",
            top: calendarPosition.top,
            left: calendarPosition.left,
            width: calendarPosition.width,
            zIndex: 9999,
            backgroundColor: "red", // Debug: make it visible
            border: "2px solid blue", // Debug: make it visible
            padding: "20px",
          }}
        >
          <div style={{ backgroundColor: "yellow", padding: "10px" }}>
            CALENDAR TEST - {activeInput}
          </div>
          <Calendar
            view="month"
            rangeStart={calendarStartDate}
            rangeEnd={calendarEndDate}
            rangeSelection={true}
            onRangeSelect={handleCalendarRangeSelect}
            size="sm"
            showNavigation={true}
            showDayLabels={true}
            showOutsideDates={true}
            sx={{
              width: "100%",
              maxWidth: "400px",
            }}
          />
        </div>
      )}

      {/* Helper Text */}
      {helperText && (
        <div id={helperTextId} className={styles.helperText}>
          {helperText}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div
          id={errorId}
          className={styles.errorText}
          role="alert"
          aria-live="polite"
        >
          {error}
        </div>
      )}
    </div>
  );

  // Render calendar portal
  const calendarPortal =
    showCalendar &&
    createPortal(
      <div
        ref={calendarRef}
        className={styles.calendarPopup}
        style={{
          position: "fixed",
          top: calendarPosition.top,
          left: calendarPosition.left,
          width: calendarPosition.width,
          zIndex: 9999,
        }}
      >
        <Calendar
          view="month"
          rangeStart={calendarStartDate}
          rangeEnd={calendarEndDate}
          rangeSelection={true}
          onRangeSelect={handleCalendarRangeSelect}
          size="sm"
          showNavigation={true}
          showDayLabels={true}
          showOutsideDates={true}
          sx={{
            width: "100%",
            maxWidth: "400px",
          }}
        />
      </div>,
      document.body
    );

  console.log("Show calendar:", showCalendar); // Debug log
  console.log("Calendar position:", calendarPosition); // Debug log

  return mainComponent;
};

DateRangePicker.displayName = "DateRangePicker";
