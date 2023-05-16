const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const robot = require('robotjs');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('a user connected');

  // Move mouse
  socket.on('touchmove', (data) => {
    const mouse = robot.getMousePos();
    robot.moveMouse(mouse.x + data.dx, mouse.y + data.dy);
  });

  // Click
  socket.on('click', () => {
    robot.mouseClick();
  });

  // Scroll up/down
  socket.on('scroll', (data) => {
    console.log('Scroll data:', data.dy);
    robot.scrollMouse(0, data.dy*10);
  });

  socket.on('error', (error) => {
    console.error('Socket error:', error);
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});