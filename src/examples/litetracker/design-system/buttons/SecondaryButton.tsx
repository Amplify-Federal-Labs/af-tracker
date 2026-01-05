/**
 * SecondaryButton - Text button for secondary actions
 *
 * @example
 * <SecondaryButton onClick={handleCancel}>Cancel</SecondaryButton>
 */

import { Button, type ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export type SecondaryButtonProps = ButtonProps;

const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textTransform: 'none',
  fontSize: 14,
  fontWeight: 500,
  '&:hover': {
    backgroundColor: theme.palette.action.brownHover,
  },
}));

export const SecondaryButton = (props: SecondaryButtonProps) => {
  return <StyledButton variant="text" {...props} />;
};

export default SecondaryButton;
