import type { UserStory } from "../../viewModels/userStory";
import type { User } from "../../viewModels/user";
import StoryList from "./storyList";

interface IceboxProps {
  projectId: string;
  user: User;
  users: User[];
  labels: string[];
  stories: UserStory[];
  onAddNewLabel: (label: string) => void;
  onSelectStory: (story: UserStory) => void;
}

const Icebox = ({ stories, onSelectStory }: IceboxProps) => {
  return (
    <StoryList 
      label="icebox" 
      stories={stories.sort((a, b) => a.index - b.index)} 
      onSelect={onSelectStory} 
    />
  );
};

export default Icebox;
