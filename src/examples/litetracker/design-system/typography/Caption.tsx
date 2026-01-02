/**
 * Caption - Small caption text
 *
 * @example
 * <Caption>Last updated: 2 hours ago</Caption>
 */

import { Typography, TypographyProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export interface CaptionProps extends TypographyProps {
  children: React.ReactNode;
}

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: 12,
  fontWeight: 400,
  color: theme.palette.text.secondary,
}));

export const Caption = ({ children, ...props }: CaptionProps) => {
  return (
    <StyledTypography variant="caption" {...props}>
      {children}
    </StyledTypography>
  );
};

export default Caption;
