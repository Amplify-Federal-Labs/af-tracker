import { Card, CardContent, Typography, Chip, IconButton, Box, Button, Checkbox } from '@mui/material';
import { Star, StarBorder, BugReport, Build, Flag, FiberManualRecord } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import type { MockStory, StoryType } from '../mockData';
import { Draggable } from '@hello-pangea/dnd';

interface StoryCardProps {
  story: MockStory;
  index: number;
  onToggleFavorite: (storyId: string) => void;
  onClick: (story: MockStory) => void;
}

// Styled components using theme
const StoryCardContainer = styled(Card)(({ theme }) => ({
  cursor: 'pointer',
  marginBottom: theme.spacing(1),
  minHeight: 80,
}));

const CardHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(0.5),
}));

const StoryTitle = styled(Typography)(({ theme }) => ({
  flex: 1,
  color: theme.palette.grey[900],
  lineHeight: 1.4,
  wordBreak: 'break-word',
})) as typeof Typography;

const LabelContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(0.5),
  marginTop: theme.spacing(0.5),
}));

const StoryTypeIndicator = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'storyType',
})<{ storyType: StoryType }>(({ theme, storyType }) => {
  const getTypeColor = () => {
    switch (storyType) {
      case 'feature':
        return theme.palette.warning.main;
      case 'bug':
        return theme.palette.error.main;
      case 'chore':
        return theme.palette.grey[600];
      case 'release':
        return theme.palette.info.main;
      default:
        return theme.palette.grey[600];
    }
  };

  return {
    display: 'inline-flex',
    alignItems: 'center',
    marginRight: theme.spacing(0.5),
    color: getTypeColor(),
    fontSize: 16,
  };
});

const TypeBadge = styled(Chip)(({ theme }) => ({
  height: 16,
  fontSize: 10,
  fontWeight: 600,
  marginLeft: theme.spacing(0.5),
  padding: '0 4px',
}));

const getStoryTypeIcon = (type: StoryType) => {
  switch (type) {
    case 'bug':
      return <BugReport fontSize="small" />;
    case 'chore':
      return <Build fontSize="small" />;
    case 'release':
      return <Flag fontSize="small" />;
    case 'feature':
    default:
      return <FiberManualRecord fontSize="small" />;
  }
};

const getTypeAbbreviation = (type: StoryType): string => {
  switch (type) {
    case 'feature':
      return 'DM';
    case 'bug':
      return 'SY';
    case 'chore':
      return 'CH';
    case 'release':
      return 'RL';
    default:
      return 'FT';
  }
};

const StoryCard = ({ story, index, onToggleFavorite, onClick }: StoryCardProps) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(story.id);
  };

  const handleCardClick = () => {
    onClick(story);
  };

  return (
    <Draggable draggableId={story.id} index={index}>
      {(provided, snapshot) => (
        <StoryCardContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={handleCardClick}
          elevation={snapshot.isDragging ? 4 : 1}
        >
          <CardContent>
            <CardHeader>
              <Box display="flex" alignItems="flex-start" flex={1}>
                <IconButton
                  size="small"
                  onClick={handleFavoriteClick}
                  aria-label={story.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                  {story.isFavorite ? (
                    <Star fontSize="small" color="warning" />
                  ) : (
                    <StarBorder fontSize="small" />
                  )}
                </IconButton>
                <Box flex={1} ml={0.5}>
                  <Box display="flex" alignItems="center">
                    <StoryTypeIndicator storyType={story.type}>
                      {getStoryTypeIcon(story.type)}
                    </StoryTypeIndicator>
                    <StoryTitle component="div" variant="body1">
                      {story.title}
                      <TypeBadge
                        label={getTypeAbbreviation(story.type)}
                        size="small"
                        color={story.type === 'bug' ? 'error' : 'default'}
                      />
                    </StoryTitle>
                  </Box>
                  {story.labels.length > 0 && (
                    <LabelContainer>
                      {story.labels.map((label) => (
                        <Chip
                          key={label.id}
                          label={label.name}
                          size="small"
                          sx={{
                            backgroundColor: label.color,
                            color: 'common.white',
                          }}
                        />
                      ))}
                    </LabelContainer>
                  )}
                </Box>
              </Box>
              {story.state === 'unstarted' && (
                <Checkbox size="small" />
              )}
            </CardHeader>

            {story.state === 'unstarted' && (
              <Box display="flex" justifyContent="flex-end" mt={1}>
                <Button size="small" variant="outlined">
                  Start
                </Button>
              </Box>
            )}

            {story.state === 'started' && (
              <Box display="flex" alignItems="center" mt={1} gap={1}>
                <Box
                  flex={1}
                  height={4}
                  bgcolor="grey.300"
                  borderRadius={1}
                  overflow="hidden"
                >
                  <Box
                    height="100%"
                    width="40%"
                    bgcolor="primary.main"
                  />
                </Box>
                <Typography variant="caption" color="text.secondary">
                  40%
                </Typography>
              </Box>
            )}
          </CardContent>
        </StoryCardContainer>
      )}
    </Draggable>
  );
};

export default StoryCard;
