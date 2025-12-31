import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import type { UserStory } from "../../viewModels/userStory";
import UserStoryForm from "./userStoryForm";
import type { User } from "../../viewModels/user";

interface EditStoryDialogProps {
  open: boolean;
  story: UserStory;
  users: User[];
  labels: string[];
  onSave: (story: UserStory) => void;
  onCancel: () => void;
  onAddNewLabel: (label: string) => void;
}

const EditStoryDialog = (props: EditStoryDialogProps) => {
  const handleSave = (story: UserStory) => {
    props.onSave(story);
  };

  return (
    <Dialog open={props.open} maxWidth="md">
      <DialogTitle>User Story</DialogTitle>
      <DialogContent>
        <UserStoryForm
          story={props.story}
          users={props.users}
          labels={props.labels}
          onCancel={props.onCancel}
          onSave={handleSave}
          onAddNewLabel={props.onAddNewLabel}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditStoryDialog;
