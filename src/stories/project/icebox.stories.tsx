import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import Icebox from '../../pages/project/icebox';
import type { UserStory } from '../../viewModels/userStory';
import type { User } from '../../viewModels/user';

// Mock user data
const mockUser: User = {
  id: 'user-123',
  name: 'John Doe',
  email: 'john.doe@example.com',
};

const mockRequester: User = {
  id: 'requester-456',
  name: 'Product Manager',
  email: 'product.manager@example.com',
};

const mockDeveloper: User = {
  id: 'dev-789',
  name: 'Jane Developer',
  email: 'jane.developer@example.com',
};

// Helper function to create mock UserStory
const createMockUserStory = (overrides: Partial<UserStory> = {}): UserStory => ({
  id: `story-${Math.random().toString(36).substr(2, 9)}`,
  index: 0,
  type: 'feature',
  title: 'Sample User Story',
  requester: mockRequester,
  owners: [mockUser],
  estimate: '3',
  location: 'icebox',
  state: 'unstarted',
  blockers: [],
  description: 'As a user, I want to be able to create user stories so that I can track work items.',
  labels: ['frontend', 'ui'],
  tasks: [
    {
      description: 'Design mockups',
      isCompleted: false,
    },
    {
      description: 'Implement component',
      isCompleted: false,
    },
  ],
  createdAt: new Date('2024-01-15T10:00:00Z'),
  createdBy: mockUser,
  ...overrides,
});

const meta = {
  title: 'Project/Pages/Icebox',
  component: Icebox,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'The Icebox component displays unscheduled user stories with the ability to add new stories via a floating action button.',
      },
    },
  },
  args: {
    projectId: 'project-456',
    user: mockUser,
    users: [mockUser, mockRequester, mockDeveloper],
    labels: ['bug', 'feature', 'enhancement', 'documentation', 'design', 'performance'],
    stories: [],
    onAddNewLabel: fn(),
    onSelectStory: fn(),
  },
  argTypes: {
    projectId: {
      description: 'The ID of the current project',
      control: 'text',
    },
    user: {
      description: 'The current logged-in user',
      control: 'object',
    },
    users: {
      description: 'List of all users in the project',
      control: 'object',
    },
    labels: {
      description: 'Available labels for stories',
      control: 'object',
    },
    stories: {
      description: 'Array of user stories to display in the icebox',
      control: 'object',
    },
    onAddNewLabel: {
      description: 'Callback function called when a new label is added',
      action: 'onAddNewLabel',
    },
    onSelectStory: {
      description: 'Callback function called when a story is selected',
      action: 'onSelectStory',
    },
  },
} satisfies Meta<typeof Icebox>;

export default meta;
type Story = StoryObj<typeof meta>;

// Empty icebox
export const Empty: Story = {
  args: {
    stories: [],
  },
  parameters: {
    docs: {
      description: {
        story: 'An empty icebox with no stories, showing only the add story button.',
      },
    },
  },
};

// Single story
export const SingleStory: Story = {
  args: {
    stories: [
      createMockUserStory({
        title: 'Add user profile page',
        type: 'feature',
        description: 'As a user, I want to view and edit my profile information.',
        labels: ['frontend', 'user-management'],
      }),
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Icebox with a single user story.',
      },
    },
  },
};

// Multiple stories of different types
export const MultipleStories: Story = {
  args: {
    stories: [
      createMockUserStory({
        title: 'Implement user authentication',
        type: 'feature',
        description: 'As a user, I want to be able to log in securely.',
        labels: ['authentication', 'security'],
        estimate: '5',
      }),
      createMockUserStory({
        title: 'Fix login form validation',
        type: 'bug',
        description: 'Login form accepts invalid email formats.',
        labels: ['bug', 'validation'],
        estimate: '2',
      }),
      createMockUserStory({
        title: 'Design new dashboard layout',
        type: 'design',
        description: 'Create wireframes and mockups for the new dashboard.',
        labels: ['design', 'ui/ux'],
        estimate: '3',
      }),
      createMockUserStory({
        title: 'Update dependencies',
        type: 'chore',
        description: 'Update all npm packages to latest versions.',
        labels: ['maintenance'],
        estimate: '1',
      }),
      createMockUserStory({
        title: 'Release version 2.0',
        type: 'release',
        description: 'Deploy version 2.0 with new features.',
        labels: ['release', 'deployment'],
        estimate: '8',
      }),
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Icebox with multiple stories of different types (feature, bug, design, chore, release).',
      },
    },
  },
};

// Many stories (testing overflow)
export const ManyStories: Story = {
  args: {
    stories: Array.from({ length: 15 }, (_, index) =>
      createMockUserStory({
        title: `Story ${index + 1}: ${['Feature', 'Bug Fix', 'Design Task', 'Chore', 'Enhancement'][index % 5]}`,
        type: (['feature', 'bug', 'design', 'chore', 'feature'] as const)[index % 5],
        description: `This is story number ${index + 1} in the icebox.`,
        labels: [
          ['frontend', 'backend', 'ui', 'api', 'database'][index % 5],
          ['high-priority', 'medium-priority', 'low-priority', 'urgent', 'nice-to-have'][index % 5],
        ],
        estimate: String((index % 8) + 1) as '1' | '2' | '3' | '5' | '8',
      })
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Icebox with many stories to test scrolling and layout behavior.',
      },
    },
  },
};

// Stories with complex data
export const ComplexStories: Story = {
  args: {
    stories: [
      createMockUserStory({
        title: 'Implement advanced search with filters',
        type: 'feature',
        description: 'As a user, I want to search through content using advanced filters and sorting options so that I can quickly find relevant information.',
        labels: ['search', 'filters', 'performance', 'frontend', 'backend'],
        estimate: '8',
        owners: [mockUser, mockDeveloper],
        tasks: [
          { description: 'Design search UI', isCompleted: false },
          { description: 'Implement backend API', isCompleted: false },
          { description: 'Add search filters', isCompleted: false },
          { description: 'Performance testing', isCompleted: false },
        ],
        blockers: [
          {
            description: 'Waiting for search API design approval',
            isResolved: false,
          },
        ],
      }),
      createMockUserStory({
        title: 'Critical security vulnerability in auth module',
        type: 'bug',
        description: 'Security researchers found a vulnerability that allows privilege escalation.',
        labels: ['security', 'critical', 'authentication'],
        estimate: '8',
        owners: [mockDeveloper],
        tasks: [
          { description: 'Reproduce the vulnerability', isCompleted: false },
          { description: 'Develop security patch', isCompleted: false },
          { description: 'Security testing', isCompleted: false },
        ],
      }),
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Icebox with complex stories containing multiple owners, tasks, and blockers.',
      },
    },
  },
};

// Interactive demo
export const Interactive: Story = {
  args: {
    stories: [
      createMockUserStory({
        title: 'Interactive demo story',
        type: 'feature',
        description: 'This story can be edited by clicking the add button.',
        labels: ['demo', 'interactive'],
      }),
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive icebox where you can test the add story functionality.',
      },
    },
  },
};