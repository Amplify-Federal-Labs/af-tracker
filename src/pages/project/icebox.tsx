import type { CreateStoryRequest, UserStory } from "../../models/userStory";
import type { User } from "../../models/user";

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
    <>
      {stories.map((story) => (
        <p>{story.title}</p>
      ))}
    </>
  );
};

export default Icebox;
