/**
 * StyledTextField - TextField with dark/light variants
 *
 * Dark variant: For use on dark backgrounds (white text, semi-transparent background)
 * Light variant: For use on light backgrounds (dark text, transparent background)
 *
 * @example
 * <StyledTextField variant="dark" value={name} onChange={handleChange} />
 * <StyledTextField variant="light" value={title} onChange={handleChange} />
 */

import { TextField, type TextFieldProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { type FormFieldVariant } from '../types';

export interface StyledTextFieldProps extends Omit<TextFieldProps, 'variant'> {
  variant?: FormFieldVariant;
}

const StyledTextFieldBase = styled(TextField, {
  shouldForwardProp: (prop) => prop !== 'variant',
})<StyledTextFieldProps>(({ theme, variant = 'dark' }) => {
  if (variant === 'dark') {
    return {
      '& .MuiInputBase-root': {
        backgroundColor: 'rgba(255, 255, 255, 0.09)',
        color: theme.palette.common.white,
        fontSize: 14,
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
    };
  }

  // Light variant
  return {
    '& .MuiInputBase-root': {
      backgroundColor: 'transparent',
      fontSize: 14,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.divider,
    },
    '& .MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.text.secondary,
    },
    '& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.main,
    },
  };
});

export const StyledTextField = ({ variant = 'dark', ...props }: StyledTextFieldProps) => {
  return <StyledTextFieldBase variant={variant} {...props} />;
};

export default StyledTextField;
