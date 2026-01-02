/**
 * Label - Small label text with primary/secondary color options
 *
 * @example
 * <Label>Name:</Label>
 * <Label secondary>Optional field</Label>
 */

import { Typography, TypographyProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export interface LabelProps extends TypographyProps {
  children: React.ReactNode;
  secondary?: boolean;
}

const StyledTypography = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'secondary',
})<LabelProps>(({ theme, secondary = false }) => ({
  fontSize: 13,
  fontWeight: 400,
  color: secondary ? theme.palette.text.secondary : theme.palette.text.primary,
}));

export const Label = ({ children, secondary, ...props }: LabelProps) => {
  return (
    <StyledTypography secondary={secondary} {...props}>
      {children}
    </StyledTypography>
  );
};

export default Label;
