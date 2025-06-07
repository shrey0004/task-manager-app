import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../utils/axiosInstance';

const initialState = { users: [], status: 'idle', error: null };

export const fetchUsers = createAsyncThunk('users/fetchAll', async (_, { rejectWithValue }) => {
  try { const response = await axios.get('/users'); return response.data; } 
  catch (err) { return rejectWithValue(err.response.data); }
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => { state.users = action.payload; state.status = 'succeeded'; })
      .addCase(fetchUsers.rejected, (state, action) => { state.error = action.payload; state.status = 'failed'; });
  },
});

export default userSlice.reducer;
