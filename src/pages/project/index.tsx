import { PageContainer } from "@toolpad/core/PageContainer";
import { useParams } from "react-router";
import ProjectView from "./project";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getStoriesForProject, saveUserStory, reorderUserStories } from "../../api/stories";
import type { UserStory } from "../../models/userStory";
import { v4 } from "uuid";
import { getProjectById } from "../../api/projects";
import { useContext, useMemo } from "react";
import { SessionContext } from "@toolpad/core/AppProvider";

const ProjectContainer = () => {
  const params = useParams();
  const projectId = params.projectId || v4();

  const queryClient = useQueryClient();
  const session = useContext(SessionContext);

  // Fetch project
  const { isPending: isProjectPending, isError: isProjectError, data: projectData, error: projectError } = useQuery({
    queryKey: ['projects', projectId],
    queryFn: () => getProjectById(projectId),
  });

  // Fetch stories
  const { isPending: isStoriesPending, isError: isStoriesError, data: storiesData, error: storiesError } = useQuery({
    queryKey: ['stories', projectId],
    queryFn: () => getStoriesForProject(projectId),
    enabled: !!projectId,
  });

  const isPending = isProjectPending || isStoriesPending;
  const isError = isProjectError || isStoriesError;
  const error = projectError || storiesError;

  // Organize stories by location and state
  const { done, backlog, icebox } = useMemo(() => {
    if (!storiesData) {
      return { done: [], backlog: [], icebox: [] };
    }

    const done = storiesData.filter(story => story.state === 'done');
    const backlog = storiesData.filter(story => story.location === 'backlog' && story.state !== 'done');
    const icebox = storiesData.filter(story => story.location === 'icebox' && story.state !== 'done');

    return { done, backlog, icebox };
  }, [storiesData]);

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (!session) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  const handleSaveStory = async (story: UserStory) => {
    try {
      await saveUserStory(projectId, story);
      await queryClient.invalidateQueries({ queryKey: ["stories", projectId] });
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
      await queryClient.invalidateQueries({ queryKey: ["stories", projectId] });
    } catch (error) {
      console.error("Failed to reorder stories:", error);
    }
  };

  return (
    <PageContainer title={`Project ${projectData.name}`}>
      <ProjectView
        projectId={projectData.id}
        users={projectData.members}
        user={session.user!}
        labels={projectData.labels}
        done={done}
        backlog={backlog}
        icebox={icebox}
        onAddNewLabel={handleAddNewLabel}
        onSaveStory={handleSaveStory}
        onReorderStories={handleReorderStories}
      />
    </PageContainer>
  );
};

export default ProjectContainer;
