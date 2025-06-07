import axios from '../utils/axiosInstance';

export const loginUser = (credentials) => axios.post('/auth/login', credentials);
export const registerUser = (data) => axios.post('/auth/register', data);
