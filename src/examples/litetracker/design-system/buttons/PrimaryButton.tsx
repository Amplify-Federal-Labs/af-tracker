/**
 * PrimaryButton - Orange background button for primary actions
 *
 * @example
 * <PrimaryButton onClick={handleSave}>Save</PrimaryButton>
 * <PrimaryButton startIcon={<Add />}>Add Story</PrimaryButton>
 */

import { Button, type ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export type PrimaryButtonProps = ButtonProps;

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  textTransform: 'none',
  fontSize: 14,
  fontWeight: 500,
  padding: theme.spacing(1, 2),
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
  '&:disabled': {
    backgroundColor: theme.palette.action.disabledBackground,
    color: theme.palette.action.disabled,
  },
}));

export const PrimaryButton = (props: PrimaryButtonProps) => {
  return <StyledButton variant="contained" {...props} />;
};

export default PrimaryButton;
