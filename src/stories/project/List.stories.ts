import type { Meta, StoryObj } from "@storybook/react-vite";
import List from "../../features/project/List";
import type { Project } from "../../models/project";

const meta = {
  title: 'Projects/List',
  component: List,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: {
    projects: []
  },
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

const projects: Project[] = [
  {
    id: "1",
    name: "Project 1",
    description: "Project 1",
    createdAt: new Date(),
  },
  {
    id: "2",
    name: "Project 2",
    description: "Project 2",
    createdAt: new Date(),
  }

];

export const Default: Story = {
  args: {
    projects: projects
  }
};