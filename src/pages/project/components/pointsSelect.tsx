import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";

interface PointsSelectProps {
  points?: number;
  onChange: (points?: number) => void;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  fullWidth?: boolean;
  label?: string;
  required?: boolean;
}

const POINT_OPTIONS: Array<{
  value: number | null;
  label: string;
}> = [
  { value: null, label: "Unspecified" },
  { value: 0, label: "0 point" },
  { value: 1, label: "1 point" },
  { value: 2, label: "2 points" },
  { value: 3, label: "3 points" },
];

const PointsSelect = ({
  points,
  onChange,
  disabled = false,
  error = false,
  helperText,
  fullWidth = true,
  label = "Story Points",
  required = false,
}: PointsSelectProps) => {
  const handleChange = (event: SelectChangeEvent<number | null>) => {
    const value = event.target.value;
    // Convert empty string to null, otherwise convert to number
    const parsedValue =
      value === "" ? undefined : value === null ? undefined : Number(value);
    onChange(parsedValue);
  };

  const labelId = "point-select-label";

  return (
    <FormControl fullWidth={fullWidth} error={error} disabled={disabled}>
      <InputLabel id={labelId} required={required}>
        {label}
      </InputLabel>
      <Select
        labelId={labelId}
        value={points ?? ""}
        onChange={handleChange}
        label={label}
        aria-describedby={helperText ? "point-select-helper-text" : undefined}
      >
        {POINT_OPTIONS.map((option) => (
          <MenuItem key={option.value ?? "null"} value={option.value ?? ""}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {helperText && (
        <FormHelperText id="point-select-helper-text">
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default PointsSelect;
