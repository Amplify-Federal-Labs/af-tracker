/**
 * SearchField - Pre-configured search input with icon
 *
 * @example
 * <SearchField
 *   placeholder="Search stories..."
 *   value={searchTerm}
 *   onChange={handleSearch}
 * />
 */

import { TextField, TextFieldProps, InputAdornment } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

export interface SearchFieldProps extends Omit<TextFieldProps, 'variant'> {
  // Extends all TextFieldProps
}

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: 250,
  '& .MuiInputBase-root': {
    height: 36,
    fontSize: 13,
    backgroundColor: 'rgba(255, 255, 255, 0.09)',
    color: theme.palette.common.white,
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'transparent',
  },
  '& .MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(255, 255, 255, 0.23)',
  },
  '& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.common.white,
  },
  '& .MuiSvgIcon-root': {
    color: theme.palette.common.white,
    fontSize: 20,
  },
}));

export const SearchField = ({ placeholder = 'Search...', ...props }: SearchFieldProps) => {
  return (
    <StyledTextField
      placeholder={placeholder}
      variant="outlined"
      size="small"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
};

export default SearchField;
