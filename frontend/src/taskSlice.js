import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../utils/axiosInstance';

const initialState = { tasks: [], status: 'idle', error: null };

export const fetchTasks = createAsyncThunk('tasks/fetchAll', async (params, { rejectWithValue }) => {
  try { const response = await axios.get('/tasks', { params }); return response.data; } 
  catch (err) { return rejectWithValue(err.response.data); }
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => { state.tasks = action.payload.tasks; state.status = 'succeeded'; })
      .addCase(fetchTasks.rejected, (state, action) => { state.error = action.payload; state.status = 'failed'; });
  },
});

export default taskSlice.reducer;
