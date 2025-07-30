import { Box } from "@mui/material";
import type { UserStory } from "../../models/userStory";

interface BacklogProps {
  stories: UserStory[]
}

const Backlog = ({ stories }: BacklogProps) => {
  return (
    <Box component="section" sx={{ p: 2, border: '1px' }}>
      { stories.map(story => <p>{story.title}</p>)}
    </Box>
  );
};

export default Backlog;
