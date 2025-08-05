import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { useState } from "react";
import { Box } from "@mui/material";
import Write from "../../pages/project/components/description/write";

// Wrapper component to demonstrate controlled behavior
const WriteWrapper = ({
  initialText = "",
  onChnage,
}: {
  initialText?: string;
  onChnage: (text: string) => void;
}) => {
  const [text, setText] = useState(initialText);

  const handleChange = (newText: string) => {
    setText(newText);
    onChnage(newText);
  };

  return (
    <Box sx={{ maxWidth: 600 }}>
      <Write text={text} onChange={handleChange} />
    </Box>
  );
};

const meta = {
  title: "Project/Components/Write",
  component: WriteWrapper,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A text editor component with template support. Users can type directly in the text field or click the document icon to select from predefined templates (Bug Report or User Story).",
      },
    },
  },
  args: {
    onChnage: fn(),
  },
  argTypes: {
    initialText: {
      description: "Initial text content for the editor",
      control: "text",
    },
    onChnage: {
      description: "Callback function called when the text content changes",
      action: "text-changed",
    },
  },
} satisfies Meta<typeof WriteWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default empty editor
export const Default: Story = {
  args: {
    initialText: "",
    onChnage: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Default empty text editor. Click the document icon to access templates, or type directly in the text field.",
      },
    },
  },
};

// Editor with existing content
export const WithExistingContent: Story = {
  args: {
    initialText: "This is some existing content in the text editor.",
    onChnage: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Text editor with pre-existing content. You can edit the text or replace it with a template.",
      },
    },
  },
};

// Editor with bug report template pre-filled
export const WithBugReportTemplate: Story = {
  args: {
    initialText: `### Steps to reproduce
1. 
2. 
3. 

### Expected


### Actual

`,
    onChnage: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Text editor pre-filled with a bug report template. This shows how the editor looks when the Bug Report template is selected.",
      },
    },
  },
};

// Editor with user story template pre-filled
export const WithUserStoryTemplate: Story = {
  args: {
    initialText: `### Why


**As personaName**
**I want**
**So that**

### Acceptance Criteria

\`\`\`gherkin
Scenario: 
Given
When
Then
\`\`\`

**Notes:**
`,
    onChnage: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Text editor pre-filled with a user story template. This shows how the editor looks when the User Story template is selected.",
      },
    },
  },
};

// Interactive story for testing template selection
export const Interactive: Story = {
  args: {
    initialText: "",
    onChnage: (text: string) => {
      console.log("Text changed:", text);
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive version for testing. Click the document icon to test template selection functionality. Changes are logged to the browser console.",
      },
    },
  },
};

// Story demonstrating long content
export const WithLongContent: Story = {
  args: {
    initialText: `### Project Requirements

This is a comprehensive description of the project requirements and specifications.

#### Background
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

#### Detailed Requirements
1. The system must support user authentication
2. Data should be persisted in a database
3. The interface should be responsive
4. Performance requirements include sub-second response times
5. Security measures must be implemented

#### Technical Specifications
- Frontend: React with TypeScript
- Backend: Node.js with Express
- Database: PostgreSQL
- Authentication: Firebase Auth
- Hosting: Cloud platform deployment

#### Acceptance Criteria
\`\`\`gherkin
Scenario: User logs in successfully
Given a registered user
When they enter valid credentials
Then they should be redirected to the dashboard
And their session should be maintained
\`\`\`

#### Notes
Additional considerations and implementation details will be added as the project progresses.`,
    onChnage: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Text editor with longer content to demonstrate how the multiline TextField handles extensive text.",
      },
    },
  },
};
