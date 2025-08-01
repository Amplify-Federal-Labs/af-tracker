import {
  Button,
  ButtonBase,
  Checkbox,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import type { Task } from "../../../../models/userStory";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

interface TaskViewProps {
  index: number;
  task: Task;
  onUpdate: (index: number, blocker: Task) => void;
  onComplete: (index: number) => void;
  onDelete: (index: number) => void;
}

const TaskView = ({
  index,
  task,
  onUpdate,
  onComplete,
  onDelete,
}: TaskViewProps) => {
  const [editMode, setEditMode] = useState(false);
  const [description, setDescription] = useState(task.description);

  const handleUpdate = (description: string) => {
    const updatedTask = {
      ...task,
      description,
    };
    onUpdate(index, updatedTask);
  };

  const handleClick = () => {
    setEditMode(true);
  };

  if (editMode) {
    return (
      <Grid container spacing={2}>
        <Grid size={8}>
          <TextField
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            fullWidth
          />
        </Grid>
        <Grid size={2}>
          <Button
            variant="text"
            size="small"
            color="secondary"
            onClick={() => setEditMode(false)}
          >
            Cancel
          </Button>
        </Grid>
        <Grid size={2}>
          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={() => handleUpdate(description)}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container spacing={2}>
      <Grid size={1}>
        <Checkbox
          checked={task.isCompleted}
          disabled={task.isCompleted}
          aria-label="complete"
          onChange={() => onComplete(index)}
        />
      </Grid>
      <Grid size={10}>
        <ButtonBase onClick={handleClick} disabled={task.isCompleted}>
          <Typography variant="body1">{task.description}</Typography>
        </ButtonBase>
      </Grid>
      <Grid size={1}>
        <IconButton aria-label="delete" onClick={() => onDelete(index)}>
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default TaskView;
