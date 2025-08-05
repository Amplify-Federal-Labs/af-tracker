import type { UserStory } from "../../models/userStory";

interface DoneProps {
  stories: UserStory[]
}

const Done = ({ stories }: DoneProps) => {
  return (
    <>
      { stories.map(story => <p>{story.title}</p>)}
    </>
  );
};

export default Done;
