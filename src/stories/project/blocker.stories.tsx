import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import BlockerComponent from '../../pages/project/components/blockers/blocker';
import type { Blocker } from '../../viewModels/userStory';

// Helper function to create mock Blocker
const createMockBlocker = (overrides: Partial<Blocker> = {}): Blocker => ({
  description: 'Waiting for API dependency to be resolved',
  isResolved: false,
  resolvedDate: undefined,
  ...overrides,
});

const meta = {
  title: 'Project/Components/Blocker',
  component: BlockerComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A component for displaying and managing story blockers/impediments. Allows editing, resolving, and deleting blockers.',
      },
    },
  },
  args: {
    index: 0,
    onUpdate: fn(),
    onResolve: fn(),
    onDelete: fn(),
  },
  argTypes: {
    blocker: {
      description: 'The impediment/blocker object to display',
      control: 'object',
    },
    onUpdate: {
      description: 'Callback function called when the blocker description is updated',
      action: 'onUpdate',
    },
    onResolve: {
      description: 'Callback function called when the blocker is resolved',
      action: 'onResolve',
    },
    onDelete: {
      description: 'Callback function called when the blocker is deleted',
      action: 'onDelete',
    },
  },
} satisfies Meta<typeof BlockerComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story with an unresolved blocker
export const Default: Story = {
  args: {
    blocker: createMockBlocker(),
  },
};

// Unresolved blocker
export const UnresolvedBlocker: Story = {
  args: {
    blocker: createMockBlocker({
      description: 'Waiting for third-party API integration to be completed',
      isResolved: false,
    }),
  },
  parameters: {
    docs: {
      description: {
        story: 'An active blocker that has not been resolved yet. Users can edit the description, resolve it, or delete it.',
      },
    },
  },
};

// Resolved blocker
export const ResolvedBlocker: Story = {
  args: {
    blocker: createMockBlocker({
      description: 'Database migration completed successfully',
      isResolved: true,
      resolvedDate: new Date('2024-01-20T14:30:00Z'),
    }),
  },
  parameters: {
    docs: {
      description: {
        story: 'A blocker that has been resolved. Shows the resolved state and includes resolution date.',
      },
    },
  },
};

// Long description blocker
export const LongDescriptionBlocker: Story = {
  args: {
    blocker: createMockBlocker({
      description: 'This is a very long blocker description that demonstrates how the component handles extensive text content. The blocker involves multiple dependencies, complex integrations, and requires coordination between different teams to resolve. It may take several weeks to fully address all the underlying issues.',
      isResolved: false,
    }),
  },
  parameters: {
    docs: {
      description: {
        story: 'A blocker with a very long description to test text wrapping and layout behavior.',
      },
    },
  },
};

// Short description blocker
export const ShortDescriptionBlocker: Story = {
  args: {
    blocker: createMockBlocker({
      description: 'Bug fix needed',
      isResolved: false,
    }),
  },
  parameters: {
    docs: {
      description: {
        story: 'A blocker with a minimal description.',
      },
    },
  },
};

// Technical blocker
export const TechnicalBlocker: Story = {
  args: {
    blocker: createMockBlocker({
      description: 'Server infrastructure upgrade required before deployment',
      isResolved: false,
    }),
  },
  parameters: {
    docs: {
      description: {
        story: 'A technical blocker related to infrastructure or system requirements.',
      },
    },
  },
};

// External dependency blocker
export const ExternalDependencyBlocker: Story = {
  args: {
    blocker: createMockBlocker({
      description: 'Waiting for legal approval on terms of service changes',
      isResolved: false,
    }),
  },
  parameters: {
    docs: {
      description: {
        story: 'A blocker that depends on external parties or processes outside the development team.',
      },
    },
  },
};

// Resource blocker
export const ResourceBlocker: Story = {
  args: {
    blocker: createMockBlocker({
      description: 'Need additional developer resources to complete complex feature',
      isResolved: false,
    }),
  },
  parameters: {
    docs: {
      description: {
        story: 'A blocker related to resource availability or capacity constraints.',
      },
    },
  },
};

// Recently resolved blocker
export const RecentlyResolvedBlocker: Story = {
  args: {
    blocker: createMockBlocker({
      description: 'Security vulnerability patch applied and tested',
      isResolved: true,
      resolvedDate: new Date(), // Today
    }),
  },
  parameters: {
    docs: {
      description: {
        story: 'A blocker that was just recently resolved, showing current date as resolution date.',
      },
    },
  },
};

// Critical blocker
export const CriticalBlocker: Story = {
  args: {
    blocker: createMockBlocker({
      description: 'CRITICAL: Production database connection failing intermittently',
      isResolved: false,
    }),
  },
  parameters: {
    docs: {
      description: {
        story: 'A high-priority blocker that requires immediate attention.',
      },
    },
  },
};

// Design blocker
export const DesignBlocker: Story = {
  args: {
    blocker: createMockBlocker({
      description: 'UX design approval needed for new user onboarding flow',
      isResolved: false,
    }),
  },
  parameters: {
    docs: {
      description: {
        story: 'A blocker related to design decisions or approvals.',
      },
    },
  },
};

// Testing blocker
export const TestingBlocker: Story = {
  args: {
    blocker: createMockBlocker({
      description: 'QA environment setup required for automated testing',
      isResolved: false,
    }),
  },
  parameters: {
    docs: {
      description: {
        story: 'A blocker related to testing infrastructure or QA processes.',
      },
    },
  },
};

// Interactive story for testing functionality
export const Interactive: Story = {
  args: {
    blocker: createMockBlocker({
      description: 'Interactive blocker - try the resolve and delete buttons',
    }),
  },
  parameters: {
    docs: {
      description: {
        story: 'An interactive story for testing the resolve and delete functionality. Click the resolve (✓) or delete (🗑) buttons to see the action handlers in the Actions panel.',
      },
    },
  },
};

