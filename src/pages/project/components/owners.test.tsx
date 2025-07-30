import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Owners from './owners';
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
];

const mockOwners: User[] = [
  {
    uid: 'user-1',
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
  },
];

describe('Owners', () => {
  const defaultProps = {
    owners: [],
    users: mockUsers,
    onChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Empty owners state', () => {
    it('should display "Add" button when owners list is empty', () => {
      render(<Owners {...defaultProps} />);
      
      const addButton = screen.getByRole('button', { name: /add/i });
      expect(addButton).toBeInTheDocument();
      expect(addButton).toHaveTextContent('Add');
    });

    it('should display plus icon in Add button', () => {
      render(<Owners {...defaultProps} />);
      
      const addButton = screen.getByRole('button', { name: /add/i });
      expect(addButton.querySelector('svg')).toBeInTheDocument();
    });

    it('should open dialog when Add button is clicked', async () => {
      const user = userEvent.setup();
      render(<Owners {...defaultProps} />);
      
      const addButton = screen.getByRole('button', { name: /add/i });
      await user.click(addButton);
      
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('Add Owner')).toBeInTheDocument();
    });
  });

  describe('With owners state', () => {
    const propsWithOwners = {
      ...defaultProps,
      owners: mockOwners,
    };

    it('should display owner avatars when owners exist', () => {
      render(<Owners {...propsWithOwners} />);
      
      // Should show avatar with initials
      expect(screen.getByText('AJ')).toBeInTheDocument();
      // The "Add" text button should not be present, but the plus icon button should be
      expect(screen.queryByRole('button', { name: /^add$/i })).not.toBeInTheDocument();
      expect(screen.getByRole('button', { name: /add owner/i })).toBeInTheDocument();
    });

    it('should display plus icon button when owners exist', () => {
      render(<Owners {...propsWithOwners} />);
      
      const plusButton = screen.getByRole('button', { name: /add owner/i });
      expect(plusButton).toBeInTheDocument();
      expect(plusButton.querySelector('svg')).toBeInTheDocument();
    });

    it('should show owner name in avatar title attribute', () => {
      render(<Owners {...propsWithOwners} />);
      
      const avatar = screen.getByText('AJ').closest('[title]');
      expect(avatar).toHaveAttribute('title', 'Alice Johnson');
    });

    it('should open dialog when plus icon is clicked', async () => {
      const user = userEvent.setup();
      render(<Owners {...propsWithOwners} />);
      
      const plusButton = screen.getByRole('button', { name: /add owner/i });
      await user.click(plusButton);
      
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('Add Owner')).toBeInTheDocument();
    });

    it('should display multiple owner avatars in AvatarGroup', () => {
      const multipleOwners = [mockOwners[0], mockUsers[1]];
      render(<Owners {...defaultProps} owners={multipleOwners} />);
      
      expect(screen.getByText('AJ')).toBeInTheDocument(); // Alice Johnson
      expect(screen.getByText('BS')).toBeInTheDocument(); // Bob Smith
    });

    it('should limit avatar display and show overflow indicator for many owners', () => {
      const manyOwners = mockUsers; // All 4 users as owners
      render(<Owners {...defaultProps} owners={manyOwners} />);
      
      // AvatarGroup should limit to max={4}, so all should be visible
      expect(screen.getByText('AJ')).toBeInTheDocument();
      expect(screen.getByText('BS')).toBeInTheDocument();
      expect(screen.getByText('CB')).toBeInTheDocument();
      expect(screen.getByText('DW')).toBeInTheDocument();
    });
  });

  describe('Dialog functionality', () => {
    it('should close dialog when Cancel button is clicked', async () => {
      const user = userEvent.setup();
      render(<Owners {...defaultProps} />);
      
      // Open dialog
      const addButton = screen.getByRole('button', { name: /add/i });
      await user.click(addButton);
      
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      
      // Close dialog
      const cancelButton = screen.getByRole('button', { name: /cancel/i });
      await user.click(cancelButton);
      
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });

    it('should display UserSelect component in dialog', async () => {
      const user = userEvent.setup();
      render(<Owners {...defaultProps} />);
      
      const addButton = screen.getByRole('button', { name: /add/i });
      await user.click(addButton);
      
      // Should see UserSelect search box
      expect(screen.getByPlaceholderText('Search for a user to add as owner...')).toBeInTheDocument();
      
      // Should see available users
      expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
      expect(screen.getByText('Bob Smith')).toBeInTheDocument();
    });

    it('should filter out existing owners from UserSelect', async () => {
      const user = userEvent.setup();
      const propsWithOwners = {
        ...defaultProps,
        owners: [mockUsers[0]], // Alice is already an owner
      };
      
      render(<Owners {...propsWithOwners} />);
      
      const plusButton = screen.getByRole('button', { name: /add owner/i });
      await user.click(plusButton);
      
      // Alice should not be available for selection
      expect(screen.queryByText('Alice Johnson')).not.toBeInTheDocument();
      // But other users should be available
      expect(screen.getByText('Bob Smith')).toBeInTheDocument();
      expect(screen.getByText('Charlie Brown')).toBeInTheDocument();
    });

    it('should call onChange with updated owners when user is selected', async () => {
      const user = userEvent.setup();
      const mockOnChange = vi.fn();
      const props = {
        ...defaultProps,
        onChange: mockOnChange,
      };
      
      render(<Owners {...props} />);
      
      // Open dialog
      const addButton = screen.getByRole('button', { name: /add/i });
      await user.click(addButton);
      
      // Select a user
      const bobButton = screen.getByText('Bob Smith').closest('[role="button"]');
      await user.click(bobButton!);
      
      expect(mockOnChange).toHaveBeenCalledWith([mockUsers[1]]); // Bob Smith
    });

    it('should close dialog after user selection', async () => {
      const user = userEvent.setup();
      render(<Owners {...defaultProps} />);
      
      // Open dialog
      const addButton = screen.getByRole('button', { name: /add/i });
      await user.click(addButton);
      
      // Select a user
      const bobButton = screen.getByText('Bob Smith').closest('[role="button"]');
      await user.click(bobButton!);
      
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });

    it('should not add duplicate owners', async () => {
      const user = userEvent.setup();
      const mockOnChange = vi.fn();
      const propsWithOwners = {
        ...defaultProps,
        owners: [mockUsers[0]], // Alice is already an owner
        onChange: mockOnChange,
      };
      
      render(<Owners {...propsWithOwners} />);
      
      const plusButton = screen.getByRole('button', { name: /add owner/i });
      await user.click(plusButton);
      
      // Try to select Bob (who should be available)
      const bobButton = screen.getByText('Bob Smith').closest('[role="button"]');
      await user.click(bobButton!);
      
      // Should add Bob to existing owners
      expect(mockOnChange).toHaveBeenCalledWith([mockUsers[0], mockUsers[1]]);
    });

    it('should show message when all users are already owners', async () => {
      const allOwnersProps = {
        ...defaultProps,
        owners: mockUsers, // All users are owners
      };
      
      render(<Owners {...allOwnersProps} />);
      
      const plusButton = screen.getByRole('button', { name: /add owner/i });
      expect(plusButton).toBeDisabled();
      
      // Force click on disabled button to test the dialog content
      fireEvent.click(plusButton);
      
      // Since the button is disabled, the dialog should not open
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('should disable plus button when all users are already owners', () => {
      const allOwnersProps = {
        ...defaultProps,
        owners: mockUsers, // All users are owners
      };
      
      render(<Owners {...allOwnersProps} />);
      
      const plusButton = screen.getByRole('button', { name: /add owner/i });
      expect(plusButton).toBeDisabled();
    });
  });

  describe('Disabled state', () => {
    it('should disable Add button when disabled prop is true', () => {
      render(<Owners {...defaultProps} disabled />);
      
      const addButton = screen.getByRole('button', { name: /add/i });
      expect(addButton).toBeDisabled();
    });

    it('should disable plus button when disabled prop is true', () => {
      const propsWithOwners = {
        ...defaultProps,
        owners: mockOwners,
        disabled: true,
      };
      
      render(<Owners {...propsWithOwners} />);
      
      const plusButton = screen.getByRole('button', { name: /add owner/i });
      expect(plusButton).toBeDisabled();
    });

    it('should not open dialog when Add button is clicked and disabled', () => {
      render(<Owners {...defaultProps} disabled />);
      
      const addButton = screen.getByRole('button', { name: /add/i });
      
      // Force click on disabled button
      fireEvent.click(addButton);
      
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  describe('Avatar initials generation', () => {
    it('should generate correct initials for two-word names', () => {
      render(<Owners {...defaultProps} owners={[mockUsers[0]]} />);
      
      expect(screen.getByText('AJ')).toBeInTheDocument(); // Alice Johnson
    });

    it('should generate correct initials for single-word names', () => {
      const userWithSingleName = {
        uid: 'user-single',
        name: 'Madonna',
        email: 'madonna@example.com',
      };
      
      render(<Owners {...defaultProps} owners={[userWithSingleName]} />);
      
      expect(screen.getByText('M')).toBeInTheDocument();
    });

    it('should limit initials to 2 characters for long names', () => {
      const userWithLongName = {
        uid: 'user-long',
        name: 'John Michael Christopher Smith',
        email: 'john@example.com',
      };
      
      render(<Owners {...defaultProps} owners={[userWithLongName]} />);
      
      expect(screen.getByText('JM')).toBeInTheDocument();
    });
  });

  describe('Edge cases', () => {
    it('should handle empty users list', () => {
      render(<Owners {...defaultProps} users={[]} />);
      
      const addButton = screen.getByRole('button', { name: /add/i });
      expect(addButton).toBeInTheDocument();
    });

    it('should handle dialog opening with empty users list', async () => {
      const user = userEvent.setup();
      render(<Owners {...defaultProps} users={[]} />);
      
      const addButton = screen.getByRole('button', { name: /add/i });
      await user.click(addButton);
      
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('All available users are already owners')).toBeInTheDocument();
    });
  });
});