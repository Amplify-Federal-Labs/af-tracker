import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Select,
  MenuItem,
  FormControl,
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
import { useState } from 'react';
import { CollapsibleSidebar, IconButtonRegular } from '../design-system';

export const DRAWER_WIDTH = 190;
export const DRAWER_WIDTH_COLLAPSED = 56;

interface LeftSidebarProps {
  open?: boolean;
  activeViews?: string[];
  onToggleView?: (view: string) => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

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
    <CollapsibleSidebar
      width={DRAWER_WIDTH}
      collapsedWidth={DRAWER_WIDTH_COLLAPSED}
      collapsed={collapsed}
      topOffset={50}
      open={open}
    >
      <Box
        sx={(theme) => ({
          padding: theme.spacing(1),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
        })}
      >
        <IconButtonRegular size="small" aria-label="Toggle menu" onClick={handleToggleCollapse}>
          <MenuIcon fontSize="small" />
        </IconButtonRegular>
      </Box>

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
        <Box
          sx={(theme) => ({
            padding: theme.spacing(2, 1),
            marginTop: 'auto',
            borderTop: `1px solid ${theme.palette.divider}`,
          })}
        >
          <FormControl
            size="small"
            sx={(theme) => ({
              width: '100%',
              '& .MuiSelect-select': {
                fontSize: 12,
                padding: theme.spacing(1),
              },
            })}
          >
            <Select
              value={displayMode}
              onChange={(e) => setDisplayMode(e.target.value)}
              displayEmpty
            >
              <MenuItem value="normal">Display:Normal</MenuItem>
              <MenuItem value="compact">Display:Compact</MenuItem>
              <MenuItem value="comfortable">Display:Comfortable</MenuItem>
            </Select>
          </FormControl>
        </Box>
      )}
    </CollapsibleSidebar>
  );
};

export default LeftSidebar;
