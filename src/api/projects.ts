import axios from "axios";
import type { Project, CreateProjectRequest } from "../models/project";
import { auth } from "../firebase/firebaseConfig";
import { getFunctionUrl } from "./utils";

const api = axios.create();

const getProjects = async (): Promise<Project[]> => {
  const idToken = await auth.currentUser?.getIdToken();
  const response = await api.get<Project[]>(getFunctionUrl('getProjects'), {
    headers: {
      Authorization: `Bearer ${idToken}`
    }
  });
  return response.data;
}

const addProject = async (project: CreateProjectRequest): Promise<Project> => {
  const idToken = await auth.currentUser?.getIdToken();
  const response = await api.post<Project>(getFunctionUrl('addProject'), project, {
    headers: {
      Authorization: `Bearer ${idToken}`
    }
  });

  return response.data;
}

const getProjectById = async (projectId: string): Promise<Project> => {
  const idToken = await auth.currentUser?.getIdToken();
  const response = await api.get<Project>(`${getFunctionUrl('getProject')}?projectId=${projectId}`, {
    headers: {
      Authorization: `Bearer ${idToken}`
    }
  });
  return response.data;
}

export { getProjects, addProject, getProjectById };