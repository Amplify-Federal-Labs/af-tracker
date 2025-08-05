import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Chip,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import type { StoryState } from '../../../models/userStory';

interface StateSelectProps {
  state: StoryState;
  onChange: (state: StoryState) => void;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  fullWidth?: boolean;
  label?: string;
  required?: boolean;
}

const STATE_OPTIONS: Array<{
  value: StoryState;
  label: string;
  color: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
}> = [
  { value: 'unscheduled', label: 'Unscheduled', color: 'default' },
  { value: 'unstarted', label: 'Unstarted', color: 'info' },
  { value: 'started', label: 'Started', color: 'primary' },
  { value: 'finished', label: 'Finished', color: 'warning' },
  { value: 'accepted', label: 'Accepted', color: 'success' },
  { value: 'rejected', label: 'Rejected', color: 'error' },
];

const StateSelect = ({
  state,
  onChange,
  disabled = false,
  error = false,
  helperText,
  fullWidth = true,
  label = 'State',
  required = false,
}: StateSelectProps) => {
  const handleChange = (event: SelectChangeEvent<StoryState>) => {
    onChange(event.target.value as StoryState);
  };

  const labelId = 'state-select-label';

  return (
    <FormControl fullWidth={fullWidth} error={error} disabled={disabled}>
      <InputLabel id={labelId} required={required}>
        {label}
      </InputLabel>
      <Select
        labelId={labelId}
        value={state}
        onChange={handleChange}
        label={label}
        aria-describedby={helperText ? 'state-select-helper-text' : undefined}
        renderValue={(selected) => {
          const selectedOption = STATE_OPTIONS.find(option => option.value === selected);
          return selectedOption ? (
            <Chip
              label={selectedOption.label}
              color={selectedOption.color}
              size="small"
              variant="filled"
            />
          ) : selected;
        }}
      >
        {STATE_OPTIONS.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            <Chip
              label={option.label}
              color={option.color}
              size="small"
              variant="outlined"
            />
          </MenuItem>
        ))}
      </Select>
      {helperText && (
        <FormHelperText id="state-select-helper-text">
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default StateSelect;
