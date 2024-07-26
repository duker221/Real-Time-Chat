/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async (token) => {
    try {
      const response = await axios.get(routes.channels, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      }
      throw new Error('Server Error!');
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
);

export const createChannels = createAsyncThunk(
  'channels/createChannels',
  async ({ name, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        routes.channels,
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.log('Ошибка при создании канала');
      return rejectWithValue(error.response.data);
    }
  },
);

export const removeChannel = createAsyncThunk(
  'channels/removeChannel',
  async ({ id, token }) => {
    try {
      await axios.delete(`${routes.channels}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return { id };
    } catch (error) {
      console.log('Не удалось удалить канал', error);
      throw error;
    }
  },
);

export const editChannel = createAsyncThunk(
  'channels/editChannel',
  async ({ id, token, newName }) => {
    try {
      const response = await axios.patch(
        `${routes.channels}/${id}`,
        { name: newName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return { id, newName: response.data.name };
    } catch (error) {
      console.log('Не удалось переименовать канал');
      throw error;
    }
  },
);

const channelSlice = createSlice({
  name: 'channels',
  initialState: {
    channels: [],
    status: null,
    error: null,
  },
  reducers: {
    addChannel(state, action) {
      state.channels.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchChannels.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.channels = action.payload;
      })
      .addCase(removeChannel.fulfilled, (state, action) => {
        state.loading = false;
        state.channels = state.channels.filter(
          (channel) => channel.id !== action.payload.id,
        );
      })
      .addCase(editChannel.fulfilled, (state, action) => {
        state.loading = false;
        const { id, newName } = action.payload;
        const channel = state.channels.find(
          (newChannel) => newChannel.id === id,
        );
        if (channel) {
          channel.name = newName;
        }
      })
      .addCase(fetchChannels.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addChannel } = channelSlice.actions;
export default channelSlice.reducer;
