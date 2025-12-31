import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import type { Project } from "../../viewModels/project";

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
  return (
    <Card>
      <CardActionArea onClick={() => onClick(project)}>
        <CardContent>
          <Typography variant="h5">{project.name}</Typography>
          <Typography variant="body1">{project.description}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProjectCard;
