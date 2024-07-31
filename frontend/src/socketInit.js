import io from 'socket.io-client';

const setupSocket = (dispatch, username, addMessage, addChannel) => {
  const newSocket = io();

  newSocket.on('newMessage', (newMessage) => {
    if (newMessage.username !== username) {
      dispatch(addMessage(newMessage));
    }
  });

  newSocket.on('newChannel', (newChannel) => {
    dispatch(addChannel(newChannel));
  });

  return newSocket;
};

export default setupSocket;
