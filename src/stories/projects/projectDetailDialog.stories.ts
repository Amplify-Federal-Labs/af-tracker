import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import ProjectDetailDialog from '../../pages/projects/projectDetailDialog';

const meta = {
  title: 'Projects/ProjectDetailDialog',
  component: ProjectDetailDialog,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: {
    onSave: fn(),
    onCancel: fn(),
  },
} satisfies Meta<typeof ProjectDetailDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Closed: Story = {
  args: {
    open: false,
    name: "",
    description: ""
  },
};

export const Open: Story = {
  args: {
    open: true,
    name: "",
    description: ""
  },
};

export const OpenExisting: Story = {
  args: {
    open: true,
    name: "My Project",
    description: "This is description"
  },
};
