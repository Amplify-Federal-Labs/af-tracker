# AF Tracker

A modern project and employee management dashboard built with React, TypeScript, and Firebase.

## Features

- **Project Management**: Create, view, and manage projects with a clean card-based interface
- **User Story Tracking**: Kanban-style board with Done/Backlog/Icebox columns for each project
- **Employee Management**: Track employee information and assignments
- **Firebase Authentication**: Secure user authentication and session management
- **Real-time Updates**: Live data synchronization with React Query
- **Responsive Design**: Material-UI components with mobile-first approach
- **Comprehensive Testing**: Unit test coverage with Vitest and React Testing Library

## Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **UI Framework**: Material-UI (MUI) with Toolpad Core
- **Authentication**: Firebase Auth
- **Backend**: Firebase Functions
- **State Management**: React Query for server state
- **Routing**: React Router v7
- **Testing**: Vitest + React Testing Library + Mock Service Worker

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- Firebase project with Authentication and Functions enabled
- Firebase CLI installed globally

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd firebase-vite
```

2. Install dependencies:
```bash
npm install
```

3. Configure Firebase:
   - Add your Firebase configuration to `firebaseConfig.json`
   - Set up environment variables in `.env`:
     ```
     VITE_BACKEND_BASE_URL_TEMPLATE=https://us-central1-<your-project-id>.cloudfunctions.net/<<>>
     ```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or next available port).

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run preview` - Preview production build
- `npm test` - Run unit tests
- `eslint src/` - Run linting
- `tsc --noEmit` - Type checking

### Project Structure

```
src/
├── App.tsx              # Main app with navigation and auth
├── main.tsx             # App entry point with routing
├── SessionContext.ts    # Authentication context
├── api/                 # API layer with Firebase integration
│   ├── index.ts         # Main API functions (projects)
│   ├── stories.ts       # User story API functions
│   └── utils.ts         # API utilities
├── firebase/            # Firebase configuration
│   ├── auth.ts          # Auth utilities
│   └── firebaseConfig.ts # Firebase initialization
├── layouts/             # Dashboard layouts
├── models/              # TypeScript interfaces
│   ├── project.ts       # Project interface definitions
│   ├── userStory.ts     # User story interface definitions
│   └── user.ts          # User interface definitions
├── data/                # Static/mock data
└── pages/               # Route components
    ├── employees.tsx    # Employee management
    ├── index.tsx        # Dashboard home
    ├── signin.tsx       # Authentication page
    ├── project/         # Project detail pages
    │   ├── index.tsx           # ProjectContainer component
    │   ├── index.test.tsx      # ProjectContainer unit tests (8 tests)
    │   ├── project.tsx         # ProjectView component
    │   ├── backlog.tsx         # Backlog column component
    │   ├── done.tsx            # Done column component
    │   └── icebox.tsx          # Icebox column component
    └── projects/        # Project list pages
        ├── index.tsx           # ProjectListContainer component
        ├── index.test.tsx      # ProjectListContainer unit tests (4 tests)
        ├── projectList.tsx     # Project grid display
        ├── projectCard.tsx     # Individual project cards
        ├── projectDetailDialog.tsx # Add/edit project form
        └── addProjectFab.tsx   # Floating action button
```

### Key Features Implementation

#### Project Management
- **Add Projects**: Click the floating action button (FAB) to open the project creation dialog
- **Form Validation**: Required fields with real-time validation
- **Optimistic Updates**: UI updates immediately while API calls process in background
- **Project Details**: Navigate to individual projects to manage user stories

#### User Story Management
- **Kanban Board**: Done/Backlog/Icebox columns for organizing user stories
- **Story Types**: Feature, Bug, Design, Chore, and Release story types
- **Story States**: Unscheduled, Unstarted, Started, Finished, Accepted, Rejected
- **Add Stories**: Create new user stories with title, description, and metadata

#### Authentication Flow
- Firebase Auth integration with persistent sessions
- Protected routes with automatic redirects
- User context available throughout the application

#### API Integration
- Centralized API client with Firebase Authentication headers
- React Query for caching, background updates, and error handling
- TypeScript interfaces for type-safe API responses

## Backend Requirements

The application expects Firebase Functions with the following endpoints:

**Project Management:**
- `getProjects` - Returns array of Project objects
- `addProject` - Creates new project, expects CreateProjectRequest

**User Story Management:**
- `getUserStoriesInProject` - Returns UserStoriesInProject object with Done/Backlog/Icebox arrays
- `addUserStoryToProject` - Creates new user story, expects CreateStoryRequest

### Data Models

**Project:**
```typescript
interface Project {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
}

interface CreateProjectRequest {
    name: string;
    description: string;
}
```

**User Story:**
```typescript
interface UserStory {
    id: string;
    projectId: string;
    type: "feature" | "design" | "bug" | "chore" | "release";
    title: string;
    requester: User;
    owners: User[];
    points?: number;
    state: "unscheduled" | "unstarted" | "started" | "finished" | "accepted" | "rejected";
    blockers: Impediment[];
    description: string;
    labels: string[];
    tasks: Task[];
    createdAt: Date;
    createdBy: User;
}

interface UserStoriesInProject {
    done: UserStory[];
    backlog: UserStory[];
    icebox: UserStory[];
}

interface CreateStoryRequest {
    type: StoryType;
    title: string;
    description: string;
    labels: string[];
    tasks: Task[];
}
```

## Testing

The application includes comprehensive unit test coverage using Vitest and React Testing Library.

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Test Coverage

- **ProjectListContainer** (`src/pages/projects/index.test.tsx`): 4 comprehensive tests
  - Loading states and error handling
  - Successful project list loading and display
  - Empty state handling
  - Project list interactions

- **ProjectContainer** (`src/pages/project/index.test.tsx`): 8 comprehensive tests
  - Missing project ID validation
  - Loading and error states
  - User story data loading and display
  - Story creation success and failure scenarios
  - Empty data handling

### Testing Patterns

- **Mocking**: API functions mocked with vi.mock for isolated testing
- **Router Testing**: BrowserRouter wrapper for components using React Router hooks
- **Query Client**: React Query setup with retry disabled for predictable tests
- **Component Isolation**: Child components mocked to test parent logic
- **Type Safety**: All mocks and test data use proper TypeScript interfaces

## Deployment

This application is designed to work with:
- **Frontend**: Vercel, Netlify, or any static hosting
- **Backend**: Firebase Functions
- **Database**: Firebase Firestore (recommended)

## Contributing

1. Follow the existing code style and patterns
2. Use TypeScript for all new code (avoid `any` type)
3. Add proper error handling for API calls
4. Write unit tests for new components and features
5. Run tests and type checking before submitting: `npm test && tsc --noEmit`
6. Update documentation for new features
7. Follow TDD practices when possible: write failing tests first, implement minimal code to pass, then refactor

## License

[Add your license information here]