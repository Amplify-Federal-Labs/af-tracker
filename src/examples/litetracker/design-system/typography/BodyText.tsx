/**
 * BodyText - Standard body text typography
 *
 * @example
 * <BodyText>This is regular body text</BodyText>
 */

import { Typography, TypographyProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export interface BodyTextProps extends TypographyProps {
  children: React.ReactNode;
}

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  fontWeight: 400,
  color: theme.palette.text.primary,
}));

export const BodyText = ({ children, ...props }: BodyTextProps) => {
  return (
    <StyledTypography component="p" {...props}>
      {children}
    </StyledTypography>
  );
};

export default BodyText;
