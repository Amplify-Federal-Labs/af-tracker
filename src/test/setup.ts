import '@testing-library/jest-dom'

// Mock Firebase Auth
const mockAuth = {
  currentUser: null,
  onAuthStateChanged: vi.fn((callback: (user: unknown) => void) => {
    // Only call callback if it's actually a function
    if (typeof callback === 'function') {
      setTimeout(() => callback(null), 0)
    }
    return () => {}
  }),
  signOut: vi.fn(() => Promise.resolve()),
}

const mockSignInWithGoogle = vi.fn(() => Promise.resolve())
const mockSignInWithEmailAndPassword = vi.fn(() => Promise.resolve({ user: { email: 'test@example.com' } }))
const mockCreateUserWithEmailAndPassword = vi.fn(() => Promise.resolve({ user: { email: 'test@example.com' } }))
const mockSignInWithPopup = vi.fn(() => Promise.resolve({ user: { email: 'test@example.com' } }))
const mockGoogleAuthProvider = vi.fn()

// Mock Firebase App and Analytics
vi.mock('firebase/app', () => ({
  initializeApp: vi.fn(),
}))

vi.mock('firebase/analytics', () => ({
  getAnalytics: vi.fn(),
}))

vi.mock('firebase/auth', () => ({
  getAuth: () => mockAuth,
  onAuthStateChanged: mockAuth.onAuthStateChanged,
  signOut: mockAuth.signOut,
  signInWithPopup: mockSignInWithPopup,
  signInWithEmailAndPassword: mockSignInWithEmailAndPassword,
  createUserWithEmailAndPassword: mockCreateUserWithEmailAndPassword,
  GoogleAuthProvider: mockGoogleAuthProvider,
}))

// Mock the firebase config file
vi.mock('../firebase', () => ({
  auth: mockAuth,
  analytics: {},
}))

// Export mocks for use in tests
export {
  mockAuth,
  mockSignInWithGoogle,
  mockSignInWithPopup,
  mockSignInWithEmailAndPassword,
  mockCreateUserWithEmailAndPassword,
  mockGoogleAuthProvider,
}