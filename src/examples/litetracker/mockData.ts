export interface MockUser {
  id: string;
  name: string;
  initials: string;
}

export interface MockLabel {
  id: string;
  name: string;
  color: string;
}

export type StoryType = 'feature' | 'bug' | 'chore' | 'release';
export type StoryState = 'unstarted' | 'started' | 'finished' | 'delivered' | 'accepted' | 'rejected';

export interface MockStory {
  id: string;
  type: StoryType;
  title: string;
  description: string;
  state: StoryState;
  points?: number;
  labels: MockLabel[];
  owners: MockUser[];
  requester: MockUser;
  isFavorite: boolean;
  createdAt: Date;
}

// Mock Users
export const mockUsers: MockUser[] = [
  { id: '1', name: 'John Doe', initials: 'JD' },
  { id: '2', name: 'Jane Smith', initials: 'JS' },
  { id: '3', name: 'Bob Johnson', initials: 'BJ' },
  { id: '4', name: 'Alice Williams', initials: 'AW' },
];

// Mock Labels
export const mockLabels: MockLabel[] = [
  { id: '1', name: 'label1', color: '#E74C3C' },
  { id: '2', name: 'label2', color: '#3498DB' },
  { id: '3', name: 'label3', color: '#2ECC71' },
  { id: '4', name: 'icebox', color: '#95A5A6' },
  { id: '5', name: 'label4', color: '#F39C12' },
];

// Mock Stories for Current Iteration
export const currentIterationStories: MockStory[] = [
  {
    id: '1',
    type: 'feature',
    title: 'implement the first feature',
    description: 'This is the first feature to implement',
    state: 'unstarted',
    points: 2,
    labels: [mockLabels[0], mockLabels[1]],
    owners: [],
    requester: mockUsers[0],
    isFavorite: true,
    createdAt: new Date('2024-12-14'),
  },
  {
    id: '2',
    type: 'feature',
    title: 'this is a second feature',
    description: 'This is the second feature to implement',
    state: 'unstarted',
    labels: [mockLabels[2], mockLabels[1]],
    owners: [],
    requester: mockUsers[1],
    isFavorite: true,
    createdAt: new Date('2024-12-15'),
  },
];

// Mock Stories for Backlog
export const backlogStories: MockStory[] = [];

// Mock Stories for Icebox
export const iceboxStories: MockStory[] = [
  {
    id: '3',
    type: 'release',
    title: 'this is a first release',
    description: 'First release of the application',
    state: 'unstarted',
    labels: [mockLabels[3], mockLabels[4]],
    owners: [],
    requester: mockUsers[2],
    isFavorite: false,
    createdAt: new Date('2024-12-10'),
  },
];

// Mock Stories for Done
export const doneStories: MockStory[] = [];

// Mock Stories for Blocked
export const blockedStories: MockStory[] = [
  {
    id: '4',
    type: 'feature',
    title: 'this is a second feature',
    description: 'This feature is blocked',
    state: 'started',
    labels: [mockLabels[3], mockLabels[0]],
    owners: [],
    requester: mockUsers[1],
    isFavorite: true,
    createdAt: new Date('2024-12-12'),
  },
];

// Project metadata
export const mockProject = {
  id: 'proj-1',
  name: 'Tracker Tracker',
  currentIteration: {
    startDate: new Date('2024-12-14'),
    endDate: new Date('2025-01-04'),
    totalPoints: 2,
    completedPoints: 0,
  },
};
