# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

- **Development server**: `npm run dev` - Starts Vite development server
- **Preview build**: `npm run preview` - Preview production build locally
- **Testing**: `npm test` - Run unit tests with Vitest
- **Linting**: `eslint src/` - Run ESLint on source files
- **Type checking**: `tsc --noEmit` - TypeScript type checking without emitting files

## Architecture Overview

This is a React + TypeScript application built with Vite, featuring Firebase authentication and a Material-UI based dashboard using Toolpad Core.

### Tech Stack
- **Frontend**: React 19 + TypeScript + Vite
- **UI Framework**: Material-UI (MUI) with Toolpad Core for dashboard layout
- **Authentication**: Firebase Auth
- **State Management**: React Query (@tanstack/react-query) for server state
- **Routing**: React Router v7
- **HTTP Client**: Axios
- **Validation**: Zod
- **Testing**: Vitest + React Testing Library + Mock Service Worker

### Project Structure
```
src/
├── App.tsx              # Main app component with navigation and auth
├── main.tsx             # App entry point with routing setup
├── SessionContext.ts    # Authentication session context
├── api/                 # API layer with Axios client
│   ├── index.ts         # API exports
│   ├── projects.ts      # Project API functions (getProjects, addProject, getProjectById)
│   └── stories.ts       # User story API functions (getUserStoriesInProject, addUserStoryToProject)
├── data/                # Static/mock data
├── firebase/            # Firebase configuration and auth utilities
├── layouts/             # Dashboard layout components
├── models/              # TypeScript interfaces and types
│   ├── project.ts       # Project interface definitions
│   ├── userStory.ts     # User story interface definitions
│   └── user.ts          # User interface definitions
└── pages/               # Route components (dashboard, projects, employees, signin)
    ├── project/         # Project detail pages
    │   ├── index.tsx           # ProjectContainer component
    │   ├── index.test.tsx      # ProjectContainer unit tests
    │   ├── project.tsx         # ProjectView component
    │   ├── backlog.tsx         # Backlog column component
    │   ├── done.tsx            # Done column component
    │   └── icebox.tsx          # Icebox column component
    └── projects/        # Project list pages
        ├── index.tsx           # ProjectListContainer component
        ├── index.test.tsx      # ProjectListContainer unit tests
        ├── projectList.tsx     # Project grid display
        ├── projectCard.tsx     # Individual project cards
        ├── projectDetailDialog.tsx # Add/edit project form
        └── addProjectFab.tsx   # Floating action button
```

### Key Architecture Patterns

**Authentication Flow**:
- Firebase Auth integration with session management via React Context
- Protected routes handled by Toolpad Core's ReactRouterAppProvider
- Authentication state persisted across page refreshes

**API Integration**:
- Centralized Axios client in `src/api/` with Firebase Authentication headers
- Backend URL configured via `VITE_BACKEND_BASE_URL` environment variable with default fallback
- React Query for server state management, caching, and optimistic updates
- RESTful API endpoints with proper HTTP methods
- API functions: 
  - Projects: `getProjects()`, `addProject(CreateProjectRequest)`, `getProjectById(projectId)`
  - User Stories: `getUserStoriesInProject(projectId)`, `addUserStoryToProject(projectId, request)`

**Dashboard Structure**:
- Uses Toolpad Core for consistent dashboard layout and navigation
- Navigation defined in App.tsx with segment-based routing
- Nested routing for detail views (projects/:projectId, employees/:employeeId)

**Firebase Configuration**:
- Configuration loaded from `firebaseConfig.json` at build time
- Centralized auth utilities in `src/firebase/auth.ts`

**Component Architecture**:
- Modular component structure with clear separation of concerns
- Dialog-based forms for data entry (ProjectDetailDialog)
- Floating Action Buttons (FAB) for primary actions
- Card-based layouts for data display
- Reusable components in dedicated directories

### Development Notes

- Backend uses RESTful API with authenticated calls
- Firebase project configuration required in `firebaseConfig.json`
- Uses React 19 with StrictMode enabled
- TypeScript strict mode configuration
- Material-UI theming system integration
- Environment variables:
  - `VITE_BACKEND_BASE_URL`: Backend API base URL (defaults to local Firebase Functions if not set)

### Project Management Features

- **Project List**: Grid-based project display with cards
- **Add Project**: FAB button opens modal dialog for project creation
- **Project Details**: Form validation with required name and description fields
- **Real-time Updates**: React Query automatically refreshes project list after additions
- **User Story Management**: Project detail view with Done/Backlog/Icebox columns
- **Story Creation**: Add new user stories to projects with type, title, and description

### Testing Strategy

- **Unit Tests**: Comprehensive test coverage using Vitest + React Testing Library
- **Component Testing**: Isolated testing with mocked dependencies
- **API Mocking**: Vi.mock for API functions and external dependencies
- **Router Testing**: BrowserRouter wrapping for components using React Router hooks
- **Query Client Testing**: React Query setup with retry disabled for predictable testing
- **Test Coverage**:
  - `src/pages/projects/index.test.tsx`: ProjectListContainer (4 tests)
  - `src/pages/project/index.test.tsx`: ProjectContainer (7 tests)

### Data Models

**Project**:
```typescript
interface Project {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
}
```

**User Story**:
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
```