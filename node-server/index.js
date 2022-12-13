const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://chatapp-clinet.onrender.com",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Id : ${socket.id}`);

  socket.on("join-room", (room_data) => {
    socket.join(room_data);
    console.log(`User with ID: ${socket.id} joined room: ${room_data}`);
  });

  socket.on('send-message', (data) => {
    socket.to(data.room).emit('receive-message',data)
  });

  socket.on("disconnect", () => {
    console.log(`User disconected - Id : ${socket.id}`);
  });
});

server.listen(8080, () => {
  console.log("Connected !");
});
