# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AF Tracker is a React + TypeScript application with Firebase authentication, built with Vite and deployed to Firebase Hosting. The application implements dual authentication (Google OAuth and Email/Password) with a clean separation of concerns using React Context.

## Development Commands

### Essential Commands
- `npm run dev` - Start development server with HMR
- `npm run test` - Run tests in watch mode 
- `npm run test --run` - Run tests once (used in CI)
- `npm run build` - Build for production (TypeScript check + Vite build)
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build locally

### Testing Commands
- `npm run test src/auth/AuthContext.test.tsx` - Run specific test file
- `npm run test --run src/auth/` - Run all auth tests once

## Architecture

### Authentication System
The authentication system follows a Provider/Context pattern with clear separation:

1. **AuthContext** (`src/auth/AuthContext.tsx`) - Defines the authentication contract and `useAuth` hook
2. **AuthProvider** (`src/auth/AuthProvider.tsx`) - Implements authentication logic and Firebase integration
3. **SignIn Component** (`src/auth/SignIn.tsx`) - Handles both Google and Email/Password authentication with form validation

Key pattern: AuthContext only defines the interface, AuthProvider implements the logic. This separation makes testing easier and follows dependency inversion.

### App Structure
- **App.tsx** - Root component wrapped with AuthProvider
- **AppContent** - Inner component that conditionally renders based on authentication state:
  - Loading state during auth check
  - SignIn component for unauthenticated users
  - Main app content for authenticated users

### Firebase Configuration
- **src/firebase.ts** - Firebase initialization and exports
- **firebaseConfig.json** - Firebase configuration (gitignored, created by CI/CD)
- Configuration is injected via GitHub secrets during deployment

### Testing Strategy
- **Vitest** with jsdom environment for component testing
- **React Testing Library** for component interactions
- **Firebase mocking** in `src/test/setup.ts` with proper TypeScript types
- Test globals enabled via `vite.config.ts` and `tsconfig.app.json`

## Important Implementation Details

### Firebase Configuration
The app expects `firebaseConfig.json` in the root directory. In local development, this file should exist. In CI/CD, it's generated from the `FIREBASE_CONFIG_JSON` GitHub secret (base64 encoded).

### Authentication Flow
1. App loads with AuthProvider managing auth state
2. `onAuthStateChanged` listener updates user state
3. Conditional rendering based on auth state:
   - `loading: true` → Loading spinner
   - `user: null` → SignIn component
   - `user: User` → Main app content

### Test Configuration
- Vitest globals enabled in `vite.config.ts` with `globals: true`
- TypeScript knows about test globals via `"types": ["vitest/globals"]` in `tsconfig.app.json`
- Firebase is mocked in `src/test/setup.ts` with type-safe callback handling

### CI/CD Pipeline
GitHub Actions workflow:
1. Checkout code
2. Install dependencies (`npm ci`)
3. Create Firebase config from secret
4. Run tests (`npm run test --run`)
5. Build application (`npm run build`)
6. Deploy to Firebase Hosting

## File Structure Notes

### Critical Files
- `src/auth/` - Authentication module (Context, Provider, SignIn component)
- `src/test/setup.ts` - Test configuration and Firebase mocking
- `vite.config.ts` - Vite configuration with test setup
- `firebase.json` - Firebase hosting configuration
- `.github/workflows/` - CI/CD pipeline configuration

### Configuration Files
- `tsconfig.app.json` - Main TypeScript config with Vitest globals
- `tsconfig.node.json` - Node.js TypeScript config
- `firebaseConfig.json` - Firebase config (gitignored, auto-generated in CI)

## Development Patterns

### Import Type Safety
Use `import type` for type-only imports when `verbatimModuleSyntax` is enabled:
```typescript
import type { ReactNode } from 'react'
import type { User } from 'firebase/auth'
```

### Error Boundaries
The `useAuth` hook includes a safety check to ensure it's used within AuthProvider context, throwing a descriptive error if not.

### Test Mocking
Firebase functions are mocked in `src/test/setup.ts` with proper TypeScript types. The mock includes callback validation to prevent runtime errors during testing.