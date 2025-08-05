import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useState } from 'react';
import { Box } from '@mui/material';
import Description from '../../pages/project/components/description';

// Wrapper component to demonstrate controlled behavior
const DescriptionWrapper = ({ initialText = '', onChange }: { initialText?: string; onChange: (text: string) => void }) => {
  const [text, setText] = useState(initialText);

  const handleChange = (newText: string) => {
    setText(newText);
    onChange(newText);
  };

  return (
    <Box sx={{ maxWidth: 800, minHeight: 400 }}>
      <Description text={text} onChange={handleChange} />
    </Box>
  );
};

const meta = {
  title: 'Project/Components/Description',
  component: DescriptionWrapper,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A tabbed text editor with Write and Preview modes. The Write tab provides a text editor with template support, while the Preview tab renders the content as Markdown.',
      },
    },
  },
  args: {
    onChange: fn(),
  },
  argTypes: {
    initialText: {
      description: 'Initial text content for the editor',
      control: 'text',
    },
    onChange: {
      description: 'Callback function called when the text content changes',
      action: 'text-changed',
    },
  },
} satisfies Meta<typeof DescriptionWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default empty editor
export const Default: Story = {
  args: {
    initialText: '',
    onChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Default empty description editor. Start in Write mode to enter text, then switch to Preview to see the Markdown rendering.',
      },
    },
  },
};

// Editor with markdown content
export const WithMarkdownContent: Story = {
  args: {
    initialText: `# Project Description

This is a **sample project** with *various* formatting options.

## Features

- Feature 1: User authentication
- Feature 2: Data visualization
- Feature 3: Real-time updates

## Code Example

\`\`\`javascript
function handleSubmit(data) {
  return api.post('/submit', data);
}
\`\`\`

## Links

Check out our [documentation](https://example.com) for more details.`,
    onChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Description editor with Markdown content. Switch between Write and Preview tabs to see the difference between raw Markdown and rendered output.',
      },
    },
  },
};

// Editor with bug report template
export const WithBugReportTemplate: Story = {
  args: {
    initialText: `### Steps to reproduce
1. Navigate to the login page
2. Enter invalid credentials
3. Click the login button

### Expected
User should see an error message indicating invalid credentials.

### Actual
The page crashes with a white screen error.`,
    onChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Description editor with a bug report template filled in. This demonstrates how the component looks when used for bug reporting.',
      },
    },
  },
};

// Editor with user story template
export const WithUserStoryTemplate: Story = {
  args: {
    initialText: `### Why

**As a project manager**
**I want to be able to track project progress**
**So that I can report status to stakeholders**

### Acceptance Criteria

\`\`\`gherkin
Scenario: View project dashboard
Given I am logged in as a project manager
When I navigate to the project dashboard
Then I should see a summary of all active projects
And I should see progress indicators for each project
\`\`\`

**Notes:**
- Dashboard should update in real-time
- Progress indicators should be color-coded
- Include filtering options by project status`,
    onChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Description editor with a user story template filled in. This shows how the component is used for user story creation with proper formatting.',
      },
    },
  },
};

// Interactive story for testing both tabs
export const Interactive: Story = {
  args: {
    initialText: `# Interactive Example

Try editing this content in the **Write** tab and then switch to the **Preview** tab to see the rendered Markdown.

## Try These Features:

1. **Bold** and *italic* text
2. [Links](https://example.com)
3. Code blocks:

\`\`\`typescript
interface Example {
  name: string;
  value: number;
}
\`\`\`

4. Lists and more!

Click the document icon in the Write tab to try the template menu.`,
    onChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive version for testing both Write and Preview functionality. Changes are logged to the browser console. Try switching between tabs and using the template menu.',
      },
    },
  },
};

// Complex content example
export const ComplexContent: Story = {
  args: {
    initialText: `# Technical Specification

## Overview
This document outlines the technical requirements for implementing the new user dashboard feature.

## Architecture

### Frontend Components
- \`DashboardContainer\`: Main container component
- \`MetricsWidget\`: Displays key performance indicators
- \`ChartComponent\`: Renders data visualizations

### Backend Services
- \`UserService\`: Handles user data operations
- \`MetricsService\`: Aggregates performance data
- \`NotificationService\`: Manages real-time updates

## Implementation Plan

### Phase 1: Foundation
1. Set up component structure
2. Implement basic routing
3. Create API endpoints

### Phase 2: Features
1. Add metrics collection
2. Implement charts and graphs
3. Real-time data updates

### Phase 3: Polish
1. Performance optimization
2. Error handling
3. Testing and documentation

## Technical Requirements

| Component | Technology | Status |
|-----------|------------|--------|
| Frontend | React + TypeScript | ✅ Ready |
| Backend | Node.js + Express | 🔄 In Progress |
| Database | PostgreSQL | ❌ Pending |

## Code Examples

### API Endpoint
\`\`\`typescript
app.get('/api/dashboard/:userId', async (req, res) => {
  const { userId } = req.params;
  const metrics = await MetricsService.getUserMetrics(userId);
  res.json(metrics);
});
\`\`\`

### Component Usage
\`\`\`tsx
function Dashboard({ userId }: { userId: string }) {
  const { data, loading } = useQuery(['dashboard', userId], 
    () => fetchDashboardData(userId)
  );
  
  if (loading) return <LoadingSpinner />;
  
  return (
    <DashboardContainer>
      <MetricsWidget data={data.metrics} />
      <ChartComponent data={data.chartData} />
    </DashboardContainer>
  );
}
\`\`\`

## Notes
- All components should be fully responsive
- Implement proper error boundaries
- Follow accessibility guidelines (WCAG 2.1)
- Add comprehensive unit tests`,
    onChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Complex technical content example demonstrating the component with extensive Markdown formatting, tables, code blocks, and structured documentation.',
      },
    },
  },
};