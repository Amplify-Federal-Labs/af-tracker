import { Box } from "@mui/material";
import type { Project } from "../../models/project";
import ProjectCard from "./components/ProjectCard";

interface ListPropType {
    projects: Project[];
}

const List = ({ projects }: ListPropType) => {
    return (
        <Box
            sx={{
                width: '100%',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))',
                gap: 2,
            }}
            >
            {
                projects.map((project) => {
                    return <ProjectCard key={project.id} project={project} />
                })
            }
        </Box>        
    );
}

export default List;