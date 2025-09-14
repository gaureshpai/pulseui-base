import React from "react";
import { Text } from "../Text/Text";
import { BarChart } from "../BarChart";
import type { BarSeries } from "../BarChart";
import { TrendUp } from "../Icon/IconSet";
import styles from "./NewPatientDashboard.module.scss";

export interface NewPatientDashboardProps {
  /** Title of the dashboard */
  title?: string;
  /** Trend percentage */
  trendPercentage?: number;
  /** Trend label */
  trendLabel?: string;
  /** Whether the trend is positive */
  trendPositive?: boolean;
  /** Chart data */
  chartData?: {
    year: string;
    purple: number;
    orange: number;
    red: number;
  }[];
  /** Overall metric value */
  overallValue?: string;
  /** Monthly metric value */
  monthlyValue?: string;
  /** Daily metric value */
  dailyValue?: string;
}

export const NewPatientDashboard: React.FC<NewPatientDashboardProps> = ({
  title = "New Visits",
  trendPercentage = 14.21,
  trendLabel = "High than last month",
  chartData = [
    { year: "2020", purple: 295, orange: 95, red: 195 },
    { year: "2021", purple: 145, orange: 45, red: 95 },
    { year: "2022", purple: 245, orange: 95, red: 145 },
    { year: "2023", purple: 330, orange: 95, red: 245 },
  ],
  overallValue = "76.5%",
  monthlyValue = "76.5%",
  dailyValue = "76.5%",
}) => {
  // Prepare data for BarChart component
  const xLabels = chartData.map((d) => d.year);
  const series: BarSeries[] = [
    {
      label: "Purple",
      data: chartData.map((d) => d.purple),
      colorVar: "--metric-brand-c",
    },
    {
      label: "Orange",
      data: chartData.map((d) => d.orange),
      colorVar: "--metric-brand-d",
    },
    {
      label: "Red",
      data: chartData.map((d) => d.red),
      colorVar: "--metric-brand-e",
    },
  ];

  return (
    <section
      className={styles.dashboard}
      role="region"
      aria-labelledby={`${title.toLowerCase().replace(/\s+/g, "-")}-title`}
    >
      {/* Header */}
      <header className={styles.header}>
        <h2
          id={`${title.toLowerCase().replace(/\s+/g, "-")}-title`}
          className={styles.title}
        >
          {title}
        </h2>
        <div
          className={styles.trendIndicator}
          role="img"
          aria-label={`Trend indicator showing ${trendPercentage}% ${trendLabel}`}
        >
          <TrendUp className={styles.trendIcon} aria-hidden="true" />
          <Text
            variant="md"
            className={`${styles.trendText} ${styles.trendPositive}`}
          >
            {trendPercentage}% {trendLabel}
          </Text>
        </div>
      </header>

      {/* Bar Chart */}
      <div className={styles.chartContainer}>
        <BarChart
          xLabels={xLabels}
          series={series}
          height={300}
          variant="basic"
          title={`${title} Data Chart`}
        />
      </div>

      {/* Footer Metrics */}
      <div
        className={styles.footerMetrics}
        role="group"
        aria-label={`${title} metrics summary`}
      >
        <div className={styles.metric}>
          <Text variant="md" className={styles.metricLabel}>
            Overall
          </Text>
          <Text variant="lg" className={styles.metricValue}>
            {overallValue}
          </Text>
        </div>
        <div className={styles.metric}>
          <Text variant="md" className={styles.metricLabel}>
            Monthly
          </Text>
          <Text variant="lg" className={styles.metricValue}>
            {monthlyValue}
          </Text>
        </div>
        <div className={styles.metric}>
          <Text variant="md" className={styles.metricLabel}>
            Day
          </Text>
          <Text variant="lg" className={styles.metricValue}>
            {dailyValue}
          </Text>
        </div>
      </div>
    </section>
  );
};
