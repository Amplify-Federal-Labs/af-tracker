/**
 * FormLabel - Right-aligned label for form fields
 *
 * @example
 * <FormLabel>Project Title</FormLabel>
 * <FormLabel minWidth={150}>Type</FormLabel>
 */

import { Typography, type TypographyProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export interface FormLabelProps extends TypographyProps {
  children: React.ReactNode;
  minWidth?: number;
}

const StyledTypography = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'minWidth',
})<FormLabelProps>(({ theme, minWidth = 200 }) => ({
  fontSize: 14,
  fontWeight: 500,
  color: theme.palette.text.primary,
  minWidth,
  textAlign: 'right',
}));

export const FormLabel = ({ children, minWidth, ...props }: FormLabelProps) => {
  return (
    <StyledTypography minWidth={minWidth} {...props}>
      {children}
    </StyledTypography>
  );
};

export default FormLabel;
