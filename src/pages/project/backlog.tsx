import type { UserStory } from "../../models/userStory";
import StoryList from "./storyList";

interface BacklogProps {
  stories: UserStory[]
}

const Backlog = ({ stories }: BacklogProps) => {
  return (
    <StoryList stories={stories} />
  );
};

export default Backlog;
