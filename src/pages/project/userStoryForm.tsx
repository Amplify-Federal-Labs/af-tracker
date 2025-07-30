import { Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import type { StoryType, UserStory } from "../../models/userStory";
import StoryTypeSelect from "./components/storyTypeSelect";
import type { User } from "../../models/user";
import Owners from "./components/owners";

interface UserStoryFormProps {
  story: UserStory;
  onSave: (story: UserStory) => void;
  users: User[]
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
        owners
    });
  }

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
    </Grid>
  );
};

export default UserStoryForm;
