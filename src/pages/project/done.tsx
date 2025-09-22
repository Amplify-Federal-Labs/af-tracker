import type { UserStory } from "../../models/userStory";
import StoryList from "./storyList";
import type { User } from "../../models/user";

interface DoneProps {
  projectId: string;
  user: User;
  users: User[];
  labels: string[];
  stories: UserStory[];
  onSelectStory: (story: UserStory) => void;
}

const Done = ({ stories, onSelectStory }: DoneProps) => {
  return (
    <StoryList 
      label="done"
      stories={stories.sort((a, b) => a.index - b.index)} 
      onSelect={onSelectStory} 
    />
  );
};

export default Done;
