import io from 'socket.io-client';

let socket = null;

export const initializeSocket = (onMessage, onChannel) => {
  if (!socket) {
    socket = io(); // Убедитесь, что URL правильный

    socket.on('newMessage', (message) => {
      if (typeof onMessage === 'function') {
        onMessage(message);
      }
    });

    socket.on('newChannel', (channel) => {
      if (typeof onChannel === 'function') {
        onChannel(channel);
      }
    });
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
    socket.emit('sendMessage', message, (ack) => {
      console.log('Server acknowledged:', ack);
    });
  } else {
    console.error('Socket not initialized');
  }
};
