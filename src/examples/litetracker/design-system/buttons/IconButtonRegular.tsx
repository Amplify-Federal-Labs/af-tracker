/**
 * IconButtonRegular - Regular icon button with 6px padding
 *
 * @example
 * <IconButtonRegular>
 *   <SettingsIcon />
 * </IconButtonRegular>
 */

import { IconButton, type IconButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export type IconButtonRegularProps = IconButtonProps;

const StyledIconButton = styled(IconButton)({
  padding: 6,
});

export const IconButtonRegular = (props: IconButtonRegularProps) => {
  return <StyledIconButton {...props} />;
};

export default IconButtonRegular;
