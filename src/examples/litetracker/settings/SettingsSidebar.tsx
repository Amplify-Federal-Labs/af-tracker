import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { styled } from '@mui/material/styles';

export const SETTINGS_SIDEBAR_WIDTH = 200;

interface SettingsSidebarProps {
  activeView?: string;
  onViewChange?: (view: string) => void;
}

const SidebarDrawer = styled(Drawer)(({ theme }) => ({
  width: SETTINGS_SIDEBAR_WIDTH,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: SETTINGS_SIDEBAR_WIDTH,
    boxSizing: 'border-box',
    marginTop: 50, // Height of top nav
    backgroundColor: theme.palette.sidebar.main,
    borderRight: 'none',
  },
}));

const navItems = [
  { id: 'project-settings', label: 'Project Settings' },
  { id: 'manage-review-types', label: 'Manage Review Types' },
  { id: 'recover-deleted-stories', label: 'Recover Deleted Stories' },
  { id: 'manage-custom-templates', label: 'Manage Custom Templates' },
];

const SettingsSidebar = ({ activeView = 'project-settings', onViewChange }: SettingsSidebarProps) => {
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
              py: 1.5,
              px: 2,
              '&.Mui-selected': {
                backgroundColor: 'rgba(82, 106, 132, 0.3)',
              },
            }}
          >
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{
                fontSize: 14,
                fontWeight: isViewActive(item.id) ? 500 : 400,
              }}
            />
          </ListItemButton>
        ))}
      </List>
    </SidebarDrawer>
  );
};

export default SettingsSidebar;
