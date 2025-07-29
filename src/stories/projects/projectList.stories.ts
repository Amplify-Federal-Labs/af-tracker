import type { Meta, StoryObj } from '@storybook/react-vite';
import { v4 } from "uuid";
import { fn } from 'storybook/test';
import ProjectList from '../../pages/projects/projectList';
import type { Project } from '../../models/project';

const meta = {
  title: 'Projects/ProjectList',
  component: ProjectList,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: {
    onSelect: fn(),
    onAdd: fn(),
  },
} satisfies Meta<typeof ProjectList>;

const projects: Project[] = [
  {
    id: v4(),
    name: "Project 1",
    description: "First Project",
    createdAt: new Date(),
  },
  {
    id: v4(),
    name: "Project 2",
    description: "Second Project",
    createdAt: new Date(),
  }
];
export default meta;
type Story = StoryObj<typeof meta>;

export const EmptyList: Story = {
  args: {
    projects: []
  },
};

export const SomeProjects: Story = {
  args: {
    projects: projects
  },
};
