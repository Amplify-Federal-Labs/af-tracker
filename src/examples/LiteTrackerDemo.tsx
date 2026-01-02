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

const LiteTrackerDemo = () => {
  const [visibleColumns, setVisibleColumns] = useState<string[]>(['current-iteration', 'backlog', 'icebox']);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Map routes to tab indices
  const routeToTab: Record<string, number> = {
    '/': 0,
    '/analytics': 1,
    '/members': 2,
    '/integrations': 3,
    '/settings': 4,
  };

  const tabToRoute: string[] = ['/', '/analytics', '/members', '/integrations', '/settings'];

  const currentTab = routeToTab[location.pathname] ?? 0;

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
            path="/"
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
          <Route path="/analytics" element={<AnalyticsTab />} />
          <Route path="/members" element={<MembersTab />} />
          <Route path="/integrations" element={<IntegrationsTab />} />
          <Route path="/settings" element={<SettingsTab />} />
        </Routes>
      </LiteTrackerLayout>
    </ThemeProvider>
  );
};

export default LiteTrackerDemo;
