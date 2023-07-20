const express = require("express");
const app = express();
const server = require('http').Server(app)
const io = require('socket.io')(server)
const PORT = 8080;



io.on('connection', socket => {
    socket.on('join_room', (roomId, userId) => {
        console.log(roomId, userId)
        socket.join(roomId)
        console.log(`${userId} has joined room ${roomId}`)
        socket.broadcast.to(roomId).emit('user-connected', userId)
    })
})


server.listen(PORT, () => {
    console.log(`Server ${PORT} is running`)
})