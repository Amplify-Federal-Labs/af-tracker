/**
 * CollapsibleSidebar - Sidebar drawer with collapsible functionality
 *
 * @example
 * <CollapsibleSidebar
 *   width={190}
 *   collapsedWidth={56}
 *   collapsed={false}
 *   topOffset={50}
 * >
 *   <nav>...</nav>
 * </CollapsibleSidebar>
 */

import { Drawer, type DrawerProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export interface CollapsibleSidebarProps extends Omit<DrawerProps, 'variant'> {
  width: number;
  collapsedWidth: number;
  collapsed: boolean;
  children: React.ReactNode;
  topOffset?: number;
}

const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'width' && prop !== 'collapsedWidth' && prop !== 'collapsed' && prop !== 'topOffset',
})<CollapsibleSidebarProps>(({ theme, width, collapsedWidth, collapsed, topOffset = 0 }) => ({
  width: collapsed ? collapsedWidth : width,
  flexShrink: 0,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  '& .MuiDrawer-paper': {
    width: collapsed ? collapsedWidth : width,
    boxSizing: 'border-box',
    marginTop: topOffset,
    height: topOffset ? `calc(100% - ${topOffset}px)` : '100%',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
  },
}));

export const CollapsibleSidebar = ({
  width,
  collapsedWidth,
  collapsed,
  children,
  topOffset,
  ...props
}: CollapsibleSidebarProps) => {
  return (
    <StyledDrawer
      variant="permanent"
      width={width}
      collapsedWidth={collapsedWidth}
      collapsed={collapsed}
      topOffset={topOffset}
      {...props}
    >
      {children}
    </StyledDrawer>
  );
};

export default CollapsibleSidebar;
