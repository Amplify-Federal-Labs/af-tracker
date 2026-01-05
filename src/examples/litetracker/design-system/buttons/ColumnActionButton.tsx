/**
 * ColumnActionButton - Small button for use in column headers
 *
 * @example
 * <ColumnActionButton startIcon={<Add />}>Add</ColumnActionButton>
 */

import { Button, type ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export type ColumnActionButtonProps = ButtonProps;

const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  fontSize: 14,
  textTransform: 'none',
  padding: theme.spacing(0.5, 1),
  minWidth: 'auto',
  '&:hover': {
    backgroundColor: theme.palette.action.brownHover,
  },
}));

export const ColumnActionButton = (props: ColumnActionButtonProps) => {
  return <StyledButton variant="text" {...props} />;
};

export default ColumnActionButton;
