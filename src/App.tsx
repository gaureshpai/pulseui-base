import { SimpleThemeProvider } from "./components/SimpleThemeProvider/SimpleThemeProvider";
import { getThemeName, setTheme } from "./utils/themeUtils";
import { VariantSelector } from "./components/atoms/VariantSelector/VariantSelector";
import { Button } from "./components/atoms/Button/Button";
import { Badge } from "./components/atoms/Badge";
import { Alert } from "./components/atoms/Alert";
import { Checkbox } from "./components/atoms/Checkbox";
import { Switch } from "./components/atoms/Switch";
import { Select } from "./components/atoms/Select";
import { SimpleTopNav } from "./components/atoms/SimpleTopNav";
import { Grid, GridCol } from "./components/layouts/Grid";
import { Text } from "./components/atoms/Text";
import React from "react";
import { Input } from "./components/atoms/Input";
import { Textarea } from "./components/atoms/Textarea";
import { Pill } from "./components/atoms/Pill";
import { Card } from "./components/atoms/Card";
import { Tag } from "./components/atoms/Tag";
import { Avatar } from "./components/atoms/Avatar";
// import { Modal } from "./components/atoms/Modal"; // Commented out - not used in this showcase
import { Pagination } from "./components/atoms/Pagination";
import { PillInput } from "./components/atoms/PillInput";
import { Radio } from "./components/atoms/Radio";
import { Stepper } from "./components/atoms/Stepper";
import { Kbd } from "./components/atoms/Kbd";
import { PasswordInput } from "./components/atoms/PasswordInput";
import { ProgressBar } from "./components/atoms/ProgressBar";
// import { Accordion } from "./components/atoms/Accordion"; // Using preview
import { DatePicker } from "./components/atoms/DatePicker";
import { Autocomplete } from "./components/atoms/Autocomplete";
import { ThemeToggle } from "./components/atoms/ThemeToggle";
import { FileUpload } from "./components/atoms/FileUpload";
import { Drawer } from "./components/atoms/Drawer";
import { Image } from "./components/atoms/Image";
import { Calendar } from "./components/atoms/Calendar";
import { ActionButton } from "./components/atoms/ActionButton";
import { PinInput } from "./components/atoms/PinInput";
// import { Tabs } from "./components/atoms/Tabs"; // Using preview
import { Save } from "@mui/icons-material";

function AppContent() {
  const themeName = getThemeName();
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
  // const [cardState, setCardState] = React.useState<"default" | "image-overlay">("default"); // Not used in showcase
  const [tagState, setTagState] = React.useState<
    "default" | "teal" | "selected" | "mint"
  >("default");
  const [avatarState, setAvatarState] = React.useState<
    "primary" | "secondary" | "success" | "warning"
  >("primary");
  // const [modalState, setModalState] = React.useState<"default" | "large" | "small">("default"); // Not used in showcase
  const [paginationState, setPaginationState] = React.useState<
    "xs" | "sm" | "md" | "lg" | "xl"
  >("md");
  const [pillInputState, setPillInputState] = React.useState<
    "default" | "filled" | "unstyled"
  >("default");

  const [pillInputSize, setPillInputSize] = React.useState<
    "sm" | "md" | "lg" | "xl"
  >("md");
  const [pillInputPillSize, setPillInputPillSize] = React.useState<
    "xs" | "sm" | "md" | "lg" | "xl"
  >("sm");
  const [pillInputStateValue, setPillInputStateValue] = React.useState<
    "enabled" | "focus" | "typing" | "filled" | "disabled" | "error"
  >("enabled");
  const [pillInputDisabled, setPillInputDisabled] = React.useState(false);
  const [pillInputReadonly, setPillInputReadonly] = React.useState(false);
  const [pillInputRequired, setPillInputRequired] = React.useState(false);
  const [pillInputMaxPills, setPillInputMaxPills] = React.useState(5);
  const [pillInputPills, setPillInputPills] = React.useState<string[]>([
    "Sample",
    "Tag",
    "Demo",
  ]);

  // const [radioState, setRadioState] = React.useState<"default" | "filled" | "outline" | "light">("default"); // Not used in showcase
  const [stepperState, setStepperState] = React.useState<
    "xs" | "sm" | "md" | "lg" | "xl"
  >("md");
  const [kbdState, setKbdState] = React.useState<"sm" | "md" | "lg" | "xl">(
    "md"
  );

  // New component states
  const [passwordInputState, setPasswordInputState] = React.useState<
    "default" | "filled" | "unstyled"
  >("default");
  const [progressBarState, setProgressBarState] = React.useState<
    "default" | "striped" | "animated"
  >("default");
  // const [accordionState, setAccordionState] = React.useState<"single" | "multiple">("single"); // Using preview
  const [autocompleteState, setAutocompleteState] = React.useState<
    "default" | "filled" | "unstyled"
  >("default");
  const [themeToggleState, setThemeToggleState] = React.useState<
    "sm" | "md" | "lg"
  >("md");
  const [drawerState, setDrawerState] = React.useState<
    "left" | "right" | "top" | "bottom"
  >("left");
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [imageState, setImageState] = React.useState<
    "cover" | "contain" | "fill"
  >("cover");
  const [actionButtonState, setActionButtonState] = React.useState<
    "default" | "loading" | "success"
  >("default");
  // const [pinInputState, setPinInputState] = React.useState<"default" | "filled" | "outline">("default"); // Not used in showcase
  // const [tabsState, setTabsState] = React.useState<"default" | "pills" | "outline">("default"); // Using preview

  const navItems = [
    {
      id: "home",
      label: "Home",
      active: true,
      onClick: () => console.log("Home clicked"),
    },
    {
      id: "about",
      label: "About",
      onClick: () => console.log("About clicked"),
    },
    {
      id: "contact",
      label: "Contact",
      onClick: () => console.log("Contact clicked"),
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        paddingBottom: "100px",
      }}
    >
      <SimpleTopNav
        brandName="PulseUI"
        brandTitle="Component Library"
        items={navItems}
        sx={{ width: "100%" }}
        versionSelector={{
          version: "1.6.0",
          versions: ["1.5.0", "1.6.0", "1.7.0"],
          onVersionChange: (version) =>
            console.log("Version changed to:", version),
          show: true,
        }}
      />

      {/* Theme Switcher */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          alignItems: "center",
          padding: "16px",
          borderRadius: "8px",
          border: "1px solid #ddd",
          margin: "16px",
        }}
      >
        <span style={{ fontSize: "14px", color: "#666" }}>Theme:</span>
        <button
          onClick={() => setTheme("light")}
          style={{
            padding: "8px 16px",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500",
          }}
        >
          ☀️ Light
        </button>
        <button
          onClick={() => setTheme("dark")}
          style={{
            padding: "8px 16px",
            backgroundColor:
              themeName === "default-dark" ? "#007bff" : "#e9ecef",
            color: themeName === "default-dark" ? "#ffffff" : "#000000",
            border: "1px solid #ddd",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500",
          }}
        >
          🌙 Dark
        </button>
      </div>

      {/* Component Variants */}
      <div style={{ marginTop: "48px", padding: "0 16px" }}>
        <Text
          as="h2"
          variant="xl"
          weight="semibold"
          sx={{ marginBottom: "24px" }}
        >
          Component Variants
        </Text>

        <Grid gutter="24px">
          <GridCol span={4}>
            <VariantSelector
              title="Button Variants"
              variants={[
                "filled",
                "subtle",
                "light",
                "outline",
                "white",
                "default",
              ]}
              defaultVariant="filled"
              label="Select Button Variant:"
              onVariantChange={(variant) =>
                console.log(`Button variant changed to: ${variant}`)
              }
            >
              <Button size="lg">Sample Button</Button>
            </VariantSelector>
          </GridCol>
          <GridCol span={4}>
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
              <Badge variant="dot">Dot Badge</Badge>
            </VariantSelector>
          </GridCol>
          <GridCol span={4}>
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
      <div style={{ marginTop: "48px", padding: "0 16px" }}>
        <Text
          as="h2"
          variant="xl"
          weight="semibold"
          sx={{ marginBottom: "24px" }}
        >
          Form Components
        </Text>
        <Grid gutter="24px">
          <GridCol span={4}>
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
                label="Sample Checkbox"
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
          <GridCol span={4}>
            <VariantSelector
              title="Switch Variants"
              variants={["default", "disabled", "small", "large"]}
              defaultVariant="default"
              label="Select Switch Variant:"
              onVariantChange={(variant) =>
                console.log(`Switch variant changed to: ${variant}`)
              }
            >
              <Switch
                label="Sample Switch"
                defaultChecked={false}
                onChange={(checked) => console.log("Switch:", checked)}
              />
            </VariantSelector>
          </GridCol>
          <GridCol span={4}>
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
        </Grid>
      </div>

      {/* Additional Components */}
      <div style={{ marginTop: "48px", padding: "0 16px" }}>
        <Text
          as="h2"
          variant="xl"
          weight="semibold"
          sx={{ marginBottom: "24px" }}
        >
          Additional Components
        </Text>
        <Grid gutter="24px">
          <GridCol span={4}>
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
          <GridCol span={4}>
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
          <GridCol span={4}>
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

      {/* Additional Components Section */}
      <div style={{ marginTop: "48px", padding: "0 16px" }}>
        <Text variant="xxl" style={{ marginBottom: "24px" }}>
          More Components
        </Text>
        <Grid gutter="24px">
          <GridCol span={4}>
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
          <GridCol span={4}>
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
          <GridCol span={4}>
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

      {/* Even More Components Section */}
      <div style={{ marginTop: "48px", padding: "0 16px" }}>
        <Text variant="xxl" style={{ marginBottom: "24px" }}>
          Even More Components
        </Text>
        <Grid gutter="24px">
          <GridCol span={4}>
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
                }}
              >
                <Text
                  variant="md"
                  weight="semibold"
                  style={{ marginBottom: "8px" }}
                >
                  Modal Preview
                </Text>
                <Text variant="sm" color="secondary">
                  This is a preview of the modal component. Click to open the
                  actual modal.
                </Text>
              </div>
            </VariantSelector>
          </GridCol>
          <GridCol span={4}>
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
          <GridCol span={4}>
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
                onPillRemove={(pill, index) =>
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
        </Grid>
      </div>

      {/* Three More Components */}
      <div style={{ marginTop: "48px", padding: "0 16px" }}>
        <Text variant="xxl" weight="bold" style={{ marginBottom: "24px" }}>
          Three More Components
        </Text>
        <Grid gutter="24px">
          <GridCol span={4}>
            <VariantSelector
              title="Radio Component"
              variants={["default", "filled", "outline", "light"]}
              defaultVariant="default"
              onVariantChange={(variant) =>
                console.log(`Radio variant changed to: ${variant}`)
              }
            >
              <div>
                <Radio
                  size="md"
                  label="Option 1"
                  name="radio-group"
                  value="option1"
                  checked={false}
                  onChange={() => console.log("Option 1 selected")}
                />
              </div>
            </VariantSelector>
          </GridCol>
          <GridCol span={4}>
            <VariantSelector
              title="Stepper Component"
              variants={["xs", "sm", "md", "lg", "xl"]}
              defaultVariant="md"
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
          <GridCol span={4}>
            <VariantSelector
              title="Kbd Component"
              variants={["sm", "md", "lg", "xl"]}
              defaultVariant="md"
              onVariantChange={(variant) =>
                setKbdState(variant as "sm" | "md" | "lg" | "xl")
              }
            >
              <Kbd size={kbdState}>Ctrl + K</Kbd>
            </VariantSelector>
          </GridCol>
        </Grid>
      </div>

      {/* Advanced Input Components */}
      <div style={{ marginTop: "48px", padding: "0 16px" }}>
        <Text variant="xxl" weight="bold" style={{ marginBottom: "24px" }}>
          Advanced Input Components
        </Text>
        <Grid gutter="24px">
          <GridCol span={4}>
            <VariantSelector
              title="PasswordInput Component"
              variants={["default", "filled", "unstyled"]}
              defaultVariant="default"
              onVariantChange={(variant) =>
                console.log(`PasswordInput variant changed to: ${variant}`)
              }
            >
              <PasswordInput
                label="Password"
                placeholder="Enter your password..."
                showStrengthMeter={true}
                onChange={(value) => console.log("Password:", value)}
              />
            </VariantSelector>
          </GridCol>
          <GridCol span={4}>
            <VariantSelector
              title="PinInput Component"
              variants={["default", "filled", "outline"]}
              defaultVariant="default"
              onVariantChange={(variant) =>
                console.log(`PinInput variant changed to: ${variant}`)
              }
            >
              <PinInput
                length={4}
                mask={true}
                size="md"
                onChange={(value) => console.log("PIN:", value)}
              />
            </VariantSelector>
          </GridCol>
          <GridCol span={4}>
            <VariantSelector
              title="Autocomplete Component"
              variants={["default", "filled", "unstyled"]}
              defaultVariant="default"
              onVariantChange={(variant) =>
                setAutocompleteState(
                  variant as "default" | "filled" | "unstyled"
                )
              }
            >
              <Autocomplete
                placeholder="Search frameworks..."
                variant={autocompleteState}
                options={[
                  { value: "react", label: "React" },
                  { value: "vue", label: "Vue" },
                  { value: "angular", label: "Angular" },
                  { value: "svelte", label: "Svelte" },
                  { value: "nextjs", label: "Next.js" },
                  { value: "nuxtjs", label: "Nuxt.js" },
                ]}
                onChange={(value) => console.log("Autocomplete:", value)}
              />
            </VariantSelector>
          </GridCol>
        </Grid>
      </div>

      {/* Interactive Components */}
      <div style={{ marginTop: "48px", padding: "0 16px" }}>
        <Text variant="xxl" weight="bold" style={{ marginBottom: "24px" }}>
          Interactive Components
        </Text>
        <Grid gutter="24px">
          <GridCol span={4}>
            <VariantSelector
              title="ProgressBar Component"
              variants={["default", "striped", "animated"]}
              defaultVariant="default"
              onVariantChange={(variant) =>
                setProgressBarState(
                  variant as "default" | "striped" | "animated"
                )
              }
            >
              <div>
                <Text variant="sm" style={{ marginBottom: "8px" }}>
                  Progress: 65%
                </Text>
                <ProgressBar
                  value={65}
                  max={100}
                  size="md"
                  variant="default"
                  animated={progressBarState === "animated"}
                  showPercentage={true}
                />
              </div>
            </VariantSelector>
          </GridCol>
          <GridCol span={4}>
            <VariantSelector
              title="ActionButton Component"
              variants={["default", "loading", "success"]}
              defaultVariant="default"
              onVariantChange={(variant) =>
                setActionButtonState(
                  variant as "default" | "loading" | "success"
                )
              }
            >
              <ActionButton
                icon={Save}
                variant="filled"
                size="md"
                disabled={actionButtonState === "loading"}
                onClick={() => console.log("Action button clicked")}
              />
            </VariantSelector>
          </GridCol>
          <GridCol span={4}>
            <VariantSelector
              title="ThemeToggle Component"
              variants={["sm", "md", "lg"]}
              defaultVariant="md"
              onVariantChange={(variant) =>
                setThemeToggleState(variant as "sm" | "md" | "lg")
              }
            >
              <ThemeToggle
                size={themeToggleState}
                showLabel={true}
                variant="outline"
              />
            </VariantSelector>
          </GridCol>
        </Grid>
      </div>

      {/* Content Organization */}
      <div style={{ marginTop: "48px", padding: "0 16px" }}>
        <Text variant="xxl" weight="bold" style={{ marginBottom: "24px" }}>
          Content Organization
        </Text>
        <Grid gutter="24px">
          <GridCol span={4}>
            <VariantSelector
              title="Accordion Component"
              variants={["expanded", "collapsed"]}
              defaultVariant="expanded"
              onVariantChange={(variant) =>
                console.log(`Accordion variant changed to: ${variant}`)
              }
            >
              <div
                style={{
                  padding: "16px",
                  border: "1px solid var(--color-border-secondary)",
                  borderRadius: "var(--radius-md)",
                  backgroundColor: "var(--color-surface)",
                }}
              >
                <Text
                  variant="md"
                  weight="semibold"
                  style={{ marginBottom: "8px" }}
                >
                  Accordion Preview
                </Text>
                <Text variant="sm" color="secondary">
                  Click to expand/collapse content sections. Useful for FAQs and
                  content organization.
                </Text>
              </div>
            </VariantSelector>
          </GridCol>
          <GridCol span={4}>
            <VariantSelector
              title="Tabs Component"
              variants={["horizontal", "vertical"]}
              defaultVariant="horizontal"
              onVariantChange={(variant) =>
                console.log(`Tabs variant changed to: ${variant}`)
              }
            >
              <div
                style={{
                  padding: "16px",
                  border: "1px solid var(--color-border-secondary)",
                  borderRadius: "var(--radius-md)",
                  backgroundColor: "var(--color-surface)",
                }}
              >
                <Text
                  variant="md"
                  weight="semibold"
                  style={{ marginBottom: "8px" }}
                >
                  Tabs Preview
                </Text>
                <Text variant="sm" color="secondary">
                  Navigation between different content sections. Supports
                  horizontal and vertical layouts.
                </Text>
              </div>
            </VariantSelector>
          </GridCol>
          <GridCol span={4}>
            <VariantSelector
              title="Image Component"
              variants={["cover", "contain", "fill"]}
              defaultVariant="cover"
              onVariantChange={(variant) =>
                setImageState(variant as "cover" | "contain" | "fill")
              }
            >
              <Image
                src="https://picsum.photos/300/200"
                alt="Sample Image"
                width="100%"
                height="200px"
                fit={imageState}
                radius="md"
                loading="lazy"
              />
            </VariantSelector>
          </GridCol>
        </Grid>
      </div>

      {/* Date & File Components */}
      <div style={{ marginTop: "48px", padding: "0 16px" }}>
        <Text variant="xxl" weight="bold" style={{ marginBottom: "24px" }}>
          Date & File Components
        </Text>
        <Grid gutter="24px">
          <GridCol span={4}>
            <VariantSelector
              title="DatePicker Component"
              variants={["default", "range", "multiple"]}
              defaultVariant="default"
              onVariantChange={(variant) =>
                console.log(`DatePicker variant changed to: ${variant}`)
              }
            >
              <DatePicker
                label="Select Date"
                placeholder="Pick a date..."
                onChange={(date) => console.log("Date selected:", date)}
              />
            </VariantSelector>
          </GridCol>
          <GridCol span={4}>
            <VariantSelector
              title="Calendar Component"
              variants={["default", "range", "multiple"]}
              defaultVariant="default"
              onVariantChange={(variant) =>
                console.log(`Calendar variant changed to: ${variant}`)
              }
            >
              <Calendar
                size="md"
                onDateSelect={(date) => console.log("Calendar date:", date)}
              />
            </VariantSelector>
          </GridCol>
          <GridCol span={4}>
            <VariantSelector
              title="FileUpload Component"
              variants={["default", "dropzone", "button"]}
              defaultVariant="default"
              onVariantChange={(variant) =>
                console.log(`FileUpload variant changed to: ${variant}`)
              }
            >
              <FileUpload
                acceptedFileTypes={["pdf", "doc", "docx", "jpg", "png"]}
                maxFileSize={5242880} // 5MB
                multiple={true}
                onUpload={(files) => console.log("Files selected:", files)}
                uploadText="Drop files here or click to browse"
              />
            </VariantSelector>
          </GridCol>
        </Grid>
      </div>

      {/* Navigation Component */}
      <div
        style={{ marginTop: "48px", padding: "0 16px", marginBottom: "48px" }}
      >
        <Text variant="xxl" weight="bold" style={{ marginBottom: "24px" }}>
          Navigation Component
        </Text>
        <Grid gutter="24px">
          <GridCol span={6}>
            <VariantSelector
              title="Drawer Component"
              variants={["left", "right", "top", "bottom"]}
              defaultVariant="left"
              onVariantChange={(variant) =>
                setDrawerState(variant as "left" | "right" | "top" | "bottom")
              }
            >
              <div>
                <Button
                  variant="outline"
                  onClick={() => setDrawerOpen(true)}
                  style={{ marginBottom: "16px" }}
                >
                  Open{" "}
                  {drawerState.charAt(0).toUpperCase() + drawerState.slice(1)}{" "}
                  Drawer
                </Button>
                <Drawer
                  show={drawerOpen}
                  onClose={() => setDrawerOpen(false)}
                  direction={drawerState}
                  title="Sample Drawer"
                >
                  <div style={{ padding: "16px" }}>
                    <Text variant="md" style={{ marginBottom: "16px" }}>
                      This is a sample drawer content.
                    </Text>
                    <Text variant="sm" color="secondary">
                      You can put any content here including forms, navigation,
                      or other components.
                    </Text>
                    <Button
                      variant="filled"
                      size="sm"
                      onClick={() => setDrawerOpen(false)}
                      style={{ marginTop: "16px" }}
                    >
                      Close Drawer
                    </Button>
                  </div>
                </Drawer>
              </div>
            </VariantSelector>
          </GridCol>
          <GridCol span={6}>
            <div
              style={{
                padding: "24px",
                border: "1px solid var(--color-border-secondary)",
                borderRadius: "var(--radius-lg)",
                backgroundColor: "var(--color-surface)",
                textAlign: "center",
              }}
            >
              <Text
                variant="lg"
                weight="semibold"
                style={{ marginBottom: "8px" }}
              >
                🎉 Component Showcase Complete!
              </Text>
              <Text
                variant="md"
                color="secondary"
                style={{ marginBottom: "16px" }}
              >
                You now have{" "}
                <Text as="span" weight="semibold" color="primary">
                  15+
                </Text>{" "}
                components showcased in your UI
              </Text>
              <Text variant="sm" color="secondary">
                Each component includes interactive variant selectors and
                follows your design system tokens.
              </Text>
            </div>
          </GridCol>
        </Grid>
      </div>
    </div>
  );
}

function App() {
  return (
    <SimpleThemeProvider defaultTheme="light">
      <AppContent />
    </SimpleThemeProvider>
  );
}

export default App;
