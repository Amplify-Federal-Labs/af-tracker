import type { UserStory } from "../../models/userStory";
import StoryList from "./storyList";

interface DoneProps {
  stories: UserStory[]
}

const Done = ({ stories }: DoneProps) => {
  return (
    <StoryList stories={stories} />
  );
};

export default Done;
