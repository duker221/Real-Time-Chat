import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import io from "socket.io-client";

const socket = io("http://localhost:5001");

export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async function (token) {
    try {
      const response = await axios.get("/api/v1/messages", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Ошибка при загрузке сообщений:", error);
      throw error;
    }
  }
);

export const sendMessage = createAsyncThunk(
  "messages/sendMessage",
  async function ({ message, token }) {
    try {
      const response = await axios.post("/api/v1/messages", message, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Ошибка при отправке сообщения:", error);
      throw error;
    }
  }
);

const messageSlice = createSlice({
  name: "message",
  initialState: {
    messages: [],
    status: null,
    error: null,
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(sendMessage.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.messages.push(action.payload);
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Экспортируем экшены и редьюсер
export const { addMessage } = messageSlice.actions;
export default messageSlice.reducer;
