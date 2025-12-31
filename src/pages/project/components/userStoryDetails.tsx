import { Grid, Typography } from "@mui/material";
import type { StoryState, UserStory } from "../../../viewModels/userStory";
import type { User } from "../../../viewModels/user";
import Owners from "./owners";
import PointsSelect from "./pointsSelect";
import StateSelect from "./stateSelect";

interface UserStoryDetailsProps {
  story: UserStory;
  users: User[];
  onOwnersChange: (owners: User[]) => void;
  onPointsChange: (points?: number) => void;
  onStateChange: (state: StoryState) => void;
}

const UserStoryDetails = ({
  story,
  users,
  onOwnersChange,
  onPointsChange,
  onStateChange,
}: UserStoryDetailsProps) => {
  return (
    <Grid container spacing={2}>
      <Grid size={3}>
        <Typography variant="h6">Requester</Typography>
      </Grid>
      <Grid size={3}>
        <Typography variant="body1">{story.requester.name}</Typography>
      </Grid>
      <Grid size={3}>
        <Typography variant="h6">Owners</Typography>
      </Grid>
      <Grid size={3}>
        <Owners owners={story.owners} users={users} onChange={onOwnersChange} />
      </Grid>

      <Grid size={3}>
        <Typography variant="h6">Points</Typography>
      </Grid>
      <Grid size={3}>
        <PointsSelect points={story.points} onChange={onPointsChange} />
      </Grid>
      <Grid size={3}>
        <Typography variant="h6">State</Typography>
      </Grid>
      <Grid size={3}>
        <StateSelect state={story.state} onChange={onStateChange} />
      </Grid>
    </Grid>
  );
};

export default UserStoryDetails;
