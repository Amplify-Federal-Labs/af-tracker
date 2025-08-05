import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useState } from 'react';
import { Box, Button } from '@mui/material';
import TemplateMenu from '../../pages/project/components/description/templateMenu';

// Wrapper component to demonstrate the menu behavior
const TemplateMenuWrapper = ({ onSelect }: { onSelect: (template: string) => void }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (template: string) => {
    onSelect(template);
    setAnchorEl(null);
  };

  

  return (
    <Box>
      <Button
        id="template-button"
        aria-controls={open ? 'template-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        variant="outlined"
      >
        Select Template
      </Button>
      {anchorEl && (
        <TemplateMenu
          open={open}
          anchorEl={anchorEl}
          onSelect={handleSelect}
          onClose={handleClose}
        />
      )}
    </Box>
  );
};

const meta = {
  title: 'Project/Components/TemplateMenu',
  component: TemplateMenuWrapper,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A dropdown menu component that provides predefined templates for bug reports and user stories. Click the button to open the menu and select a template.',
      },
    },
  },
  args: {
    onSelect: fn(),
  },
  argTypes: {
    onSelect: {
      description: 'Callback function called when a template is selected',
      action: 'template-selected',
    },
  },
} satisfies Meta<typeof TemplateMenuWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    onSelect: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Default template menu. Click the "Select Template" button to see the available options: Bug Report and User Story.',
      },
    },
  },
};

// Interactive story for testing template selection
export const Interactive: Story = {
  args: {
    onSelect: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive version that shows the selected template content. Click a template option to see its content in an alert.',
      },
    },
  },
};

// Story showing the bug report template content
export const BugReportTemplate: Story = {
  args: {
    onSelect: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates the Bug Report template option. The template includes sections for Steps to reproduce, Expected behavior, and Actual behavior.',
      },
      source: {
        code: `
// Bug Report Template Content:
const BUG_REPORT_TEMPLATE = \`### Steps to reproduce
1. 
2. 
3. 

### Expected


### Actual

\`;
        `,
      },
    },
  },
};

// Story showing the user story template content
export const UserStoryTemplate: Story = {
  args: {
    onSelect: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates the User Story template option. The template includes sections for Why (user story format), Acceptance Criteria (Gherkin format), and Notes.',
      },
      source: {
        code: `
// User Story Template Content:
const USER_STORY_TEMPLATE = \`### Why


**As personaName**
**I want**
**So that**

### Acceptance Criteria

\\\`\\\`\\\`gherkin
Scenario: 
Given
When
Then
\\\`\\\`\\\`

**Notes:**
\`;
        `,
      },
    },
  },
};