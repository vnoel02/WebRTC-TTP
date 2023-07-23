// const express = require("express");
// const app = express();
// const cors = require('cors');
// const server = require('http').Server(app)
// const io = require("socket.io")(server, {
//     cors: {
//       origin: "*",
//       methods: ["GET", "POST"]
//     }
//   });
// const PORT = 8080;

// app.use(cors())

// io.on('connection', socket => {     
//     socket.on('join_room', (roomId, userId) => {
//         console.log(roomId, userId)
//         socket.join(roomId)
//         console.log(`${userId} has joined room ${roomId}`)
//         socket.to(roomId).emit('user-connected', userId)
//     })

//     socket.on('disconnect', (userId) => {
//         console.log("A user disconnected", userId)
//         io.emit('user-disconnected', socket.id)
//     })
// })


// server.listen(PORT, () => {
//     console.log(`Server ${PORT} is running`)
// })

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
    var peerId;
    socket.on('join_room', (roomId, userId) => {
        console.log(roomId, userId)
        socket.join(roomId)
        console.log(`${userId} has joined room ${roomId}`)
        socket.to(roomId).emit('user-connected', userId)
        peerId = userId;
    });

    socket.on('disconnect', () => {
        console.log("A user disconnected", peerId);
        io.emit('user-disconnected', peerId);
    });
});

server.listen(PORT, () => {
    console.log(`Server ${PORT} is running`)
});