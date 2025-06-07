import axios from '../utils/axiosInstance';

export const getTasks = (params) => axios.get('/tasks', { params });
export const getTaskById = (id) => axios.get(`/tasks/${id}`);
export const createTask = (data) => axios.post('/tasks', data);
export const updateTask = (id, data) => axios.put(`/tasks/${id}`, data);
export const deleteTask = (id) => axios.delete(`/tasks/${id}`);
export const uploadTaskDocs = (id, files) => {
  const form = new FormData();
  files.forEach((file) => form.append('files', file));
  return axios.post(`/tasks/${id}/documents`, form, { headers: { 'Content-Type': 'multipart/form-data' } });
};
