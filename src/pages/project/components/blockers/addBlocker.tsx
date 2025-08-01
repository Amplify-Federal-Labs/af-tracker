import { Button, ButtonBase, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import type { Impediment } from "../../../../models/userStory";

interface AddBlockerProps {
  onAdd: (blocker: Impediment) => void;
}

const AddBlocker = ({ onAdd }: AddBlockerProps) => {
  const [editMode, setEditMode] = useState(false);
  const [description, setDescription] = useState("");

  const handleEdit = () => setEditMode(true);
  const handleSave = (description: string) => {
    const blocker: Impediment = {
      description,
      isResolved: false,
    };

    onAdd(blocker);
    setEditMode(false);
    setDescription("");
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
            onClick={() => handleSave(description)}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <ButtonBase onClick={handleEdit}>
          <Typography variant="body1" color="secondary">
            Add a blocker or impediment
          </Typography>
        </ButtonBase>
      </Grid>
    </Grid>
  );
};

export default AddBlocker;
