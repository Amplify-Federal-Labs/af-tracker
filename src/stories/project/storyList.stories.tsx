import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box } from '@mui/material';
import StoryList from '../../pages/project/storyList';
import type { UserStory, User } from '../../models/userStory';

// Mock user data
const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  image: 'https://via.placeholder.com/32'
};

const mockUser2: User = {
  id: '2',
  name: 'Jane Smith',
  email: 'jane.smith@example.com',
  image: 'https://via.placeholder.com/32'
};

// Mock story data
const createMockStory = (overrides: Partial<UserStory>): UserStory => ({
  id: '1',
  projectId: 'project-1',
  type: 'feature',
  title: 'Sample User Story',
  requester: mockUser,
  owners: [mockUser],
  points: 3,
  state: 'unstarted',
  blockers: [],
  description: 'This is a sample user story description.',
  labels: ['frontend', 'urgent'],
  tasks: [],
  createdAt: new Date('2024-01-15'),
  createdBy: mockUser,
  ...overrides,
});

const meta = {
  title: 'Project/StoryList',
  component: StoryList,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A list component that displays user stories with their icons and titles. Each story shows the appropriate icon based on its type (feature, bug, design, chore, release).',
      },
    },
  },
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 400, margin: 'auto' }}>
        <Story />
      </Box>
    ),
  ],
  argTypes: {
    stories: {
      description: 'Array of user stories to display',
      control: 'object',
    },
  },
} satisfies Meta<typeof StoryList>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default empty story list
export const Empty: Story = {
  args: {
    stories: [],
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty story list shows no items. This is the state when a project has no user stories.',
      },
    },
  },
};

// Single story
export const SingleStory: Story = {
  args: {
    stories: [
      createMockStory({
        id: '1',
        title: 'User Authentication System',
        type: 'feature',
      }),
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'A single feature story in the list. Shows the star icon for feature type stories.',
      },
    },
  },
};

// Multiple stories with different types
export const MultipleStoryTypes: Story = {
  args: {
    stories: [
      createMockStory({
        id: '1',
        title: 'User Authentication System',
        type: 'feature',
      }),
      createMockStory({
        id: '2',
        title: 'Fix login button styling',
        type: 'bug',
      }),
      createMockStory({
        id: '3',
        title: 'Update dashboard wireframes',
        type: 'design',
      }),
      createMockStory({
        id: '4',
        title: 'Update dependencies',
        type: 'chore',
      }),
      createMockStory({
        id: '5',
        title: 'Version 2.0 release',
        type: 'release',
      }),
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Multiple stories showing all different story types with their respective icons: feature (star), bug (bug report), design (palette), chore (build), and release (rocket).',
      },
    },
  },
};

// Feature stories only
export const FeatureStories: Story = {
  args: {
    stories: [
      createMockStory({
        id: '1',
        title: 'User Authentication System',
        type: 'feature',
      }),
      createMockStory({
        id: '2',
        title: 'Dashboard Analytics',
        type: 'feature',
      }),
      createMockStory({
        id: '3',
        title: 'Real-time Notifications',
        type: 'feature',
      }),
      createMockStory({
        id: '4',
        title: 'File Upload Component',
        type: 'feature',
      }),
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'A list containing only feature stories, all showing the star icon.',
      },
    },
  },
};

// Bug stories only
export const BugStories: Story = {
  args: {
    stories: [
      createMockStory({
        id: '1',
        title: 'Login form validation not working',
        type: 'bug',
      }),
      createMockStory({
        id: '2',
        title: 'Dashboard charts not loading',
        type: 'bug',
      }),
      createMockStory({
        id: '3',
        title: 'Mobile responsive issues',
        type: 'bug',
      }),
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'A list containing only bug stories, all showing the bug report icon.',
      },
    },
  },
};

// Long story titles
export const LongTitles: Story = {
  args: {
    stories: [
      createMockStory({
        id: '1',
        title: 'Implement comprehensive user authentication system with multi-factor authentication, social login, and password reset functionality',
        type: 'feature',
      }),
      createMockStory({
        id: '2',
        title: 'Design and implement a complete dashboard redesign with modern UI components, improved user experience, and accessibility features',
        type: 'design',
      }),
      createMockStory({
        id: '3',
        title: 'Fix critical performance issues in the data processing pipeline that are causing timeouts and memory leaks',
        type: 'bug',
      }),
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Stories with very long titles to test how the component handles text wrapping and layout.',
      },
    },
  },
};

// Many stories (scrolling)
export const ManyStories: Story = {
  args: {
    stories: Array.from({ length: 20 }, (_, index) => 
      createMockStory({
        id: `story-${index + 1}`,
        title: `User Story #${index + 1}: ${['Implement', 'Fix', 'Design', 'Update', 'Create'][index % 5]} ${['authentication', 'dashboard', 'navigation', 'forms', 'reports'][index % 5]}`,
        type: (['feature', 'bug', 'design', 'chore', 'release'] as const)[index % 5],
      })
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'A large number of stories to demonstrate scrolling behavior and performance with many items.',
      },
    },
  },
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 400, height: 400, margin: 'auto', overflow: 'auto' }}>
        <Story />
      </Box>
    ),
  ],
};

// Real-world project example
export const RealWorldExample: Story = {
  args: {
    stories: [
      createMockStory({
        id: '1',
        title: 'User can create new projects',
        type: 'feature',
        requester: mockUser,
        owners: [mockUser, mockUser2],
      }),
      createMockStory({
        id: '2',
        title: 'Project dashboard shows key metrics',
        type: 'feature',
        requester: mockUser2,
        owners: [mockUser],
      }),
      createMockStory({
        id: '3',
        title: 'Mobile navigation menu is broken',
        type: 'bug',
        requester: mockUser,
        owners: [mockUser2],
      }),
      createMockStory({
        id: '4',
        title: 'Redesign project cards for better UX',
        type: 'design',
        requester: mockUser2,
        owners: [mockUser, mockUser2],
      }),
      createMockStory({
        id: '5',
        title: 'Update React to latest version',
        type: 'chore',
        requester: mockUser,
        owners: [mockUser],
      }),
      createMockStory({
        id: '6',
        title: 'Deploy version 1.2.0 to production',
        type: 'release',
        requester: mockUser2,
        owners: [mockUser, mockUser2],
      }),
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'A realistic example of a project backlog with various story types and realistic titles that might be found in an actual project management tool.',
      },
    },
  },
};