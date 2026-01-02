/**
 * SidebarContainer - Themed sidebar container
 *
 * @example
 * <SidebarContainer width={200}>
 *   <nav>...</nav>
 * </SidebarContainer>
 */

import { Box, BoxProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export interface SidebarContainerProps extends BoxProps {
  width: number;
  children: React.ReactNode;
}

const StyledBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'width',
})<SidebarContainerProps>(({ theme, width }) => ({
  width,
  backgroundColor: theme.palette.sidebar.main,
  borderRight: 'none',
}));

export const SidebarContainer = ({ width, children, ...props }: SidebarContainerProps) => {
  return (
    <StyledBox width={width} {...props}>
      {children}
    </StyledBox>
  );
};

export default SidebarContainer;
