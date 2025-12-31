import {
  Button,
  ButtonBase,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import type { Blocker } from "../../../../viewModels/userStory";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import { useState } from "react";

interface BlockerProps {
  index: number;
  blocker: Blocker;
  onUpdate: (index: number, blocker: Blocker) => void;
  onResolve: (index: number) => void;
  onDelete: (index: number) => void;
}

const Blocker = ({
  index,
  blocker,
  onUpdate,
  onResolve,
  onDelete,
}: BlockerProps) => {
  const [editMode, setEditMode] = useState(false);
  const [description, setDescription] = useState(blocker.description);

  const handleUpdate = (description: string) => {
    const updatedBlocker = {
      ...blocker,
      description,
    };
    onUpdate(index, updatedBlocker);
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
      <Grid size={10}>
        <ButtonBase onClick={handleClick}>
          <Typography variant="body1">{blocker.description}</Typography>
        </ButtonBase>
      </Grid>
      <Grid size={1}>
        <IconButton
          disabled={blocker.isResolved}
          aria-label="resolve"
          onClick={() => onResolve(index)}
        >
          <CheckIcon />
        </IconButton>
      </Grid>
      <Grid size={1}>
        <IconButton aria-label="delete" onClick={() => onDelete(index)}>
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default Blocker;
