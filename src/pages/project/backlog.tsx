import type { UserStory } from "../../models/userStory";

interface BacklogProps {
  stories: UserStory[]
}

const Backlog = ({ stories }: BacklogProps) => {
  return (
    <>
      { stories.map(story => <p>{story.title}</p>)}
    </>
  );
};

export default Backlog;
