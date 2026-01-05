/**
 * ActionButtons - Container for form action buttons (Save, Cancel, etc.)
 *
 * @example
 * <ActionButtons>
 *   <SecondaryButton>Cancel</SecondaryButton>
 *   <PrimaryButton>Save</PrimaryButton>
 * </ActionButtons>
 */

import { Box, type BoxProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export interface ActionButtonsProps extends BoxProps {
  children: React.ReactNode;
}

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  justifyContent: 'flex-end',
  marginTop: theme.spacing(4),
  paddingTop: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
}));

export const ActionButtons = ({ children, ...props }: ActionButtonsProps) => {
  return <StyledBox {...props}>{children}</StyledBox>;
};

export default ActionButtons;
