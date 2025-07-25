import { useState } from 'react'
import type { FormEvent } from 'react'
import { useAuth } from './AuthContext'

export const SignIn = () => {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  
  const { signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuth()

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {}
    
    if (!email.trim()) {
      newErrors.email = 'Email is required'
    }
    
    if (!password.trim()) {
      newErrors.password = 'Password is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleEmailSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    try {
      if (isSignUp) {
        await signUpWithEmail(email, password)
      } else {
        await signInWithEmail(email, password)
      }
    } catch (error) {
      console.error('Authentication error:', error)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
    } catch (error) {
      console.error('Google sign-in error:', error)
    }
  }

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto', padding: '2rem' }}>
      <h1>{isSignUp ? 'Sign Up' : 'Sign In'}</h1>
      
      <button 
        onClick={handleGoogleSignIn}
        style={{ 
          width: '100%', 
          padding: '0.75rem', 
          marginBottom: '1rem',
          backgroundColor: '#4285f4',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Sign in with Google
      </button>

      <div style={{ textAlign: 'center', margin: '1rem 0' }}>
        <span>or</span>
      </div>

      <form onSubmit={handleEmailSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '0.5rem', 
              border: '1px solid #ccc',
              borderRadius: '4px',
              display: 'block',
              marginTop: '0.25rem'
            }}
          />
          {errors.email && (
            <span style={{ color: 'red', fontSize: '0.875rem' }}>
              {errors.email}
            </span>
          )}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '0.5rem', 
              border: '1px solid #ccc',
              borderRadius: '4px',
              display: 'block',
              marginTop: '0.25rem'
            }}
          />
          {errors.password && (
            <span style={{ color: 'red', fontSize: '0.875rem' }}>
              {errors.password}
            </span>
          )}
        </div>

        <button
          type="submit"
          style={{ 
            width: '100%', 
            padding: '0.75rem', 
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginBottom: '1rem'
          }}
        >
          {isSignUp ? 'Create Account' : 'Sign In with Email'}
        </button>
      </form>

      <div style={{ textAlign: 'center' }}>
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer' }}
        >
          {isSignUp 
            ? 'Already have an account? Sign in' 
            : "Don't have an account? Sign up"
          }
        </button>
      </div>
    </div>
  )
}