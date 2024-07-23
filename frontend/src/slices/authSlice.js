import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post('api/v1/login', { username, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', username);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const regUser = createAsyncThunk(
  'auth/regUser',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post('api/v1/signup', {
        username,
        password,
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', username);

      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 409) {
        return rejectWithValue('Такой пользователь уже существует');
      }
      return rejectWithValue(error.response.data);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: localStorage.getItem('user') || null,
    token: localStorage.getItem('token') || null,
    status: 'idle',
    error: null,
  },
  reducers: {
    logoutUser(state) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      state.user = null;
      state.token = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
        state.user = localStorage.getItem('user');
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(regUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(regUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
        state.user = localStorage.getItem('user');
        state.error = null;
      })
      .addCase(regUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;
