import { Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import type {
  Impediment,
  StoryState,
  StoryType,
  Task,
  UserStory,
} from "../../models/userStory";
import StoryTypeSelect from "./components/storyTypeSelect";
import type { User } from "../../models/user";
import Owners from "./components/owners";
import PointsSelect from "./components/pointsSelect";
import StateSelect from "./components/stateSelect";
import Blockers from "./components/blockers";
import Description from "./components/description";
import LabelSelect from "./components/labelSelect";
import Tasks from "./components/tasks"

interface UserStoryFormProps {
  story: UserStory;
  onSave: (story: UserStory) => void;
  users: User[];
  labels: string[];
  onAddNewLabel: (label: string) => void;
}

const UserStoryForm = (props: UserStoryFormProps) => {
  const [story, setStory] = useState(props.story);
  const [labels, setLabels] = useState(props.labels);

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

  const handleAddNewLabel = (newLabel: string) => {
    const newLabels = [...labels, newLabel];
    setLabels(newLabels);

    props.onAddNewLabel(newLabel);
  };

  const handleLabelsChange = (labels: string[]) => {
    setStory({
      ...story,
      labels,
    });
  };

  const handleAddTask = (task: Task) => {
    const updatedTasks = story.tasks.concat([task]);
    setStory({
      ...story,
      tasks: updatedTasks,
    });
  };

  const handleUpdateTask = (indexToUpdate: number, task: Task) => {
    setStory({
      ...story,
      tasks: story.tasks.map((x, index) => {
        if (index == indexToUpdate) {
          x = task;
        }
        return x;
      }),
    });
  };

  const handleCompleteTask = (indexToResolve: number) => {
    setStory({
      ...story,
      tasks: story.tasks.map((x, index) => {
        if (index == indexToResolve) {
          x.isCompleted = true;
          x.completedDate = new Date();
        }
        return x;
      }),
    });
  };

  const handleDeleteTask = (indexToRemove: number) => {
    setStory({
      ...story,
      tasks: story.tasks.filter((_, index) => index != indexToRemove),
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

      <Grid size={12}>
        <Typography variant="h6">Labels</Typography>
      </Grid>
      <Grid size={12}>
        <LabelSelect
          availableLabels={props.labels}
          selectedLabels={story.labels}
          onAddNewLabel={handleAddNewLabel}
          onChange={handleLabelsChange}
        />
      </Grid>

      <Grid size={12}>
        <Typography variant="h6">Tasks</Typography>
      </Grid>
      <Grid size={12}>
        <Tasks
          tasks={story.tasks}
          onAdd={handleAddTask}
          onDelete={handleDeleteTask}
          onUpdate={handleUpdateTask}
          onComplete={handleCompleteTask}
        />
      </Grid>
    </Grid>
  );
};

export default UserStoryForm;
