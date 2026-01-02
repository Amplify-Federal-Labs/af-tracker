import {
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  TextField,
  IconButton,
  Box,
  InputAdornment,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Search,
  Help,
  ExpandMore,
  Add,
  Home,
  ExpandLess,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

interface TopNavProps {
  projectName?: string;
  activeTab?: number;
  onTabChange?: (tab: number) => void;
}

const StyledAppBar = styled(AppBar)({
  zIndex: 1300, // Above drawer
});

const ProjectSelectorButton = styled(Box)(({ theme }) => ({
  minWidth: 200,
  marginRight: theme.spacing(3),
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1, 1.5),
  color: theme.palette.sidebar.main,
  fontSize: 14,
  fontWeight: 500,
  cursor: 'pointer',
  borderRadius: 4,
  '&:hover': {
    backgroundColor: theme.palette.action.brownHover,
  },
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    minWidth: 300,
    marginTop: theme.spacing(1),
    backgroundColor: theme.palette.background.paper, // White
    color: theme.palette.sidebar.main, // Dark text
    boxShadow: theme.shadows[8],
  },
}));

const ProjectMenuItem = styled(MenuItem)(({ theme }) => ({
  fontSize: 14,
  padding: theme.spacing(1.5, 2),
  color: theme.palette.sidebar.main, // Dark text for readability
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '&.Mui-selected': {
    backgroundColor: theme.palette.action.selected,
    '&:hover': {
      backgroundColor: theme.palette.action.selected,
    },
  },
}));

const CreateProjectItem = styled(MenuItem)(({ theme }) => ({
  fontSize: 14,
  padding: theme.spacing(1.5, 2),
  color: theme.palette.primary.main,
  fontWeight: 500,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '& .MuiListItemIcon-root': {
    color: theme.palette.primary.main,
    minWidth: 36,
  },
}));

const DashboardItem = styled(MenuItem)(({ theme }) => ({
  fontSize: 14,
  padding: theme.spacing(1.5, 2),
  color: theme.palette.primary.main,
  fontWeight: 500,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '& .MuiListItemIcon-root': {
    color: theme.palette.primary.main,
    minWidth: 36,
  },
}));

const SearchField = styled(TextField)(({ theme }) => ({
  width: 250,
  '& .MuiInputBase-root': {
    height: 36,
  },
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1.5),
    fontSize: 13,
    '&::placeholder': {
      opacity: 0.7,
    },
  },
}));

const RightSection = styled(Box)(({ theme }) => ({
  marginLeft: 'auto',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const UserInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginLeft: theme.spacing(1),
  color: theme.palette.sidebar.main,
  fontSize: 14,
  fontWeight: 500,
  cursor: 'pointer',
  padding: theme.spacing(0.5, 1),
  borderRadius: 4,
  '&:hover': {
    backgroundColor: theme.palette.action.brownHover,
  },
}));

const WhatsNew = styled(Box)(({ theme }) => ({
  cursor: 'pointer',
  padding: theme.spacing(0.5, 1),
  borderRadius: 4,
  color: theme.palette.sidebar.main,
  '&:hover': {
    backgroundColor: theme.palette.action.brownHover,
  },
}));

const TopNav = ({ projectName = 'Tracker Tracker', activeTab = 0, onTabChange }: TopNavProps) => {
  const [selectedProject, setSelectedProject] = useState(projectName);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    if (onTabChange) {
      onTabChange(newValue);
    }
  };

  const handleProjectMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProjectMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProjectSelect = (projectName: string) => {
    setSelectedProject(projectName);
    handleProjectMenuClose();
  };

  return (
    <StyledAppBar position="fixed">
      <Toolbar>
        <ProjectSelectorButton onClick={handleProjectMenuClick}>
          {selectedProject}
          {open ? <ExpandLess sx={{ ml: 1 }} /> : <ExpandMore sx={{ ml: 1 }} />}
        </ProjectSelectorButton>

        <StyledMenu
          anchorEl={anchorEl}
          open={open}
          onClose={handleProjectMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <CreateProjectItem>
            <ListItemIcon>
              <Add fontSize="small" />
            </ListItemIcon>
            <ListItemText>Create Project</ListItemText>
          </CreateProjectItem>

          <Divider sx={{ my: 1 }} />

          <ProjectMenuItem onClick={() => handleProjectSelect('Example Project')}>
            Example Project
          </ProjectMenuItem>

          <ProjectMenuItem onClick={() => handleProjectSelect('Tracker Tracker')} selected={selectedProject === 'Tracker Tracker'}>
            Tracker Tracker
          </ProjectMenuItem>

          <Divider sx={{ my: 1 }} />

          <DashboardItem>
            <ListItemIcon>
              <Home fontSize="small" />
            </ListItemIcon>
            <ListItemText>Dashboard</ListItemText>
          </DashboardItem>
        </StyledMenu>

        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="STORIES" />
          <Tab label="ANALYTICS" />
          <Tab label="MEMBERS" />
          <Tab label="INTEGRATIONS" />
          <Tab label="MORE" />
        </Tabs>

        <RightSection>
          <SearchField
            placeholder="Search project"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          <IconButton size="small" color="inherit" aria-label="Help">
            <Help fontSize="small" />
          </IconButton>

          <WhatsNew>WHAT'S NEW</WhatsNew>

          <Box>HELP</Box>

          <UserInfo>
            SANG YUM
            <ExpandMore fontSize="small" sx={{ ml: 0.5 }} />
          </UserInfo>
        </RightSection>
      </Toolbar>
    </StyledAppBar>
  );
};

export default TopNav;
