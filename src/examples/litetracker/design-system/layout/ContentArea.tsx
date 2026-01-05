/**
 * ContentArea - Main content area with scrolling
 *
 * @example
 * <ContentArea>
 *   <div>Your content here</div>
 * </ContentArea>
 *
 * <ContentArea marginLeft={240}>
 *   Content with sidebar offset
 * </ContentArea>
 */

import { Box, type BoxProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export interface ContentAreaProps extends BoxProps {
  children: React.ReactNode;
  marginLeft?: number | string;
}

const StyledBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'marginLeft',
})<ContentAreaProps>(({ theme, marginLeft }) => ({
  flexGrow: 1,
  height: '100%',
  overflow: 'auto',
  backgroundColor: theme.palette.background.default,
  ...(marginLeft && { marginLeft }),
}));

export const ContentArea = ({ children, marginLeft, ...props }: ContentAreaProps) => {
  return (
    <StyledBox marginLeft={marginLeft} {...props}>
      {children}
    </StyledBox>
  );
};

export default ContentArea;
