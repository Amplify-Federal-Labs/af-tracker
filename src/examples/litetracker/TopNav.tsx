import { IconButtonRegular, TextButton } from './design-system';
import {
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  TextField,
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
        <TextButton
          onClick={handleProjectMenuClick}
          endIcon={open ? <ExpandLess /> : <ExpandMore />}
          sx={{
            minWidth: 200,
            marginRight: 2,
            color: 'sidebar.main',
          }}
        >
          {selectedProject}
        </TextButton>

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

          <ProjectMenuItem
            onClick={() => handleProjectSelect('Tracker Tracker')}
            selected={selectedProject === 'Tracker Tracker'}
          >
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

          <IconButtonRegular size="small" color="inherit" aria-label="Help">
            <Help fontSize="small" />
          </IconButtonRegular>

          <WhatsNew>WHAT'S NEW</WhatsNew>

          <Box>HELP</Box>

          <TextButton
            endIcon={<ExpandMore />}
            sx={{
              color: 'sidebar.main',
            }}
          >
            SANG YUM
          </TextButton>
        </RightSection>
      </Toolbar>
    </StyledAppBar>
  );
};

export default TopNav;

