const express = require("express");
const app = express();
const cors = require('cors');
const server = require('http').Server(app)
const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });
const PORT = 8080;

app.use(cors())

io.on('connection', socket => {
    socket.on('join_room', (roomId, userId) => {
        console.log(roomId, userId)
        socket.join(roomId)
        console.log(`${userId} has joined room ${roomId}`)
        socket.to(roomId).emit('user-connected', userId)
    })
})


server.listen(PORT, () => {
    console.log(`Server ${PORT} is running`)
})