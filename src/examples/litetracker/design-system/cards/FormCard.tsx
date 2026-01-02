/**
 * FormCard - White card container for forms
 *
 * @example
 * <FormCard>
 *   <form>...</form>
 * </FormCard>
 */

import { Box, BoxProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export interface FormCardProps extends BoxProps {
  children: React.ReactNode;
}

const StyledBox = styled(Box)({
  backgroundColor: '#FFFFFF',
  border: '1px solid #E0E0E0',
  borderRadius: 4,
  padding: 16,
});

export const FormCard = ({ children, ...props }: FormCardProps) => {
  return <StyledBox {...props}>{children}</StyledBox>;
};

export default FormCard;
