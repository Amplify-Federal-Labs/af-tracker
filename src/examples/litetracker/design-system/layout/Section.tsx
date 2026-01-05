/**
 * Section - Content section with optional border
 *
 * @example
 * <Section>
 *   <SectionHeading>General</SectionHeading>
 *   <p>Content here</p>
 * </Section>
 *
 * <Section showBorder>
 *   <SectionHeading>Settings</SectionHeading>
 *   <p>Content with top border</p>
 * </Section>
 */

import { Box, type BoxProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export interface SectionProps extends BoxProps {
  children: React.ReactNode;
  showBorder?: boolean;
}

const StyledBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'showBorder',
})<SectionProps>(({ theme, showBorder = false }) => ({
  marginBottom: theme.spacing(4),
  ...(showBorder && {
    paddingTop: theme.spacing(2),
    borderTop: `2px solid ${theme.palette.divider}`,
  }),
}));

export const Section = ({ children, showBorder, ...props }: SectionProps) => {
  return (
    <StyledBox showBorder={showBorder} {...props}>
      {children}
    </StyledBox>
  );
};

export default Section;
