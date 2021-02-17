const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const PORT = process.env.PORT || 5000;
const app = express();

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const server = http.createServer(app);

const io = socketio(server);

io.on('connection', (socket) => {
  console.log('We have a new connection');

  socket.on('join', ({ name, room }, callback) => {
    const { user, error } = addUser({ id: socket.id, name, room });

    if (error) {
      console.log('user exists');
      return callback(error);
    }

    socket.emit('message', {
      user: 'admin',
      text: `${user.name},welcome to the room ${user.room}`,
    });
    socket.broadcast.to(user.room).emit('message', {
      user: 'admin',
      text: `${user.name}, has joined the room`,
    });
    socket.join(user.room);
    callback();
  });
  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit('message', { user: user.name, text: message });
    callback();
  });

  socket.on('disconnect', () => {
    console.log('User had left');
  });
});
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('123');
});
