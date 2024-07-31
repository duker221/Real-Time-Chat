// socket.js
import io from 'socket.io-client';

let socket = null;

export const initializeSocket = (onMessage, onChannel) => {
  if (!socket) {
    socket = io();

    socket.on('newMessage', onMessage);
    socket.on('newChannel', onChannel);
  }

  return () => {
    if (socket) {
      socket.disconnect();
      socket = null;
    }
  };
};

export const sendMessage = (message) => {
  if (socket) {
    socket.emit('sendMessage', message);
  } else {
    console.error('Socket not initialized');
  }
};
