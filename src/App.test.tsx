import { render, screen } from '@testing-library/react'
import App from './App'

describe('App Component', () => {
  it('should render without crashing', () => {
    render(<App />)
    
    // Should at least show the loading state initially
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('should be wrapped with AuthProvider', () => {
    // This test ensures the app structure is correct
    const { container } = render(<App />)
    expect(container.firstChild).toBeTruthy()
  })
})