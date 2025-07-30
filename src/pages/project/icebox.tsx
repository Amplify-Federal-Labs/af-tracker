import { Box } from "@mui/material";
import type { CreateStoryRequest, UserStory } from "../../models/userStory";
import AddStoryFab from "../../components/addFab";

interface IceboxProps {
  stories: UserStory[];
  onAddStory: (story: CreateStoryRequest) => void;
}

const Icebox = ({ stories, onAddStory }: IceboxProps) => {
  const handleAddStory = () => {
    const request: CreateStoryRequest = {
      type: "feature",
      title: "my new user story",
      description: "this is my description",
      labels: [],
      tasks: [],
    };

    onAddStory(request);
  };

  return (
    <Box component="section" sx={{ p: 2, border: "1px dashed grey" }}>
      {stories.map((story) => (
        <p>{story.title}</p>
      ))}
      <AddStoryFab onClick={handleAddStory} />
    </Box>
  );
};

export default Icebox;
