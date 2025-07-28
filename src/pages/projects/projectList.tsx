import { Box } from "@mui/material";
import { Project } from "../../models/project"
import ProjectCard from "./projectCard";

interface ProjectListProps {
    projects: Project[];
}

const ProjectList = ({ projects }: ProjectListProps) => {
    return (
        <Box
            sx={{
                width: '100%',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))',
                gap: 2,
            }}
            >
            { projects.map(project => <ProjectCard key={project.id} project={project} />)}
        </Box>
    )
}

export default ProjectList;
