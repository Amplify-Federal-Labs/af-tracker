import { useQuery, useQueryClient } from "@tanstack/react-query"
import { PageContainer } from "@toolpad/core/PageContainer";
import { getProjects, addProject } from "../../api";
import ProjectList from "./projectList";

const ProjectListContainer = () => {
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

    const handleAddProject = async (
        name: string, 
        description: string
    ) => {
        try {
            await addProject({ name, description });
            await queryClient.invalidateQueries({ queryKey: ['projects'] });
        } catch (error) {
            console.error('Failed to add project:', error);
        }
    };

    return (
        <PageContainer>
            <ProjectList 
                projects={data}
                onSelect={() => {}}
                onAdd={handleAddProject} 
            />
        </PageContainer>
    )
}

export default ProjectListContainer;