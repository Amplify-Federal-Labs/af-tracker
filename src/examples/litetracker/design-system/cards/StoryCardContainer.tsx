/**
 * StoryCardContainer - White card container for user stories
 *
 * @example
 * <StoryCardContainer clickable>
 *   <div>Story content</div>
 * </StoryCardContainer>
 *
 * <StoryCardContainer isDragging>
 *   <div>Being dragged</div>
 * </StoryCardContainer>
 */

import { Card, type CardProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export interface StoryCardContainerProps extends CardProps {
  children: React.ReactNode;
  clickable?: boolean;
  isDragging?: boolean;
}

const StyledCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'clickable' && prop !== 'isDragging',
})<StoryCardContainerProps>(({ clickable = false, isDragging = false }) => ({
  cursor: clickable ? 'pointer' : 'default',
  marginBottom: 8,
  minHeight: 80,
  elevation: isDragging ? 4 : 1,
}));

export const StoryCardContainer = ({
  children,
  clickable,
  isDragging,
  ...props
}: StoryCardContainerProps) => {
  return (
    <StyledCard clickable={clickable} isDragging={isDragging} elevation={isDragging ? 4 : 1} {...props}>
      {children}
    </StyledCard>
  );
};

export default StoryCardContainer;
