/**
 * ColumnContainer - Kanban column container with theme colors
 *
 * @example
 * <ColumnContainer>
 *   <ColumnHeader>Done</ColumnHeader>
 *   <div>Column content</div>
 * </ColumnContainer>
 */

import { Box, type BoxProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export interface ColumnContainerProps extends BoxProps {
  children: React.ReactNode;
}

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.column.main,
  borderRadius: 4,
  display: 'flex',
  flexDirection: 'column',
  minHeight: 400,
}));

export const ColumnContainer = ({ children, ...props }: ColumnContainerProps) => {
  return <StyledBox {...props}>{children}</StyledBox>;
};

export default ColumnContainer;
