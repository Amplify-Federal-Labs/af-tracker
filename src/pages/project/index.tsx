import { PageContainer } from "@toolpad/core/PageContainer";
import { useParams } from "react-router";
import ProjectView from "./project";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { saveUserStory, reorderUserStories } from "../../api/stories";
import type { UserStory } from "../../models/userStory";
import { v4 } from "uuid";
import { getProjectById } from "../../api/projects";
import { useContext } from "react";
import { SessionContext } from "@toolpad/core/AppProvider";

const ProjectContainer = () => {
  const params = useParams();
  const projectId = params.projectId || v4();

  const queryClient = useQueryClient();
  const session = useContext(SessionContext);
  
  // Queries
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['projects', projectId],
    queryFn: () => getProjectById(projectId),
  });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (!session) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const handleSaveStory = async (story: UserStory) => {
    try {
      await saveUserStory(projectId, story);
      await queryClient.invalidateQueries({ queryKey: ["projects", projectId] });
    } catch (error) {
      console.error("Failed to add story:", error);
    }    
  }

  // TODO: Call backend to add a new label
  const handleAddNewLabel = () => {};
  // TODO: Call backend to reorder stories, update ordinal
  const handleReorderStories = async (stories: UserStory[]) => {
    try {
      await reorderUserStories(projectId, stories);
      await queryClient.invalidateQueries({ queryKey: ["projects", projectId] });
    } catch (error) {
      console.error("Failed to reorder stories:", error);
    }    
  };

  return (
    <PageContainer title={`Project ${data.name}`}>
      <ProjectView
        projectId={data.id}
        users={data.users}
        user={session.user!}
        labels={data.labels}
        done={data.done}
        backlog={data.backlog}
        icebox={data.icebox}
        onAddNewLabel={handleAddNewLabel}
        onSaveStory={handleSaveStory}
        onReorderStories={handleReorderStories}
      />
    </PageContainer>
  );
};

export default ProjectContainer;
