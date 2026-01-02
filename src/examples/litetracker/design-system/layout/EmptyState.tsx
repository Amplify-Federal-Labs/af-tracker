/**
 * EmptyState - Centered placeholder for empty content areas
 *
 * @example
 * <EmptyState message="No stories in this column" />
 * <EmptyState message="Select a project to get started" />
 */

import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export interface EmptyStateProps {
  message: string;
}

const PlaceholderContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 200,
  padding: 24,
});

const PlaceholderText = styled(Typography)(({ theme }) => ({
  fontSize: 20,
  color: theme.palette.text.secondary,
}));

export const EmptyState = ({ message }: EmptyStateProps) => {
  return (
    <PlaceholderContainer>
      <PlaceholderText>{message}</PlaceholderText>
    </PlaceholderContainer>
  );
};

export default EmptyState;
