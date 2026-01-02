import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DragDropContext, type DropResult } from '@hello-pangea/dnd';
import BoardColumn from './BoardColumn';
import type { MockStory } from '../mockData';

interface KanbanBoardProps {
  currentIteration: MockStory[];
  backlog: MockStory[];
  icebox: MockStory[];
  done: MockStory[];
  blocked: MockStory[];
  iterationMetadata?: string;
  visibleColumns: string[];
  onDragEnd: (result: DropResult) => void;
  onToggleFavorite: (storyId: string) => void;
  onStoryClick: (story: MockStory) => void;
  onAddStory?: (columnId: string, story: { title: string; type: string; points?: number; description: string }) => void;
  onCloseColumn: (columnId: string) => void;
}

const BoardContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  padding: theme.spacing(2, 2, 2, 0), // top, right, bottom, left
  height: '100%',
  overflowX: 'auto',
}));

const EmptyStateContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  width: '100%',
  gap: theme.spacing(3),
}));

const EmptyStateIconContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  alignItems: 'center',
}));

const EmptyStatePanelGroup = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[800],
  borderRadius: 2,
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  width: 200,
}));

const EmptyStatePanelRow = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[700],
  borderRadius: 1,
  height: 40,
}));

const EmptyStateText = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[600],
  fontSize: 20,
  fontWeight: 400,
}));

interface ColumnConfig {
  id: string;
  title: string;
  stories: MockStory[];
  metadata?: string;
  emptyMessage: string;
}

const KanbanBoard = ({
  currentIteration,
  backlog,
  icebox,
  done,
  blocked,
  iterationMetadata,
  visibleColumns,
  onDragEnd,
  onToggleFavorite,
  onStoryClick,
  onAddStory,
  onCloseColumn,
}: KanbanBoardProps) => {
  const isColumnVisible = (columnId: string) => visibleColumns.includes(columnId);

  // Get all stories that are owned by or favorited by the current user
  const myWorkStories = [
    ...currentIteration,
    ...backlog,
    ...icebox,
    ...blocked,
  ].filter(story => story.isFavorite || story.owners.length > 0);

  const columns: ColumnConfig[] = [
    {
      id: 'my-work',
      title: 'My Work',
      stories: myWorkStories,
      emptyMessage: 'Stories you own or have favorited will appear here.',
    },
    {
      id: 'current-iteration',
      title: 'Current Iteration',
      stories: currentIteration,
      metadata: iterationMetadata,
      emptyMessage: "Stories you've prioritized to work on next live here.",
    },
    {
      id: 'backlog',
      title: 'Backlog',
      stories: backlog,
      emptyMessage: "Stories you've prioritized to work on next live here.",
    },
    {
      id: 'icebox',
      title: 'Icebox',
      stories: icebox,
      emptyMessage: 'Stories that are not yet prioritized live here.',
    },
    {
      id: 'done',
      title: 'Done',
      stories: done,
      emptyMessage: 'Stories that are already delivered.',
    },
    {
      id: 'blocked',
      title: 'Blocked',
      stories: blocked,
      emptyMessage: 'Stories that are currently blocked.',
    },
    {
      id: 'epics',
      title: 'Epics',
      stories: [],
      emptyMessage: 'Overarching initiatives with multiple stories live here.',
    },
    {
      id: 'labels',
      title: 'Labels',
      stories: [],
      emptyMessage: 'Manage your project labels here.',
    },
  ];

  const hasVisibleColumns = visibleColumns.length > 0;

  if (!hasVisibleColumns) {
    return (
      <EmptyStateContainer>
        <EmptyStateIconContainer>
          <EmptyStatePanelGroup>
            <EmptyStatePanelRow />
            <EmptyStatePanelRow />
          </EmptyStatePanelGroup>
          <EmptyStatePanelGroup>
            <EmptyStatePanelRow />
            <EmptyStatePanelRow />
            <EmptyStatePanelRow />
          </EmptyStatePanelGroup>
        </EmptyStateIconContainer>
        <EmptyStateText>There are no open panels</EmptyStateText>
      </EmptyStateContainer>
    );
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <BoardContainer>
        {columns.map((column) =>
          isColumnVisible(column.id) ? (
            <BoardColumn
              key={column.id}
              id={column.id}
              title={column.title}
              stories={column.stories}
              metadata={column.metadata}
              emptyMessage={column.emptyMessage}
              onAddStory={onAddStory ? (story) => onAddStory(column.id, story) : undefined}
              onClose={onCloseColumn}
              onToggleFavorite={onToggleFavorite}
              onStoryClick={onStoryClick}
            />
          ) : null
        )}
      </BoardContainer>
    </DragDropContext>
  );
};

export default KanbanBoard;
