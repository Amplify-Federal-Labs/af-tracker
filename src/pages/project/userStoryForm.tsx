import { Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import type {
  Impediment,
  StoryState,
  StoryType,
  UserStory,
} from "../../models/userStory";
import StoryTypeSelect from "./components/storyTypeSelect";
import type { User } from "../../models/user";
import Owners from "./components/owners";
import PointsSelect from "./components/pointsSelect";
import StateSelect from "./components/stateSelect";
import Blockers from "./components/blockers";
import Description from "./components/description";

interface UserStoryFormProps {
  story: UserStory;
  onSave: (story: UserStory) => void;
  users: User[];
}

const UserStoryForm = (props: UserStoryFormProps) => {
  const [story, setStory] = useState(props.story);

  const handleTypeChange = (type: StoryType) => {
    setStory({
      ...story,
      type,
    });
  };
  const handleTitleChange = (title: string) => {
    setStory({
      ...story,
      title,
    });
  };

  const handleChangeOwners = (owners: User[]) => {
    setStory({
      ...story,
      owners,
    });
  };

  const handlePointChange = (points?: number) => {
    setStory({
      ...story,
      points,
    });
  };

  const handleStateChange = (state: StoryState) => {
    setStory({
      ...story,
      state,
    });
  };

  const handleAddBlocker = (blocker: Impediment) => {
    const updatedBlockers = story.blockers.concat([blocker]);
    setStory({
      ...story,
      blockers: updatedBlockers,
    });
  };

  const handleUpdateBlocker = (indexToUpdate: number, blocker: Impediment) => {
    setStory({
      ...story,
      blockers: story.blockers.map((x, index) => {
        if (index == indexToUpdate) {
          x = blocker;
        }
        return x;
      }),
    });
  };

  const handleResolveBlocker = (indexToResolve: number) => {
    setStory({
      ...story,
      blockers: story.blockers.map((x, index) => {
        if (index == indexToResolve) {
          x.isResolved = true;
          x.resolvedDate = new Date();
        }
        return x;
      }),
    });
  };

  const handleDeleteBlocker = (indexToRemove: number) => {
    setStory({
      ...story,
      blockers: story.blockers.filter((_, index) => index != indexToRemove),
    });
  };

  const handleDescriptionChange = (description: string) => {
    setStory({
      ...story,
      description,
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid size={4}>
        <StoryTypeSelect
          value={story.type}
          onChange={handleTypeChange}
          required
        />
      </Grid>
      <Grid size={8}>
        <TextField
          value={story.title}
          onChange={(event) => handleTitleChange(event.target.value)}
          required
          fullWidth
        />
      </Grid>
      <Grid size={2}>
        <Button color="secondary" variant="outlined">
          Close
        </Button>
      </Grid>
      <Grid size={8} />
      <Grid size={2}>
        <Button color="primary" variant="contained">
          Save
        </Button>
      </Grid>

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
        <Owners
          owners={story.owners}
          users={props.users}
          onChange={handleChangeOwners}
        />
      </Grid>

      <Grid size={3}>
        <Typography variant="h6">Points</Typography>
      </Grid>
      <Grid size={3}>
        <PointsSelect points={story.points} onChange={handlePointChange} />
      </Grid>
      <Grid size={3}>
        <Typography variant="h6">State</Typography>
      </Grid>
      <Grid size={3}>
        <StateSelect state={story.state} onChange={handleStateChange} />
      </Grid>

      <Grid size={12}>
        <Typography variant="h6">Blockers</Typography>
      </Grid>
      <Grid size={12}>
        <Blockers
          blockers={story.blockers}
          onAdd={handleAddBlocker}
          onUpdate={handleUpdateBlocker}
          onResolve={handleResolveBlocker}
          onDelete={handleDeleteBlocker}
        />
      </Grid>

      <Grid size={12}>
        <Typography variant="h6">Description</Typography>
      </Grid>
      <Grid size={12}>
        <Description
          text={story.description}
          onChange={handleDescriptionChange}
        />
      </Grid>
    </Grid>
  );
};

export default UserStoryForm;
