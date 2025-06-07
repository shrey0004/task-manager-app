import axios from '../utils/axiosInstance';

export const getUsers = () => axios.get('/users');
export const createUser = (data) => axios.post('/users', data);
export const updateUser = (id, data) => axios.put(`/users/${id}`, data);
export const deleteUser = (id) => axios.delete(`/users/${id}`);
