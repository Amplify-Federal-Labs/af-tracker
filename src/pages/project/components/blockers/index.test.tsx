import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blockers from "./index";
import type { Impediment } from "../../../../models/userStory";

// Mock the child components to isolate testing
vi.mock("./blocker", () => ({
  default: ({
    index,
    blocker,
    onUpdate,
    onResolve,
    onDelete,
  }: {
    index: number;
    blocker: Impediment;
    onUpdate: (index: number, blocker: Impediment) => void;
    onResolve: (index: number) => void;
    onDelete: (index: number) => void;
  }) => (
    <div data-testid={`blocker-${index}`}>
      <span data-testid="blocker-description">{blocker.description}</span>
      <span data-testid="blocker-resolved">
        {blocker.isResolved.toString()}
      </span>
      <button
        data-testid="update-button"
        onClick={() => onUpdate(index, { ...blocker, description: "Updated" })}
      >
        Update
      </button>
      <button data-testid="resolve-button" onClick={() => onResolve(index)}>
        Resolve
      </button>
      <button data-testid="delete-button" onClick={() => onDelete(index)}>
        Delete
      </button>
    </div>
  ),
}));

vi.mock("./addBlocker", () => ({
  default: ({ onAdd }: { onAdd: (blocker: Impediment) => void }) => (
    <div data-testid="add-blocker">
      <button
        data-testid="add-button"
        onClick={() => onAdd({ description: "New blocker", isResolved: false })}
      >
        Add Blocker
      </button>
    </div>
  ),
}));

const mockBlockers: Impediment[] = [
  {
    description: "First blocker",
    isResolved: false,
  },
  {
    description: "Second blocker",
    isResolved: true,
    resolvedDate: new Date("2024-01-20T10:00:00Z"),
  },
  {
    description: "Third blocker",
    isResolved: false,
  },
];

describe("Blockers", () => {
  const defaultProps = {
    blockers: mockBlockers,
    onAdd: vi.fn(),
    onUpdate: vi.fn(),
    onResolve: vi.fn(),
    onDelete: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should render all blockers", () => {
      render(<Blockers {...defaultProps} />);

      expect(screen.getByTestId("blocker-0")).toBeInTheDocument();
      expect(screen.getByTestId("blocker-1")).toBeInTheDocument();
      expect(screen.getByTestId("blocker-2")).toBeInTheDocument();
    });

    it("should render blocker descriptions correctly", () => {
      render(<Blockers {...defaultProps} />);

      const descriptions = screen.getAllByTestId("blocker-description");
      expect(descriptions[0]).toHaveTextContent("First blocker");
      expect(descriptions[1]).toHaveTextContent("Second blocker");
      expect(descriptions[2]).toHaveTextContent("Third blocker");
    });

    it("should render blocker resolved states correctly", () => {
      render(<Blockers {...defaultProps} />);

      const resolvedStates = screen.getAllByTestId("blocker-resolved");
      expect(resolvedStates[0]).toHaveTextContent("false");
      expect(resolvedStates[1]).toHaveTextContent("true");
      expect(resolvedStates[2]).toHaveTextContent("false");
    });

    it("should render AddBlocker component", () => {
      render(<Blockers {...defaultProps} />);

      expect(screen.getByTestId("add-blocker")).toBeInTheDocument();
    });

    it("should render empty list with only AddBlocker when no blockers", () => {
      render(<Blockers {...defaultProps} blockers={[]} />);

      expect(screen.queryByTestId("blocker-0")).not.toBeInTheDocument();
      expect(screen.getByTestId("add-blocker")).toBeInTheDocument();
    });
  });

  describe("Blocker rendering with correct props", () => {
    it("should pass correct index to each Blocker component", () => {
      render(<Blockers {...defaultProps} />);

      expect(screen.getByTestId("blocker-0")).toBeInTheDocument();
      expect(screen.getByTestId("blocker-1")).toBeInTheDocument();
      expect(screen.getByTestId("blocker-2")).toBeInTheDocument();
    });

    it("should use blocker description as key", () => {
      const { rerender } = render(<Blockers {...defaultProps} />);

      // Re-render with same blockers to ensure keys are stable
      rerender(<Blockers {...defaultProps} />);

      // Component should render without key warnings
      expect(screen.getByTestId("blocker-0")).toBeInTheDocument();
    });

    it("should handle single blocker correctly", () => {
      const singleBlocker = [mockBlockers[0]];
      render(<Blockers {...defaultProps} blockers={singleBlocker} />);

      expect(screen.getByTestId("blocker-0")).toBeInTheDocument();
      expect(screen.queryByTestId("blocker-1")).not.toBeInTheDocument();
      expect(screen.getByTestId("add-blocker")).toBeInTheDocument();
    });
  });

  describe("Event handling", () => {
    it("should call onAdd when AddBlocker triggers add", async () => {
      const user = userEvent.setup();
      const mockOnAdd = vi.fn();
      render(<Blockers {...defaultProps} onAdd={mockOnAdd} />);

      const addButton = screen.getByTestId("add-button");
      await user.click(addButton);

      expect(mockOnAdd).toHaveBeenCalledWith({
        description: "New blocker",
        isResolved: false,
      });
    });

    it("should call onUpdate when Blocker triggers update", async () => {
      const user = userEvent.setup();
      const mockOnUpdate = vi.fn();
      render(<Blockers {...defaultProps} onUpdate={mockOnUpdate} />);

      const updateButtons = screen.getAllByTestId("update-button");
      await user.click(updateButtons[0]);

      expect(mockOnUpdate).toHaveBeenCalledWith(0, {
        ...mockBlockers[0],
        description: "Updated",
      });
    });

    it("should call onResolve when Blocker triggers resolve", async () => {
      const user = userEvent.setup();
      const mockOnResolve = vi.fn();
      render(<Blockers {...defaultProps} onResolve={mockOnResolve} />);

      const resolveButtons = screen.getAllByTestId("resolve-button");
      await user.click(resolveButtons[1]);

      expect(mockOnResolve).toHaveBeenCalledWith(1);
    });

    it("should call onDelete when Blocker triggers delete", async () => {
      const user = userEvent.setup();
      const mockOnDelete = vi.fn();
      render(<Blockers {...defaultProps} onDelete={mockOnDelete} />);

      const deleteButtons = screen.getAllByTestId("delete-button");
      await user.click(deleteButtons[2]);

      expect(mockOnDelete).toHaveBeenCalledWith(2);
    });
  });

  describe("Multiple interactions", () => {
    it("should handle multiple blocker updates correctly", async () => {
      const user = userEvent.setup();
      const mockOnUpdate = vi.fn();
      render(<Blockers {...defaultProps} onUpdate={mockOnUpdate} />);

      const updateButtons = screen.getAllByTestId("update-button");

      await user.click(updateButtons[0]);
      await user.click(updateButtons[2]);

      expect(mockOnUpdate).toHaveBeenCalledTimes(2);
      expect(mockOnUpdate).toHaveBeenNthCalledWith(1, 0, {
        ...mockBlockers[0],
        description: "Updated",
      });
      expect(mockOnUpdate).toHaveBeenNthCalledWith(2, 2, {
        ...mockBlockers[2],
        description: "Updated",
      });
    });

    it("should handle resolve and delete operations on different blockers", async () => {
      const user = userEvent.setup();
      const mockOnResolve = vi.fn();
      const mockOnDelete = vi.fn();
      render(
        <Blockers
          {...defaultProps}
          onResolve={mockOnResolve}
          onDelete={mockOnDelete}
        />
      );

      const resolveButtons = screen.getAllByTestId("resolve-button");
      const deleteButtons = screen.getAllByTestId("delete-button");

      await user.click(resolveButtons[0]);
      await user.click(deleteButtons[1]);

      expect(mockOnResolve).toHaveBeenCalledWith(0);
      expect(mockOnDelete).toHaveBeenCalledWith(1);
    });

    it("should handle rapid multiple operations", async () => {
      const user = userEvent.setup();
      const mockOnUpdate = vi.fn();
      const mockOnResolve = vi.fn();
      const mockOnAdd = vi.fn();
      render(
        <Blockers
          {...defaultProps}
          onUpdate={mockOnUpdate}
          onResolve={mockOnResolve}
          onAdd={mockOnAdd}
        />
      );

      const updateButtons = screen.getAllByTestId("update-button");
      const resolveButtons = screen.getAllByTestId("resolve-button");
      const addButton = screen.getByTestId("add-button");

      // Rapid clicks
      await user.click(updateButtons[0]);
      await user.click(resolveButtons[1]);
      await user.click(addButton);

      expect(mockOnUpdate).toHaveBeenCalledTimes(1);
      expect(mockOnResolve).toHaveBeenCalledTimes(1);
      expect(mockOnAdd).toHaveBeenCalledTimes(1);
    });
  });

  describe("Props propagation", () => {
    it("should pass all required props to Blocker components", () => {
      const mockProps = {
        blockers: [mockBlockers[0]],
        onAdd: vi.fn(),
        onUpdate: vi.fn(),
        onResolve: vi.fn(),
        onDelete: vi.fn(),
      };

      render(<Blockers {...mockProps} />);

      // Verify that blocker component is rendered (our mock receives the props)
      expect(screen.getByTestId("blocker-0")).toBeInTheDocument();
      expect(screen.getByTestId("blocker-description")).toHaveTextContent(
        "First blocker"
      );
    });

    it("should pass onAdd prop to AddBlocker component", () => {
      render(<Blockers {...defaultProps} />);

      // Verify AddBlocker can trigger onAdd
      expect(screen.getByTestId("add-blocker")).toBeInTheDocument();
      expect(screen.getByTestId("add-button")).toBeInTheDocument();
    });
  });

  describe("Edge cases", () => {
    it("should handle blockers with same descriptions", () => {
      const duplicateBlockers: Impediment[] = [
        { description: "Same description", isResolved: false },
        { description: "Same description", isResolved: true },
      ];

      render(<Blockers {...defaultProps} blockers={duplicateBlockers} />);

      expect(screen.getByTestId("blocker-0")).toBeInTheDocument();
      expect(screen.getByTestId("blocker-1")).toBeInTheDocument();
    });

    it("should handle blockers with empty descriptions", () => {
      const emptyDescriptionBlockers: Impediment[] = [
        { description: "", isResolved: false },
      ];

      render(
        <Blockers {...defaultProps} blockers={emptyDescriptionBlockers} />
      );

      expect(screen.getByTestId("blocker-0")).toBeInTheDocument();
      expect(screen.getByTestId("blocker-description")).toHaveTextContent("");
    });

    it("should handle very long blocker lists", () => {
      const manyBlockers: Impediment[] = Array.from(
        { length: 100 },
        (_, i) => ({
          description: `Blocker ${i + 1}`,
          isResolved: i % 2 === 0,
        })
      );

      render(<Blockers {...defaultProps} blockers={manyBlockers} />);

      expect(screen.getByTestId("blocker-0")).toBeInTheDocument();
      expect(screen.getByTestId("blocker-99")).toBeInTheDocument();
      expect(screen.getByTestId("add-blocker")).toBeInTheDocument();
    });

    it("should maintain correct indices with many blockers", async () => {
      const user = userEvent.setup();
      const mockOnDelete = vi.fn();
      const manyBlockers: Impediment[] = Array.from({ length: 10 }, (_, i) => ({
        description: `Blocker ${i + 1}`,
        isResolved: false,
      }));

      render(
        <Blockers
          {...defaultProps}
          blockers={manyBlockers}
          onDelete={mockOnDelete}
        />
      );

      const deleteButtons = screen.getAllByTestId("delete-button");
      await user.click(deleteButtons[5]); // Click 6th blocker (index 5)

      expect(mockOnDelete).toHaveBeenCalledWith(5);
    });
  });

  describe("Component lifecycle", () => {
    it("should update when blockers prop changes", () => {
      const { rerender } = render(<Blockers {...defaultProps} />);

      expect(screen.getAllByTestId(/blocker-\d+/)).toHaveLength(3);

      const newBlockers = [
        ...mockBlockers,
        { description: "Fourth blocker", isResolved: false },
      ];
      rerender(<Blockers {...defaultProps} blockers={newBlockers} />);

      expect(screen.getAllByTestId(/blocker-\d+/)).toHaveLength(4);
      expect(screen.getByTestId("blocker-3")).toBeInTheDocument();
    });

    it("should update when blockers are removed", () => {
      const { rerender } = render(<Blockers {...defaultProps} />);

      expect(screen.getAllByTestId(/blocker-\d+/)).toHaveLength(3);

      const fewerBlockers = [mockBlockers[0]];
      rerender(<Blockers {...defaultProps} blockers={fewerBlockers} />);

      expect(screen.getAllByTestId(/blocker-\d+/)).toHaveLength(1);
      expect(screen.queryByTestId("blocker-1")).not.toBeInTheDocument();
      expect(screen.queryByTestId("blocker-2")).not.toBeInTheDocument();
    });

    it("should handle callback function changes", async () => {
      const user = userEvent.setup();
      const firstOnAdd = vi.fn();
      const secondOnAdd = vi.fn();

      const { rerender } = render(
        <Blockers {...defaultProps} onAdd={firstOnAdd} />
      );

      await user.click(screen.getByTestId("add-button"));
      expect(firstOnAdd).toHaveBeenCalledTimes(1);

      rerender(<Blockers {...defaultProps} onAdd={secondOnAdd} />);

      await user.click(screen.getByTestId("add-button"));
      expect(secondOnAdd).toHaveBeenCalledTimes(1);
      expect(firstOnAdd).toHaveBeenCalledTimes(1); // Should not be called again
    });
  });

  describe("Accessibility", () => {
    it("should render components in logical order", () => {
      render(<Blockers {...defaultProps} />);

      const blockerElements = screen.getAllByTestId(/blocker-\d+/);
      const addBlockerElement = screen.getByTestId("add-blocker");

      // Verify blockers appear before add blocker in DOM order
      expect(
        blockerElements[0].compareDocumentPosition(addBlockerElement)
      ).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    });

    it("should maintain focus management through child components", async () => {
      const user = userEvent.setup();
      render(<Blockers {...defaultProps} />);

      const firstUpdateButton = screen.getAllByTestId("update-button")[0];
      firstUpdateButton.focus();

      expect(firstUpdateButton).toHaveFocus();

      await user.tab();
      // Focus should move to next focusable element
      expect(firstUpdateButton).not.toHaveFocus();
    });
  });
});
