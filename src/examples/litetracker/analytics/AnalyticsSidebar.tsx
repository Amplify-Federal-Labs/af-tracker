import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Home,
  Autorenew,
  Timer,
  Shield,
  Flag,
  Assignment,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

export const ANALYTICS_SIDEBAR_WIDTH = 295;

interface AnalyticsSidebarProps {
  activeView?: string;
  onViewChange?: (view: string) => void;
}

const SidebarDrawer = styled(Drawer)(({ theme }) => ({
  width: ANALYTICS_SIDEBAR_WIDTH,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: ANALYTICS_SIDEBAR_WIDTH,
    boxSizing: 'border-box',
    marginTop: 50, // Height of top nav
    backgroundColor: theme.palette.sidebar.main,
    borderRight: 'none',
  },
}));

const navItems = [
  { id: 'project-overview', label: 'Project Overview', icon: <Home /> },
  { id: 'iteration', label: 'Iteration', icon: <Autorenew /> },
  { id: 'cycle-time', label: 'Cycle Time', icon: <Timer /> },
  { id: 'epics', label: 'Epics', icon: <Shield /> },
  { id: 'releases-burndowns', label: 'Releases & Burndowns', icon: <Flag /> },
  { id: 'story-activity', label: 'Story Activity', icon: <Assignment /> },
];

const AnalyticsSidebar = ({ activeView = 'project-overview', onViewChange }: AnalyticsSidebarProps) => {
  const handleViewChange = (viewId: string) => {
    if (onViewChange) {
      onViewChange(viewId);
    }
  };

  const isViewActive = (viewId: string) => activeView === viewId;

  return (
    <SidebarDrawer variant="permanent">
      <List component="nav" sx={{ pt: 0 }}>
        {navItems.map((item) => (
          <ListItemButton
            key={item.id}
            selected={isViewActive(item.id)}
            onClick={() => handleViewChange(item.id)}
            sx={{
              py: 2,
              px: 3,
              '&.Mui-selected': {
                borderLeft: '4px solid',
                borderLeftColor: 'primary.main',
                backgroundColor: 'action.selected',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 48, color: 'inherit' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{
                fontSize: 15,
                fontWeight: isViewActive(item.id) ? 500 : 400,
              }}
            />
          </ListItemButton>
        ))}
      </List>
    </SidebarDrawer>
  );
};

export default AnalyticsSidebar;
