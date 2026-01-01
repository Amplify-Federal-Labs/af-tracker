import axios, { type AxiosResponse } from "axios";
import { auth } from "../firebase/firebaseConfig";
import type { UserStory, StoryLocation } from "../viewModels/userStory";
import type {
  CreateStoryRequest,
  UpdateStoryRequest,
  StoryResponse,
  ReorderStoriesRequest } from "../DTOs";
import { mapStoryResponseToUserStory } from "../mappers";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL || 'http://127.0.0.1:5001/af-tracker-716c0/us-central1/api/v2'
});

const getStoriesForProject = async (
  projectId: string, 
  ownerId?: string, 
  label?: string,
  location?: StoryLocation
): Promise<UserStory[]> => {
  const idToken = await auth.currentUser?.getIdToken();

  const params = new URLSearchParams();
  if (ownerId) params.append('ownerId', ownerId);
  if (label) params.append('label', label);
  if (location) params.append('location', location);

  const response = await api.get<StoryResponse[]>(
    `/projects/${projectId}/stories${params.toString() ? `?${params.toString()}` : ''}`,
    {
      headers: {
        Authorization: `Bearer ${idToken}`
      }
    }
  );

  return response.data.map((dto) => mapStoryResponseToUserStory(dto));
};

const reorderUserStories = async (
  projectId: string,
  location: StoryLocation,
  storyIds: string[]
): Promise<UserStory[]> => {
  const idToken = await auth.currentUser?.getIdToken();

  const requestBody: ReorderStoriesRequest = {
    location,
    storyIds
  };

  const response = await api.put<ReorderStoriesRequest, AxiosResponse<StoryResponse[]>>(
    `/projects/${projectId}/stories/reorder`,
    requestBody,
    {
      headers: {
        Authorization: `Bearer ${idToken}`
      }
    });

  return response.data.map((dto) => mapStoryResponseToUserStory(dto));
}


const saveUserStory = async (projectId: string, request: UserStory): Promise<UserStory> => {
  const idToken = await auth.currentUser?.getIdToken();

  if (request.id) {
    const response = await api.put<UpdateStoryRequest, AxiosResponse<StoryResponse>>(
      `/projects/${projectId}/stories/${request.id}`,
      request,
      {
        headers: {
          Authorization: `Bearer ${idToken}`
        }
      });
    return mapStoryResponseToUserStory(response.data);

  }

  const response = await api.post<CreateStoryRequest, AxiosResponse<StoryResponse>>(
    `/projects/${projectId}/stories`,
    request,
    {
      headers: {
        Authorization: `Bearer ${idToken}`
      }
    });
  return mapStoryResponseToUserStory(response.data);
}

export { getStoriesForProject, saveUserStory, reorderUserStories };