import axios from "axios";
import { Project } from "../models/project";

const api = axios.create({
  baseURL: (import.meta as any).env?.VITE_BACKEND_BASE_URL || 'http://localhost:5005'
});

const getProjects = async (): Promise<Project[]> => {
  const response = await api.get<Project[]>('/api/projects');
  return response.data;
}

export { getProjects };