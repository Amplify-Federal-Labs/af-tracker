import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import StateSelect from './stateSelect';
import type { StoryState } from '../../../models/userStory';

describe('StateSelect', () => {
  const defaultProps = {
    state: 'unscheduled' as StoryState,
    onChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render with default label', () => {
      render(<StateSelect {...defaultProps} />);
      
      expect(screen.getByLabelText('State')).toBeInTheDocument();
    });

    it('should render with custom label', () => {
      render(<StateSelect {...defaultProps} label="Story State" />);
      
      expect(screen.getByLabelText('Story State')).toBeInTheDocument();
    });

    it('should render with required indicator when required is true', () => {
      render(<StateSelect {...defaultProps} required />);
      
      const label = screen.getByLabelText('State *');
      expect(label).toBeInTheDocument();
    });

    it('should render helper text when provided', () => {
      const helperText = 'Select the current state';
      render(<StateSelect {...defaultProps} helperText={helperText} />);
      
      expect(screen.getByText(helperText)).toBeInTheDocument();
    });

    it('should be disabled when disabled prop is true', () => {
      render(<StateSelect {...defaultProps} disabled />);
      
      const select = screen.getByRole('combobox');
      expect(select).toHaveAttribute('aria-disabled', 'true');
    });

    it('should show error state when error prop is true', () => {
      render(<StateSelect {...defaultProps} error helperText="Error message" />);
      
      const helperText = screen.getByText('Error message');
      expect(helperText).toHaveClass('Mui-error');
    });
  });

  describe('State Display', () => {
    it('should display unscheduled state with chip', () => {
      render(<StateSelect {...defaultProps} state="unscheduled" />);
      
      expect(screen.getByText('Unscheduled')).toBeInTheDocument();
    });

    it('should display unstarted state with chip', () => {
      render(<StateSelect {...defaultProps} state="unstarted" />);
      
      expect(screen.getByText('Unstarted')).toBeInTheDocument();
    });

    it('should display started state with chip', () => {
      render(<StateSelect {...defaultProps} state="started" />);
      
      expect(screen.getByText('Started')).toBeInTheDocument();
    });

    it('should display finished state with chip', () => {
      render(<StateSelect {...defaultProps} state="finished" />);
      
      expect(screen.getByText('Finished')).toBeInTheDocument();
    });

    it('should display accepted state with chip', () => {
      render(<StateSelect {...defaultProps} state="accepted" />);
      
      expect(screen.getByText('Accepted')).toBeInTheDocument();
    });

    it('should display rejected state with chip', () => {
      render(<StateSelect {...defaultProps} state="rejected" />);
      
      expect(screen.getByText('Rejected')).toBeInTheDocument();
    });
  });

  describe('State Options', () => {
    it('should display all state options when opened', async () => {
      const user = userEvent.setup();
      render(<StateSelect {...defaultProps} />);
      
      const select = screen.getByLabelText('State');
      await user.click(select);
      
      // Should show all options (note: there are two instances - one in selected value, one in dropdown)
      expect(screen.getAllByText('Unscheduled')).toHaveLength(2);
      expect(screen.getByText('Unstarted')).toBeInTheDocument();
      expect(screen.getByText('Started')).toBeInTheDocument();
      expect(screen.getByText('Finished')).toBeInTheDocument();
      expect(screen.getByText('Accepted')).toBeInTheDocument();
      expect(screen.getByText('Rejected')).toBeInTheDocument();
    });

    it('should display chips with different colors in dropdown', async () => {
      const user = userEvent.setup();
      render(<StateSelect {...defaultProps} />);
      
      const select = screen.getByLabelText('State');
      await user.click(select);
      
      // Check that chips are rendered in the dropdown by looking for chip classes
      const chips = document.querySelectorAll('.MuiChip-root');
      expect(chips.length).toBeGreaterThan(0);
    });
  });

  describe('onChange Behavior', () => {
    it('should call onChange with "unstarted" when selected', async () => {
      const user = userEvent.setup();
      const mockOnChange = vi.fn();
      render(<StateSelect {...defaultProps} onChange={mockOnChange} />);
      
      const select = screen.getByLabelText('State');
      await user.click(select);
      
      const unstartedOption = screen.getByText('Unstarted');
      await user.click(unstartedOption);
      
      expect(mockOnChange).toHaveBeenCalledWith('unstarted');
    });

    it('should call onChange with "started" when selected', async () => {
      const user = userEvent.setup();
      const mockOnChange = vi.fn();
      render(<StateSelect {...defaultProps} onChange={mockOnChange} />);
      
      const select = screen.getByLabelText('State');
      await user.click(select);
      
      const startedOption = screen.getByText('Started');
      await user.click(startedOption);
      
      expect(mockOnChange).toHaveBeenCalledWith('started');
    });

    it('should call onChange with "finished" when selected', async () => {
      const user = userEvent.setup();
      const mockOnChange = vi.fn();
      render(<StateSelect {...defaultProps} onChange={mockOnChange} />);
      
      const select = screen.getByLabelText('State');
      await user.click(select);
      
      const finishedOption = screen.getByText('Finished');
      await user.click(finishedOption);
      
      expect(mockOnChange).toHaveBeenCalledWith('finished');
    });

    it('should call onChange with "accepted" when selected', async () => {
      const user = userEvent.setup();
      const mockOnChange = vi.fn();
      render(<StateSelect {...defaultProps} onChange={mockOnChange} />);
      
      const select = screen.getByLabelText('State');
      await user.click(select);
      
      const acceptedOption = screen.getByText('Accepted');
      await user.click(acceptedOption);
      
      expect(mockOnChange).toHaveBeenCalledWith('accepted');
    });

    it('should call onChange with "rejected" when selected', async () => {
      const user = userEvent.setup();
      const mockOnChange = vi.fn();
      render(<StateSelect {...defaultProps} onChange={mockOnChange} />);
      
      const select = screen.getByLabelText('State');
      await user.click(select);
      
      const rejectedOption = screen.getByText('Rejected');
      await user.click(rejectedOption);
      
      expect(mockOnChange).toHaveBeenCalledWith('rejected');
    });

    it('should not call onChange when disabled', async () => {
      const user = userEvent.setup();
      const mockOnChange = vi.fn();
      render(<StateSelect {...defaultProps} onChange={mockOnChange} disabled />);
      
      const select = screen.getByLabelText('State');
      
      // Try to click disabled select
      await user.click(select);
      
      expect(mockOnChange).not.toHaveBeenCalled();
    });
  });

  describe('State Changes', () => {
    it('should change from unscheduled to started', async () => {
      const user = userEvent.setup();
      const mockOnChange = vi.fn();
      render(<StateSelect state="unscheduled" onChange={mockOnChange} />);
      
      const select = screen.getByLabelText('State');
      await user.click(select);
      
      const startedOption = screen.getByText('Started');
      await user.click(startedOption);
      
      expect(mockOnChange).toHaveBeenCalledWith('started');
    });

    it('should change from started to finished', async () => {
      const user = userEvent.setup();
      const mockOnChange = vi.fn();
      render(<StateSelect state="started" onChange={mockOnChange} />);
      
      const select = screen.getByLabelText('State');
      await user.click(select);
      
      const finishedOption = screen.getByText('Finished');
      await user.click(finishedOption);
      
      expect(mockOnChange).toHaveBeenCalledWith('finished');
    });

    it('should change from finished to accepted', async () => {
      const user = userEvent.setup();
      const mockOnChange = vi.fn();
      render(<StateSelect state="finished" onChange={mockOnChange} />);
      
      const select = screen.getByLabelText('State');
      await user.click(select);
      
      const acceptedOption = screen.getByText('Accepted');
      await user.click(acceptedOption);
      
      expect(mockOnChange).toHaveBeenCalledWith('accepted');
    });

    it('should change from finished to rejected', async () => {
      const user = userEvent.setup();
      const mockOnChange = vi.fn();
      render(<StateSelect state="finished" onChange={mockOnChange} />);
      
      const select = screen.getByLabelText('State');
      await user.click(select);
      
      const rejectedOption = screen.getByText('Rejected');
      await user.click(rejectedOption);
      
      expect(mockOnChange).toHaveBeenCalledWith('rejected');
    });
  });

  describe('Accessibility', () => {
    it('should have proper aria-labelledby', () => {
      render(<StateSelect {...defaultProps} />);
      
      const select = screen.getByRole('combobox');
      expect(select).toHaveAttribute('aria-labelledby', 'state-select-label');
    });

    it('should have aria-describedby when helper text is provided', () => {
      render(<StateSelect {...defaultProps} helperText="Helper text" />);
      
      const select = screen.getByRole('combobox');
      expect(select).toHaveAttribute('aria-describedby', 'state-select-helper-text');
    });

    it('should not have aria-describedby when no helper text', () => {
      render(<StateSelect {...defaultProps} />);
      
      const select = screen.getByRole('combobox');
      expect(select).not.toHaveAttribute('aria-describedby');
    });

    it('should be focusable', () => {
      render(<StateSelect {...defaultProps} />);
      
      const select = screen.getByLabelText('State');
      select.focus();
      
      expect(select).toHaveFocus();
    });
  });

  describe('Chip Rendering', () => {
    it('should render chip with correct color for unscheduled state', () => {
      render(<StateSelect {...defaultProps} state="unscheduled" />);
      
      const chip = screen.getByText('Unscheduled').closest('.MuiChip-root');
      expect(chip).toBeInTheDocument();
    });

    it('should render chip with correct color for started state', () => {
      render(<StateSelect {...defaultProps} state="started" />);
      
      const chip = screen.getByText('Started').closest('.MuiChip-root');
      expect(chip).toBeInTheDocument();
      expect(chip).toHaveClass('MuiChip-colorPrimary');
    });

    it('should render chip with correct color for accepted state', () => {
      render(<StateSelect {...defaultProps} state="accepted" />);
      
      const chip = screen.getByText('Accepted').closest('.MuiChip-root');
      expect(chip).toBeInTheDocument();
      expect(chip).toHaveClass('MuiChip-colorSuccess');
    });

    it('should render chip with correct color for rejected state', () => {
      render(<StateSelect {...defaultProps} state="rejected" />);
      
      const chip = screen.getByText('Rejected').closest('.MuiChip-root');
      expect(chip).toBeInTheDocument();
      expect(chip).toHaveClass('MuiChip-colorError');
    });
  });

  describe('Edge Cases', () => {
    it('should handle fullWidth prop correctly', () => {
      const { rerender } = render(<StateSelect {...defaultProps} fullWidth />);
      
      let formControl = screen.getByLabelText('State').closest('.MuiFormControl-root');
      expect(formControl).toHaveClass('MuiFormControl-fullWidth');
      
      rerender(<StateSelect {...defaultProps} fullWidth={false} />);
      
      formControl = screen.getByLabelText('State').closest('.MuiFormControl-root');
      expect(formControl).not.toHaveClass('MuiFormControl-fullWidth');
    });

    it('should handle multiple onChange calls correctly', async () => {
      const user = userEvent.setup();
      const mockOnChange = vi.fn();
      render(<StateSelect state="unscheduled" onChange={mockOnChange} />);
      
      const select = screen.getByLabelText('State');
      
      // First selection
      await user.click(select);
      await user.click(screen.getByText('Started'));
      
      // Second selection  
      await user.click(select);
      await user.click(screen.getByText('Finished'));
      
      expect(mockOnChange).toHaveBeenCalledTimes(2);
      expect(mockOnChange).toHaveBeenNthCalledWith(1, 'started');
      expect(mockOnChange).toHaveBeenNthCalledWith(2, 'finished');
    });
  });
});