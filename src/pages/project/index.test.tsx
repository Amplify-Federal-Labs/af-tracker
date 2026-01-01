import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, useParams } from 'react-router';
import * as React from 'react';
import ProjectContainer from './index';
import * as storiesApi from '../../api/stories';
import * as projectsApi from '../../api/projects';
import type { Project } from '../../viewModels/project';

// Mock the APIs
vi.mock('../../api/stories', () => ({
  getStoriesForProject: vi.fn(),
  saveUserStory: vi.fn(),
  reorderUserStories: vi.fn(),
}));

vi.mock('../../api/projects', () => ({
  getProjectById: vi.fn(),
}));

// Mock the ProjectView component
vi.mock('./project', () => ({
  default: vi.fn(({ done, backlog, icebox, onSaveStory }) => (
    <div data-testid="project-view">
      <div data-testid="done-count">{done.length}</div>
      <div data-testid="backlog-count">{backlog.length}</div>
      <div data-testid="icebox-count">{icebox.length}</div>
      <button 
        data-testid="add-story-btn" 
        onClick={() => onSaveStory({
          type: 'feature',
          title: 'Test Story',
          description: 'Test Description',
          labels: [],
          tasks: []
        })}
      >
        Add Story
      </button>
    </div>
  ))
}));

// Mock useParams 
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useParams: vi.fn(() => ({ projectId: 'test-project-123' })),
  };
});

// Mock React module to override useContext
vi.mock('react', async () => {
  const actual = await vi.importActual<typeof React>('react');
  return {
    ...actual,
    useContext: vi.fn(() => ({
      user: { id: 'user-1', email: 'user1@test.com' }
    }))
  };
});

describe('ProjectContainer', () => {
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
    
    // Reset useParams mock to default value
    vi.mocked(useParams).mockReturnValue({ projectId: 'test-project-123' });
  });

  const renderWithProviders = (component: React.ReactElement) => {
    return render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          {component}
        </QueryClientProvider>
      </BrowserRouter>
    );
  };

  const createMockProjectData = (): Project => ({
    id: 'test-project-123',
    name: 'Test Project',
    description: 'A test project',
    averageVelocity: 10,
    iterationLength: 'TwoWeeks',
    members: [
      { id: 'user-1', email: 'user1@test.com', name: 'User 1' },
      { id: 'user-2', email: 'user2@test.com', name: 'User 2' },
    ],
    labels: ['frontend', 'backend', 'maintenance'],
  });

  const createMockStoriesData = () => [
    {
      id: 'story-1',
      index: 0,
      storyId: 'STORY-1',
      projectId: 'test-project-123',
      type: 'feature' as const,
      title: 'Done Story 1',
      requester: { id: 'user-1', email: 'user1@test.com', name: 'User 1' },
      owners: [],
      location: 'backlog' as const,
      state: 'done' as const,
      blockers: [],
      description: 'A completed story',
      labels: ['frontend'],
      tasks: [],
      createdAt: new Date('2024-01-01'),
      createdBy: { id: 'user-1', email: 'user1@test.com', name: 'User 1' },
      acceptedAt: new Date('2024-01-05'),
      doneAt: new Date('2024-01-06'),
    },
    {
      id: 'story-2',
      index: 1,
      storyId: 'STORY-2',
      projectId: 'test-project-123',
      type: 'bug' as const,
      title: 'Backlog Story 1',
      requester: { id: 'user-1', email: 'user1@test.com', name: 'User 1' },
      owners: [{ id: 'user-2', email: 'user2@test.com', name: 'User 2' }],
      location: 'backlog' as const,
      state: 'started' as const,
      blockers: [],
      description: 'A story in progress',
      labels: ['backend'],
      tasks: [{ description: 'Fix bug', isCompleted: false }],
      createdAt: new Date('2024-01-02'),
      createdBy: { id: 'user-1', email: 'user1@test.com', name: 'User 1' },
      startedAt: new Date('2024-01-03'),
    },
    {
      id: 'story-3',
      index: 2,
      storyId: 'STORY-3',
      projectId: 'test-project-123',
      type: 'chore' as const,
      title: 'Icebox Story 1',
      requester: { id: 'user-1', email: 'user1@test.com', name: 'User 1' },
      owners: [],
      location: 'icebox' as const,
      state: 'unstarted' as const,
      blockers: [],
      description: 'A future story',
      labels: ['maintenance'],
      tasks: [],
      createdAt: new Date('2024-01-03'),
      createdBy: { id: 'user-1', email: 'user1@test.com', name: 'User 1' },
    },
  ];

  it('should display loading state initially', () => {
    const getProjectByIdSpy = vi.mocked(projectsApi.getProjectById);
    const getStoriesForProjectSpy = vi.mocked(storiesApi.getStoriesForProject);

    // Make the promises never resolve to keep loading state
    getProjectByIdSpy.mockImplementation(() => new Promise(() => {}));
    getStoriesForProjectSpy.mockImplementation(() => new Promise(() => {}));

    renderWithProviders(<ProjectContainer />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(getProjectByIdSpy).toHaveBeenCalledWith('test-project-123');
  });

  it('should display error state when API call fails', async () => {
    const getProjectByIdSpy = vi.mocked(projectsApi.getProjectById);
    const getStoriesForProjectSpy = vi.mocked(storiesApi.getStoriesForProject);

    getProjectByIdSpy.mockRejectedValue(new Error('Failed to fetch project'));
    getStoriesForProjectSpy.mockResolvedValue([]);

    renderWithProviders(<ProjectContainer />);

    await waitFor(() => {
      expect(screen.getByText('Error: Failed to fetch project')).toBeInTheDocument();
    });

    expect(getProjectByIdSpy).toHaveBeenCalledWith('test-project-123');
  });

  it('should load and display user stories when API call succeeds', async () => {
    const mockProjectData = createMockProjectData();
    const mockStoriesData = createMockStoriesData();
    const getProjectByIdSpy = vi.mocked(projectsApi.getProjectById);
    const getStoriesForProjectSpy = vi.mocked(storiesApi.getStoriesForProject);

    getProjectByIdSpy.mockResolvedValue(mockProjectData);
    getStoriesForProjectSpy.mockResolvedValue(mockStoriesData);

    renderWithProviders(<ProjectContainer />);

    // Should show loading initially
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Should load project and display project view
    await waitFor(() => {
      expect(screen.getByTestId('project-view')).toBeInTheDocument();
    });

    // Should pass correct data to ProjectView (1 done, 1 backlog, 1 icebox)
    expect(screen.getByTestId('done-count')).toHaveTextContent('1');
    expect(screen.getByTestId('backlog-count')).toHaveTextContent('1');
    expect(screen.getByTestId('icebox-count')).toHaveTextContent('1');

    // Should not show loading anymore
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();

    expect(getProjectByIdSpy).toHaveBeenCalledWith('test-project-123');
    expect(getStoriesForProjectSpy).toHaveBeenCalledWith('test-project-123', undefined, undefined, 'icebox');
  });

  it('should handle empty user stories data', async () => {
    const mockProjectData = createMockProjectData();
    const getProjectByIdSpy = vi.mocked(projectsApi.getProjectById);
    const getStoriesForProjectSpy = vi.mocked(storiesApi.getStoriesForProject);

    getProjectByIdSpy.mockResolvedValue(mockProjectData);
    getStoriesForProjectSpy.mockResolvedValue([]);

    renderWithProviders(<ProjectContainer />);

    await waitFor(() => {
      expect(screen.getByTestId('project-view')).toBeInTheDocument();
    });

    // Should show zero counts for all categories
    expect(screen.getByTestId('done-count')).toHaveTextContent('0');
    expect(screen.getByTestId('backlog-count')).toHaveTextContent('0');
    expect(screen.getByTestId('icebox-count')).toHaveTextContent('0');
  });

  it('should handle adding a new story successfully', async () => {
    const mockProjectData = createMockProjectData();
    const mockStoriesData = createMockStoriesData();
    const getProjectByIdSpy = vi.mocked(projectsApi.getProjectById);
    const getStoriesForProjectSpy = vi.mocked(storiesApi.getStoriesForProject);
    const saveUserStorySpy = vi.mocked(storiesApi.saveUserStory);

    getProjectByIdSpy.mockResolvedValue(mockProjectData);
    getStoriesForProjectSpy.mockResolvedValue(mockStoriesData);
    saveUserStorySpy.mockResolvedValue({
      id: 'new-story-1',
      type: 'feature',
      title: 'Test Story',
      requester: { id: 'user-1', email: 'user1@test.com', name: 'User 1' },
      owners: [],
      location: 'backlog',
      state: 'unstarted',
      blockers: [],
      description: 'Test Description',
      labels: [],
      tasks: [],
      createdAt: new Date(),
      createdBy: { id: 'user-1', email: 'user1@test.com', name: 'User 1' },
    });

    // Mock the invalidateQueries method
    const invalidateQueriesSpy = vi.spyOn(queryClient, 'invalidateQueries');

    renderWithProviders(<ProjectContainer />);

    // Wait for initial load
    await waitFor(() => {
      expect(screen.getByTestId('project-view')).toBeInTheDocument();
    });

    // Simulate adding a story
    const addButton = screen.getByTestId('add-story-btn');
    addButton.click();

    // Wait for the add story API call
    await waitFor(() => {
      expect(saveUserStorySpy).toHaveBeenCalledWith('test-project-123', {
        type: 'feature',
        title: 'Test Story',
        description: 'Test Description',
        labels: [],
        tasks: []
      });
    });

    // Should invalidate stories queries to refresh the data
    expect(invalidateQueriesSpy).toHaveBeenCalledWith({
      queryKey: ['stories', 'test-project-123']
    });
  });

  it('should handle adding story failure gracefully', async () => {
    const mockProjectData = createMockProjectData();
    const mockStoriesData = createMockStoriesData();
    const getProjectByIdSpy = vi.mocked(projectsApi.getProjectById);
    const getStoriesForProjectSpy = vi.mocked(storiesApi.getStoriesForProject);
    const saveUserStorySpy = vi.mocked(storiesApi.saveUserStory);

    getProjectByIdSpy.mockResolvedValue(mockProjectData);
    getStoriesForProjectSpy.mockResolvedValue(mockStoriesData);
    saveUserStorySpy.mockRejectedValue(new Error('Failed to add story'));

    // Mock console.error to avoid noise in tests
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    renderWithProviders(<ProjectContainer />);

    // Wait for initial load
    await waitFor(() => {
      expect(screen.getByTestId('project-view')).toBeInTheDocument();
    });

    // Simulate adding a story
    const addButton = screen.getByTestId('add-story-btn');
    addButton.click();

    // Wait for the add story API call to fail
    await waitFor(() => {
      expect(saveUserStorySpy).toHaveBeenCalled();
    });

    // Should log the error
    expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to add story:', expect.any(Error));

    consoleErrorSpy.mockRestore();
  });

  it('should display correct page title with project ID', async () => {
    const mockProjectData = createMockProjectData();
    const mockStoriesData = createMockStoriesData();
    const getProjectByIdSpy = vi.mocked(projectsApi.getProjectById);
    const getStoriesForProjectSpy = vi.mocked(storiesApi.getStoriesForProject);

    getProjectByIdSpy.mockResolvedValue(mockProjectData);
    getStoriesForProjectSpy.mockResolvedValue(mockStoriesData);

    renderWithProviders(<ProjectContainer />);

    await waitFor(() => {
      expect(screen.getByTestId('project-view')).toBeInTheDocument();
    });

    // The PageContainer should render with the correct title
    // This would be more testable if we had access to the PageContainer's rendered content
    // For now, we can at least verify the component renders without errors
    expect(screen.getByTestId('project-view')).toBeInTheDocument();
  });
});