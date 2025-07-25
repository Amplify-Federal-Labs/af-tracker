import { render, screen, waitFor } from '@testing-library/react'
import { AuthProvider } from './AuthProvider'
import { useAuth } from './AuthContext'
import { mockAuth } from '../test/setup'

// Test component to access auth context
const TestComponent = () => {
  const { user, loading, signInWithGoogle, signInWithEmail, signUpWithEmail, signOut } = useAuth()
  
  return (
    <div>
      <div data-testid="loading">{loading.toString()}</div>
      <div data-testid="user">{user ? user.email || 'authenticated' : 'unauthenticated'}</div>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
      <button onClick={() => signInWithEmail('test@example.com', 'password')}>Sign in with Email</button>
      <button onClick={() => signUpWithEmail('test@example.com', 'password')}>Sign up with Email</button>
      <button onClick={signOut}>Sign out</button>
    </div>
  )
}

describe('AuthContext', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should provide initial state with no user and loading true', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    expect(screen.getByTestId('loading')).toHaveTextContent('true')
    expect(screen.getByTestId('user')).toHaveTextContent('unauthenticated')
  })

  it('should call onAuthStateChanged when mounted', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    expect(mockAuth.onAuthStateChanged).toHaveBeenCalledWith(mockAuth, expect.any(Function))
  })

  it('should provide sign-in and sign-out functions', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    expect(screen.getByText('Sign in with Google')).toBeInTheDocument()
    expect(screen.getByText('Sign in with Email')).toBeInTheDocument()
    expect(screen.getByText('Sign up with Email')).toBeInTheDocument()
    expect(screen.getByText('Sign out')).toBeInTheDocument()
  })
})