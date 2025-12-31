import { Button, Grid, TextField } from "@mui/material";
import { useState } from "react";
import type {
  Blocker,
  StoryState,
  StoryType,
  Task,
  UserStory,
} from "../../viewModels/userStory";
import StoryTypeSelect from "./components/storyTypeSelect";
import type { User } from "../../viewModels/user";
import UserStoryDetails from "./components/userStoryDetails";
import Blockers from "./components/blockers";
import Description from "./components/description";
import LabelSelect from "./components/labelSelect";
import Tasks from "./components/tasks";
import FormSection from "../../components/formSection";

interface UserStoryFormProps {
  story: UserStory;
  users: User[];
  labels: string[];
  onCancel: () => void;
  onSave: (story: UserStory) => void;
  onAddNewLabel: (label: string) => void;
}

const UserStoryForm = (props: UserStoryFormProps) => {
  const [story, setStory] = useState(props.story);
  const [labels, setLabels] = useState(props.labels);

  const handleSave = () => {
    props.onSave(story);
  };

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

  const handleAddBlocker = (blocker: Blocker) => {
    const updatedBlockers = story.blockers.concat([blocker]);
    setStory({
      ...story,
      blockers: updatedBlockers,
    });
  };

  const handleUpdateBlocker = (indexToUpdate: number, blocker: Blocker) => {
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
        <Button color="secondary" variant="outlined" onClick={props.onCancel}>
          Cancel
        </Button>
      </Grid>
      <Grid size={8} />
      <Grid size={2}>
        <Button color="primary" variant="contained" onClick={handleSave}>
          Save
        </Button>
      </Grid>

      <Grid size={12}>
        <FormSection>
          <UserStoryDetails
            story={story}
            users={props.users}
            onOwnersChange={handleChangeOwners}
            onPointsChange={handlePointChange}
            onStateChange={handleStateChange}
          />
        </FormSection>
      </Grid>

      <Grid size={12}>
        <FormSection label="Blockers">
          <Blockers
            blockers={story.blockers}
            onAdd={handleAddBlocker}
            onUpdate={handleUpdateBlocker}
            onResolve={handleResolveBlocker}
            onDelete={handleDeleteBlocker}
          />
        </FormSection>
      </Grid>

      <Grid size={12}>
        <FormSection label="Description">
          <Description
            text={story.description}
            onChange={handleDescriptionChange}
          />
        </FormSection>
      </Grid>

      <Grid size={12}>
        <FormSection label="Labels">
          <LabelSelect
            availableLabels={props.labels}
            selectedLabels={story.labels}
            onAddNewLabel={handleAddNewLabel}
            onChange={handleLabelsChange}
          />
        </FormSection>
      </Grid>

      <Grid size={12}>
        <FormSection label="Tasks">
          <Tasks
            tasks={story.tasks}
            onAdd={handleAddTask}
            onDelete={handleDeleteTask}
            onUpdate={handleUpdateTask}
            onComplete={handleCompleteTask}
          />
        </FormSection>
      </Grid>
    </Grid>
  );
};

export default UserStoryForm;
