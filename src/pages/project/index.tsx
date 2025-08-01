import { PageContainer } from "@toolpad/core/PageContainer";
import { useParams } from "react-router";
import ProjectView from "./project";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { addUserStoryToProject, getUserStoriesInProject } from "../../api/stories";
import type { CreateStoryRequest } from "../../models/userStory";
import { v4 } from "uuid";

const ProjectContainer = () => {
  const params = useParams();
  const projectId = params.projectId || v4();

  const queryClient = useQueryClient();
  
  // Queries
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['projects', projectId],
    queryFn: () => getUserStoriesInProject(projectId),
  });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const handleAddStory = async (request: CreateStoryRequest) => {
    // TODO: call the backedn to create story and refresh cache
    try {
      await addUserStoryToProject(projectId, request);
      await queryClient.invalidateQueries({ queryKey: ["projects", projectId] });
    } catch (error) {
      console.error("Failed to add story:", error);
    }    
  }

  return (
    <PageContainer title={`Project ${data.name}`}>
      <ProjectView
        done={data.done}
        backlog={data.backlog}
        icebox={data.icebox}
        onAddStory={handleAddStory}
      />
    </PageContainer>
  );
};

export default ProjectContainer;
