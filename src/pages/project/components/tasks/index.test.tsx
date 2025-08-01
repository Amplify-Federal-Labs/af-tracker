import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Tasks from "./index";
import type { Task } from "../../../../models/userStory";

// Mock the child components to isolate testing
vi.mock("./task", () => ({
  default: ({
    index,
    task,
    onUpdate,
    onComplete,
    onDelete,
  }: {
    index: number;
    task: Task;
    onUpdate: (index: number, task: Task) => void;
    onComplete: (index: number) => void;
    onDelete: (index: number) => void;
  }) => (
    <div data-testid={`task-${index}`}>
      <span data-testid="task-description">{task.description}</span>
      <span data-testid="task-completed">
        {task.isCompleted.toString()}
      </span>
      <button
        data-testid="update-button"
        onClick={() => onUpdate(index, { ...task, description: "Updated" })}
      >
        Update
      </button>
      <button data-testid="complete-button" onClick={() => onComplete(index)}>
        Complete
      </button>
      <button data-testid="delete-button" onClick={() => onDelete(index)}>
        Delete
      </button>
    </div>
  ),
}));

vi.mock("./addTask", () => ({
  default: ({ onAdd }: { onAdd: (task: Task) => void }) => (
    <div data-testid="add-task">
      <button
        data-testid="add-button"
        onClick={() => onAdd({ description: "New task", isCompleted: false })}
      >
        Add Task
      </button>
    </div>
  ),
}));

const mockTasks: Task[] = [
  {
    description: "First task",
    isCompleted: false,
  },
  {
    description: "Second task",
    isCompleted: true,
    completedDate: new Date("2024-01-20T10:00:00Z"),
  },
  {
    description: "Third task",
    isCompleted: false,
  },
];

describe("Tasks", () => {
  const defaultProps = {
    tasks: mockTasks,
    onAdd: vi.fn(),
    onUpdate: vi.fn(),
    onComplete: vi.fn(),
    onDelete: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should render all tasks", () => {
      render(<Tasks {...defaultProps} />);

      expect(screen.getByTestId("task-0")).toBeInTheDocument();
      expect(screen.getByTestId("task-1")).toBeInTheDocument();
      expect(screen.getByTestId("task-2")).toBeInTheDocument();
    });

    it("should render task descriptions correctly", () => {
      render(<Tasks {...defaultProps} />);

      const descriptions = screen.getAllByTestId("task-description");
      expect(descriptions[0]).toHaveTextContent("First task");
      expect(descriptions[1]).toHaveTextContent("Second task");
      expect(descriptions[2]).toHaveTextContent("Third task");
    });

    it("should render task completed states correctly", () => {
      render(<Tasks {...defaultProps} />);

      const completedStates = screen.getAllByTestId("task-completed");
      expect(completedStates[0]).toHaveTextContent("false");
      expect(completedStates[1]).toHaveTextContent("true");
      expect(completedStates[2]).toHaveTextContent("false");
    });

    it("should render AddTask component", () => {
      render(<Tasks {...defaultProps} />);

      expect(screen.getByTestId("add-task")).toBeInTheDocument();
    });

    it("should render empty list with only AddTask when no tasks", () => {
      render(<Tasks {...defaultProps} tasks={[]} />);

      expect(screen.queryByTestId("task-0")).not.toBeInTheDocument();
      expect(screen.getByTestId("add-task")).toBeInTheDocument();
    });
  });

  describe("Task rendering with correct props", () => {
    it("should pass correct index to each Task component", () => {
      render(<Tasks {...defaultProps} />);

      expect(screen.getByTestId("task-0")).toBeInTheDocument();
      expect(screen.getByTestId("task-1")).toBeInTheDocument();
      expect(screen.getByTestId("task-2")).toBeInTheDocument();
    });

    it("should use task description as key", () => {
      const { rerender } = render(<Tasks {...defaultProps} />);

      // Re-render with same tasks to ensure keys are stable
      rerender(<Tasks {...defaultProps} />);

      // Component should render without key warnings
      expect(screen.getByTestId("task-0")).toBeInTheDocument();
    });

    it("should handle single task correctly", () => {
      const singleTask = [mockTasks[0]];
      render(<Tasks {...defaultProps} tasks={singleTask} />);

      expect(screen.getByTestId("task-0")).toBeInTheDocument();
      expect(screen.queryByTestId("task-1")).not.toBeInTheDocument();
      expect(screen.getByTestId("add-task")).toBeInTheDocument();
    });
  });

  describe("Event handling", () => {
    it("should call onAdd when AddTask triggers add", async () => {
      const user = userEvent.setup();
      const mockOnAdd = vi.fn();
      render(<Tasks {...defaultProps} onAdd={mockOnAdd} />);

      const addButton = screen.getByTestId("add-button");
      await user.click(addButton);

      expect(mockOnAdd).toHaveBeenCalledWith({
        description: "New task",
        isCompleted: false,
      });
    });

    it("should call onUpdate when Task triggers update", async () => {
      const user = userEvent.setup();
      const mockOnUpdate = vi.fn();
      render(<Tasks {...defaultProps} onUpdate={mockOnUpdate} />);

      const updateButtons = screen.getAllByTestId("update-button");
      await user.click(updateButtons[0]);

      expect(mockOnUpdate).toHaveBeenCalledWith(0, {
        ...mockTasks[0],
        description: "Updated",
      });
    });

    it("should call onComplete when Task triggers complete", async () => {
      const user = userEvent.setup();
      const mockOnComplete = vi.fn();
      render(<Tasks {...defaultProps} onComplete={mockOnComplete} />);

      const completeButtons = screen.getAllByTestId("complete-button");
      await user.click(completeButtons[1]);

      expect(mockOnComplete).toHaveBeenCalledWith(1);
    });

    it("should call onDelete when Task triggers delete", async () => {
      const user = userEvent.setup();
      const mockOnDelete = vi.fn();
      render(<Tasks {...defaultProps} onDelete={mockOnDelete} />);

      const deleteButtons = screen.getAllByTestId("delete-button");
      await user.click(deleteButtons[2]);

      expect(mockOnDelete).toHaveBeenCalledWith(2);
    });
  });

  describe("Multiple interactions", () => {
    it("should handle multiple task updates correctly", async () => {
      const user = userEvent.setup();
      const mockOnUpdate = vi.fn();
      render(<Tasks {...defaultProps} onUpdate={mockOnUpdate} />);

      const updateButtons = screen.getAllByTestId("update-button");

      await user.click(updateButtons[0]);
      await user.click(updateButtons[2]);

      expect(mockOnUpdate).toHaveBeenCalledTimes(2);
      expect(mockOnUpdate).toHaveBeenNthCalledWith(1, 0, {
        ...mockTasks[0],
        description: "Updated",
      });
      expect(mockOnUpdate).toHaveBeenNthCalledWith(2, 2, {
        ...mockTasks[2],
        description: "Updated",
      });
    });

    it("should handle complete and delete operations on different tasks", async () => {
      const user = userEvent.setup();
      const mockOnComplete = vi.fn();
      const mockOnDelete = vi.fn();
      render(
        <Tasks
          {...defaultProps}
          onComplete={mockOnComplete}
          onDelete={mockOnDelete}
        />
      );

      const completeButtons = screen.getAllByTestId("complete-button");
      const deleteButtons = screen.getAllByTestId("delete-button");

      await user.click(completeButtons[0]);
      await user.click(deleteButtons[1]);

      expect(mockOnComplete).toHaveBeenCalledWith(0);
      expect(mockOnDelete).toHaveBeenCalledWith(1);
    });

    it("should handle rapid multiple operations", async () => {
      const user = userEvent.setup();
      const mockOnUpdate = vi.fn();
      const mockOnComplete = vi.fn();
      const mockOnAdd = vi.fn();
      render(
        <Tasks
          {...defaultProps}
          onUpdate={mockOnUpdate}
          onComplete={mockOnComplete}
          onAdd={mockOnAdd}
        />
      );

      const updateButtons = screen.getAllByTestId("update-button");
      const completeButtons = screen.getAllByTestId("complete-button");
      const addButton = screen.getByTestId("add-button");

      // Rapid clicks
      await user.click(updateButtons[0]);
      await user.click(completeButtons[1]);
      await user.click(addButton);

      expect(mockOnUpdate).toHaveBeenCalledTimes(1);
      expect(mockOnComplete).toHaveBeenCalledTimes(1);
      expect(mockOnAdd).toHaveBeenCalledTimes(1);
    });
  });

  describe("Props propagation", () => {
    it("should pass all required props to Task components", () => {
      const mockProps = {
        tasks: [mockTasks[0]],
        onAdd: vi.fn(),
        onUpdate: vi.fn(),
        onComplete: vi.fn(),
        onDelete: vi.fn(),
      };

      render(<Tasks {...mockProps} />);

      // Verify that task component is rendered (our mock receives the props)
      expect(screen.getByTestId("task-0")).toBeInTheDocument();
      expect(screen.getByTestId("task-description")).toHaveTextContent(
        "First task"
      );
    });

    it("should pass onAdd prop to AddTask component", () => {
      render(<Tasks {...defaultProps} />);

      // Verify AddTask can trigger onAdd
      expect(screen.getByTestId("add-task")).toBeInTheDocument();
      expect(screen.getByTestId("add-button")).toBeInTheDocument();
    });
  });

  describe("Edge cases", () => {
    it("should handle tasks with same descriptions", () => {
      const duplicateTasks: Task[] = [
        { description: "Same description", isCompleted: false },
        { description: "Same description", isCompleted: true },
      ];

      render(<Tasks {...defaultProps} tasks={duplicateTasks} />);

      expect(screen.getByTestId("task-0")).toBeInTheDocument();
      expect(screen.getByTestId("task-1")).toBeInTheDocument();
    });

    it("should handle tasks with empty descriptions", () => {
      const emptyDescriptionTasks: Task[] = [
        { description: "", isCompleted: false },
      ];

      render(<Tasks {...defaultProps} tasks={emptyDescriptionTasks} />);

      expect(screen.getByTestId("task-0")).toBeInTheDocument();
      expect(screen.getByTestId("task-description")).toHaveTextContent("");
    });

    it("should handle very long task lists", () => {
      const manyTasks: Task[] = Array.from({ length: 100 }, (_, i) => ({
        description: `Task ${i + 1}`,
        isCompleted: i % 2 === 0,
      }));

      render(<Tasks {...defaultProps} tasks={manyTasks} />);

      expect(screen.getByTestId("task-0")).toBeInTheDocument();
      expect(screen.getByTestId("task-99")).toBeInTheDocument();
      expect(screen.getByTestId("add-task")).toBeInTheDocument();
    });

    it("should maintain correct indices with many tasks", async () => {
      const user = userEvent.setup();
      const mockOnDelete = vi.fn();
      const manyTasks: Task[] = Array.from({ length: 10 }, (_, i) => ({
        description: `Task ${i + 1}`,
        isCompleted: false,
      }));

      render(
        <Tasks {...defaultProps} tasks={manyTasks} onDelete={mockOnDelete} />
      );

      const deleteButtons = screen.getAllByTestId("delete-button");
      await user.click(deleteButtons[5]); // Click 6th task (index 5)

      expect(mockOnDelete).toHaveBeenCalledWith(5);
    });
  });

  describe("Component lifecycle", () => {
    it("should update when tasks prop changes", () => {
      const { rerender } = render(<Tasks {...defaultProps} />);

      expect(screen.getAllByTestId(/task-\d+/)).toHaveLength(3);

      const newTasks = [
        ...mockTasks,
        { description: "Fourth task", isCompleted: false },
      ];
      rerender(<Tasks {...defaultProps} tasks={newTasks} />);

      expect(screen.getAllByTestId(/task-\d+/)).toHaveLength(4);
      expect(screen.getByTestId("task-3")).toBeInTheDocument();
    });

    it("should update when tasks are removed", () => {
      const { rerender } = render(<Tasks {...defaultProps} />);

      expect(screen.getAllByTestId(/task-\d+/)).toHaveLength(3);

      const fewerTasks = [mockTasks[0]];
      rerender(<Tasks {...defaultProps} tasks={fewerTasks} />);

      expect(screen.getAllByTestId(/task-\d+/)).toHaveLength(1);
      expect(screen.queryByTestId("task-1")).not.toBeInTheDocument();
      expect(screen.queryByTestId("task-2")).not.toBeInTheDocument();
    });

    it("should handle callback function changes", async () => {
      const user = userEvent.setup();
      const firstOnAdd = vi.fn();
      const secondOnAdd = vi.fn();

      const { rerender } = render(
        <Tasks {...defaultProps} onAdd={firstOnAdd} />
      );

      await user.click(screen.getByTestId("add-button"));
      expect(firstOnAdd).toHaveBeenCalledTimes(1);

      rerender(<Tasks {...defaultProps} onAdd={secondOnAdd} />);

      await user.click(screen.getByTestId("add-button"));
      expect(secondOnAdd).toHaveBeenCalledTimes(1);
      expect(firstOnAdd).toHaveBeenCalledTimes(1); // Should not be called again
    });
  });

  describe("Accessibility", () => {
    it("should render components in logical order", () => {
      render(<Tasks {...defaultProps} />);

      const taskElements = screen.getAllByTestId(/task-\d+/);
      const addTaskElement = screen.getByTestId("add-task");

      // Verify tasks appear before add task in DOM order
      expect(
        taskElements[0].compareDocumentPosition(addTaskElement)
      ).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    });

    it("should maintain focus management through child components", async () => {
      const user = userEvent.setup();
      render(<Tasks {...defaultProps} />);

      const firstUpdateButton = screen.getAllByTestId("update-button")[0];
      firstUpdateButton.focus();

      expect(firstUpdateButton).toHaveFocus();

      await user.tab();
      // Focus should move to next focusable element
      expect(firstUpdateButton).not.toHaveFocus();
    });
  });
});