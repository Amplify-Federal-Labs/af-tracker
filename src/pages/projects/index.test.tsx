import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProjectListContainer from './index';
import * as api from '../../api';

// Mock only the API module
vi.mock('../../api', () => ({
  getProjects: vi.fn(),
  addProject: vi.fn(),
}));

describe('ProjectListContainer', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    vi.clearAllMocks();
  });

  const renderWithQueryClient = (component: React.ReactElement) => {
    return render(
      <QueryClientProvider client={queryClient}>
        {component}
      </QueryClientProvider>
    );
  };

  it('should load project list upon mounting', async () => {
    // Arrange
    const mockProjects = [
      {
        id: 1,
        name: 'Project 1',
        description: 'Description 1',
        createdAt: new Date('2024-01-01'),
      },
      {
        id: 2,
        name: 'Project 2',
        description: 'Description 2',
        createdAt: new Date('2024-01-02'),
      },
    ];

    const getProjectsSpy = vi.mocked(api.getProjects);
    getProjectsSpy.mockResolvedValue(mockProjects);

    // Act
    renderWithQueryClient(<ProjectListContainer />);

    // Assert
    // Should show loading state initially
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Should call getProjects API
    expect(getProjectsSpy).toHaveBeenCalledTimes(1);

    // Should display project cards after loading
    await waitFor(() => {
      expect(screen.getByText('Project 1')).toBeInTheDocument();
      expect(screen.getByText('Project 2')).toBeInTheDocument();
      expect(screen.getByText('Description 1')).toBeInTheDocument();
      expect(screen.getByText('Description 2')).toBeInTheDocument();
    });

    // Should not show loading anymore
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();

    // Should render the Add Project FAB
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
  });

  it('should display error state when API call fails', async () => {
    // Arrange
    const getProjectsSpy = vi.mocked(api.getProjects);
    getProjectsSpy.mockRejectedValue(new Error('Failed to fetch projects'));

    // Act
    renderWithQueryClient(<ProjectListContainer />);

    // Assert
    await waitFor(() => {
      expect(screen.getByText('Error: Failed to fetch projects')).toBeInTheDocument();
    });

    // Should not render project list or FAB in error state
    expect(screen.queryByText('Project 1')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /add/i })).not.toBeInTheDocument();
  });

  it('should display loading state initially', () => {
    // Arrange
    const getProjectsSpy = vi.mocked(api.getProjects);
    // Make the promise never resolve to keep loading state
    getProjectsSpy.mockImplementation(() => new Promise(() => {}));

    // Act
    renderWithQueryClient(<ProjectListContainer />);

    // Assert
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.queryByText('Project 1')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /add/i })).not.toBeInTheDocument();
  });

  it('should display empty project list when no projects returned', async () => {
    // Arrange
    const getProjectsSpy = vi.mocked(api.getProjects);
    getProjectsSpy.mockResolvedValue([]);

    // Act
    renderWithQueryClient(<ProjectListContainer />);

    // Assert
    await waitFor(() => {
      // Should not show loading anymore
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    // Should still render the FAB even with empty list
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();

    // Should not show any project cards
    expect(screen.queryByText('Project 1')).not.toBeInTheDocument();
  });
});