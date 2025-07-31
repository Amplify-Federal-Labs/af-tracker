import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import UserStoryForm from '../../pages/project/userStoryForm';
import type { UserStory } from '../../models/userStory';
import type { User } from '../../models/user';

// Mock user data
const mockUser: User = {
  uid: 'user-123',
  name: 'John Doe',
  email: 'john.doe@example.com',
};

const mockRequester: User = {
  uid: 'requester-456',
  name: 'Product Manager',
  email: 'product.manager@example.com',
};

// Helper function to create mock UserStory
const createMockUserStory = (overrides: Partial<UserStory> = {}): UserStory => ({
  id: 'story-123',
  projectId: 'project-456',
  type: 'feature',
  title: 'Sample User Story',
  requester: mockRequester,
  owners: [mockUser],
  points: 3,
  state: 'unscheduled',
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
  title: 'Project/Components/UserStoryForm',
  component: UserStoryForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A form component for editing user story details, specifically the story type selection.',
      },
    },
  },
  args: {
    labels: ["bug", "feature", "enhancement", "documentation"],
    users: [mockUser, mockRequester],
    onSave: fn(),
    onAddNewLabel: fn()
  },
  argTypes: {
    story: {
      description: 'The user story object to edit',
      control: 'object',
    },
    onSave: {
      description: 'Callback function called when the story should be saved',
      action: 'onSave',
    },
  },
} satisfies Meta<typeof UserStoryForm>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story with a feature story
export const Default: Story = {
  args: {
    story: createMockUserStory(),
  },
};

// Feature story type
export const FeatureStory: Story = {
  args: {
    story: createMockUserStory({
      type: 'feature',
      title: 'Add user authentication',
      description: 'As a user, I want to be able to log in to access my personal dashboard.',
      labels: ['authentication', 'security'],
    }),
  },
};

// Design story type
export const DesignStory: Story = {
  args: {
    story: createMockUserStory({
      type: 'design',
      title: 'Create onboarding flow wireframes',
      description: 'As a designer, I need wireframes for the user onboarding process to guide development.',
      labels: ['design', 'wireframes', 'onboarding'],
      points: 2,
    }),
  },
};

// Bug story type
export const BugStory: Story = {
  args: {
    story: createMockUserStory({
      type: 'bug',
      title: 'Fix login form validation',
      description: 'Users are able to submit empty login forms, causing server errors.',
      labels: ['bug', 'validation', 'login'],
      state: 'started',
      points: 1,
    }),
  },
};

// Chore story type
export const ChoreStory: Story = {
  args: {
    story: createMockUserStory({
      type: 'chore',
      title: 'Update dependencies to latest versions',
      description: 'Update all npm packages to their latest stable versions and fix any breaking changes.',
      labels: ['maintenance', 'dependencies'],
      points: 5,
    }),
  },
};

// Release story type
export const ReleaseStory: Story = {
  args: {
    story: createMockUserStory({
      type: 'release',
      title: 'Deploy version 2.1.0 to production',
      description: 'Prepare and deploy the 2.1.0 release with new user management features.',
      labels: ['release', 'deployment'],
      state: 'finished',
      points: 8,
    }),
  },
};

// Story with complex data
export const ComplexStory: Story = {
  args: {
    story: createMockUserStory({
      type: 'feature',
      title: 'Implement advanced search functionality',
      description: 'As a user, I want to be able to search through content using filters, sorting, and advanced query options so that I can quickly find what I need.',
      labels: ['search', 'filters', 'performance', 'frontend', 'backend'],
      points: 13,
      state: 'started',
      owners: [
        mockUser,
        { uid: 'dev-789', name: 'Jane Developer', email: 'jane.developer@example.com' },
      ],
      tasks: [
        {
          description: 'Design search UI components',
          isCompleted: true,
          completedDate: new Date('2024-01-16T14:30:00Z'),
        },
        {
          description: 'Implement search API endpoints',
          isCompleted: true,
          completedDate: new Date('2024-01-18T09:15:00Z'),
        },
        {
          description: 'Add search filters',
          isCompleted: false,
        },
        {
          description: 'Implement search results pagination',
          isCompleted: false,
        },
        {
          description: 'Add performance optimizations',
          isCompleted: false,
        },
      ],
      blockers: [
        {
          description: 'Waiting for API rate limiting implementation',
          isResolved: false,
        },
      ],
      startedAt: new Date('2024-01-16T08:00:00Z'),
      startedBy: mockUser,
    }),
  },
};

// Story with minimal data
export const MinimalStory: Story = {
  args: {
    story: createMockUserStory({
      title: 'Simple task',
      description: 'A basic user story with minimal information.',
      labels: [],
      tasks: [],
      points: undefined,
    }),
  },
};

// Interactive story for testing form changes
export const Interactive: Story = {
  args: {
    story: createMockUserStory({
      type: 'feature',
      title: 'Interactive form example',
      description: 'Use the story type dropdown to see different selections.',
    }),
  },
  parameters: {
    docs: {
      description: {
        story: 'Try changing the story type using the dropdown to see how the form responds to different story types.',
      },
    },
  },
};