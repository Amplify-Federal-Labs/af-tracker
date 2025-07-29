import { Box } from "@mui/material";
import type { Project } from "../../models/project";
import ProjectCard from "./projectCard";
import AddProjectFab from "./addProjectFab";
import ProjectDetailDialog from "./projectDetailDialog";
import { useState } from "react";

interface ProjectListProps {
    projects: Project[];
    onSelect: (project: Project) => void;
    onAdd: (name: string, description: string) => void
}

const ProjectList = ({ projects, onAdd }: ProjectListProps) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const name = "";
    const description = "";
    
    const handleAddProject = () => setDialogOpen(true);

    const handleDialogSave = (name: string, description: string) => {
        onAdd(name, description);
        setDialogOpen(false);
    }

    const handleDialogCancel = () => setDialogOpen(false);

    return (
        <>
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
            <AddProjectFab onClick={handleAddProject} />
            { dialogOpen && <ProjectDetailDialog 
                name={name}
                description={description}
                open
                onSave={handleDialogSave}
                onCancel={handleDialogCancel}
            />}
            
        </>
    )
}

export default ProjectList;
