import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import Tasks from "../../pages/project/components/tasks";
import type { Task } from "../../models/userStory";

// Helper function to create Task objects from strings
const createTasksFromStrings = (taskStrings: string[]): Task[] => {
  return taskStrings.map((description, index) => ({
    description,
    isCompleted: index % 3 === 1, // Make every 3rd task completed for variety
    completedDate: index % 3 === 1 ? new Date() : undefined,
  }));
};

// Wrapper component to demonstrate controlled behavior
const TasksWrapper = ({
  initialTasks = [],
  onAdd,
  onUpdate,
  onComplete,
  onDelete,
}: {
  initialTasks?: string[];
  onAdd: (task: Task) => void;
  onUpdate: (index: number, task: Task) => void;
  onComplete: (index: number) => void;
  onDelete: (index: number) => void;
}) => {
  const [tasks, setTasks] = useState<Task[]>(createTasksFromStrings(initialTasks));

  const handleAdd = (task: Task) => {
    const newTasks = [...tasks, task];
    setTasks(newTasks);
    onAdd(task);
  };

  const handleUpdate = (index: number, updatedTask: Task) => {
    const newTasks = [...tasks];
    newTasks[index] = updatedTask;
    setTasks(newTasks);
    onUpdate(index, updatedTask);
  };

  const handleComplete = (index: number) => {
    const newTasks = [...tasks];
    newTasks[index] = {
      ...newTasks[index],
      isCompleted: true,
      completedDate: new Date(),
    };
    setTasks(newTasks);
    onComplete(index);
  };

  const handleDelete = (index: number) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    onDelete(index);
  };

  return (
    <Box sx={{ maxWidth: 600, p: 2 }}>
      <Paper elevation={1} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Task Management
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Click on any task to edit it, or click "Add task" to create new ones. 
          Check the checkbox to mark tasks as complete. Use the delete button to remove tasks.
        </Typography>
        <Tasks
          tasks={tasks}
          onAdd={handleAdd}
          onUpdate={handleUpdate}
          onComplete={handleComplete}
          onDelete={handleDelete}
        />
        <Typography variant="caption" display="block" sx={{ mt: 2, color: "text.secondary" }}>
          Total tasks: {tasks.length} | Completed: {tasks.filter(t => t.isCompleted).length}
        </Typography>
      </Paper>
    </Box>
  );
};

const meta = {
  title: "Project/Components/Tasks",
  component: TasksWrapper,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A task management component that allows users to add, edit, complete, and delete tasks. Each task can be clicked to enter edit mode, checked to mark as complete, and new tasks can be added using the 'Add task' button.",
      },
    },
  },
  args: {
    onAdd: fn(),
    onUpdate: fn(),
    onComplete: fn(),
    onDelete: fn(),
  },
  argTypes: {
    initialTasks: {
      description: "Initial list of task descriptions to display",
      control: "object",
    },
    onAdd: {
      description: "Callback function called when a new task is added",
      action: "task-added",
    },
    onUpdate: {
      description: "Callback function called when a task is updated",
      action: "task-updated",
    },
    onComplete: {
      description: "Callback function called when a task is marked as complete",
      action: "task-completed",
    },
    onDelete: {
      description: "Callback function called when a task is deleted",
      action: "task-deleted",
    },
  },
} satisfies Meta<typeof TasksWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default empty state
export const Default: Story = {
  args: {
    initialTasks: [],
    onAdd: fn(),
    onUpdate: fn(),
    onComplete: fn(),
    onDelete: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Default empty task list. Click 'Add task' to create your first task.",
      },
    },
  },
};

// With some tasks already present
export const WithTasks: Story = {
  args: {
    initialTasks: [
      "Review pull request #123",
      "Update documentation",
      "Fix login bug",
    ],
    onAdd: fn(),
    onUpdate: fn(),
    onComplete: fn(),
    onDelete: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Task list with several existing tasks. Click on any task to edit it, or use the delete button to remove tasks.",
      },
    },
  },
};

// Single task
export const SingleTask: Story = {
  args: {
    initialTasks: ["Complete project setup"],
    onAdd: fn(),
    onUpdate: fn(),
    onComplete: fn(),
    onDelete: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Task list with a single task. Demonstrates the basic task display and interaction.",
      },
    },
  },
};

// Many tasks to show scrolling behavior
export const ManyTasks: Story = {
  args: {
    initialTasks: [
      "Set up development environment",
      "Create database schema",
      "Implement user authentication",
      "Design user interface mockups",
      "Write unit tests for API endpoints",
      "Configure CI/CD pipeline",
      "Create documentation",
      "Review security requirements",
      "Implement data validation",
      "Set up monitoring and logging",
      "Conduct code review",
      "Deploy to staging environment",
      "Perform user acceptance testing",
      "Fix reported bugs",
      "Optimize database queries",
    ],
    onAdd: fn(),
    onUpdate: fn(),
    onComplete: fn(),
    onDelete: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Task list with many tasks to demonstrate how the component handles larger datasets and scrolling behavior.",
      },
    },
  },
};

// Tasks with various lengths
export const VariedTaskLengths: Story = {
  args: {
    initialTasks: [
      "Short task",
      "This is a medium-length task that describes something more detailed",
      "This is a very long task description that might span multiple lines and contains a lot of detailed information about what needs to be accomplished, including specific requirements, acceptance criteria, and implementation notes",
      "Fix bug",
      "Implement comprehensive error handling and logging system for the entire application",
    ],
    onAdd: fn(),
    onUpdate: fn(),
    onComplete: fn(),
    onDelete: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Task list with varying task description lengths to show how the component handles different content sizes.",
      },
    },
  },
};

// Development/testing tasks
export const DevelopmentTasks: Story = {
  args: {
    initialTasks: [
      "Write failing test for new feature",
      "Implement minimal code to make test pass",
      "Refactor code for better structure",
      "Add integration tests",
      "Update API documentation",
      "Run security audit",
    ],
    onAdd: fn(),
    onUpdate: fn(),
    onComplete: fn(),
    onDelete: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Task list with typical software development tasks, following TDD practices.",
      },
    },
  },
};

// Tasks with special characters
export const TasksWithSpecialContent: Story = {
  args: {
    initialTasks: [
      "Update README.md file",
      "Fix API endpoint /api/v1/users/{id}",
      "Implement OAuth 2.0 authentication",
      "Add support for UTF-8 characters: café, naïve, Zürich",
      "Configure nginx.conf settings",
      "Update package.json dependencies",
    ],
    onAdd: fn(),
    onUpdate: fn(),
    onComplete: fn(),
    onDelete: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Task list with special characters, file names, and technical terms to test content handling.",
      },
    },
  },
};

// Interactive story for testing
export const Interactive: Story = {
  args: {
    initialTasks: ["Click me to edit", "Check the box to complete me", "Delete me with the trash icon"],
    onAdd: (task: Task) => {
      console.log("Task added:", task);
    },
    onUpdate: (index: number, task: Task) => {
      console.log("Task updated:", { index, task });
    },
    onComplete: (index: number) => {
      console.log("Task completed:", index);
    },
    onDelete: (index: number) => {
      console.log("Task deleted:", index);
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive version for testing all task operations. All interactions are logged to the browser console. Try adding, editing, completing, and deleting tasks.",
      },
    },
  },
};

// Edge case: Empty task strings
export const EdgeCaseEmptyTasks: Story = {
  args: {
    initialTasks: ["Valid task", "", "Another valid task"],
    onAdd: fn(),
    onUpdate: fn(),
    onComplete: fn(),
    onDelete: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Edge case demonstrating how the component handles empty task strings in the list.",
      },
    },
  },
};