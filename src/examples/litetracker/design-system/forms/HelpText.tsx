/**
 * HelpText - Secondary help text for form fields
 *
 * @example
 * <HelpText>This is a helpful description</HelpText>
 * <HelpText leftMargin={20}>Custom margin help text</HelpText>
 */

import { Typography, TypographyProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export interface HelpTextProps extends TypographyProps {
  children: React.ReactNode;
  leftMargin?: number;
}

const StyledTypography = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'leftMargin',
})<HelpTextProps>(({ theme, leftMargin = 27 }) => ({
  fontSize: 13,
  color: theme.palette.text.secondary,
  marginLeft: theme.spacing(leftMargin),
}));

export const HelpText = ({ children, leftMargin, ...props }: HelpTextProps) => {
  return (
    <StyledTypography leftMargin={leftMargin} {...props}>
      {children}
    </StyledTypography>
  );
};

export default HelpText;
