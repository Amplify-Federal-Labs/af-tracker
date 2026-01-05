/**
 * SectionHeading - Typography component for section titles
 *
 * @example
 * <SectionHeading variant="large">General Settings</SectionHeading>
 * <SectionHeading uppercase>Blockers</SectionHeading>
 * <SectionHeading variant="small">Description</SectionHeading>
 */

import { Typography,type TypographyProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { type SectionHeadingVariant } from '../types';

export interface SectionHeadingProps extends Omit<TypographyProps, 'variant'> {
  children: React.ReactNode;
  variant?: SectionHeadingVariant;
  uppercase?: boolean;
}

const StyledTypography = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'variant' && prop !== 'uppercase',
})<SectionHeadingProps>(({ theme, variant = 'medium', uppercase = false }) => {
  const getFontSize = () => {
    switch (variant) {
      case 'large':
        return 18;
      case 'medium':
        return 16;
      case 'small':
        return 14;
      default:
        return 16;
    }
  };

  return {
    fontSize: getFontSize(),
    fontWeight: variant === 'small' ? 600 : 500,
    color: theme.palette.text.primary,
    textTransform: uppercase ? 'uppercase' : 'none',
  };
});

export const SectionHeading = ({
  children,
  variant = 'medium',
  uppercase = false,
  ...props
}: SectionHeadingProps) => {
  return (
    <StyledTypography variant={variant} uppercase={uppercase} component="h2" {...props}>
      {children}
    </StyledTypography>
  );
};

export default SectionHeading;
