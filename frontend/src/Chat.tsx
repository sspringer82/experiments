import React, { useEffect } from 'react';
import io from 'socket.io-client';

const Chat: React.FC = () => {
  useEffect(() => {
    console.log('effect');
    const socket = io('http://localhost:3001');
    socket.on('error', () => {
      console.log('error');
    });
    socket.on('connect_error', (e: any) => {
      console.log(e);
      console.log('connect_error');
    });
    socket.on('connect', function () {
      console.log('Connected');

      socket.emit('events', { test: 'test' });
      socket.emit('identity', 0, (response: any) =>
        console.log('Identity:', response),
      );
    });
    socket.on('events', function (data: any) {
      console.log('event', data);
    });
    socket.on('exception', function (data: any) {
      console.log('event', data);
    });
    socket.on('disconnect', function () {
      console.log('Disconnected');
    });
  }, []);

  return <div>Chat works</div>;
};

export default Chat;
