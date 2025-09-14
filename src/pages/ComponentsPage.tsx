import React, { useEffect, useState, useRef } from "react";
import { useBreakpoint } from "../hooks/useBreakpoint";
import {
  Settings,
  Message,
  Photo,
  Search,
  Sync,
  Delete,
  Notifications,
  Payment,
  Fingerprint,
  VpnKey,
  Storage,
  LockOutlined,
  Add,
  Person,
  Visibility,
} from "../components/atoms/Icon/IconSet";
import {
  // Core Components
  Button,
  Input,
  Textarea,
  PinInput,
  PillInput,
  Radio,
  Switch,
  Select,
  Checkbox,
  Toggle,
  Alert,
  Pagination,
  ProgressBar,
  Carousel,
  Breadcrumbs,

  // Display Components
  Text,
  Badge,
  Card,
  Avatar,
  Pill,
  ProfileCard,
  UserProfile,
  LeftDrawer,
  MetricCard,
  NewPatientDashboard,
  Tag,

  // Accordion Components
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionContent,

  // Action Components
  VariantSelector,

  // Stepper Components
  Stepper,

  // Layout Components
  Grid,
  GridCol,

  // Modal and Drawer Components
  Modal,
  Drawer,

  // Date and Input Components
  Calendar,
  DateRangePicker,
  PasswordInput,

  // Interactive Components
  Tabs,
  TabsList,
  TabsTab,
  TabsPanel,
  FileUpload,
  Menu,
  Table,
  DataTable,
  Skeleton,
  Snackbar,
  Loader,
  LineChart,
  BarChart,
  Sparkline,
  PieChart,
  HeatMap,
} from "../index";

export function ComponentsPage() {
  const [checkboxState, setCheckboxState] = React.useState("default");
  const [inputState, setInputState] = React.useState<
    "default" | "filled" | "unstyled"
  >("default");
  const [textAreaState, setTextAreaState] = React.useState<
    "default" | "error" | "disabled"
  >("default");
  const [pillState, setPillState] = React.useState<
    "default" | "info" | "success" | "warning" | "error"
  >("default");

  const [tagState, setTagState] = React.useState<
    "default" | "teal" | "selected" | "mint"
  >("default");
  const [avatarState, setAvatarState] = React.useState<
    "primary" | "secondary" | "success" | "warning"
  >("primary");

  // Button loading state
  const [buttonLoading, setButtonLoading] = useState(false);
  const [buttonVariant, setButtonVariant] = useState<
    "filled" | "subtle" | "light" | "outline" | "white" | "default"
  >("filled");

  // Toggle state
  const [toggleVariant, setToggleVariant] = useState<
    "default" | "disabled" | "error" | "custom-slots"
  >("default");

  // UserProfile state
  const [userProfileVariant, setUserProfileVariant] = useState<
    "default" | "compact" | "detailed" | "clickable" | "disabled"
  >("default");

  // MetricCard state
  const [metricCardVariant, setMetricCardVariant] = useState<
    "default" | "clickable" | "negative-trend" | "no-trend"
  >("default");

  // NewPatientDashboard state
  const [newPatientVariant, setNewPatientVariant] = useState<
    "default" | "custom-data" | "negative-trend"
  >("default");

  // LeftDrawer state
  const [isLeftDrawerOpen, setIsLeftDrawerOpen] = useState(false);

  // Menu items matching the screenshot
  const menuItems = [
    {
      id: "notifications",
      label: "Notifications",
      icon: Notifications,
      onClick: () => console.log("Notifications clicked"),
    },
    {
      id: "billing",
      label: "Billing",
      icon: Payment,
      onClick: () => console.log("Billing clicked"),
    },
    {
      id: "security",
      label: "Security",
      icon: Fingerprint,
      onClick: () => console.log("Security clicked"),
    },
    {
      id: "ssh-keys",
      label: "SSH Keys",
      icon: VpnKey,
      onClick: () => console.log("SSH Keys clicked"),
    },
    {
      id: "databases",
      label: "Databases",
      icon: Storage,
      onClick: () => console.log("Databases clicked"),
    },
    {
      id: "authentication",
      label: "Authentication",
      icon: LockOutlined,
      onClick: () => console.log("Authentication clicked"),
    },
    {
      id: "other-settings",
      label: "Other Settings",
      icon: Settings,
      onClick: () => console.log("Other Settings clicked"),
    },
    {
      id: "add-bookmark",
      label: "Add Bookmark",
      icon: Add,
      onClick: () => console.log("Add Bookmark clicked"),
      isAction: true,
    },
  ];

  const [paginationState, setPaginationState] = React.useState<
    "xs" | "sm" | "md" | "lg" | "xl"
  >("md");
  const [pillInputState, setPillInputState] = React.useState<
    "default" | "filled" | "unstyled"
  >("default");

  const [pillInputSize] = React.useState<"sm" | "md" | "lg" | "xl">("md");
  const [pillInputPillSize] = React.useState<"xs" | "sm" | "md" | "lg" | "xl">(
    "sm"
  );
  const [pillInputStateValue] = React.useState<
    "enabled" | "focus" | "typing" | "filled" | "disabled" | "error"
  >("enabled");
  const [pillInputDisabled] = React.useState(false);
  const [pillInputReadonly] = React.useState(false);
  const [pillInputRequired] = React.useState(false);
  const [pillInputMaxPills] = React.useState(5);
  const [pillInputPills, setPillInputPills] = React.useState<string[]>([
    "Sample",
    "Tag",
    "Demo",
  ]);

  const { isMobile, isTablet } = useBreakpoint();
  let span = 4; // default 3 cols
  if (isMobile) span = 12; // 1 col
  else if (isTablet) span = 6;

  const [stepperState, setStepperState] = useState<
    "xs" | "sm" | "md" | "lg" | "xl"
  >(
    isMobile ? "xs" : "md" // ✅ default state respects mobile
  );
  // Removed Kbd size selector in favor of ProfileCard demo
  useEffect(() => {
    setStepperState(isMobile ? "xs" : "md");
  }, [isMobile]);
  useEffect(() => {
    setPaginationState(isMobile ? "xs" : "md");
  }, [isMobile]);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSize] = useState<"xs" | "sm" | "md" | "lg" | "xl">("md");

  // Drawer state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerDirection, setDrawerDirection] = useState<
    "right" | "left" | "bottom" | "top"
  >("right");
  const [drawerShowScroll] = useState(true);

  // Calendar state
  const [calendarView, setCalendarView] = useState<"month" | "year" | "decade">(
    "month"
  );

  // Date range state
  const [rangeStart, setRangeStart] = useState<Date | null>(null);
  const [rangeEnd, setRangeEnd] = useState<Date | null>(null);

  // Date range picker state
  const [dateRangeStart, setDateRangeStart] = useState("");
  const [dateRangeEnd, setDateRangeEnd] = useState("");

  // Password input state
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVariant, setPasswordVariant] = useState<
    "default" | "with-toggle" | "with-strength"
  >("default");

  // Progress bar state
  const [progressValue, setProgressValue] = useState(65);
  const [progressVariant, setProgressVariant] = useState<
    "primary" | "success" | "warning" | "error" | "info"
  >("primary");
  const [progressSize] = useState<"xs" | "sm" | "md" | "lg" | "xl">("md");

  // Tabs state
  const [activeTab, setActiveTab] = useState("tab1");
  const [tabVariant, setTabVariant] = useState<
    "horizontal" | "vertical" | "pills"
  >("horizontal");

  // FileUpload state
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  // Menu state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLDivElement>(null);
  const snackbarContainerRef = useRef<HTMLDivElement>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Sample rows for DataTable demo
  const dataTableRows = [
    {
      id: 1,
      firstName: "Jon",
      lastName: "Snow",
      age: 35,
      fullName: "Jon Snow",
    },
    {
      id: 2,
      firstName: "Cersei",
      lastName: "Lannister",
      age: 42,
      fullName: "Cersei Lannister",
    },
    {
      id: 3,
      firstName: "Jaime",
      lastName: "Lannister",
      age: 45,
      fullName: "Jaime Lannister",
    },
    {
      id: 4,
      firstName: "Arya",
      lastName: "Stark",
      age: 16,
      fullName: "Arya Stark",
    },
    {
      id: 5,
      firstName: "Daenerys",
      lastName: "Targaryen",
      age: 25,
      fullName: "Daenerys Targaryen",
    },
    {
      id: 6,
      firstName: "John",
      lastName: "Smith",
      age: 28,
      fullName: "John Smith",
    },
    {
      id: 7,
      firstName: "Sansa",
      lastName: "Stark",
      age: 18,
      fullName: "Sansa Stark",
    },
    {
      id: 8,
      firstName: "Tyrion",
      lastName: "Lannister",
      age: 39,
      fullName: "Tyrion Lannister",
    },
    {
      id: 9,
      firstName: "Bran",
      lastName: "Stark",
      age: 14,
      fullName: "Bran Stark",
    },
  ];

  // Demo data for LineChart
  const chartYears = [
    1960, 1965, 1970, 1975, 1980, 1985, 1990, 1995, 2000, 2005, 2010, 2015,
    2020, 2023,
  ];
  const chartSeries = [
    {
      label: "Germany",
      data: [
        2.1, 3, 1.8, 6.2, 4.9, 2.3, 3.4, 2.5, 1.6, 1.2, 1.1, 0.9, 2.5, 5.6,
      ],
      colorVar: "--color-blue-6",
    },
    {
      label: "United Kingdom",
      data: [
        3.2, 4.0, 6.5, 24.2, 15.0, 5.1, 3.4, 2.0, 1.6, 2.8, 3.5, 0.5, 1.2, 7.9,
      ],
      colorVar: "--color-yellow-6",
    },
    {
      label: "France",
      data: [
        3.5, 2.8, 4.1, 13.2, 12.8, 3.1, 3.4, 2.1, 1.5, 1.9, 1.7, 0.3, 1.1, 5.1,
      ],
      colorVar: "--color-red-6",
    },
  ];
  const [chartVariant, setChartVariant] = useState<"line" | "filled">("filled");
  const [barVariant, setBarVariant] = useState<"basic" | "stacked">("basic");
  const [sparkVariant, setSparkVariant] = useState<"line" | "area">("line");
  const [pieVariant, setPieVariant] = useState<"pie" | "donut">("pie");
  const barLabels = ["group A", "group B", "group C"];
  const barSeries = [
    { label: "v6", data: [4, 3, 5], colorVar: "--color-blue-6" },
    { label: "v7", data: [1, 6, 3], colorVar: "--color-yellow-6" },
    { label: "v8", data: [2, 5, 6], colorVar: "--color-red-6" },
  ];

  // Local adapter to preview Breadcrumbs variants via different separators
  const BreadcrumbsPreview: React.FC<{ variant?: string }> = ({
    variant = "slash",
  }) => {
    const separatorMap: Record<string, React.ReactNode> = {
      slash: "/",
      chevron: "›",
      dot: "•",
      pipe: "|",
      arrow: "→",
    };
    const separator = separatorMap[variant] ?? "/";
    return (
      <Breadcrumbs
        items={[
          { label: "Home", href: "#" },
          { label: "Products", href: "#" },
          { label: "Laptops", href: "#" },
        ]}
        separator={separator}
      />
    );
  };

  // Local adapter: VariantSelector passes 'variant' string; use it as size
  const RadioGroupPreview: React.FC<{ variant?: string }> = ({
    variant = "md",
  }) => {
    const [selectedValue, setSelectedValue] = useState<string>("option1");
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <Radio
          label="Option 1"
          name="demo-radio-group"
          value="option1"
          checked={selectedValue === "option1"}
          onChange={() => setSelectedValue("option1")}
          size={variant as "xs" | "sm" | "md" | "lg" | "xl"}
        />
        <Radio
          label="Option 2"
          name="demo-radio-group"
          value="option2"
          checked={selectedValue === "option2"}
          onChange={() => setSelectedValue("option2")}
          size={variant as "xs" | "sm" | "md" | "lg" | "xl"}
        />
        <Radio
          label="Option 3"
          name="demo-radio-group"
          value="option3"
          checked={selectedValue === "option3"}
          onChange={() => setSelectedValue("option3")}
          size={variant as "xs" | "sm" | "md" | "lg" | "xl"}
        />
      </div>
    );
  };

  // Local adapter: VariantSelector passes 'variant'; use it as Switch size
  const SwitchSizePreview: React.FC<{ variant?: string }> = ({
    variant = "md",
  }) => {
    return (
      <Switch
        label="Switch"
        defaultChecked={false}
        onChange={(checked) => console.log("Switch:", checked)}
        size={variant as "sm" | "md" | "lg"}
      />
    );
  };

  return (
    <>
      {/* Component Variants */}
      <div style={{ marginTop: "150px", marginBottom: "100px" }}>
        <Text as="h1" variant="xxl" weight="bold" sx={{ marginBottom: "24px" }}>
          PulseUI Components
        </Text>
        <Text variant="lg" color="secondary" sx={{ marginBottom: "32px" }}>
          Explore all the available components in the PulseUI design system.
          Each component is fully interactive and demonstrates the various
          states and variants available.
        </Text>

        <Text
          as="h2"
          variant="xl"
          weight="semibold"
          sx={{ marginBottom: "24px" }}
        >
          Component Variants
        </Text>

        <Grid gutter="24px">
          <GridCol span={span}>
            <VariantSelector
              title="Button Variants"
              variants={[
                "filled",
                "subtle",
                "light",
                "outline",
                "white",
                "default",
                "loading",
              ]}
              defaultVariant="filled"
              label="Select Button Variant:"
              onVariantChange={(variant) => {
                if (variant === "loading") {
                  setButtonLoading(true);
                  setButtonVariant("outline");
                  console.log("Loading state: buttonVariant set to outline");
                } else {
                  setButtonLoading(false);
                  setButtonVariant(
                    variant as
                      | "filled"
                      | "subtle"
                      | "light"
                      | "outline"
                      | "white"
                      | "default"
                  );
                }
                console.log(
                  `Button variant changed to: ${variant}, buttonVariant: ${buttonVariant}, loading: ${buttonLoading}`
                );
              }}
            >
              <Button
                variant={buttonVariant}
                loading={buttonLoading}
                loadingText="Loading..."
                onClick={() => {
                  console.log(
                    `Button clicked - variant: ${buttonVariant}, loading: ${buttonLoading}`
                  );
                  if (!buttonLoading) {
                    setButtonLoading(true);
                    setTimeout(() => setButtonLoading(false), 3000);
                  }
                }}
              >
                {buttonLoading ? "Loading..." : "Button"}
              </Button>
            </VariantSelector>
          </GridCol>
          <GridCol span={span}>
            <VariantSelector
              title="Badge Variants"
              variants={[
                "dot",
                "filled",
                "subtle",
                "light",
                "outline",
                "white",
                "default",
              ]}
              defaultVariant="dot"
              label="Select Badge Variant:"
              onVariantChange={(variant) =>
                console.log(`Badge variant changed to: ${variant}`)
              }
            >
              <Badge variant="dot">Badge</Badge>
            </VariantSelector>
          </GridCol>
          <GridCol span={span}>
            <VariantSelector
              title="Alert Variants"
              variants={["success", "info", "warning", "error"]}
              defaultVariant="success"
              label="Select Alert Variant:"
              onVariantChange={(variant) =>
                console.log(`Alert variant changed to: ${variant}`)
              }
            >
              <Alert variant="success">
                <strong>Success!</strong> Your action was completed
                successfully.
              </Alert>
            </VariantSelector>
          </GridCol>
        </Grid>
      </div>

      {/* Form Components */}
      <div style={{ marginTop: "48px" }}>
        <Text
          as="h2"
          variant="xl"
          weight="semibold"
          sx={{ marginBottom: "24px" }}
        >
          Form Components
        </Text>
        <Grid gutter="24px">
          <GridCol span={span}>
            <VariantSelector
              title="Checkbox States"
              variants={["default", "disabled", "error"]}
              defaultVariant="default"
              label="Select Checkbox State:"
              onVariantChange={(variant) => {
                setCheckboxState(variant);
                console.log(`Checkbox state changed to: ${variant}`);
              }}
            >
              <Checkbox
                label="Checkbox"
                defaultChecked={true}
                disabled={checkboxState === "disabled"}
                error={
                  checkboxState === "error"
                    ? "This is an error message"
                    : undefined
                }
                onChange={(checked) => console.log("Checkbox:", checked)}
              />
            </VariantSelector>
          </GridCol>
          <GridCol span={span}>
            <VariantSelector
              title="Switch Variants"
              variants={["sm", "md", "lg"]}
              defaultVariant="md"
              label="Select Switch Size:"
            >
              <SwitchSizePreview />
            </VariantSelector>
          </GridCol>
          <GridCol span={span}>
            <VariantSelector
              title="Select Variants"
              variants={["default", "disabled", "error", "success"]}
              defaultVariant="default"
              label="Select State:"
              onVariantChange={(variant) =>
                console.log(`Select state changed to: ${variant}`)
              }
            >
              <Select
                label="Sample Select"
                placeholder="Choose an option"
                options={[
                  { value: "react", label: "React" },
                  { value: "vue", label: "Vue.js" },
                  { value: "angular", label: "Angular" },
                  { value: "svelte", label: "Svelte" },
                  { value: "nextjs", label: "Next.js" },
                ]}
                onChange={(value) => console.log("Select:", value)}
              />
            </VariantSelector>
          </GridCol>
          <GridCol span={span}>
            <VariantSelector
              title="Toggle Component"
              variants={["default", "disabled", "error", "custom-slots"]}
              defaultVariant="default"
              label="Toggle State:"
              onVariantChange={(variant) => {
                setToggleVariant(
                  variant as "default" | "disabled" | "error" | "custom-slots"
                );
                console.log(`Toggle state changed to: ${variant}`);
              }}
            >
              <Toggle
                label="Available slot duration"
                options={
                  toggleVariant === "custom-slots"
                    ? [
                        { value: "1", label: "1 hour" },
                        { value: "2", label: "2 hours" },
                        { value: "4", label: "4 hours" },
                        { value: "6", label: "6 hours" },
                        { value: "8", label: "8 hours" },
                      ]
                    : [
                        { value: "2", label: "2 hours" },
                        { value: "4", label: "4 hours" },
                        { value: "6", label: "6 hours" },
                      ]
                }
                defaultValue="2"
                disabled={toggleVariant === "disabled"}
                error={
                  toggleVariant === "error"
                    ? "Please select a duration"
                    : undefined
                }
                onChange={(value) => console.log("Toggle:", value)}
              />
            </VariantSelector>
          </GridCol>
        </Grid>
      </div>

      {/* Additional Components */}
      <div style={{ marginTop: "48px" }}>
        <Text
          as="h2"
          variant="xl"
          weight="semibold"
          sx={{ marginBottom: "24px" }}
        >
          Input Components
        </Text>
        <Grid gutter="24px">
          <GridCol span={span}>
            <VariantSelector
              title="Input Component"
              variants={["default", "filled", "unstyled"]}
              defaultVariant="default"
              onVariantChange={(variant) =>
                setInputState(variant as "default" | "filled" | "unstyled")
              }
            >
              <Input
                placeholder="Enter text..."
                size="md"
                variant={inputState}
              />
            </VariantSelector>
          </GridCol>
          <GridCol span={span}>
            <VariantSelector
              title="Textarea Component"
              variants={["default", "error", "disabled"]}
              defaultVariant="default"
              onVariantChange={(variant) =>
                setTextAreaState(variant as "default" | "error" | "disabled")
              }
            >
              <Textarea
                label="Message"
                placeholder="Enter your message..."
                rows={3}
                disabled={textAreaState === "disabled"}
                error={
                  textAreaState === "error"
                    ? "This field has an error"
                    : undefined
                }
              />
            </VariantSelector>
          </GridCol>
          <GridCol span={span}>
            <VariantSelector
              title="Pill Component"
              variants={["default", "info", "success", "warning", "error"]}
              defaultVariant="default"
              onVariantChange={(variant) =>
                setPillState(
                  variant as
                    | "default"
                    | "info"
                    | "success"
                    | "warning"
                    | "error"
                )
              }
            >
              <Pill
                variant={pillState}
                size="md"
                onClose={() => console.log("Pill closed")}
              >
                Sample Pill
              </Pill>
            </VariantSelector>
          </GridCol>
        </Grid>
      </div>

      {/* Display Components Section */}
      <div style={{ marginTop: "48px" }}>
        <Text
          as="h2"
          variant="xl"
          weight="semibold"
          sx={{ marginBottom: "24px" }}
        >
          Display Components
        </Text>
        <Grid gutter="24px">
          <GridCol span={span}>
            <VariantSelector
              title="Card Component"
              variants={["default", "image-overlay"]}
              defaultVariant="default"
              onVariantChange={(variant) =>
                console.log(`Card variant changed to: ${variant}`)
              }
            >
              <Card
                title="Sample Card"
                description="This is a sample card component with some content."
                buttonText="Learn More"
                buttonVariant="filled"
              />
            </VariantSelector>
          </GridCol>
          <GridCol span={span}>
            <VariantSelector
              title="Tag Component"
              variants={["default", "teal", "selected", "mint"]}
              defaultVariant="default"
              onVariantChange={(variant) =>
                setTagState(variant as "default" | "teal" | "selected" | "mint")
              }
            >
              <Tag variant={tagState} size="md">
                Sample Tag
              </Tag>
            </VariantSelector>
          </GridCol>
          <GridCol span={span}>
            <VariantSelector
              title="Avatar Component"
              variants={["primary", "secondary", "success", "warning"]}
              defaultVariant="primary"
              onVariantChange={(variant) =>
                setAvatarState(
                  variant as "primary" | "secondary" | "success" | "warning"
                )
              }
            >
              <Avatar
                variant={avatarState}
                size="md"
                type="initial"
                initials="JD"
              />
            </VariantSelector>
          </GridCol>
        </Grid>
      </div>

      {/* Interactive Components Section */}
      <div style={{ marginTop: "48px" }}>
        <Text
          as="h2"
          variant="xl"
          weight="semibold"
          sx={{ marginBottom: "24px" }}
        >
          Interactive Components
        </Text>
        <Grid gutter="24px">
          <GridCol span={span}>
            <VariantSelector
              title="Modal Component"
              variants={["default", "large", "small"]}
              defaultVariant="default"
              onVariantChange={(variant) =>
                console.log(`Modal variant changed to: ${variant}`)
              }
            >
              <div
                style={{
                  padding: "20px",
                  border: "1px solid var(--color-border-secondary)",
                  borderRadius: "var(--radius-md)",
                  backgroundColor: "var(--color-surface)",
                  textAlign: "center",
                }}
              >
                <Text
                  variant="md"
                  weight="semibold"
                  style={{ marginBottom: "8px" }}
                >
                  Modal Preview
                </Text>
                <Text
                  variant="sm"
                  color="secondary"
                  style={{ marginBottom: "16px" }}
                >
                  Click to open the modal component.
                </Text>
                <Button
                  variant="filled"
                  size="md"
                  onClick={() => setIsModalOpen(true)}
                >
                  Open Modal
                </Button>
              </div>
            </VariantSelector>
          </GridCol>
          <GridCol span={span}>
            <VariantSelector
              title="Pagination Component"
              variants={["xs", "sm", "md", "lg", "xl"]}
              defaultVariant="md"
              onVariantChange={(variant) =>
                setPaginationState(variant as "xs" | "sm" | "md" | "lg" | "xl")
              }
            >
              <Pagination
                currentPage={1}
                totalPages={5}
                onPageChange={(page) => console.log("Page changed to:", page)}
                size={paginationState}
              />
            </VariantSelector>
          </GridCol>
          <GridCol span={span}>
            <VariantSelector
              title="PillInput Component"
              variants={["default", "filled", "unstyled"]}
              defaultVariant="default"
              onVariantChange={(variant) =>
                setPillInputState(variant as "default" | "filled" | "unstyled")
              }
            >
              <PillInput
                placeholder="Add tags..."
                size={pillInputSize}
                variant={pillInputState}
                pills={pillInputPills}
                pillSize={pillInputPillSize}
                state={pillInputStateValue}
                disabled={pillInputDisabled}
                readonly={pillInputReadonly}
                required={pillInputRequired}
                maxPills={pillInputMaxPills}
                onPillsChange={(pills) => setPillInputPills(pills)}
                onPillRemove={(_, index) =>
                  setPillInputPills(
                    pillInputPills.filter((_, i) => i !== index)
                  )
                }
                onPillAdd={(pill) =>
                  setPillInputPills([...pillInputPills, pill])
                }
              />
            </VariantSelector>
          </GridCol>
          <GridCol span={span}>
            <VariantSelector
              title="Progress Bar Component"
              variants={["primary", "success", "warning", "error", "info"]}
              defaultVariant="primary"
              label="Select Progress Variant:"
              onVariantChange={(variant) => {
                setProgressVariant(
                  variant as
                    | "primary"
                    | "success"
                    | "warning"
                    | "error"
                    | "info"
                );
                console.log(`Progress variant changed to: ${variant}`);
                // Animate progress when variant changes
                setProgressValue(Math.floor(Math.random() * 100) + 1);
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <ProgressBar
                  value={progressValue}
                  variant={progressVariant}
                  size={progressSize}
                  showLabel={true}
                  striped={true}
                  animated={true}
                />
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    alignItems: "center",
                    marginTop: "8px",
                  }}
                >
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      setProgressValue(Math.max(0, progressValue - 10))
                    }
                  >
                    -10%
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      setProgressValue(Math.min(100, progressValue + 10))
                    }
                  >
                    +10%
                  </Button>
                  <Button
                    size="sm"
                    variant="filled"
                    onClick={() =>
                      setProgressValue(Math.floor(Math.random() * 100) + 1)
                    }
                  >
                    Random
                  </Button>
                </div>
              </div>
            </VariantSelector>
          </GridCol>
          {/* Tabs Component - Hidden on mobile */}
          {!isMobile && (
            <GridCol span={span}>
              <VariantSelector
                title="Tabs Component"
                variants={["horizontal", "vertical", "pills"]}
                defaultVariant="horizontal"
                label="Select Tab Style:"
                onVariantChange={(variant) => {
                  setTabVariant(variant as "horizontal" | "vertical" | "pills");
                  console.log(`Tab variant changed to: ${variant}`);
                  setActiveTab("tab1"); // Reset to first tab when changing variants
                }}
              >
                <Tabs
                  value={activeTab}
                  onChange={(value) => setActiveTab(value || "tab1")}
                  orientation={
                    tabVariant === "vertical" ? "vertical" : "horizontal"
                  }
                  sx={{
                    "& .tabsList": {
                      gap: "4px",
                      ...(tabVariant === "vertical" && {
                        flexDirection: "column",
                        width: "120px",
                      }),
                    },
                    "& .tab": {
                      padding: "6px 12px",
                      fontSize: "0.875rem",
                      minHeight: "32px",
                      minWidth: "auto",
                      ...(tabVariant === "pills" && {
                        borderRadius: "16px",
                        backgroundColor: "var(--color-surface-secondary)",
                        border: "none",
                        "&.active": {
                          backgroundColor: "var(--color-primary)",
                          color: "white",
                        },
                      }),
                      ...(tabVariant === "vertical" && {
                        width: "100%",
                        textAlign: "left",
                      }),
                    },
                    "& .tabsPanel": {
                      padding: "12px",
                      minHeight: "80px",
                      ...(tabVariant === "vertical" && {
                        flex: 1,
                      }),
                    },
                    ...(tabVariant === "vertical" && {
                      display: "flex",
                      gap: "16px",
                    }),
                  }}
                >
                  <TabsList>
                    <TabsTab
                      value="tab1"
                      placeholder="Overview"
                      variant={tabVariant === "pills" ? "pill" : "default"}
                    />
                    <TabsTab
                      value="tab2"
                      placeholder="Features"
                      variant={tabVariant === "pills" ? "pill" : "default"}
                    />
                    <TabsTab
                      value="tab3"
                      placeholder="Settings"
                      variant={tabVariant === "pills" ? "pill" : "default"}
                    />
                  </TabsList>
                  <TabsPanel value="tab1">
                    <div style={{ padding: "12px" }}>
                      <Text
                        variant="sm"
                        weight="semibold"
                        style={{ marginBottom: "6px" }}
                      >
                        Overview Tab
                      </Text>
                      <Text variant="xs" color="secondary">
                        This is the overview content. Tabs provide a way to
                        organize content into separate views.
                      </Text>
                    </div>
                  </TabsPanel>
                  <TabsPanel value="tab2">
                    <div style={{ padding: "12px" }}>
                      <Text
                        variant="sm"
                        weight="semibold"
                        style={{ marginBottom: "6px" }}
                      >
                        Features Tab
                      </Text>
                      <Text variant="xs" color="secondary">
                        Interactive tab switching, keyboard navigation, and
                        accessibility support.
                      </Text>
                    </div>
                  </TabsPanel>
                  <TabsPanel value="tab3">
                    <div style={{ padding: "12px" }}>
                      <Text
                        variant="sm"
                        weight="semibold"
                        style={{ marginBottom: "6px" }}
                      >
                        Settings Tab
                      </Text>
                      <Text variant="xs" color="secondary">
                        Configure your preferences and options here.
                      </Text>
                    </div>
                  </TabsPanel>
                </Tabs>
              </VariantSelector>
            </GridCol>
          )}
          {/* FileUpload Component - Hidden on mobile */}
          {!isMobile && (
            <GridCol span={span}>
              <VariantSelector
                title="Radio Component"
                variants={["xs", "sm", "md", "lg", "xl"]}
                defaultVariant="md"
                label="Select Radio Size:"
                onVariantChange={(variant) =>
                  console.log(`Radio size changed to: ${variant}`)
                }
              >
                <RadioGroupPreview />
              </VariantSelector>
            </GridCol>
          )}
        </Grid>
      </div>

      {/* Data Visualization */}
      <div style={{ marginTop: "48px" }}>
        <Text
          as="h2"
          variant="xl"
          weight="semibold"
          sx={{ marginBottom: "24px" }}
        >
          Data Visualization
        </Text>
        <Grid gutter="24px">
          <GridCol span={span}>
            <VariantSelector
              title="Line Chart"
              variants={["line", "filled"]}
              defaultVariant="filled"
              onVariantChange={(variant) =>
                setChartVariant(variant === "filled" ? "filled" : "line")
              }
            >
              <div
                style={{
                  width: "100%",
                  maxWidth: 520,
                  margin: "0 auto",
                }}
              >
                <LineChart
                  title="Inflation rates"
                  xData={chartYears}
                  series={chartSeries}
                  height={220}
                  filledArea={chartVariant === "filled"}
                />
              </div>
            </VariantSelector>
          </GridCol>
          <GridCol span={span}>
            <VariantSelector
              title="Bar Chart"
              variants={["basic", "stacked"]}
              defaultVariant="basic"
              onVariantChange={(variant) =>
                setBarVariant(variant === "stacked" ? "stacked" : "basic")
              }
            >
              <div style={{ width: "100%", maxWidth: 520, margin: "0 auto" }}>
                <BarChart
                  title="Groups"
                  xLabels={barLabels}
                  series={barSeries}
                  height={220}
                  variant={barVariant}
                />
              </div>
            </VariantSelector>
          </GridCol>
          <GridCol span={span}>
            <VariantSelector
              title="Sparkline"
              variants={["line", "area"]}
              defaultVariant="line"
              onVariantChange={(variant) =>
                setSparkVariant(variant === "area" ? "area" : "line")
              }
            >
              <div style={{ width: "100%", maxWidth: 240 }}>
                <Sparkline
                  title="Daily users"
                  data={[12, 14, 11, 16, 18, 21, 20, 23, 25, 24, 28, 30]}
                  width={240}
                  height={64}
                  colorVar="--chart-series-1"
                  showArea={sparkVariant === "area"}
                />
              </div>
            </VariantSelector>
          </GridCol>
          <GridCol span={span}>
            <VariantSelector
              title="Pie Chart"
              variants={["pie", "donut"]}
              defaultVariant="pie"
              onVariantChange={(variant) =>
                setPieVariant(variant === "donut" ? "donut" : "pie")
              }
            >
              <div style={{ width: "100%", maxWidth: 320 }}>
                <PieChart
                  title="Traffic Sources"
                  data={[
                    {
                      label: "Direct",
                      value: 44,
                      colorVar: "--chart-series-1",
                    },
                    {
                      label: "Organic",
                      value: 31,
                      colorVar: "--chart-series-2",
                    },
                    {
                      label: "Referral",
                      value: 16,
                      colorVar: "--chart-series-3",
                    },
                    { label: "Social", value: 9, colorVar: "--chart-series-4" },
                  ]}
                  width={320}
                  height={240}
                  variant={pieVariant}
                />
              </div>
            </VariantSelector>
          </GridCol>
          <GridCol span={span}>
            <VariantSelector
              title="Heat Map"
              variants={["default"]}
              defaultVariant="default"
            >
              <div style={{ width: "100%", maxWidth: 360 }}>
                <HeatMap
                  title="Issues opening time"
                  yLabels={["6am", "10am", "12am", "5pm", "8pm"]}
                  xLabels={["M", "T", "W", "T", "F", "S", "S"]}
                  values={[
                    [1, 0, 0, 0, 0, 0, 0],
                    [1, 1, 1, 1, 0, 0, 0],
                    [0, 0, 1, 0, 1, 0, 0],
                    [2, 2, 2, 2, 3, 0, 0],
                    [0, 0, 0, 0, 0, 2, 0],
                  ]}
                  colorVar="--chart-series-1"
                  cellSize={28}
                  gap={8}
                  minOpacity={0.16}
                  maxOpacity={1}
                  round={8}
                />
              </div>
            </VariantSelector>
          </GridCol>
        </Grid>
      </div>

      {/* Feedback Components */}
      <div style={{ marginTop: "48px" }}>
        <Text
          as="h2"
          variant="xl"
          weight="semibold"
          sx={{ marginBottom: "24px" }}
        >
          Feedback Components
        </Text>
        <Grid gutter="24px">
          <GridCol span={span}>
            <VariantSelector
              title="Skeleton Component"
              variants={["preview"]}
              defaultVariant="preview"
            >
              <div style={{ width: "100%", maxWidth: 360 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 12,
                  }}
                >
                  <Skeleton variant="avatar" width={40} height={40} />
                  <div style={{ flex: 1 }}>
                    <Skeleton variant="text" width="60%" />
                    <Skeleton variant="text" width="40%" />
                  </div>
                </div>
                <Skeleton variant="rect" height={140} radius={8} />
                <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                  <Skeleton variant="button" width={88} />
                  <Skeleton variant="button" width={88} />
                </div>
              </div>
            </VariantSelector>
          </GridCol>
          <GridCol span={span}>
            <VariantSelector
              title="Spinner (Loader)"
              variants={["sizes"]}
              defaultVariant="sizes"
            >
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <Loader size="xs" />
                <Loader size="sm" />
                <Loader size="md" />
                <Loader size="lg" />
                <Loader size="xl" />
              </div>
            </VariantSelector>
          </GridCol>
          <GridCol span={span}>
            <VariantSelector
              title="Snackbar Component"
              variants={["primary"]}
              defaultVariant="primary"
            >
              <div
                ref={snackbarContainerRef}
                style={{ position: "relative", minHeight: 120 }}
              >
                <Button
                  variant="filled"
                  size="md"
                  onClick={() => setSnackbarOpen(true)}
                >
                  Show Snackbar
                </Button>
                <Snackbar
                  open={snackbarOpen}
                  onClose={() => setSnackbarOpen(false)}
                  message="Note archived"
                  variant="primary"
                  position="bottom-right"
                  autoHideMs={3000}
                  container={snackbarContainerRef.current}
                />
              </div>
            </VariantSelector>
          </GridCol>
        </Grid>
      </div>

      {/* Advanced Components */}
      <div style={{ marginTop: "48px" }}>
        <Text
          as="h2"
          variant="xl"
          weight="semibold"
          sx={{ marginBottom: "24px" }}
        >
          Advanced Components
        </Text>
        <Grid gutter="24px">
          <GridCol span={span}>
            <VariantSelector
              title="File Upload Component"
              variants={["default", "drag-drop", "multiple"]}
              defaultVariant="default"
              label="Select Upload Type:"
              onVariantChange={(variant) => {
                console.log(`FileUpload variant changed to: ${variant}`);
                setUploadedFiles([]); // Clear uploaded files when changing variants
              }}
            >
              <div
                style={{
                  width: "100%",
                  maxWidth: "100%",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    width: "100%",
                  }}
                >
                  <FileUpload
                    acceptedFileTypes={["jpg", "png", "pdf", "txt"]}
                    maxFileSize={5 * 1024 * 1024} // 5MB
                    maxFiles={3}
                    multiple={true}
                    uploadText="Drop files here"
                    browseText="Choose Files"
                    showFileList={true}
                    onUpload={(files) => {
                      setUploadedFiles(files);
                      console.log(
                        "Files uploaded:",
                        files.map((f) => f.name)
                      );
                    }}
                    sx={{
                      transform: "scale(0.8)",
                      transformOrigin: "center",
                      width: "100%",
                      maxWidth: "100%",
                      padding: "8px",
                      "& .fileUpload": {
                        maxWidth: "100%",
                        width: "100%",
                        padding: "12px",
                      },
                      "& .dropZone": {
                        minHeight: "80px",
                        padding: "12px",
                      },
                      "& .header": {
                        gap: "4px",
                        marginBottom: "8px",
                      },
                      "& .uploadIcon": {
                        marginBottom: "4px",
                      },
                    }}
                  />
                </div>
                {uploadedFiles.length > 0 && (
                  <div
                    style={{
                      marginTop: "12px",
                      padding: "8px",
                      backgroundColor: "var(--color-surface-secondary)",
                      borderRadius: "var(--radius-sm)",
                      margin: "12px auto 0 auto",
                      wordBreak: "break-word",
                    }}
                  >
                    <Text variant="xs" color="secondary">
                      Uploaded: {uploadedFiles.map((f) => f.name).join(", ")}
                    </Text>
                  </div>
                )}
              </div>
            </VariantSelector>
          </GridCol>
          <GridCol span={span}>
            <VariantSelector
              title="Stepper Component"
              variants={["xs", "sm", "md", "lg", "xl"]}
              defaultVariant={stepperState}
              onVariantChange={(variant) =>
                setStepperState(variant as "xs" | "sm" | "md" | "lg" | "xl")
              }
            >
              <Stepper
                size={stepperState}
                steps={[
                  {
                    id: "1",
                    content: "1",
                    label: "Step 1",
                    status: "complete",
                  },
                  { id: "2", content: "2", label: "Step 2", status: "active" },
                  { id: "3", content: "3", label: "Step 3", status: "default" },
                ]}
              />
            </VariantSelector>
          </GridCol>
          <GridCol span={span}>
            <VariantSelector
              title="Profile Card"
              variants={["default"]}
              defaultVariant="default"
              onVariantChange={() => {}}
              showVariantInfo={false}
            >
              <div
                style={{
                  width: "100%",
                  marginTop: "64px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "8px",
                  transform: "scale(0.85)",
                  transformOrigin: "top center",
                }}
              >
                <ProfileCard
                  email="vignesh@example.com"
                  bio="Design Systems • Frontend • Accessibility"
                  hashtag="#pulseui"
                  posts={128}
                  followers={5230}
                  following={412}
                  sx={{
                    width: "100%",
                    maxWidth: "320px",
                    margin: "0 auto",
                  }}
                />
              </div>
            </VariantSelector>
          </GridCol>
        </Grid>
      </div>

      {/* Special Components */}
      <div style={{ marginTop: "48px" }}>
        <Text
          as="h2"
          variant="xl"
          weight="semibold"
          sx={{ marginBottom: "24px" }}
        >
          Special Components
        </Text>
        <Grid gutter="24px">
          <GridCol span={span}>
            <VariantSelector
              title="UserProfile Component"
              variants={[
                "default",
                "compact",
                "detailed",
                "clickable",
                "disabled",
              ]}
              defaultVariant="default"
              label="UserProfile Variant:"
              onVariantChange={(variant) => {
                setUserProfileVariant(
                  variant as
                    | "default"
                    | "compact"
                    | "detailed"
                    | "clickable"
                    | "disabled"
                );
                console.log(`UserProfile variant changed to: ${variant}`);
              }}
            >
              <UserProfile
                name="John Doe"
                email="john.doe@example.com"
                avatarSrc="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                variant={
                  userProfileVariant === "compact"
                    ? "compact"
                    : userProfileVariant === "detailed"
                    ? "detailed"
                    : "default"
                }
                clickable={userProfileVariant === "clickable"}
                disabled={userProfileVariant === "disabled"}
                onClick={() => console.log("UserProfile clicked")}
              />
            </VariantSelector>
          </GridCol>
          <GridCol span={span}>
            <VariantSelector
              title="PinInput Component"
              variants={["default", "error", "disabled"]}
              defaultVariant="default"
              onVariantChange={(variant) =>
                console.log(`PinInput variant changed to: ${variant}`)
              }
            >
              <PinInput
                label="Security PIN"
                placeholder="0"
                helperText="Enter your 4-digit PIN"
                length={4}
                required={true}
                sx={{ alignItems: "center", justifyContent: "center" }}
              />
            </VariantSelector>
          </GridCol>

          <GridCol span={span}>
            <VariantSelector
              title="LeftDrawer Component"
              variants={["default"]}
              defaultVariant="default"
              label="LeftDrawer Demo:"
              onVariantChange={() => {}}
            >
              <>
                <div
                  style={{ display: "flex", gap: "16px", alignItems: "center" }}
                >
                  <Button
                    variant="filled"
                    onClick={() => {
                      console.log("Opening LeftDrawer");
                      setIsLeftDrawerOpen(true);
                    }}
                  >
                    Open Menu
                  </Button>
                  <Text variant="sm" color="secondary">
                    Click to open the drawer with menu items
                  </Text>
                </div>

                <LeftDrawer
                  isOpen={isLeftDrawerOpen}
                  onClose={() => {
                    console.log("Closing LeftDrawer");
                    setIsLeftDrawerOpen(false);
                  }}
                  items={menuItems}
                  title="MY MENU"
                  showOverlay={true}
                  width="280px"
                />
              </>
            </VariantSelector>
          </GridCol>

          <GridCol span={span}>
            <VariantSelector
              title="MetricCard Component"
              variants={["default", "clickable", "negative-trend", "no-trend"]}
              defaultVariant="default"
              label="MetricCard Variant:"
              onVariantChange={(variant) => {
                setMetricCardVariant(
                  variant as
                    | "default"
                    | "clickable"
                    | "negative-trend"
                    | "no-trend"
                );
                console.log(`MetricCard variant changed to: ${variant}`);
              }}
            >
              <MetricCard
                title={
                  metricCardVariant === "negative-trend"
                    ? "Revenue"
                    : metricCardVariant === "no-trend"
                    ? "Page Views"
                    : "Total Users"
                }
                value={
                  metricCardVariant === "negative-trend"
                    ? "$12,450"
                    : metricCardVariant === "no-trend"
                    ? "1.2M"
                    : "40,689"
                }
                trend={
                  metricCardVariant === "negative-trend"
                    ? -2.3
                    : metricCardVariant === "no-trend"
                    ? undefined
                    : 8.5
                }
                trendLabel={
                  metricCardVariant === "negative-trend"
                    ? "Down from last month"
                    : metricCardVariant === "no-trend"
                    ? undefined
                    : "Up from yesterday"
                }
                trendPositive={
                  metricCardVariant === "negative-trend" ? false : true
                }
                icon={
                  metricCardVariant === "negative-trend"
                    ? Payment
                    : metricCardVariant === "no-trend"
                    ? Visibility
                    : Person
                }
                iconVariant={
                  metricCardVariant === "negative-trend"
                    ? "success"
                    : metricCardVariant === "no-trend"
                    ? "info"
                    : "primary"
                }
                clickable={metricCardVariant === "clickable"}
                onClick={() => console.log("MetricCard clicked")}
              />
            </VariantSelector>
          </GridCol>

          <GridCol span={span}>
            <VariantSelector
              title="NewPatientDashboard Component"
              variants={["default", "custom-data", "negative-trend"]}
              defaultVariant="default"
              label="Dashboard Variant:"
              onVariantChange={(variant) => {
                setNewPatientVariant(
                  variant as "default" | "custom-data" | "negative-trend"
                );
                console.log(
                  `NewPatientDashboard variant changed to: ${variant}`
                );
              }}
            >
              <NewPatientDashboard
                title="New Patient"
                trendPercentage={
                  newPatientVariant === "negative-trend" ? -8.5 : 14.21
                }
                trendLabel={
                  newPatientVariant === "negative-trend"
                    ? "Lower than last month"
                    : "High than last month"
                }
                trendPositive={newPatientVariant !== "negative-trend"}
                chartData={
                  newPatientVariant === "custom-data"
                    ? [
                        { year: "2020", purple: 200, orange: 120, red: 180 },
                        { year: "2021", purple: 180, orange: 100, red: 160 },
                        { year: "2022", purple: 220, orange: 140, red: 200 },
                        { year: "2023", purple: 250, orange: 160, red: 220 },
                      ]
                    : undefined
                }
                overallValue={
                  newPatientVariant === "custom-data" ? "82.3%" : "76.5%"
                }
                monthlyValue={
                  newPatientVariant === "custom-data" ? "78.9%" : "76.5%"
                }
                dailyValue={
                  newPatientVariant === "custom-data" ? "85.1%" : "76.5%"
                }
              />
            </VariantSelector>
          </GridCol>

          <GridCol span={span}>
            <VariantSelector
              title="Carousel Component"
              variants={["default", "compact", "imageOnly"]}
              defaultVariant="default"
              onVariantChange={(variant) =>
                console.log(`Carousel variant changed to: ${variant}`)
              }
            >
              <Carousel
                ariaLabel="Sample carousel"
                enableKeyboard={true}
                autoPlay={0}
                useCards={true}
                imageOnly={false}
                size="display"
                compact={false}
              >
                <div
                  style={{
                    padding: "20px",
                    backgroundColor: "var(--color-surface-secondary)",
                    borderRadius: "var(--radius-md)",
                  }}
                >
                  <Text variant="md" weight="semibold">
                    Slide 1
                  </Text>
                  <Text variant="sm" color="secondary">
                    Carousel content
                  </Text>
                </div>
                <div
                  style={{
                    padding: "20px",
                    backgroundColor: "var(--color-surface-secondary)",
                    borderRadius: "var(--radius-md)",
                  }}
                >
                  <Text variant="md" weight="semibold">
                    Slide 2
                  </Text>
                  <Text variant="sm" color="secondary">
                    More content
                  </Text>
                </div>
              </Carousel>
            </VariantSelector>
          </GridCol>
          <GridCol span={span}>
            <VariantSelector
              title="Accordion Component"
              variants={["default", "bordered", "separated"]}
              defaultVariant="default"
              onVariantChange={(variant) =>
                console.log(`Accordion variant changed to: ${variant}`)
              }
            >
              <Accordion size="display" allowMultiple={false}>
                <AccordionItem id="item-1">
                  <AccordionHeader itemId="item-1">
                    What is PulseUI?
                  </AccordionHeader>
                  <AccordionContent itemId="item-1">
                    <Text variant="sm">
                      PulseUI is a comprehensive design system and component
                      library built with React and TypeScript.
                    </Text>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem id="item-2">
                  <AccordionHeader itemId="item-2">
                    How to customize themes?
                  </AccordionHeader>
                  <AccordionContent itemId="item-2">
                    <Text variant="sm">
                      Use the brand switcher in the navigation to switch between
                      different themes like MedDash, FitCore, and LabSync.
                    </Text>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </VariantSelector>
          </GridCol>
        </Grid>
      </div>

      {/* Drawer Demo */}
      <div style={{ marginTop: "48px" }}>
        <Text
          as="h2"
          variant="xl"
          weight="semibold"
          sx={{ marginBottom: "24px" }}
        >
          Overlay Components & Breadcrumbs
        </Text>
        <Grid gutter="24px">
          <GridCol span={span}>
            <VariantSelector
              title="Drawer Direction"
              variants={["Right", "Left", "Top", "Bottom"]}
              defaultVariant="Right"
              onVariantChange={(variant) =>
                setDrawerDirection(
                  variant.toLowerCase() as "right" | "left" | "top" | "bottom"
                )
              }
            >
              <div
                style={{
                  padding: "20px",
                  border: "1px solid var(--color-border-secondary)",
                  borderRadius: "var(--radius-md)",
                  backgroundColor: "var(--color-surface)",
                  textAlign: "center",
                }}
              >
                <Text
                  variant="md"
                  weight="semibold"
                  style={{ marginBottom: "8px" }}
                >
                  Drawer Direction: {drawerDirection}
                </Text>
                <Button
                  variant="filled"
                  size="md"
                  onClick={() => setIsDrawerOpen(true)}
                >
                  Open Drawer
                </Button>
              </div>
            </VariantSelector>
          </GridCol>
          <GridCol span={span}>
            <VariantSelector
              title="Menu Component"
              variants={["default", "without-titles", "without-backdrop"]}
              defaultVariant="default"
              label="Select Menu Variant:"
              onVariantChange={(variant) => {
                console.log(`Menu variant changed to: ${variant}`);
              }}
            >
              <div
                style={{
                  padding: "12px",
                  border: "1px solid var(--color-border-secondary)",
                  borderRadius: "var(--radius-md)",
                  backgroundColor: "var(--color-surface)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  width: "100%",
                  minHeight: "200px",
                  position: "relative",
                }}
              >
                <div ref={menuButtonRef}>
                  <Button
                    onClick={() => setIsMenuOpen(true)}
                    variant="outline"
                    size="md"
                  >
                    Toggle Menu
                  </Button>
                </div>

                <Menu
                  sections={[
                    {
                      title: "Application",
                      items: [
                        {
                          label: "Settings",
                          icon: Settings,
                          onClick: () => {
                            console.log("Settings clicked");
                            setIsMenuOpen(false);
                          },
                        },
                        {
                          label: "Messages",
                          icon: Message,
                          onClick: () => {
                            console.log("Messages clicked");
                            setIsMenuOpen(false);
                          },
                        },
                        {
                          label: "Gallery",
                          icon: Photo,
                          onClick: () => {
                            console.log("Gallery clicked");
                            setIsMenuOpen(false);
                          },
                        },
                        {
                          label: "Search",
                          icon: Search,
                          shortcut: "⌘K",
                          onClick: () => {
                            console.log("Search clicked");
                            setIsMenuOpen(false);
                          },
                        },
                      ],
                    },
                    {
                      title: "Danger zone",
                      items: [
                        {
                          label: "Transfer my data",
                          icon: Sync,
                          onClick: () => {
                            console.log("Transfer data clicked");
                            setIsMenuOpen(false);
                          },
                        },
                        {
                          label: "Delete my account",
                          icon: Delete,
                          danger: true,
                          onClick: () => {
                            console.log("Delete account clicked");
                            setIsMenuOpen(false);
                          },
                        },
                      ],
                    },
                  ]}
                  open={isMenuOpen}
                  onBackdropClick={() => setIsMenuOpen(false)}
                  showBackdrop={false}
                  anchorEl={menuButtonRef.current}
                  placement="bottom-start"
                />
              </div>
            </VariantSelector>
          </GridCol>
          <GridCol span={span}>
            <VariantSelector
              title="Breadcrumbs"
              variants={["slash", "chevron", "dot", "pipe", "arrow"]}
              defaultVariant="slash"
              label="Select Separator:"
            >
              <BreadcrumbsPreview />
            </VariantSelector>
          </GridCol>
        </Grid>
      </div>

      {/* Date and Input Components */}
      <div style={{ marginTop: "48px" }}>
        <Text
          as="h2"
          variant="xl"
          weight="semibold"
          sx={{ marginBottom: "24px" }}
        >
          Date and Input Components
        </Text>
        <Grid gutter="24px">
          <GridCol span={span}>
            <VariantSelector
              title="Calendar Component (Date Range)"
              variants={["month", "year", "decade"]}
              defaultVariant="month"
              label="Select Calendar View:"
              onVariantChange={(variant) => {
                setCalendarView(variant as "month" | "year" | "decade");
                console.log(`Calendar view changed to: ${variant}`);
              }}
            >
              <div
                style={{
                  padding: "12px",
                  border: "1px solid var(--color-border-secondary)",
                  borderRadius: "var(--radius-md)",
                  backgroundColor: "var(--color-surface)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  width: "100%",
                  minHeight: "300px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    maxWidth: "280px",
                    width: "100%",
                  }}
                >
                  <Calendar
                    view={calendarView}
                    rangeStart={rangeStart || undefined}
                    rangeEnd={rangeEnd || undefined}
                    rangeSelection={true}
                    onRangeSelect={(startDate, endDate) => {
                      setRangeStart(startDate);
                      setRangeEnd(endDate);
                      console.log("Range selected:", { startDate, endDate });
                    }}
                    onViewChange={(view) => {
                      setCalendarView(view);
                      console.log("View changed:", view);
                    }}
                    size={isMobile ? "xs" : "sm"}
                    showNavigation={true}
                    showDayLabels={true}
                    showOutsideDates={true}
                    sx={{
                      margin: "0 auto",
                      maxWidth: "280px",
                      width: "100%",
                    }}
                  />
                </div>
              </div>
            </VariantSelector>
          </GridCol>
          <GridCol span={span}>
            <VariantSelector
              title="Date Range Picker Component"
              variants={["sm", "md", "lg", "xl"]}
              defaultVariant="md"
              label="Select Date Range Picker Size:"
              onVariantChange={(variant) => {
                console.log(`Date Range Picker size changed to: ${variant}`);
              }}
            >
              <div
                style={{
                  padding: "12px",
                  border: "1px solid var(--color-border-secondary)",
                  borderRadius: "var(--radius-md)",
                  backgroundColor: "var(--color-surface)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  width: "100%",
                  minHeight: "120px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    maxWidth: "400px",
                    width: "100%",
                  }}
                >
                  <DateRangePicker
                    label="Date Label"
                    required={true}
                    startDate={dateRangeStart}
                    endDate={dateRangeEnd}
                    startPlaceholder="Start date"
                    endPlaceholder="End date"
                    onStartDateChange={(date: string) => {
                      setDateRangeStart(date);
                      console.log("Start date changed:", date);
                    }}
                    onEndDateChange={(date: string) => {
                      setDateRangeEnd(date);
                      console.log("End date changed:", date);
                    }}
                    onRangeChange={(startDate: string, endDate: string) => {
                      console.log("Date range changed:", {
                        startDate,
                        endDate,
                      });
                    }}
                    size={isMobile ? "sm" : "md"}
                    sx={{
                      margin: "0 auto",
                      maxWidth: "400px",
                      width: "100%",
                    }}
                  />
                </div>
              </div>
            </VariantSelector>
          </GridCol>
          <GridCol span={span}>
            <VariantSelector
              title="Password Input Component"
              variants={["default", "with-toggle", "with-strength"]}
              defaultVariant="default"
              label="Select Password Variant:"
              onVariantChange={(variant) => {
                setPasswordVariant(
                  variant as "default" | "with-toggle" | "with-strength"
                );
                console.log(`Password variant changed to: ${variant}`);
                // Reset password when switching variants to show strength meter working
                if (variant === "with-strength") {
                  setPassword("");
                }
              }}
            >
              <PasswordInput
                label="Password"
                placeholder={
                  passwordVariant === "with-strength"
                    ? "Enter password to see strength"
                    : "Enter your password"
                }
                value={password}
                onChange={setPassword}
                passwordVisible={passwordVisible}
                onPasswordVisibilityChange={setPasswordVisible}
                showPasswordToggle={passwordVariant !== "default"}
                showStrengthMeter={passwordVariant === "with-strength"}
                required={true}
              />
            </VariantSelector>
          </GridCol>
        </Grid>
      </div>

      {/* Modal Component */}
      <Modal
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Sample Modal"
        size={modalSize}
        showFooter={true}
        footerVariant="primary"
        primaryText="Confirm"
        secondaryText="Cancel"
        onPrimaryClick={() => {
          console.log("Primary button clicked");
          setIsModalOpen(false);
        }}
        onSecondaryClick={() => setIsModalOpen(false)}
        showClose={true}
        closeOnBackdropClick={true}
        closeOnEscape={true}
      >
        <div style={{ padding: "16px 0" }}>
          <Text variant="md" style={{ marginBottom: "16px" }}>
            Modal Content
          </Text>
          <Text variant="sm" color="secondary" style={{ marginBottom: "16px" }}>
            This modal demonstrates the component functionality with different
            sizes.
          </Text>
        </div>
      </Modal>

      {/* Drawer Component */}
      <Drawer
        show={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Sample Drawer"
        direction={drawerDirection}
        showScroll={drawerShowScroll}
        showClose={true}
        closeOnBackdropClick={true}
        closeOnEscape={true}
      >
        <div style={{ padding: "16px" }}>
          <Text variant="lg" weight="semibold" style={{ marginBottom: "16px" }}>
            Drawer Content
          </Text>
          <Text variant="md" style={{ marginBottom: "16px" }}>
            This drawer demonstrates the component functionality with different
            directions.
          </Text>
          <Text variant="sm" color="secondary">
            Direction: {drawerDirection}
          </Text>
        </div>
      </Drawer>

      {/* Data Display: Table */}
      <div style={{ marginTop: "48px", marginBottom: "96px" }}>
        <Text
          as="h2"
          variant="xl"
          weight="semibold"
          sx={{ marginBottom: "24px" }}
        >
          Data Display: Table
        </Text>
        <Grid gutter="24px">
          {!isMobile && (
            <GridCol span={span}>
              <VariantSelector
                title="Table Component"
                variants={["basic", "striped", "bordered"]}
                defaultVariant="basic"
                label="Select Table Variant:"
                onVariantChange={(variant) =>
                  console.log(`Table variant: ${variant}`)
                }
              >
                <Table
                  columns={[
                    { key: "dessert", header: "Dessert (100g serving)" },
                    { key: "calories", header: "Calories", align: "right" },
                    { key: "fat", header: "Fat (g)", align: "right" },
                    { key: "carbs", header: "Carbs (g)", align: "right" },
                    { key: "protein", header: "Protein (g)", align: "right" },
                  ]}
                  data={[
                    {
                      dessert: "Frozen yoghurt",
                      calories: 159,
                      fat: 6,
                      carbs: 24,
                      protein: 4,
                    },
                    {
                      dessert: "Ice cream sandwich",
                      calories: 237,
                      fat: 9,
                      carbs: 37,
                      protein: 4.3,
                    },
                    {
                      dessert: "Eclair",
                      calories: 262,
                      fat: 16,
                      carbs: 24,
                      protein: 6,
                    },
                    {
                      dessert: "Cupcake",
                      calories: 305,
                      fat: 3.7,
                      carbs: 67,
                      protein: 4.3,
                    },
                    {
                      dessert: "Gingerbread",
                      calories: 356,
                      fat: 16,
                      carbs: 49,
                      protein: 3.9,
                    },
                  ]}
                  caption="Nutritional values per 100g serving"
                  variant="striped"
                  cellAlign="right"
                  stickyHeader={false}
                />
              </VariantSelector>
            </GridCol>
          )}
          {!isMobile && (
            <GridCol span={span}>
              <VariantSelector
                title="DataTable Component"
                variants={["5 rows", "10 rows", "25 rows"]}
                defaultVariant="5 rows"
                label="Select Rows Per Page:"
                onVariantChange={(variant) =>
                  console.log(`DataTable: ${variant}`)
                }
              >
                <DataTable
                  caption="People"
                  columns={[
                    { key: "id", header: "ID", width: 60, align: "center" },
                    { key: "firstName", header: "First name" },
                    { key: "lastName", header: "Last name" },
                    { key: "age", header: "Age", align: "right" },
                    { key: "fullName", header: "Full name" },
                  ]}
                  data={dataTableRows}
                  getRowId={(row) => (row as any).id}
                  size="sm"
                  compact
                  sx={{ transform: "scale(0.95)", transformOrigin: "top left" }}
                />
              </VariantSelector>
            </GridCol>
          )}
        </Grid>
      </div>
    </>
  );
}
