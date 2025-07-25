import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SignIn } from './SignIn'
import { AuthProvider } from './AuthProvider'
import { mockSignInWithPopup, mockSignInWithEmailAndPassword, mockCreateUserWithEmailAndPassword } from '../test/setup'

const SignInWithProvider = () => (
  <AuthProvider>
    <SignIn />
  </AuthProvider>
)

describe('SignIn Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render sign-in form with Google and Email options', () => {
    render(<SignInWithProvider />)

    expect(screen.getByText('Sign In')).toBeInTheDocument()
    expect(screen.getByText('Sign in with Google')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
    expect(screen.getByText('Sign In with Email')).toBeInTheDocument()
    expect(screen.getByText("Don't have an account? Sign up")).toBeInTheDocument()
  })

  it('should handle Google sign-in', async () => {
    const user = userEvent.setup()
    render(<SignInWithProvider />)

    const googleButton = screen.getByText('Sign in with Google')
    await user.click(googleButton)

    expect(mockSignInWithPopup).toHaveBeenCalled()
  })

  it('should handle email/password sign-in', async () => {
    const user = userEvent.setup()
    render(<SignInWithProvider />)

    const emailInput = screen.getByLabelText('Email')
    const passwordInput = screen.getByLabelText('Password')
    const signInButton = screen.getByText('Sign In with Email')

    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password123')
    await user.click(signInButton)

    expect(mockSignInWithEmailAndPassword).toHaveBeenCalledWith(expect.any(Object), 'test@example.com', 'password123')
  })

  it('should toggle to sign-up mode', async () => {
    const user = userEvent.setup()
    render(<SignInWithProvider />)

    const signUpLink = screen.getByText("Don't have an account? Sign up")
    await user.click(signUpLink)

    expect(screen.getByText('Sign Up')).toBeInTheDocument()
    expect(screen.getByText('Create Account')).toBeInTheDocument()
    expect(screen.getByText('Already have an account? Sign in')).toBeInTheDocument()
  })

  it('should handle sign-up with email/password', async () => {
    const user = userEvent.setup()
    render(<SignInWithProvider />)

    // Switch to sign-up mode
    const signUpLink = screen.getByText("Don't have an account? Sign up")
    await user.click(signUpLink)

    const emailInput = screen.getByLabelText('Email')
    const passwordInput = screen.getByLabelText('Password')
    const createAccountButton = screen.getByText('Create Account')

    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password123')
    await user.click(createAccountButton)

    expect(mockCreateUserWithEmailAndPassword).toHaveBeenCalledWith(expect.any(Object), 'test@example.com', 'password123')
  })

  it('should show validation errors for empty fields', async () => {
    const user = userEvent.setup()
    render(<SignInWithProvider />)

    const signInButton = screen.getByText('Sign In with Email')
    await user.click(signInButton)

    await waitFor(() => {
      expect(screen.getByText('Email is required')).toBeInTheDocument()
      expect(screen.getByText('Password is required')).toBeInTheDocument()
    })
  })
})