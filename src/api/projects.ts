import axios from "axios";
import type { Project } from "../viewModels/project";
import type { ProjectResponse, CreateProjectRequest } from "../DTOs";
import { auth } from "../firebase/firebaseConfig";
import { mapProjectResponseToProject } from "../mappers";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL || 'http://127.0.0.1:5001/af-tracker-716c0/us-central1/api/v2'
});

const getProjects = async (): Promise<Project[]> => {
  const idToken = await auth.currentUser?.getIdToken();
  const response = await api.get<ProjectResponse[]>('/projects', {
    headers: {
      Authorization: `Bearer ${idToken}`
    }
  });
  return response.data.map(mapProjectResponseToProject);
}

const addProject = async (project: CreateProjectRequest): Promise<Project> => {
  const idToken = await auth.currentUser?.getIdToken();
  const response = await api.post<ProjectResponse>('/projects', project, {
    headers: {
      Authorization: `Bearer ${idToken}`
    }
  });

  return mapProjectResponseToProject(response.data);
}

const getProjectById = async (projectId: string): Promise<Project> => {
  console.log('getting project by id');
  const idToken = await auth.currentUser?.getIdToken();
  const response = await api.get<ProjectResponse>(`/projects/${projectId}`, {
    headers: {
      Authorization: `Bearer ${idToken}`
    }
  });
  return mapProjectResponseToProject(response.data);
}

export { getProjects, addProject, getProjectById };