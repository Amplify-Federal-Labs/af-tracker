import { Box, Typography, Menu, MenuItem } from '@mui/material';
import { Add, MoreVert, Close } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { Droppable } from '@hello-pangea/dnd';
import StoryCard from './StoryCard';
import AddStoryForm from './AddStoryForm';
import type { MockStory } from '../mockData';
import { EmptyState, IconButtonSmall, TextButton } from '../design-system';

interface KanbanColumnProps {
  id: string;
  title: string;
  stories: MockStory[];
  metadata?: string;
  emptyMessage?: string;
  onAddStory?: (story: { title: string; type: string; points?: number; description: string }) => void;
  onClose?: (columnId: string) => void;
  onToggleFavorite: (storyId: string) => void;
  onStoryClick: (story: MockStory) => void;
}

// Styled components
const ColumnContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.column.main,
  borderRadius: 4,
  display: 'flex',
  flexDirection: 'column',
  minHeight: 400,
  height: '100%',
  flex: 1,
}));

const ColumnHeader = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(1, 1.5),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderTopLeftRadius: 4,
  borderTopRightRadius: 4,
}));

const ColumnTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  fontWeight: 500,
  fontSize: 14,
  flex: 1,
}));

const ColumnActions = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
});

const ColumnMetadata = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1, 1.5),
  backgroundColor: theme.palette.primary.main,
  borderTop: `1px solid ${theme.palette.primary.dark}`,
}));

const MetadataText = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  fontSize: 12,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const ColumnContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  flex: 1,
  minHeight: 200,
}));

const KanbanColumn = ({
  id,
  title,
  stories,
  metadata,
  emptyMessage,
  onAddStory,
  onClose,
  onToggleFavorite,
  onStoryClick,
}: KanbanColumnProps) => {
  const [showForm, setShowForm] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

  const handleClose = () => {
    if (onClose) {
      onClose(id);
    }
  };

  const handleAddStoryClick = () => {
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
  };

  const handleFormSave = (story: { title: string; type: string; points?: number; description: string }) => {
    if (onAddStory) {
      onAddStory(story);
    }
    setShowForm(false);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleSelectAll = () => {
    // TODO: Implement select all functionality
    console.log('Select all stories in', id);
    handleMenuClose();
  };

  const handleDeselectAll = () => {
    // TODO: Implement deselect all functionality
    console.log('Deselect all stories in', id);
    handleMenuClose();
  };

  return (
    <ColumnContainer>
      <ColumnHeader>
        <ColumnTitle>{title}</ColumnTitle>
        <ColumnActions>
          {onAddStory && (
            <TextButton
              onClick={handleAddStoryClick}
              startIcon={<Add fontSize="small" />}
              aria-label="Add story"
              sx={{ color: 'primary.contrastText' }}
            >
              Add Story
            </TextButton>
          )}
          <IconButtonSmall
            aria-label="More options"
            onClick={handleMenuOpen}
            sx={{ color: 'primary.contrastText' }}
          >
            <MoreVert fontSize="small" />
          </IconButtonSmall>
          <Menu
            anchorEl={menuAnchorEl}
            open={Boolean(menuAnchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={handleSelectAll}>Select all</MenuItem>
            <MenuItem onClick={handleDeselectAll}>Deselect all</MenuItem>
          </Menu>
          <IconButtonSmall
            onClick={handleClose}
            aria-label="Close column"
            sx={{ color: 'primary.contrastText' }}
          >
            <Close fontSize="small" />
          </IconButtonSmall>
        </ColumnActions>
      </ColumnHeader>

      {metadata && (
        <ColumnMetadata>
          <MetadataText>{metadata}</MetadataText>
        </ColumnMetadata>
      )}

      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <ColumnContent
            ref={provided.innerRef}
            {...provided.droppableProps}
            sx={{
              backgroundColor: snapshot.isDraggingOver ? 'action.hover' : 'transparent',
            }}
          >
            {showForm && (
              <AddStoryForm onClose={handleFormClose} onSave={handleFormSave} />
            )}
            {stories.length === 0 && !showForm ? (
              <EmptyState message={emptyMessage || 'No stories in this column'} />
            ) : (
              stories.map((story, index) => (
                <StoryCard
                  key={story.id}
                  story={story}
                  index={index}
                  onToggleFavorite={onToggleFavorite}
                  onClick={onStoryClick}
                />
              ))
            )}
            {provided.placeholder}
          </ColumnContent>
        )}
      </Droppable>
    </ColumnContainer>
  );
};

export default KanbanColumn;
