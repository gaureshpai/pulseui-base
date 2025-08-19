import type { Meta, StoryObj } from "@storybook/react";
import React, { useState, useEffect } from "react";
import { ProgressBar } from "./ProgressBar";

const meta: Meta<typeof ProgressBar> = {
  title: "Components/ProgressBar",
  component: ProgressBar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "Current progress value (0-100)",
    },
    max: {
      control: { type: "number", min: 1, max: 1000 },
      description: "Maximum progress value",
    },
    label: {
      control: "text",
      description: "Label displayed above the progress bar",
    },
    helperText: {
      control: "text",
      description: "Helper text displayed below the progress bar",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "Size variant of the progress bar",
    },
    variant: {
      control: { type: "select" },
      options: ["default", "success", "warning", "error", "info"],
      description: "Visual variant of the progress bar",
    },
    showPercentage: {
      control: "boolean",
      description: "Whether to show the progress percentage",
    },
    animated: {
      control: "boolean",
      description: "Whether the progress bar is animated",
    },
    indeterminate: {
      control: "boolean",
      description: "Whether the progress bar is indeterminate (loading state)",
    },
  },
  args: {
    value: 75,
    max: 100,
    label: "Progress bar label",
    helperText: "Optional helper text",
    size: "md",
    variant: "default",
    showPercentage: false,
    animated: true,
    indeterminate: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <div style={{ width: "400px" }}>
      <ProgressBar 
        value={args.value}
        max={args.max}
        label={args.label}
        helperText={args.helperText}
        size={args.size}
        variant={args.variant}
        showPercentage={args.showPercentage}
        animated={args.animated}
        indeterminate={args.indeterminate}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Interactive playground with all controls available. Use the Controls panel to change properties and see the progress bar update in real-time.",
      },
    },
  },
};

export const Default: Story = {
  render: (args) => (
    <div style={{ width: "400px" }}>
      <ProgressBar 
        value={args.value}
        label={args.label}
        helperText={args.helperText}
      />
    </div>
  ),
  args: {
    value: 65,
    label: "File upload progress",
    helperText: "Uploading document.pdf...",
  },
  parameters: {
    docs: {
      description: {
        story: "Basic progress bar with label and helper text. The blue line moves smoothly as progress updates.",
      },
    },
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ width: "500px", display: "flex", flexDirection: "column", gap: "24px" }}>
      <ProgressBar
        value={45}
        size="sm"
        label="Small progress bar"
        helperText="Compact size for tight spaces"
        showPercentage
      />
      <ProgressBar
        value={65}
        size="md"
        label="Medium progress bar"
        helperText="Standard size for most use cases"
        showPercentage
      />
      <ProgressBar
        value={85}
        size="lg"
        label="Large progress bar"
        helperText="Prominent size for important progress"
        showPercentage
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Progress bars in all three sizes. Notice how the height, spacing, and typography scale appropriately.",
      },
    },
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ width: "500px", display: "flex", flexDirection: "column", gap: "24px" }}>
      <ProgressBar
        value={30}
        variant="default"
        label="Default variant"
        helperText="Standard blue progress bar"
        showPercentage
      />
      <ProgressBar
        value={50}
        variant="success"
        label="Success variant"
        helperText="Green for completed or successful operations"
        showPercentage
      />
      <ProgressBar
        value={70}
        variant="warning"
        label="Warning variant"
        helperText="Yellow for caution or pending states"
        showPercentage
      />
      <ProgressBar
        value={90}
        variant="error"
        label="Error variant"
        helperText="Red for errors or failed operations"
        showPercentage
      />
      <ProgressBar
        value={40}
        variant="info"
        label="Info variant"
        helperText="Blue for informational progress"
        showPercentage
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Progress bars in all visual variants. Each variant has its own color scheme and is appropriate for different contexts.",
      },
    },
  },
};

export const WithPercentage: Story = {
  render: () => (
    <div style={{ width: "500px", display: "flex", flexDirection: "column", gap: "24px" }}>
      <ProgressBar
        value={25}
        label="Quarter complete"
        helperText="25% of the task is finished"
        showPercentage
      />
      <ProgressBar
        value={50}
        label="Halfway there"
        helperText="50% of the task is finished"
        showPercentage
      />
      <ProgressBar
        value={75}
        label="Almost done"
        helperText="75% of the task is finished"
        showPercentage
      />
      <ProgressBar
        value={100}
        label="Complete!"
        helperText="100% of the task is finished"
        showPercentage
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Progress bars with percentage display. The percentage appears on the right side of the label.",
      },
    },
  },
};

export const AnimatedProgress: Story = {
  render: () => {
    const [progress, setProgress] = useState(0);
    
    useEffect(() => {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 1;
        });
      }, 100);
      
      return () => clearInterval(interval);
    }, []);

    return (
      <div style={{ width: "500px" }}>
        <ProgressBar
          value={progress}
          label="Processing files..."
          helperText={`Processed ${progress} out of 100 files`}
          showPercentage
          animated
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Animated progress bar that automatically increments. Watch the blue line move smoothly across the track.",
      },
    },
  },
};

export const Indeterminate: Story = {
  render: () => (
    <div style={{ width: "500px", display: "flex", flexDirection: "column", gap: "24px" }}>
      <ProgressBar
        value={0}
        indeterminate
        label="Loading..."
        helperText="Please wait while we process your request"
        variant="info"
      />
      <ProgressBar
        value={0}
        indeterminate
        label="Connecting to server..."
        helperText="Establishing secure connection"
        variant="warning"
      />
      <ProgressBar
        value={0}
        indeterminate
        label="Processing data..."
        helperText="Analyzing large dataset"
        variant="success"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Indeterminate progress bars for loading states. The animated line moves continuously to indicate ongoing activity.",
      },
    },
  },
};

export const CustomMaxValue: Story = {
  render: () => (
    <div style={{ width: "500px", display: "flex", flexDirection: "column", gap: "24px" }}>
      <ProgressBar
        value={7}
        max={10}
        label="Steps completed"
        helperText="7 out of 10 steps completed"
        showPercentage
      />
      <ProgressBar
        value={150}
        max={200}
        label="Items processed"
        helperText="150 out of 200 items processed"
        showPercentage
      />
      <ProgressBar
        value={3}
        max={5}
        label="Level progress"
        helperText="Level 3 of 5 completed"
        showPercentage
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Progress bars with custom maximum values. Useful for showing progress through a specific number of steps or items.",
      },
    },
  },
};

export const InteractiveDemo: Story = {
  render: () => {
    const [progress, setProgress] = useState(25);
    const [isRunning, setIsRunning] = useState(false);
    
    useEffect(() => {
      let interval: NodeJS.Timeout;
      
      if (isRunning && progress < 100) {
        interval = setInterval(() => {
          setProgress(prev => {
            if (prev >= 100) {
              setIsRunning(false);
              return 100;
            }
            return prev + Math.random() * 5;
          });
        }, 200);
      }
      
      return () => clearInterval(interval);
    }, [isRunning, progress]);

    const handleStart = () => {
      setProgress(0);
      setIsRunning(true);
    };

    const handleStop = () => {
      setIsRunning(false);
    };

    const handleReset = () => {
      setProgress(0);
      setIsRunning(false);
    };

    return (
      <div style={{ width: "500px" }}>
        <ProgressBar
          value={progress}
          label="Interactive progress demo"
          helperText={`${Math.round(progress)}% complete`}
          showPercentage
          animated
        />
        
        <div style={{ marginTop: "20px", display: "flex", gap: "12px" }}>
          <button
            onClick={handleStart}
            disabled={isRunning}
            style={{
              padding: "8px 16px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: isRunning ? "not-allowed" : "pointer",
              opacity: isRunning ? 0.6 : 1,
            }}
          >
            Start
          </button>
          
          <button
            onClick={handleStop}
            disabled={!isRunning}
            style={{
              padding: "8px 16px",
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: !isRunning ? "not-allowed" : "pointer",
              opacity: !isRunning ? 0.6 : 1,
            }}
          >
            Stop
          </button>
          
          <button
            onClick={handleReset}
            style={{
              padding: "8px 16px",
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Reset
          </button>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive demo with start, stop, and reset controls. Watch the progress bar animate in real-time.",
      },
    },
  },
};

export const RealWorldExamples: Story = {
  render: () => (
    <div style={{ width: "600px", display: "flex", flexDirection: "column", gap: "24px" }}>
      <ProgressBar
        value={85}
        label="File upload progress"
        helperText="Uploading presentation.pdf (85% complete)"
        variant="info"
        showPercentage
      />
      
      <ProgressBar
        value={42}
        label="Installation progress"
        helperText="Installing dependencies... (42/100 packages)"
        variant="success"
        showPercentage
      />
      
      <ProgressBar
        value={67}
        label="Data processing"
        helperText="Processing 67,000 records..."
        variant="warning"
        showPercentage
      />
      
      <ProgressBar
        value={100}
        label="Task completed"
        helperText="All tasks have been successfully completed!"
        variant="success"
        showPercentage
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Real-world examples showing how progress bars can be used in different contexts with appropriate labels and helper text.",
      },
    },
  },
};
