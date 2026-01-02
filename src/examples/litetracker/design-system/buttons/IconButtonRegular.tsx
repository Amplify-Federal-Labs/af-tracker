/**
 * IconButtonRegular - Regular icon button with 6px padding
 *
 * @example
 * <IconButtonRegular>
 *   <SettingsIcon />
 * </IconButtonRegular>
 */

import { IconButton, IconButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export interface IconButtonRegularProps extends IconButtonProps {
  // Extends all MUI IconButtonProps
}

const StyledIconButton = styled(IconButton)({
  padding: 6,
});

export const IconButtonRegular = (props: IconButtonRegularProps) => {
  return <StyledIconButton {...props} />;
};

export default IconButtonRegular;
