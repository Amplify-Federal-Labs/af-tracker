import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import {
  BugReport as BugIcon,
  Build as ChoreIcon,
  Palette as DesignIcon,
  Star as FeatureIcon,
  Rocket as ReleaseIcon,
} from '@mui/icons-material';
import type { StoryType } from '../../../models/userStory';

interface StoryTypeSelectProps {
  value: StoryType;
  onChange: (type: StoryType) => void;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  fullWidth?: boolean;
  label?: string;
  required?: boolean;
}

const STORY_TYPE_OPTIONS: Array<{
  value: StoryType;
  label: string;
  icon: React.ReactElement;
  description: string;
}> = [
  {
    value: 'feature',
    label: 'Feature',
    icon: <FeatureIcon />,
    description: 'New functionality development',
  },
  {
    value: 'design',
    label: 'Design',
    icon: <DesignIcon />,
    description: 'UI/UX design tasks',
  },
  {
    value: 'bug',
    label: 'Bug',
    icon: <BugIcon />,
    description: 'Bug fixes and defect resolution',
  },
  {
    value: 'chore',
    label: 'Chore',
    icon: <ChoreIcon />,
    description: 'Maintenance and technical tasks',
  },
  {
    value: 'release',
    label: 'Release',
    icon: <ReleaseIcon />,
    description: 'Release preparation and deployment',
  },
];

const StoryTypeSelect = ({
  value,
  onChange,
  disabled = false,
  error = false,
  helperText,
  fullWidth = true,
  label = 'Story Type',
  required = false,
}: StoryTypeSelectProps) => {
  const handleChange = (event: SelectChangeEvent<StoryType>) => {
    onChange(event.target.value as StoryType);
  };

  const labelId = 'story-type-select-label';

  return (
    <FormControl fullWidth={fullWidth} error={error} disabled={disabled}>
      <InputLabel id={labelId} required={required}>
        {label}
      </InputLabel>
      <Select
        labelId={labelId}
        value={value}
        onChange={handleChange}
        label={label}
        aria-describedby={helperText ? 'story-type-helper-text' : undefined}
      >
        {STORY_TYPE_OPTIONS.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            <ListItemIcon sx={{ minWidth: 40 }}>
              {option.icon}
            </ListItemIcon>
            <ListItemText
              primary={option.label}
              secondary={option.description}
            />
          </MenuItem>
        ))}
      </Select>
      {helperText && (
        <FormHelperText id="story-type-helper-text">
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default StoryTypeSelect;