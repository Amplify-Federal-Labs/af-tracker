import { useState } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { DropResult } from '@hello-pangea/dnd';
import LeftSidebar, { DRAWER_WIDTH, DRAWER_WIDTH_COLLAPSED } from './LeftSidebar';
import KanbanBoard from './KanbanBoard';
import {
  currentIterationStories as initialCurrentIteration,
  backlogStories as initialBacklog,
  iceboxStories as initialIcebox,
  doneStories as initialDone,
  blockedStories as initialBlocked,
  mockProject,
  mockUsers,
  type MockStory,
} from '../mockData';

const StoriesContainer = styled(Box)({
  display: 'flex',
  width: '100%',
  height: '100%',
});

const ContentArea = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'sidebarCollapsed',
})<{ sidebarCollapsed: boolean }>(({ sidebarCollapsed }) => ({
  flexGrow: 1,
  marginLeft: sidebarCollapsed ? DRAWER_WIDTH_COLLAPSED : DRAWER_WIDTH,
  height: '100%',
  overflow: 'auto',
  transition: 'margin-left 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
}));

interface StoriesTabProps {
  visibleColumns: string[];
  onCloseColumn: (columnId: string) => void;
  onToggleView: (viewId: string) => void;
  sidebarCollapsed: boolean;
  onToggleSidebarCollapse: () => void;
}

const StoriesTab = ({
  visibleColumns,
  onCloseColumn,
  onToggleView,
  sidebarCollapsed,
  onToggleSidebarCollapse,
}: StoriesTabProps) => {
  const [currentIteration, setCurrentIteration] = useState<MockStory[]>(initialCurrentIteration);
  const [backlog, setBacklog] = useState<MockStory[]>(initialBacklog);
  const [icebox, setIcebox] = useState<MockStory[]>(initialIcebox);
  const [done, setDone] = useState<MockStory[]>(initialDone);
  const [blocked, setBlocked] = useState<MockStory[]>(initialBlocked);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const getStories = (droppableId: string) => {
      switch (droppableId) {
        case 'current-iteration':
          return currentIteration;
        case 'backlog':
          return backlog;
        case 'icebox':
          return icebox;
        case 'done':
          return done;
        case 'blocked':
          return blocked;
        default:
          return [];
      }
    };

    const setStories = (droppableId: string, stories: MockStory[]) => {
      switch (droppableId) {
        case 'current-iteration':
          setCurrentIteration(stories);
          break;
        case 'backlog':
          setBacklog(stories);
          break;
        case 'icebox':
          setIcebox(stories);
          break;
        case 'done':
          setDone(stories);
          break;
        case 'blocked':
          setBlocked(stories);
          break;
      }
    };

    const sourceStories = [...getStories(source.droppableId)];
    const destStories =
      source.droppableId === destination.droppableId
        ? sourceStories
        : [...getStories(destination.droppableId)];

    const [movedStory] = sourceStories.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceStories.splice(destination.index, 0, movedStory);
      setStories(source.droppableId, sourceStories);
    } else {
      destStories.splice(destination.index, 0, movedStory);
      setStories(source.droppableId, sourceStories);
      setStories(destination.droppableId, destStories);
    }
  };

  const handleToggleFavorite = (storyId: string) => {
    const toggleInArray = (stories: MockStory[]) =>
      stories.map((story) =>
        story.id === storyId ? { ...story, isFavorite: !story.isFavorite } : story
      );

    setCurrentIteration(toggleInArray);
    setBacklog(toggleInArray);
    setIcebox(toggleInArray);
    setDone(toggleInArray);
    setBlocked(toggleInArray);
  };

  const handleStoryClick = (story: MockStory) => {
    console.log('Story clicked:', story);
  };

  const handleAddStory = (columnId: string, storyData: { title: string; type: string; points?: number; description: string }) => {
    const newStory: MockStory = {
      id: `story-${Date.now()}`,
      title: storyData.title,
      type: storyData.type as MockStory['type'],
      state: 'unstarted',
      points: storyData.points,
      description: storyData.description,
      isFavorite: false,
      labels: [],
      owners: [],
      requester: mockUsers[0], // Default to first user
      createdAt: new Date(),
    };

    const addToColumn = (stories: MockStory[]) => [...stories, newStory];

    switch (columnId) {
      case 'current-iteration':
        setCurrentIteration(addToColumn);
        break;
      case 'backlog':
        setBacklog(addToColumn);
        break;
      case 'icebox':
        setIcebox(addToColumn);
        break;
      case 'done':
        setDone(addToColumn);
        break;
      case 'blocked':
        setBlocked(addToColumn);
        break;
    }
  };

  const iterationMetadata = `${mockProject.currentIteration.completedPoints} of ${mockProject.currentIteration.totalPoints} points · ${mockProject.currentIteration.startDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })} - ${mockProject.currentIteration.endDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}`;

  return (
    <StoriesContainer>
      <LeftSidebar
        activeViews={visibleColumns}
        onToggleView={onToggleView}
        collapsed={sidebarCollapsed}
        onToggleCollapse={onToggleSidebarCollapse}
      />
      <ContentArea sidebarCollapsed={sidebarCollapsed}>
        <KanbanBoard
          currentIteration={currentIteration}
          backlog={backlog}
          icebox={icebox}
          done={done}
          blocked={blocked}
          iterationMetadata={iterationMetadata}
          visibleColumns={visibleColumns}
          onDragEnd={handleDragEnd}
          onToggleFavorite={handleToggleFavorite}
          onStoryClick={handleStoryClick}
          onAddStory={handleAddStory}
          onCloseColumn={onCloseColumn}
        />
      </ContentArea>
    </StoriesContainer>
  );
};

export default StoriesTab;
