/**
 * IconButtonSmall - Small icon button with 4px padding
 *
 * @example
 * <IconButtonSmall>
 *   <CloseIcon />
 * </IconButtonSmall>
 */

import { IconButton, type IconButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export type IconButtonSmallProps = Omit<IconButtonProps, 'size'>;

const StyledIconButton = styled(IconButton)({
  padding: 4,
});

export const IconButtonSmall = (props: IconButtonSmallProps) => {
  return <StyledIconButton size="small" {...props} />;
};

export default IconButtonSmall;
