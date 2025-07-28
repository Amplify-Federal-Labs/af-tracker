import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import App from './App';
import Layout from './layouts/dashboard';
import DashboardPage from './pages';
import EmployeesCrudPage from './pages/employees';
import SignInPage from './pages/signin';
import ProjectListContainer from './pages/projects';

// Create a client
const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: '/',
        Component: Layout,
        children: [
          {
            path: '',
            Component: DashboardPage,
          },
          {
            path: 'projects/:projectId?/*',
            Component: ProjectListContainer,
          },
          {
            path: 'employees/:employeeId?/*',
            Component: EmployeesCrudPage,
          },
        ],
      },
      {
        path: '/sign-in',
        Component: SignInPage,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);