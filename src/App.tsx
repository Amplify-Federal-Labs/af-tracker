import { useAuth } from './auth/AuthContext'
import { AuthProvider } from './auth/AuthProvider'
import { SignIn } from './auth/SignIn'
import './App.css'

const AppContent = () => {
  const { user, loading, signOut } = useAuth()

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <p>Loading...</p>
      </div>
    )
  }

  if (!user) {
    return <SignIn />
  }

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>AF Tracker</h1>
      <p>Welcome, {user.email}</p>
      <button
        onClick={signOut}
        style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '1rem'
        }}
      >
        Sign Out
      </button>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
