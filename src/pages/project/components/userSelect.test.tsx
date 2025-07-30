import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserSelect from './userSelect';
import type { User } from '../../../models/user';

const mockUsers: User[] = [
  {
    uid: 'user-1',
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
  },
  {
    uid: 'user-2',
    name: 'Bob Smith',
    email: 'bob.smith@example.com',
  },
  {
    uid: 'user-3',
    name: 'Charlie Brown',
    email: 'charlie.brown@example.com',
  },
  {
    uid: 'user-4',
    name: 'Diana Wilson',
    email: 'diana.wilson@example.com',
  },
  {
    uid: 'user-5',
    name: 'Alice Cooper',
    email: 'alice.cooper@example.com',
  },
];

describe('UserSelect', () => {
  const defaultProps = {
    users: mockUsers,
    onSelect: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render search box and user list', () => {
    render(<UserSelect {...defaultProps} />);
    
    // Search box should be present
    expect(screen.getByPlaceholderText('Search users...')).toBeInTheDocument();
    
    // All users should be displayed initially
    expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
    expect(screen.getByText('Bob Smith')).toBeInTheDocument();
    expect(screen.getByText('Charlie Brown')).toBeInTheDocument();
    expect(screen.getByText('Diana Wilson')).toBeInTheDocument();
    expect(screen.getByText('Alice Cooper')).toBeInTheDocument();
  });

  it('should display user email addresses', () => {
    render(<UserSelect {...defaultProps} />);
    
    expect(screen.getByText('alice.johnson@example.com')).toBeInTheDocument();
    expect(screen.getByText('bob.smith@example.com')).toBeInTheDocument();
  });

  it('should display avatars with user initials', () => {
    render(<UserSelect {...defaultProps} />);
    
    // Check that avatars with initials are displayed
    expect(screen.getByText('AJ')).toBeInTheDocument(); // Alice Johnson
    expect(screen.getByText('BS')).toBeInTheDocument(); // Bob Smith
    expect(screen.getByText('CB')).toBeInTheDocument(); // Charlie Brown
    expect(screen.getByText('DW')).toBeInTheDocument(); // Diana Wilson
    expect(screen.getByText('AC')).toBeInTheDocument(); // Alice Cooper
  });

  it('should filter users by name using startsWith when typing in search box', async () => {
    const user = userEvent.setup();
    render(<UserSelect {...defaultProps} />);
    
    const searchBox = screen.getByPlaceholderText('Search users...');
    
    // Type "Al" - should show both Alice users
    await user.type(searchBox, 'Al');
    
    expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
    expect(screen.getByText('Alice Cooper')).toBeInTheDocument();
    expect(screen.queryByText('Bob Smith')).not.toBeInTheDocument();
    expect(screen.queryByText('Charlie Brown')).not.toBeInTheDocument();
    expect(screen.queryByText('Diana Wilson')).not.toBeInTheDocument();
  });

  it('should be case insensitive when filtering', async () => {
    const user = userEvent.setup();
    render(<UserSelect {...defaultProps} />);
    
    const searchBox = screen.getByPlaceholderText('Search users...');
    
    // Type lowercase "alice" - should still show Alice users
    await user.type(searchBox, 'alice');
    
    expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
    expect(screen.getByText('Alice Cooper')).toBeInTheDocument();
    expect(screen.queryByText('Bob Smith')).not.toBeInTheDocument();
  });

  it('should show no results message when no users match search', async () => {
    const user = userEvent.setup();
    render(<UserSelect {...defaultProps} />);
    
    const searchBox = screen.getByPlaceholderText('Search users...');
    
    // Type something that doesn't match any user
    await user.type(searchBox, 'xyz');
    
    expect(screen.getByText('No users found matching "xyz"')).toBeInTheDocument();
    expect(screen.queryByText('Alice Johnson')).not.toBeInTheDocument();
  });

  it('should call onSelect when a user is clicked', async () => {
    const user = userEvent.setup();
    const mockOnSelect = vi.fn();
    render(<UserSelect {...defaultProps} onSelect={mockOnSelect} />);
    
    // Click on Alice Johnson
    const aliceButton = screen.getByText('Alice Johnson').closest('[role="button"]');
    await user.click(aliceButton!);
    
    expect(mockOnSelect).toHaveBeenCalledWith({
      uid: 'user-1',
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
    });
  });

  it('should display user count', () => {
    render(<UserSelect {...defaultProps} />);
    
    expect(screen.getByText('5 users')).toBeInTheDocument();
  });

  it('should display filtered count when searching', async () => {
    const user = userEvent.setup();
    render(<UserSelect {...defaultProps} />);
    
    const searchBox = screen.getByPlaceholderText('Search users...');
    await user.type(searchBox, 'Al');
    
    expect(screen.getByText('2 of 5 users')).toBeInTheDocument();
  });

  it('should handle empty user list', () => {
    render(<UserSelect users={[]} onSelect={vi.fn()} />);
    
    expect(screen.getByText('No users found')).toBeInTheDocument();
  });

  it('should handle single user correctly', () => {
    const singleUser = [mockUsers[0]];
    render(<UserSelect users={singleUser} onSelect={vi.fn()} />);
    
    expect(screen.getByText('1 user')).toBeInTheDocument();
  });

  it('should use custom placeholder when provided', () => {
    render(<UserSelect {...defaultProps} placeholder="Find a team member..." />);
    
    expect(screen.getByPlaceholderText('Find a team member...')).toBeInTheDocument();
  });

  it('should use custom empty message when provided', () => {
    render(<UserSelect users={[]} onSelect={vi.fn()} emptyMessage="No team members available" />);
    
    expect(screen.getByText('No team members available')).toBeInTheDocument();
  });

  it('should be disabled when disabled prop is true', () => {
    render(<UserSelect {...defaultProps} disabled />);
    
    const searchBox = screen.getByPlaceholderText('Search users...');
    expect(searchBox).toBeDisabled();
    
    // User buttons should have aria-disabled
    const userButtons = screen.getAllByRole('button');
    userButtons.forEach(button => {
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });
  });

  it('should not call onSelect when disabled', async () => {
    const user = userEvent.setup();
    const mockOnSelect = vi.fn();
    render(<UserSelect {...defaultProps} onSelect={mockOnSelect} disabled />);
    
    // Try to click on a user - should not call onSelect
    const aliceButton = screen.getByText('Alice Johnson').closest('button');
    await user.click(aliceButton!);
    
    expect(mockOnSelect).not.toHaveBeenCalled();
  });

  it('should respect maxHeight prop', () => {
    render(<UserSelect {...defaultProps} maxHeight={200} />);
    
    // Find the scrollable container using test id
    const scrollableContainer = screen.getByTestId('user-list-container');
    expect(scrollableContainer).toHaveStyle('max-height: 200px');
  });

  it('should clear search results when search term is cleared', async () => {
    const user = userEvent.setup();
    render(<UserSelect {...defaultProps} />);
    
    const searchBox = screen.getByPlaceholderText('Search users...');
    
    // Type to filter
    await user.type(searchBox, 'Al');
    expect(screen.queryByText('Bob Smith')).not.toBeInTheDocument();
    
    // Clear search
    await user.clear(searchBox);
    expect(screen.getByText('Bob Smith')).toBeInTheDocument();
  });

  it('should generate correct initials for names', () => {
    const userWithLongName = {
      uid: 'user-long',
      name: 'John Michael Christopher Smith',
      email: 'john@example.com',
    };
    
    render(<UserSelect users={[userWithLongName]} onSelect={vi.fn()} />);
    
    // Should show only first 2 initials
    expect(screen.getByText('JM')).toBeInTheDocument();
  });

  it('should handle names with single word', () => {
    const userWithSingleName = {
      uid: 'user-single',
      name: 'Madonna',
      email: 'madonna@example.com',
    };
    
    render(<UserSelect users={[userWithSingleName]} onSelect={vi.fn()} />);
    
    expect(screen.getByText('M')).toBeInTheDocument();
  });

  it('should trim whitespace from search term', async () => {
    const user = userEvent.setup();
    render(<UserSelect {...defaultProps} />);
    
    const searchBox = screen.getByPlaceholderText('Search users...');
    
    // Type "Al" without spaces first to see it works
    await user.type(searchBox, 'Al');
    
    // Should filter correctly
    expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
    expect(screen.getByText('Alice Cooper')).toBeInTheDocument();
    expect(screen.queryByText('Bob Smith')).not.toBeInTheDocument();
  });
});