/**
 * MenuItem - Styled menu item with variants
 *
 * @example
 * <MenuItem variant="default">Settings</MenuItem>
 * <MenuItem variant="create">Create Project</MenuItem>
 * <MenuItem variant="dashboard">Dashboard</MenuItem>
 */

import { MenuItem as MuiMenuItem, MenuItemProps as MuiMenuItemProps } from '@mui/material';
import { Add as AddIcon, Home as HomeIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { MenuItemVariant } from '../types';

export interface MenuItemProps extends Omit<MuiMenuItemProps, 'children'> {
  children: React.ReactNode;
  variant?: MenuItemVariant;
}

const StyledMenuItem = styled(MuiMenuItem, {
  shouldForwardProp: (prop) => prop !== 'variant',
})<MenuItemProps>(({ theme, variant = 'default' }) => {
  const baseStyles = {
    fontSize: 14,
    fontWeight: 500,
  };

  if (variant === 'create' || variant === 'dashboard') {
    return {
      ...baseStyles,
      color: theme.palette.primary.main,
      display: 'flex',
      alignItems: 'center',
      gap: theme.spacing(1),
    };
  }

  return baseStyles;
});

export const MenuItem = ({ children, variant = 'default', ...props }: MenuItemProps) => {
  const renderIcon = () => {
    if (variant === 'create') return <AddIcon fontSize="small" />;
    if (variant === 'dashboard') return <HomeIcon fontSize="small" />;
    return null;
  };

  return (
    <StyledMenuItem variant={variant} {...props}>
      {renderIcon()}
      {children}
    </StyledMenuItem>
  );
};

export default MenuItem;
