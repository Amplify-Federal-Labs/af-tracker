import axios from "axios";
import type { Project, CreateProjectRequest } from "../models/project";
import { auth } from "../firebase/firebaseConfig";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL || 'http://127.0.0.1:5001/af-tracker-716c0/us-central1/api'
});

const getProjects = async (): Promise<Project[]> => {
  const idToken = await auth.currentUser?.getIdToken();
  const response = await api.get<Project[]>('/projects', {
    headers: {
      Authorization: `Bearer ${idToken}`
    }
  });
  return response.data;
}

const addProject = async (project: CreateProjectRequest): Promise<Project> => {
  const idToken = await auth.currentUser?.getIdToken();
  const response = await api.post<Project>('/projects', project, {
    headers: {
      Authorization: `Bearer ${idToken}`
    }
  });

  return response.data;
}

const getProjectById = async (projectId: string): Promise<Project> => {
  console.log('getting project by id');
  const idToken = await auth.currentUser?.getIdToken();
  const response = await api.get<Project>(`/projects/${projectId}`, {
    headers: {
      Authorization: `Bearer ${idToken}`
    }
  });
  return response.data;
}

export { getProjects, addProject, getProjectById };