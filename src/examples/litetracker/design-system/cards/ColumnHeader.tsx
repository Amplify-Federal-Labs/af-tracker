/**
 * ColumnHeader - Orange header for Kanban columns
 *
 * @example
 * <ColumnHeader>
 *   <Typography>Done</Typography>
 *   <ColumnActionButton>Add</ColumnActionButton>
 * </ColumnHeader>
 */

import { Box, type BoxProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export interface ColumnHeaderProps extends BoxProps {
  children: React.ReactNode;
}

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(1, 1.5),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderTopLeftRadius: 4,
  borderTopRightRadius: 4,
}));

export const ColumnHeader = ({ children, ...props }: ColumnHeaderProps) => {
  return <StyledBox {...props}>{children}</StyledBox>;
};

export default ColumnHeader;
