import { useAuth } from './auth/AuthContext'
import { AuthProvider } from './auth/AuthProvider'
import { SignIn } from './auth/SignIn'
import './App.css'
import { Button, Container, Typography } from '@mui/material'
import Dashboard from './features/dashboard';

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
      <Typography variant='h1'>AF Tracker</Typography>
      <Typography variant='body1'>Welcome, {user.email}</Typography>
      <Button
        color='secondary'
        variant='contained'
        onClick={signOut}
      >
        Sign Out
      </Button>
      <Dashboard />
    </div>

  )
}

function App() {
  return (
    <AuthProvider>
      <Container maxWidth="sm">
        <AppContent />
      </Container>
    </AuthProvider>
  )
}

export default App
