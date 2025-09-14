import React from "react";
import {
  SimpleTopNav,
  MetricCard,
  Button,
  Text,
  BrandLogo,
  ThemeSwitcher,
  UserProfile,
  BrandSwitcher,
  NewPatientDashboard,
} from "../../index";
import type { SimpleTopNavItem } from "../../atoms/SimpleTopNav/SimpleTopNav";
import {
  Notifications,
  Add,
  Person,
  Visibility,
  Payment,
} from "../atoms/Icon/IconSet";
import styles from "./Dashboard.module.scss";

const Dashboard: React.FC = () => {
  // Initialize brand for dashboard demo
  React.useEffect(() => {
    const root = document.documentElement;
    // Set a default brand for demo purposes (can be changed via BrandSwitcher)
    const currentBrand = root.getAttribute("data-brand") || "github";
    root.setAttribute("data-brand", currentBrand);

    // Ensure mode is set
    const currentMode = root.getAttribute("data-mode") || "light";
    root.setAttribute("data-mode", currentMode);
  }, []);

  // Navigation items for the dashboard
  const navItems: SimpleTopNavItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      active: true,
      onClick: () => {},
    },
    {
      id: "analytics",
      label: "Analytics",
      active: false,
      onClick: () => {},
    },
    {
      id: "users",
      label: "Users",
      active: false,
      onClick: () => {},
    },
    {
      id: "settings",
      label: "Settings",
      active: false,
      onClick: () => {},
    },
  ];

  return (
    <main className={styles.dashboard} role="main">
      {/* Debug: Test BrandLogo directly */}
      <div
        style={{
          padding: "16px",

          backgroundColor: "var(--color-surface)",
          borderBottom: "1px solid var(--color-border-primary)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <BrandLogo
          size="sm"
          showText={false}
          sx={{
            paddingRight: "600px",
            paddingLeft: "40px",
          }}
        />
        <BrandSwitcher
          size="sm"
          showDescription={false}
          variant="select"
          label=""
          className={styles.brandSwitcher}
          sx={{
            paddingRight: "10px",
            paddingLeft: "0px",
            marginRight: "0px",
          }}
        />
        <ThemeSwitcher
          sx={{
            paddingRight: "10px",
            paddingLeft: "10px",
            marginRight: "10px",
            marginLeft: "10px",
          }}
        />
        <UserProfile
          sx={{
            paddingRight: "0px",
            paddingLeft: "10px",
            marginRight: "0px",
            marginLeft: "0px",
          }}
          name="John Doe"
          variant="default"
          avatarSrc="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
        />
      </div>

      {/* Top Navigation */}

      {/* Action Buttons */}

      {/* Dashboard Content */}
      <div className={styles.dashboardContent}>
        {/* Header */}
        <header className={styles.dashboardHeader}>
          <h1 className={styles.dashboardTitle}>Analytics Dashboard</h1>
          <p className={styles.dashboardSubtitle}>
            Real-time insights and performance metrics
          </p>
        </header>

        {/* Metrics Grid */}
        <section
          className={styles.metricsGrid}
          aria-label="Key performance metrics"
          role="region"
        >
          <MetricCard
            title="Total Users"
            value="1,234"
            trend={12.5}
            trendLabel="Up from yesterday"
            trendPositive={true}
            icon={Person}
            iconVariant="primary"
          />
          <MetricCard
            title="Page Views"
            value="5,678"
            trend={8.5}
            trendLabel="Up from yesterday"
            trendPositive={true}
            icon={Visibility}
            iconVariant="warning"
          />
          <MetricCard
            title="Conversion Rate"
            value="89%"
            trend={-2.3}
            trendLabel="Down from yesterday"
            trendPositive={false}
            icon={Payment}
            iconVariant="error"
          />
          <MetricCard
            title="Revenue"
            value="$12,345"
            trend={15.7}
            trendLabel="Up from yesterday"
            trendPositive={true}
            icon={Payment}
            iconVariant="secondary"
          />
        </section>

        {/* Charts Section */}
        <section
          className={styles.chartsGrid}
          aria-label="Data visualization charts"
          role="region"
        >
          <div className={styles.chartCard}>
            <NewPatientDashboard
              title="New Visits"
              trendPercentage={14.21}
              trendLabel="High than last month"
              trendPositive={true}
            />
          </div>
          <div className={styles.chartCard}>
            <NewPatientDashboard
              title="User Engagement"
              trendPercentage={8.5}
              trendLabel="Up from last month"
              trendPositive={true}
              chartData={[
                { year: "2020", purple: 180, orange: 120, red: 80 },
                { year: "2021", purple: 220, orange: 150, red: 100 },
                { year: "2022", purple: 280, orange: 180, red: 120 },
                { year: "2023", purple: 320, orange: 200, red: 140 },
              ]}
              overallValue="85.2%"
              monthlyValue="78.9%"
              dailyValue="92.1%"
            />
          </div>
        </section>

        {/* Table Section */}
        <section
          className={styles.tableCard}
          aria-label="Recent user activity"
          role="region"
        >
          <h2 className={styles.cardTitle}>Recent Activity</h2>
          <div className={styles.tableContainer}>
            <table
              className={styles.table}
              role="table"
              aria-label="Recent user activity table"
            >
              <thead>
                <tr>
                  <th scope="col">User</th>
                  <th scope="col">Action</th>
                  <th scope="col">Status</th>
                  <th scope="col">Time</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>john.doe@example.com</td>
                  <td>Account Created</td>
                  <td>
                    <span
                      className={`${styles.statusBadge} ${styles.statusActive}`}
                    >
                      Active
                    </span>
                  </td>
                  <td>2 minutes ago</td>
                </tr>
                <tr>
                  <td>jane.smith@example.com</td>
                  <td>Profile Updated</td>
                  <td>
                    <span
                      className={`${styles.statusBadge} ${styles.statusPending}`}
                    >
                      Pending
                    </span>
                  </td>
                  <td>5 minutes ago</td>
                </tr>
                <tr>
                  <td>mike.wilson@example.com</td>
                  <td>Subscription Cancelled</td>
                  <td>
                    <span
                      className={`${styles.statusBadge} ${styles.statusInactive}`}
                    >
                      Inactive
                    </span>
                  </td>
                  <td>10 minutes ago</td>
                </tr>
                <tr>
                  <td>sarah.jones@example.com</td>
                  <td>Payment Processed</td>
                  <td>
                    <span
                      className={`${styles.statusBadge} ${styles.statusActive}`}
                    >
                      Active
                    </span>
                  </td>
                  <td>15 minutes ago</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
