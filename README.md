# AF Tracker

A modern project and employee management dashboard built with React, TypeScript, and Firebase.

## Features

- **Project Management**: Create, view, and manage projects with a clean card-based interface
- **Employee Management**: Track employee information and assignments
- **Firebase Authentication**: Secure user authentication and session management
- **Real-time Updates**: Live data synchronization with React Query
- **Responsive Design**: Material-UI components with mobile-first approach

## Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **UI Framework**: Material-UI (MUI) with Toolpad Core
- **Authentication**: Firebase Auth
- **Backend**: Firebase Functions
- **State Management**: React Query for server state
- **Routing**: React Router v7

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
- `eslint src/` - Run linting
- `tsc --noEmit` - Type checking

### Project Structure

```
src/
├── App.tsx              # Main app with navigation and auth
├── main.tsx             # App entry point with routing
├── SessionContext.ts    # Authentication context
├── api/                 # API layer with Firebase integration
│   ├── index.ts         # API exports
│   └── projects.ts      # Project-related API calls
├── firebase/            # Firebase configuration
│   ├── auth.ts          # Auth utilities
│   └── firebaseConfig.ts # Firebase initialization
├── layouts/             # Dashboard layouts
├── models/              # TypeScript interfaces
├── data/                # Static/mock data
└── pages/               # Route components
    ├── employees.tsx    # Employee management
    ├── index.tsx        # Dashboard home
    ├── signin.tsx       # Authentication page
    └── projects/        # Project management
        ├── index.tsx            # Project list container
        ├── projectList.tsx      # Project grid display
        ├── projectCard.tsx      # Individual project cards
        ├── projectDetailDialog.tsx # Add/edit project form
        └── addProjectFab.tsx    # Floating action button
```

### Key Features Implementation

#### Project Management
- **Add Projects**: Click the floating action button (FAB) to open the project creation dialog
- **Form Validation**: Required fields with real-time validation
- **Optimistic Updates**: UI updates immediately while API calls process in background

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

- `getProjects` - Returns array of Project objects
- `addProject` - Creates new project, expects CreateProjectRequest

### Project Data Model

```typescript
interface Project {
    id: number;
    name: string;
    description: string;
    createdAt: Date;
}

interface CreateProjectRequest {
    name: string;
    description: string;
}
```

## Deployment

This application is designed to work with:
- **Frontend**: Vercel, Netlify, or any static hosting
- **Backend**: Firebase Functions
- **Database**: Firebase Firestore (recommended)

## Contributing

1. Follow the existing code style and patterns
2. Use TypeScript for all new code
3. Add proper error handling for API calls
4. Test components thoroughly before submitting
5. Update documentation for new features

## License

[Add your license information here]