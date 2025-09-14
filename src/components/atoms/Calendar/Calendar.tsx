import React, { useState, useMemo } from "react";
import styles from "./Calendar.module.scss";
// import type { SxProps } from "../../../styles/stylesApi";
import type { WithSxProps } from "../../../utils/sxUtils";
import { mergeSxWithStyles, combineClassNames } from "../../../utils/sxUtils";
import { CalendarDate, type CalendarDateProps } from "./CalendarParts";
import { CalendarTitle } from "./CalendarParts";

export interface CalendarProps extends WithSxProps {
  /** The date to display (defaults to current date) */
  date?: Date;
  /** Calendar view type */
  view?: "month" | "year" | "decade";
  /** Callback when a date is selected */
  onDateSelect?: (date: Date) => void;
  /** Callback when a year is selected */
  onYearSelect?: (year: number) => void;
  /** Callback when a date range is selected */
  onRangeSelect?: (startDate: Date | null, endDate: Date | null) => void;

  /** Callback when month/year changes */
  onMonthChange?: (date: Date) => void;
  /** Callback when decade changes */
  onDecadeChange?: (year: number) => void;
  /** Callback when century changes */
  onCenturyChange?: (year: number) => void;
  /** Callback when view changes */
  onViewChange?: (view: "month" | "year" | "decade") => void;
  /** Selected date(s) */
  selectedDate?: Date | Date[];
  /** Selected year */
  selectedYear?: number;
  /** Selected decade start year */
  selectedDecadeStart?: number;
  /** Range selection start date */
  rangeStart?: Date;
  /** Range selection end date */
  rangeEnd?: Date;
  /** Whether to enable range selection mode */
  rangeSelection?: boolean;
  /** Size of the calendar */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Whether to show navigation arrows */
  showNavigation?: boolean;
  /** Whether to show day labels */
  showDayLabels?: boolean;
  /** Whether the calendar is disabled */
  disabled?: boolean;
  /** Custom day labels (defaults to Su, Mo, Tu, We, Th, Fr, Sa) */
  dayLabels?: string[];
  /** Whether to show dates from previous/next months */
  showOutsideDates?: boolean;
  /** Whether to enable connected navigation between views */
  connected?: boolean;
  /** Whether to show indicators on dates */
  showIndicators?: boolean;
  /** Function to determine if a date should show an indicator */
  getDateIndicator?: (date: Date) => boolean;
  /** Unique identifier */
  id?: string;
}

export const Calendar: React.FC<CalendarProps> = ({
  date = new Date(),
  view = "month",
  onDateSelect,
  onYearSelect,
  onRangeSelect,
  onMonthChange,
  onCenturyChange,
  onViewChange,
  selectedDate,
  rangeStart,
  rangeEnd,
  rangeSelection = false,
  size = "md",
  showNavigation = true,
  showDayLabels = true,
  disabled = false,
  dayLabels = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  connected = false,
  showIndicators = true,
  getDateIndicator = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  },
  id,
  className = "",
  sx,
  style,
}) => {
  const [currentDate, setCurrentDate] = useState(date);
  const [currentYear, setCurrentYear] = useState(date.getFullYear());

  // Internal range selection state
  const [internalRangeStart, setInternalRangeStart] = useState<Date | null>(
    rangeStart || null
  );
  const [internalRangeEnd, setInternalRangeEnd] = useState<Date | null>(
    rangeEnd || null
  );
  const [isSelectingRange, setIsSelectingRange] = useState(false);

  const { style: sxStyle, className: sxClassName } = mergeSxWithStyles(
    sx,
    style,
    className
  );

  const calendarClasses = combineClassNames(
    styles.calendar,
    styles[`size-${size}`],
    disabled && styles.disabled,
    sxClassName
  );

  // Calculate calendar data for month view
  const calendarData = useMemo(() => {
    if (view !== "month") return [];

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Last day of the month

    // Start of the calendar (including previous month's dates)
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const dates: Array<{
      date: Date;
      isCurrentMonth: boolean;
      isToday: boolean;
      isSelected: boolean;
      isRangeStart: boolean;
      isRangeEnd: boolean;
      isInRange: boolean;
    }> = [];

    const today = new Date();
    const selectedDates = Array.isArray(selectedDate)
      ? selectedDate
      : selectedDate
      ? [selectedDate]
      : [];

    // Generate 42 dates (6 weeks * 7 days)
    for (let i = 0; i < 42; i++) {
      const dateToAdd = new Date(startDate);
      dateToAdd.setDate(startDate.getDate() + i);

      const isCurrentMonth = dateToAdd.getMonth() === month;
      const isToday = dateToAdd.toDateString() === today.toDateString();
      const isSelected = selectedDates.some(
        (selected) => selected.toDateString() === dateToAdd.toDateString()
      );

      // Use internal range state for range selection
      const effectiveRangeStart = rangeSelection
        ? internalRangeStart
        : rangeStart;
      const effectiveRangeEnd = rangeSelection ? internalRangeEnd : rangeEnd;

      const isRangeStart = !!(
        effectiveRangeStart &&
        dateToAdd.toDateString() === effectiveRangeStart.toDateString()
      );
      const isRangeEnd = !!(
        effectiveRangeEnd &&
        dateToAdd.toDateString() === effectiveRangeEnd.toDateString()
      );
      const isInRange = !!(
        effectiveRangeStart &&
        effectiveRangeEnd &&
        dateToAdd >= effectiveRangeStart &&
        dateToAdd <= effectiveRangeEnd
      );

      dates.push({
        date: dateToAdd,
        isCurrentMonth,
        isToday,
        isSelected,
        isRangeStart,
        isRangeEnd,
        isInRange,
      });
    }

    return dates;
  }, [
    currentDate,
    selectedDate,
    rangeStart,
    rangeEnd,
    rangeSelection,
    internalRangeStart,
    internalRangeEnd,
    view,
  ]);

  // Calculate month data for year view
  const monthData = useMemo(() => {
    if (view !== "year") return [];

    const months: Array<{
      month: number;
      monthName: string;
      isCurrentMonth: boolean;
      isSelected: boolean;
    }> = [];

    const today = new Date();
    const currentYearValue = today.getFullYear();
    const currentMonthValue = today.getMonth();

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // Generate 12 months
    for (let i = 0; i < 12; i++) {
      const month = i;
      const monthName = monthNames[i];
      const isCurrentMonth =
        currentYearValue === currentYear && month === currentMonthValue;
      const isSelected = false; // You can add month selection logic here if needed

      months.push({
        month,
        monthName,
        isCurrentMonth,
        isSelected,
      });
    }

    return months;
  }, [currentYear, view]);

  // Calculate year data for decade view
  const decadeData = useMemo(() => {
    if (view !== "decade") return [];

    const decadeStart = Math.floor(currentYear / 10) * 10;
    const years: Array<{
      year: number;
      isCurrentYear: boolean;
      isSelected: boolean;
    }> = [];

    const today = new Date();
    const currentYearValue = today.getFullYear();

    // Generate 10 years for the decade (2020-2029)
    for (let i = 0; i < 10; i++) {
      const year = decadeStart + i;
      const isCurrentYear = year === currentYearValue;
      const isSelected = false; // You can add year selection logic here if needed

      years.push({
        year,
        isCurrentYear,
        isSelected,
      });
    }

    return years;
  }, [currentYear, view]);

  // Month view handlers
  const handleDateClick = (clickedDate: Date) => {
    if (disabled) return;

    if (rangeSelection) {
      // Range selection logic
      if (!internalRangeStart || (internalRangeStart && internalRangeEnd)) {
        // Start new range selection
        setInternalRangeStart(clickedDate);
        setInternalRangeEnd(null);
        setIsSelectingRange(true);

        if (onRangeSelect) {
          onRangeSelect(clickedDate, null);
        }
      } else if (internalRangeStart && !internalRangeEnd) {
        // Complete range selection
        const startDate = internalRangeStart;
        const endDate = clickedDate;

        // Ensure start date is before end date
        const finalStartDate = startDate <= endDate ? startDate : endDate;
        const finalEndDate = startDate <= endDate ? endDate : startDate;

        setInternalRangeStart(finalStartDate);
        setInternalRangeEnd(finalEndDate);
        setIsSelectingRange(false);

        if (onRangeSelect) {
          onRangeSelect(finalStartDate, finalEndDate);
        }
      }
    } else {
      // Single date selection
      if (onDateSelect) {
        onDateSelect(clickedDate);
      }
    }
  };

  const handlePreviousMonth = () => {
    if (disabled) return;

    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);

    if (onMonthChange) {
      onMonthChange(newDate);
    }
  };

  const handleNextMonth = () => {
    if (disabled) return;

    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);

    if (onMonthChange) {
      onMonthChange(newDate);
    }
  };

  // Enhanced year click handler for better connected navigation

  // Enhanced month click handler for better connected navigation
  const handleMonthClick = (month: number) => {
    if (disabled) return;

    if (connected && onViewChange) {
      // Switch to month view for the selected month
      const newDate = new Date(currentYear, month, 1);
      setCurrentDate(newDate);
      onViewChange("month");
    }

    if (onMonthChange) {
      const newDate = new Date(currentYear, month, 1);
      onMonthChange(newDate);
    }
  };

  const handlePreviousYear = () => {
    if (disabled) return;
    setCurrentYear(currentYear - 1);
  };

  const handleNextYear = () => {
    if (disabled) return;
    setCurrentYear(currentYear + 1);
  };

  // Enhanced decade view handler for better connected navigation
  const handleYearInDecadeClick = (year: number) => {
    if (disabled) return;

    if (connected && onViewChange) {
      // Switch to year view for the selected year
      setCurrentYear(year);
      onViewChange("year");
    }

    if (onYearSelect) {
      onYearSelect(year);
    }
  };

  const handlePreviousCentury = () => {
    if (disabled) return;

    const newYear = currentYear - 100;
    setCurrentYear(newYear);

    if (onCenturyChange) {
      onCenturyChange(newYear);
    }
  };

  const handleNextCentury = () => {
    if (disabled) return;

    const newYear = currentYear + 100;
    setCurrentYear(newYear);

    if (onCenturyChange) {
      onCenturyChange(newYear);
    }
  };

  // Format functions
  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  // Navigation handlers based on view
  const handlePrevious = () => {
    if (view === "month") {
      handlePreviousMonth();
    } else if (view === "year") {
      handlePreviousYear();
    } else if (view === "decade") {
      handlePreviousCentury();
    }
  };

  const handleNext = () => {
    if (view === "month") {
      handleNextMonth();
    } else if (view === "year") {
      handleNextYear();
    } else if (view === "decade") {
      handleNextCentury();
    }
  };

  // Get header title based on view
  const getHeaderTitle = () => {
    if (view === "month") {
      return formatMonthYear(currentDate);
    } else if (view === "year") {
      return currentYear.toString();
    } else if (view === "decade") {
      const decadeStart = Math.floor(currentYear / 10) * 10;
      const decadeEnd = decadeStart + 9;
      return `${decadeStart}-${decadeEnd}`;
    }
    return "";
  };

  // Handle header click for connected navigation
  const handleHeaderClick = () => {
    if (!connected || disabled || !onViewChange) return;

    if (view === "month") {
      // Switch to year view
      setCurrentYear(currentDate.getFullYear());
      onViewChange("year");
    } else if (view === "year") {
      // Switch to decade view
      onViewChange("decade");
    } else if (view === "decade") {
      // Switch back to month view for the current year
      const newDate = new Date(currentYear, 0, 1);
      setCurrentDate(newDate);
      onViewChange("month");
    }
  };

  // Get navigation aria labels based on view
  const getPreviousAriaLabel = () => {
    if (view === "month") return "Previous month";
    if (view === "year") return "Previous year";
    if (view === "decade") return "Previous decade";
    return "Previous";
  };

  const getNextAriaLabel = () => {
    if (view === "month") return "Next month";
    if (view === "year") return "Next year";
    if (view === "decade") return "Next decade";
    return "Next";
  };

  // Get date variant and active state for month view
  const getDateVariant = (
    dateData: (typeof calendarData)[0]
  ): CalendarDateProps["variant"] => {
    if (!dateData.isCurrentMonth) return "disabled";
    if (dateData.isToday) return "holiday";
    return "default";
  };

  const getDateActive = (
    dateData: (typeof calendarData)[0]
  ): CalendarDateProps["active"] => {
    if (dateData.isSelected) return "selected";
    if (dateData.isRangeStart) return "initial";
    if (dateData.isRangeEnd) return "end";
    if (dateData.isInRange) return "passive";
    return "off";
  };

  return (
    <div className={calendarClasses} style={sxStyle} id={id}>
      {/* Header */}
      <div className={styles.header}>
        {showNavigation && (
          <button
            className={styles.navButton}
            onClick={handlePrevious}
            disabled={disabled}
            aria-label={getPreviousAriaLabel()}
          >
            ‹
          </button>
        )}

        <CalendarTitle
          type="titles"
          size={size}
          onClick={connected ? handleHeaderClick : undefined}
          style={connected ? { cursor: "pointer" } : undefined}
        >
          {getHeaderTitle()}
        </CalendarTitle>

        {showNavigation && (
          <button
            className={styles.navButton}
            onClick={handleNext}
            disabled={disabled}
            aria-label={getNextAriaLabel()}
          >
            ›
          </button>
        )}
      </div>

      {/* Month View */}
      {view === "month" && (
        <>
          {/* Day Labels */}
          {showDayLabels && (
            <div className={styles.dayLabels}>
              {dayLabels.map((label, index) => (
                <CalendarTitle key={index} type="day" size={size}>
                  {label}
                </CalendarTitle>
              ))}
            </div>
          )}

          {/* Calendar Grid */}
          <div className={styles.grid}>
            {calendarData.map((dateData, index) => (
              <CalendarDate
                key={index}
                date={dateData.date}
                variant={getDateVariant(dateData)}
                active={getDateActive(dateData)}
                size={size}
                disabled={disabled || !dateData.isCurrentMonth}
                onClick={handleDateClick}
                indicator={showIndicators && getDateIndicator(dateData.date)}
              />
            ))}
          </div>
        </>
      )}

      {/* Year View */}
      {view === "year" && (
        <div className={styles.yearGrid}>
          {monthData.map((monthData, index) => (
            <CalendarTitle
              key={index}
              type="day"
              size={size}
              onClick={() => handleMonthClick(monthData.month)}
              disabled={disabled}
            >
              {monthData.monthName}
            </CalendarTitle>
          ))}
        </div>
      )}

      {/* Decade View */}
      {view === "decade" && (
        <div className={styles.decadeGrid}>
          {decadeData.map((yearData, index) => (
            <CalendarTitle
              key={index}
              type="day"
              size={size}
              onClick={() => handleYearInDecadeClick(yearData.year)}
              disabled={disabled}
            >
              {yearData.year}
            </CalendarTitle>
          ))}
          {/* Add empty cells for the last 2 positions to complete 4x3 grid */}
          {Array.from({ length: 2 }, (_, index) => (
            <div key={`empty-${index}`} className={styles.emptyCell} />
          ))}
        </div>
      )}
    </div>
  );
};

Calendar.displayName = "Calendar";

export default Calendar;
