import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { reactRouterDevTools } from 'react-router-devtools';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), reactRouterDevTools()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
})
