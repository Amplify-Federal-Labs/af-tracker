/**
 * StyledSelect - Select component with dark/light variants
 *
 * Dark variant: For use on dark backgrounds (white text, semi-transparent background)
 * Light variant: For use on light backgrounds (dark text, transparent background)
 *
 * @example
 * <StyledSelect variant="dark" value={type} onChange={handleChange}>
 *   <MenuItem value="feature">Feature</MenuItem>
 * </StyledSelect>
 */

import { Select, type SelectProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { type FormFieldVariant } from '../types';

export interface StyledSelectProps extends Omit<SelectProps, 'variant'> {
  variant?: FormFieldVariant;
}

const StyledSelectBase = styled(Select, {
  shouldForwardProp: (prop) => prop !== 'variant',
})<StyledSelectProps>(({ theme, variant = 'dark' }) => {
  if (variant === 'dark') {
    return {
      backgroundColor: 'rgba(255, 255, 255, 0.09)',
      color: theme.palette.common.white,
      fontSize: 14,
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'transparent',
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgba(255, 255, 255, 0.23)',
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.common.white,
      },
      '& .MuiSvgIcon-root': {
        color: theme.palette.common.white,
      },
    };
  }

  // Light variant
  return {
    backgroundColor: 'transparent',
    fontSize: 14,
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.divider,
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.text.secondary,
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.main,
    },
  };
});

export const StyledSelect = ({ variant = 'dark', ...props }: StyledSelectProps) => {
  return <StyledSelectBase variant={variant} {...props} />;
};

export default StyledSelect;
