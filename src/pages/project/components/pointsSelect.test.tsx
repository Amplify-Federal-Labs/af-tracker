import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PointsSelect from "./pointsSelect";

describe("PointSelect", () => {
  const defaultProps = {
    point: null,
    onChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should render with default label", () => {
      render(<PointsSelect {...defaultProps} />);

      expect(screen.getByLabelText("Story Points")).toBeInTheDocument();
    });

    it("should render with custom label", () => {
      render(<PointsSelect {...defaultProps} label="Effort Points" />);

      expect(screen.getByLabelText("Effort Points")).toBeInTheDocument();
    });

    it("should render with required indicator when required is true", () => {
      render(<PointsSelect {...defaultProps} required />);

      // Check for required attribute and asterisk in DOM
      const label = screen.getByLabelText("Story Points *");
      expect(label).toBeInTheDocument();
    });

    it("should render helper text when provided", () => {
      const helperText = "Select story point estimation";
      render(<PointsSelect {...defaultProps} helperText={helperText} />);

      expect(screen.getByText(helperText)).toBeInTheDocument();
    });

    it("should be disabled when disabled prop is true", () => {
      render(<PointsSelect {...defaultProps} disabled />);

      const select = screen.getByRole("combobox");
      expect(select).toHaveAttribute("aria-disabled", "true");
    });

    it("should show error state when error prop is true", () => {
      render(
        <PointsSelect {...defaultProps} error helperText="Error message" />
      );

      const helperText = screen.getByText("Error message");
      expect(helperText).toHaveClass("Mui-error");
    });
  });

  describe("Point Options", () => {
    it("should display all point options when opened", async () => {
      const user = userEvent.setup();
      render(<PointsSelect {...defaultProps} />);

      const select = screen.getByLabelText("Story Points");
      await user.click(select);

      expect(screen.getByText("Unspecified")).toBeInTheDocument();
      expect(screen.getByText("0 point")).toBeInTheDocument();
      expect(screen.getByText("1 point")).toBeInTheDocument();
      expect(screen.getByText("2 points")).toBeInTheDocument();
      expect(screen.getByText("3 points")).toBeInTheDocument();
    });

    it('should show "Unspecified" when point is undefined', () => {
      render(<PointsSelect {...defaultProps} points={undefined} />);

      const select = screen.getByDisplayValue("");
      expect(select).toBeInTheDocument();
    });

    it("should show correct value when point is 0", () => {
      render(<PointsSelect {...defaultProps} points={0} />);

      const select = screen.getByDisplayValue("0");
      expect(select).toBeInTheDocument();
    });

    it("should show correct value when point is 1", () => {
      render(<PointsSelect {...defaultProps} points={1} />);

      const select = screen.getByDisplayValue("1");
      expect(select).toBeInTheDocument();
    });

    it("should show correct value when point is 2", () => {
      render(<PointsSelect {...defaultProps} points={2} />);

      const select = screen.getByDisplayValue("2");
      expect(select).toBeInTheDocument();
    });

    it("should show correct value when point is 3", () => {
      render(<PointsSelect {...defaultProps} points={3} />);

      const select = screen.getByDisplayValue("3");
      expect(select).toBeInTheDocument();
    });
  });

  describe("onChange Behavior", () => {
    it('should call onChange with null when "Unspecified" is selected', async () => {
      const user = userEvent.setup();
      const mockOnChange = vi.fn();
      render(
        <PointsSelect {...defaultProps} points={1} onChange={mockOnChange} />
      );

      const select = screen.getByLabelText("Story Points");
      await user.click(select);

      const unspecifiedOption = screen.getByText("Unspecified");
      await user.click(unspecifiedOption);

      expect(mockOnChange).toHaveBeenCalledWith(undefined);
    });

    it('should call onChange with 0 when "0 point" is selected', async () => {
      const user = userEvent.setup();
      const mockOnChange = vi.fn();
      render(<PointsSelect {...defaultProps} onChange={mockOnChange} />);

      const select = screen.getByLabelText("Story Points");
      await user.click(select);

      const zeroPointOption = screen.getByText("0 point");
      await user.click(zeroPointOption);

      expect(mockOnChange).toHaveBeenCalledWith(0);
    });

    it('should call onChange with 1 when "1 point" is selected', async () => {
      const user = userEvent.setup();
      const mockOnChange = vi.fn();
      render(<PointsSelect {...defaultProps} onChange={mockOnChange} />);

      const select = screen.getByLabelText("Story Points");
      await user.click(select);

      const onePointOption = screen.getByText("1 point");
      await user.click(onePointOption);

      expect(mockOnChange).toHaveBeenCalledWith(1);
    });

    it('should call onChange with 2 when "2 points" is selected', async () => {
      const user = userEvent.setup();
      const mockOnChange = vi.fn();
      render(<PointsSelect {...defaultProps} onChange={mockOnChange} />);

      const select = screen.getByLabelText("Story Points");
      await user.click(select);

      const twoPointsOption = screen.getByText("2 points");
      await user.click(twoPointsOption);

      expect(mockOnChange).toHaveBeenCalledWith(2);
    });

    it('should call onChange with 3 when "3 points" is selected', async () => {
      const user = userEvent.setup();
      const mockOnChange = vi.fn();
      render(<PointsSelect {...defaultProps} onChange={mockOnChange} />);

      const select = screen.getByLabelText("Story Points");
      await user.click(select);

      const threePointsOption = screen.getByText("3 points");
      await user.click(threePointsOption);

      expect(mockOnChange).toHaveBeenCalledWith(3);
    });

    it("should not call onChange when disabled", async () => {
      const user = userEvent.setup();
      const mockOnChange = vi.fn();
      render(
        <PointsSelect {...defaultProps} onChange={mockOnChange} disabled />
      );

      const select = screen.getByLabelText("Story Points");

      // Try to click disabled select
      await user.click(select);

      expect(mockOnChange).not.toHaveBeenCalled();
    });
  });

  describe("Value Changes", () => {
    it("should change from undefined to 1", async () => {
      const user = userEvent.setup();
      const mockOnChange = vi.fn();
      render(<PointsSelect points={undefined} onChange={mockOnChange} />);

      const select = screen.getByLabelText("Story Points");
      await user.click(select);

      const onePointOption = screen.getByText("1 point");
      await user.click(onePointOption);

      expect(mockOnChange).toHaveBeenCalledWith(1);
    });

    it("should change from 2 to null", async () => {
      const user = userEvent.setup();
      const mockOnChange = vi.fn();
      render(<PointsSelect points={2} onChange={mockOnChange} />);

      const select = screen.getByLabelText("Story Points");
      await user.click(select);

      const unspecifiedOption = screen.getByText("Unspecified");
      await user.click(unspecifiedOption);

      expect(mockOnChange).toHaveBeenCalledWith(undefined);
    });

    it("should change from 1 to 3", async () => {
      const user = userEvent.setup();
      const mockOnChange = vi.fn();
      render(<PointsSelect points={1} onChange={mockOnChange} />);

      const select = screen.getByLabelText("Story Points");
      await user.click(select);

      const threePointsOption = screen.getByText("3 points");
      await user.click(threePointsOption);

      expect(mockOnChange).toHaveBeenCalledWith(3);
    });
  });

  describe("Accessibility", () => {
    it("should have proper aria-labelledby", () => {
      render(<PointsSelect {...defaultProps} />);

      const select = screen.getByRole("combobox");
      expect(select).toHaveAttribute("aria-labelledby", "point-select-label");
    });

    it("should have aria-describedby when helper text is provided", () => {
      render(<PointsSelect {...defaultProps} helperText="Helper text" />);

      const select = screen.getByRole("combobox");
      expect(select).toHaveAttribute(
        "aria-describedby",
        "point-select-helper-text"
      );
    });

    it("should not have aria-describedby when no helper text", () => {
      render(<PointsSelect {...defaultProps} />);

      const select = screen.getByRole("combobox");
      expect(select).not.toHaveAttribute("aria-describedby");
    });

    it("should be focusable", () => {
      render(<PointsSelect {...defaultProps} />);

      const select = screen.getByLabelText("Story Points");
      act(() => {
        select.focus();
      });

      expect(select).toHaveFocus();
    });
  });

  describe("Edge Cases", () => {
    it("should handle fullWidth prop correctly", () => {
      const { rerender } = render(<PointsSelect {...defaultProps} fullWidth />);

      let formControl = screen
        .getByLabelText("Story Points")
        .closest(".MuiFormControl-root");
      expect(formControl).toHaveClass("MuiFormControl-fullWidth");

      rerender(<PointsSelect {...defaultProps} fullWidth={false} />);

      formControl = screen
        .getByLabelText("Story Points")
        .closest(".MuiFormControl-root");
      expect(formControl).not.toHaveClass("MuiFormControl-fullWidth");
    });

    it("should handle multiple onChange calls correctly", async () => {
      const user = userEvent.setup();
      const mockOnChange = vi.fn();
      render(<PointsSelect points={undefined} onChange={mockOnChange} />);

      const select = screen.getByLabelText("Story Points");

      // First selection
      await user.click(select);
      await user.click(screen.getByText("1 point"));

      // Second selection
      await user.click(select);
      await user.click(screen.getByText("3 points"));

      expect(mockOnChange).toHaveBeenCalledTimes(2);
      expect(mockOnChange).toHaveBeenNthCalledWith(1, 1);
      expect(mockOnChange).toHaveBeenNthCalledWith(2, 3);
    });

    it("should handle rapid selections correctly", async () => {
      const user = userEvent.setup();
      const mockOnChange = vi.fn();
      render(<PointsSelect points={undefined} onChange={mockOnChange} />);

      const select = screen.getByLabelText("Story Points");
      await user.click(select);

      // Rapid selections
      await user.click(screen.getByText("1 point"));
      await user.click(select);
      await user.click(screen.getByText("2 points"));

      expect(mockOnChange).toHaveBeenCalledTimes(2);
      expect(mockOnChange).toHaveBeenNthCalledWith(1, 1);
      expect(mockOnChange).toHaveBeenNthCalledWith(2, 2);
    });
  });
});
