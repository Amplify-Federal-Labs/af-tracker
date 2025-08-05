import { Box } from "@mui/material";
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
    <Box component="section" sx={{ p: 2, border: "1px dashed grey" }}>
      {stories.map((story) => (
        <p>{story.title}</p>
      ))}
    </Box>
  );
};

export default Icebox;
