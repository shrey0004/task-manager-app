import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../utils/axiosInstance';

const initialState = { token: localStorage.getItem('token') || null, user: null, status: 'idle', error: null };

export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post('/auth/login', credentials);
    return response.data; // { token, user }
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const register = createAsyncThunk('auth/register', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post('/auth/register', data);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: { logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
    } },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        localStorage.setItem('token', action.payload.token);
        state.status = 'succeeded';
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      })
      .addCase(register.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        localStorage.setItem('token', action.payload.token);
        state.status = 'succeeded';
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
