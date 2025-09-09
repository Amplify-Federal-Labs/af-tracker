import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  ListItemIcon,
  ListItemText,
  Stack,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import type { StoryType } from '../../../models/userStory';
import { STORY_TYPE_OPTIONS } from '../../../shared/constants.tsx';

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
        {Array.from(STORY_TYPE_OPTIONS.entries()).map(([value, option]) => (
          <MenuItem key={value} value={value}>
            <Stack direction="row">
                <ListItemIcon sx={{ minWidth: 40 }}>
                {option.icon}
                </ListItemIcon>
                <ListItemText primary={option.label} />
            </Stack>
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