import axios from "axios";
import { auth } from "../firebase/firebaseConfig";
import type { CreateStoryRequest, UserStoriesInProject, UserStory } from "../models/userStory";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL || 'http://127.0.0.1:5001/af-tracker-716c0/us-central1/api'
});

const getUserStoriesInProject = async (projectId: string): Promise<UserStoriesInProject> => {
  const idToken = await auth.currentUser?.getIdToken();

  const response = await api.get<UserStoriesInProject>(`/projects/${projectId}/stories`, {
    headers: {
      Authorization: `Bearer ${idToken}`
    }
  });
  return response.data;
}

const addUserStoryToProject = async (projectId: string, request: CreateStoryRequest): Promise<UserStory> => {
  const idToken = await auth.currentUser?.getIdToken();

  const response = await api.post<UserStory>(`/projects/${projectId}/stories`, request, {
    headers: {
      Authorization: `Bearer ${idToken}`
    }
  });
  return response.data;
}

export { getUserStoriesInProject, addUserStoryToProject };