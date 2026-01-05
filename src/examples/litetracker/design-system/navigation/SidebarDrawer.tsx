/**
 * SidebarDrawer - Themed drawer component for sidebars
 *
 * @example
 * <SidebarDrawer width={200} topOffset={50}>
 *   <nav>...</nav>
 * </SidebarDrawer>
 */

import { Drawer, type DrawerProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export interface SidebarDrawerProps extends Omit<DrawerProps, 'variant'> {
  width: number;
  children: React.ReactNode;
  topOffset?: number;
}

const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'width' && prop !== 'topOffset',
})<SidebarDrawerProps>(({ theme, width, topOffset = 0 }) => ({
  width,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width,
    backgroundColor: theme.palette.sidebar.main,
    borderRight: 'none',
    marginTop: topOffset,
    height: topOffset ? `calc(100% - ${topOffset}px)` : '100%',
  },
}));

export const SidebarDrawer = ({ width, children, topOffset, ...props }: SidebarDrawerProps) => {
  return (
    <StyledDrawer variant="permanent" anchor="left" width={width} topOffset={topOffset} {...props}>
      {children}
    </StyledDrawer>
  );
};

export default SidebarDrawer;
