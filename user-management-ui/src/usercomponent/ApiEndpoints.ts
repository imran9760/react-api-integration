import axios from 'axios';
import type { UserRequest } from './UserRequest';
import type { JwtToken } from './JwtToken';

const api = axios.create({
  baseURL: 'http://localhost:8080/',
});

const getAuthHeader = () => {
    const token = localStorage.getItem('jwtToken');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

export const getAllUsers = () => api.get<UserRequest[]>('/user/users',{ headers: getAuthHeader() });

export const createUser = (user: UserRequest) => api.post<UserRequest>('/register', user);

export const updateUser = (user: UserRequest) => api.put<UserRequest>(`/user/update-user`, user, { headers: getAuthHeader() });

export const deleteUser = (username: string) => api.delete<void>(`/admin/delete-user/${username}`,{ headers: getAuthHeader() });

export const loginUser = (user: UserRequest) => api.post<JwtToken>('/login', user);
