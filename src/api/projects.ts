import axios from "axios";
import type { Project, CreateProjectRequest } from "../models/project";
import { auth } from "../firebase/firebaseConfig";

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

const getFunctionUrl = (fnName: string) => {
  const backendUrlTemplate: string = import.meta.env.VITE_BACKEND_BASE_URL_TEMPLATE 
    || 'http://127.0.0.1:5001/af-tracker-716c0/us-central1/<<>>';
  return backendUrlTemplate.replace("<<>>", fnName)
}

export { getProjects, addProject };