import type { CreateStoryRequest, UserStory } from "../../models/userStory";
import type { User } from "../../models/user";
import StoryList from "./storyList";

interface IceboxProps {
  projectId: string;
  user: User;
  users: User[];
  labels: string[];
  stories: UserStory[];
  onAddNewLabel: (label: string) => void;
  onSaveStory: (story: CreateStoryRequest) => void;
}

const Icebox = ({ stories }: IceboxProps) => {
  return (
    <StoryList stories={stories} />
  );
};

export default Icebox;
