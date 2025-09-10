import axios, { type AxiosResponse } from "axios";
import { auth } from "../firebase/firebaseConfig";
import type { CreateStoryRequest, UpdateStoryRequest, UserStory } from "../models/userStory";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL || 'http://127.0.0.1:5001/af-tracker-716c0/us-central1/api'
});

const saveUserStory = async (projectId: string, request: UserStory): Promise<UserStory> => {
  const idToken = await auth.currentUser?.getIdToken();

  if (request.id) {
    const response = await api.put<UpdateStoryRequest, AxiosResponse<UserStory>>(
      `/projects/${projectId}/stories/${request.id}`, 
      request, 
      {
        headers: {
          Authorization: `Bearer ${idToken}`
        }
      });
    return response.data;

  }

  const response = await api.post<CreateStoryRequest, AxiosResponse<UserStory>>(
    `/projects/${projectId}/stories`, 
    request, 
    {
      headers: {
        Authorization: `Bearer ${idToken}`
      }
    });
  return response.data;
}

export { saveUserStory };