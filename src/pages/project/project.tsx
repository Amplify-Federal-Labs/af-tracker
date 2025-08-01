import { FormControlLabel, Stack, Switch } from "@mui/material";
import { useState } from "react";
import Done from "./done";
import Backlog from "./backlog";
import Icebox from "./icebox";
import type { CreateStoryRequest, UserStory } from "../../models/userStory";

interface ProjectViewProps {
  done: UserStory[];
  backlog: UserStory[];
  icebox: UserStory[];
  onAddStory: (story: CreateStoryRequest) => void;
}

const ProjectView = ({
  done,
  backlog,
  icebox,
  onAddStory,
}: ProjectViewProps) => {
  const [showDone, setShowDone] = useState(true);
  const [showBacklog, setShowBacklog] = useState(true);
  const [showIcebox, setShowIcebox] = useState(true);

  return (
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
        {showIcebox && <Icebox onAddStory={onAddStory} stories={icebox} />}
      </Stack>
    </Stack>
  );
};

export default ProjectView;
