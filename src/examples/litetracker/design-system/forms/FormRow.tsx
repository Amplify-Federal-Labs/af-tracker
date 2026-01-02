/**
 * FormRow - Horizontal form field layout with consistent spacing
 *
 * @example
 * <FormRow>
 *   <FormLabel>Project Title</FormLabel>
 *   <StyledTextField value={title} onChange={handleChange} />
 * </FormRow>
 *
 * <FormRow spacing={3}>
 *   <FormLabel>Type</FormLabel>
 *   <StyledSelect value={type} onChange={handleTypeChange} />
 * </FormRow>
 */

import { Box, BoxProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export interface FormRowProps extends Omit<BoxProps, 'display'> {
  children: React.ReactNode;
  spacing?: number;
}

const StyledBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'spacing',
})<FormRowProps>(({ theme, spacing = 2 }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
  gap: theme.spacing(spacing),
}));

export const FormRow = ({ children, spacing, ...props }: FormRowProps) => {
  return (
    <StyledBox spacing={spacing} {...props}>
      {children}
    </StyledBox>
  );
};

export default FormRow;
