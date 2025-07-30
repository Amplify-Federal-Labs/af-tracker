import axios from "axios";
import { auth } from "../firebase/firebaseConfig";
import { getFunctionUrl } from "./utils";
import type { CreateStoryRequest, UserStoriesInProject, UserStory } from "../models/userStory";

const api = axios.create();

const getUserStoriesInProject = async (projectId: string): Promise<UserStoriesInProject> => {
  const idToken = await auth.currentUser?.getIdToken();
  const url = `${getFunctionUrl('getUserStoriesInProject')}?projectId=${projectId}`;

  const response = await api.get<UserStoriesInProject>(url, {
    headers: {
      Authorization: `Bearer ${idToken}`
    }
  });
  return response.data;
}

const addUserStoryToProject = async (projectId: string, request: CreateStoryRequest): Promise<UserStory> => {
  const idToken = await auth.currentUser?.getIdToken();
  const url = `${getFunctionUrl('addUserStoryToProject')}?projectId=${projectId}`;

  const response = await api.post<UserStory>(url, request, {
    headers: {
      Authorization: `Bearer ${idToken}`
    }
  });
  return response.data;
}

export { getUserStoriesInProject, addUserStoryToProject };