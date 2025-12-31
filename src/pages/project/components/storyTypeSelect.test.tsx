import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import StoryTypeSelect from './storyTypeSelect';
import type { StoryType } from '../../../viewModels/userStory';

describe('StoryTypeSelect', () => {
  const defaultProps = {
    value: 'feature' as StoryType,
    onChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render with default props', () => {
    render(<StoryTypeSelect {...defaultProps} />);
    
    expect(screen.getByLabelText('Story Type')).toBeInTheDocument();
    // Check for the selected option text instead of display value
    expect(screen.getByText('Feature')).toBeInTheDocument();
  });

  it('should render with custom label', () => {
    render(<StoryTypeSelect {...defaultProps} label="Custom Label" />);
    
    expect(screen.getByLabelText('Custom Label')).toBeInTheDocument();
  });

  it('should render as required when required prop is true', () => {
    render(<StoryTypeSelect {...defaultProps} required />);
    
    // Check that the label has the required asterisk
    const label = document.querySelector('#story-type-select-label');
    expect(label).toHaveClass('Mui-required');
  });

  it('should render helper text when provided', () => {
    const helperText = 'Select a story type';
    render(<StoryTypeSelect {...defaultProps} helperText={helperText} />);
    
    expect(screen.getByText(helperText)).toBeInTheDocument();
  });

  it('should be disabled when disabled prop is true', () => {
    render(<StoryTypeSelect {...defaultProps} disabled />);
    
    const select = screen.getByRole('combobox');
    expect(select).toHaveAttribute('aria-disabled', 'true');
  });

  it('should show error state when error prop is true', () => {
    render(<StoryTypeSelect {...defaultProps} error helperText="Error message" />);
    
    const helperText = screen.getByText('Error message');
    expect(helperText).toHaveClass('Mui-error');
  });

  it('should display all story type options when opened', async () => {
    const user = userEvent.setup();
    render(<StoryTypeSelect value="design" onChange={vi.fn()} />);
    
    const select = screen.getByRole('combobox');
    await user.click(select);
    
    // Check that all story types are available as options
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(5);
    
    // Check that each option has the expected story type
    expect(screen.getByRole('option', { name: /Feature/ })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /Design/ })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /Bug/ })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /Chore/ })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /Release/ })).toBeInTheDocument();
  });

  it('should call onChange when a different option is selected', async () => {
    const user = userEvent.setup();
    const mockOnChange = vi.fn();
    render(<StoryTypeSelect value="design" onChange={mockOnChange} />);
    
    const select = screen.getByRole('combobox');
    await user.click(select);
    
    const bugOption = screen.getByText('Bug');
    await user.click(bugOption);
    
    expect(mockOnChange).toHaveBeenCalledWith('bug');
  });

  it('should render icons for each story type option', async () => {
    const user = userEvent.setup();
    render(<StoryTypeSelect value="chore" onChange={vi.fn()} />);
    
    const select = screen.getByRole('combobox');
    await user.click(select);
    
    // Check that icons are present - just verify some are there
    const starIcons = screen.getAllByTestId('StarIcon');
    const paletteIcons = screen.getAllByTestId('PaletteIcon');
    const bugIcons = screen.getAllByTestId('BugReportIcon');
    const buildIcons = screen.getAllByTestId('BuildIcon');
    const rocketIcons = screen.getAllByTestId('RocketIcon');
    
    // Each icon should appear at least once (could be duplicated due to selected value rendering)
    expect(starIcons.length).toBeGreaterThanOrEqual(1);
    expect(paletteIcons.length).toBeGreaterThanOrEqual(1);
    expect(bugIcons.length).toBeGreaterThanOrEqual(1);
    expect(buildIcons.length).toBeGreaterThanOrEqual(1);
    expect(rocketIcons.length).toBeGreaterThanOrEqual(1);
  });

  it('should have proper accessibility attributes', () => {
    const helperText = 'Select story type';
    render(<StoryTypeSelect {...defaultProps} helperText={helperText} />);
    
    const select = screen.getByRole('combobox');
    expect(select).toHaveAttribute('aria-describedby', 'story-type-helper-text');
  });

  it('should handle all story type values correctly', () => {
    const storyTypes: Array<{value: StoryType, label: string}> = [
      {value: 'feature', label: 'Feature'},
      {value: 'design', label: 'Design'},
      {value: 'bug', label: 'Bug'},
      {value: 'chore', label: 'Chore'},
      {value: 'release', label: 'Release'}
    ];
    
    storyTypes.forEach((storyType) => {
      const mockOnChange = vi.fn();
      const { rerender } = render(
        <StoryTypeSelect value={storyType.value} onChange={mockOnChange} />
      );
      
      expect(screen.getByText(storyType.label)).toBeInTheDocument();
      
      // Clean up for next iteration
      rerender(<div />);
    });
  });

  it('should not have fullWidth class when fullWidth is false', () => {
    render(<StoryTypeSelect {...defaultProps} fullWidth={false} />);
    
    const formControl = screen.getByRole('combobox').closest('.MuiFormControl-root');
    expect(formControl).not.toHaveClass('MuiFormControl-fullWidth');
  });
});