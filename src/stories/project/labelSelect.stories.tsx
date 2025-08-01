import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { useState } from "react";
import { Box } from "@mui/material";
import LabelSelect from "../../pages/project/components/labelSelect";

// Wrapper component to demonstrate controlled behavior
const LabelSelectWrapper = ({
  availableLabels = [],
  initialSelectedLabels = [],
  onAddNewLabel,
  onChange,
}: {
  availableLabels?: string[];
  initialSelectedLabels?: string[];
  onAddNewLabel: (label: string) => void;
  onChange: (labels: string[]) => void;
}) => {
  const [selectedLabels, setSelectedLabels] = useState(initialSelectedLabels);
  const [allLabels, setAllLabels] = useState(availableLabels);

  const handleAddNewLabel = (label: string) => {
    if (!allLabels.includes(label)) {
      setAllLabels([...allLabels, label]);
    }
    onAddNewLabel(label);
  };

  const handleChange = (labels: string[]) => {
    setSelectedLabels(labels);
    onChange(labels);
  };

  return (
    <Box sx={{ maxWidth: 400 }}>
      <LabelSelect
        availableLabels={allLabels}
        selectedLabels={selectedLabels}
        onAddNewLabel={handleAddNewLabel}
        onChange={handleChange}
      />
    </Box>
  );
};

const meta = {
  title: "Project/Components/LabelSelect",
  component: LabelSelectWrapper,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A label selection component that allows users to select from available labels or create new ones. Uses Material-UI Autocomplete with chip display for both available options and selected labels.",
      },
    },
  },
  args: {
    onAddNewLabel: fn(),
    onChange: fn(),
  },
  argTypes: {
    availableLabels: {
      description: "Array of available label options",
      control: "object",
    },
    initialSelectedLabels: {
      description: "Initially selected labels",
      control: "object",
    },
    onAddNewLabel: {
      description: "Callback function called when a new label is added",
      action: "label-added",
    },
    onChange: {
      description: "Callback function called when selected labels change",
      action: "labels-changed",
    },
  },
} satisfies Meta<typeof LabelSelectWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default empty state
export const Default: Story = {
  args: {
    availableLabels: ["bug", "feature", "enhancement", "documentation"],
    initialSelectedLabels: [],
    onAddNewLabel: fn(),
    onChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Default label selector with predefined available labels. Users can select from the dropdown or type to filter options.",
      },
    },
  },
};

// With some labels already selected
export const WithSelectedLabels: Story = {
  args: {
    availableLabels: [
      "bug",
      "feature",
      "enhancement",
      "documentation",
      "urgent",
      "low-priority",
    ],
    initialSelectedLabels: ["bug", "urgent"],
    onAddNewLabel: fn(),
    onChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Label selector with some labels already selected. Selected labels are displayed as chips that can be removed.",
      },
    },
  },
};

// Empty available labels (new project scenario)
export const EmptyAvailableLabels: Story = {
  args: {
    availableLabels: [],
    initialSelectedLabels: [],
    onAddNewLabel: fn(),
    onChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Label selector with no predefined labels. Users can create new labels by typing in the input field.",
      },
    },
  },
};

// Many available labels
export const ManyLabels: Story = {
  args: {
    availableLabels: [
      "bug",
      "feature",
      "enhancement",
      "documentation",
      "urgent",
      "high-priority",
      "medium-priority",
      "low-priority",
      "frontend",
      "backend",
      "api",
      "ui/ux",
      "performance",
      "security",
      "testing",
      "deployment",
      "refactor",
      "technical-debt",
    ],
    initialSelectedLabels: ["feature", "frontend", "high-priority"],
    onAddNewLabel: fn(),
    onChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Label selector with many available labels and several already selected. Demonstrates filtering and selection behavior with larger datasets.",
      },
    },
  },
};

// Interactive story for testing
export const Interactive: Story = {
  args: {
    availableLabels: ["bug", "feature", "enhancement", "documentation"],
    initialSelectedLabels: [],
    onAddNewLabel: fn(),
    onChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive version for testing label selection and creation. All changes are logged to the browser console.",
      },
    },
  },
};

// Story demonstrating custom labels creation
export const CreateNewLabels: Story = {
  args: {
    availableLabels: ["existing-label"],
    initialSelectedLabels: [],
    onAddNewLabel: fn(),
    onChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates creating new labels. Type a label name that doesn't exist in the available options and press Enter to create it.",
      },
    },
  },
};
