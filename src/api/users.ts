import axios from "axios";
import { auth } from "../firebase/firebaseConfig";
import type { User } from "../models/user";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL || 'http://127.0.0.1:5001/af-tracker-716c0/us-central1/api/v2'
});

const getUsers = async (): Promise<User[]> => {
  const idToken = await auth.currentUser?.getIdToken();
  const response = await api.get<User[]>('/users', {
    headers: {
      Authorization: `Bearer ${idToken}`
    }
  });
  return response.data;
}

const addUser = async (): Promise<User> => {
  const idToken = await auth.currentUser?.getIdToken();
  const response = await api.post<User>('/users', {
    headers: {
      Authorization: `Bearer ${idToken}`
    }
  });

  return response.data;
}

export {
    getUsers,
    addUser
}