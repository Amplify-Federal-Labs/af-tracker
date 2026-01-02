import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Select,
  MenuItem,
  FormControl,
  IconButton,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Work,
  Autorenew,
  Inventory,
  AcUnit,
  CheckCircle,
  Block,
  LibraryBooks,
  Label,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

export const DRAWER_WIDTH = 190;
export const DRAWER_WIDTH_COLLAPSED = 56;

interface LeftSidebarProps {
  open?: boolean;
  activeViews?: string[];
  onToggleView?: (view: string) => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

const SidebarDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'collapsed',
})<{ collapsed: boolean }>(({ theme, collapsed }) => ({
  width: collapsed ? DRAWER_WIDTH_COLLAPSED : DRAWER_WIDTH,
  flexShrink: 0,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  '& .MuiDrawer-paper': {
    width: collapsed ? DRAWER_WIDTH_COLLAPSED : DRAWER_WIDTH,
    boxSizing: 'border-box',
    marginTop: 50, // Height of top nav
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
  },
}));

const SidebarHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
}));

const SidebarFooter = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2, 1),
  marginTop: 'auto',
  borderTop: `1px solid ${theme.palette.divider}`,
}));

const DisplayModeSelect = styled(FormControl)(({ theme }) => ({
  width: '100%',
  '& .MuiSelect-select': {
    fontSize: 12,
    padding: theme.spacing(1),
  },
}));

const navItems = [
  { id: 'my-work', label: 'My Work', icon: <Work /> },
  { id: 'current-iteration', label: 'Current Iteration', icon: <Autorenew /> },
  { id: 'backlog', label: 'Backlog', icon: <Inventory /> },
  { id: 'icebox', label: 'Icebox', icon: <AcUnit /> },
  { id: 'done', label: 'Done', icon: <CheckCircle /> },
  { id: 'blocked', label: 'Blocked', icon: <Block /> },
  { id: 'epics', label: 'Epics', icon: <LibraryBooks /> },
  { id: 'labels', label: 'Labels', icon: <Label /> },
];

const LeftSidebar = ({
  open = true,
  activeViews = ['current-iteration'],
  onToggleView,
  collapsed = false,
  onToggleCollapse,
}: LeftSidebarProps) => {
  const [displayMode, setDisplayMode] = useState('normal');

  const handleToggleView = (viewId: string) => {
    if (onToggleView) {
      onToggleView(viewId);
    }
  };

  const handleToggleCollapse = () => {
    if (onToggleCollapse) {
      onToggleCollapse();
    }
  };

  const isViewActive = (viewId: string) => activeViews.includes(viewId);

  return (
    <SidebarDrawer variant="permanent" open={open} collapsed={collapsed}>
      <SidebarHeader>
        <IconButton size="small" aria-label="Toggle menu" onClick={handleToggleCollapse}>
          <MenuIcon fontSize="small" />
        </IconButton>
      </SidebarHeader>

      <List component="nav">
        {navItems.map((item) => (
          <ListItemButton
            key={item.id}
            selected={isViewActive(item.id)}
            onClick={() => handleToggleView(item.id)}
          >
            <ListItemIcon sx={{ minWidth: collapsed ? 'auto' : 40 }}>{item.icon}</ListItemIcon>
            {!collapsed && <ListItemText primary={item.label} />}
          </ListItemButton>
        ))}
      </List>

      {!collapsed && (
        <SidebarFooter>
          <DisplayModeSelect size="small">
            <Select
              value={displayMode}
              onChange={(e) => setDisplayMode(e.target.value)}
              displayEmpty
            >
              <MenuItem value="normal">Display:Normal</MenuItem>
              <MenuItem value="compact">Display:Compact</MenuItem>
              <MenuItem value="comfortable">Display:Comfortable</MenuItem>
            </Select>
          </DisplayModeSelect>
        </SidebarFooter>
      )}
    </SidebarDrawer>
  );
};

export default LeftSidebar;
