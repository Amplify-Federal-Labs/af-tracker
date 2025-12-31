import type { UserStory } from "../../viewModels/userStory";
import StoryList from "./storyList";
import type { User } from "../../viewModels/user";

interface BacklogProps {
  projectId: string;
  user: User;
  users: User[];
  labels: string[];
  stories: UserStory[];
  onAddNewLabel: (label: string) => void;
  onSelectStory: (story: UserStory) => void;
}

const Backlog = ({ stories, onSelectStory }: BacklogProps) => {
  return (
    <StoryList 
      label="backlog"  
      stories={stories.sort((a, b) => a.index - b.index)} 
      onSelect={onSelectStory} 
    />
  );
};

export default Backlog;
