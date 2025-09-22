import { Box, FormControlLabel, Stack, Switch } from "@mui/material";
import { useState } from "react";
import Done from "./done";
import Backlog from "./backlog";
import Icebox from "./icebox";
import type { UserStory } from "../../models/userStory";
import type { User } from "../../models/user";
import AddStoryFab from "../../components/addFab";
import EditStoryDialog from "./editStoryDialog";
import { DragDropContext, type DropResult } from "@hello-pangea/dnd";

interface ProjectViewProps {
  projectId: string;
  users: User[];
  labels: string[];
  user: User;
  done: UserStory[];
  backlog: UserStory[];
  icebox: UserStory[];
  onAddNewLabel: (label: string) => void;
  onSaveStory: (story: UserStory) => void;
  onReorderStories: (stories: UserStory[]) => void;
}

function reorder<TItem>(
  list: TItem[],
  startIndex: number,
  endIndex: number,
): TItem[] {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
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
  onSaveStory,
  onReorderStories,
}: ProjectViewProps) => {
  const [showDone, setShowDone] = useState(true);
  const [showBacklog, setShowBacklog] = useState(true);
  const [showIcebox, setShowIcebox] = useState(true);
  const [openAddStoryDialog, setOpenAddStoryDialog] = useState(false);

  const [storyToEdit, setStoryToEdit] = useState<UserStory>({
    index: 0,
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
  })

  const handleAddStory = () => {
    setStoryToEdit({
      index: 0,
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
    });
    
    setOpenAddStoryDialog(true);
  }

  const handleSelectStory = (story: UserStory) => {
    setStoryToEdit(story);
    setOpenAddStoryDialog(true);
  }

  const handleSaveStory = (story: UserStory) => {
    onSaveStory(story);
    setOpenAddStoryDialog(false);
  };

  const handleCancel = () => {
    setOpenAddStoryDialog(false);
  };

  const handleDragEnd = (result: DropResult) => {
      // dropped outside the list
      if (!result.destination) {
          return;
      }

      if (result.destination.index === result.source.index) {
        return;
      }

      const stories = result.source.droppableId == 'done' ? done :
        result.source.droppableId == 'backlog' ? backlog : icebox; 

      const reorderedStories = reorder<UserStory>(
          stories,
          result.source.index,
          result.destination.index
      );

      onReorderStories(reorderedStories);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Stack spacing={2}>
        <Stack direction={"row"} spacing={2}>
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
            alignItems: "stretch",
          }}
        >
          {showDone && (
            <Box
              component="section"
              flexGrow={1}
              sx={{ p: 2, border: "1px dashed grey" }}
            >
              <Done 
                projectId={projectId}
                user={user}
                users={users}
                labels={labels}
                stories={done}
                onSelectStory={handleSelectStory}
              />
            </Box>
          )}
          {showBacklog && (
            <Box
              component="section"
              flexGrow={1}
              sx={{ p: 2, border: "1px dashed grey" }}
            >
              <Backlog
                projectId={projectId}
                user={user}
                users={users}
                labels={labels}
                stories={backlog}
                onAddNewLabel={onAddNewLabel}
                onSelectStory={handleSelectStory}
              />
            </Box>
          )}
          {showIcebox && (
            <Box
              component="section"
              flexGrow={1}
              sx={{ p: 2, border: "1px dashed grey" }}
            >
              <Icebox
                projectId={projectId}
                user={user}
                users={users}
                labels={labels}
                stories={icebox}
                onAddNewLabel={onAddNewLabel}
                onSelectStory={handleSelectStory}
              />
            </Box>
          )}
        </Stack>
      </Stack>
      <AddStoryFab onClick={handleAddStory} />
      <EditStoryDialog
        open={openAddStoryDialog}
        story={storyToEdit}
        users={users}
        labels={labels}
        onAddNewLabel={onAddNewLabel}
        onSave={handleSaveStory}
        onCancel={handleCancel}
      />
    </DragDropContext>
  );
};

export default ProjectView;
