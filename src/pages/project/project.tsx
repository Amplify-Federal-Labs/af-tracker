import { FormControlLabel, Stack, Switch } from "@mui/material";
import { useState } from "react";
import Done from "./done";
import Backlog from "./backlog";
import Icebox from "./icebox";
import type { CreateStoryRequest, UserStory } from "../../models/userStory";
import type { User } from "../../models/user";
import AddStoryFab from "../../components/addFab";
import EditStoryDialog from "./editStoryDialog";
import { v4 } from "uuid";

interface ProjectViewProps {
  projectId: string;
  users: User[];
  labels: string[];
  user: User;
  done: UserStory[];
  backlog: UserStory[];
  icebox: UserStory[];
  onAddNewLabel: (label: string) => void;
  onAddStory: (story: CreateStoryRequest) => void;
}

const ProjectView = ({
  projectId,
  users,
  labels,
  user,
  done,
  backlog,
  icebox,
  onAddNewLabel,
  onAddStory,
}: ProjectViewProps) => {
  const [showDone, setShowDone] = useState(true);
  const [showBacklog, setShowBacklog] = useState(true);
  const [showIcebox, setShowIcebox] = useState(true);
  const [openAddStoryDialog, setOpenAddStoryDialog] = useState(false);

  // Consider adding a default prop somewhere
  const newStory: UserStory = {
    id: v4(),
    projectId: projectId,
    type: "feature",
    requester: user,
    title: "",
    owners: [],
    state: "unscheduled",
    blockers: [],
    description: "",
    labels: [],
    tasks: [],
    createdAt: new Date(),
    createdBy: user,
  };

  const handleOpenEditStoryDialog = () => {
    setOpenAddStoryDialog(true);
  };

  const handleSaveStory = (story: UserStory) => {
    onAddStory(story);
    setOpenAddStoryDialog(false);
  };

  const handleCancel = () => {
    setOpenAddStoryDialog(false);
  };

  return (
    <>
      <Stack>
        <Stack direction={"row"}>
          <FormControlLabel
            control={
              <Switch
                checked={showDone}
                onChange={(event) => setShowDone(event.target.checked)}
              />
            }
            label="Done"
          />
          <FormControlLabel
            control={
              <Switch
                checked={showBacklog}
                onChange={(event) => setShowBacklog(event.target.checked)}
              />
            }
            label="Backlog"
          />
          <FormControlLabel
            control={
              <Switch
                checked={showIcebox}
                onChange={(event) => setShowIcebox(event.target.checked)}
              />
            }
            label="Icebox"
          />
        </Stack>
        <Stack
          spacing={2}
          direction={"row"}
          sx={{
            justifyContent: "space-evenly",
            alignItems: "flex-start",
          }}
        >
          {showDone && <Done stories={done} />}
          {showBacklog && <Backlog stories={backlog} />}
          {showIcebox && (
            <Icebox
              projectId={projectId}
              user={user}
              users={users}
              labels={labels}
              onAddNewLabel={onAddNewLabel}
              onSaveStory={onAddStory}
              stories={icebox}
            />
          )}
        </Stack>
      </Stack>
      <AddStoryFab onClick={handleOpenEditStoryDialog} />
      <EditStoryDialog
        open={openAddStoryDialog}
        story={newStory}
        users={users}
        labels={labels}
        onAddNewLabel={onAddNewLabel}
        onSave={handleSaveStory}
        onCancel={handleCancel}
      />
    </>
  );
};

export default ProjectView;
