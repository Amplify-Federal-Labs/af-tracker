/**
 * IconButtonSmall - Small icon button with 4px padding
 *
 * @example
 * <IconButtonSmall>
 *   <CloseIcon />
 * </IconButtonSmall>
 */

import { IconButton, IconButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export interface IconButtonSmallProps extends Omit<IconButtonProps, 'size'> {
  // Extends all MUI IconButtonProps except size (forced to small)
}

const StyledIconButton = styled(IconButton)({
  padding: 4,
});

export const IconButtonSmall = (props: IconButtonSmallProps) => {
  return <StyledIconButton size="small" {...props} />;
};

export default IconButtonSmall;
