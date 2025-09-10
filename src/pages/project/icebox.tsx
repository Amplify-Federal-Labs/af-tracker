import type { UserStory } from "../../models/userStory";
import type { User } from "../../models/user";
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
    <StoryList stories={stories} onSelect={onSelectStory} />
  );
};

export default Icebox;
