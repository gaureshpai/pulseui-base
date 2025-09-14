import React from "react";
import { Icon } from "../Icon/Icon";
import { TrendUp, TrendDown } from "../Icon/IconSet";
import styles from "./MetricCard.module.scss";
import type { SvgIconComponent } from "@mui/icons-material";
import type { WithSxProps } from "../../../utils/sxUtils";
import { mergeSxWithStyles, combineClassNames } from "../../../utils/sxUtils";

export interface MetricCardProps extends WithSxProps {
  /** Title of the metric */
  title: string;
  /** Main metric value */
  value: string | number;
  /** Trend percentage (positive or negative) */
  trend?: number;
  /** Trend label (e.g., "Up from yesterday") */
  trendLabel?: string;
  /** Icon to display */
  icon?: SvgIconComponent;
  /** Icon background color variant */
  iconVariant?:
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "error"
    | "info";
  /** Whether the trend is positive (green) or negative (red) */
  trendPositive?: boolean;
  /** Click handler for the card */
  onClick?: () => void;
  /** Whether the card is clickable */
  clickable?: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  trend,
  trendLabel,
  icon,
  iconVariant = "primary",
  trendPositive = true,
  onClick,
  clickable = false,
  className = "",
  sx,
  style,
}) => {
  const { style: sxStyle, className: sxClassName } = mergeSxWithStyles(
    sx,
    style,
    className
  );

  const cardClasses = combineClassNames(
    styles.metricCard,
    clickable && styles.clickable,
    sxClassName
  );

  const iconClasses = combineClassNames(
    styles.iconContainer,
    styles[`icon-${iconVariant}`]
  );

  const trendClasses = combineClassNames(
    styles.trendContainer,
    trendPositive ? styles.trendPositive : styles.trendNegative
  );

  const handleClick = () => {
    if (clickable && onClick) {
      onClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (clickable && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className={cardClasses}
      style={sxStyle}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
    >
      <div className={styles.content}>
        <div className={styles.textContent}>
          <div className={styles.titleValueGroup}>
            <h3 className={styles.title}>{title}</h3>
            <div className={styles.value} style={{ fontSize: "30px" }}>
              {value}
            </div>
          </div>
          {icon && (
            <div className={iconClasses}>
              <Icon
                icon={icon}
                size="md"
                color="white"
                className={styles.icon}
              />
            </div>
          )}
          {trend !== undefined && (
            <div className={trendClasses}>
              <Icon
                icon={trendPositive ? TrendUp : TrendDown}
                size="sm"
                color="inherit"
                className={styles.trendIcon}
              />
              <span className={styles.trendText}>
                <span className={styles.trendPercentage}>
                  {Math.abs(trend)}%
                </span>
                <span className={styles.trendDescription}>
                  {" "}
                  {trendLabel ||
                    (trendPositive
                      ? "Up from yesterday"
                      : "Down from yesterday")}
                </span>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
