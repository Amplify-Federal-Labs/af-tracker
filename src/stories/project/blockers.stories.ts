import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import Blockers from '../../pages/project/components/blockers/index';
import type { Impediment } from '../../models/userStory';

// Helper function to create mock Impediment
const createMockImpediment = (overrides: Partial<Impediment> = {}): Impediment => ({
  id: 1,
  description: 'Waiting for API dependency to be resolved',
  isResolved: false,
  resolvedDate: undefined,
  ...overrides,
});

const meta = {
  title: 'Project/Blockers',
  component: Blockers,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A container component for managing story blockers/impediments. Displays existing blockers and provides functionality to add new ones.',
      },
    },
  },
  args: {
    onAdd: fn(),
    onUpdate: fn(),
    onResolve: fn(),
    onDelete: fn(),
  },
  argTypes: {
    blockers: {
      description: 'Array of impediment/blocker objects to display',
      control: 'object',
    },
    onAdd: {
      description: 'Callback function called when a new blocker is added',
      action: 'onAdd',
    },
    onUpdate: {
      description: 'Callback function called when a blocker description is updated',
      action: 'onUpdate',
    },
    onResolve: {
      description: 'Callback function called when a blocker is resolved',
      action: 'onResolve',
    },
    onDelete: {
      description: 'Callback function called when a blocker is deleted',
      action: 'onDelete',
    },
  },
} satisfies Meta<typeof Blockers>;

export default meta;
type Story = StoryObj<typeof meta>;

// Empty blockers list - only shows add blocker
export const Empty: Story = {
  args: {
    blockers: [],
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the component when there are no existing blockers. Only displays the "Add a blocker or impediment" button.',
      },
    },
  },
};

// Single blocker
export const SingleBlocker: Story = {
  args: {
    blockers: [
      createMockImpediment({
        id: 1,
        description: 'Waiting for third-party API integration to be completed',
        isResolved: false,
      }),
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows a single active blocker with the add blocker option below it.',
      },
    },
  },
};

// Multiple blockers - mixed states
export const MultipleBlockers: Story = {
  args: {
    blockers: [
      createMockImpediment({
        id: 1,
        description: 'Server infrastructure upgrade required before deployment',
        isResolved: false,
      }),
      createMockImpediment({
        id: 2,
        description: 'Database migration completed successfully',
        isResolved: true,
        resolvedDate: new Date('2024-01-18T14:30:00Z'),
      }),
      createMockImpediment({
        id: 3,
        description: 'Waiting for legal approval on terms of service changes',
        isResolved: false,
      }),
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows multiple blockers in different states - some resolved, some active - with the add blocker option at the bottom.',
      },
    },
  },
};

// All unresolved blockers
export const AllUnresolvedBlockers: Story = {
  args: {
    blockers: [
      createMockImpediment({
        id: 1,
        description: 'CRITICAL: Production database connection failing intermittently',
        isResolved: false,
      }),
      createMockImpediment({
        id: 2,
        description: 'Need additional developer resources to complete complex feature',
        isResolved: false,
      }),
      createMockImpediment({
        id: 3,
        description: 'UX design approval needed for new user onboarding flow',
        isResolved: false,
      }),
      createMockImpediment({
        id: 4,
        description: 'QA environment setup required for automated testing',
        isResolved: false,
      }),
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows multiple unresolved blockers that require attention. All blockers are active and blocking story progress.',
      },
    },
  },
};

// All resolved blockers
export const AllResolvedBlockers: Story = {
  args: {
    blockers: [
      createMockImpediment({
        id: 1,
        description: 'Security vulnerability patch applied and tested',
        isResolved: true,
        resolvedDate: new Date('2024-01-20T10:15:00Z'),
      }),
      createMockImpediment({
        id: 2,
        description: 'API rate limiting implementation completed',
        isResolved: true,
        resolvedDate: new Date('2024-01-19T16:45:00Z'),
      }),
      createMockImpediment({
        id: 3,
        description: 'Third-party service integration verified',
        isResolved: true,
        resolvedDate: new Date('2024-01-18T09:30:00Z'),
      }),
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows blockers that have all been resolved. Demonstrates the resolved state with resolution dates.',
      },
    },
  },
};

// Long description blockers
export const LongDescriptionBlockers: Story = {
  args: {
    blockers: [
      createMockImpediment({
        id: 1,
        description: 'This is a very long blocker description that demonstrates how the component handles extensive text content. The blocker involves multiple dependencies, complex integrations, and requires coordination between different teams to resolve. It may take several weeks to fully address all the underlying issues and dependencies.',
        isResolved: false,
      }),
      createMockImpediment({
        id: 2,
        description: 'Another long blocker description that tests the layout and text wrapping behavior of the component when dealing with complex, multi-sentence descriptions that provide detailed context about the impediment.',
        isResolved: false,
      }),
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests the component layout with very long blocker descriptions to ensure proper text wrapping and spacing.',
      },
    },
  },
};

// Different blocker types
export const DifferentBlockerTypes: Story = {
  args: {
    blockers: [
      createMockImpediment({
        id: 1,
        description: 'Technical: Server performance optimization needed',
        isResolved: false,
      }),
      createMockImpediment({
        id: 2,
        description: 'External: Waiting for vendor API documentation',
        isResolved: false,
      }),
      createMockImpediment({
        id: 3,
        description: 'Resource: Need UX designer for mockup review',
        isResolved: true,
        resolvedDate: new Date('2024-01-17T14:20:00Z'),
      }),
      createMockImpediment({
        id: 4,
        description: 'Process: Legal compliance review in progress',
        isResolved: false,
      }),
      createMockImpediment({
        id: 5,
        description: 'Infrastructure: Load balancer configuration completed',
        isResolved: true,
        resolvedDate: new Date('2024-01-16T11:00:00Z'),
      }),
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows different types of blockers that teams commonly encounter: technical, external dependencies, resource constraints, process-related, and infrastructure issues.',
      },
    },
  },
};

// Recent activity blockers
export const RecentActivityBlockers: Story = {
  args: {
    blockers: [
      createMockImpediment({
        id: 1,
        description: 'Just resolved: Authentication service restored',
        isResolved: true,
        resolvedDate: new Date(), // Today
      }),
      createMockImpediment({
        id: 2,
        description: 'New blocker: Payment gateway integration failing',
        isResolved: false,
      }),
      createMockImpediment({
        id: 3,
        description: 'Recently resolved: Database backup completed',
        isResolved: true,
        resolvedDate: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
      }),
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows blockers with recent activity - newly resolved, newly added, and recently resolved items.',
      },
    },
  },
};

// High priority blockers
export const HighPriorityBlockers: Story = {
  args: {
    blockers: [
      createMockImpediment({
        id: 1,
        description: 'URGENT: Security breach - immediate patch required',
        isResolved: false,
      }),
      createMockImpediment({
        id: 2,
        description: 'CRITICAL: Payment processing down for 2+ hours',
        isResolved: false,
      }),
      createMockImpediment({
        id: 3,
        description: 'HIGH: User data migration must complete before release',
        isResolved: false,
      }),
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows high-priority blockers that require immediate attention and may be blocking critical functionality.',
      },
    },
  },
};

// Many blockers
export const ManyBlockers: Story = {
  args: {
    blockers: Array.from({ length: 8 }, (_, i) =>
      createMockImpediment({
        id: i + 1,
        description: `Blocker #${i + 1}: ${
          [
            'Database connection pool exhausted',
            'Third-party service rate limits exceeded',
            'SSL certificate renewal required',
            'Load balancer health checks failing',
            'Cache invalidation strategy needed',
            'API version compatibility issues',
            'Monitoring alerts not triggering',
            'Backup restoration process blocked',
          ][i]
        }`,
        isResolved: i % 3 === 0, // Every third blocker is resolved
        resolvedDate: i % 3 === 0 ? new Date(Date.now() - (i * 24 * 60 * 60 * 1000)) : undefined,
      })
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows how the component handles a large number of blockers with mixed states. Tests scrolling and layout with many items.',
      },
    },
  },
};

// Interactive example
export const Interactive: Story = {
  args: {
    blockers: [
      createMockImpediment({
        id: 1,
        description: 'Interactive blocker - try editing, resolving, or deleting',
        isResolved: false,
      }),
      createMockImpediment({
        id: 2,
        description: 'Another interactive blocker for testing',
        isResolved: false,
      }),
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive example for testing all functionality. Try clicking on blocker text to edit, use resolve (✓) and delete (🗑) buttons, and add new blockers using the "Add a blocker or impediment" button. All actions are logged in the Actions panel.',
      },
    },
  },
};

// Workflow states example
export const WorkflowStatesExample: Story = {
  args: {
    blockers: [
      createMockImpediment({
        id: 1,
        description: 'New blocker: Just identified during planning',
        isResolved: false,
      }),
      createMockImpediment({
        id: 2,
        description: 'In progress: Working with external team to resolve',
        isResolved: false,
      }),
      createMockImpediment({
        id: 3,
        description: 'Recently resolved: Dependencies updated successfully',
        isResolved: true,
        resolvedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      }),
      createMockImpediment({
        id: 4,
        description: 'Older resolution: Infrastructure upgrade completed',
        isResolved: true,
        resolvedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
      }),
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates blockers in different workflow states from identification through resolution, showing how the component supports the full blocker lifecycle.',
      },
    },
  },
};