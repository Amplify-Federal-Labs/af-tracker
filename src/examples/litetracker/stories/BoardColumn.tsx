import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import KanbanColumn from './KanbanColumn';
import type { MockStory } from '../mockData';

interface BoardColumnProps {
  id: string;
  title: string;
  stories: MockStory[];
  metadata?: string;
  emptyMessage: string;
  onAddStory?: (story: { title: string; type: string; points?: number; description: string }) => void;
  onClose: (columnId: string) => void;
  onToggleFavorite: (storyId: string) => void;
  onStoryClick: (story: MockStory) => void;
}

const ColumnWrapper = styled(Box)({
  flex: 1,
  minWidth: 300,
  display: 'flex',
  flexDirection: 'column',
});

const BoardColumn = ({
  id,
  title,
  stories,
  metadata,
  emptyMessage,
  onAddStory,
  onClose,
  onToggleFavorite,
  onStoryClick,
}: BoardColumnProps) => {
  return (
    <ColumnWrapper>
      <KanbanColumn
        id={id}
        title={title}
        stories={stories}
        metadata={metadata}
        emptyMessage={emptyMessage}
        onAddStory={onAddStory}
        onClose={onClose}
        onToggleFavorite={onToggleFavorite}
        onStoryClick={onStoryClick}
      />
    </ColumnWrapper>
  );
};

export default BoardColumn;
