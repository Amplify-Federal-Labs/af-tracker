import { useQuery, useQueryClient } from "@tanstack/react-query"
import { PageContainer } from "@toolpad/core/PageContainer";
import { useState } from "react";
import { getProjects, addProject } from "../../api";
import ProjectList from "./projectList";
import ProjectDetailDialog from "./projectDetailDialog";
import AddProjectFab from "./addProjectFab";

const ProjectListContainer = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [name, setName] = useState<string>("");
    const [description, setDescriptoin] = useState<string>("");
    const queryClient = useQueryClient();
    
    // Queries
    const { isPending, isError, data, error } 
        = useQuery({ queryKey: ['projects'], queryFn: getProjects });

    if (isPending) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

    const handleFabClick = () => {
        setName("");
        setDescriptoin("");
        setDialogOpen(true);
    };

    const handleDialogSave = async (
        name: string, 
        description: string
    ) => {
        try {
            await addProject({ name, description });
            queryClient.invalidateQueries({ queryKey: ['projects'] });
            setDialogOpen(false);
        } catch (error) {
            console.error('Failed to add project:', error);
        }
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    return (
        <PageContainer>
            <ProjectList projects={data} />
            <AddProjectFab onClick={handleFabClick} />
            <ProjectDetailDialog 
                name={name}
                description={description}
                open={dialogOpen}
                onSave={handleDialogSave}
                onClose={handleDialogClose}
            />
        </PageContainer>
    )
}

export default ProjectListContainer;