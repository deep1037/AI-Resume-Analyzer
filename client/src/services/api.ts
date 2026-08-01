import axios from 'axios';
import type { AuthResponse, ResumeAnalysis, JobMatchResult, ResumeRecord } from '../types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
};

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);

export const authApi = {
  register: (payload: { name: string; email: string; password: string }) =>
    api.post<AuthResponse>('/auth/register', payload),
  login: (payload: { email: string; password: string }) => api.post<AuthResponse>('/auth/login', payload),
  getProfile: () => api.get<{ user: { id: string; name: string; email: string } }>('/auth/profile'),
  updateProfile: (payload: { name?: string; password?: string }) => api.put<{ user: { id: string; name: string; email: string } }>('/auth/profile', payload),
};

export const resumeApi = {
  uploadResume: (formData: FormData) => api.post<{ message: string; resume: ResumeRecord }>('/resume/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  analyzeResume: (payload: { parsedText: string }) => api.post<{ analysis: ResumeAnalysis }>('/resume/analyze', payload),
  matchJob: (payload: { parsedText: string; jobDescription: string }) =>
    api.post<{ result: JobMatchResult }>('/resume/job-match', payload),
  history: () => api.get<{ resumes: ResumeRecord[] }>('/resume/history'),
  deleteResume: (id: string) => api.delete<{ message: string }>(`/resume/${id}`),
};

export default api;
