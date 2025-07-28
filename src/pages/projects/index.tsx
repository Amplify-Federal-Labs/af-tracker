import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getProjects } from "../../api";
import ProjectList from "./projectList";
import { PageContainer } from "@toolpad/core/PageContainer";

const ProjectListContainer = () => {
    // Queries
    const { isPending, isError, data, error } = useQuery({ queryKey: ['projects'], queryFn: getProjects });

    if (isPending) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

    return (
        <PageContainer>
            <ProjectList projects={data} />
        </PageContainer>
    )
}

export default ProjectListContainer;