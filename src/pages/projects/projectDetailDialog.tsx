import { Dialog, DialogTitle, TextField, DialogContent, DialogActions, Stack } from "@mui/material";
import { useState } from "react";
import { PrimaryButton, SecondaryButton } from "../../examples/litetracker/design-system";

interface ProjectDetailDialogProps {
    name: string;
    description: string;
    open: boolean;
    onSave: (name: string, description: string) => void;
    onCancel: () => void;
}

const ProjectDetailDialog = (props: ProjectDetailDialogProps) => {
    const [name, setName] = useState(props.name);
    const [description, setDescription] = useState(props.description);

    const handleSave = () => {
        props.onSave(name, description);
    }

    const handleCancel = () => {
        props.onCancel();
    }

    return (
        <Dialog onClose={handleCancel} open={props.open} maxWidth="sm" fullWidth>
            <DialogTitle>Enter Project Detail</DialogTitle>
            <DialogContent>
                <Stack spacing={2} sx={{ mt: 1 }}>
                    <TextField 
                        required
                        label="Name" 
                        variant="outlined"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        fullWidth
                     />
                    <TextField 
                        required
                        label="Description" 
                        variant="outlined"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        fullWidth
                        multiline
                        rows={3}
                     />
                </Stack>
            </DialogContent>
            <DialogActions>
                <SecondaryButton onClick={handleCancel}>Cancel</SecondaryButton>
                <PrimaryButton
                    onClick={handleSave}
                    disabled={!name.trim() || !description.trim()}
                >Save</PrimaryButton>
            </DialogActions>
        </Dialog>
    )
}

export default ProjectDetailDialog;