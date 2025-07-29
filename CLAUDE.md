# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

- **Development server**: `npm run dev` - Starts Vite development server
- **Preview build**: `npm run preview` - Preview production build locally
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

### Project Structure
```
src/
├── App.tsx              # Main app component with navigation and auth
├── main.tsx             # App entry point with routing setup
├── SessionContext.ts    # Authentication session context
├── api/                 # API layer with Axios client
├── data/                # Static/mock data
├── firebase/            # Firebase configuration and auth utilities
├── layouts/             # Dashboard layout components
├── models/              # TypeScript interfaces and types
└── pages/               # Route components (dashboard, projects, employees, signin)
```

### Key Architecture Patterns

**Authentication Flow**:
- Firebase Auth integration with session management via React Context
- Protected routes handled by Toolpad Core's ReactRouterAppProvider
- Authentication state persisted across page refreshes

**API Integration**:
- Centralized Axios client in `src/api/` with Firebase Authentication headers
- Backend URL configured via `VITE_BACKEND_BASE_URL_TEMPLATE` with Firebase Functions support
- React Query for server state management, caching, and optimistic updates
- OpenAPI specification available for API documentation
- API functions: `getProjects()`, `addProject(CreateProjectRequest)`

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

- Backend uses Firebase Functions with authenticated API calls
- Firebase project configuration required in `firebaseConfig.json`
- Uses React 19 with StrictMode enabled
- TypeScript strict mode configuration
- Material-UI theming system integration
- Environment variables:
  - `VITE_BACKEND_BASE_URL_TEMPLATE`: Firebase Functions URL template pattern

### Project Management Features

- **Project List**: Grid-based project display with cards
- **Add Project**: FAB button opens modal dialog for project creation
- **Project Details**: Form validation with required name and description fields
- **Real-time Updates**: React Query automatically refreshes project list after additions