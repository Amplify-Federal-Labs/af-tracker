import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router';
import liteTrackerTheme from './litetracker-theme';
import LiteTrackerLayout from './litetracker/LiteTrackerLayout';
import StoriesTab from './litetracker/stories';
import AnalyticsTab from './litetracker/analytics';
import MembersTab from './litetracker/members';
import IntegrationsTab from './litetracker/integrations';
import SettingsTab from './litetracker/settings';

// Define route paths relative to /demo
const ROUTE_PATHS = {
  STORIES: '',
  ANALYTICS: 'analytics',
  MEMBERS: 'members',
  INTEGRATIONS: 'integrations',
  SETTINGS: 'settings',
} as const;

// Full paths for navigation (used in navigate and location comparison)
const FULL_ROUTES = {
  STORIES: '/demo',
  ANALYTICS: '/demo/analytics',
  MEMBERS: '/demo/members',
  INTEGRATIONS: '/demo/integrations',
  SETTINGS: '/demo/settings',
} as const;

const tabToRoute = [
  FULL_ROUTES.STORIES,
  FULL_ROUTES.ANALYTICS,
  FULL_ROUTES.MEMBERS,
  FULL_ROUTES.INTEGRATIONS,
  FULL_ROUTES.SETTINGS,
] as const;

const LiteTrackerDemo = () => {
  const [visibleColumns, setVisibleColumns] = useState<string[]>(['current-iteration', 'backlog', 'icebox']);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const tabIndex = tabToRoute.indexOf(location.pathname as typeof tabToRoute[number]);
  const currentTab = tabIndex === -1 ? 0 : tabIndex;

  const handleToggleView = (viewId: string) => {
    setVisibleColumns((prev) => {
      if (prev.includes(viewId)) {
        return prev.filter((id) => id !== viewId);
      } else {
        return [...prev, viewId];
      }
    });
  };

  const handleCloseColumn = (columnId: string) => {
    setVisibleColumns((prev) => prev.filter((id) => id !== columnId));
  };

  const handleToggleSidebarCollapse = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  const handleTabChange = (tab: number) => {
    navigate(tabToRoute[tab]);
  };

  return (
    <ThemeProvider theme={liteTrackerTheme}>
      <CssBaseline />
      <LiteTrackerLayout activeTab={currentTab} onTabChange={handleTabChange}>
        <Routes>
          <Route
            path={ROUTE_PATHS.STORIES}
            element={
              <StoriesTab
                visibleColumns={visibleColumns}
                onCloseColumn={handleCloseColumn}
                onToggleView={handleToggleView}
                sidebarCollapsed={sidebarCollapsed}
                onToggleSidebarCollapse={handleToggleSidebarCollapse}
              />
            }
          />
          <Route path={ROUTE_PATHS.ANALYTICS} element={<AnalyticsTab />} />
          <Route path={ROUTE_PATHS.MEMBERS} element={<MembersTab />} />
          <Route path={ROUTE_PATHS.INTEGRATIONS} element={<IntegrationsTab />} />
          <Route path={ROUTE_PATHS.SETTINGS} element={<SettingsTab />} />
        </Routes>
      </LiteTrackerLayout>
    </ThemeProvider>
  );
};

export default LiteTrackerDemo;
