import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchChannels = createAsyncThunk(
  "channels/fetchChannels",
  async (token) => {
    try {
      const response = await axios.get("/api/v1/channels", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        throw new Error("Server Error!");
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const createChannels = createAsyncThunk(
  "channels/createChannels",
  async ({ name, token }) => {
    try {
      const response = await axios.post(
        "api/v1/channels",
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log("Ошибка при создании канала");
      throw error;
    }
  }
);

export const removeChannel = createAsyncThunk(
  "channels/removeChannel",
  async ({ id, token }) => {
    try {
      await axios.delete(`/api/v1/channels/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return { id };
    } catch (error) {
      console.log("Не удалось удалить канал", error);
      throw error;
    }
  }
);

export const editChannel = createAsyncThunk(
  "channels/editChannel",
  async ({ id, token, newName }) => {
    try {
      const response = await axios.patch(
        `/api/v1/channels/${id}`,
        { name: newName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return { id, newName: response.data.name };
    } catch (error) {
      console.log("Не удалось переименовать канал");
      throw error;
    }
  }
);

const channelSlice = createSlice({
  name: "channels",
  initialState: {
    channels: [],
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchChannels.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.channels = action.payload;
      })
      .addCase(removeChannel.fulfilled, (state, action) => {
        state.loading = false;
        state.channels = state.channels.filter(
          (channel) => channel.id !== action.payload.id
        );
      })
      .addCase(editChannel.fulfilled, (state, action) => {
        state.loading = false;
        const { id, newName } = action.payload;
        const channel = state.channels.find((channel) => channel.id === id);
        if (channel) {
          channel.name = newName;
        }
      })

      .addCase(fetchChannels.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { reducer } = channelSlice;
export default channelSlice.reducer;
