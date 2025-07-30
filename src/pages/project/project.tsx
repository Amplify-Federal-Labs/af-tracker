import { Button, Stack } from "@mui/material";
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

const ProjectView = ({ done, backlog, icebox, onAddStory }: ProjectViewProps) => {
  const [showDone, setShowDone] = useState(true);
  const [showBacklog, setShowBacklog] = useState(true);
  const [showIcebox, setShowIcebox] = useState(true);

  return (
    <Stack>
      <Stack direction={"row"}>
        <Button
          color={showDone ? "primary" : "secondary"}
          onClick={() => setShowDone(!showDone)}
        >
          Done
        </Button>
        <Button
          color={showBacklog ? "primary" : "secondary"}
          onClick={() => setShowBacklog(!showBacklog)}
        >
          Backlog
        </Button>
        <Button
          color={showIcebox ? "primary" : "secondary"}
          onClick={() => setShowIcebox(!showIcebox)}
        >
          Icebox
        </Button>
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
