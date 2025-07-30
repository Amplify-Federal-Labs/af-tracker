import { Box } from "@mui/material";
import type { UserStory } from "../../models/userStory";

interface DoneProps {
  stories: UserStory[]
}

const Done = ({ stories }: DoneProps) => {
  return (
    <Box component="section" sx={{ p: 2, border: "1px" }}>
      { stories.map(story => <p>{story.title}</p>)}
    </Box>
  );
};

export default Done;
